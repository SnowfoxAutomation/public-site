import "server-only";

import { z } from "zod";

import { DocumentApiError } from "../api/apiError";
import type { ApiProblem } from "../contracts/common";
import {
  acceptedDocumentExtensions,
  acceptedDocumentMimeTypes,
  documentUploadPolicy,
} from "./acceptedFileTypes";

const fileManifestSchema = z.array(
  z.object({
    client_file_id: z.string().uuid(),
    filename: z.string().min(1).max(255),
  }),
);

function createValidationProblem(
  detail: string,
  code: string,
  status = 422,
): ApiProblem {
  return {
    type: `https://api.snowfox.ca/problems/${code.replaceAll("_", "-")}`,
    title: "Invalid document upload",
    status,
    detail,
    code,
    retryable: false,
    errors: [],
  };
}

function getExtension(filename: string) {
  const dotIndex = filename.lastIndexOf(".");

  return dotIndex >= 0
    ? filename.slice(dotIndex).toLowerCase()
    : "";
}

export function validateDocumentUpload(
  formData: FormData,
) {
  const files = formData
    .getAll("files")
    .filter((value): value is File =>
      value instanceof File,
    );

  if (
    files.length === 0 ||
    files.length >
      documentUploadPolicy.maximumFilesPerJob
  ) {
    throw new DocumentApiError(
      createValidationProblem(
        `Submit between 1 and ${documentUploadPolicy.maximumFilesPerJob} files.`,
        "invalid_file_count",
      ),
    );
  }

  const manifestValue = formData.get(
    "file_manifest",
  );
  let manifestPayload: unknown;

  try {
    manifestPayload = JSON.parse(
      String(manifestValue ?? ""),
    ) as unknown;
  } catch {
    manifestPayload = null;
  }

  const manifest =
    fileManifestSchema.safeParse(manifestPayload);

  if (
    !manifest.success ||
    manifest.data.length !== files.length
  ) {
    throw new DocumentApiError(
      createValidationProblem(
        "The file manifest must contain one valid entry for every uploaded file.",
        "invalid_file_manifest",
      ),
    );
  }

  const manifestIds = new Set(
    manifest.data.map(
      ({ client_file_id: clientFileId }) =>
        clientFileId,
    ),
  );

  if (manifestIds.size !== manifest.data.length) {
    throw new DocumentApiError(
      createValidationProblem(
        "Every file manifest entry must have a unique client file ID.",
        "duplicate_client_file_id",
      ),
    );
  }

  let batchSizeBytes = 0;

  files.forEach((file, index) => {
    const manifestEntry = manifest.data[index];
    const extension = getExtension(file.name);
    const supportedExtension =
      acceptedDocumentExtensions.includes(
        extension as never,
      );
    const supportedMime =
      !file.type ||
      acceptedDocumentMimeTypes.includes(
        file.type as never,
      );

    if (
      manifestEntry.filename !== file.name ||
      !supportedExtension ||
      !supportedMime
    ) {
      throw new DocumentApiError(
        createValidationProblem(
          `The file "${file.name}" does not match a supported manifest entry.`,
          "unsupported_file_type",
        ),
      );
    }

    if (
      file.size === 0 ||
      file.size >
        documentUploadPolicy.maximumFileSizeBytes
    ) {
      throw new DocumentApiError(
        createValidationProblem(
          `The file "${file.name}" has an invalid size.`,
          "invalid_file_size",
          413,
        ),
      );
    }

    batchSizeBytes += file.size;
  });

  if (
    batchSizeBytes >
    documentUploadPolicy.maximumBatchSizeBytes
  ) {
    throw new DocumentApiError(
      createValidationProblem(
        "The combined upload exceeds the maximum batch size.",
        "batch_too_large",
        413,
      ),
    );
  }
}

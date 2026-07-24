import "server-only";

import { DocumentApiError } from "../api/apiError";
import type { ApiProblem } from "../contracts/common";
import {
  acceptedDocumentExtensions,
  acceptedDocumentMimeTypes,
  documentUploadPolicy,
} from "./acceptedFileTypes";

function validationProblem(
  detail: string,
  code: string,
  status = 422,
): ApiProblem {
  return {
    type: `https://api.snowfox.ca/problems/${code.replaceAll("_", "-")}`,
    title: "Invalid document analysis request",
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

export function validateAnalysisRequest(
  formData: FormData,
) {
  const file = formData.get("file");

  if (!(file instanceof File)) {
    throw new DocumentApiError(
      validationProblem(
        "Provide one document to analyze.",
        "file_required",
        400,
      ),
    );
  }

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

  if (!supportedExtension || !supportedMime) {
    throw new DocumentApiError(
      validationProblem(
        "The selected document type is not supported.",
        "unsupported_file_type",
        415,
      ),
    );
  }

  if (
    file.size === 0 ||
    file.size >
      documentUploadPolicy.maximumFileSizeBytes
  ) {
    throw new DocumentApiError(
      validationProblem(
        "The selected document has an invalid size.",
        "invalid_file_size",
        413,
      ),
    );
  }

  const scoreThreshold = Number(
    formData.get("score_threshold"),
  );

  if (
    !Number.isFinite(scoreThreshold) ||
    scoreThreshold < 0 ||
    scoreThreshold > 1
  ) {
    throw new DocumentApiError(
      validationProblem(
        "Minimum confidence must be between 0 and 1.",
        "invalid_score_threshold",
      ),
    );
  }
}

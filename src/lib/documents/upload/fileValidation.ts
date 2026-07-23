import { documentsContent } from "@/content/documents";

import {
  acceptedDocumentExtensions,
  acceptedDocumentMimeTypes,
  documentUploadPolicy,
} from "./acceptedFileTypes";
import type {
  FileValidationError,
  UploadQueueItem,
} from "../state/uploadState";

function getExtension(filename: string) {
  const dotIndex = filename.lastIndexOf(".");

  return dotIndex >= 0
    ? filename.slice(dotIndex).toLowerCase()
    : "";
}

function getFileFingerprint(file: File) {
  return [
    file.name.toLowerCase(),
    file.size,
    file.lastModified,
  ].join(":");
}

function createError(
  code: FileValidationError["code"],
  message: string,
): FileValidationError {
  return { code, message };
}

export function validateSelectedFiles(
  selectedFiles: readonly File[],
  existingItems: readonly UploadQueueItem[],
): UploadQueueItem[] {
  const existingFingerprints = new Set(
    existingItems.map(({ file }) =>
      getFileFingerprint(file),
    ),
  );
  let queuedCount = existingItems.length;
  let queuedBytes = existingItems.reduce(
    (total, { file }) => total + file.size,
    0,
  );

  return selectedFiles.map((file) => {
    const validationErrors: FileValidationError[] =
      [];
    const fingerprint = getFileFingerprint(file);
    const extension = getExtension(file.name);
    const hasSupportedExtension =
      acceptedDocumentExtensions.includes(
        extension as never,
      );
    const hasSupportedMime =
      !file.type ||
      acceptedDocumentMimeTypes.includes(
        file.type as never,
      );

    if (
      !hasSupportedExtension ||
      !hasSupportedMime
    ) {
      validationErrors.push(
        createError(
          "unsupported_file_type",
          documentsContent.validation
            .unsupportedType,
        ),
      );
    }

    if (file.size === 0) {
      validationErrors.push(
        createError(
          "empty_file",
          documentsContent.validation.emptyFile,
        ),
      );
    }

    if (
      file.size >
      documentUploadPolicy.maximumFileSizeBytes
    ) {
      validationErrors.push(
        createError(
          "file_too_large",
          documentsContent.validation.fileTooLarge,
        ),
      );
    }

    if (existingFingerprints.has(fingerprint)) {
      validationErrors.push(
        createError(
          "duplicate_file",
          documentsContent.validation.duplicateFile,
        ),
      );
    }

    queuedCount += 1;
    queuedBytes += file.size;

    if (
      queuedCount >
      documentUploadPolicy.maximumFilesPerJob
    ) {
      validationErrors.push(
        createError(
          "too_many_files",
          documentsContent.validation.tooManyFiles,
        ),
      );
    }

    if (
      queuedBytes >
      documentUploadPolicy.maximumBatchSizeBytes
    ) {
      validationErrors.push(
        createError(
          "batch_too_large",
          documentsContent.validation.batchTooLarge,
        ),
      );
    }

    existingFingerprints.add(fingerprint);

    return {
      localId: crypto.randomUUID(),
      file,
      status:
        validationErrors.length > 0
          ? "invalid"
          : "ready",
      uploadedBytes: 0,
      uploadPercent: 0,
      validationErrors,
    };
  });
}

import type { ApiProblem } from "../contracts/common";
import type { DocumentJob } from "../contracts/jobs";
import type { DocumentJobResults } from "../contracts/results";
import type { DocumentAnalysis } from "../contracts/analysis";

export type FileValidationErrorCode =
  | "unsupported_file_type"
  | "file_too_large"
  | "too_many_files"
  | "batch_too_large"
  | "duplicate_file"
  | "empty_file";

export type FileValidationError = {
  code: FileValidationErrorCode;
  message: string;
};

export type UploadQueueItemStatus =
  | "ready"
  | "invalid"
  | "uploading"
  | "analyzing"
  | "submitted"
  | "processing"
  | "completed"
  | "failed"
  | "cancelled";

export type UploadQueueItem = {
  localId: string;
  file: File;
  status: UploadQueueItemStatus;
  uploadedBytes: number;
  uploadPercent: number;
  jobId?: string;
  documentId?: string;
  clientRequestId?: string;
  validationErrors: FileValidationError[];
  problem?: ApiProblem;
  analysis?: DocumentAnalysis;
};

export type UploadState = {
  items: UploadQueueItem[];
  jobs: DocumentJobState[];
};

export type DocumentJobState = {
  job: DocumentJob;
  updateProblem?: ApiProblem;
  resultsStatus:
    | "idle"
    | "loading"
    | "loaded"
    | "failed";
  results?: DocumentJobResults;
  resultsProblem?: ApiProblem;
};

export const initialUploadState: UploadState = {
  items: [],
  jobs: [],
};

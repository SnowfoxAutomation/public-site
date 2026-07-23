import type {
  ApiProblem,
  DocumentJobStatus,
  DocumentStatus,
  ProcessingPhase,
} from "./common";

export type ProcessingProgress = {
  phase: ProcessingPhase;
  completed: number;
  total: number;
  percent: number | null;
  message?: string;
};

export type DocumentJobDocument = {
  documentId: string;
  clientFileId: string;
  filename: string;
  mediaType: string;
  sizeBytes: number;
  status: DocumentStatus;
  error?: ApiProblem;
};

export type DocumentJob = {
  jobId: string;
  status: DocumentJobStatus;
  createdAt: string;
  updatedAt: string;
  progress: ProcessingProgress;
  documents: DocumentJobDocument[];
};

export type CreateDocumentJobOptions = {
  [key: string]: string | number | boolean | null;
};

export type CreateDocumentJobRequest = {
  clientRequestId: string;
  files: ReadonlyArray<{
    clientFileId: string;
    file: File;
  }>;
  options?: CreateDocumentJobOptions;
};

export type UploadProgress = {
  loadedBytes: number;
  totalBytes: number | null;
  percent: number | null;
};

export type UploadRequestOptions = {
  signal?: AbortSignal;
  onProgress?: (progress: UploadProgress) => void;
};

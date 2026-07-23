export const documentJobStatuses = [
  "queued",
  "uploading",
  "processing",
  "completed",
  "partially_completed",
  "failed",
  "cancelled",
] as const;

export type DocumentJobStatus =
  (typeof documentJobStatuses)[number];

export const documentStatuses = [
  "queued",
  "processing",
  "completed",
  "failed",
  "cancelled",
] as const;

export type DocumentStatus =
  (typeof documentStatuses)[number];

export const processingPhases = [
  "queued",
  "validating",
  "extracting",
  "analyzing",
  "finalizing",
  "completed",
] as const;

export type ProcessingPhase =
  (typeof processingPhases)[number];

export type JsonPrimitive =
  | string
  | number
  | boolean
  | null;

export type JsonValue =
  | JsonPrimitive
  | JsonValue[]
  | { [key: string]: JsonValue };

export type ApiProblemFieldError = {
  fileId?: string;
  field?: string;
  code: string;
  message: string;
};

export type ApiProblem = {
  type: string;
  title: string;
  status: number;
  detail: string;
  code: string;
  requestId?: string;
  retryable: boolean;
  errors: ApiProblemFieldError[];
};

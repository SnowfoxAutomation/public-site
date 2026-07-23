export type {
  ApiProblem,
  DocumentJobStatus,
  DocumentStatus,
  JsonValue,
  ProcessingPhase,
} from "./contracts/common";
export type {
  CreateDocumentJobRequest,
  DocumentJob,
  DocumentJobDocument,
  ProcessingProgress,
  UploadProgress,
  UploadRequestOptions,
} from "./contracts/jobs";
export type {
  DocumentJobResults,
  DocumentResult,
  DocumentResultEnvelope,
  ResultSection,
  ResultTable,
  ResultWarning,
} from "./contracts/results";
export {
  apiProblemSchema,
  documentJobResultsSchema,
  documentJobSchema,
  jsonValueSchema,
} from "./contracts/schemas";
export {
  acceptedDocumentExtensions,
  acceptedDocumentMimeTypes,
  acceptedDocumentTypes,
  documentInputAccept,
  documentUploadPolicy,
} from "./upload/acceptedFileTypes";

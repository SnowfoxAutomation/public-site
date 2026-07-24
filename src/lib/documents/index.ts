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
export type {
  AnalysisSummary,
  AnalyzeDocumentRequest,
  DocumentAnalysis,
  PiiFinding,
} from "./contracts/analysis";
export {
  apiProblemSchema,
  documentJobResultsSchema,
  documentJobSchema,
  documentAnalysisSchema,
  jsonValueSchema,
} from "./contracts/schemas";
export {
  acceptedDocumentExtensions,
  acceptedDocumentMimeTypes,
  acceptedDocumentTypes,
  documentInputAccept,
  documentUploadPolicy,
} from "./upload/acceptedFileTypes";
export type { DocumentService } from "./api/documentService";
export {
  DocumentApiError,
  parseApiProblem,
} from "./api/apiError";
export type { UploadTransport } from "./upload/uploadTransport";
export type { AnalysisTransport } from "./upload/analysisTransport";
export type {
  JobUpdateHandlers,
  JobUpdatesTransport,
} from "./updates/jobUpdatesTransport";

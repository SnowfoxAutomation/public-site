import type {
  CreateDocumentJobRequest,
  DocumentJob,
  UploadRequestOptions,
} from "../contracts/jobs";
import type { DocumentJobResults } from "../contracts/results";

export interface DocumentService {
  createJob(
    request: CreateDocumentJobRequest,
    options?: UploadRequestOptions,
  ): Promise<DocumentJob>;

  getJob(
    jobId: string,
    signal?: AbortSignal,
  ): Promise<DocumentJob>;

  getResults(
    jobId: string,
    signal?: AbortSignal,
  ): Promise<DocumentJobResults>;

  cancelJob(
    jobId: string,
    signal?: AbortSignal,
  ): Promise<DocumentJob>;
}

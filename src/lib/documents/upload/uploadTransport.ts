import type {
  CreateDocumentJobRequest,
  DocumentJob,
  UploadRequestOptions,
} from "../contracts/jobs";

export interface UploadTransport {
  createJob(
    request: CreateDocumentJobRequest,
    options?: UploadRequestOptions,
  ): Promise<DocumentJob>;
}

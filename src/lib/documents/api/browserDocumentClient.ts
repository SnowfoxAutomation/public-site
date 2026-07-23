import type {
  CreateDocumentJobRequest,
  DocumentJob,
  UploadRequestOptions,
} from "../contracts/jobs";
import type { DocumentJobResults } from "../contracts/results";
import {
  documentJobResultsSchema,
  documentJobSchema,
} from "../contracts/schemas";
import { XhrUploadTransport } from "../upload/xhrUploadTransport";
import type { DocumentService } from "./documentService";
import {
  DocumentApiError,
  parseApiProblem,
} from "./apiError";

async function requestJson<T>(
  path: string,
  init: RequestInit,
  parser: (payload: unknown) => T,
) {
  const response = await fetch(path, {
    ...init,
    cache: "no-store",
  });
  let payload: unknown;

  try {
    payload = await response.json();
  } catch {
    payload = null;
  }

  if (!response.ok) {
    throw new DocumentApiError(
      parseApiProblem(payload, response.status),
    );
  }

  try {
    return parser(payload);
  } catch {
    throw new DocumentApiError(
      parseApiProblem(
        {
          type: "about:blank",
          title: "Invalid document service response",
          status: 502,
          detail:
            "The document service returned an invalid response.",
          code: "invalid_document_service_response",
          retryable: true,
          errors: [],
        },
        502,
      ),
    );
  }
}

function jobPath(jobId: string) {
  return `/api/document-jobs/${encodeURIComponent(jobId)}`;
}

export class BrowserDocumentClient
  implements DocumentService
{
  private readonly uploadTransport =
    new XhrUploadTransport();

  createJob(
    request: CreateDocumentJobRequest,
    options?: UploadRequestOptions,
  ) {
    return this.uploadTransport.createJob(
      request,
      options,
    );
  }

  getJob(
    jobId: string,
    signal?: AbortSignal,
  ): Promise<DocumentJob> {
    return requestJson(
      jobPath(jobId),
      { method: "GET", signal },
      (payload) => documentJobSchema.parse(payload),
    );
  }

  getResults(
    jobId: string,
    signal?: AbortSignal,
  ): Promise<DocumentJobResults> {
    return requestJson(
      `${jobPath(jobId)}/results`,
      { method: "GET", signal },
      (payload) =>
        documentJobResultsSchema.parse(payload),
    );
  }

  cancelJob(
    jobId: string,
    signal?: AbortSignal,
  ): Promise<DocumentJob> {
    return requestJson(
      `${jobPath(jobId)}/cancel`,
      { method: "POST", signal },
      (payload) => documentJobSchema.parse(payload),
    );
  }
}

export const browserDocumentClient =
  new BrowserDocumentClient();

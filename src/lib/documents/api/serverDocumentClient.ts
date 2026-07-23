import "server-only";

import { getDocumentApiConfig } from "../config";
import type { DocumentJob } from "../contracts/jobs";
import type { DocumentJobResults } from "../contracts/results";
import {
  documentJobResultsSchema,
  documentJobSchema,
} from "../contracts/schemas";
import {
  DocumentApiError,
  parseApiProblem,
} from "./apiError";

type ValidatedBackendResponse<T> = {
  data: T;
  wirePayload: unknown;
  status: number;
  retryAfter: string | null;
};

function createRequestSignal(
  requestSignal?: AbortSignal | null,
) {
  const { requestTimeoutMs } =
    getDocumentApiConfig();
  const timeoutSignal = AbortSignal.timeout(
    requestTimeoutMs,
  );

  return requestSignal
    ? AbortSignal.any([
        requestSignal,
        timeoutSignal,
      ])
    : timeoutSignal;
}

function createBackendUrl(path: string) {
  const { baseUrl } = getDocumentApiConfig();

  return new URL(path, `${baseUrl}/`);
}

function createBackendHeaders(
  headers?: HeadersInit,
) {
  const { apiToken } = getDocumentApiConfig();
  const requestHeaders = new Headers(headers);

  if (apiToken) {
    requestHeaders.set(
      "Authorization",
      `Bearer ${apiToken}`,
    );
  }

  return requestHeaders;
}

async function parseBackendResponse<T>(
  response: Response,
  parser: (value: unknown) => T,
): Promise<ValidatedBackendResponse<T>> {
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

  return {
    data: parser(payload),
    wirePayload: payload,
    status: response.status,
    retryAfter: response.headers.get("retry-after"),
  };
}

async function requestDocumentApi<T>(
  path: string,
  init: RequestInit,
  parser: (value: unknown) => T,
) {
  const response = await fetch(
    createBackendUrl(path),
    {
      ...init,
      cache: "no-store",
      headers: createBackendHeaders(
        init.headers,
      ),
      signal: createRequestSignal(init.signal),
    },
  );

  return parseBackendResponse(response, parser);
}

function encodeJobId(jobId: string) {
  return encodeURIComponent(jobId);
}

export const serverDocumentClient = {
  createJob(
    formData: FormData,
    idempotencyKey: string,
    signal?: AbortSignal,
  ): Promise<ValidatedBackendResponse<DocumentJob>> {
    return requestDocumentApi(
      "/v1/document-jobs",
      {
        method: "POST",
        body: formData,
        headers: {
          "Idempotency-Key": idempotencyKey,
        },
        signal,
      },
      (payload) => documentJobSchema.parse(payload),
    );
  },

  getJob(
    jobId: string,
    signal?: AbortSignal,
  ): Promise<ValidatedBackendResponse<DocumentJob>> {
    return requestDocumentApi(
      `/v1/document-jobs/${encodeJobId(jobId)}`,
      {
        method: "GET",
        signal,
      },
      (payload) => documentJobSchema.parse(payload),
    );
  },

  getResults(
    jobId: string,
    signal?: AbortSignal,
  ): Promise<
    ValidatedBackendResponse<DocumentJobResults>
  > {
    return requestDocumentApi(
      `/v1/document-jobs/${encodeJobId(jobId)}/results`,
      {
        method: "GET",
        signal,
      },
      (payload) =>
        documentJobResultsSchema.parse(payload),
    );
  },

  cancelJob(
    jobId: string,
    signal?: AbortSignal,
  ): Promise<ValidatedBackendResponse<DocumentJob>> {
    return requestDocumentApi(
      `/v1/document-jobs/${encodeJobId(jobId)}/cancel`,
      {
        method: "POST",
        signal,
      },
      (payload) => documentJobSchema.parse(payload),
    );
  },
};

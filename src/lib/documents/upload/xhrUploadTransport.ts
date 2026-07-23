import type {
  CreateDocumentJobRequest,
  DocumentJob,
  UploadRequestOptions,
} from "../contracts/jobs";
import { documentJobSchema } from "../contracts/schemas";
import {
  DocumentApiError,
  parseApiProblem,
} from "../api/apiError";
import type { UploadTransport } from "./uploadTransport";

const uploadUrl = "/api/document-jobs";

function parseJson(value: string): unknown {
  try {
    return JSON.parse(value) as unknown;
  } catch {
    return null;
  }
}

function createNetworkProblem() {
  return parseApiProblem(
    {
      type: "about:blank",
      title: "Upload unavailable",
      status: 503,
      detail:
        "The documents could not be uploaded. Check your connection and try again.",
      code: "upload_unavailable",
      retryable: true,
      errors: [],
    },
    503,
  );
}

function createFormData(
  request: CreateDocumentJobRequest,
) {
  const formData = new FormData();

  request.files.forEach(({ file }) => {
    formData.append("files", file, file.name);
  });

  formData.set(
    "file_manifest",
    JSON.stringify(
      request.files.map(
        ({ clientFileId, file }) => ({
          client_file_id: clientFileId,
          filename: file.name,
        }),
      ),
    ),
  );
  formData.set(
    "client_request_id",
    request.clientRequestId,
  );

  if (request.options) {
    formData.set(
      "options",
      JSON.stringify(request.options),
    );
  }

  return formData;
}

export class XhrUploadTransport
  implements UploadTransport
{
  createJob(
    request: CreateDocumentJobRequest,
    options: UploadRequestOptions = {},
  ): Promise<DocumentJob> {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      const abortRequest = () => xhr.abort();

      xhr.open("POST", uploadUrl);
      xhr.setRequestHeader(
        "Idempotency-Key",
        request.clientRequestId,
      );

      xhr.upload.addEventListener(
        "progress",
        (event) => {
          const totalBytes = event.lengthComputable
            ? event.total
            : null;
          const percent =
            totalBytes && totalBytes > 0
              ? Math.min(
                  100,
                  Math.round(
                    (event.loaded / totalBytes) * 100,
                  ),
                )
              : null;

          options.onProgress?.({
            loadedBytes: event.loaded,
            totalBytes,
            percent,
          });
        },
      );

      xhr.addEventListener("load", () => {
        options.signal?.removeEventListener(
          "abort",
          abortRequest,
        );

        const payload = parseJson(
          xhr.responseText,
        );

        if (xhr.status < 200 || xhr.status >= 300) {
          reject(
            new DocumentApiError(
              parseApiProblem(payload, xhr.status),
            ),
          );
          return;
        }

        try {
          resolve(documentJobSchema.parse(payload));
        } catch {
          reject(
            new DocumentApiError(
              parseApiProblem(
                {
                  type: "about:blank",
                  title:
                    "Invalid document service response",
                  status: 502,
                  detail:
                    "The document service returned an invalid response.",
                  code: "invalid_document_service_response",
                  retryable: true,
                  errors: [],
                },
                502,
              ),
            ),
          );
        }
      });

      xhr.addEventListener("error", () => {
        options.signal?.removeEventListener(
          "abort",
          abortRequest,
        );
        reject(
          new DocumentApiError(
            createNetworkProblem(),
          ),
        );
      });

      xhr.addEventListener("abort", () => {
        options.signal?.removeEventListener(
          "abort",
          abortRequest,
        );
        reject(
          new DOMException(
            "The upload was cancelled.",
            "AbortError",
          ),
        );
      });

      if (options.signal?.aborted) {
        xhr.abort();
        return;
      }

      options.signal?.addEventListener(
        "abort",
        abortRequest,
        { once: true },
      );

      xhr.send(createFormData(request));
    });
  }
}

import {
  DocumentApiError,
  parseApiProblem,
} from "../api/apiError";
import type {
  AnalyzeDocumentRequest,
  DocumentAnalysis,
} from "../contracts/analysis";
import type { UploadRequestOptions } from "../contracts/jobs";
import { documentAnalysisSchema } from "../contracts/schemas";
import type { AnalysisTransport } from "./analysisTransport";

const analysisUrl = "/api/document-analysis";

function parseJson(value: string): unknown {
  try {
    return JSON.parse(value) as unknown;
  } catch {
    return null;
  }
}

function unavailableProblem() {
  return parseApiProblem(
    {
      type: "about:blank",
      title: "Analysis unavailable",
      status: 503,
      detail:
        "The document could not be analyzed. Check that the local processing service is running and try again.",
      code: "analysis_unavailable",
      retryable: true,
      errors: [],
    },
    503,
  );
}

export class XhrAnalysisTransport
  implements AnalysisTransport
{
  analyze(
    request: AnalyzeDocumentRequest,
    options: UploadRequestOptions = {},
  ): Promise<DocumentAnalysis> {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      const abortRequest = () => xhr.abort();

      xhr.open("POST", analysisUrl);

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
      xhr.upload.addEventListener(
        "load",
        () => options.onUploadComplete?.(),
      );

      xhr.addEventListener("load", () => {
        options.signal?.removeEventListener(
          "abort",
          abortRequest,
        );
        const payload = parseJson(xhr.responseText);

        if (xhr.status < 200 || xhr.status >= 300) {
          reject(
            new DocumentApiError(
              parseApiProblem(payload, xhr.status),
            ),
          );
          return;
        }

        try {
          resolve(
            documentAnalysisSchema.parse(payload),
          );
        } catch {
          reject(
            new DocumentApiError(
              parseApiProblem(
                {
                  type: "about:blank",
                  title:
                    "Invalid analysis response",
                  status: 502,
                  detail:
                    "The processing service returned an invalid response.",
                  code: "invalid_analysis_response",
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
            unavailableProblem(),
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
            "The analysis request was stopped.",
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

      const formData = new FormData();
      formData.set(
        "file",
        request.file,
        request.file.name,
      );
      formData.set(
        "score_threshold",
        String(request.scoreThreshold),
      );
      xhr.send(formData);
    });
  }
}

export const analysisTransport =
  new XhrAnalysisTransport();

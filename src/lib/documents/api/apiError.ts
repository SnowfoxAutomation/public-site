import type { ApiProblem } from "../contracts/common";
import { apiProblemSchema } from "../contracts/schemas";

const fallbackProblem: ApiProblem = {
  type: "about:blank",
  title: "Document service error",
  status: 500,
  detail:
    "The document service could not complete the request.",
  code: "document_service_error",
  retryable: false,
  errors: [],
};

export class DocumentApiError extends Error {
  readonly problem: ApiProblem;

  constructor(problem: ApiProblem) {
    super(problem.detail || problem.title);
    this.name = "DocumentApiError";
    this.problem = problem;
  }
}

export function parseApiProblem(
  value: unknown,
  status?: number,
): ApiProblem {
  const parsed = apiProblemSchema.safeParse(value);

  if (parsed.success) {
    return parsed.data;
  }

  if (
    typeof value === "object" &&
    value !== null &&
    "detail" in value &&
    typeof value.detail === "string"
  ) {
    const problemStatus =
      status ?? fallbackProblem.status;

    return {
      type: "about:blank",
      title:
        problemStatus === 415
          ? "Unsupported document type"
          : "Document analysis failed",
      status: problemStatus,
      detail: value.detail,
      code:
        problemStatus === 415
          ? "unsupported_file_type"
          : "document_analysis_failed",
      retryable: problemStatus >= 500,
      errors: [],
    };
  }

  return {
    ...fallbackProblem,
    status: status ?? fallbackProblem.status,
  };
}

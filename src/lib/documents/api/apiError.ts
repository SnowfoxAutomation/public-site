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

  return {
    ...fallbackProblem,
    status: status ?? fallbackProblem.status,
  };
}

import { NextResponse } from "next/server";
import { z } from "zod";

import type { ApiProblem } from "../contracts/common";
import { DocumentApiError } from "./apiError";

const internalProblem: ApiProblem = {
  type: "about:blank",
  title: "Document service unavailable",
  status: 502,
  detail:
    "The document processing service could not complete the request.",
  code: "document_service_unavailable",
  retryable: true,
  errors: [],
};

function serializeProblem(problem: ApiProblem) {
  return {
    type: problem.type,
    title: problem.title,
    status: problem.status,
    detail: problem.detail,
    code: problem.code,
    request_id: problem.requestId,
    retryable: problem.retryable,
    errors: problem.errors.map((error) => ({
      file_id: error.fileId,
      field: error.field,
      code: error.code,
      message: error.message,
    })),
  };
}

export function backendJsonResponse({
  wirePayload,
  status,
  retryAfter,
}: {
  wirePayload: unknown;
  status: number;
  retryAfter: string | null;
}) {
  const response = NextResponse.json(wirePayload, {
    status,
  });

  if (retryAfter) {
    response.headers.set(
      "Retry-After",
      retryAfter,
    );
  }

  response.headers.set(
    "Cache-Control",
    "no-store",
  );
  response.headers.set(
    "X-Content-Type-Options",
    "nosniff",
  );

  return response;
}

export function documentApiErrorResponse(
  error: unknown,
) {
  if (error instanceof DocumentApiError) {
    const response = NextResponse.json(
      serializeProblem(error.problem),
      { status: error.problem.status },
    );
    response.headers.set(
      "Cache-Control",
      "no-store",
    );
    response.headers.set(
      "X-Content-Type-Options",
      "nosniff",
    );

    return response;
  }

  const problem =
    error instanceof z.ZodError
      ? {
          ...internalProblem,
          detail:
            "The document service returned an invalid response.",
          code: "invalid_document_service_response",
        }
      : internalProblem;

  const response = NextResponse.json(
    serializeProblem(problem),
    { status: problem.status },
  );
  response.headers.set("Cache-Control", "no-store");
  response.headers.set(
    "X-Content-Type-Options",
    "nosniff",
  );

  return response;
}

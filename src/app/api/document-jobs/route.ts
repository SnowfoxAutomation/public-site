import type { NextRequest } from "next/server";

import {
  backendJsonResponse,
  documentApiErrorResponse,
} from "@/lib/documents/api/apiResponse";
import { serverDocumentClient } from "@/lib/documents/api/serverDocumentClient";
import { validateDocumentUpload } from "@/lib/documents/upload/serverUploadValidation";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const idempotencyKey =
      request.headers.get("idempotency-key");

    if (!idempotencyKey) {
      return Response.json(
        {
          type: "about:blank",
          title: "Idempotency key required",
          status: 400,
          detail:
            "An Idempotency-Key header is required.",
          code: "idempotency_key_required",
          retryable: false,
          errors: [],
        },
        { status: 400 },
      );
    }

    const formData = await request.formData();
    validateDocumentUpload(formData);
    const response =
      await serverDocumentClient.createJob(
        formData,
        idempotencyKey,
        request.signal,
      );

    return backendJsonResponse(response);
  } catch (error) {
    return documentApiErrorResponse(error);
  }
}

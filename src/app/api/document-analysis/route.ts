import type { NextRequest } from "next/server";

import {
  backendJsonResponse,
  documentApiErrorResponse,
} from "@/lib/documents/api/apiResponse";
import { serverDocumentClient } from "@/lib/documents/api/serverDocumentClient";
import { validateAnalysisRequest } from "@/lib/documents/upload/serverAnalysisValidation";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    validateAnalysisRequest(formData);

    const response =
      await serverDocumentClient.analyzeDocument(
        formData,
        request.signal,
      );

    return backendJsonResponse(response);
  } catch (error) {
    return documentApiErrorResponse(error);
  }
}

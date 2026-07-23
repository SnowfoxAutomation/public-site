import type { NextRequest } from "next/server";

import {
  backendJsonResponse,
  documentApiErrorResponse,
} from "@/lib/documents/api/apiResponse";
import { serverDocumentClient } from "@/lib/documents/api/serverDocumentClient";

type JobRouteContext = {
  params: Promise<{ jobId: string }>;
};

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(
  request: NextRequest,
  context: JobRouteContext,
) {
  try {
    const { jobId } = await context.params;
    const response =
      await serverDocumentClient.getJob(
        jobId,
        request.signal,
      );

    return backendJsonResponse(response);
  } catch (error) {
    return documentApiErrorResponse(error);
  }
}

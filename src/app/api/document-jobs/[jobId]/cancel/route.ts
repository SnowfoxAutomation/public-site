import type { NextRequest } from "next/server";

import {
  backendJsonResponse,
  documentApiErrorResponse,
} from "@/lib/documents/api/apiResponse";
import { serverDocumentClient } from "@/lib/documents/api/serverDocumentClient";

type JobCancelRouteContext = {
  params: Promise<{ jobId: string }>;
};

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(
  request: NextRequest,
  context: JobCancelRouteContext,
) {
  try {
    const { jobId } = await context.params;
    const response =
      await serverDocumentClient.cancelJob(
        jobId,
        request.signal,
      );

    return backendJsonResponse(response);
  } catch (error) {
    return documentApiErrorResponse(error);
  }
}

import { describe, expect, it } from "vitest";

import {
  apiProblemSchema,
  documentJobResultsSchema,
  documentJobSchema,
} from "./schemas";

const timestamp = "2026-07-23T15:00:00Z";

describe("document API contracts", () => {
  it("normalizes a backend job response", () => {
    const job = documentJobSchema.parse({
      job_id: "job_01",
      status: "processing",
      created_at: timestamp,
      updated_at: timestamp,
      progress: {
        phase: "extracting",
        completed: 1,
        total: 2,
        percent: 50,
      },
      documents: [
        {
          document_id: "doc_01",
          client_file_id:
            "550e8400-e29b-41d4-a716-446655440000",
          filename: "report.pdf",
          media_type: "application/pdf",
          size_bytes: 1024,
          status: "processing",
        },
      ],
    });

    expect(job.jobId).toBe("job_01");
    expect(job.documents[0]?.clientFileId).toBe(
      "550e8400-e29b-41d4-a716-446655440000",
    );
  });

  it("rejects impossible processing progress", () => {
    const result = documentJobSchema.safeParse({
      job_id: "job_01",
      status: "processing",
      created_at: timestamp,
      updated_at: timestamp,
      progress: {
        phase: "extracting",
        completed: 2,
        total: 1,
        percent: 100,
      },
      documents: [],
    });

    expect(result.success).toBe(false);
  });

  it("validates structured result confidence", () => {
    const result =
      documentJobResultsSchema.safeParse({
        job_id: "job_01",
        status: "completed",
        completed_at: timestamp,
        documents: [
          {
            document_id: "doc_01",
            filename: "report.pdf",
            status: "completed",
            error: null,
            result: {
              schema: "snowfox.document-analysis",
              schema_version: "1.0",
              data: {},
              confidence: 1.2,
            },
          },
        ],
      });

    expect(result.success).toBe(false);
  });

  it("normalizes structured field errors", () => {
    const problem = apiProblemSchema.parse({
      type: "about:blank",
      title: "Invalid upload",
      status: 422,
      detail: "A file is invalid.",
      code: "invalid_file",
      retryable: false,
      errors: [
        {
          file_id: "file_01",
          field: "files",
          code: "invalid_file",
          message: "The file is invalid.",
        },
      ],
    });

    expect(problem.errors[0]?.fileId).toBe(
      "file_01",
    );
  });
});

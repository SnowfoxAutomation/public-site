import { z } from "zod";

import {
  documentJobStatuses,
  documentStatuses,
  processingPhases,
  type ApiProblem,
  type JsonValue,
} from "./common";
import type {
  DocumentJob,
  DocumentJobDocument,
  ProcessingProgress,
} from "./jobs";
import type {
  DocumentJobResults,
  DocumentResult,
  DocumentResultEnvelope,
  ResultSection,
  ResultTable,
  ResultWarning,
} from "./results";

const jsonPrimitiveSchema = z.union([
  z.string(),
  z.number(),
  z.boolean(),
  z.null(),
]);

export const jsonValueSchema: z.ZodType<JsonValue> =
  z.lazy(() =>
    z.union([
      jsonPrimitiveSchema,
      z.array(jsonValueSchema),
      z.record(z.string(), jsonValueSchema),
    ]),
  );

export const apiProblemSchema: z.ZodType<ApiProblem> =
  z
    .object({
      type: z.string().min(1),
      title: z.string().min(1),
      status: z.number().int().min(400).max(599),
      detail: z.string(),
      code: z.string().min(1),
      request_id: z.string().min(1).optional(),
      retryable: z.boolean().default(false),
      errors: z
        .array(
          z.object({
            file_id: z.string().min(1).optional(),
            field: z.string().min(1).optional(),
            code: z.string().min(1),
            message: z.string().min(1),
          }),
        )
        .default([]),
    })
    .transform((problem) => ({
      type: problem.type,
      title: problem.title,
      status: problem.status,
      detail: problem.detail,
      code: problem.code,
      requestId: problem.request_id,
      retryable: problem.retryable,
      errors: problem.errors.map((error) => ({
        fileId: error.file_id,
        field: error.field,
        code: error.code,
        message: error.message,
      })),
    }));

const processingProgressSchema: z.ZodType<ProcessingProgress> =
  z
    .object({
      phase: z.enum(processingPhases),
      completed: z.number().int().nonnegative(),
      total: z.number().int().nonnegative(),
      percent: z.number().min(0).max(100).nullable(),
      message: z.string().optional(),
    })
    .refine(
      ({ completed, total }) =>
        total === 0 || completed <= total,
      {
        message:
          "Completed work cannot exceed total work.",
        path: ["completed"],
      },
    );

const documentJobDocumentSchema: z.ZodType<DocumentJobDocument> =
  z
    .object({
      document_id: z.string().min(1),
      client_file_id: z.string().min(1),
      filename: z.string().min(1),
      media_type: z.string().min(1),
      size_bytes: z.number().int().nonnegative(),
      status: z.enum(documentStatuses),
      error: apiProblemSchema.optional(),
    })
    .transform((document) => ({
      documentId: document.document_id,
      clientFileId: document.client_file_id,
      filename: document.filename,
      mediaType: document.media_type,
      sizeBytes: document.size_bytes,
      status: document.status,
      error: document.error,
    }));

export const documentJobSchema: z.ZodType<DocumentJob> =
  z
    .object({
      job_id: z.string().min(1),
      status: z.enum(documentJobStatuses),
      created_at: z.iso.datetime({ offset: true }),
      updated_at: z.iso.datetime({ offset: true }),
      progress: processingProgressSchema,
      documents: z.array(documentJobDocumentSchema),
    })
    .transform((job) => ({
      jobId: job.job_id,
      status: job.status,
      createdAt: job.created_at,
      updatedAt: job.updated_at,
      progress: job.progress,
      documents: job.documents,
    }));

const resultWarningSchema: z.ZodType<ResultWarning> =
  z.object({
    code: z.string().min(1),
    message: z.string().min(1),
    severity: z.enum(["info", "warning", "error"]),
    path: z.string().optional(),
  });

const resultTableSchema: z.ZodType<ResultTable> =
  z.object({
    id: z.string().min(1),
    title: z.string().optional(),
    columns: z.array(
      z.object({
        key: z.string().min(1),
        label: z.string().min(1),
        format: z
          .enum([
            "text",
            "number",
            "date",
            "percentage",
            "confidence",
          ])
          .optional(),
      }),
    ),
    rows: z.array(
      z.record(z.string(), jsonValueSchema),
    ),
  });

const resultSectionSchema: z.ZodType<ResultSection> =
  z.object({
    id: z.string().min(1),
    title: z.string().min(1),
    description: z.string().optional(),
    data: jsonValueSchema,
    confidence: z.number().min(0).max(1).optional(),
    initially_expanded: z.boolean().optional(),
  }).transform((section) => ({
    id: section.id,
    title: section.title,
    description: section.description,
    data: section.data,
    confidence: section.confidence,
    initiallyExpanded: section.initially_expanded,
  }));

const documentResultSchema: z.ZodType<DocumentResult> =
  z
    .object({
      schema: z.string().min(1),
      schema_version: z.string().min(1),
      summary: z.string().optional(),
      sections: z.array(resultSectionSchema).default([]),
      data: jsonValueSchema,
      tables: z.array(resultTableSchema).default([]),
      confidence: z.number().min(0).max(1).optional(),
      warnings: z.array(resultWarningSchema).default([]),
      metadata: z
        .record(z.string(), jsonValueSchema)
        .default({}),
    })
    .transform((result) => ({
      schema: result.schema,
      schemaVersion: result.schema_version,
      summary: result.summary,
      sections: result.sections,
      data: result.data,
      tables: result.tables,
      confidence: result.confidence,
      warnings: result.warnings,
      metadata: result.metadata,
    }));

const documentResultEnvelopeSchema: z.ZodType<DocumentResultEnvelope> =
  z
    .object({
      document_id: z.string().min(1),
      filename: z.string().min(1),
      status: z.enum(documentStatuses),
      result: documentResultSchema.nullable(),
      error: apiProblemSchema.nullable(),
    })
    .transform((document) => ({
      documentId: document.document_id,
      filename: document.filename,
      status: document.status,
      result: document.result,
      error: document.error,
    }));

export const documentJobResultsSchema: z.ZodType<DocumentJobResults> =
  z
    .object({
      job_id: z.string().min(1),
      status: z.union([
        z.enum(documentStatuses),
        z.literal("partially_completed"),
      ]),
      completed_at: z.iso
        .datetime({ offset: true })
        .nullable(),
      documents: z.array(
        documentResultEnvelopeSchema,
      ),
    })
    .transform((results) => ({
      jobId: results.job_id,
      status: results.status,
      completedAt: results.completed_at,
      documents: results.documents,
    }));

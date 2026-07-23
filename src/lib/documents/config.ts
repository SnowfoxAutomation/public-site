import "server-only";

import { z } from "zod";

const documentApiConfigSchema = z.object({
  baseUrl: z.url(),
  requestTimeoutMs: z.number().int().positive(),
  apiToken: z.string().min(1).optional(),
});

export type DocumentApiConfig = z.infer<
  typeof documentApiConfigSchema
>;

export function getDocumentApiConfig(): DocumentApiConfig {
  return documentApiConfigSchema.parse({
    baseUrl:
      process.env.DOCUMENT_API_BASE_URL ??
      "http://127.0.0.1:8000",
    requestTimeoutMs: Number(
      process.env.DOCUMENT_API_TIMEOUT_MS ??
        120_000,
    ),
    apiToken:
      process.env.DOCUMENT_API_TOKEN ||
      undefined,
  });
}

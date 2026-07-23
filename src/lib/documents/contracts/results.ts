import type {
  ApiProblem,
  DocumentStatus,
  JsonValue,
} from "./common";

export type ResultWarning = {
  code: string;
  message: string;
  severity: "info" | "warning" | "error";
  path?: string;
};

export type ResultTableColumn = {
  key: string;
  label: string;
  format?:
    | "text"
    | "number"
    | "date"
    | "percentage"
    | "confidence";
};

export type ResultTable = {
  id: string;
  title?: string;
  columns: ResultTableColumn[];
  rows: Array<Record<string, JsonValue>>;
};

export type ResultSection = {
  id: string;
  title: string;
  description?: string;
  data: JsonValue;
  confidence?: number;
  initiallyExpanded?: boolean;
};

export type DocumentResult = {
  schema: string;
  schemaVersion: string;
  summary?: string;
  sections: ResultSection[];
  data: JsonValue;
  tables: ResultTable[];
  confidence?: number;
  warnings: ResultWarning[];
  metadata: Record<string, JsonValue>;
};

export type DocumentResultEnvelope = {
  documentId: string;
  filename: string;
  status: DocumentStatus;
  result: DocumentResult | null;
  error: ApiProblem | null;
};

export type DocumentJobResults = {
  jobId: string;
  status: DocumentStatus | "partially_completed";
  completedAt: string | null;
  documents: DocumentResultEnvelope[];
};

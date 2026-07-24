export type PiiFinding = {
  entityType: string;
  text: string;
  start: number;
  end: number;
  score: number;
};

export type AnalysisSummary = {
  totalFindings: number;
  byEntityType: Record<string, number>;
  charactersScanned: number;
};

export type DocumentAnalysis = {
  source: string | null;
  warning?: string;
  summary: AnalysisSummary;
  findings: PiiFinding[];
  taggedText: string;
};

export type AnalyzeDocumentRequest = {
  file: File;
  scoreThreshold: number;
};

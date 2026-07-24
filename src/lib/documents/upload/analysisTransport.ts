import type {
  AnalyzeDocumentRequest,
  DocumentAnalysis,
} from "../contracts/analysis";
import type { UploadRequestOptions } from "../contracts/jobs";

export interface AnalysisTransport {
  analyze(
    request: AnalyzeDocumentRequest,
    options?: UploadRequestOptions,
  ): Promise<DocumentAnalysis>;
}

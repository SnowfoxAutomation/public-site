import type { ApiProblem } from "../contracts/common";
import type { DocumentJob } from "../contracts/jobs";

export type JobUpdateHandlers = {
  onUpdate: (job: DocumentJob) => void;
  onError: (problem: ApiProblem) => void;
};

export interface JobUpdatesTransport {
  watchJob(
    jobId: string,
    handlers: JobUpdateHandlers,
    signal: AbortSignal,
  ): Promise<void>;
}

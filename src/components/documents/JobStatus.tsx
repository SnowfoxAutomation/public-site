import { Button } from "@/components/ui/button";
import { documentsContent } from "@/content/documents";
import type { DocumentJobState } from "@/lib/documents/state/uploadState";

import { jobStatusVariants } from "./JobStatus.variants";

type JobStatusProps = {
  jobs: readonly DocumentJobState[];
  cancellingJobId: string | null;
  onCancel: (jobId: string) => void;
};

const statusLabels = {
  queued: documentsContent.jobs.queuedLabel,
  uploading: documentsContent.jobs.uploadingLabel,
  processing:
    documentsContent.jobs.processingLabel,
  completed: documentsContent.jobs.completedLabel,
  partially_completed:
    documentsContent.jobs.partiallyCompletedLabel,
  failed: documentsContent.jobs.failedLabel,
  cancelled:
    documentsContent.jobs.cancelledLabel,
} as const;

const cancellableStatuses = new Set([
  "queued",
  "uploading",
  "processing",
]);

export function JobStatus({
  jobs,
  cancellingJobId,
  onCancel,
}: JobStatusProps) {
  if (jobs.length === 0) {
    return null;
  }

  return (
    <section
      className={jobStatusVariants.section}
      aria-labelledby="processing-jobs-title"
    >
      <h2
        id="processing-jobs-title"
        className={jobStatusVariants.heading}
      >
        {documentsContent.jobs.title}
      </h2>

      <ul className={jobStatusVariants.list}>
        {jobs.map(({ job, updateProblem }) => {
          const isCancelling =
            cancellingJobId === job.jobId;
          const canCancel =
            cancellableStatuses.has(job.status);

          return (
            <li
              key={job.jobId}
              className={jobStatusVariants.card}
            >
              <div
                className={
                  jobStatusVariants.cardHeader
                }
              >
                <div
                  className={
                    jobStatusVariants.identity
                  }
                >
                  <p
                    className={
                      jobStatusVariants.jobId
                    }
                    title={job.jobId}
                  >
                    {job.jobId}
                  </p>
                  <p
                    className={
                      jobStatusVariants.status
                    }
                  >
                    {statusLabels[job.status]}
                  </p>
                </div>

                {canCancel ? (
                  <Button
                    type="button"
                    size="small"
                    variant="outline"
                    disabled={isCancelling}
                    onClick={() =>
                      onCancel(job.jobId)
                    }
                  >
                    {isCancelling
                      ? documentsContent.jobs
                          .cancellingLabel
                      : documentsContent.jobs
                          .cancelLabel}
                  </Button>
                ) : null}
              </div>

              {job.progress.message ? (
                <p
                  className={
                    jobStatusVariants.message
                  }
                >
                  {job.progress.message}
                </p>
              ) : null}

              <progress
                className={
                  jobStatusVariants.progress
                }
                aria-label={
                  documentsContent.jobs.progressLabel
                }
                max={100}
                value={job.progress.percent ?? undefined}
              >
                {job.progress.percent ?? 0}%
              </progress>

              <p
                className={jobStatusVariants.detail}
              >
                {job.progress.completed} of{" "}
                {job.progress.total}{" "}
                {documentsContent.jobs.documentsLabel}
              </p>

              {updateProblem ? (
                <p
                  role="alert"
                  className={
                    jobStatusVariants.error
                  }
                >
                  {updateProblem.detail}
                </p>
              ) : null}
            </li>
          );
        })}
      </ul>
    </section>
  );
}

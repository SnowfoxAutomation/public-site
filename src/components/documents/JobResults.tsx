import { Button } from "@/components/ui/button";
import { documentsContent } from "@/content/documents";
import type { DocumentJobState } from "@/lib/documents/state/uploadState";

import { jobResultsVariants } from "./JobResults.variants";
import { RawJsonView } from "./RawJsonView";
import { ResultMetadata } from "./ResultMetadata";
import { ResultNode } from "./ResultNode";
import { ResultTable } from "./ResultTable";
import { ResultWarnings } from "./ResultWarnings";

type JobResultsProps = {
  jobs: readonly DocumentJobState[];
  onRetry: (jobId: string) => void;
};

export function JobResults({
  jobs,
  onRetry,
}: JobResultsProps) {
  const resultJobs = jobs.filter(
    ({ resultsStatus }) =>
      resultsStatus !== "idle",
  );

  if (resultJobs.length === 0) {
    return null;
  }

  return (
    <section
      className={jobResultsVariants.section}
      aria-labelledby="document-results-title"
    >
      <h2
        id="document-results-title"
        className={jobResultsVariants.heading}
      >
        {documentsContent.results.title}
      </h2>

      {resultJobs.map((jobState) => (
        <article
          key={jobState.job.jobId}
          className={jobResultsVariants.job}
        >
          <p className={jobResultsVariants.jobId}>
            {jobState.job.jobId}
          </p>

          {jobState.resultsStatus === "loading" ? (
            <p
              role="status"
              className={jobResultsVariants.loading}
            >
              {
                documentsContent.results
                  .loadingLabel
              }
            </p>
          ) : null}

          {jobState.resultsProblem ? (
            <div
              className={jobResultsVariants.error}
            >
              <h3
                className={
                  jobResultsVariants.errorTitle
                }
              >
                {
                  documentsContent.results
                    .unavailableTitle
                }
              </h3>
              <p
                className={
                  jobResultsVariants.errorBody
                }
              >
                {jobState.resultsProblem.detail}
              </p>
              <Button
                type="button"
                size="small"
                variant="outline"
                className={jobResultsVariants.retry}
                onClick={() =>
                  onRetry(jobState.job.jobId)
                }
              >
                {
                  documentsContent.results
                    .retryLabel
                }
              </Button>
            </div>
          ) : null}

          {jobState.results ? (
            <div
              className={
                jobResultsVariants.documents
              }
            >
              {jobState.results.documents.map(
                (document) => (
                  <article
                    key={document.documentId}
                    className={
                      jobResultsVariants.document
                    }
                  >
                    <h3
                      className={
                        jobResultsVariants.documentTitle
                      }
                    >
                      {document.filename}
                    </h3>

                    {document.error ? (
                      <p
                        role="alert"
                        className={
                          jobResultsVariants.documentError
                        }
                      >
                        {document.error.detail}
                      </p>
                    ) : null}

                    {document.result ? (
                      <div
                        className={
                          jobResultsVariants.result
                        }
                      >
                        {document.result.summary ? (
                          <section
                            className={
                              jobResultsVariants.subsection
                            }
                          >
                            <h4
                              className={
                                jobResultsVariants.subsectionTitle
                              }
                            >
                              {
                                documentsContent.results
                                  .summaryTitle
                              }
                            </h4>
                            <p
                              className={
                                jobResultsVariants.summary
                              }
                            >
                              {
                                document.result
                                  .summary
                              }
                            </p>
                            {document.result
                              .confidence !==
                            undefined ? (
                              <p
                                className={
                                  jobResultsVariants.confidence
                                }
                              >
                                {
                                  documentsContent
                                    .results
                                    .confidenceLabel
                                }
                                :{" "}
                                {Math.round(
                                  document.result
                                    .confidence * 100,
                                )}
                                %
                              </p>
                            ) : null}
                          </section>
                        ) : null}

                        <ResultWarnings
                          warnings={
                            document.result.warnings
                          }
                        />

                        {document.result.sections.map(
                          (section) => (
                            <details
                              key={section.id}
                              className={
                                jobResultsVariants.subsection
                              }
                              open={
                                section.initiallyExpanded
                              }
                            >
                              <summary
                                className={
                                  jobResultsVariants.subsectionTitle
                                }
                              >
                                {section.title}
                              </summary>
                              {section.description ? (
                                <p
                                  className={
                                    jobResultsVariants.summary
                                  }
                                >
                                  {
                                    section.description
                                  }
                                </p>
                              ) : null}
                              <ResultNode
                                value={section.data}
                                path={section.id}
                              />
                              {section.confidence !==
                              undefined ? (
                                <p
                                  className={
                                    jobResultsVariants.confidence
                                  }
                                >
                                  {
                                    documentsContent
                                      .results
                                      .confidenceLabel
                                  }
                                  :{" "}
                                  {Math.round(
                                    section.confidence *
                                      100,
                                  )}
                                  %
                                </p>
                              ) : null}
                            </details>
                          ),
                        )}

                        {document.result.tables.map(
                          (table) => (
                            <ResultTable
                              key={table.id}
                              table={table}
                            />
                          ),
                        )}

                        <section
                          className={
                            jobResultsVariants.subsection
                          }
                        >
                          <h4
                            className={
                              jobResultsVariants.subsectionTitle
                            }
                          >
                            {
                              documentsContent.results
                                .extractedDataTitle
                            }
                          </h4>
                          <ResultNode
                            value={document.result.data}
                            path="data"
                          />
                        </section>

                        <ResultMetadata
                          metadata={
                            document.result.metadata
                          }
                        />

                        <RawJsonView
                          value={document.result}
                        />
                      </div>
                    ) : null}
                  </article>
                ),
              )}
            </div>
          ) : null}
        </article>
      ))}
    </section>
  );
}

import { documentsContent } from "@/content/documents";
import type { JsonValue } from "@/lib/documents/contracts/common";
import type { ResultTable as ResultTableModel } from "@/lib/documents/contracts/results";
import type { UploadQueueItem } from "@/lib/documents/state/uploadState";

import { analysisResultsVariants } from "./AnalysisResults.variants";
import { RawJsonView } from "./RawJsonView";
import { ResultTable } from "./ResultTable";

type AnalysisResultsProps = {
  items: readonly UploadQueueItem[];
};

function createFindingsTable(
  item: UploadQueueItem,
): ResultTableModel | null {
  if (!item.analysis?.findings.length) {
    return null;
  }

  return {
    id: `${item.localId}-findings`,
    title: documentsContent.results.findingsTitle,
    columns: [
      {
        key: "category",
        label:
          documentsContent.results.categoryLabel,
      },
      {
        key: "text",
        label:
          documentsContent.results
            .detectedTextLabel,
      },
      {
        key: "confidence",
        label: documentsContent.results.scoreLabel,
        format: "confidence",
      },
      {
        key: "start",
        label: documentsContent.results.startLabel,
        format: "number",
      },
      {
        key: "end",
        label: documentsContent.results.endLabel,
        format: "number",
      },
    ],
    rows: item.analysis.findings.map(
      (finding) =>
        ({
          category: finding.entityType,
          text: finding.text,
          confidence: `${Math.round(
            finding.score * 100,
          )}%`,
          start: finding.start,
          end: finding.end,
        }) satisfies Record<string, JsonValue>,
    ),
  };
}

export function AnalysisResults({
  items,
}: AnalysisResultsProps) {
  const completedItems = items.filter(
    ({ status, analysis }) =>
      status === "completed" && analysis,
  );

  if (completedItems.length === 0) {
    return null;
  }

  return (
    <section
      className={analysisResultsVariants.section}
      aria-labelledby="analysis-results-title"
    >
      <h2
        id="analysis-results-title"
        className={analysisResultsVariants.heading}
      >
        {documentsContent.results.title}
      </h2>

      <div className={analysisResultsVariants.list}>
        {completedItems.map((item) => {
          const analysis = item.analysis;

          if (!analysis) {
            return null;
          }

          const findingsTable =
            createFindingsTable(item);

          return (
            <article
              key={item.localId}
              className={
                analysisResultsVariants.result
              }
            >
              <h3
                className={
                  analysisResultsVariants.filename
                }
              >
                {item.file.name}
              </h3>

              <div
                className={
                  analysisResultsVariants.summary
                }
              >
                <div
                  className={
                    analysisResultsVariants.metric
                  }
                >
                  <p
                    className={
                      analysisResultsVariants.metricLabel
                    }
                  >
                    {
                      documentsContent.results
                        .findingsTitle
                    }
                  </p>
                  <p
                    className={
                      analysisResultsVariants.metricValue
                    }
                  >
                    {analysis.summary.totalFindings}
                  </p>
                </div>

                <div
                  className={
                    analysisResultsVariants.metric
                  }
                >
                  <p
                    className={
                      analysisResultsVariants.metricLabel
                    }
                  >
                    {
                      documentsContent.results
                        .charactersScannedLabel
                    }
                  </p>
                  <p
                    className={
                      analysisResultsVariants.metricValue
                    }
                  >
                    {
                      analysis.summary
                        .charactersScanned
                    }
                  </p>
                </div>
              </div>

              {Object.keys(
                analysis.summary.byEntityType,
              ).length > 0 ? (
                <div
                  className={
                    analysisResultsVariants.categories
                  }
                  aria-label="Findings by category"
                >
                  {Object.entries(
                    analysis.summary.byEntityType,
                  ).map(([category, count]) => (
                    <span
                      key={category}
                      className={
                        analysisResultsVariants.category
                      }
                    >
                      {category}: {count}
                    </span>
                  ))}
                </div>
              ) : null}

              {analysis.warning ? (
                <p
                  className={
                    analysisResultsVariants.warning
                  }
                >
                  {analysis.warning}
                </p>
              ) : null}

              {findingsTable ? (
                <div
                  className={
                    analysisResultsVariants.block
                  }
                >
                  <ResultTable
                    table={findingsTable}
                  />
                </div>
              ) : (
                <p
                  className={
                    analysisResultsVariants.empty
                  }
                >
                  {
                    documentsContent.results
                      .noFindings
                  }
                </p>
              )}

              {analysis.taggedText ? (
                <section
                  className={
                    analysisResultsVariants.block
                  }
                >
                  <h4
                    className={
                      analysisResultsVariants.blockTitle
                    }
                  >
                    {
                      documentsContent.results
                        .taggedTextTitle
                    }
                  </h4>
                  <code
                    className={
                      analysisResultsVariants.taggedText
                    }
                  >
                    {analysis.taggedText}
                  </code>
                </section>
              ) : null}

              <div
                className={
                  analysisResultsVariants.block
                }
              >
                <RawJsonView value={analysis} />
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

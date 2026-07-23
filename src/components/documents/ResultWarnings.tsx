import { documentsContent } from "@/content/documents";
import type { ResultWarning } from "@/lib/documents/contracts/results";

import { resultWarningsVariants } from "./ResultWarnings.variants";

type ResultWarningsProps = {
  warnings: readonly ResultWarning[];
};

export function ResultWarnings({
  warnings,
}: ResultWarningsProps) {
  if (warnings.length === 0) {
    return null;
  }

  return (
    <section
      className={resultWarningsVariants.section}
    >
      <h4
        className={resultWarningsVariants.title}
      >
        {documentsContent.results.warningsTitle}
      </h4>
      <ul className={resultWarningsVariants.list}>
        {warnings.map((warning, index) => (
          <li
            key={`${warning.code}-${index}`}
            className={resultWarningsVariants.item}
          >
            <span
              className={
                resultWarningsVariants.severity
              }
            >
              {warning.severity}
            </span>
            {warning.message}
          </li>
        ))}
      </ul>
    </section>
  );
}

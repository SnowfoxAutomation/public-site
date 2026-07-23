import { documentsContent } from "@/content/documents";

import { rawJsonViewVariants } from "./RawJsonView.variants";

type RawJsonViewProps = {
  value: unknown;
};

export function RawJsonView({
  value,
}: RawJsonViewProps) {
  return (
    <details className={rawJsonViewVariants.details}>
      <summary
        className={rawJsonViewVariants.summary}
      >
        {documentsContent.results.rawJsonTitle}
      </summary>
      <code className={rawJsonViewVariants.code}>
        {JSON.stringify(value, null, 2)}
      </code>
    </details>
  );
}

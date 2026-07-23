import { documentsContent } from "@/content/documents";
import type { JsonValue } from "@/lib/documents/contracts/common";

import { ResultNode } from "./ResultNode";
import { resultMetadataVariants } from "./ResultMetadata.variants";

type ResultMetadataProps = {
  metadata: Record<string, JsonValue>;
};

export function ResultMetadata({
  metadata,
}: ResultMetadataProps) {
  if (Object.keys(metadata).length === 0) {
    return null;
  }

  return (
    <details
      className={resultMetadataVariants.details}
    >
      <summary
        className={resultMetadataVariants.summary}
      >
        {documentsContent.results.metadataTitle}
      </summary>
      <div className={resultMetadataVariants.body}>
        <ResultNode
          value={metadata}
          path="metadata"
        />
      </div>
    </details>
  );
}

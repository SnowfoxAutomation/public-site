import { documentsContent } from "@/content/documents";
import type { JsonValue } from "@/lib/documents/contracts/common";

import { resultNodeVariants } from "./ResultNode.variants";
import {
  ResultTable,
  createTableFromObjects,
} from "./ResultTable";

type ResultNodeProps = {
  value: JsonValue;
  path: string;
  depth?: number;
};

function humanizeKey(key: string) {
  return key
    .replace(/[_-]+/g, " ")
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/^./, (character) =>
      character.toUpperCase(),
    );
}

function isRecord(
  value: JsonValue,
): value is Record<string, JsonValue> {
  return (
    typeof value === "object" &&
    value !== null &&
    !Array.isArray(value)
  );
}

function isPrimitive(value: JsonValue) {
  return (
    value === null || typeof value !== "object"
  );
}

function formatPrimitive(value: JsonValue) {
  if (value === null) {
    return documentsContent.results.emptyValue;
  }

  if (typeof value === "boolean") {
    return value ? "Yes" : "No";
  }

  return String(value);
}

export function ResultNode({
  value,
  path,
  depth = 0,
}: ResultNodeProps) {
  if (isPrimitive(value)) {
    return (
      <p className={resultNodeVariants.primitive}>
        {formatPrimitive(value)}
      </p>
    );
  }

  if (Array.isArray(value)) {
    if (value.length === 0) {
      return (
        <p
          className={resultNodeVariants.empty}
        >
          {
            documentsContent.results
              .emptyCollection
          }
        </p>
      );
    }

    if (value.every(isPrimitive)) {
      return (
        <ul className={resultNodeVariants.list}>
          {value.map((item, index) => (
            <li key={`${path}-${index}`}>
              {formatPrimitive(item)}
            </li>
          ))}
        </ul>
      );
    }

    if (value.every(isRecord)) {
      const table =
        createTableFromObjects(path, value);

      if (table) {
        return <ResultTable table={table} />;
      }
    }

    return (
      <div
        className={resultNodeVariants.collection}
      >
        {value.map((item, index) => (
          <details
            key={`${path}-${index}`}
            className={resultNodeVariants.details}
            open={depth < 1}
          >
            <summary
              className={resultNodeVariants.summary}
            >
              Item {index + 1}
            </summary>
            <div
              className={resultNodeVariants.root}
            >
              <ResultNode
                value={item}
                path={`${path}.${index}`}
                depth={depth + 1}
              />
            </div>
          </details>
        ))}
      </div>
    );
  }

  const entries = Object.entries(value);

  if (entries.length === 0) {
    return (
      <p className={resultNodeVariants.empty}>
        {documentsContent.results.emptyCollection}
      </p>
    );
  }

  return (
    <dl className={resultNodeVariants.properties}>
      {entries.map(([key, childValue]) => (
        <div
          key={`${path}.${key}`}
          className={resultNodeVariants.property}
        >
          <dt className={resultNodeVariants.term}>
            {humanizeKey(key)}
          </dt>
          <dd className={resultNodeVariants.value}>
            <ResultNode
              value={childValue}
              path={`${path}.${key}`}
              depth={depth + 1}
            />
          </dd>
        </div>
      ))}
    </dl>
  );
}

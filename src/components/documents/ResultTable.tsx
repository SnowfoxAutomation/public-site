import { documentsContent } from "@/content/documents";
import type { JsonValue } from "@/lib/documents/contracts/common";
import type {
  ResultTable as ResultTableModel,
} from "@/lib/documents/contracts/results";

import { resultTableVariants } from "./ResultTable.variants";

const maximumVisibleRows = 100;

function formatCell(value: JsonValue | undefined) {
  if (value === undefined || value === null) {
    return "—";
  }

  if (typeof value === "object") {
    return JSON.stringify(value);
  }

  if (typeof value === "boolean") {
    return value ? "Yes" : "No";
  }

  return String(value);
}

export function createTableFromObjects(
  id: string,
  rows: Array<Record<string, JsonValue>>,
): ResultTableModel | null {
  const keys = Array.from(
    new Set(rows.flatMap((row) => Object.keys(row))),
  );

  if (keys.length === 0 || keys.length > 20) {
    return null;
  }

  return {
    id,
    columns: keys.map((key) => ({
      key,
      label: key
        .replace(/[_-]+/g, " ")
        .replace(/^./, (character) =>
          character.toUpperCase(),
        ),
    })),
    rows,
  };
}

type ResultTableProps = {
  table: ResultTableModel;
};

export function ResultTable({
  table,
}: ResultTableProps) {
  const visibleRows = table.rows.slice(
    0,
    maximumVisibleRows,
  );

  return (
    <section
      className={resultTableVariants.section}
    >
      {table.title ? (
        <h4 className={resultTableVariants.title}>
          {table.title}
        </h4>
      ) : null}

      <div className={resultTableVariants.scroller}>
        <table className={resultTableVariants.table}>
          <thead>
            <tr>
              {table.columns.map((column) => (
                <th
                  key={column.key}
                  scope="col"
                  className={
                    resultTableVariants.heading
                  }
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {visibleRows.map((row, rowIndex) => (
              <tr key={`${table.id}-${rowIndex}`}>
                {table.columns.map((column) => (
                  <td
                    key={column.key}
                    className={
                      resultTableVariants.cell
                    }
                  >
                    {formatCell(row[column.key])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {table.rows.length > maximumVisibleRows ? (
        <p className={resultTableVariants.note}>
          {documentsContent.results.additionalRows}
        </p>
      ) : null}
    </section>
  );
}

import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { RawJsonView } from "./RawJsonView";
import { ResultNode } from "./ResultNode";
import { ResultWarnings } from "./ResultWarnings";

describe("document result accessibility", () => {
  it("uses table headers for object arrays", () => {
    const markup = renderToStaticMarkup(
      <ResultNode
        path="records"
        value={[
          { name: "Alpha", confidence: 0.9 },
          { name: "Bravo", confidence: 0.8 },
        ]}
      />,
    );

    expect(markup).toContain("<table");
    expect(markup).toContain('scope="col"');
  });

  it("uses native disclosure semantics for raw JSON", () => {
    const markup = renderToStaticMarkup(
      <RawJsonView value={{ status: "complete" }} />,
    );

    expect(markup).toContain("<details");
    expect(markup).toContain("<summary");
  });

  it("renders warning severity as visible text", () => {
    const markup = renderToStaticMarkup(
      <ResultWarnings
        warnings={[
          {
            code: "low_confidence",
            message: "Review this value.",
            severity: "warning",
          },
        ]}
      />,
    );

    expect(markup).toContain("warning");
    expect(markup).toContain("Review this value.");
  });
});

import { describe, expect, it } from "vitest";

import { acceptedDocumentExtensions } from "./acceptedFileTypes";

describe("backend-supported file types", () => {
  it("matches the backend parser registry", () => {
    expect(
      [...acceptedDocumentExtensions].sort(),
    ).toEqual(
      [
        ".txt",
        ".md",
        ".csv",
        ".log",
        ".json",
        ".docx",
        ".pdf",
        ".pptx",
        ".png",
        ".jpg",
        ".jpeg",
        ".tiff",
        ".tif",
        ".bmp",
        ".webp",
      ].sort(),
    );
  });
});

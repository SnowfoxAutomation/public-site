export type AcceptedDocumentType = {
  label: string;
  extensions: readonly string[];
  mimeTypes: readonly string[];
};

export const acceptedDocumentTypes = [
  {
    label: "PDF",
    extensions: [".pdf"],
    mimeTypes: ["application/pdf"],
  },
  {
    label: "Microsoft Word",
    extensions: [".docx"],
    mimeTypes: [
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ],
  },
  {
    label: "Plain text",
    extensions: [".txt"],
    mimeTypes: ["text/plain"],
  },
  {
    label: "CSV",
    extensions: [".csv"],
    mimeTypes: ["text/csv", "application/csv"],
  },
  {
    label: "Markdown",
    extensions: [".md"],
    mimeTypes: ["text/markdown", "text/plain"],
  },
  {
    label: "Log file",
    extensions: [".log"],
    mimeTypes: ["text/plain"],
  },
  {
    label: "JSON",
    extensions: [".json"],
    mimeTypes: ["application/json", "text/json"],
  },
  {
    label: "Microsoft PowerPoint",
    extensions: [".pptx"],
    mimeTypes: [
      "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    ],
  },
  {
    label: "JPEG image",
    extensions: [".jpg", ".jpeg"],
    mimeTypes: ["image/jpeg"],
  },
  {
    label: "PNG image",
    extensions: [".png"],
    mimeTypes: ["image/png"],
  },
  {
    label: "TIFF image",
    extensions: [".tif", ".tiff"],
    mimeTypes: ["image/tiff"],
  },
  {
    label: "BMP image",
    extensions: [".bmp"],
    mimeTypes: ["image/bmp", "image/x-ms-bmp"],
  },
  {
    label: "WebP image",
    extensions: [".webp"],
    mimeTypes: ["image/webp"],
  },
] as const satisfies readonly AcceptedDocumentType[];

export const documentUploadPolicy = {
  maximumFilesPerJob: 20,
  maximumFileSizeBytes: 50 * 1024 * 1024,
  maximumBatchSizeBytes: 200 * 1024 * 1024,
} as const;

export const acceptedDocumentExtensions =
  acceptedDocumentTypes.flatMap(
    ({ extensions }) => extensions,
  );

export const acceptedDocumentMimeTypes =
  acceptedDocumentTypes.flatMap(
    ({ mimeTypes }) => mimeTypes,
  );

export const documentInputAccept = [
  ...acceptedDocumentExtensions,
  ...acceptedDocumentMimeTypes,
].join(",");

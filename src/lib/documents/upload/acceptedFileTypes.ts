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
    extensions: [".doc", ".docx"],
    mimeTypes: [
      "application/msword",
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
    label: "Microsoft Excel",
    extensions: [".xls", ".xlsx"],
    mimeTypes: [
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
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

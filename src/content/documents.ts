export const documentsContent = {
  metadata: {
    title: "Document Processing",
    description:
      "Upload documents for secure automated processing and structured results.",
  },
  hero: {
    eyebrow: "Document processing",
    title: "Turn complex documents into structured results.",
    description:
      "Upload one or more supported files, monitor their progress and review processing results in a clear, structured workspace.",
  },
  securityNotice: {
    title: "Public preview environment",
    description:
      "Do not upload classified, protected, export-controlled, personal or operationally sensitive information. Authentication and production data-handling controls are not yet enabled.",
  },
  upload: {
    title: "Upload documents",
    description:
      "Drag and drop files here, or browse your device.",
    browseLabel: "Browse files",
    guidance:
      "PDF, Word, text, CSV, Excel, JPEG, PNG and TIFF files are supported.",
    selectedAnnouncement:
      "The selected documents were added to the upload queue.",
  },
  queue: {
    title: "Upload queue",
    emptyTitle: "No documents selected",
    emptyDescription:
      "Select one or more supported documents to prepare a processing job.",
    removeLabel: "Remove",
    clearLabel: "Clear queue",
    submitLabel: "Submit for processing",
    submittingLabel: "Uploading documents...",
    cancelLabel: "Cancel upload",
    submissionError:
      "The documents could not be submitted.",
    cancelledLabel: "Upload cancelled",
    uploadedLabel: "Submitted",
    uploadingLabel: "Uploading",
    failedLabel: "Upload failed",
    processingLabel: "Processing",
    completedLabel: "Completed",
    readyLabel: "Ready",
    invalidLabel: "Needs attention",
  },
  jobs: {
    title: "Processing jobs",
    queuedLabel: "Queued",
    uploadingLabel: "Uploading",
    processingLabel: "Processing",
    completedLabel: "Completed",
    partiallyCompletedLabel:
      "Partially completed",
    failedLabel: "Failed",
    cancelledLabel: "Cancelled",
    cancelLabel: "Cancel job",
    cancellingLabel: "Cancelling...",
    progressLabel: "Processing progress",
    documentsLabel: "documents",
  },
  results: {
    title: "Processing results",
    loadingLabel: "Loading structured results...",
    retryLabel: "Retry results",
    unavailableTitle: "Results unavailable",
    documentErrorTitle:
      "This document could not be processed",
    summaryTitle: "Summary",
    confidenceLabel: "Confidence",
    warningsTitle: "Warnings",
    metadataTitle: "Metadata",
    extractedDataTitle: "Extracted data",
    rawJsonTitle: "Raw JSON",
    emptyValue: "No value",
    emptyCollection: "No data returned",
    additionalRows: "Additional rows are not shown.",
  },
  validation: {
    unsupportedType:
      "This file type is not supported.",
    fileTooLarge:
      "This file exceeds the maximum allowed size.",
    tooManyFiles:
      "The upload queue contains too many files.",
    batchTooLarge:
      "The combined upload exceeds the maximum batch size.",
    duplicateFile:
      "This file is already in the upload queue.",
    emptyFile: "Empty files cannot be processed.",
  },
} as const;

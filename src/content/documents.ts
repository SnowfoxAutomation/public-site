export const documentsContent = {
  metadata: {
    title: "Sensitive Information Detection",
    description:
      "Analyze documents for personal information and Canadian identifiers.",
  },
  hero: {
    eyebrow: "Sensitive information detection",
    title:
      "Identify potentially sensitive information in documents.",
    description:
      "Upload one or more documents to scan for personal information and Canadian identifiers. Review detected values, categories and confidence scores in a structured workspace.",
  },
  securityNotice: {
    title: "Local proof-of-concept environment",
    description:
      "Do not upload classified, protected, export-controlled, personal or operationally sensitive information unless this complete deployment has been explicitly approved for that data.",
  },
  expectations: {
    title: "Human review required",
    description:
      "Results support human review and may include false positives or missed information. Scan quality, document structure and language can affect detection accuracy.",
  },
  upload: {
    title: "Upload documents",
    description:
      "Drag and drop files here, or browse your device.",
    browseLabel: "Browse files",
    guidance:
      "Supports PDF, DOCX, PPTX, TXT, Markdown, CSV, JSON, log files, and common image formats. Scanned PDFs and images are processed using OCR.",
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
    submitLabel: "Analyze documents",
    retryLabel: "Retry analysis",
    submittingLabel: "Uploading documents...",
    cancelLabel: "Stop waiting",
    submissionError:
      "The documents could not be submitted.",
    cancelledLabel: "Upload cancelled",
    uploadedLabel: "Submitted",
    uploadingLabel: "Uploading",
    analyzingLabel: "Extracting and analyzing",
    failedLabel: "Could not be analyzed",
    processingLabel: "Analyzing",
    completedLabel: "Completed",
    readyLabel: "Ready",
    invalidLabel: "Needs attention",
  },
  confidence: {
    label: "Minimum confidence",
    guidance:
      "Lower values may identify more potential matches but can increase false positives. Higher values are more selective and may reduce false positives while increasing the chance of missed detections.",
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
    title: "Detection results",
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
    findingsTitle: "Detected information",
    categoryLabel: "Category",
    detectedTextLabel: "Detected value",
    scoreLabel: "Confidence",
    startLabel: "Start",
    endLabel: "End",
    charactersScannedLabel: "Characters scanned",
    noFindings:
      "No potential sensitive information was detected at the selected confidence threshold.",
    taggedTextTitle: "Tagged text",
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

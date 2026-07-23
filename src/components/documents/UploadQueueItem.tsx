import {
  AlertTriangle,
  FileText,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { documentsContent } from "@/content/documents";
import type { UploadQueueItem as UploadQueueItemType } from "@/lib/documents/state/uploadState";
import { cn } from "@/lib/utils/cn";

import { uploadQueueItemVariants } from "./UploadQueueItem.variants";

type UploadQueueItemProps = {
  item: UploadQueueItemType;
  onRemove: (localId: string) => void;
};

function formatFileSize(sizeBytes: number) {
  if (sizeBytes < 1024) {
    return `${sizeBytes} B`;
  }

  if (sizeBytes < 1024 * 1024) {
    return `${(sizeBytes / 1024).toFixed(1)} KB`;
  }

  return `${(
    sizeBytes /
    (1024 * 1024)
  ).toFixed(1)} MB`;
}

export function UploadQueueItem({
  item,
  onRemove,
}: UploadQueueItemProps) {
  const isInvalid = item.status === "invalid";
  const Icon = isInvalid
    ? AlertTriangle
    : FileText;
  const isUploading = item.status === "uploading";

  const statusLabel = {
    ready: documentsContent.queue.readyLabel,
    invalid: documentsContent.queue.invalidLabel,
    uploading:
      documentsContent.queue.uploadingLabel,
    submitted:
      documentsContent.queue.uploadedLabel,
    processing:
      documentsContent.queue.processingLabel,
    completed:
      documentsContent.queue.completedLabel,
    failed: documentsContent.queue.failedLabel,
    cancelled:
      documentsContent.queue.cancelledLabel,
  }[item.status];

  return (
    <li
      className={cn(
        uploadQueueItemVariants.root,
        isInvalid && uploadQueueItemVariants.invalid,
      )}
    >
      <div
        className={uploadQueueItemVariants.content}
      >
        <Icon
          aria-hidden="true"
          className={cn(
            uploadQueueItemVariants.icon,
            isInvalid &&
              uploadQueueItemVariants.invalidIcon,
          )}
        />

        <div
          className={uploadQueueItemVariants.details}
        >
          <p
            className={
              uploadQueueItemVariants.filename
            }
            title={item.file.name}
          >
            {item.file.name}
          </p>
          <p
            className={
              uploadQueueItemVariants.metadata
            }
          >
            {formatFileSize(item.file.size)}
          </p>
          <p
            className={cn(
              uploadQueueItemVariants.status,
              isInvalid &&
                uploadQueueItemVariants.errorStatus,
            )}
          >
            {statusLabel}
          </p>

          {isUploading ? (
            <progress
              className={
                uploadQueueItemVariants.progress
              }
              aria-label={`Uploading ${item.file.name}`}
              max={100}
              value={item.uploadPercent}
            >
              {item.uploadPercent}%
            </progress>
          ) : null}

          {item.validationErrors.length > 0 ? (
            <ul
              className={
                uploadQueueItemVariants.errors
              }
            >
              {item.validationErrors.map((error) => (
                <li key={error.code}>
                  {error.message}
                </li>
              ))}
            </ul>
          ) : null}

          {item.problem ? (
            <p
              role="alert"
              className={
                uploadQueueItemVariants.problem
              }
            >
              {item.problem.detail}
            </p>
          ) : null}
        </div>

        <Button
          type="button"
          size="icon"
          variant="ghost"
          className={uploadQueueItemVariants.remove}
          aria-label={`${documentsContent.queue.removeLabel} ${item.file.name}`}
          onClick={() => onRemove(item.localId)}
          disabled={isUploading}
        >
          <X aria-hidden="true" />
        </Button>
      </div>
    </li>
  );
}

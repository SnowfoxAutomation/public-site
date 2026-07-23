import { FileText } from "lucide-react";

import { Button } from "@/components/ui/button";
import { documentsContent } from "@/content/documents";
import type { UploadQueueItem as UploadQueueItemType } from "@/lib/documents/state/uploadState";

import { UploadQueueItem } from "./UploadQueueItem";
import { uploadQueueVariants } from "./UploadQueue.variants";

type UploadQueueProps = {
  items: readonly UploadQueueItemType[];
  onRemove: (localId: string) => void;
  onClear: () => void;
};

export function UploadQueue({
  items,
  onRemove,
  onClear,
}: UploadQueueProps) {
  return (
    <section
      className={uploadQueueVariants.root}
      aria-labelledby="upload-queue-title"
    >
      <header className={uploadQueueVariants.header}>
        <h2
          id="upload-queue-title"
          className={uploadQueueVariants.title}
        >
          {documentsContent.queue.title}
        </h2>

        <span className={uploadQueueVariants.count}>
          {items.length}
        </span>
      </header>

      {items.length === 0 ? (
        <div className={uploadQueueVariants.empty}>
          <FileText
            aria-hidden="true"
            className={
              uploadQueueVariants.emptyIcon
            }
          />
          <p
            className={
              uploadQueueVariants.emptyTitle
            }
          >
            {documentsContent.queue.emptyTitle}
          </p>
          <p
            className={
              uploadQueueVariants.emptyBody
            }
          >
            {
              documentsContent.queue
                .emptyDescription
            }
          </p>
        </div>
      ) : (
        <>
          <ul className={uploadQueueVariants.list}>
            {items.map((item) => (
              <UploadQueueItem
                key={item.localId}
                item={item}
                onRemove={onRemove}
              />
            ))}
          </ul>

          <footer
            className={uploadQueueVariants.footer}
          >
            <div
              className={uploadQueueVariants.actions}
            >
              <Button
                type="button"
                variant="ghost"
                onClick={onClear}
              >
                {documentsContent.queue.clearLabel}
              </Button>
              <Button type="button" disabled>
                {documentsContent.queue.submitLabel}
              </Button>
            </div>

            <p
              className={
                uploadQueueVariants.availability
              }
            >
              {
                documentsContent.queue
                  .pendingAvailability
              }
            </p>
          </footer>
        </>
      )}
    </section>
  );
}

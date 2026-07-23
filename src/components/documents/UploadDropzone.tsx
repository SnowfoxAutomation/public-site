"use client";

import { UploadCloud } from "lucide-react";
import {
  useRef,
  useState,
  type DragEvent,
} from "react";

import { Button } from "@/components/ui/button";
import { documentsContent } from "@/content/documents";
import { cn } from "@/lib/utils/cn";
import { documentInputAccept } from "@/lib/documents/upload/acceptedFileTypes";

import { uploadDropzoneVariants } from "./UploadDropzone.variants";

type UploadDropzoneProps = {
  onFilesSelected: (files: readonly File[]) => void;
};

export function UploadDropzone({
  onFilesSelected,
}: UploadDropzoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] =
    useState(false);

  function handleDragOver(
    event: DragEvent<HTMLDivElement>,
  ) {
    event.preventDefault();
    event.dataTransfer.dropEffect = "copy";
    setIsDragging(true);
  }

  function handleDragLeave(
    event: DragEvent<HTMLDivElement>,
  ) {
    if (
      event.currentTarget.contains(
        event.relatedTarget as Node | null,
      )
    ) {
      return;
    }

    setIsDragging(false);
  }

  function handleDrop(
    event: DragEvent<HTMLDivElement>,
  ) {
    event.preventDefault();
    setIsDragging(false);
    onFilesSelected(
      Array.from(event.dataTransfer.files),
    );
  }

  return (
    <div
      className={cn(
        uploadDropzoneVariants.root,
        isDragging &&
          uploadDropzoneVariants.dragging,
      )}
      onDragEnter={handleDragOver}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <UploadCloud
        aria-hidden="true"
        className={uploadDropzoneVariants.icon}
      />

      <h2 className={uploadDropzoneVariants.title}>
        {documentsContent.upload.title}
      </h2>

      <p
        className={
          uploadDropzoneVariants.description
        }
      >
        {documentsContent.upload.description}
      </p>

      <Button
        type="button"
        variant="outline"
        className={uploadDropzoneVariants.browse}
        onClick={() => inputRef.current?.click()}
      >
        {documentsContent.upload.browseLabel}
      </Button>

      <input
        ref={inputRef}
        className={uploadDropzoneVariants.input}
        type="file"
        multiple
        accept={documentInputAccept}
        onChange={(event) => {
          onFilesSelected(
            Array.from(event.currentTarget.files ?? []),
          );
          event.currentTarget.value = "";
        }}
      />

      <p
        className={
          uploadDropzoneVariants.guidance
        }
      >
        {documentsContent.upload.guidance}
      </p>
    </div>
  );
}

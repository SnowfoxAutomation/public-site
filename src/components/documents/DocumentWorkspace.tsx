"use client";

import { useReducer, useState } from "react";

import { documentsContent } from "@/content/documents";
import { uploadReducer } from "@/lib/documents/state/uploadReducer";
import { initialUploadState } from "@/lib/documents/state/uploadState";
import { validateSelectedFiles } from "@/lib/documents/upload/fileValidation";

import { documentWorkspaceVariants } from "./DocumentWorkspace.variants";
import { UploadDropzone } from "./UploadDropzone";
import { UploadQueue } from "./UploadQueue";

export function DocumentWorkspace() {
  const [state, dispatch] = useReducer(
    uploadReducer,
    initialUploadState,
  );
  const [announcement, setAnnouncement] =
    useState("");

  function addFiles(files: readonly File[]) {
    if (files.length === 0) {
      return;
    }

    const items = validateSelectedFiles(
      files,
      state.items,
    );

    dispatch({ type: "files_added", items });
    setAnnouncement(
      documentsContent.upload.selectedAnnouncement,
    );
  }

  return (
    <div className={documentWorkspaceVariants.root}>
      <p
        className={
          documentWorkspaceVariants.announcement
        }
        role="status"
        aria-live="polite"
      >
        {announcement}
      </p>

      <UploadDropzone onFilesSelected={addFiles} />

      <UploadQueue
        items={state.items}
        onRemove={(localId) =>
          dispatch({
            type: "file_removed",
            localId,
          })
        }
        onClear={() =>
          dispatch({ type: "queue_cleared" })
        }
      />
    </div>
  );
}

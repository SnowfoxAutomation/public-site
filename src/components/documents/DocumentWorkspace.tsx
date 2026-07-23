"use client";

import {
  useReducer,
  useRef,
  useState,
} from "react";

import { documentsContent } from "@/content/documents";
import { uploadReducer } from "@/lib/documents/state/uploadReducer";
import { initialUploadState } from "@/lib/documents/state/uploadState";
import { validateSelectedFiles } from "@/lib/documents/upload/fileValidation";
import { browserDocumentClient } from "@/lib/documents/api/browserDocumentClient";
import {
  DocumentApiError,
  parseApiProblem,
} from "@/lib/documents/api/apiError";
import { selectReadyItems } from "@/lib/documents/state/selectors";

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
  const uploadController =
    useRef<AbortController | null>(null);

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

  async function submitFiles() {
    const readyItems = selectReadyItems(state);

    if (readyItems.length === 0) {
      return;
    }

    const localIds = readyItems.map(
      ({ localId }) => localId,
    );
    const controller = new AbortController();

    uploadController.current = controller;
    dispatch({
      type: "upload_started",
      localIds,
    });

    try {
      const job =
        await browserDocumentClient.createJob(
          {
            clientRequestId: crypto.randomUUID(),
            files: readyItems.map(
              ({ localId, file }) => ({
                clientFileId: localId,
                file,
              }),
            ),
          },
          {
            signal: controller.signal,
            onProgress: (progress) =>
              dispatch({
                type: "upload_progressed",
                localIds,
                progress,
              }),
          },
        );

      dispatch({
        type: "job_created",
        localIds,
        job,
      });
      setAnnouncement(
        `${readyItems.length} document${readyItems.length === 1 ? "" : "s"} submitted for processing.`,
      );
    } catch (error) {
      if (
        error instanceof DOMException &&
        error.name === "AbortError"
      ) {
        dispatch({
          type: "upload_cancelled",
          localIds,
        });
        setAnnouncement(
          documentsContent.queue.cancelledLabel,
        );
      } else {
        const problem =
          error instanceof DocumentApiError
            ? error.problem
            : parseApiProblem(null, 503);

        dispatch({
          type: "upload_failed",
          localIds,
          problem,
        });
        setAnnouncement(problem.detail);
      }
    } finally {
      uploadController.current = null;
    }
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
        onSubmit={() => void submitFiles()}
        onCancel={() =>
          uploadController.current?.abort()
        }
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

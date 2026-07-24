"use client";

import {
  useReducer,
  useRef,
  useState,
} from "react";

import { documentsContent } from "@/content/documents";
import {
  DocumentApiError,
  parseApiProblem,
} from "@/lib/documents/api/apiError";
import { selectSubmissionItems } from "@/lib/documents/state/selectors";
import { uploadReducer } from "@/lib/documents/state/uploadReducer";
import { initialUploadState } from "@/lib/documents/state/uploadState";
import { analysisTransport } from "@/lib/documents/upload/xhrAnalysisTransport";
import { validateSelectedFiles } from "@/lib/documents/upload/fileValidation";

import { AnalysisResults } from "./AnalysisResults";
import { ConfidenceControl } from "./ConfidenceControl";
import { documentWorkspaceVariants } from "./DocumentWorkspace.variants";
import { UploadDropzone } from "./UploadDropzone";
import { UploadQueue } from "./UploadQueue";

const defaultScoreThreshold = 0.5;

export function DocumentWorkspace() {
  const [state, dispatch] = useReducer(
    uploadReducer,
    initialUploadState,
  );
  const [announcement, setAnnouncement] =
    useState("");
  const [scoreThreshold, setScoreThreshold] =
    useState(defaultScoreThreshold);
  const requestController =
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

  async function analyzeDocuments() {
    const submissionItems =
      selectSubmissionItems(state);

    if (submissionItems.length === 0) {
      return;
    }

    const controller = new AbortController();
    requestController.current = controller;

    for (const item of submissionItems) {
      if (controller.signal.aborted) {
        break;
      }

      dispatch({
        type: "analysis_started",
        localId: item.localId,
      });

      try {
        const analysis =
          await analysisTransport.analyze(
            {
              file: item.file,
              scoreThreshold,
            },
            {
              signal: controller.signal,
              onProgress: (progress) =>
                dispatch({
                  type: "analysis_upload_progressed",
                  localId: item.localId,
                  progress,
                }),
              onUploadComplete: () =>
                dispatch({
                  type: "analysis_processing",
                  localId: item.localId,
                }),
            },
          );

        dispatch({
          type: "analysis_completed",
          localId: item.localId,
          analysis,
        });
        setAnnouncement(
          documentsContent.queue.completedLabel,
        );
      } catch (error) {
        if (
          error instanceof DOMException &&
          error.name === "AbortError"
        ) {
          dispatch({
            type: "analysis_cancelled",
            localId: item.localId,
          });
          setAnnouncement(
            documentsContent.queue.cancelledLabel,
          );
          break;
        }

        const problem =
          error instanceof DocumentApiError
            ? error.problem
            : parseApiProblem(null, 503);

        dispatch({
          type: "analysis_failed",
          localId: item.localId,
          problem,
        });
        setAnnouncement(problem.detail);
      }
    }

    requestController.current = null;
  }

  const isAnalyzing = state.items.some(
    ({ status }) =>
      status === "uploading" ||
      status === "analyzing",
  );

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

      <div
        className={
          documentWorkspaceVariants.fullWidth
        }
      >
        <ConfidenceControl
          value={scoreThreshold}
          disabled={isAnalyzing}
          onChange={setScoreThreshold}
        />
      </div>

      <UploadDropzone onFilesSelected={addFiles} />

      <UploadQueue
        items={state.items}
        onSubmit={() => void analyzeDocuments()}
        onCancel={() =>
          requestController.current?.abort()
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

      <div
        className={
          documentWorkspaceVariants.fullWidth
        }
      >
        <AnalysisResults items={state.items} />
      </div>
    </div>
  );
}

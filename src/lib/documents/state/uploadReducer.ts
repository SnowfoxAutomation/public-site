import type {
  UploadQueueItem,
  UploadState,
} from "./uploadState";
import type {
  ApiProblem,
} from "../contracts/common";
import type {
  DocumentJob,
  UploadProgress,
} from "../contracts/jobs";

export type UploadAction =
  | {
      type: "files_added";
      items: UploadQueueItem[];
    }
  | {
      type: "file_removed";
      localId: string;
    }
  | { type: "queue_cleared" }
  | {
      type: "upload_started";
      localIds: string[];
    }
  | {
      type: "upload_progressed";
      localIds: string[];
      progress: UploadProgress;
    }
  | {
      type: "job_created";
      localIds: string[];
      job: DocumentJob;
    }
  | {
      type: "upload_failed";
      localIds: string[];
      problem: ApiProblem;
    }
  | {
      type: "upload_cancelled";
      localIds: string[];
    };

export function uploadReducer(
  state: UploadState,
  action: UploadAction,
): UploadState {
  switch (action.type) {
    case "files_added":
      return {
        ...state,
        items: [...state.items, ...action.items],
      };

    case "file_removed":
      return {
        ...state,
        items: state.items.filter(
          ({ localId }) =>
            localId !== action.localId,
        ),
      };

    case "queue_cleared":
      return {
        ...state,
        items: [],
      };

    case "upload_started":
      return updateItems(
        state,
        action.localIds,
        (item) => ({
          ...item,
          status: "uploading",
          uploadedBytes: 0,
          uploadPercent: 0,
          problem: undefined,
        }),
      );

    case "upload_progressed":
      return updateItems(
        state,
        action.localIds,
        (item) => ({
          ...item,
          uploadedBytes:
            action.progress.loadedBytes,
          uploadPercent:
            action.progress.percent ??
            item.uploadPercent,
        }),
      );

    case "job_created":
      return updateItems(
        state,
        action.localIds,
        (item) => {
          const document =
            action.job.documents.find(
              ({ clientFileId }) =>
                clientFileId === item.localId,
            );

          return {
            ...item,
            status: "submitted",
            uploadedBytes: item.file.size,
            uploadPercent: 100,
            jobId: action.job.jobId,
            documentId: document?.documentId,
          };
        },
      );

    case "upload_failed":
      return updateItems(
        state,
        action.localIds,
        (item) => ({
          ...item,
          status: "failed",
          problem: action.problem,
        }),
      );

    case "upload_cancelled":
      return updateItems(
        state,
        action.localIds,
        (item) => ({
          ...item,
          status: "cancelled",
        }),
      );
  }
}

function updateItems(
  state: UploadState,
  localIds: readonly string[],
  update: (
    item: UploadQueueItem,
  ) => UploadQueueItem,
): UploadState {
  const selectedIds = new Set(localIds);

  return {
    ...state,
    items: state.items.map((item) =>
      selectedIds.has(item.localId)
        ? update(item)
        : item,
    ),
  };
}

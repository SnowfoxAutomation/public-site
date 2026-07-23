import type {
  UploadQueueItem,
  UploadState,
} from "./uploadState";
import type {
  ApiProblem,
  DocumentStatus,
} from "../contracts/common";
import type {
  DocumentJob,
  UploadProgress,
} from "../contracts/jobs";
import type { DocumentJobResults } from "../contracts/results";

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
    }
  | {
      type: "job_updated";
      job: DocumentJob;
    }
  | {
      type: "job_update_failed";
      jobId: string;
      problem: ApiProblem;
    }
  | {
      type: "results_started";
      jobId: string;
    }
  | {
      type: "results_loaded";
      jobId: string;
      results: DocumentJobResults;
    }
  | {
      type: "results_failed";
      jobId: string;
      problem: ApiProblem;
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
      return {
        ...updateItems(
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
      ),
        jobs: [
          ...state.jobs,
          {
            job: action.job,
            resultsStatus: "idle",
          },
        ],
      };

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

    case "job_updated":
      return {
        ...state,
        jobs: state.jobs.map((jobState) =>
          jobState.job.jobId === action.job.jobId
            ? {
                ...jobState,
                job: action.job,
                updateProblem: undefined,
              }
            : jobState,
        ),
        items: state.items.map((item) => {
          if (item.jobId !== action.job.jobId) {
            return item;
          }

          const document =
            action.job.documents.find(
              ({ documentId }) =>
                documentId === item.documentId,
            );

          return {
            ...item,
            status:
              document
                ? mapDocumentStatus(
                    document.status,
                  )
                : mapJobStatus(
                    action.job.status,
                  ),
            problem: document?.error,
          };
        }),
      };

    case "job_update_failed":
      return {
        ...state,
        jobs: state.jobs.map((jobState) =>
          jobState.job.jobId === action.jobId
            ? {
                ...jobState,
                updateProblem: action.problem,
              }
            : jobState,
        ),
      };

    case "results_started":
      return updateJobState(
        state,
        action.jobId,
        (jobState) => ({
          ...jobState,
          resultsStatus: "loading",
          resultsProblem: undefined,
        }),
      );

    case "results_loaded":
      return updateJobState(
        state,
        action.jobId,
        (jobState) => ({
          ...jobState,
          resultsStatus: "loaded",
          results: action.results,
          resultsProblem: undefined,
        }),
      );

    case "results_failed":
      return updateJobState(
        state,
        action.jobId,
        (jobState) => ({
          ...jobState,
          resultsStatus: "failed",
          resultsProblem: action.problem,
        }),
      );
  }
}

function updateJobState(
  state: UploadState,
  jobId: string,
  update: (
    jobState: UploadState["jobs"][number],
  ) => UploadState["jobs"][number],
): UploadState {
  return {
    ...state,
    jobs: state.jobs.map((jobState) =>
      jobState.job.jobId === jobId
        ? update(jobState)
        : jobState,
    ),
  };
}

function mapDocumentStatus(
  status: DocumentStatus,
): UploadQueueItem["status"] {
  switch (status) {
    case "queued":
      return "submitted";
    case "processing":
      return "processing";
    case "completed":
      return "completed";
    case "failed":
      return "failed";
    case "cancelled":
      return "cancelled";
  }
}

function mapJobStatus(
  status: DocumentJob["status"],
): UploadQueueItem["status"] {
  switch (status) {
    case "queued":
    case "uploading":
      return "submitted";
    case "processing":
      return "processing";
    case "completed":
    case "partially_completed":
      return "completed";
    case "failed":
      return "failed";
    case "cancelled":
      return "cancelled";
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

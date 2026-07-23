import type {
  UploadQueueItem,
  UploadState,
} from "./uploadState";

export type UploadAction =
  | {
      type: "files_added";
      items: UploadQueueItem[];
    }
  | {
      type: "file_removed";
      localId: string;
    }
  | { type: "queue_cleared" };

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
  }
}

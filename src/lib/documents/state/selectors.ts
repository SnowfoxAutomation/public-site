import type { UploadState } from "./uploadState";

export function selectReadyItems(
  state: Pick<UploadState, "items">,
) {
  return state.items.filter(
    ({ status }) => status === "ready",
  );
}

export function selectSubmissionItems(
  state: Pick<UploadState, "items">,
) {
  const readyItems = selectReadyItems(state);

  if (readyItems.length > 0) {
    return readyItems;
  }

  const retryableItem = state.items.find(
    ({ status, problem }) =>
      status === "failed" &&
      problem?.retryable,
  );

  if (!retryableItem) {
    return [];
  }

  return state.items.filter(
    ({ status, problem }) =>
      status === "failed" &&
      problem?.retryable,
  );
}

export function selectTotalBytes(
  state: Pick<UploadState, "items">,
) {
  return state.items.reduce(
    (total, { file }) => total + file.size,
    0,
  );
}

export function selectHasActiveUpload(
  state: Pick<UploadState, "items">,
) {
  return state.items.some(
    ({ status }) =>
      status === "uploading" ||
      status === "analyzing",
  );
}

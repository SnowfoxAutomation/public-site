import type { UploadState } from "./uploadState";

export function selectReadyItems(
  state: UploadState,
) {
  return state.items.filter(
    ({ status }) => status === "ready",
  );
}

export function selectTotalBytes(
  state: UploadState,
) {
  return state.items.reduce(
    (total, { file }) => total + file.size,
    0,
  );
}

export function selectHasActiveUpload(
  state: UploadState,
) {
  return state.items.some(({ status }) =>
    [
      "uploading",
      "submitted",
      "processing",
    ].includes(status),
  );
}

import type { UploadState } from "./uploadState";

export function selectReadyItems(
  state: Pick<UploadState, "items">,
) {
  return state.items.filter(
    ({ status }) => status === "ready",
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
    ({ status }) => status === "uploading",
  );
}

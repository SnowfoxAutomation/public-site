import {
  browserDocumentClient,
} from "../api/browserDocumentClient";
import {
  DocumentApiError,
  parseApiProblem,
} from "../api/apiError";
import type { DocumentJobStatus } from "../contracts/common";
import type {
  JobUpdateHandlers,
  JobUpdatesTransport,
} from "./jobUpdatesTransport";

const terminalStatuses =
  new Set<DocumentJobStatus>([
    "completed",
    "partially_completed",
    "failed",
    "cancelled",
  ]);

const initialDelayMs = 1_500;
const maximumDelayMs = 10_000;

function wait(
  durationMs: number,
  signal: AbortSignal,
) {
  return new Promise<void>((resolve, reject) => {
    const timer = window.setTimeout(
      resolve,
      durationMs,
    );

    signal.addEventListener(
      "abort",
      () => {
        window.clearTimeout(timer);
        reject(
          new DOMException(
            "Job updates stopped.",
            "AbortError",
          ),
        );
      },
      { once: true },
    );
  });
}

async function waitForAvailablePage(
  signal: AbortSignal,
) {
  while (
    document.visibilityState === "hidden" ||
    !navigator.onLine
  ) {
    await wait(1_000, signal);
  }
}

function nextDelay(
  currentDelayMs: number,
) {
  const boundedDelay = Math.min(
    maximumDelayMs,
    currentDelayMs * 1.5,
  );
  const jitter = boundedDelay * 0.15;

  return Math.round(
    boundedDelay - jitter + Math.random() * jitter * 2,
  );
}

function parseRetryAfter(
  value: string | null,
) {
  if (!value) {
    return null;
  }

  const seconds = Number(value);

  if (Number.isFinite(seconds)) {
    return Math.max(
      initialDelayMs,
      Math.min(maximumDelayMs, seconds * 1_000),
    );
  }

  const retryAt = Date.parse(value);

  if (Number.isNaN(retryAt)) {
    return null;
  }

  return Math.max(
    initialDelayMs,
    Math.min(maximumDelayMs, retryAt - Date.now()),
  );
}

export class PollingJobUpdates
  implements JobUpdatesTransport
{
  async watchJob(
    jobId: string,
    handlers: JobUpdateHandlers,
    signal: AbortSignal,
  ) {
    let delayMs = initialDelayMs;

    while (!signal.aborted) {
      try {
        await waitForAvailablePage(signal);
        await wait(delayMs, signal);

        const update =
          await browserDocumentClient.getJobUpdate(
            jobId,
            signal,
          );
        const { data: job } = update;

        handlers.onUpdate(job);

        if (terminalStatuses.has(job.status)) {
          return;
        }

        delayMs =
          parseRetryAfter(update.retryAfter) ??
          nextDelay(delayMs);
      } catch (error) {
        if (
          error instanceof DOMException &&
          error.name === "AbortError"
        ) {
          return;
        }

        const problem =
          error instanceof DocumentApiError
            ? error.problem
            : parseApiProblem(null, 503);

        handlers.onError(problem);

        if (!problem.retryable) {
          return;
        }

        delayMs = nextDelay(delayMs);
      }
    }
  }
}

export const pollingJobUpdates =
  new PollingJobUpdates();

import {
  contactConfig,
  isTurnstileConfigured,
} from "./config";

type TurnstileResponse = {
  success: boolean;
  hostname?: string;
  action?: string;
  challenge_ts?: string;
  "error-codes"?: string[];
};

type VerifyTurnstileOptions = {
  token: string;
  remoteIp: string;
};

export async function verifyTurnstile({
  token,
  remoteIp,
}: VerifyTurnstileOptions): Promise<boolean> {
  if (!isTurnstileConfigured()) {
    return !contactConfig.isProduction;
  }

  if (!token) {
    return false;
  }

  const body = new FormData();

  body.set(
    "secret",
    contactConfig.turnstileSecretKey,
  );
  body.set("response", token);

  if (remoteIp !== "unknown") {
    body.set("remoteip", remoteIp);
  }

  try {
    const response = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        body,
        cache: "no-store",
      },
    );

    if (!response.ok) {
      return false;
    }

    const result =
      (await response.json()) as TurnstileResponse;

    return result.success;
  } catch {
    return false;
  }
}
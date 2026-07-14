const isProduction =
  process.env.NODE_ENV === "production";

export const contactConfig = {
  recipientEmail:
    process.env.CONTACT_RECIPIENT_EMAIL ?? "",

  senderEmail:
    process.env.CONTACT_SENDER_EMAIL ?? "",

  resendApiKey:
    process.env.RESEND_API_KEY ?? "",

  turnstileSiteKey:
    process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "",

  turnstileSecretKey:
    process.env.TURNSTILE_SECRET_KEY ?? "",

  minimumCompletionTimeMs: 3000,

  maximumCompletionTimeMs:
    1000 * 60 * 60 * 4,

  isProduction,
} as const;

export function isContactEmailConfigured() {
  return Boolean(
    contactConfig.recipientEmail &&
      contactConfig.senderEmail &&
      contactConfig.resendApiKey,
  );
}

export function isTurnstileConfigured() {
  return Boolean(
    contactConfig.turnstileSiteKey &&
      contactConfig.turnstileSecretKey,
  );
}
"use server";

import { getClientIp } from "@/lib/contact/clientIp";
import { checkContactRateLimit } from "@/lib/contact/rateLimit";
import { contactSchema } from "@/lib/contact/schema";
import { sendContactEmail } from "@/lib/contact/sendContactEmail";
import { verifyTurnstile } from "@/lib/contact/turnstile";

export type ContactActionState = {
  status: "idle" | "success" | "error";
  message: string;
};

function errorState(
  message =
    "We could not process your message. Please review the form and try again.",
): ContactActionState {
  return {
    status: "error",
    message,
  };
}

export async function submitContact(
  _: ContactActionState,
  formData: FormData,
): Promise<ContactActionState> {
  const parsed = contactSchema.safeParse({
    name: formData.get("name"),
    organization:
      formData.get("organization") ?? "",
    email: formData.get("email"),
    subject: formData.get("subject"),
    message: formData.get("message"),
    website: formData.get("website") ?? "",
  });

  if (!parsed.success) {
    return errorState();
  }

  const clientIp = await getClientIp();

  const rateLimit =
    await checkContactRateLimit(clientIp);

  if (!rateLimit.allowed) {
    return errorState(
      "Too many messages have been submitted. Please try again later.",
    );
  }

  const turnstileToken = String(
    formData.get("cf-turnstile-response") ?? "",
  );

  const turnstileValid =
    await verifyTurnstile({
      token: turnstileToken,
      remoteIp: clientIp,
    });

  if (!turnstileValid) {
    return errorState(
      "Security verification failed. Please refresh the page and try again.",
    );
  }

  const submission = {
    ...parsed.data,
    email: parsed.data.email.toLowerCase(),
  };

  try {
    const delivery =
      await sendContactEmail(submission);

    if (delivery.developmentFallback) {
      return {
        status: "success",
        message:
          "Your message passed validation. Local email delivery is not configured, so no email was sent.",
      };
    }

    return {
      status: "success",
      message:
        "Thank you for contacting Snowfox Automation. We will respond as soon as possible.",
    };
  } catch {
    return errorState(
      "We could not send your message. Please try again later.",
    );
  }
}
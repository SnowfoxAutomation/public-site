import {
  contactConfig,
  isContactEmailConfigured,
} from "./config";
import { getResendClient } from "./email";
import type { ContactFormData } from "./schema";

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function getOrganization(
  organization: string,
) {
  return organization || "Not provided";
}

export async function sendContactEmail(
  data: ContactFormData,
) {
  if (!isContactEmailConfigured()) {
    if (!contactConfig.isProduction) {
      console.info(
        "Contact email skipped because local email delivery is not configured.",
        {
          name: data.name,
          organization: data.organization,
          email: data.email,
          subject: data.subject,
        },
      );

      return {
        delivered: false,
        developmentFallback: true,
      } as const;
    }

    throw new Error(
      "Contact email delivery is not configured.",
    );
  }

  const resend = getResendClient();

  const organization = getOrganization(
    data.organization,
  );

  const result = await resend.emails.send({
    from: contactConfig.senderEmail,
    to: contactConfig.recipientEmail,
    replyTo: data.email,
    subject: `[Snowfox website] ${data.subject}`,

    text: [
      "Snowfox website contact submission",
      "",
      `Name: ${data.name}`,
      `Organization: ${organization}`,
      `Email: ${data.email}`,
      `Subject: ${data.subject}`,
      "",
      "Message:",
      data.message,
    ].join("\n"),

    html: [
      "<h2>Snowfox website contact submission</h2>",
      `<p><strong>Name</strong><br>${escapeHtml(data.name)}</p>`,
      `<p><strong>Organization</strong><br>${escapeHtml(organization)}</p>`,
      `<p><strong>Email</strong><br>${escapeHtml(data.email)}</p>`,
      `<p><strong>Subject</strong><br>${escapeHtml(data.subject)}</p>`,
      "<p><strong>Message</strong></p>",
      `<p style="white-space: pre-wrap;">${escapeHtml(data.message)}</p>`,
    ].join(""),
  });

  if (result.error) {
    throw new Error(
      `Resend rejected the contact email: ${result.error.message}`,
    );
  }

  return {
    delivered: true,
    developmentFallback: false,
    emailId: result.data?.id,
  } as const;
}
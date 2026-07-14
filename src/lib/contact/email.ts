import { Resend } from "resend";

import {
  contactConfig,
  isContactEmailConfigured,
} from "./config";

let resendClient: Resend | null = null;

export function getResendClient() {
  if (!isContactEmailConfigured()) {
    throw new Error(
      "Contact email delivery is not configured.",
    );
  }

  if (!resendClient) {
    resendClient = new Resend(
      contactConfig.resendApiKey,
    );
  }

  return resendClient;
}
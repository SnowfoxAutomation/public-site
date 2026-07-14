"use client";

import { Turnstile as CloudflareTurnstile } from "@marsidev/react-turnstile";

import { contactConfig } from "@/lib/contact/config";

import { turnstileVariants } from "./Turnstile.variants";

type TurnstileProps = {
  disabled?: boolean;
};

export function Turnstile({
  disabled = false,
}: TurnstileProps) {
  if (!contactConfig.turnstileSiteKey) {
    return null;
  }

  return (
    <div
      className={turnstileVariants.wrapper}
      aria-disabled={disabled}
    >
      <CloudflareTurnstile
        siteKey={contactConfig.turnstileSiteKey}
        options={{
          appearance: "always",
          size: "normal",
          theme: "light",
        }}
      />
    </div>
  );
}
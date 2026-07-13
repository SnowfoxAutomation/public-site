import Link from "next/link";

import { cn } from "@/lib/utils/cn";

import { callToActionVariants } from "./CallToAction.variants";

type CallToActionVariant =
  keyof typeof callToActionVariants;

type CallToActionProps = {
  href: string;
  label: string;
  variant?: CallToActionVariant;
};

export function CallToAction({
  href,
  label,
  variant = "primary",
}: CallToActionProps) {
  return (
    <Link
      href={href}
      className={cn(callToActionVariants[variant])}
    >
      {label}
    </Link>
  );
}
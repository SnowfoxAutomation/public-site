import type { ReactNode } from "react";

import { cn } from "@/lib/utils/cn";

import { sectionVariants } from "./Section.variants";

type SectionVariant =
  keyof typeof sectionVariants.root;

type SectionProps = {
  children: ReactNode;
  className?: string;
  variant?: SectionVariant;
};

export function Section({
  children,
  className,
  variant = "transparent",
}: SectionProps) {
  return (
    <section
      className={cn(
        sectionVariants.root[variant],
        className,
      )}
    >
      {children}
    </section>
  );
}
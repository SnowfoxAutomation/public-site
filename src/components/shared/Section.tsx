import type {
  ComponentPropsWithoutRef,
  ReactNode,
} from "react";

import { cn } from "@/lib/utils/cn";

import { sectionVariants } from "./Section.variants";

type SectionVariant =
  keyof typeof sectionVariants.root;

type SectionProps =
  ComponentPropsWithoutRef<"section"> & {
    children: ReactNode;
    variant?: SectionVariant;
  };

export function Section({
  children,
  className,
  variant = "transparent",
  ...props
}: SectionProps) {
  return (
    <section
      className={cn(
        sectionVariants.root[variant],
        className,
      )}
      {...props}
    >
      {children}
    </section>
  );
}
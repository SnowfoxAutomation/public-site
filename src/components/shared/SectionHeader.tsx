import type {
  ComponentPropsWithoutRef,
} from "react";

import { cn } from "@/lib/utils/cn";

import { sectionHeaderVariants } from "./SectionHeader.variants";

type SectionHeaderProps =
  ComponentPropsWithoutRef<"header"> & {
    title: string;
    description?: string;
    eyebrow?: string;
  };

export function SectionHeader({
  title,
  description,
  eyebrow,
  className,
  ...props
}: SectionHeaderProps) {
  return (
    <header
      className={cn(
        sectionHeaderVariants.root,
        className,
      )}
      {...props}
    >
      {eyebrow ? (
        <p className={sectionHeaderVariants.eyebrow}>
          {eyebrow}
        </p>
      ) : null}

      <h2 className={sectionHeaderVariants.title}>
        {title}
      </h2>

      {description ? (
        <p className={sectionHeaderVariants.description}>
          {description}
        </p>
      ) : null}
    </header>
  );
}
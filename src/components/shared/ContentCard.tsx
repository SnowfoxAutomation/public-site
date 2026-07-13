import type { ReactNode } from "react";

import { cn } from "@/lib/utils/cn";

import { contentCardVariants } from "./ContentCard.variants";

type ContentCardProps = {
  children: ReactNode;
  className?: string;
};

export function ContentCard({
  children,
  className,
}: ContentCardProps) {
  return (
    <article
      className={cn(
        contentCardVariants.root,
        className,
      )}
    >
      {children}
    </article>
  );
}
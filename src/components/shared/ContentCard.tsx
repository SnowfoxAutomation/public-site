import type { ReactNode } from "react";

import { cn } from "@/lib/utils/cn";

import { contentCardVariants } from "./ContentCard.variants";

type ContentCardProps = {
  title: string;
  children: ReactNode;
  className?: string;
};

export function ContentCard({
  title,
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
      <h3 className={contentCardVariants.title}>
        {title}
      </h3>

      <div className={contentCardVariants.content}>
        {children}
      </div>
    </article>
  );
}
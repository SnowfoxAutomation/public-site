import type { ReactNode } from "react";

import { cn } from "@/lib/utils/cn";

import { contentGridVariants } from "./ContentGrid.variants";

type ContentGridColumns =
  keyof typeof contentGridVariants.columns;

type ContentGridProps = {
  children: ReactNode;
  columns?: ContentGridColumns;
  className?: string;
};

export function ContentGrid({
  children,
  columns = "three",
  className,
}: ContentGridProps) {
  return (
    <div
      className={cn(
        contentGridVariants.base,
        contentGridVariants.columns[columns],
        className,
      )}
    >
      {children}
    </div>
  );
}
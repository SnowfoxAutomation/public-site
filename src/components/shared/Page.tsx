import type { ReactNode } from "react";

import { cn } from "@/lib/utils/cn";

import { pageVariants } from "./Page.variants";

type PageProps = {
  children: ReactNode;
  className?: string;
};

export function Page({
  children,
  className,
}: PageProps) {
  return (
    <main
      className={cn(
        pageVariants.root,
        className,
      )}
    >
      {children}
    </main>
  );
}
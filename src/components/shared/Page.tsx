import type {
  ComponentPropsWithoutRef,
  ReactNode,
} from "react";

import { cn } from "@/lib/utils/cn";

import { pageVariants } from "./Page.variants";

type PageProps =
  ComponentPropsWithoutRef<"main"> & {
    children: ReactNode;
  };

export function Page({
  children,
  className,
  ...props
}: PageProps) {
  return (
    <main
      className={cn(
        pageVariants.root,
        className,
      )}
      {...props}
    >
      {children}
    </main>
  );
}
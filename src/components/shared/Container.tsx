import type { ReactNode } from "react";

import { cn } from "@/lib/utils/cn";

import { containerVariants } from "./Container.variants";

type ContainerSize =
  keyof typeof containerVariants.root;

type ContainerProps = {
  children: ReactNode;
  className?: string;
  size?: ContainerSize;
};

export function Container({
  children,
  className,
  size = "large",
}: ContainerProps) {
  return (
    <div
      className={cn(
        containerVariants.root[size],
        className,
      )}
    >
      {children}
    </div>
  );
}
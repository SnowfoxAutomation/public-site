import type {
  ComponentPropsWithoutRef,
  ReactNode,
} from "react";

import { cn } from "@/lib/utils/cn";

import { containerVariants } from "./Container.variants";

type ContainerSize =
  keyof typeof containerVariants.root;

type ContainerProps =
  ComponentPropsWithoutRef<"div"> & {
    children: ReactNode;
    size?: ContainerSize;
  };

export function Container({
  children,
  className,
  size = "large",
  ...props
}: ContainerProps) {
  return (
    <div
      className={cn(
        containerVariants.root[size],
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
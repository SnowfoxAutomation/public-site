import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";
import type { VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils/cn";

import { containerVariants } from "./Container.variants";

type ContainerProps<TElement extends ElementType = "div"> = {
  as?: TElement;
  children: ReactNode;
  className?: string;
} & VariantProps<typeof containerVariants> &
  Omit<
    ComponentPropsWithoutRef<TElement>,
    "as" | "children" | "className" | "size"
  >;

export function Container<TElement extends ElementType = "div">({
  as,
  children,
  className,
  size,
  ...props
}: ContainerProps<TElement>) {
  const Component = as ?? "div";

  return (
    <Component
      className={cn(containerVariants({ size }), className)}
      {...props}
    >
      {children}
    </Component>
  );
}
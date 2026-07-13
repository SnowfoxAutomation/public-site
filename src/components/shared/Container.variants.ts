import { cva } from "class-variance-authority";

export const containerVariants = cva(
  "mx-auto w-full px-[var(--page-gutter)]",
  {
    variants: {
      size: {
        small: "max-w-[var(--content-width-small)]",
        medium: "max-w-[var(--content-width-medium)]",
        large: "max-w-[var(--content-width-large)]",
        full: "max-w-none",
      },
    },
    defaultVariants: {
      size: "large",
    },
  },
);
import { cva } from "class-variance-authority";

export const buttonVariants = cva(
  [
    "group/button",
    "inline-flex",
    "shrink-0",
    "items-center",
    "justify-center",
    "whitespace-nowrap",
    "border",
    "border-transparent",
    "rounded-[var(--radius-pill)]",
    "font-medium",
    "transition-[background-color,border-color,color,transform]",
    "duration-[var(--transition-fast)]",
    "outline-none",
    "select-none",
    "focus-visible:ring-3",
    "focus-visible:ring-accent/30",
    "active:not-aria-[haspopup]:translate-y-px",
    "disabled:pointer-events-none",
    "disabled:opacity-50",
    "[&_svg]:pointer-events-none",
    "[&_svg]:shrink-0",
    "[&_svg:not([class*='size-'])]:size-4",
  ].join(" "),
  {
    variants: {
      variant: {
        primary: [
        "bg-accent",
        "text-inverse-foreground",
        "shadow-sm",
        "hover:bg-accent-hover",
        "hover:shadow-md",
        ].join(" "),

        secondary: [
        "bg-brand",
        "text-inverse-foreground",
        "shadow-sm",
        "hover:bg-foreground",
        "hover:shadow-md",
        ].join(" "),

        outline: [
        "border-border",
        "bg-background/80",
        "text-foreground",
        "backdrop-blur",
        "hover:border-brand",
        "hover:bg-surface-emphasis",
        ].join(" "),

        ghost: [
        "bg-transparent",
        "text-foreground",
        "hover:bg-surface-muted",
        ].join(" "),

        link: [
          "rounded-none",
          "border-0",
          "bg-transparent",
          "p-0",
          "text-brand",
          "underline-offset-4",
          "hover:underline",
        ].join(" "),
      },

      size: {
        small: [
          "min-h-9",
          "gap-2",
          "px-4",
          "py-2",
          "text-sm",
        ].join(" "),

        default: [
          "min-h-11",
          "gap-2",
          "px-5",
          "py-2.5",
          "text-sm",
        ].join(" "),

        large: [
          "min-h-12",
          "gap-2.5",
          "px-7",
          "py-3",
          "text-base",
        ].join(" "),

        icon: [
          "size-11",
          "p-0",
        ].join(" "),
      },
    },

    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  },
);
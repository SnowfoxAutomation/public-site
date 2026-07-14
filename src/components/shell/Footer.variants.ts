export const footerVariants = {
  root: [
    "border-t",
    "border-border",
    "bg-surface",
  ].join(" "),

  content: [
    "grid",
    "gap-12",
    "py-[var(--section-spacing-small)]",
    "md:grid-cols-[2fr_1fr]",
    "items-start",
  ].join(" "),

  identity: [
    "flex",
    "max-w-lg",
    "flex-col",
    "gap-5",
  ].join(" "),

  logo: [
    "text-xl",
    "font-semibold",
    "tracking-tight",
    "text-foreground",
  ].join(" "),

  description: [
    "max-w-md",
    "leading-7",
    "text-muted-foreground",
  ].join(" "),

  navigation: [
    "grid",
    "gap-3",
    "justify-items-end",
  ].join(" "),

  link: [
    "text-sm",
    "font-medium",
    "text-muted-foreground",
    "transition-colors",
    "duration-300",
    "hover:text-foreground",
  ].join(" "),

  legal: [
    "mt-8",
    "border-t",
    "border-border",
    "py-6",
    "text-sm",
    "text-muted-foreground",
  ].join(" "),
} as const;
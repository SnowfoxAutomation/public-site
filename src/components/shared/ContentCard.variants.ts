export const contentCardVariants = {
  root: [
    "rounded-[var(--radius-large)]",
    "border",
    "border-border",
    "bg-surface",
    "p-8",
    "shadow-[var(--shadow-card)]",
  ].join(" "),

  title: [
    "mb-[var(--component-gap-medium)]",
    "text-foreground",
  ].join(" "),

  content: [
    "text-muted-foreground",
  ].join(" "),
} as const;
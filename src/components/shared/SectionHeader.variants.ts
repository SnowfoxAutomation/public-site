export const sectionHeaderVariants = {
  root: [
    "flex",
    "flex-col",
    "gap-[var(--component-gap-medium)]",
  ].join(" "),

  eyebrow: [
    "text-sm",
    "font-semibold",
    "uppercase",
    "tracking-[0.2em]",
    "text-brand",
  ].join(" "),

  title: [
    "text-foreground",
  ].join(" "),

  description: [
    "text-muted-foreground",
  ].join(" "),
} as const;
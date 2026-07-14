export const contactPageVariants = {
  hero: [
    "flex",
    "flex-col",
    "gap-[var(--component-gap-large)]",
  ].join(" "),

  grid: [
    "grid",
    "gap-16",
    "lg:grid-cols-[0.9fr_1.1fr]",
    "items-start",
  ].join(" "),

  information: [
    "flex",
    "flex-col",
    "gap-10",
  ].join(" "),

  card: [
    "rounded-[var(--radius-large)]",
    "border",
    "border-border",
    "bg-surface",
    "p-8",
    "shadow-[var(--shadow-card)]",
  ].join(" "),

  cardTitle: [
    "mb-4",
    "text-xl",
    "font-semibold",
    "text-foreground",
  ].join(" "),

  cardBody: [
    "leading-8",
    "text-muted-foreground",
  ].join(" "),

  list: [
    "flex",
    "flex-col",
    "gap-5",
    "text-muted-foreground",
  ].join(" "),

  label: [
    "mb-1",
    "font-medium",
    "text-foreground",
  ].join(" "),
} as const;
export const sectionHeaderVariants = {
  root: [
    "flex",
    "max-w-3xl",
    "flex-col",
    "gap-[var(--component-gap-medium)]",
  ].join(" "),

  eyebrow: [
    "text-sm",
    "font-semibold",
    "uppercase",
    "tracking-[var(--letter-spacing-label)]",
    "text-brand",
  ].join(" "),

  title: [
    "text-foreground",
    "text-balance",
  ].join(" "),

  description: [
    "text-[length:var(--font-size-body-large)]",
    "leading-[var(--line-height-body)]",
    "text-muted-foreground",
    "text-pretty",
  ].join(" "),
} as const;
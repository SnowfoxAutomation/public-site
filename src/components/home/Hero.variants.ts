export const heroVariants = {
  section: [
    "bg-background",
    "py-[var(--section-spacing-large)]",
  ].join(" "),

  content: [
    "flex",
    "flex-col",
    "items-center",
    "gap-8",
    "text-center",
  ].join(" "),

  eyebrow: [
    "text-sm",
    "font-semibold",
    "uppercase",
    "tracking-[var(--letter-spacing-label)]",
    "text-brand",
  ].join(" "),

  title: [
    "max-w-5xl",
    "text-[length:var(--font-size-display)]",
    "leading-[var(--line-height-display)]",
    "tracking-[var(--letter-spacing-display)]",
    "text-foreground",
  ].join(" "),

  description: [
    "max-w-3xl",
    "text-[length:var(--font-size-body-large)]",
    "text-muted-foreground",
  ].join(" "),

  actions: [
    "flex",
    "flex-wrap",
    "justify-center",
    "gap-4",
    "pt-2",
  ].join(" "),
} as const;
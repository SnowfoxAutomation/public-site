export const heroVariants = {
  section: [
    "bg-background",
    "py-[var(--section-spacing-large)]",
  ].join(" "),

  content: [
    "flex",
    "flex-col",
    "gap-8",
    "text-center",
    "items-center",
  ].join(" "),

  eyebrow: [
    "text-sm",
    "font-semibold",
    "uppercase",
    "tracking-[0.2em]",
    "text-brand",
  ].join(" "),

  title: [
    "max-w-4xl",
    "text-6xl",
    "font-semibold",
    "leading-tight",
    "tracking-tight",
    "text-foreground",
  ].join(" "),

  description: [
    "max-w-3xl",
    "text-xl",
    "leading-8",
    "text-muted-foreground",
  ].join(" "),

  actions: [
    "flex",
    "flex-wrap",
    "justify-center",
    "gap-4",
    "pt-4",
  ].join(" "),
} as const;
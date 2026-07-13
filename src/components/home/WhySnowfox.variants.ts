export const whySnowfoxVariants = {
  section: [
    "bg-background",
  ].join(" "),

  content: [
    "flex",
    "flex-col",
    "gap-16",
  ].join(" "),

  heading: [
    "text-center",
    "text-4xl",
    "font-semibold",
    "tracking-tight",
    "text-foreground",
  ].join(" "),

  introduction: [
    "mx-auto",
    "max-w-3xl",
    "text-center",
    "text-lg",
    "leading-8",
    "text-muted-foreground",
  ].join(" "),

  grid: [
    "grid",
    "gap-8",
    "md:grid-cols-3",
  ].join(" "),

  card: [
    "rounded-[var(--radius-large)]",
    "border",
    "border-border",
    "bg-surface",
    "p-8",
    "shadow-[var(--shadow-card)]",
  ].join(" "),

  cardHeading: [
    "mb-4",
    "text-xl",
    "font-semibold",
    "text-foreground",
  ].join(" "),

  cardBody: [
    "leading-7",
    "text-muted-foreground",
  ].join(" "),
} as const;
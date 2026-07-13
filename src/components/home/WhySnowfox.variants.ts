export const whySnowfoxVariants = {
  section: [
    "bg-background",
  ].join(" "),

  content: [
    "flex",
    "flex-col",
    "gap-16",
  ].join(" "),

  header: [
    "items-center",
    "text-center",
  ].join(" "),

  grid: [
    "gap-8",
  ].join(" "),

  cardHeading: [
    "mb-[var(--component-gap-medium)]",
    "text-foreground",
  ].join(" "),

  cardBody: [
    "text-muted-foreground",
  ].join(" "),
} as const;
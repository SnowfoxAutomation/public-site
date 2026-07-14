export const missionSectionVariants = {
  section: [
    "scroll-mt-20",
  ].join(" "),

  content: [
    "flex",
    "flex-col",
    "gap-[var(--component-gap-large)]",
  ].join(" "),

  body: [
    "grid",
    "max-w-4xl",
    "gap-6",
  ].join(" "),

  cardTitle: [
    "mb-4",
    "text-[length:var(--font-size-heading-3)]",
    "font-semibold",
    "text-foreground",
  ].join(" "),

  cardBody: [
    "text-muted-foreground",
  ].join(" "),
} as const;
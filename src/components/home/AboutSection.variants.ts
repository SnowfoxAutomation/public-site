export const aboutSectionVariants = {
  section: [
    "scroll-mt-20",
  ].join(" "),

  content: [
    "flex",
    "flex-col",
    "gap-[var(--component-gap-large)]",
  ].join(" "),

  introduction: [
    "max-w-3xl",
    "text-[length:var(--font-size-body-large)]",
    "text-muted-foreground",
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
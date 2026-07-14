export const productsSectionVariants = {
  section: [
    "scroll-mt-20",
  ].join(" "),

  content: [
    "flex",
    "flex-col",
    "gap-[var(--component-gap-large)]",
  ].join(" "),

  icon: [
    "mb-6",
    "size-8",
    "text-brand",
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
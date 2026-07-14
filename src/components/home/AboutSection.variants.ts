export const aboutSectionVariants = {
  section: [
    "scroll-mt-20",
  ].join(" "),

  content: [
    "flex",
    "flex-col",
    "gap-[calc(var(--component-gap-large)*1.2)]",
  ].join(" "),

  introduction: [
    "max-w-3xl",
    "text-[length:var(--font-size-body-large)]",
    "leading-[var(--line-height-body)]",
    "text-muted-foreground",
  ].join(" "),

  cardTitle: [
    "mb-4",
    "text-[length:var(--font-size-heading-3)]",
    "font-semibold",
    "text-foreground",
  ].join(" "),

  cardBody: [
    "leading-[var(--line-height-body)]",
    "text-muted-foreground",
  ].join(" "),
} as const;
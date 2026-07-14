export const productsSectionVariants = {
  section: [
    "scroll-mt-20",
  ].join(" "),

  content: [
    "flex",
    "flex-col",
    "gap-[calc(var(--component-gap-large)*1.2)]",
  ].join(" "),

  icon: [
    "mb-6",
    "size-9",
    "text-brand",
    "transition-transform",
    "duration-[var(--transition-standard)]",
    "group-hover:scale-110",
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
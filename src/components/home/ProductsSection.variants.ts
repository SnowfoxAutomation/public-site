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
    "duration-500",
    "group-hover:scale-110",
    "group-hover:rotate-3",
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

  cardReveal: [
    "",
    "delay-75",
    "delay-150",
    "delay-200",
    "delay-300",
    "delay-500",
  ],
} as const;
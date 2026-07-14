export const missionSectionVariants = {
  section: [
    "scroll-mt-20",
  ].join(" "),

  content: [
    "flex",
    "flex-col",
    "gap-[calc(var(--component-gap-large)*1.2)]",
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
    "leading-[var(--line-height-body)]",
    "text-muted-foreground",
  ].join(" "),

  cardReveal: [
    "",
    "delay-100",
    "delay-200",
  ],
} as const;
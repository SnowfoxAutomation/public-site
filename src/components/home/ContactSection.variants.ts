export const contactSectionVariants = {
  section: [
    "scroll-mt-20",
  ].join(" "),

  content: [
    "mx-auto",
    "flex",
    "max-w-3xl",
    "flex-col",
    "items-center",
    "gap-[calc(var(--component-gap-large)*1.2)]",
    "text-center",
  ].join(" "),

  note: [
    "max-w-xl",
    "text-sm",
    "leading-7",
    "text-muted-foreground",
  ].join(" "),
} as const;
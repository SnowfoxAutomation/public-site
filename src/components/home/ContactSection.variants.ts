export const contactSectionVariants = {
  content: [
    "flex",
    "flex-col",
    "items-center",
    "gap-[var(--component-gap-large)]",
    "text-center",
  ].join(" "),

  body: [
    "max-w-2xl",
    "text-lg",
    "leading-8",
    "text-muted-foreground",
  ].join(" "),
} as const;
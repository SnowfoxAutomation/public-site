export const contactSectionVariants = {
  section: [
    "scroll-mt-20",
  ].join(" "),

  content: [
    "flex",
    "flex-col",
    "items-center",
    "gap-[var(--component-gap-large)]",
    "text-center",
  ].join(" "),

  note: [
    "max-w-xl",
    "text-sm",
    "text-muted-foreground",
  ].join(" "),
} as const;
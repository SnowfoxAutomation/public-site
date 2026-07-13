export const missionPreviewVariants = {
  section: [
    "bg-surface",
  ].join(" "),

  content: [
    "flex",
    "flex-col",
    "gap-8",
  ].join(" "),

  heading: [
    "text-3xl",
    "font-semibold",
    "text-foreground",
  ].join(" "),

  body: [
    "max-w-4xl",
    "text-lg",
    "leading-8",
    "text-muted-foreground",
  ].join(" "),
} as const;
export const sectionHeaderVariants = {
  content: {
    left: [
      "flex",
      "flex-col",
      "gap-6",
      "items-start",
      "text-left",
    ].join(" "),

    center: [
      "flex",
      "flex-col",
      "gap-6",
      "items-center",
      "text-center",
    ].join(" "),
  },

  eyebrow: [
    "text-sm",
    "font-semibold",
    "uppercase",
    "tracking-[0.2em]",
    "text-brand",
  ].join(" "),

  title: [
    "max-w-4xl",
    "text-foreground",
  ].join(" "),

  description: [
    "max-w-3xl",
    "text-muted-foreground",
  ].join(" "),
} as const;
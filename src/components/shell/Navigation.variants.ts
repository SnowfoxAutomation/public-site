export const navigationVariants = {
  list: [
    "flex",
    "items-center",
    "gap-8",
  ].join(" "),

  link: [
    "text-sm",
    "font-medium",
    "text-muted-foreground",
    "transition-colors",
    "hover:text-foreground",
  ].join(" "),
} as const;
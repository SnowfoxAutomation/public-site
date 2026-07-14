export const navigationVariants = {
  list: [
    "hidden",
    "items-center",
    "gap-8",
    "md:flex",
  ].join(" "),

  link: [
    "text-sm",
    "font-medium",
    "text-muted-foreground",
    "transition-colors",
    "duration-[var(--transition-fast)]",
    "hover:text-foreground",
  ].join(" "),
} as const;
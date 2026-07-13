export const headerVariants = {
  root: [
    "sticky",
    "top-0",
    "z-50",
    "border-b",
    "border-border",
    "bg-background/90",
    "backdrop-blur",
  ].join(" "),

  content: [
    "flex",
    "min-h-20",
    "items-center",
    "justify-between",
    "gap-8",
  ].join(" "),

  logo: [
    "text-2xl",
    "font-semibold",
    "tracking-tight",
    "text-foreground",
  ].join(" "),
} as const;
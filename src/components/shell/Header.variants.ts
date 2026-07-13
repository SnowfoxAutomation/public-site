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
    "h-20",
    "items-center",
    "justify-between",
  ].join(" "),

  logo: [
    "text-xl",
    "font-semibold",
    "tracking-tight",
    "text-foreground",
  ].join(" "),
} as const;
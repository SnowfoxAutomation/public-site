export const headerVariants = {
  root: [
    "sticky",
    "top-0",
    "z-50",
    "border-b",
    "border-border/70",
    "bg-background/85",
    "backdrop-blur-xl",
    "supports-[backdrop-filter]:bg-background/75",
  ].join(" "),

  content: [
    "grid",
    "min-h-20",
    "grid-cols-[auto_1fr_auto]",
    "items-center",
    "gap-8",
  ].join(" "),

  login: [
    "justify-self-end",
    "text-sm",
    "font-medium",
    "text-muted-foreground",
    "transition-colors",
    "duration-[var(--transition-fast)]",
    "hover:text-foreground",
  ].join(" "),
} as const;
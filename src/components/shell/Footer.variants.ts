export const footerVariants = {
  root: [
    "border-t",
    "border-border",
    "bg-surface",
  ].join(" "),

  content: [
    "grid",
    "gap-12",
    "py-[var(--section-spacing-small)]",
    "md:grid-cols-[1fr_auto]",
  ].join(" "),

  identity: [
    "flex",
    "max-w-md",
    "flex-col",
    "gap-4",
  ].join(" "),

  logo: [
    "text-xl",
    "font-semibold",
    "tracking-tight",
    "text-foreground",
  ].join(" "),

  description: [
    "text-muted-foreground",
  ].join(" "),

  navigation: [
    "grid",
    "gap-4",
    "text-right",
  ].join(" "),

  link: [
    "text-sm",
    "font-medium",
    "text-muted-foreground",
    "transition-colors",
    "duration-[var(--transition-fast)]",
    "hover:text-foreground",
  ].join(" "),

  legal: [
    "border-t",
    "border-border",
    "py-6",
    "text-sm",
    "text-muted-foreground",
  ].join(" "),
} as const;
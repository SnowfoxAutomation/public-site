export const contentCardVariants = {
  root: [
    "group",
    "rounded-[var(--radius-large)]",
    "border",
    "border-border",
    "bg-background/80",
    "p-8",
    "shadow-[var(--shadow-card)]",
    "transition-all",
    "duration-[var(--transition-standard)]",
    "hover:-translate-y-1",
    "hover:border-brand/30",
    "hover:shadow-[var(--shadow-overlay)]",
  ].join(" "),
} as const;
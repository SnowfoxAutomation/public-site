export const resultMetadataVariants = {
  details: [
    "rounded-[var(--radius-small)]",
    "border",
    "border-border",
    "bg-surface-muted",
    "p-4",
  ].join(" "),
  summary: [
    "cursor-pointer",
    "font-semibold",
    "text-foreground",
    "focus-visible:outline-none",
    "focus-visible:ring-3",
    "focus-visible:ring-accent/30",
  ].join(" "),
  body: ["mt-4"].join(" "),
} as const;

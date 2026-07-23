export const resultNodeVariants = {
  root: [
    "mt-3",
    "text-sm",
    "leading-6",
    "text-foreground",
  ].join(" "),
  empty: ["text-muted-foreground"].join(" "),
  list: [
    "flex",
    "list-disc",
    "flex-col",
    "gap-1",
    "pl-5",
  ].join(" "),
  collection: [
    "flex",
    "flex-col",
    "gap-2",
  ].join(" "),
  details: [
    "rounded-[var(--radius-small)]",
    "border",
    "border-border",
    "bg-surface-muted",
    "p-3",
  ].join(" "),
  summary: [
    "cursor-pointer",
    "font-medium",
    "text-foreground",
    "focus-visible:outline-none",
    "focus-visible:ring-3",
    "focus-visible:ring-accent/30",
  ].join(" "),
  properties: [
    "mt-3",
    "grid",
    "gap-3",
  ].join(" "),
  property: [
    "grid",
    "gap-1",
    "sm:grid-cols-[minmax(8rem,0.35fr)_1fr]",
  ].join(" "),
  term: [
    "font-medium",
    "text-muted-foreground",
  ].join(" "),
  value: ["min-w-0", "break-words"].join(" "),
  primitive: ["break-words"].join(" "),
} as const;

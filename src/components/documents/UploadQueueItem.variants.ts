export const uploadQueueItemVariants = {
  root: [
    "rounded-[var(--radius-medium)]",
    "border",
    "border-border",
    "bg-surface-muted",
    "p-4",
  ].join(" "),
  invalid: [
    "border-destructive/30",
    "bg-destructive/5",
  ].join(" "),
  content: [
    "flex",
    "items-start",
    "gap-3",
  ].join(" "),
  icon: [
    "mt-0.5",
    "size-5",
    "shrink-0",
    "text-brand",
  ].join(" "),
  invalidIcon: ["text-destructive"].join(" "),
  details: ["min-w-0", "flex-1"].join(" "),
  filename: [
    "truncate",
    "font-medium",
    "text-foreground",
  ].join(" "),
  metadata: [
    "mt-1",
    "text-xs",
    "text-muted-foreground",
  ].join(" "),
  status: [
    "mt-2",
    "text-xs",
    "font-medium",
    "text-brand",
  ].join(" "),
  errorStatus: ["text-destructive"].join(" "),
  errors: [
    "mt-2",
    "flex",
    "flex-col",
    "gap-1",
    "text-xs",
    "leading-5",
    "text-destructive",
  ].join(" "),
  remove: [
    "shrink-0",
    "text-muted-foreground",
  ].join(" "),
} as const;

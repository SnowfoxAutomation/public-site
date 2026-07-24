export const confidenceControlVariants = {
  fieldset: [
    "rounded-[var(--radius-large)]",
    "border",
    "border-border",
    "bg-background",
    "p-6",
    "shadow-[var(--shadow-card)]",
  ].join(" "),
  header: [
    "flex",
    "items-baseline",
    "justify-between",
    "gap-4",
  ].join(" "),
  label: [
    "font-semibold",
    "text-foreground",
  ].join(" "),
  value: [
    "font-mono",
    "text-lg",
    "font-semibold",
    "text-brand",
  ].join(" "),
  input: [
    "mt-5",
    "w-full",
    "accent-brand",
    "focus-visible:outline-none",
    "focus-visible:ring-3",
    "focus-visible:ring-accent/30",
  ].join(" "),
  scale: [
    "mt-2",
    "flex",
    "justify-between",
    "text-xs",
    "text-muted-foreground",
  ].join(" "),
  guidance: [
    "mt-4",
    "text-sm",
    "leading-6",
    "text-muted-foreground",
  ].join(" "),
} as const;

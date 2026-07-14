export const contactFormVariants = {
  form: [
    "flex",
    "w-full",
    "max-w-3xl",
    "flex-col",
    "gap-6",
  ].join(" "),

  field: [
    "flex",
    "flex-col",
    "gap-2",
  ].join(" "),

  label: [
    "text-sm",
    "font-medium",
    "text-foreground",
  ].join(" "),

  required: [
    "text-accent",
  ].join(" "),

  input: [
    "min-h-12",
    "rounded-[var(--radius-medium)]",
    "border",
    "border-border",
    "bg-background",
    "px-4",
    "py-3",
    "text-foreground",
    "outline-none",
    "transition-[border-color,box-shadow,background-color]",
    "duration-[var(--transition-fast)]",
    "placeholder:text-muted-foreground",
    "focus:border-brand",
    "focus:ring-2",
    "focus:ring-brand/20",
    "disabled:cursor-not-allowed",
    "disabled:opacity-60",
  ].join(" "),

  textarea: [
    "min-h-40",
    "resize-y",
    "rounded-[var(--radius-medium)]",
    "border",
    "border-border",
    "bg-background",
    "px-4",
    "py-3",
    "text-foreground",
    "outline-none",
    "transition-[border-color,box-shadow,background-color]",
    "duration-[var(--transition-fast)]",
    "placeholder:text-muted-foreground",
    "focus:border-brand",
    "focus:ring-2",
    "focus:ring-brand/20",
    "disabled:cursor-not-allowed",
    "disabled:opacity-60",
  ].join(" "),

  helper: [
    "text-sm",
    "text-muted-foreground",
  ].join(" "),

  footer: [
    "flex",
    "flex-col",
    "gap-4",
    "pt-2",
  ].join(" "),

  message: {
    success: [
      "rounded-[var(--radius-medium)]",
      "border",
      "border-brand/30",
      "bg-surface-emphasis",
      "px-4",
      "py-3",
      "text-sm",
      "text-foreground",
    ].join(" "),

    error: [
      "rounded-[var(--radius-medium)]",
      "border",
      "border-accent/30",
      "bg-surface",
      "px-4",
      "py-3",
      "text-sm",
      "text-accent-hover",
    ].join(" "),
  },
} as const;
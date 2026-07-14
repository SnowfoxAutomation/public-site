export const contactFormVariants = {
  form: [
    "flex",
    "w-full",
    "max-w-3xl",
    "flex-col",
    "gap-8",
  ].join(" "),

  section: [
    "flex",
    "flex-col",
    "gap-6",
    "rounded-[var(--radius-large)]",
    "border",
    "border-border",
    "bg-background",
    "p-6",
    "shadow-[var(--shadow-card)]",
    "sm:p-8",
  ].join(" "),

  field: [
    "flex",
    "flex-col",
    "gap-2",
  ].join(" "),

  labelRow: [
    "flex",
    "items-center",
    "justify-between",
    "gap-4",
  ].join(" "),

  label: [
    "text-sm",
    "font-medium",
    "text-foreground",
  ].join(" "),

  optional: [
    "text-xs",
    "text-muted-foreground",
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
    "text-foreground",
    "outline-none",
    "transition-[border-color,box-shadow,background-color]",
    "duration-[var(--transition-fast)]",
    "placeholder:text-muted-foreground/70",
    "hover:border-border-strong",
    "focus:border-brand",
    "focus:ring-2",
    "focus:ring-brand/15",
    "aria-invalid:border-accent",
    "aria-invalid:ring-2",
    "aria-invalid:ring-accent/15",
    "disabled:cursor-not-allowed",
    "disabled:opacity-60",
  ].join(" "),

  textarea: [
    "min-h-48",
    "resize-y",
    "rounded-[var(--radius-medium)]",
    "border",
    "border-border",
    "bg-background",
    "p-4",
    "text-foreground",
    "outline-none",
    "transition-[border-color,box-shadow,background-color]",
    "duration-[var(--transition-fast)]",
    "placeholder:text-muted-foreground/70",
    "hover:border-border-strong",
    "focus:border-brand",
    "focus:ring-2",
    "focus:ring-brand/15",
    "aria-invalid:border-accent",
    "aria-invalid:ring-2",
    "aria-invalid:ring-accent/15",
    "disabled:cursor-not-allowed",
    "disabled:opacity-60",
  ].join(" "),

  helper: [
    "text-sm",
    "leading-6",
    "text-muted-foreground",
  ].join(" "),

  fieldError: [
    "text-sm",
    "font-medium",
    "text-accent-hover",
  ].join(" "),

  footer: [
    "flex",
    "flex-col",
    "gap-4",
  ].join(" "),

  submit: [
    "self-start",
  ].join(" "),

  status: [
    "text-sm",
    "font-medium",
    "leading-6",
  ].join(" "),

  success: [
    "text-green-700",
  ].join(" "),

  error: [
    "text-accent-hover",
  ].join(" "),
} as const;
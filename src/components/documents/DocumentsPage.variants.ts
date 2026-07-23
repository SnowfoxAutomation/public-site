export const documentsPageVariants = {
  layout: [
    "flex",
    "flex-col",
    "gap-[var(--component-gap-large)]",
  ].join(" "),
  heading: [
    "max-w-4xl",
    "text-[length:var(--font-size-heading-1)]",
    "font-semibold",
    "leading-[var(--line-height-heading)]",
    "tracking-[var(--letter-spacing-heading)]",
    "text-foreground",
  ].join(" "),
  eyebrow: [
    "text-sm",
    "font-semibold",
    "uppercase",
    "tracking-[var(--letter-spacing-label)]",
    "text-accent",
  ].join(" "),
  description: [
    "max-w-3xl",
    "text-lg",
    "leading-8",
    "text-muted-foreground",
  ].join(" "),
  notice: [
    "rounded-[var(--radius-medium)]",
    "border",
    "border-brand/25",
    "bg-surface-emphasis",
    "p-5",
  ].join(" "),
  noticeTitle: [
    "mb-1",
    "font-semibold",
    "text-foreground",
  ].join(" "),
  noticeBody: [
    "text-sm",
    "leading-6",
    "text-muted-foreground",
  ].join(" "),
} as const;

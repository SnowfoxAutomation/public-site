export const heroVariants = {
  section: [
    "relative",
    "overflow-hidden",
    "bg-background",
    "py-[calc(var(--section-spacing-large)*1.15)]",
  ].join(" "),

  content: [
    "relative",
    "z-10",
    "mx-auto",
    "flex",
    "max-w-5xl",
    "flex-col",
    "items-center",
    "gap-[var(--component-gap-large)]",
    "text-center",
  ].join(" "),

  eyebrow: [
    "rounded-full",
    "border",
    "border-border",
    "bg-surface",
    "px-5",
    "py-2",
    "text-sm",
    "font-semibold",
    "uppercase",
    "tracking-[var(--letter-spacing-label)]",
    "text-brand",
  ].join(" "),

  title: [
    "max-w-5xl",
    "text-[length:var(--font-size-display)]",
    "leading-[var(--line-height-display)]",
    "tracking-[var(--letter-spacing-display)]",
    "text-foreground",
    "text-balance",
  ].join(" "),

  description: [
    "max-w-3xl",
    "text-[length:var(--font-size-body-large)]",
    "leading-[var(--line-height-body)]",
    "text-muted-foreground",
    "text-pretty",
  ].join(" "),

  actions: [
    "flex",
    "flex-wrap",
    "justify-center",
    "gap-4",
    "pt-2",
  ].join(" "),

  glow: [
    "absolute",
    "left-1/2",
    "top-0",
    "-z-0",
    "h-[34rem]",
    "w-[34rem]",
    "-translate-x-1/2",
    "rounded-full",
    "bg-brand/8",
    "blur-3xl",
  ].join(" "),

  grid: [
    "absolute",
    "inset-0",
    "-z-10",
    "opacity-[0.04]",
    "[background-image:linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)]",
    "[background-size:4rem_4rem]",
  ].join(" "),
} as const;
export const sectionVariants = {
  root: {
    transparent: [
      "py-[var(--section-spacing-medium)]",
    ].join(" "),

    surface: [
      "bg-surface",
      "py-[var(--section-spacing-medium)]",
    ].join(" "),

    muted: [
      "bg-surface-muted",
      "py-[var(--section-spacing-medium)]",
    ].join(" "),

    emphasis: [
      "bg-surface-emphasis",
      "py-[var(--section-spacing-medium)]",
    ].join(" "),
  },
} as const;
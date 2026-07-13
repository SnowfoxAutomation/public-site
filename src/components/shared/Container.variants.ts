export const containerVariants = {
  root: {
    small: [
      "mx-auto",
      "w-full",
      "max-w-[var(--content-width-small)]",
      "px-[var(--page-gutter)]",
    ].join(" "),

    medium: [
      "mx-auto",
      "w-full",
      "max-w-[var(--content-width-medium)]",
      "px-[var(--page-gutter)]",
    ].join(" "),

    large: [
      "mx-auto",
      "w-full",
      "max-w-[var(--content-width-large)]",
      "px-[var(--page-gutter)]",
    ].join(" "),
  },
} as const;
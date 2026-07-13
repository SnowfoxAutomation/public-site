export const contentGridVariants = {
  base: [
    "grid",
    "gap-[var(--component-gap-large)]",
  ].join(" "),

  columns: {
    one: [
      "grid-cols-1",
    ].join(" "),

    two: [
      "grid-cols-1",
      "md:grid-cols-2",
    ].join(" "),

    three: [
      "grid-cols-1",
      "md:grid-cols-2",
      "lg:grid-cols-3",
    ].join(" "),

    four: [
      "grid-cols-1",
      "md:grid-cols-2",
      "xl:grid-cols-4",
    ].join(" "),
  },
} as const;
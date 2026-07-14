export const logoVariants = {
  link: [
    "inline-flex",
    "items-center",
    "transition-opacity",
    "duration-[var(--transition-fast)]",
    "hover:opacity-90",
  ].join(" "),

  image: [
    "h-10",
    "w-auto",
    "select-none",
  ].join(" "),
} as const;
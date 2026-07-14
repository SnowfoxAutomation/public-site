export const logoVariants = {
  link: [
    "inline-flex",
    "items-center",
    "transition-all",
    "duration-500",
    "hover:scale-[1.02]",
    "hover:opacity-95",
  ].join(" "),

  image: [
    "h-10",
    "w-auto",
    "select-none",
    "drop-shadow-sm",
    "animate-logo-fade",
  ].join(" "),
} as const;
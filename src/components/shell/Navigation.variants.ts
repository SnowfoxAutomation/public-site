export const navigationVariants = {
  list: [
    "hidden",
    "justify-center",
    "items-center",
    "gap-10",
    "md:flex",
  ].join(" "),

  link: [
    "relative",
    "text-sm",
    "font-medium",
    "text-muted-foreground",
    "transition-colors",
    "duration-[var(--transition-fast)]",
    "hover:text-foreground",
    "after:absolute",
    "after:-bottom-1",
    "after:left-0",
    "after:h-px",
    "after:w-0",
    "after:bg-brand",
    "after:transition-all",
    "after:duration-[var(--transition-fast)]",
    "hover:after:w-full",
  ].join(" "),
} as const;
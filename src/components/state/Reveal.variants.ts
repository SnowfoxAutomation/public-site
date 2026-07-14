export const revealVariants = {
  base: [
    "transition-all",
    "duration-700",
    "ease-[cubic-bezier(.22,1,.36,1)]",
    "motion-reduce:transition-none",
  ].join(" "),

  hidden: [
    "translate-y-10",
    "opacity-0",
    "motion-reduce:translate-y-0",
    "motion-reduce:opacity-100",
  ].join(" "),

  visible: [
    "translate-y-0",
    "opacity-100",
  ].join(" "),
} as const;
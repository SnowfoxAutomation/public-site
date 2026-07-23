export const documentWorkspaceVariants = {
  root: [
    "grid",
    "gap-8",
    "xl:grid-cols-[0.85fr_1.15fr]",
    "items-start",
  ].join(" "),
  announcement: ["sr-only"].join(" "),
  jobs: ["xl:col-span-2"].join(" "),
} as const;

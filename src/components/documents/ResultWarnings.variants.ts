export const resultWarningsVariants = {
  section: [
    "rounded-[var(--radius-small)]",
    "border",
    "border-amber-300",
    "bg-amber-50",
    "p-4",
  ].join(" "),
  title: [
    "font-semibold",
    "text-foreground",
  ].join(" "),
  list: [
    "mt-3",
    "flex",
    "flex-col",
    "gap-2",
  ].join(" "),
  item: [
    "text-sm",
    "leading-6",
    "text-muted-foreground",
  ].join(" "),
  severity: [
    "mr-2",
    "font-semibold",
    "text-foreground",
  ].join(" "),
} as const;

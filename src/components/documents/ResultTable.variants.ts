export const resultTableVariants = {
  section: [
    "rounded-[var(--radius-small)]",
    "border",
    "border-border",
    "bg-background",
    "p-4",
  ].join(" "),
  title: [
    "mb-3",
    "font-semibold",
    "text-foreground",
  ].join(" "),
  scroller: ["overflow-x-auto"].join(" "),
  table: [
    "w-full",
    "min-w-xl",
    "border-collapse",
    "text-left",
    "text-sm",
  ].join(" "),
  heading: [
    "border-b",
    "border-border-strong",
    "px-3",
    "py-2",
    "font-semibold",
    "text-foreground",
  ].join(" "),
  cell: [
    "border-b",
    "border-border",
    "px-3",
    "py-2",
    "align-top",
    "text-muted-foreground",
  ].join(" "),
  note: [
    "mt-3",
    "text-xs",
    "text-muted-foreground",
  ].join(" "),
} as const;

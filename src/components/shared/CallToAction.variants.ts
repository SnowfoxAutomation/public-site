import { buttonVariants } from "@/components/ui/button.variants";

export const callToActionVariants = {
  primary: buttonVariants({
    variant: "primary",
    size: "large",
  }),

  secondary: buttonVariants({
    variant: "outline",
    size: "large",
  }),
} as const;
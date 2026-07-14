import { buttonVariants } from "@/components/ui/button.variants";

export const callToActionVariants = {
  primary: `${buttonVariants({
    variant: "primary",
    size: "large",
  })} shadow-lg shadow-brand/10`,

  secondary: `${buttonVariants({
    variant: "outline",
    size: "large",
  })} backdrop-blur-sm`,
} as const;
import { cn } from "@/lib/utils/cn";

import { sectionHeaderVariants } from "./SectionHeader.variants";

type SectionHeaderAlign =
  keyof typeof sectionHeaderVariants.content;

type SectionHeaderProps = {
  title: string;
  description?: string;
  eyebrow?: string;
  align?: SectionHeaderAlign;
  className?: string;
};

export function SectionHeader({
  title,
  description,
  eyebrow,
  align = "left",
  className,
}: SectionHeaderProps) {
  return (
    <header
      className={cn(
        sectionHeaderVariants.content[align],
        className,
      )}
    >
      {eyebrow ? (
        <p className={sectionHeaderVariants.eyebrow}>
          {eyebrow}
        </p>
      ) : null}

      <h2 className={sectionHeaderVariants.title}>
        {title}
      </h2>

      {description ? (
        <p className={sectionHeaderVariants.description}>
          {description}
        </p>
      ) : null}
    </header>
  );
}
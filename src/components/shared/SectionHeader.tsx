import { cn } from "@/lib/utils/cn";

import { sectionHeaderVariants } from "./SectionHeader.variants";

type SectionHeaderProps = {
  title: string;
  description?: string;
  eyebrow?: string;
  className?: string;
};

export function SectionHeader({
  title,
  description,
  eyebrow,
  className,
}: SectionHeaderProps) {
  return (
    <header
      className={cn(
        sectionHeaderVariants.root,
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
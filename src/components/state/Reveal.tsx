"use client";

import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

import { cn } from "@/lib/utils/cn";

import { revealVariants } from "./Reveal.variants";

type RevealProps = {
  children: ReactNode;
  className?: string;
};

export function Reveal({
  children,
  className,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;

    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          return;
        }

        setVisible(true);
        observer.disconnect();
      },
      {
        threshold: 0.15,
      },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cn(
        revealVariants.base,
        visible
          ? revealVariants.visible
          : revealVariants.hidden,
        className,
      )}
    >
      {children}
    </div>
  );
}
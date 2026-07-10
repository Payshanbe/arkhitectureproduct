import type { ElementType, HTMLAttributes, ReactNode } from "react";

import { cn } from "@/utils/cn";

type SectionSpacing = "none" | "small" | "medium" | "large" | "hero";

interface SectionProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  children: ReactNode;
  spacing?: SectionSpacing;
}

const spacingClasses: Record<SectionSpacing, string> = {
  none: "",
  small: "py-[var(--section-spacing-small)]",
  medium: "py-[var(--section-spacing-medium)]",
  large: "py-[var(--section-spacing-large)]",
  hero: "flex min-h-[100svh] items-end py-[var(--section-spacing-hero)]",
};

export function Section({
  as: Component = "section",
  children,
  className,
  spacing = "medium",
  ...props
}: SectionProps) {
  return (
    <Component className={cn(spacingClasses[spacing], className)} {...props}>
      {children}
    </Component>
  );
}

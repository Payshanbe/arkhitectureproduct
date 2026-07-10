import type { ElementType, HTMLAttributes } from "react";

import { cn } from "@/utils/cn";

interface SectionHeadingProps extends HTMLAttributes<HTMLDivElement> {
  align?: "start" | "center";
  as?: ElementType;
  eyebrow?: string;
  supportingText?: string;
  title: string;
}

export function SectionHeading({
  align = "start",
  as: Heading = "h2",
  className,
  eyebrow,
  supportingText,
  title,
  ...props
}: SectionHeadingProps) {
  const isCentered = align === "center";

  return (
    <div
      className={cn("max-w-[var(--text-width)]", isCentered && "mx-auto text-center", className)}
      {...props}
    >
      {eyebrow ? (
        <p className="mb-4 font-sans text-[length:var(--font-size-label)] uppercase leading-[var(--line-height-ui)] tracking-[var(--letter-spacing-label)] text-foreground-muted">
          {eyebrow}
        </p>
      ) : null}

      <Heading className="font-display text-[length:var(--font-size-heading)] leading-[var(--line-height-heading)] tracking-[var(--letter-spacing-heading)] text-balance text-foreground">
        {title}
      </Heading>

      {supportingText ? (
        <p className="mt-8 text-pretty text-[length:var(--font-size-body-large)] leading-[var(--line-height-body-large)] text-foreground-secondary">
          {supportingText}
        </p>
      ) : null}
    </div>
  );
}

import type { ElementType, HTMLAttributes, ReactNode } from "react";

import { cn } from "@/utils/cn";

interface EditorialStatementProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  attribution?: string;
  children: ReactNode;
}

export function EditorialStatement({
  as: Component = "blockquote",
  attribution,
  children,
  className,
  ...props
}: EditorialStatementProps) {
  return (
    <Component
      className={cn(
        "max-w-[var(--statement-width)] font-display text-[length:var(--font-size-statement)] leading-[var(--line-height-statement)] text-balance text-foreground",
        className,
      )}
      {...props}
    >
      {children}

      {attribution ? (
        <footer className="mt-8 font-sans text-[length:var(--font-size-label)] uppercase leading-[var(--line-height-ui)] tracking-[var(--letter-spacing-label)] text-foreground-muted">
          {attribution}
        </footer>
      ) : null}
    </Component>
  );
}

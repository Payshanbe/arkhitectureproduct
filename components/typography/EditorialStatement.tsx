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
        "max-w-[var(--statement-width)] type-statement text-foreground",
        className,
      )}
      {...props}
    >
      {children}

      {attribution ? (
        <footer className="mt-8 font-sans type-label text-foreground-muted">
          {attribution}
        </footer>
      ) : null}
    </Component>
  );
}

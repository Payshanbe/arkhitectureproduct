import type { ElementType, HTMLAttributes, ReactNode } from "react";

import { cn } from "@/utils/cn";

interface PageProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  children: ReactNode;
}

export function Page({ as: Component = "main", children, className, ...props }: PageProps) {
  return (
    <Component
      className={cn("min-h-svh overflow-clip bg-background text-foreground", className)}
      id={props.id ?? "main-content"}
      {...props}
    >
      {children}
    </Component>
  );
}

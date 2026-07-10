import type { ElementType, HTMLAttributes, ReactNode } from "react";

import { cn } from "@/utils/cn";

type ContainerWidth = "default" | "narrow" | "statement" | "bleed";

interface ContainerProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  children: ReactNode;
  width?: ContainerWidth;
}

const widthClasses: Record<ContainerWidth, string> = {
  default: "mx-auto w-full max-w-[var(--container-max)] px-[var(--container-padding)]",
  narrow:
    "mx-auto w-full max-w-[calc(var(--text-width)+var(--container-padding)*2)] px-[var(--container-padding)]",
  statement:
    "mx-auto w-full max-w-[calc(var(--statement-width)+var(--container-padding)*2)] px-[var(--container-padding)]",
  bleed: "w-full",
};

export function Container({
  as: Component = "div",
  children,
  className,
  width = "default",
  ...props
}: ContainerProps) {
  return (
    <Component className={cn(widthClasses[width], className)} {...props}>
      {children}
    </Component>
  );
}

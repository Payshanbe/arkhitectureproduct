"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import type { NavigationItem } from "@/lib/constants/navigation";
import { primaryNavigation } from "@/lib/constants/navigation";
import { cn } from "@/utils/cn";

interface NavigationProps {
  className?: string;
  itemClassName?: string;
  items?: NavigationItem[];
  label?: string;
  onNavigate?: () => void;
  variant?: "inline" | "menu";
}

function isActivePath(pathname: string, href: string) {
  if (href === "/") {
    return pathname === href;
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Navigation({
  className,
  itemClassName,
  items = primaryNavigation,
  label = "Primary navigation",
  onNavigate,
  variant = "inline",
}: NavigationProps) {
  const pathname = usePathname();

  return (
    <nav aria-label={label} className={className}>
      <ul
        className={cn(
          variant === "inline" && "flex items-center gap-8",
          variant === "menu" && "space-y-4",
        )}
      >
        {items.map((item) => {
          const isActive = isActivePath(pathname, item.href);

          return (
            <li key={item.href}>
              <Link
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "group inline-flex text-foreground transition-[color,opacity] duration-base ease-architectural-out hover:text-accent focus-visible:text-accent",
                  variant === "inline" &&
                    "text-[length:var(--font-size-ui)] uppercase leading-[var(--line-height-ui)] tracking-[var(--letter-spacing-ui)]",
                  variant === "menu" &&
                    "font-display text-[length:clamp(3rem,12vw,8rem)] leading-[0.9] tracking-[var(--letter-spacing-heading)]",
                  isActive && "text-accent",
                  itemClassName,
                )}
                href={item.href}
                onClick={onNavigate}
              >
                <span
                  className={cn(
                    "bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat transition-[background-size] duration-base ease-architectural-out group-hover:bg-[length:100%_1px] group-focus-visible:bg-[length:100%_1px]",
                    isActive && "bg-[length:100%_1px]",
                  )}
                >
                  {item.label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

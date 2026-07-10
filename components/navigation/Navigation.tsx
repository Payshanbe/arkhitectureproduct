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
          variant === "inline" && "flex items-center gap-12",
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
                  "group inline-flex transition-colors duration-base ease-architectural-out",
                  variant === "inline" && "type-label",
                  variant === "menu" && "type-display",
                  itemClassName,
                )}
                href={item.href}
                onClick={onNavigate}
              >
                <span
                  className={cn(
                    "nav-underline",
                    isActive && "nav-underline--active",
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

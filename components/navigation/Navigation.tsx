"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import type { NavigationItem } from "@/lib/constants/navigation";
import { primaryNavigation } from "@/lib/constants/navigation";
import { getLocaleFromPathname, localizePath, type SiteLocale } from "@/lib/i18n/config";
import { cn } from "@/utils/cn";

interface NavigationProps {
  className?: string;
  itemClassName?: string;
  items?: NavigationItem[];
  label?: string;
  locale?: SiteLocale;
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
  locale,
  onNavigate,
  variant = "inline",
}: NavigationProps) {
  const pathname = usePathname();
  const activeLocale = locale ?? getLocaleFromPathname(pathname);

  return (
    <nav aria-label={label} className={className}>
      <ul
        className={cn(
          variant === "inline" && "flex items-center gap-12",
          variant === "menu" && "space-y-4",
        )}
      >
        {items.map((item) => {
          const href = localizePath(item.href, activeLocale);
          const isActive = isActivePath(pathname, href);

          return (
            <li key={href}>
              <Link
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "group inline-flex transition-colors duration-base ease-architectural-out",
                  variant === "inline" && "type-label",
                  variant === "menu" && "type-display",
                  itemClassName,
                )}
                href={href}
                onClick={onNavigate}
              >
                <span className={cn("nav-underline", isActive && "nav-underline--active")}>
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

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  getLocaleFromPathname,
  getLanguageTag,
  localeLabels,
  localeNames,
  siteLocales,
  switchLocalePath,
  type SiteLocale,
} from "@/lib/i18n/config";
import { cn } from "@/utils/cn";

interface LanguageSwitcherProps {
  className?: string;
  locale?: SiteLocale;
  onNavigate?: () => void;
}

export function LanguageSwitcher({ className, locale, onNavigate }: LanguageSwitcherProps) {
  const pathname = usePathname();
  const activeLocale = locale ?? getLocaleFromPathname(pathname);

  return (
    <nav aria-label="Выбор языка" className={cn("language-switcher flex items-center", className)}>
      {siteLocales.map((itemLocale, index) => {
        const isActive = itemLocale === activeLocale;

        return (
          <span className="flex items-center" key={itemLocale}>
            {index > 0 ? (
              <span aria-hidden="true" className="mx-2 opacity-45">
                ·
              </span>
            ) : null}
            <Link
              aria-current={isActive ? "page" : undefined}
              aria-label={`Переключить язык: ${localeNames[itemLocale]}`}
              className={cn(
                "nav-underline inline-flex py-1 transition-opacity duration-base ease-architectural-out hover:opacity-65 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-current focus-visible:ring-offset-4",
                isActive && "nav-underline--active",
              )}
              href={switchLocalePath(pathname, itemLocale)}
              hrefLang={getLanguageTag(itemLocale)}
              lang={getLanguageTag(itemLocale)}
              onClick={() => {
                document.documentElement.lang = getLanguageTag(itemLocale);
                onNavigate?.();
              }}
            >
              {localeLabels[itemLocale]}
            </Link>
          </span>
        );
      })}
    </nav>
  );
}

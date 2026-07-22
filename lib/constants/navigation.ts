import type { SiteLocale } from "@/lib/i18n/config";

export interface NavigationItem {
  href: string;
  label: string;
}

export const primaryNavigation: NavigationItem[] = [
  {
    href: "/",
    label: "Home",
  },
  {
    href: "/work",
    label: "Work",
  },
  {
    href: "/studio",
    label: "Studio",
  },
  {
    href: "/contact",
    label: "Contact",
  },
];

export const localizedPrimaryNavigation: Record<SiteLocale, NavigationItem[]> = {
  ru: [
    { href: "/", label: "Главная" },
    { href: "/work", label: "Проекты" },
    { href: "/studio", label: "Студия" },
    { href: "/contact", label: "Контакты" },
  ],
  tj: [
    { href: "/", label: "Асосӣ" },
    { href: "/work", label: "Лоиҳаҳо" },
    { href: "/studio", label: "Студия" },
    { href: "/contact", label: "Тамос" },
  ],
};

export function getPrimaryNavigation(locale: SiteLocale) {
  return localizedPrimaryNavigation[locale];
}

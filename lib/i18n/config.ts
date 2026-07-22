export const siteLocales = ["ru", "tj"] as const;

export type SiteLocale = (typeof siteLocales)[number];

export const defaultLocale: SiteLocale = "ru";

export const localeLabels: Record<SiteLocale, string> = {
  ru: "Рус",
  tj: "Тоҷ",
};

export const localeNames: Record<SiteLocale, string> = {
  ru: "Русский",
  tj: "Тоҷикӣ",
};

export function getLanguageTag(locale: SiteLocale) {
  return locale === "tj" ? "tg" : "ru";
}

export function isSiteLocale(value: string | null | undefined): value is SiteLocale {
  return siteLocales.includes(value as SiteLocale);
}

export function normalizeLocale(value: string | null | undefined): SiteLocale {
  return isSiteLocale(value) ? value : defaultLocale;
}

export function getLocaleFromPathname(pathname: string): SiteLocale {
  const [, segment] = pathname.split("/");

  return normalizeLocale(segment);
}

export function stripLocaleFromPath(pathname: string) {
  const segments = pathname.split("/");

  if (isSiteLocale(segments[1])) {
    segments.splice(1, 1);
  }

  const path = segments.join("/");

  return path || "/";
}

export function localizePath(path: string, locale: SiteLocale) {
  if (
    !path.startsWith("/") ||
    path.startsWith("//") ||
    path.startsWith("/api/") ||
    path.startsWith("/admin") ||
    path.startsWith("/prototype/")
  ) {
    return path;
  }

  const [pathname, suffix = ""] = path.split(/(?=[?#])/u, 2);
  const unlocalizedPath = stripLocaleFromPath(pathname || "/");

  return `/${locale}${unlocalizedPath === "/" ? "" : unlocalizedPath}${suffix}`;
}

export function switchLocalePath(pathname: string, locale: SiteLocale) {
  if (pathname.startsWith("/prototype/")) {
    return `/${locale}`;
  }

  return localizePath(stripLocaleFromPath(pathname), locale);
}

export function getOpenGraphLocale(locale: SiteLocale) {
  return locale === "tj" ? "tg_TJ" : "ru_RU";
}

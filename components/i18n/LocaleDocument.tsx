"use client";

import { useEffect } from "react";

import { getLanguageTag, type SiteLocale } from "@/lib/i18n/config";

interface LocaleDocumentProps {
  locale: SiteLocale;
}

export function LocaleDocument({ locale }: LocaleDocumentProps) {
  useEffect(() => {
    document.documentElement.lang = getLanguageTag(locale);
  }, [locale]);

  return null;
}

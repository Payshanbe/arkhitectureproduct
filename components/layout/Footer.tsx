import Link from "next/link";

import { BrandLogo } from "@/components/brand/BrandLogo";
import { Container } from "@/components/layout/Container";
import { getSiteChromeContent } from "@/lib/cms/siteContent";
import { localizePath, type SiteLocale } from "@/lib/i18n/config";

const footerLinkClass =
  "text-[length:var(--font-size-label)] uppercase tracking-[var(--letter-spacing-label)] leading-[var(--line-height-ui)] text-foreground-muted transition-opacity duration-base ease-architectural-out hover:opacity-65 focus-visible:text-accent";

interface FooterProps {
  locale: SiteLocale;
}

export async function Footer({ locale }: FooterProps) {
  const { contact, navigationItems, settings } = await getSiteChromeContent(locale);

  return (
    <footer className="bg-background pb-10 pt-6 text-foreground lg:pb-12">
      <Container>
        <div className="border-t border-border pt-6">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-baseline lg:justify-between lg:gap-10">
            <Link
              aria-label={`${settings.siteName} — Home`}
              className="inline-flex transition-opacity duration-base ease-architectural-out hover:opacity-65 focus-visible:text-accent"
              href={localizePath("/", locale)}
            >
              <BrandLogo name={settings.siteName} variant="footer" />
            </Link>

            <nav aria-label="Footer navigation" className="flex flex-wrap gap-x-7 gap-y-3">
              {navigationItems.map((item) => (
                <Link
                  className={footerLinkClass}
                  href={localizePath(item.href, locale)}
                  key={item.href}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <nav aria-label="Social links" className="flex flex-wrap gap-x-7 gap-y-3">
              {contact.socialLinks.map((item) => (
                <a
                  className={footerLinkClass}
                  href={item.href}
                  key={item.href}
                  rel="noreferrer"
                  target="_blank"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            <p className="text-[length:var(--font-size-label)] uppercase tracking-[var(--letter-spacing-label)] leading-[var(--line-height-ui)] text-foreground-muted/80">
              {settings.copyright}
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}

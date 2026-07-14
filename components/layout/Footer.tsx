import Link from "next/link";

import { Container } from "@/components/layout/Container";
import { getSiteChromeContent } from "@/lib/cms/siteContent";

const footerLinkClass =
  "text-[length:var(--font-size-label)] uppercase tracking-[var(--letter-spacing-label)] leading-[var(--line-height-ui)] text-foreground-muted transition-opacity duration-base ease-architectural-out hover:opacity-65 focus-visible:text-accent";

export async function Footer() {
  const { contact, navigationItems, settings } = await getSiteChromeContent();

  return (
    <footer className="bg-background pb-10 pt-6 text-foreground lg:pb-12">
      <Container>
        <div className="border-t border-border pt-6">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-baseline lg:justify-between lg:gap-10">
            <Link
              className="inline-flex text-[length:var(--font-size-label)] uppercase leading-[var(--line-height-ui)] tracking-[0.32em] transition-opacity duration-base ease-architectural-out hover:opacity-65 focus-visible:text-accent"
              href="/"
            >
              {settings.siteName}
            </Link>

            <nav aria-label="Footer navigation" className="flex flex-wrap gap-x-7 gap-y-3">
              {navigationItems.map((item) => (
                <Link className={footerLinkClass} href={item.href} key={item.href}>
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

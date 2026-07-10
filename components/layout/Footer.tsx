import Link from "next/link";

import { Container } from "@/components/layout/Container";
import { primaryNavigation } from "@/lib/constants/navigation";

const socialLinks = [
  {
    href: "https://www.instagram.com/",
    label: "Instagram",
  },
  {
    href: "https://www.linkedin.com/",
    label: "LinkedIn",
  },
  {
    href: "https://www.behance.net/",
    label: "Behance",
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-background py-12 text-foreground lg:py-16">
      <Container>
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-12 lg:gap-[var(--grid-gap)]">
          <div className="lg:col-span-4">
            <Link
              className="inline-flex text-[length:var(--font-size-ui)] uppercase leading-[var(--line-height-ui)] tracking-[var(--letter-spacing-ui)] transition-colors duration-base ease-architectural-out hover:text-accent focus-visible:text-accent"
              href="/"
            >
              Arkhitecture
            </Link>

            <p className="mt-4 text-[length:var(--font-size-label)] uppercase leading-[var(--line-height-ui)] tracking-[var(--letter-spacing-label)] text-foreground-muted">
              &copy; 2026 Arkhitecture
            </p>
          </div>

          <nav
            aria-label="Footer navigation"
            className="flex flex-col items-start gap-3 lg:col-span-3 lg:col-start-7"
          >
            {primaryNavigation.map((item) => (
              <Link
                className="text-[length:var(--font-size-label)] uppercase leading-[var(--line-height-ui)] tracking-[var(--letter-spacing-label)] text-foreground-secondary transition-colors duration-base ease-architectural-out hover:text-accent focus-visible:text-accent"
                href={item.href}
                key={item.href}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <nav
            aria-label="Social links"
            className="flex flex-col items-start gap-3 lg:col-span-2 lg:col-start-11"
          >
            {socialLinks.map((item) => (
              <a
                className="text-[length:var(--font-size-label)] uppercase leading-[var(--line-height-ui)] tracking-[var(--letter-spacing-label)] text-foreground-secondary transition-colors duration-base ease-architectural-out hover:text-accent focus-visible:text-accent"
                href={item.href}
                key={item.href}
                rel="noreferrer"
                target="_blank"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </Container>
    </footer>
  );
}

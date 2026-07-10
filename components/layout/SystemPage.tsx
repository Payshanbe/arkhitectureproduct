import Link from "next/link";

import { Container } from "@/components/layout/Container";
import { Page } from "@/components/layout/Page";
import { Section } from "@/components/layout/Section";
import { cn } from "@/utils/cn";

interface SystemPageProps {
  action?: {
    href: string;
    label: string;
  };
  label: string;
  message: string;
  title: string;
}

export function SystemPage({ action, label, message, title }: SystemPageProps) {
  return (
    <Page>
      <Section
        className="flex min-h-svh items-end bg-background pb-[var(--section-spacing-large)] pt-[calc(var(--section-spacing-large)+var(--space-20))]"
        spacing="none"
      >
        <Container>
          <div className="grid gap-8 border-t border-border pt-6 lg:grid-cols-12 lg:gap-[var(--grid-gap)]">
            <p className="text-[length:var(--font-size-label)] uppercase leading-[var(--line-height-ui)] tracking-[var(--letter-spacing-label)] text-foreground-muted lg:col-span-3">
              {label}
            </p>
            <div className="lg:col-span-7 lg:col-start-5">
              <h1 className="font-display text-[length:clamp(3rem,7vw,8rem)] leading-[0.98] tracking-[var(--letter-spacing-heading)] text-balance text-foreground">
                {title}
              </h1>
              <p className="mt-8 max-w-[620px] text-pretty text-[length:var(--font-size-body-large)] leading-[var(--line-height-body-large)] text-foreground-secondary">
                {message}
              </p>
              {action ? (
                <Link
                  className={cn(
                    "group mt-10 inline-flex text-[length:var(--font-size-ui)] uppercase leading-[var(--line-height-ui)] tracking-[var(--letter-spacing-ui)] text-foreground",
                    "transition-colors duration-base ease-architectural-out hover:text-accent focus-visible:text-accent",
                  )}
                  href={action.href}
                >
                  <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:100%_1px] bg-left-bottom bg-no-repeat pb-1 transition-[background-size] duration-base ease-architectural-out group-hover:bg-[length:0%_1px] group-focus-visible:bg-[length:0%_1px]">
                    {action.label}
                  </span>
                </Link>
              ) : null}
            </div>
          </div>
        </Container>
      </Section>
    </Page>
  );
}

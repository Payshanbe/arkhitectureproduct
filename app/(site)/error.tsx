"use client";

import Link from "next/link";

import { Container } from "@/components/layout/Container";
import { Page } from "@/components/layout/Page";
import { Section } from "@/components/layout/Section";
import { cn } from "@/utils/cn";

interface ErrorPageProps {
  error: Error & {
    digest?: string;
  };
  reset: () => void;
}

export default function ErrorPage({ reset }: ErrorPageProps) {
  return (
    <Page>
      <Section
        className="flex min-h-svh items-end bg-background pb-[var(--section-spacing-large)] pt-[calc(var(--section-spacing-large)+var(--space-20))]"
        spacing="none"
      >
        <Container>
          <div className="grid gap-8 border-t border-border pt-6 lg:grid-cols-12 lg:gap-[var(--grid-gap)]">
            <p className="type-label text-foreground-muted lg:col-span-3">
              Error
            </p>
            <div className="lg:col-span-7 lg:col-start-5">
              <h1 className="type-display text-foreground">
                The page paused unexpectedly.
              </h1>
              <p className="mt-8 max-w-[620px] text-pretty text-[length:var(--font-size-body-large)] leading-[var(--line-height-body-large)] text-foreground-secondary">
                Something interrupted this page. You can return home, or try loading the view again.
              </p>
              <div className="mt-10 flex flex-wrap gap-6">
                <button
                  className={cn(
                    "group inline-flex text-[length:var(--font-size-ui)] uppercase leading-[var(--line-height-ui)] tracking-[var(--letter-spacing-ui)] text-foreground",
                    "transition-opacity duration-base ease-architectural-out hover:opacity-65 focus-visible:text-accent",
                  )}
                  onClick={reset}
                  type="button"
                >
                  <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:100%_1px] bg-left-bottom bg-no-repeat pb-1 transition-[background-size] duration-base ease-architectural-out group-hover:bg-[length:0%_1px] group-focus-visible:bg-[length:0%_1px]">
                    Try again
                  </span>
                </button>
                <Link
                  className={cn(
                    "group inline-flex text-[length:var(--font-size-ui)] uppercase leading-[var(--line-height-ui)] tracking-[var(--letter-spacing-ui)] text-foreground-secondary",
                    "transition-opacity duration-base ease-architectural-out hover:opacity-65 focus-visible:text-accent",
                  )}
                  href="/"
                >
                  <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:100%_1px] bg-left-bottom bg-no-repeat pb-1 transition-[background-size] duration-base ease-architectural-out group-hover:bg-[length:0%_1px] group-focus-visible:bg-[length:0%_1px]">
                    Return home
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </Page>
  );
}

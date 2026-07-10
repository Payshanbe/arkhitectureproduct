import { Container } from "@/components/layout/Container";
import { Page } from "@/components/layout/Page";
import { Section } from "@/components/layout/Section";

export default function Loading() {
  return (
    <Page aria-busy="true" aria-live="polite">
      <Section
        className="flex min-h-svh items-end bg-background pb-[var(--section-spacing-large)] pt-[calc(var(--section-spacing-large)+var(--space-20))]"
        spacing="none"
      >
        <Container>
          <div className="grid gap-8 border-t border-border pt-6 lg:grid-cols-12 lg:gap-[var(--grid-gap)]">
            <p className="text-[length:var(--font-size-label)] uppercase leading-[var(--line-height-ui)] tracking-[var(--letter-spacing-label)] text-foreground-muted lg:col-span-3">
              Loading
            </p>
            <div className="lg:col-span-7 lg:col-start-5">
              <p className="font-display text-[length:clamp(3rem,7vw,8rem)] leading-[0.98] tracking-[var(--letter-spacing-heading)] text-balance text-foreground">
                Preparing the next view.
              </p>
            </div>
          </div>
        </Container>
      </Section>
    </Page>
  );
}

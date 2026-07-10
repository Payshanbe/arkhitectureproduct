"use client";

import { Container } from "@/components/layout/Container";
import { Page } from "@/components/layout/Page";
import { Section } from "@/components/layout/Section";
import { SignatureExperienceSection } from "@/features/signature-experience/components/SignatureExperienceSection";

export function SignatureExperienceAnimatedPrototype() {
  return (
    <Page>
      <div className="bg-background text-foreground">
        <Section
          className="bg-background pt-[calc(var(--section-spacing-large)+var(--space-20))]"
          spacing="large"
        >
          <Container>
            <div className="grid gap-8 border-t border-border pt-6 lg:grid-cols-12 lg:gap-[var(--grid-gap)]">
              <p className="text-[length:var(--font-size-label)] uppercase leading-[var(--line-height-ui)] tracking-[var(--letter-spacing-label)] text-foreground-muted lg:col-span-3">
                Prototype
              </p>
              <div className="lg:col-span-7 lg:col-start-5">
                <h1 className="font-display text-[length:clamp(3rem,7vw,8rem)] leading-[0.98] tracking-[var(--letter-spacing-heading)] text-balance text-foreground">
                  Signature process experience.
                </h1>
                <p className="mt-8 max-w-[680px] text-pretty text-[length:var(--font-size-body-large)] leading-[var(--line-height-body-large)] text-foreground-secondary">
                  A safe prototype for the Studio process story. This version animates the
                  Courtyard House SVG layers using the internal engine, while keeping the public
                  Studio page untouched.
                </p>
              </div>
            </div>
          </Container>
        </Section>
        <SignatureExperienceSection />
      </div>
    </Page>
  );
}

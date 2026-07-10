import Link from "next/link";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { EditorialStatement } from "@/components/typography/EditorialStatement";
import { HomeStudioIntroMotion } from "@/features/home/HomeStudioIntroMotion";

export function HomeStudioIntro() {
  return (
    <Section className="bg-background-secondary py-[clamp(var(--space-16),7vw,var(--space-24))]" spacing="none">
      <HomeStudioIntroMotion>
        <Container>
          <div className="grid items-start gap-8 lg:grid-cols-12 lg:gap-[var(--grid-gap)]">
            <div className="flex items-center gap-8 lg:col-span-3" data-studio-intro-reveal>
              <p className="type-label text-foreground-muted">
                Our Approach
              </p>
              <span className="hidden h-px flex-1 bg-border lg:block" aria-hidden="true" />
            </div>

            <div className="lg:col-span-6 lg:col-start-5">
              <EditorialStatement as="h2" data-studio-intro-reveal>
                We design spaces through atmosphere, restraint, and a close reading of context.
              </EditorialStatement>

              <div className="mt-6 grid gap-8 lg:grid-cols-6 lg:gap-[var(--grid-gap)]">
                <p
                  className="text-pretty type-body text-foreground-secondary lg:col-span-4"
                  data-studio-intro-reveal
                >
                  The studio approaches each project as a careful composition of light, material,
                  proportion, and daily ritual. The result is architecture that feels calm,
                  precise, and quietly enduring.
                </p>
              </div>
            </div>

            <div className="lg:col-span-2 lg:col-start-11 lg:pt-20" data-studio-intro-reveal>
              <Link
                className="group inline-flex items-center gap-10 text-[length:var(--font-size-ui)] uppercase leading-[var(--line-height-ui)] tracking-[var(--letter-spacing-ui)] text-foreground transition-opacity duration-base ease-architectural-out hover:opacity-65 focus-visible:text-accent"
                href="/studio"
              >
                <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:100%_1px] bg-left-bottom bg-no-repeat pb-1 transition-[background-size] duration-base ease-architectural-out group-hover:bg-[length:0%_1px] group-focus-visible:bg-[length:0%_1px]">
                  Learn More
                </span>
                <span className="transition-transform duration-base ease-architectural-out group-hover:translate-x-2" aria-hidden="true">
                  &rarr;
                </span>
              </Link>
            </div>
          </div>
        </Container>
      </HomeStudioIntroMotion>
    </Section>
  );
}

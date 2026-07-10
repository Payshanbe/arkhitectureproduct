import Link from "next/link";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { EditorialStatement } from "@/components/typography/EditorialStatement";
import { HomeStudioIntroMotion } from "@/features/home/HomeStudioIntroMotion";

export function HomeStudioIntro() {
  return (
    <Section className="bg-background-secondary" spacing="large">
      <HomeStudioIntroMotion>
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-[var(--grid-gap)]">
            <p
              className="text-[length:var(--font-size-label)] uppercase leading-[var(--line-height-ui)] tracking-[var(--letter-spacing-label)] text-foreground-muted lg:col-span-2"
              data-studio-intro-reveal
            >
              Studio
            </p>

            <div className="lg:col-span-9 lg:col-start-4">
              <EditorialStatement
                as="h2"
                className="text-[length:clamp(2.75rem,7vw,8rem)]"
                data-studio-intro-reveal
              >
                We design spaces through atmosphere, restraint, and a close reading of context.
              </EditorialStatement>

              <div className="mt-10 grid gap-8 lg:grid-cols-9 lg:gap-[var(--grid-gap)]">
                <p
                  className="text-pretty text-[length:var(--font-size-body-large)] leading-[var(--line-height-body-large)] text-foreground-secondary lg:col-span-5"
                  data-studio-intro-reveal
                >
                  The studio approaches each project as a careful composition of light, material,
                  proportion, and daily ritual. The result is architecture that feels calm,
                  precise, and quietly enduring.
                </p>

                <div className="lg:col-span-3 lg:col-start-7" data-studio-intro-reveal>
                  <Link
                    className="group inline-flex text-[length:var(--font-size-ui)] uppercase leading-[var(--line-height-ui)] tracking-[var(--letter-spacing-ui)] text-foreground transition-colors duration-base ease-architectural-out hover:text-accent focus-visible:text-accent"
                    href="/studio"
                  >
                    <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:100%_1px] bg-left-bottom bg-no-repeat pb-1 transition-[background-size] duration-base ease-architectural-out group-hover:bg-[length:0%_1px] group-focus-visible:bg-[length:0%_1px]">
                      Studio philosophy
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </HomeStudioIntroMotion>
    </Section>
  );
}

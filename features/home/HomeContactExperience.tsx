import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { EditorialStatement } from "@/components/typography/EditorialStatement";
import { HomeContactExperienceMotion } from "@/features/home/HomeContactExperienceMotion";

const contactEmail = "studio@arkhitecture.com";

export function HomeContactExperience() {
  return (
    <Section className="bg-background" spacing="large">
      <HomeContactExperienceMotion>
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-[var(--grid-gap)]">
            <p
              className="text-[length:var(--font-size-label)] uppercase leading-[var(--line-height-ui)] tracking-[var(--letter-spacing-label)] text-foreground-muted lg:col-span-2"
              data-contact-experience-reveal
            >
              Contact
            </p>

            <div className="lg:col-span-9 lg:col-start-4">
              <EditorialStatement
                as="h2"
                className="text-[length:clamp(2.75rem,7vw,8rem)]"
                data-contact-experience-reveal
              >
                Begin with a conversation about place, atmosphere, and what should endure.
              </EditorialStatement>

              <div className="mt-10 grid gap-8 lg:grid-cols-9 lg:gap-[var(--grid-gap)]">
                <p
                  className="text-pretty text-[length:var(--font-size-body-large)] leading-[var(--line-height-body-large)] text-foreground-secondary lg:col-span-5"
                  data-contact-experience-reveal
                >
                  For residences, interiors, and architectural collaborations, send a brief note
                  and we will reply with a considered next step.
                </p>

                <div
                  className="flex flex-col items-start gap-5 lg:col-span-3 lg:col-start-7"
                  data-contact-experience-reveal
                >
                  <a
                    className="group inline-flex text-[length:var(--font-size-ui)] uppercase leading-[var(--line-height-ui)] tracking-[var(--letter-spacing-ui)] text-foreground transition-colors duration-base ease-architectural-out hover:text-accent focus-visible:text-accent"
                    href={`mailto:${contactEmail}`}
                  >
                    <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:100%_1px] bg-left-bottom bg-no-repeat pb-1 transition-[background-size] duration-base ease-architectural-out group-hover:bg-[length:0%_1px] group-focus-visible:bg-[length:0%_1px]">
                      {contactEmail}
                    </span>
                  </a>

                  <a
                    className="group inline-flex text-[length:var(--font-size-ui)] uppercase leading-[var(--line-height-ui)] tracking-[var(--letter-spacing-ui)] text-foreground transition-colors duration-base ease-architectural-out hover:text-accent focus-visible:text-accent"
                    href={`mailto:${contactEmail}?subject=Project%20Inquiry`}
                  >
                    <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:100%_1px] bg-left-bottom bg-no-repeat pb-1 transition-[background-size] duration-base ease-architectural-out group-hover:bg-[length:0%_1px] group-focus-visible:bg-[length:0%_1px]">
                      Start a project
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </HomeContactExperienceMotion>
    </Section>
  );
}

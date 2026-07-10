import Link from "next/link";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { EditorialStatement } from "@/components/typography/EditorialStatement";
import { SignatureExperienceSection } from "@/features/signature-experience/components/SignatureExperienceSection";
import { StudioPageMotion } from "@/features/studio/StudioPageMotion";

const philosophyText = [
  "The studio works from the belief that architecture should become quieter as it becomes more precise. Each project begins with listening: to the site, to the pace of daily life, to climate, light, material, and the rituals that will eventually occupy the space.",
  "We are interested in restraint as an active design tool. A reduced palette is not an absence of thought; it is a way of allowing proportion, shadow, texture, and threshold to carry the emotional weight of a place.",
  "The result is not a fixed style, but a consistent way of working. Every decision is measured against atmosphere, longevity, and the ability of a space to feel inevitable over time.",
];

const principles = [
  "Architecture should frame life rather than perform for attention.",
  "Every material must justify its presence through use, atmosphere, or touch.",
  "Light is never decorative; it is structural to the experience.",
  "A plan should feel calm before it feels impressive.",
  "Longevity matters more than novelty.",
];

const studioInfo = [
  {
    label: "Location",
    value: "Remote studio with projects across Europe and selected international contexts.",
  },
  {
    label: "Disciplines",
    value: "Architecture, interiors, furniture direction, landscape integration, and spatial strategy.",
  },
  {
    label: "Collaborations",
    value: "Independent makers, engineers, landscape designers, artists, fabricators, and photographers.",
  },
];

export function StudioPage() {
  return (
    <StudioPageMotion>
      <Section
        className="bg-background pt-[calc(var(--section-spacing-large)+var(--space-20))]"
        spacing="large"
      >
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-[var(--grid-gap)]">
            <p
              className="type-label text-foreground-muted lg:col-span-2"
              data-studio-reveal
            >
              Studio
            </p>

            <EditorialStatement
              as="h1"
              className="type-display lg:col-span-9 lg:col-start-4"
              data-studio-reveal
            >
              We design spaces through atmosphere, restraint, and a careful reading of context.
            </EditorialStatement>
          </div>
        </Container>
      </Section>

      <Section className="bg-background-secondary" spacing="large">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-[var(--grid-gap)]">
            <p
              className="type-label text-foreground-muted lg:col-span-2"
              data-studio-reveal
            >
              Philosophy
            </p>

            <div className="lg:col-span-7 lg:col-start-5" data-studio-reveal>
              {philosophyText.map((paragraph, index) =>
                index === 0 ? (
                  <p className="type-statement text-foreground" key={paragraph}>
                    {paragraph}
                  </p>
                ) : (
                  <p
                    className="mt-8 max-w-[620px] text-pretty text-[length:var(--font-size-body-large)] leading-[var(--line-height-body-large)] text-foreground-secondary lg:mt-10"
                    key={paragraph}
                  >
                    {paragraph}
                  </p>
                ),
              )}
            </div>
          </div>
        </Container>
      </Section>

      <Section className="bg-background-secondary pb-0" spacing="large">
        <Container>
          <div className="grid gap-10 border-t border-border pt-6 lg:grid-cols-12 lg:gap-[var(--grid-gap)]">
            <p
              className="type-label text-foreground-muted lg:col-span-2"
              data-studio-reveal
            >
              The Process
            </p>

            <p
              className="max-w-[720px] type-statement text-foreground lg:col-span-8 lg:col-start-4"
              data-studio-reveal
            >
              Six layers, from first trace to atmosphere. How every project is drawn into being.
            </p>
          </div>
        </Container>
      </Section>

      <SignatureExperienceSection />

      <Section className="bg-background" spacing="large">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-[var(--grid-gap)]">
            <p
              className="type-label text-foreground-muted lg:col-span-2"
              data-studio-reveal
            >
              Principles
            </p>

            <ul className="space-y-5 lg:col-span-8 lg:col-start-4" data-studio-reveal>
              {principles.map((principle, index) => (
                <li
                  className="grid grid-cols-[3ch_1fr] gap-5 border-t border-border pt-5 text-[length:var(--font-size-body-large)] leading-[var(--line-height-body-large)] text-foreground"
                  key={principle}
                >
                  <span className="type-label text-foreground-muted">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span>{principle}</span>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      <Section className="bg-background" spacing="large">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-[var(--grid-gap)]">
            <p
              className="type-label text-foreground-muted lg:col-span-2"
              data-studio-reveal
            >
              Information
            </p>

            <dl className="grid gap-8 md:grid-cols-3 lg:col-span-9 lg:col-start-4 lg:gap-[var(--grid-gap)]">
              {studioInfo.map((item) => (
                <div className="border-t border-border pt-5" data-studio-reveal key={item.label}>
                  <dt className="type-label text-foreground-muted">
                    {item.label}
                  </dt>
                  <dd className="mt-5 text-pretty text-[length:var(--font-size-body)] leading-[var(--line-height-body)] text-foreground-secondary">
                    {item.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </Container>
      </Section>

      <Section className="bg-background-secondary" spacing="large">
        <Container>
          <div
            className="grid gap-8 border-t border-border pt-6 lg:grid-cols-12 lg:gap-[var(--grid-gap)]"
            data-studio-reveal
          >
            <p className="type-label text-foreground-muted lg:col-span-3">
              Contact
            </p>

            <div className="lg:col-span-7 lg:col-start-5">
              <h2 className="type-section-heading text-foreground">
                Begin with a place, a question, or a quiet ambition for how a space should feel.
              </h2>

              <Link
                className="group mt-10 inline-flex text-[length:var(--font-size-ui)] uppercase leading-[var(--line-height-ui)] tracking-[var(--letter-spacing-ui)] text-foreground transition-opacity duration-base ease-architectural-out hover:opacity-65 focus-visible:text-accent"
                href="mailto:studio@arkhitecture.com?subject=Studio%20Inquiry"
              >
                <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:100%_1px] bg-left-bottom bg-no-repeat pb-1 transition-[background-size] duration-base ease-architectural-out group-hover:bg-[length:0%_1px] group-focus-visible:bg-[length:0%_1px]">
                  Start a conversation
                </span>
              </Link>
            </div>
          </div>
        </Container>
      </Section>
    </StudioPageMotion>
  );
}

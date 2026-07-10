import Image from "next/image";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { HomeHeroMotion } from "@/features/home/HomeHeroMotion";

const heroImage = {
  alt: "Warm minimal architectural interior opening to a calm courtyard with stone, plaster, wood, and soft morning light.",
  src: "/images/home-hero-placeholder.png",
};

export function HomeHero() {
  return (
    <Section className="overflow-hidden py-0" spacing="none">
      <HomeHeroMotion className="relative min-h-[88svh] sm:min-h-svh">
        <div className="absolute inset-0" data-home-hero-image-frame>
          <Image
            alt={heroImage.alt}
            className="h-full w-full object-cover"
            data-home-hero-image
            fill
            priority
            quality={92}
            sizes="100vw"
            src={heroImage.src}
          />
        </div>

        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(244_241_235_/_0.34)_0%,rgb(244_241_235_/_0.12)_46%,rgb(31_29_26_/_0.1)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgb(244_241_235_/_0.58)_0%,rgb(244_241_235_/_0.22)_40%,rgb(244_241_235_/_0.02)_100%)]" />

        <Container
          as="div"
          className="relative z-base flex min-h-[88svh] items-end pb-[clamp(var(--space-16),10vw,var(--space-30))] pt-[var(--space-30)] sm:min-h-svh"
        >
          <div className="grid w-full gap-10 lg:grid-cols-12 lg:gap-[var(--grid-gap)]">
            <div className="max-w-[760px] lg:col-span-6 lg:col-start-2">
              <p
                className="mb-5 text-[length:var(--font-size-label)] uppercase leading-[var(--line-height-ui)] tracking-[var(--letter-spacing-label)] text-foreground-muted"
                data-home-hero-label
              >
                Architecture / Interiors / Atmosphere
              </p>

              <h1
                className="font-display font-normal text-[length:clamp(2.65rem,6.4vw,7rem)] leading-[0.99] tracking-[var(--letter-spacing-heading)] text-balance text-foreground"
                data-home-hero-heading
              >
                Architecture shaped by light, material, and restraint.
              </h1>

              <p
                className="mt-6 max-w-[520px] text-pretty text-[length:var(--font-size-body)] leading-[var(--line-height-body)] text-foreground-secondary"
                data-home-hero-supporting
              >
                A cinematic portfolio for spaces that feel calm, precise, and quietly enduring.
              </p>
            </div>

            <div
              className="flex items-end justify-between gap-4 border-t border-border/45 pt-3 text-[length:var(--font-size-label)] uppercase leading-[var(--line-height-ui)] tracking-[var(--letter-spacing-label)] text-foreground-muted/65 lg:col-span-2 lg:col-start-11 lg:block lg:border-t-0 lg:pt-0 lg:text-right"
              data-home-hero-indicator
            >
              <span>Scroll</span>
              <span className="h-px w-8 bg-current opacity-60 lg:ml-auto lg:mt-3 lg:block" aria-hidden="true" />
            </div>
          </div>
        </Container>
      </HomeHeroMotion>
    </Section>
  );
}

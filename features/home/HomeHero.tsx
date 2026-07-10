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
    <Section className="overflow-hidden py-0" data-hero-theme="dark" spacing="none">
      <HomeHeroMotion className="relative min-h-[88svh] sm:min-h-svh">
        <div className="absolute inset-0" data-home-hero-image-frame>
          <Image
            alt={heroImage.alt}
            className="image-editorial image-editorial-hero h-full w-full object-cover object-[56%_center] sm:object-center"
            data-home-hero-image
            fill
            priority
            quality={92}
            sizes="100vw"
            src={heroImage.src}
          />
        </div>

        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(26_24_21_/_0)_46%,rgb(26_24_21_/_0.44)_100%)]" />

        <Container
          as="div"
          className="relative z-base flex min-h-[88svh] items-end pb-[clamp(var(--space-24),10vw,var(--space-30))] pt-[calc(var(--space-30)+var(--space-8))] sm:min-h-svh"
        >
          <div className="grid w-full gap-12 lg:grid-cols-12 lg:gap-[var(--grid-gap)]">
            <div className="max-w-[640px] lg:col-span-6 lg:col-start-1">
              <p
                className="mb-7 type-label text-[#f4f1eb]/78"
                data-home-hero-label
              >
                Architecture Studio
              </p>

              <h1
                className="type-hero text-[#f4f1eb]"
                data-home-hero-heading
              >
                Architecture shaped by light, material, and restraint.
              </h1>

              <p
                className="mt-8 max-w-[360px] text-pretty type-body text-[#f4f1eb]/78"
                data-home-hero-supporting
              >
                A cinematic portfolio for spaces that feel calm, precise, and quietly enduring.
              </p>
            </div>
          </div>
        </Container>

        <div
          className="absolute inset-x-0 bottom-0 z-base border-t border-[#f4f1eb]/28"
          data-home-hero-indicator
        >
          <Container
            as="div"
            className="grid min-h-14 items-center gap-4 py-4 type-label text-[#f4f1eb]/72 sm:grid-cols-12 sm:gap-[var(--grid-gap)]"
          >
            <p className="sm:col-span-4">Arkhitecture &mdash; Architecture Studio</p>
            <p className="hidden sm:col-span-4 sm:block">
              Tashkent, UZ 41.3&deg;N 69.2&deg;E
            </p>
            <div className="hidden justify-end sm:col-span-4 sm:flex" aria-hidden="true">
              <span className="h-6 w-px bg-current opacity-55" />
            </div>
          </Container>
        </div>
      </HomeHeroMotion>
    </Section>
  );
}

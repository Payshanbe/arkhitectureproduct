import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { HomeHeroMotion } from "@/features/home/HomeHeroMotion";
import { ArchitecturalStudyLazy } from "@/features/three";
import { BRAND_NAME } from "@/lib/brand";
import type { HomePageContent } from "@/lib/cms/siteContent";

interface HomeHeroProps {
  content?: HomePageContent["hero"];
  siteName?: string;
}

export function HomeHero({ content, siteName = BRAND_NAME }: HomeHeroProps) {
  return (
    <Section className="overflow-hidden bg-background py-0" spacing="none">
      <HomeHeroMotion className="relative min-h-[88svh] sm:min-h-svh">
        {/*
          The study model is the hero visual. The frame keeps the existing
          clip-path entrance from HomeHeroMotion; the canvas carries its own
          idle rotation, scroll rotation, and pointer drift.
        */}
        <div className="absolute inset-0" data-home-hero-image-frame>
          <ArchitecturalStudyLazy variant="hero" />
        </div>

        <Container
          as="div"
          className="relative z-base flex min-h-[88svh] items-end pb-[clamp(var(--space-24),10vw,var(--space-30))] pt-[calc(var(--space-30)+var(--space-8))] sm:min-h-svh"
        >
          <div className="grid w-full gap-12 lg:grid-cols-12 lg:gap-[var(--grid-gap)]">
            <div className="max-w-[640px] lg:col-span-6 lg:col-start-1">
              <p className="mb-7 type-label text-foreground-muted" data-home-hero-label>
                {content?.label ?? "Architecture Studio"}
              </p>

              <div className="overflow-hidden">
                <h1 className="type-hero text-foreground" data-home-hero-heading>
                  {content?.statement ?? "Architecture shaped by light, material, and restraint."}
                </h1>
              </div>

              <div className="mt-8 max-w-[360px] overflow-hidden">
                <p
                  className="text-pretty type-body text-foreground-secondary"
                  data-home-hero-supporting
                >
                  {content?.supportingText ??
                    "A cinematic portfolio for spaces that feel calm, precise, and quietly enduring."}
                </p>
              </div>
            </div>
          </div>
        </Container>

        <div
          className="absolute inset-x-0 bottom-0 z-base border-t border-border"
          data-home-hero-indicator
        >
          <Container
            as="div"
            className="grid min-h-14 items-center gap-4 py-4 type-label text-foreground-muted sm:grid-cols-12 sm:gap-[var(--grid-gap)]"
          >
            <p className="sm:col-span-4">{siteName} &mdash; {content?.label ?? "Architecture Studio"}</p>
            <p className="hidden sm:col-span-4 sm:block">
              {content?.locationLine ?? "Tashkent, UZ 41.3°N 69.2°E"}
            </p>
            <div className="hidden justify-end sm:col-span-4 sm:flex" aria-hidden="true">
              <span className="h-6 w-px bg-current opacity-55" data-home-hero-scroll-cue />
            </div>
          </Container>
        </div>
      </HomeHeroMotion>
    </Section>
  );
}

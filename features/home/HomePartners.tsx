import Image from "next/image";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { getPartnerRailItems, type PartnerRailItem } from "@/lib/cms/partners";
import type { SiteLocale } from "@/lib/i18n/config";

const sectionCopy: Record<SiteLocale, { heading: string; label: string }> = {
  ru: {
    heading: "Совместная работа строится на внимании к материалу, деталям и исполнению.",
    label: "Партнёры",
  },
  tj: {
    heading: "Ҳамкорӣ бар таваҷҷуҳ ба мавод, ҷузъиёт ва иҷро асос меёбад.",
    label: "Ҳамкорон",
  },
};

function PartnerLogo({
  duplicate = false,
  partner,
}: {
  duplicate?: boolean;
  partner: PartnerRailItem;
}) {
  const visual = (
    <span className="home-partners__logo-frame">
      <Image
        alt={duplicate ? "" : partner.logoAlt}
        className="home-partners__logo"
        fill
        sizes="(max-width: 767px) 144px, 180px"
        src={partner.logoSrc}
      />
      {!partner.logoAlt && !duplicate ? <span className="sr-only">{partner.name}</span> : null}
    </span>
  );

  return (
    <li className="home-partners__item">
      {partner.website && !duplicate ? (
        <a
          aria-label={partner.name}
          className="home-partners__link"
          href={partner.website}
          rel="noreferrer"
          target="_blank"
        >
          {visual}
        </a>
      ) : (
        visual
      )}
    </li>
  );
}

interface PartnerSetProps {
  duplicate?: boolean;
  partners: PartnerRailItem[];
}

function PartnerSet({ duplicate = false, partners }: PartnerSetProps) {
  return (
    <ul aria-hidden={duplicate || undefined} className="home-partners__set">
      {partners.map((partner) => (
        <PartnerLogo
          duplicate={duplicate}
          key={duplicate ? `${partner.id}-duplicate` : partner.id}
          partner={partner}
        />
      ))}
    </ul>
  );
}

interface HomePartnersProps {
  locale: SiteLocale;
}

export async function HomePartners({ locale }: HomePartnersProps) {
  const partners = await getPartnerRailItems();
  const copy = sectionCopy[locale];

  return (
    <Section
      aria-labelledby="home-partners-heading"
      className="home-partners border-y border-border/60 bg-background"
      spacing="medium"
    >
      <Container>
        <div className="grid gap-7 lg:grid-cols-12 lg:gap-[var(--grid-gap)]">
          <div className="flex items-center gap-8 lg:col-span-3">
            <p className="type-label text-foreground-muted">{copy.label}</p>
            <span aria-hidden="true" className="hidden h-px flex-1 bg-border lg:block" />
          </div>
          <h2
            className="max-w-[560px] type-section-heading text-foreground lg:col-span-6 lg:col-start-5"
            id="home-partners-heading"
          >
            {copy.heading}
          </h2>
        </div>
      </Container>

      <div className="home-partners__viewport" data-partner-count={partners.length}>
        <div className="home-partners__track">
          <PartnerSet partners={partners} />
          <PartnerSet duplicate partners={partners} />
        </div>
      </div>
    </Section>
  );
}

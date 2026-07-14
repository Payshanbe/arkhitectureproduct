import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { EditorialStatement } from "@/components/typography/EditorialStatement";
import { HomeContactExperienceMotion } from "@/features/home/HomeContactExperienceMotion";
import type { ContactDetails, HomePageContent } from "@/lib/cms/siteContent";

const fallbackContact: ContactDetails = {
  address: "Tashkent, Uzbekistan",
  city: "Tashkent",
  country: "Uzbekistan",
  email: "studio@arkhitecture.com",
  phone: "+1 555 123 4567",
  socialLinks: [],
};

function getStudioInfo(contact: ContactDetails) {
  return [
  {
    label: "Email",
    value: contact.email,
  },
  {
    label: "Phone",
    value: contact.phone,
  },
  {
    label: "Location",
    value: contact.address,
  },
];
}

interface HomeContactExperienceProps {
  contact?: ContactDetails;
  content?: HomePageContent["contact"];
}

export function HomeContactExperience({
  contact = fallbackContact,
  content,
}: HomeContactExperienceProps) {
  const studioInfo = getStudioInfo(contact);

  return (
    <Section className="bg-background" spacing="large">
      <HomeContactExperienceMotion>
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-[var(--grid-gap)]">
            <div className="flex items-center gap-8 lg:col-span-3" data-contact-experience-reveal>
              <p className="type-label text-foreground-muted">
                {content?.label ?? "Let's Connect"}
              </p>
              <span className="hidden h-px flex-1 bg-border lg:block" aria-hidden="true" />
            </div>

            <div className="lg:col-span-6 lg:col-start-5">
              <EditorialStatement
                as="h2"
                className="max-w-[560px]"
                data-contact-experience-reveal
              >
                {content?.statement ??
                  "Begin with a conversation about place, atmosphere, and what should endure."}
              </EditorialStatement>

              <p
                className="mt-7 max-w-[420px] text-pretty type-body text-foreground-secondary"
                data-contact-experience-reveal
              >
                {content?.body ??
                  "For residences, interiors, and architectural collaborations, send a brief note and we will reply with a considered next step."}
              </p>

              <div className="mt-[clamp(var(--space-12),5vw,var(--space-16))]" data-contact-experience-reveal>
                <a
                  className="plate-link inline-flex font-display text-[length:clamp(1.25rem,2.2vw,2rem)] leading-[1.2] tracking-[-0.015em] text-foreground [overflow-wrap:anywhere]"
                  href={`mailto:${contact.email}?subject=Project%20Inquiry`}
                >
                  <span className="plate-link-underline">{contact.email}</span>
                </a>

                <p className="mt-5 type-label text-foreground-muted">
                  {studioInfo
                    .filter((item) => item.label !== "Email")
                    .map((item) => item.value)
                    .join(" · ")}
                </p>
              </div>
            </div>
          </div>
        </Container>
      </HomeContactExperienceMotion>
    </Section>
  );
}

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { EditorialStatement } from "@/components/typography/EditorialStatement";
import { ContactPageMotion } from "@/features/contact/ContactPageMotion";

const studioInfo = [
  {
    label: "Email",
    value: "studio@arkhitecture.com",
  },
  {
    label: "City",
    value: "Skopje",
  },
  {
    label: "Country",
    value: "North Macedonia",
  },
];

const fieldClass =
  "w-full border-0 border-b border-border bg-transparent px-0 pb-4 pt-2 text-[length:var(--font-size-body)] leading-[var(--line-height-body)] text-foreground transition-colors duration-base ease-architectural-out placeholder:text-foreground-muted/70 focus:border-accent focus:outline-none";

const labelClass = "type-label text-foreground-muted";

function TextField({
  autoComplete,
  label,
  name,
  type = "text",
}: {
  autoComplete?: string;
  label: string;
  name: string;
  type?: string;
}) {
  return (
    <label className="block">
      <span className={labelClass}>{label}</span>
      <input
        autoComplete={autoComplete}
        className={fieldClass}
        name={name}
        placeholder={label}
        type={type}
      />
    </label>
  );
}

export function ContactPage() {
  return (
    <ContactPageMotion>
      <Section
        className="bg-background pt-[calc(var(--section-spacing-large)+var(--space-20))]"
        spacing="large"
      >
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-[var(--grid-gap)]">
            <p
              className="type-label text-foreground-muted lg:col-span-2"
              data-contact-reveal
            >
              Contact
            </p>

            <EditorialStatement
              as="h1"
              className="type-display lg:col-span-9 lg:col-start-4"
              data-contact-reveal
            >
              Begin with a conversation about place, atmosphere, and how a space should feel.
            </EditorialStatement>
          </div>
        </Container>
      </Section>

      <Section className="bg-background-secondary" spacing="large">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-[var(--grid-gap)]">
            <div className="lg:col-span-3" data-contact-reveal>
              <p className="type-label text-foreground-muted">
                Inquiry
              </p>
              <p className="mt-6 max-w-[320px] text-pretty text-[length:var(--font-size-body)] leading-[var(--line-height-body)] text-foreground-secondary">
                Write a short note about the place, the ambition, and the atmosphere you have in
                mind. We reply within a few working days.
              </p>
            </div>

            <div className="lg:col-span-7 lg:col-start-5">
              <a
                className="plate-link inline-flex font-display text-[length:clamp(1.25rem,2.2vw,2rem)] leading-[1.2] tracking-[-0.015em] text-foreground [overflow-wrap:anywhere]"
                data-contact-reveal
                href={`mailto:${studioInfo[0].value}?subject=Project%20Inquiry`}
              >
                <span className="plate-link-underline">{studioInfo[0].value}</span>
              </a>

              <form
                aria-label="Project inquiry"
                aria-describedby="contact-form-note"
                className="mt-[clamp(var(--space-12),5vw,var(--space-16))] grid max-w-[var(--text-width)] gap-9"
                data-contact-reveal
              >
                <TextField autoComplete="name" label="Name" name="name" />
                <TextField autoComplete="email" label="Email" name="email" type="email" />

                <label className="block">
                  <span className={labelClass}>Message</span>
                  <textarea
                    className={`${fieldClass} min-h-40 resize-y`}
                    name="message"
                    placeholder="The place, the ambition, the constraints."
                  />
                </label>

                <div>
                  <button
                    aria-disabled="true"
                    aria-describedby="contact-form-note"
                    className="plate-link inline-flex type-label text-foreground"
                    type="button"
                  >
                    <span className="plate-link-underline">Send inquiry &rarr;</span>
                  </button>
                  <p className="sr-only" id="contact-form-note">
                    This inquiry form is prepared for future submission handling and is currently
                    informational only.
                  </p>
                </div>
              </form>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="bg-background" spacing="large">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-[var(--grid-gap)]">
            <p
              className="type-label text-foreground-muted lg:col-span-2"
              data-contact-reveal
            >
              Studio Information
            </p>

            <dl className="grid gap-8 md:grid-cols-3 lg:col-span-9 lg:col-start-4 lg:gap-[var(--grid-gap)]">
              {studioInfo.map((item) => (
                <div className="border-t border-border pt-5" data-contact-reveal key={item.label}>
                  <dt className={labelClass}>{item.label}</dt>
                  <dd className="mt-5 text-pretty text-[length:var(--font-size-body)] leading-[var(--line-height-body)] text-foreground-secondary">
                    {item.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </Container>
      </Section>

      <Section className="bg-background" spacing="large">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-[var(--grid-gap)]">
            <p
              className="type-label text-foreground-muted lg:col-span-2"
              data-contact-reveal
            >
              Collaboration
            </p>

            <p
              className="max-w-[760px] text-pretty type-statement text-foreground lg:col-span-8 lg:col-start-4"
              data-contact-reveal
            >
              We work with private clients, developers, makers, and cultural collaborators who value
              restraint, clarity, and spaces that gather meaning slowly.
            </p>
          </div>
        </Container>
      </Section>

      <Section className="bg-background-secondary" spacing="large">
        <Container>
          <div
            className="grid gap-8 border-t border-border pt-6 lg:grid-cols-12 lg:gap-[var(--grid-gap)]"
            data-contact-reveal
          >
            <p className="type-label text-foreground-muted lg:col-span-3">
              Closing
            </p>

            <p className="type-section-heading text-foreground lg:col-span-8 lg:col-start-5">
              The first conversation is simply a way to understand what should be protected,
              clarified, and made possible.
            </p>
          </div>
        </Container>
      </Section>
    </ContactPageMotion>
  );
}

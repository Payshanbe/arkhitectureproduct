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

const projectTypes = [
  "Residential",
  "Interior",
  "Hospitality",
  "Architecture",
  "Spatial Strategy",
];

const budgetRanges = [
  "To be discussed",
  "Under 100k",
  "100k-250k",
  "250k-500k",
  "500k+",
];

const timelines = ["Exploratory", "0-3 months", "3-6 months", "6-12 months", "12+ months"];

const fieldClass =
  "w-full border-0 border-b border-border bg-transparent px-0 pb-4 pt-2 text-[length:var(--font-size-body)] leading-[var(--line-height-body)] text-foreground transition-colors duration-base ease-architectural-out placeholder:text-foreground-muted/70 focus:border-accent focus:outline-none";

const labelClass =
  "text-[length:var(--font-size-label)] uppercase leading-[var(--line-height-ui)] tracking-[var(--letter-spacing-label)] text-foreground-muted";

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

function SelectField({ label, name, options }: { label: string; name: string; options: string[] }) {
  return (
    <label className="block">
      <span className={labelClass}>{label}</span>
      <select className={fieldClass} defaultValue="" name={name}>
        <option disabled value="">
          Select
        </option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
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
              className="text-[length:var(--font-size-label)] uppercase leading-[var(--line-height-ui)] tracking-[var(--letter-spacing-label)] text-foreground-muted lg:col-span-2"
              data-contact-reveal
            >
              Contact
            </p>

            <EditorialStatement
              as="h1"
              className="text-[length:clamp(3rem,7vw,8rem)] lg:col-span-9 lg:col-start-4"
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
              <p className="text-[length:var(--font-size-label)] uppercase leading-[var(--line-height-ui)] tracking-[var(--letter-spacing-label)] text-foreground-muted">
                Inquiry
              </p>
              <p className="mt-6 max-w-[320px] text-pretty text-[length:var(--font-size-body)] leading-[var(--line-height-body)] text-foreground-secondary">
                Share the first outline of a project. The form is prepared for future submission
                handling and remains UI-only for Version 1.0.
              </p>
            </div>

            <form
              aria-label="Project inquiry"
              aria-describedby="contact-form-note"
              className="grid gap-8 lg:col-span-8 lg:col-start-5 lg:grid-cols-2 lg:gap-x-[var(--grid-gap)] lg:gap-y-10"
              data-contact-reveal
            >
              <TextField autoComplete="name" label="Name" name="name" />
              <TextField autoComplete="email" label="Email" name="email" type="email" />
              <SelectField label="Project Type" name="projectType" options={projectTypes} />
              <SelectField label="Estimated Budget" name="estimatedBudget" options={budgetRanges} />
              <SelectField label="Timeline" name="timeline" options={timelines} />

              <label className="block lg:col-span-2">
                <span className={labelClass}>Message</span>
                <textarea
                  className={`${fieldClass} min-h-40 resize-y`}
                  name="message"
                  placeholder="Tell us about the place, ambition, constraints, or atmosphere."
                />
              </label>

              <div className="lg:col-span-2">
                <button
                  aria-disabled="true"
                  aria-describedby="contact-form-note"
                  className="group inline-flex text-[length:var(--font-size-ui)] uppercase leading-[var(--line-height-ui)] tracking-[var(--letter-spacing-ui)] text-foreground transition-colors duration-base ease-architectural-out hover:text-accent focus-visible:text-accent"
                  type="button"
                >
                  <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:100%_1px] bg-left-bottom bg-no-repeat pb-1 transition-[background-size] duration-base ease-architectural-out group-hover:bg-[length:0%_1px] group-focus-visible:bg-[length:0%_1px]">
                    Send inquiry
                  </span>
                </button>
                <p className="sr-only" id="contact-form-note">
                  This inquiry form is prepared for future submission handling and is currently
                  informational only.
                </p>
              </div>
            </form>
          </div>
        </Container>
      </Section>

      <Section className="bg-background" spacing="large">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-[var(--grid-gap)]">
            <p
              className="text-[length:var(--font-size-label)] uppercase leading-[var(--line-height-ui)] tracking-[var(--letter-spacing-label)] text-foreground-muted lg:col-span-2"
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

      <Section className="bg-background-secondary" spacing="large">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-[var(--grid-gap)]">
            <p
              className="text-[length:var(--font-size-label)] uppercase leading-[var(--line-height-ui)] tracking-[var(--letter-spacing-label)] text-foreground-muted lg:col-span-2"
              data-contact-reveal
            >
              Collaboration
            </p>

            <p
              className="max-w-[760px] text-pretty font-display text-[length:clamp(2.25rem,5vw,5.75rem)] leading-[1.04] text-foreground lg:col-span-8 lg:col-start-4"
              data-contact-reveal
            >
              We work with private clients, developers, makers, and cultural collaborators who value
              restraint, clarity, and spaces that gather meaning slowly.
            </p>
          </div>
        </Container>
      </Section>

      <Section className="bg-background" spacing="large">
        <Container>
          <div
            className="grid gap-8 border-t border-border pt-6 lg:grid-cols-12 lg:gap-[var(--grid-gap)]"
            data-contact-reveal
          >
            <p className="text-[length:var(--font-size-label)] uppercase leading-[var(--line-height-ui)] tracking-[var(--letter-spacing-label)] text-foreground-muted lg:col-span-3">
              Closing
            </p>

            <p className="font-display text-[length:clamp(2.75rem,6vw,7rem)] leading-[0.98] tracking-[var(--letter-spacing-heading)] text-balance text-foreground lg:col-span-8 lg:col-start-5">
              The first conversation is simply a way to understand what should be protected,
              clarified, and made possible.
            </p>
          </div>
        </Container>
      </Section>
    </ContactPageMotion>
  );
}

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { EditorialStatement } from "@/components/typography/EditorialStatement";
import { submitContactInquiry } from "@/features/contact/actions";
import { ContactPageMotion } from "@/features/contact/ContactPageMotion";
import type {
  ContactDetails,
  ContactFormSettingsContent,
  ContactPageContent,
} from "@/lib/cms/siteContent";
import type { SiteLocale } from "@/lib/i18n/config";

const fallbackContact: ContactDetails = {
  address: "Tashkent, Uzbekistan",
  city: "Tashkent",
  country: "Uzbekistan",
  email: "studio@arkhitecture.com",
  phone: "+1 555 123 4567",
  socialLinks: [],
};

const fallbackFormSettings: ContactFormSettingsContent = {
  labels: {
    city: "City",
    company: "Company",
    country: "Country",
    email: "Email",
    estimatedBudget: "Estimated Budget",
    message: "Message",
    name: "Name",
    projectType: "Project Type",
    studioInformation: "Studio Information",
    submit: "Send inquiry ->",
    timeline: "Timeline",
  },
  messages: {
    defaultNote: "Your inquiry will be saved securely in the studio CMS for review.",
    emailError: "Please enter a valid email address.",
    requiredError: "Please complete your name, email, and message.",
    success: "Thank you. Your inquiry has been received.",
  },
  placeholders: {
    message: "The place, the ambition, the constraints.",
  },
};

function getStudioInfo(contact: ContactDetails, formSettings: ContactFormSettingsContent) {
  return [
    {
      label: formSettings.labels.email,
      value: contact.email,
    },
    {
      label: formSettings.labels.city,
      value: contact.city,
    },
    {
      label: formSettings.labels.country,
      value: contact.country,
    },
  ];
}

const fieldClass =
  "w-full border-0 border-b border-border bg-transparent px-0 pb-4 pt-2 text-[length:var(--font-size-body)] leading-[var(--line-height-body)] text-foreground transition-colors duration-base ease-architectural-out placeholder:text-foreground-muted/70 focus:border-accent focus:outline-none";

const labelClass = "type-label text-foreground-muted";

function TextField({
  autoComplete,
  label,
  name,
  required = false,
  type = "text",
}: {
  autoComplete?: string;
  label: string;
  name: string;
  required?: boolean;
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
        required={required}
        type={type}
      />
    </label>
  );
}

interface ContactPageProps {
  contact?: ContactDetails;
  content?: ContactPageContent;
  formSettings?: ContactFormSettingsContent;
  locale: SiteLocale;
  submissionStatus?: "email" | "required" | "sent";
}

export function ContactPage({
  contact = fallbackContact,
  content,
  formSettings = fallbackFormSettings,
  locale,
  submissionStatus,
}: ContactPageProps) {
  const studioInfo = getStudioInfo(contact, formSettings);
  const statusMessage =
    submissionStatus === "sent"
      ? formSettings.messages.success
      : submissionStatus === "email"
        ? formSettings.messages.emailError
        : submissionStatus === "required"
          ? formSettings.messages.requiredError
          : null;

  return (
    <ContactPageMotion>
      <Section
        className="bg-background pt-[calc(var(--section-spacing-large)+var(--space-20))]"
        spacing="large"
      >
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-[var(--grid-gap)]">
            <p className="type-label text-foreground-muted lg:col-span-2" data-contact-reveal>
              {content?.hero.label ?? "Contact"}
            </p>

            <EditorialStatement
              as="h1"
              className="type-display lg:col-span-9 lg:col-start-4"
              data-contact-reveal
            >
              {content?.hero.statement ??
                "Begin with a conversation about place, atmosphere, and how a space should feel."}
            </EditorialStatement>
          </div>
        </Container>
      </Section>

      <Section className="bg-background-secondary" spacing="large">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-[var(--grid-gap)]">
            <div className="lg:col-span-3" data-contact-reveal>
              <p className="type-label text-foreground-muted">
                {content?.inquiry.label ?? "Inquiry"}
              </p>
              <p className="mt-6 max-w-[320px] text-pretty text-[length:var(--font-size-body)] leading-[var(--line-height-body)] text-foreground-secondary">
                {content?.inquiry.body ??
                  "Write a short note about the place, the ambition, and the atmosphere you have in mind. We reply within a few working days."}
              </p>
            </div>

            <div className="lg:col-span-7 lg:col-start-5">
              <a
                className="plate-link inline-flex font-display text-[length:clamp(1.25rem,2.2vw,2rem)] leading-[1.2] tracking-[-0.015em] text-foreground [overflow-wrap:anywhere]"
                data-contact-reveal
                href={`mailto:${contact.email}?subject=Project%20Inquiry`}
              >
                <span className="plate-link-underline">{contact.email}</span>
              </a>

              <form
                action={submitContactInquiry}
                aria-label="Project inquiry"
                aria-describedby="contact-form-note"
                className="mt-[clamp(var(--space-12),5vw,var(--space-16))] grid max-w-[var(--text-width)] gap-9"
                data-contact-reveal
                id="contact-form"
              >
                <input name="locale" type="hidden" value={locale} />
                <div className="hidden" aria-hidden="true">
                  <label>
                    {formSettings.labels.company}
                    <input autoComplete="off" name="company" tabIndex={-1} type="text" />
                  </label>
                </div>

                <TextField
                  autoComplete="name"
                  label={formSettings.labels.name}
                  name="name"
                  required
                />
                <TextField
                  autoComplete="email"
                  label={formSettings.labels.email}
                  name="email"
                  required
                  type="email"
                />
                <TextField label={formSettings.labels.projectType} name="projectType" />
                <TextField label={formSettings.labels.estimatedBudget} name="estimatedBudget" />
                <TextField label={formSettings.labels.timeline} name="timeline" />

                <label className="block">
                  <span className={labelClass}>{formSettings.labels.message}</span>
                  <textarea
                    className={`${fieldClass} min-h-40 resize-y`}
                    name="message"
                    placeholder={formSettings.placeholders.message}
                    required
                  />
                </label>

                <div>
                  <button
                    aria-describedby="contact-form-note"
                    className="plate-link inline-flex type-label text-foreground"
                    type="submit"
                  >
                    <span className="plate-link-underline">{formSettings.labels.submit}</span>
                  </button>
                  <p
                    className="mt-5 text-[length:var(--font-size-body-small)] leading-[var(--line-height-body)] text-foreground-secondary"
                    id="contact-form-note"
                  >
                    {statusMessage ?? formSettings.messages.defaultNote}
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
            <p className="type-label text-foreground-muted lg:col-span-2" data-contact-reveal>
              {formSettings.labels.studioInformation}
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
            <p className="type-label text-foreground-muted lg:col-span-2" data-contact-reveal>
              {content?.collaboration.label ?? "Collaboration"}
            </p>

            <p
              className="max-w-[760px] text-pretty type-statement text-foreground lg:col-span-8 lg:col-start-4"
              data-contact-reveal
            >
              {content?.collaboration.statement ??
                "We work with private clients, developers, makers, and cultural collaborators who value restraint, clarity, and spaces that gather meaning slowly."}
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
              {content?.closing.label ?? "Closing"}
            </p>

            <p className="type-section-heading text-foreground lg:col-span-8 lg:col-start-5">
              {content?.closing.statement ??
                "The first conversation is simply a way to understand what should be protected, clarified, and made possible."}
            </p>
          </div>
        </Container>
      </Section>
    </ContactPageMotion>
  );
}

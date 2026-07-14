import { homeContent } from "@/content/home";

import { CallToAction } from "@/components/shared/CallToAction";
import { Container } from "@/components/shared/Container";
import { Section } from "@/components/shared/Section";
import { SectionHeader } from "@/components/shared/SectionHeader";

import { contactSectionVariants } from "./ContactSection.variants";

export function ContactSection() {
  return (
    <Section
      id="contact"
      variant="surface"
      className={contactSectionVariants.section}
    >
      <Container size="medium">
        <div className={contactSectionVariants.content}>
          <SectionHeader
            id="contact-heading"
            eyebrow={homeContent.contact.eyebrow}
            title={homeContent.contact.heading}
            description={homeContent.contact.description}
          />

          <CallToAction
            href={homeContent.contact.action.href}
            label={homeContent.contact.action.label}
          />

          <p className={contactSectionVariants.note}>
            {homeContent.contact.note}
          </p>
        </div>
      </Container>
    </Section>
  );
}
import { homeContent } from "@/content/home";

import { Reveal } from "@/components/state/Reveal";
import { ContactForm } from "@/components/contact/ContactForm";
import { Container } from "@/components/shared/Container";
import { Section } from "@/components/shared/Section";
import { SectionHeader } from "@/components/shared/SectionHeader";

import { contactSectionVariants } from "./ContactSection.variants";

export function ContactSection() {
  return (
    <Section
      id="contact"
      variant="surface"
    >
      <Container size="medium">
        <Reveal>
          <div className={contactSectionVariants.content}>
            <SectionHeader
              eyebrow={homeContent.contact.eyebrow}
              title={homeContent.contact.heading}
              description={homeContent.contact.description}
            />

            <ContactForm />

            <p className={contactSectionVariants.note}>
              {homeContent.contact.note}
            </p>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
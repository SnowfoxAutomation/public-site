import { homeContent } from "@/content/home";

import { CallToAction } from "@/components/shared/CallToAction";
import { Container } from "@/components/shared/Container";
import { Section } from "@/components/shared/Section";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { Reveal } from "@/components/state/Reveal";

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
              description={
                homeContent.contact.description
              }
            />

            <p className={contactSectionVariants.body}>
              Whether you are exploring new
              automation opportunities, modernizing
              existing intelligence workflows or
              looking for tailored AI capabilities,
              we would be pleased to discuss how
              Snowfox can help.
            </p>

            <CallToAction
              href="/contact"
              label="Contact Snowfox"
            />
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
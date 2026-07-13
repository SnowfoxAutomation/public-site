import { Container } from "@/components/shared/Container";
import { Section } from "@/components/shared/Section";

import { heroVariants } from "./Hero.variants";

export function Hero() {
  return (
    <Section
      className={heroVariants.section}
      variant="transparent"
    >
      <Container>
        <div className={heroVariants.content}>
          <p className={heroVariants.eyebrow}>
            Canadian Developed AI
          </p>

          <h1 className={heroVariants.title}>
            Secure automation for defence,
            intelligence and mission-critical
            decision making.
          </h1>

          <p className={heroVariants.description}>
            Snowfox builds tailored AI-powered tools that
            transform large volumes of information into
            practical intelligence while respecting Canadian
            laws, policies and operational requirements.
          </p>

          <div className={heroVariants.actions}>
            {/* Buttons added next milestone */}
          </div>
        </div>
      </Container>
    </Section>
  );
}
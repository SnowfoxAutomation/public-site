import { CallToAction } from "@/components/shared/CallToAction";
import { Container } from "@/components/shared/Container";
import { Section } from "@/components/shared/Section";

import { heroVariants } from "./Hero.variants";

export function Hero() {
  return (
    <Section
      variant="transparent"
      className={heroVariants.section}
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
            Snowfox develops tailored automation
            solutions that enable defence and
            intelligence professionals to spend
            more time on mission-critical work and
            less time navigating administrative
            complexity.
          </p>

          <div className={heroVariants.actions}>
            <CallToAction
              href="/contact"
              label="Contact Us"
            />

            <CallToAction
              href="/mission"
              label="Our Mission"
              variant="secondary"
            />
          </div>
        </div>
      </Container>
    </Section>
  );
}
import { homeContent } from "@/content/home";

import { CallToAction } from "@/components/shared/CallToAction";
import { Container } from "@/components/shared/Container";
import { Section } from "@/components/shared/Section";

import { Reveal } from "@/components/state/Reveal";

import { HeroBackground } from "./HeroBackground";
import { heroVariants } from "./Hero.variants";

export function Hero() {
  return (
    <Section
      aria-labelledby="hero-heading"
      className={heroVariants.section}
    >
      <HeroBackground />

      <Container>
        <Reveal>
          <div className={heroVariants.content}>
            <p className={heroVariants.eyebrow}>
              {homeContent.hero.eyebrow}
            </p>

            <h1
              id="hero-heading"
              className={heroVariants.title}
            >
              {homeContent.hero.heading}
            </h1>

            <p className={heroVariants.description}>
              {homeContent.hero.description}
            </p>

            <div className={heroVariants.actions}>
              <CallToAction
                href={homeContent.hero.primaryAction.href}
                label={homeContent.hero.primaryAction.label}
              />

              <CallToAction
                href={homeContent.hero.secondaryAction.href}
                label={homeContent.hero.secondaryAction.label}
                variant="secondary"
              />
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
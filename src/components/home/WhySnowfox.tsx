import { homeContent } from "@/content/home";

import { Container } from "@/components/shared/Container";
import { Section } from "@/components/shared/Section";

import { whySnowfoxVariants } from "./WhySnowfox.variants";

export function WhySnowfox() {
  return (
    <Section
      variant="transparent"
      className={whySnowfoxVariants.section}
    >
      <Container>
        <div className={whySnowfoxVariants.content}>
          <div>
            <h2 className={whySnowfoxVariants.heading}>
              {homeContent.whySnowfox.heading}
            </h2>

            <p className={whySnowfoxVariants.introduction}>
              {homeContent.whySnowfox.introduction}
            </p>
          </div>

          <div className={whySnowfoxVariants.grid}>
            {homeContent.whySnowfox.pillars.map((pillar) => (
              <article
                key={pillar.title}
                className={whySnowfoxVariants.card}
              >
                <h3 className={whySnowfoxVariants.cardHeading}>
                  {pillar.title}
                </h3>

                <p className={whySnowfoxVariants.cardBody}>
                  {pillar.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
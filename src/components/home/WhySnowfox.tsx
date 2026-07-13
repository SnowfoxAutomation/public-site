import { homeContent } from "@/content/home";

import { Container } from "@/components/shared/Container";
import { ContentCard } from "@/components/shared/ContentCard";
import { ContentGrid } from "@/components/shared/ContentGrid";
import { Section } from "@/components/shared/Section";
import { SectionHeader } from "@/components/shared/SectionHeader";

import { whySnowfoxVariants } from "./WhySnowfox.variants";

export function WhySnowfox() {
  return (
    <Section
      variant="transparent"
      className={whySnowfoxVariants.section}
    >
      <Container>
        <div className={whySnowfoxVariants.content}>
          <SectionHeader
            title={homeContent.whySnowfox.heading}
            description={homeContent.whySnowfox.introduction}
            className={whySnowfoxVariants.header}
          />

          <ContentGrid
            className={whySnowfoxVariants.grid}
          >
            {homeContent.whySnowfox.pillars.map((pillar) => (
              <ContentCard key={pillar.title}>
                <h3 className={whySnowfoxVariants.cardHeading}>
                  {pillar.title}
                </h3>

                <p className={whySnowfoxVariants.cardBody}>
                  {pillar.description}
                </p>
              </ContentCard>
            ))}
          </ContentGrid>
        </div>
      </Container>
    </Section>
  );
}
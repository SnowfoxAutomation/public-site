import { homeContent } from "@/content/home";

import { Reveal } from "@/components/state/Reveal";
import { Container } from "@/components/shared/Container";
import { ContentCard } from "@/components/shared/ContentCard";
import { ContentGrid } from "@/components/shared/ContentGrid";
import { Section } from "@/components/shared/Section";
import { SectionHeader } from "@/components/shared/SectionHeader";

import { aboutSectionVariants } from "./AboutSection.variants";

export function AboutSection() {
  return (
    <Section id="about" variant="emphasis">
      <Container>
        <Reveal>
          <div className={aboutSectionVariants.content}>
            <SectionHeader
              eyebrow={homeContent.about.eyebrow}
              title={homeContent.about.heading}
              description={homeContent.about.description}
            />

            <p className={aboutSectionVariants.introduction}>
              {homeContent.about.introduction}
            </p>

            <ContentGrid>
              {homeContent.about.values.map((value) => (
                <ContentCard key={value.title}>
                  <h3 className={aboutSectionVariants.cardTitle}>
                    {value.title}
                  </h3>

                  <p className={aboutSectionVariants.cardBody}>
                    {value.description}
                  </p>
                </ContentCard>
              ))}
            </ContentGrid>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
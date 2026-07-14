import { homeContent } from "@/content/home";

import { Reveal } from "@/components/state/Reveal";
import { Container } from "@/components/shared/Container";
import { ContentCard } from "@/components/shared/ContentCard";
import { ContentGrid } from "@/components/shared/ContentGrid";
import { Section } from "@/components/shared/Section";
import { SectionHeader } from "@/components/shared/SectionHeader";

import { missionSectionVariants } from "./MissionSection.variants";

export function MissionSection() {
  return (
    <Section
      id="mission"
      variant="surface"
      className={missionSectionVariants.section}
    >
      <Container>
        <Reveal>
          <div className={missionSectionVariants.content}>
            <SectionHeader
              eyebrow={homeContent.mission.eyebrow}
              title={homeContent.mission.heading}
              description={homeContent.mission.description}
            />

            <div className={missionSectionVariants.body}>
              {homeContent.mission.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <ContentGrid>
              {homeContent.mission.principles.map(
                (principle, index) => (
                  <Reveal
                    key={principle.title}
                    className={
                      missionSectionVariants.cardReveal[index]
                    }
                  >
                    <ContentCard>
                      <h3
                        className={
                          missionSectionVariants.cardTitle
                        }
                      >
                        {principle.title}
                      </h3>

                      <p
                        className={
                          missionSectionVariants.cardBody
                        }
                      >
                        {principle.description}
                      </p>
                    </ContentCard>
                  </Reveal>
                ),
              )}
            </ContentGrid>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
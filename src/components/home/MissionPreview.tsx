import { homeContent } from "@/content/home";

import { Container } from "@/components/shared/Container";
import { Section } from "@/components/shared/Section";
import { SectionHeader } from "@/components/shared/SectionHeader";

import { missionPreviewVariants } from "./MissionPreview.variants";

export function MissionPreview() {
  return (
    <Section
      variant="surface"
      className={missionPreviewVariants.section}
    >
      <Container>
        <SectionHeader
          title={homeContent.mission.heading}
          description={homeContent.mission.description}
          className={missionPreviewVariants.header}
        />
      </Container>
    </Section>
  );
}
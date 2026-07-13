import { Container } from "@/components/shared/Container";
import { Section } from "@/components/shared/Section";

import { missionPreviewVariants } from "./MissionPreview.variants";

export function MissionPreview() {
  return (
    <Section
      variant="surface"
      className={missionPreviewVariants.section}
    >
      <Container>
        <div className={missionPreviewVariants.content}>
          <h2 className={missionPreviewVariants.heading}>
            Mission
          </h2>

          <p className={missionPreviewVariants.body}>
            Snowfox develops tailored automation tools for
            the Canadian Defence sector using
            Canadian-developed machine learning models.
            Our solutions help organizations harness vast
            quantities of structured and unstructured
            information while embedding the constraints of
            Canadian legislation, policy and operational
            requirements directly into the workflow.
          </p>
        </div>
      </Container>
    </Section>
  );
}
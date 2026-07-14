import {
  Blocks,
  BrainCircuit,
  Database,
  GitBranch,
  Scale,
  Workflow,
} from "lucide-react";

import { homeContent } from "@/content/home";

import { Reveal } from "@/components/state/Reveal";
import { Container } from "@/components/shared/Container";
import { ContentCard } from "@/components/shared/ContentCard";
import { ContentGrid } from "@/components/shared/ContentGrid";
import { Section } from "@/components/shared/Section";
import { SectionHeader } from "@/components/shared/SectionHeader";

import { productsSectionVariants } from "./ProductsSection.variants";

const icons = {
  workflow: Workflow,
  data: Database,
  policy: Scale,
  integration: GitBranch,
  decision: BrainCircuit,
  tailored: Blocks,
} as const;

export function ProductsSection() {
  return (
    <Section id="products">
      <Container>
        <Reveal>
          <div className={productsSectionVariants.content}>
            <SectionHeader
              eyebrow={homeContent.products.eyebrow}
              title={homeContent.products.heading}
              description={homeContent.products.description}
            />

            <ContentGrid>
              {homeContent.products.capabilities.map(
                (capability, index) => {
                  const Icon =
                    icons[capability.icon];

                  return (
                    <Reveal
                      key={capability.title}
                      className={
                        productsSectionVariants
                          .cardReveal[index]
                      }
                    >
                      <ContentCard>
                        <Icon
                          className={
                            productsSectionVariants.icon
                          }
                        />

                        <h3
                          className={
                            productsSectionVariants.cardTitle
                          }
                        >
                          {capability.title}
                        </h3>

                        <p
                          className={
                            productsSectionVariants.cardBody
                          }
                        >
                          {capability.description}
                        </p>
                      </ContentCard>
                    </Reveal>
                  );
                },
              )}
            </ContentGrid>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
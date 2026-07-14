import {
  Blocks,
  BrainCircuit,
  Database,
  GitBranch,
  Scale,
  Workflow,
} from "lucide-react";

import { homeContent } from "@/content/home";

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
    <Section
      id="products"
      variant="transparent"
      className={productsSectionVariants.section}
    >
      <Container>
        <div className={productsSectionVariants.content}>
          <SectionHeader
            id="products-heading"
            eyebrow={homeContent.products.eyebrow}
            title={homeContent.products.heading}
            description={homeContent.products.description}
          />

          <ContentGrid>
            {homeContent.products.capabilities.map(
              (capability) => {
                const Icon =
                  icons[capability.icon];

                return (
                  <ContentCard
                    key={capability.title}
                  >
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
                );
              },
            )}
          </ContentGrid>
        </div>
      </Container>
    </Section>
  );
}
import { contactContent } from "@/content/contact";

import { ContactForm } from "@/components/contact/ContactForm";
import { Container } from "@/components/shared/Container";
import { ContentCard } from "@/components/shared/ContentCard";
import { Page } from "@/components/shared/Page";
import { Section } from "@/components/shared/Section";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { Footer } from "@/components/shell/Footer";
import { Header } from "@/components/shell/Header";

import { contactPageVariants } from "./ContactPage.variants";

export function ContactPage() {
  return (
    <>
      <Header />

      <Page>
        <Section>
          <Container>
            <div className={contactPageVariants.hero}>
              <SectionHeader
                eyebrow={contactContent.hero.eyebrow}
                title={contactContent.hero.title}
                description={contactContent.hero.description}
              />

              <div className={contactPageVariants.grid}>
                <div
                  className={
                    contactPageVariants.information
                  }
                >
                  <ContentCard>
                    <h2
                      className={
                        contactPageVariants.cardTitle
                      }
                    >
                      {
                        contactContent.beforeContact
                          .title
                      }
                    </h2>

                    <p
                      className={
                        contactPageVariants.cardBody
                      }
                    >
                      {
                        contactContent.beforeContact
                          .description
                      }
                    </p>
                  </ContentCard>

                  <ContentCard>
                    <h2
                      className={
                        contactPageVariants.cardTitle
                      }
                    >
                      {contactContent.process.title}
                    </h2>

                    <ol
                      className={
                        contactPageVariants.list
                      }
                    >
                      {contactContent.process.steps.map(
                        (step, index) => (
                          <li key={step.title}>
                            <p
                              className={
                                contactPageVariants.label
                              }
                            >
                              {index + 1}. {step.title}
                            </p>

                            <p
                              className={
                                contactPageVariants.cardBody
                              }
                            >
                              {step.description}
                            </p>
                          </li>
                        ),
                      )}
                    </ol>
                  </ContentCard>
                </div>

                <ContactForm />
              </div>
            </div>
          </Container>
        </Section>
      </Page>

      <Footer />
    </>
  );
}
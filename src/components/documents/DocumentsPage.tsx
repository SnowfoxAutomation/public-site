import { Container } from "@/components/shared/Container";
import { Page } from "@/components/shared/Page";
import { Section } from "@/components/shared/Section";
import { Footer } from "@/components/shell/Footer";
import { Header } from "@/components/shell/Header";
import { documentsContent } from "@/content/documents";

import { DocumentWorkspace } from "./DocumentWorkspace";
import { documentsPageVariants } from "./DocumentsPage.variants";

export function DocumentsPage() {
  return (
    <>
      <Header />

      <Page>
        <Section>
          <Container>
            <div className={documentsPageVariants.layout}>
              <p
                className={
                  documentsPageVariants.eyebrow
                }
              >
                {documentsContent.hero.eyebrow}
              </p>

              <h1
                className={
                  documentsPageVariants.heading
                }
              >
                {documentsContent.hero.title}
              </h1>

              <p
                className={
                  documentsPageVariants.description
                }
              >
                {documentsContent.hero.description}
              </p>

              <aside
                className={
                  documentsPageVariants.notice
                }
                aria-labelledby="document-security-title"
              >
                <h2
                  id="document-security-title"
                  className={
                    documentsPageVariants.noticeTitle
                  }
                >
                  {
                    documentsContent.securityNotice
                      .title
                  }
                </h2>
                <p
                  className={
                    documentsPageVariants.noticeBody
                  }
                >
                  {
                    documentsContent.securityNotice
                      .description
                  }
                </p>
              </aside>

              <aside
                className={
                  documentsPageVariants.notice
                }
                aria-labelledby="document-expectations-title"
              >
                <h2
                  id="document-expectations-title"
                  className={
                    documentsPageVariants.noticeTitle
                  }
                >
                  {documentsContent.expectations.title}
                </h2>
                <p
                  className={
                    documentsPageVariants.noticeBody
                  }
                >
                  {
                    documentsContent.expectations
                      .description
                  }
                </p>
              </aside>

              <DocumentWorkspace />
            </div>
          </Container>
        </Section>
      </Page>

      <Footer />
    </>
  );
}

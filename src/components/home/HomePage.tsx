import { Container } from "@/components/shared/Container";

import { homePageVariants } from "./HomePage.variants";

export function HomePage() {
  return (
    <main className={homePageVariants.main}>
      <Container>
        <h1 className={homePageVariants.heading}>Snowfox Automation</h1>
      </Container>
    </main>
  );
}
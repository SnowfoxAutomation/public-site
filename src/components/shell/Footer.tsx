import { Container } from "@/components/shared/Container";

import { footerVariants } from "./Footer.variants";

export function Footer() {
  return (
    <footer className={footerVariants.root}>
      <Container>
        <div className={footerVariants.content}>
          © {new Date().getFullYear()} Snowfox Automation.
          All rights reserved.
        </div>
      </Container>
    </footer>
  );
}
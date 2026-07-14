import Link from "next/link";

import { CallToAction } from "@/components/shared/CallToAction";
import { Container } from "@/components/shared/Container";

import { headerVariants } from "./Header.variants";
import { Navigation } from "./Navigation";

export function Header() {
  return (
    <header className={headerVariants.root}>
      <Container>
        <div className={headerVariants.content}>
          <Link
            href="/"
            aria-label="Snowfox Automation"
            className={headerVariants.logo}
          >
            Snowfox
          </Link>

          <Navigation />

          <CallToAction
            href="#contact"
            label="Contact"
            variant="secondary"
          />
        </div>
      </Container>
    </header>
  );
}
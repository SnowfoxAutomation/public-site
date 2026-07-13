import Link from "next/link";

import { Container } from "@/components/shared/Container";

import { Navigation } from "./Navigation";
import { headerVariants } from "./Header.variants";

export function Header() {
  return (
    <header className={headerVariants.root}>
      <Container>
        <div className={headerVariants.content}>
          <Link
            href="/"
            className={headerVariants.logo}
          >
            Snowfox
          </Link>

          <Navigation />
        </div>
      </Container>
    </header>
  );
}
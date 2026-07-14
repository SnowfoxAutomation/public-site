import Link from "next/link";

import { Container } from "@/components/shared/Container";

import { headerVariants } from "./Header.variants";
import { Logo } from "./Logo";
import { Navigation } from "./Navigation";

export function Header() {
  return (
    <header className={headerVariants.root}>
      <Container>
        <div className={headerVariants.content}>
          <Logo />

          <Navigation />

          <Link
            href="/login"
            className={headerVariants.login}
          >
            Login
          </Link>
        </div>
      </Container>
    </header>
  );
}
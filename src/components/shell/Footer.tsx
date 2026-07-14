import Link from "next/link";

import { navigation } from "@/content/navigation";

import { Container } from "@/components/shared/Container";

import { footerVariants } from "./Footer.variants";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className={footerVariants.root}>
      <Container>
        <div className={footerVariants.content}>
          <div className={footerVariants.identity}>
            <Logo />

            <p className={footerVariants.description}>
              Canadian-developed artificial intelligence
              and automation solutions supporting defence,
              intelligence and mission-critical operations.
            </p>
          </div>

          <nav aria-label="Footer">
            <ul className={footerVariants.navigation}>
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={footerVariants.link}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className={footerVariants.legal}>
          © {new Date().getFullYear()} Snowfox Automation.
          All rights reserved.
        </div>
      </Container>
    </footer>
  );
}
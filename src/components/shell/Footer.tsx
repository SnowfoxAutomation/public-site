import Link from "next/link";

import { navigation } from "@/content/navigation";

import { Container } from "@/components/shared/Container";

import { footerVariants } from "./Footer.variants";

export function Footer() {
  return (
    <footer className={footerVariants.root}>
      <Container>
        <div className={footerVariants.content}>
          <div className={footerVariants.identity}>
            <Link
              href="/"
              className={footerVariants.logo}
            >
              Snowfox
            </Link>

            <p className={footerVariants.description}>
              Canadian-developed AI and automation tools for
              defence and intelligence organizations.
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
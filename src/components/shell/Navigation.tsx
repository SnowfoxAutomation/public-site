import Link from "next/link";

import { navigation } from "@/content/navigation";

import { navigationVariants } from "./Navigation.variants";

export function Navigation() {
  return (
    <nav aria-label="Primary navigation">
      <ul className={navigationVariants.list}>
        {navigation.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className={navigationVariants.link}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
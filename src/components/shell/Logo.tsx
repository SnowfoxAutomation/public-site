import Image from "next/image";
import Link from "next/link";

import LogoImage from "@/assets/logos/snowfox-logo.png";

import { logoVariants } from "./Logo.variants";

export function Logo() {
  return (
    <Link
      href="/"
      aria-label="Snowfox Automation"
      className={logoVariants.link}
    >
      <Image
        src={LogoImage}
        alt="Snowfox Automation"
        priority
        className={logoVariants.image}
      />
    </Link>
  );
}
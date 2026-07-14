import { Page } from "@/components/shared/Page";
import { Footer } from "@/components/shell/Footer";
import { Header } from "@/components/shell/Header";

import { AboutSection } from "./AboutSection";
import { ContactSection } from "./ContactSection";
import { Hero } from "./Hero";
import { MissionSection } from "./MissionSection";
import { ProductsSection } from "./ProductsSection";

export function HomePage() {
  return (
    <>
      <Header />

      <Page>
        <Hero />
        <MissionSection />
        <ProductsSection />
        <AboutSection />
        <ContactSection />
      </Page>

      <Footer />
    </>
  );
}
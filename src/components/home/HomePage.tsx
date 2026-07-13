import { Footer } from "@/components/shell/Footer";
import { Header } from "@/components/shell/Header";

import { Hero } from "./Hero";
import { MissionPreview } from "./MissionPreview";
import { WhySnowfox } from "./WhySnowfox";

export function HomePage() {
  return (
    <>
      <Header />

      <Hero />

      <MissionPreview />

      <WhySnowfox />

      <Footer />
    </>
  );
}
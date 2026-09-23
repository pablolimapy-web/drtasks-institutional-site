import { createPageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import { Header } from "@/components/Header";
import { HeroCommercial } from "@/components/HeroCommercialRotating";
import { PainBand } from "@/components/PainBand";
import { FluxOS } from "@/components/FluxOS";
import { ProductPillars } from "@/components/ProductPillars";
import { HowItWorks } from "@/components/HowItWorks";
import { Segments } from "@/components/Segments";
import { OriginStory } from "@/components/OriginStory";
import { SocialProof } from "@/components/SocialProof";
import { Pricing } from "@/components/Pricing";
import { FAQ } from "@/components/FAQ";
import { FinalCTA } from "@/components/FinalCTA";
import { Footer } from "@/components/Footer";

export const metadata = createPageMetadata(
  "Gestão operacional por estágios",
  site.description,
  "/",
);

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <HeroCommercial />
        <PainBand />
        <FluxOS />
        <ProductPillars />
        <HowItWorks />
        <Segments />
        <OriginStory />
        <SocialProof />
        <Pricing />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}

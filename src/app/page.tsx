import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { ClaritySection } from "@/components/ClaritySection";
import { HeroCapabilityBand } from "@/components/HeroCapabilityBand";
import { ProductShowcase } from "@/components/ProductShowcase";
import { FluxOS } from "@/components/FluxOS";
import { BeforeAfter } from "@/components/BeforeAfter";
import { Features } from "@/components/Features";
import { Segments } from "@/components/Segments";
import { SocialProof } from "@/components/SocialProof";
import { Pricing } from "@/components/Pricing";
import { FAQ } from "@/components/FAQ";
import { FinalCTA } from "@/components/FinalCTA";
import { Footer } from "@/components/Footer";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <HeroCapabilityBand />
        <ClaritySection />
        <ProductShowcase />
        <FluxOS />
        <BeforeAfter />
        <Features />
        <Segments />
        <SocialProof />
        <Pricing />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}

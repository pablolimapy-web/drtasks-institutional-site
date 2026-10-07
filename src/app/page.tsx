import { createPageMetadata } from "@/lib/seo";
import { homeHeroNarrative } from "@/lib/homeCommercialNarrative";
import { Header } from "@/components/Header";
import { HomeNarrativeHero } from "@/components/home-commercial/HomeNarrativeHero";
import { HomeModulesOverview } from "@/components/home-commercial/HomeModulesOverview";
import { HomeCommercialJourney } from "@/components/home-commercial/HomeCommercialJourney";
import { OriginStory } from "@/components/OriginStory";
import { FinalCTA } from "@/components/FinalCTA";
import { Footer } from "@/components/Footer";

export const metadata = createPageMetadata("Gestão operacional conectada", homeHeroNarrative.metadataDescription, "/");

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <HomeNarrativeHero />
        <HomeModulesOverview />
        <HomeCommercialJourney />
        <OriginStory />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}

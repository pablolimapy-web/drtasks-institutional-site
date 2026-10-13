import { createPageMetadata } from "@/lib/seo";
import { homeHeroNarrative } from "@/lib/homeCommercialNarrative";
import { Header } from "@/components/Header";
import { HomeNarrativeHero } from "@/components/home-commercial/HomeNarrativeHero";
import { HomeMotionOrchestrator } from "@/components/home-commercial/HomeMotionOrchestrator";
import { HomeModulesOverview } from "@/components/home-commercial/HomeModulesOverview";
import { HomeCommercialJourney } from "@/components/home-commercial/HomeCommercialJourney";
import { OperationalEfficiencyStory } from "@/components/home-commercial/OperationalEfficiencyStory";
import { OperationalProof } from "@/components/home-commercial/OperationalProof";
import { CompetitiveDifference } from "@/components/home-commercial/CompetitiveDifference";
import { AIPositioning } from "@/components/home-commercial/AIPositioning";
import { OriginStory } from "@/components/OriginStory";
import { FinalCTA } from "@/components/FinalCTA";
import { Footer } from "@/components/Footer";
import editorial from "@/components/home-commercial/HomeEditorialSystem.module.css";

export const metadata = createPageMetadata("Gestão operacional conectada", homeHeroNarrative.metadataDescription, "/");

export default function HomePage() {
  return (
    <>
      <Header />
      <HomeMotionOrchestrator />
      <main className={editorial.home}>
        <HomeNarrativeHero />
        <HomeModulesOverview />
        <OperationalEfficiencyStory />
        <HomeCommercialJourney />
        <OperationalProof />
        <CompetitiveDifference />
        <AIPositioning />
        <OriginStory />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}

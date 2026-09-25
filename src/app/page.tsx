import { createPageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import { Header } from "@/components/Header";
import { HeroCommercial } from "@/components/HeroCommercialRotating";
import { TechnologyLogoLoop } from "@/components/TechnologyLogoLoop";
import { ModuleShowcase } from "@/components/ModuleShowcase";
import { HomeModuleJourney } from "@/components/home-modules/HomeModuleJourney";
import { HowItWorks } from "@/components/HowItWorks";
import { Segments } from "@/components/Segments";
import { OriginStory } from "@/components/OriginStory";
import { SocialProof } from "@/components/SocialProof";
import { FAQ } from "@/components/FAQ";
import { FinalCTA } from "@/components/FinalCTA";
import { Footer } from "@/components/Footer";

export const metadata = createPageMetadata("Gestão operacional por estágios",site.description,"/");
export default function HomePage(){return <><Header/><main><HeroCommercial/><TechnologyLogoLoop/><ModuleShowcase/><HomeModuleJourney/><HowItWorks/><Segments/><OriginStory/><SocialProof/><FAQ/><FinalCTA/></main><Footer/></>}

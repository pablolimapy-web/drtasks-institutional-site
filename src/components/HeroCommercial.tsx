import Link from "next/link";
import { ArrowRightIcon } from "./Icons";
import { ProductPreview } from "./ProductPreview";
import { commercialPositioning, primaryCta, secondaryCta } from "@/lib/commercial";

export function HeroCommercial() {
  return (
    <section className="hero section hero-commercial" id="inicio">
      <div className="hero-glow hero-glow-one" />
      <div className="hero-glow hero-glow-two" />
      <div className="container hero-inner">
        <div className="hero-main">
          <div className="hero-copy hero-enter">
            <h1 className="hero-commercial-title">{commercialPositioning.heroTitle}</h1>
            <p>{commercialPositioning.heroDescription}</p>
            <div className="hero-actions">
              <Link href={primaryCta.href} className="button button-primary">{primaryCta.label} <ArrowRightIcon /></Link>
              <a href={secondaryCta.href} className="button button-secondary">{secondaryCta.label}</a>
            </div>
          </div>
          <div className="hero-product hero-enter hero-enter-last">
            <div className="hero-product-stage">
              <ProductPreview />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

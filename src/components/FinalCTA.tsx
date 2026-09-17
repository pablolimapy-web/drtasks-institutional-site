import Link from "next/link";
import { ArrowRightIcon } from "./Icons";
import MagicRings from "./motion/MagicRings";

export function FinalCTA() {
  return (
    <section className="section final-section">
      <div className="container final-cta">
        <div className="final-rings" aria-hidden="true">
          <MagicRings
            color="#2f63ff"
            colorTwo="#8fdcff"
            ringCount={7}
            speed={0.62}
            attenuation={10}
            lineThickness={1.55}
            baseRadius={0.22}
            radiusStep={0.09}
            scaleRate={0.095}
            opacity={0.54}
            noiseAmount={0.02}
            rotation={8}
            ringGap={1.58}
            fadeIn={0.64}
            fadeOut={0.56}
            followMouse={false}
            hoverScale={1.06}
            parallax={0.02}
          />
        </div>
        <div className="final-glow" />
        <div><span className="eyebrow eyebrow-dark">Próximo passo</span><h2>Seu próximo projeto pode começar organizado.</h2><p>Coloque tarefas, responsáveis e etapas no mesmo fluxo de trabalho.</p></div>
        <div className="final-actions"><Link href="/teste-gratis" className="button button-primary">Testar grátis por 14 dias <ArrowRightIcon /></Link><Link href="/contato" className="button button-dark-secondary">Falar com a equipe</Link></div>
        <div className="final-flow" aria-hidden="true"><span /><span /><span /><span className="done" /></div>
      </div>
    </section>
  );
}

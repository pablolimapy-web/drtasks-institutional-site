import Link from "next/link";
import { ArrowRightIcon } from "./Icons";
import { Reveal } from "./Reveal";

export function OriginStory() {
  return (
    <section className="section origin-section">
      <div className="container origin-shell">
        <Reveal>
          <div>
            <span className="eyebrow">Origem</span>
            <h2>Nascido de uma operação real. Construído para tornar o trabalho visível.</h2>
          </div>
        </Reveal>
        <Reveal delay={80}>
          <div className="origin-copy">
            <p>O Dr. Tasks nasceu da experiência com planilhas, contratos, obras e controle operacional. A prioridade desde o início foi responder uma pergunta simples: o que está acontecendo agora e qual é a próxima ação?</p>
            <p>A construção civil é o primeiro contexto de entrada, mas o modelo por projetos, estágios e tarefas foi desenhado para operações que precisam conduzir trabalho com responsáveis, prazos e histórico.</p>
            <Link href="/sobre" className="text-link section-deep-link">
              Conheça a história do Dr. Tasks <ArrowRightIcon />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

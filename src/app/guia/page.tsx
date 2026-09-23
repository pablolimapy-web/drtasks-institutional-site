import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ArrowRightIcon } from "@/components/Icons";
import styles from "../institutional.module.css";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata(
  'Guia — Central de Ajuda',
  'Central de Ajuda inicial do Dr. Tasks com conceitos de FluxOS, projeto, estágio, tarefa, aging, bloqueios, papéis, permissões e histórico.',
  '/guia',
);

const guides = [
  { title: "O que é o FluxOS?", description: "Entenda a visão operacional por estágios, carteira, aging, bloqueios e próxima ação.", href: "/guia/fluxos", live: true },
  { title: "Diferença entre projeto, estágio e tarefa", description: "Veja o papel de cada nível e como eles trabalham juntos sem misturar conceitos.", href: "/guia/projeto-estagio-tarefa", live: true },
  { title: "Como configurar os primeiros estágios", description: "Um roteiro para representar o processo real sem criar um fluxo genérico demais.", live: false },
  { title: "Como acompanhar aging e bloqueios", description: "O que observar para descobrir onde a operação perdeu ritmo e o que exige ação.", live: false },
  { title: "Papéis e permissões", description: "Como pensar acesso e responsabilidade sem confundir perfil de usuário com etapa do processo.", live: false },
  { title: "Histórico", description: "Como usar a linha do tempo para entender movimentações e preservar o contexto de uma alteração.", live: false },
] as const;

export default function GuidePage() {
  return (
    <>
      <Header />
      <main className={styles.page}>
        <section className={styles.guideHero}>
          <div className="container">
            <span className="eyebrow">Central de Ajuda</span>
            <h1>Entenda o modelo antes de decorar a interface.</h1>
            <p>
              O guia começa pelos conceitos que ajudam a ativar uma operação: FluxOS, projeto, estágio, tarefa,
              aging, bloqueios, papéis, permissões e histórico.
            </p>
          </div>
        </section>

        <section className={`${styles.section} ${styles.soft}`}>
          <div className="container">
            <header className={styles.sectionHead}>
              <div>
                <span className="eyebrow">Primeiros artigos</span>
                <h2>Ajuda focada em colocar a primeira operação de pé.</h2>
              </div>
              <p>
                A central cresce junto com o produto. Os artigos disponíveis agora priorizam os conceitos que mais
                impactam a compreensão do FluxOS e da estrutura do trabalho.
              </p>
            </header>

            <div className={styles.guideGrid}>
              {guides.map((guide, index) => {
                const content = (
                  <>
                    <span className={styles.number}>{String(index + 1).padStart(2, "0")}</span>
                    <h3>{guide.title}</h3>
                    <p>{guide.description}</p>
                    <span className={`${styles.guideStatus} ${guide.live ? "" : styles.guideStatusMuted}`}>
                      {guide.live ? "Disponível agora" : "Próximo conteúdo"}
                    </span>
                  </>
                );

                return guide.live ? (
                  <Link className={styles.guideCard} href={guide.href} key={guide.title}>
                    {content}
                  </Link>
                ) : (
                  <article className={styles.guideCard} key={guide.title}>
                    {content}
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className={styles.cta}>
          <div className={`container ${styles.ctaBox}`}>
            <div>
              <h2>Quer ver os conceitos funcionando no produto?</h2>
              <p>Use a demonstração para conectar o conteúdo do guia a uma carteira operacional realista.</p>
            </div>
            <Link href="/demo" className="button button-primary">
              Agendar demonstração <ArrowRightIcon />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

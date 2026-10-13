import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ArrowRightIcon } from "@/components/Icons";
import styles from "../../institutional.module.css";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata(
  'O que é o FluxOS? — Guia',
  'Entenda o FluxOS como visão operacional da carteira por estágios, risco, aging, bloqueios e próxima ação.',
  '/guia/fluxos',
);

export default function FluxosGuidePage() {
  return (
    <>
      <Header />
      <main className={styles.page}>
        <section className={styles.articleHero}>
          <div className={`container ${styles.articleHeroInner}`}>
            <span className="eyebrow">Guia · FluxOS</span>
            <h1>O que é o FluxOS?</h1>
            <p>
              FluxOS é a visão operacional que consolida projetos, estágios e tarefas para responder onde o trabalho
              está, o que exige atenção e qual é a próxima ação.
            </p>
          </div>
        </section>

        <div className={`container ${styles.articleLayout}`}>
          <article className={styles.articleBody}>
            <h2>FluxOS não é mais um nível da hierarquia</h2>
            <p>
              O trabalho continua organizado por instituição ou cliente, workspace, projeto, estágio e tarefa. O
              FluxOS usa essa estrutura para mostrar a carteira de forma operacional, sem virar um novo nível entre
              projeto e tarefa.
            </p>

            <div className={styles.articleCard}>
              <h3>Uma leitura útil da carteira</h3>
              <p>
                A visão deve permitir perceber quantidade por estágio, itens em risco, aging, bloqueios e onde a
                atenção da gestão precisa estar agora.
              </p>
            </div>

            <h2>O que observar em uma etapa</h2>
            <ul>
              <li>quantidade de OS ou itens naquele estágio;</li>
              <li>quantos estão em risco ou exigem atenção;</li>
              <li>aging médio ou tempo parado;</li>
              <li>responsável e prazo do item selecionado;</li>
              <li>situação e bloqueio;</li>
              <li>próxima ação;</li>
              <li>última movimentação registrada.</li>
            </ul>

            <h2>Da carteira para uma OS</h2>
            <p>
              A leitura começa no todo. Depois, o gestor abre uma etapa, identifica uma OS que exige atenção e vê o
              contexto sem abandonar a carteira. A navegação deve preservar a relação entre o problema individual e
              o fluxo completo.
            </p>

            <h2>Por que a próxima ação importa</h2>
            <p>
              Saber que uma OS está “em execução” não explica o que precisa acontecer. A próxima ação transforma o
              status em algo executável: cobrar aprovação, confirmar material, agendar visita ou concluir uma tarefa.
            </p>

            <h2>Histórico e mudança de estágio</h2>
            <p>
              Quando uma OS muda de estágio, a alteração deve permanecer disponível no histórico. Isso ajuda a
              reconstruir o caminho sem depender de memória ou mensagens espalhadas.
            </p>
          </article>

          <aside className={styles.articleAside}>
            <strong>Neste artigo</strong>
            <a href="#">FluxOS e hierarquia</a>
            <a href="#">Leitura da carteira</a>
            <a href="#">Próxima ação</a>
            <Link href="/produto/fluxos">Ver página do FluxOS</Link>
            <Link href="/guia">Voltar ao guia</Link>
          </aside>
        </div>

        <section data-site-reveal="scale" className={styles.cta}>
          <div className={`container ${styles.ctaBox}`}>
            <div>
              <h2>Veja carteira, etapa e OS no mesmo fluxo.</h2>
              <p>A página de produto mostra a experiência do FluxOS com dados demonstrativos protegidos.</p>
            </div>
            <Link href="/produto/fluxos" className="button button-primary">
              Conhecer o FluxOS <ArrowRightIcon />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

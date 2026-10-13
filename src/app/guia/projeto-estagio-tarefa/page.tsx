import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ArrowRightIcon } from "@/components/Icons";
import styles from "../../institutional.module.css";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata(
  'Projeto, estágio e tarefa — Guia',
  'Entenda a diferença entre projeto, estágio e tarefa e como o FluxOS usa essa estrutura para acompanhar a operação.',
  '/guia/projeto-estagio-tarefa',
);

export default function ProjectStageTaskGuidePage() {
  return (
    <>
      <Header />
      <main className={styles.page}>
        <section className={styles.articleHero}>
          <div className={`container ${styles.articleHeroInner}`}>
            <span className="eyebrow">Guia · Modelo operacional</span>
            <h1>Qual é a diferença entre Projeto, Estágio e Tarefa?</h1>
            <p>
              Os três conceitos têm papéis diferentes. Separá-los evita transformar etapas do processo em tarefas
              gigantes ou tratar uma ação pontual como se fosse o resultado inteiro.
            </p>
          </div>
        </section>

        <div className={`container ${styles.articleLayout}`}>
          <article className={styles.articleBody}>
            <h2>Projeto é o resultado</h2>
            <p>
              Projeto representa aquilo que a empresa quer alcançar. Em construção, pode ser uma obra, reforma,
              contrato ou ordem de serviço que reúne várias ações até a conclusão.
            </p>

            <h2>Estágio é a fase do caminho</h2>
            <p>
              Estágio representa em que parte do processo o projeto ou item operacional está. Exemplos comuns incluem
              orçamento, aprovação, compra, execução, medição e entrega.
            </p>

            <h2>Tarefa é a ação concreta</h2>
            <p>
              Tarefa é algo que alguém consegue executar: comprar material, revisar um orçamento, contratar mão de
              obra, enviar uma medição ou confirmar uma visita.
            </p>

            <div className={styles.articleCard}>
              <h3>Exemplo simples</h3>
              <p>
                Projeto: construir uma casa. Estágio: Compra. Tarefa: comprar cimento. Próxima ação: confirmar material
                com o fornecedor.
              </p>
            </div>

            <h2>E onde entra o FluxOS?</h2>
            <p>
              O FluxOS não é outro nível. Ele é a visão operacional que usa projeto, estágio e tarefa para mostrar a
              carteira, destacar risco e abrir o contexto de um item sem perder a leitura do todo.
            </p>

            <h2>Regra prática para modelar</h2>
            <ol>
              <li>Se representa o resultado que será entregue, provavelmente é um Projeto.</li>
              <li>Se descreve uma fase pela qual o trabalho passa, provavelmente é um Estágio.</li>
              <li>Se alguém consegue executar e concluir como uma ação, provavelmente é uma Tarefa.</li>
            </ol>
          </article>

          <aside className={styles.articleAside}>
            <strong>Continue aprendendo</strong>
            <Link href="/guia/fluxos">O que é o FluxOS?</Link>
            <Link href="/produto/projetos-e-tarefas">Ver projetos e tarefas</Link>
            <Link href="/como-funciona">Como funciona</Link>
            <Link href="/guia">Voltar ao guia</Link>
          </aside>
        </div>

        <section data-site-reveal="scale" className={styles.cta}>
          <div className={`container ${styles.ctaBox}`}>
            <div>
              <h2>Veja essa hierarquia aplicada em telas reais.</h2>
              <p>Instituições, workspaces, projetos e tarefas preservam o contexto que o FluxOS usa para acompanhar a operação.</p>
            </div>
            <Link href="/produto/projetos-e-tarefas" className="button button-primary">
              Ver projetos e tarefas <ArrowRightIcon />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

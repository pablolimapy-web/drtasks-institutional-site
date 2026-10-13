"use client";

import styles from "./RealDrTasksFinancialFilm.module.css";

const captions = [
  ["Aprovação no WhatsApp.", "Pagamento sem rastro. Planilha que ninguém atualiza."],
  ["Pedido nasce com contexto.", "Solicitação #01 já carrega fornecedor, OS e justificativa."],
  ["Aprovação em 2 níveis. Sem WhatsApp.", "N1 e N2 avançam dentro da mesma solicitação."],
  ["Rastro imutável. Tudo registrado.", "A obrigação preserva a origem, os aprovadores e o horário."],
  ["Match com o banco.", "Score 96/100 liga o movimento OFX à obrigação correta."],
  ["Do pedido ao pagamento.", "Uma operação contínua, sem reconstruir contexto no caminho."],
] as const;

const requestRows = [
  ["#01", "teste", "Cimento, Areia, Brita", "Escritório", "Pablo Miguel"],
  ["#02", "Casa Paraná", "Tinta acrílica e massa", "OS #414", "Marina Costa"],
  ["#03", "Hidro Sul", "Conexões hidráulicas", "OS #416", "Ana Ribeiro"],
] as const;

export function RealDrTasksFinancialFilm({ phase }: { phase: number }) {
  const safePhase = Math.max(0, Math.min(5, phase));
  const [captionTitle, captionText] = captions[safePhase];

  return (
    <div className={styles.film} data-phase={safePhase}>
      <div className={styles.productCamera}>
        <div className={styles.appShell}>
          <aside className={styles.sidebar} aria-hidden="true">
            <strong>DT</strong>
            <nav>
              <i data-active="true" />
              <i />
              <i />
              <i />
              <i />
            </nav>
          </aside>

          <div className={styles.appBody}>
            <header className={styles.topbar}>
              <div>
                <b>GESTÃO DE COMPRAS</b>
                <span>Dr. Tasks / Financeiro</span>
              </div>
              <span className={styles.account}>Pablo Miguel</span>
            </header>

            <nav className={styles.financeTabs} aria-label="Fluxo financeiro demonstrativo">
              <span data-active={safePhase <= 2 || undefined}>Solicitações</span>
              <span data-active={safePhase === 3 || undefined}>A Pagar</span>
              <span data-active={safePhase >= 4 || undefined}>Conciliação</span>
              <span>Auditoria</span>
              <span>Cotações</span>
              <span>Extrato OFX</span>
            </nav>

            <div className={styles.workspaceViewport}>
              <div className={styles.workspaceTrack}>
                <section className={`${styles.workspacePage} ${styles.requestsPage}`}>
                  <div className={styles.pageHeader}>
                    <div>
                      <small>SOLICITAÇÕES DE COMPRA</small>
                      <h3>Pedidos, aprovações e acompanhamento por OS</h3>
                    </div>
                    <div className={styles.pageActions}><span>Alçadas</span><b>+ Nova solicitação</b></div>
                  </div>

                  <div className={styles.requestToolbar}>
                    <span>Pesquisar fornecedor, OS ou descrição...</span>
                    <span>Todos os status</span>
                  </div>

                  <div className={styles.requestTable}>
                    <div className={styles.tableHeader}><span>ID</span><span>Fornecedor</span><span>Descrição</span><span>OS</span><span>Solicitante</span><span>Status</span></div>
                    {requestRows.map((row, index) => (
                      <div className={styles.tableRow} data-focus={index === 0 || undefined} key={row[0]}>
                        {row.map((cell) => <span key={cell}>{cell}</span>)}
                        <strong>{index === 0 ? (safePhase >= 2 ? "Aprovada" : safePhase === 1 ? "Pendente" : "Rascunho") : "Rascunho"}</strong>
                      </div>
                    ))}
                  </div>

                  <aside className={styles.approvalDrawer} aria-hidden="true">
                    <small>SOLICITAÇÃO #01</small>
                    <strong>Cimento, Areia, Brita</strong>
                    <p>OS Escritório · fornecedor teste</p>
                    <div className={styles.approvalFlow}>
                      <span data-state="done">✓ N1</span><i /><span data-state={safePhase >= 2 ? "done" : "pending"}>{safePhase >= 2 ? "✓ N2" : "N2"}</span>
                    </div>
                    <em>{safePhase >= 2 ? "Compromisso AP-035 gerado" : "Aguardando segunda alçada"}</em>
                  </aside>
                </section>

                <section className={`${styles.workspacePage} ${styles.payablesPage}`}>
                  <div className={styles.pageHeader}>
                    <div><small>A PAGAR</small><h3>Obrigações com origem preservada</h3></div>
                    <div className={styles.pageActions}><span>Filtros</span><b>Nova obrigação</b></div>
                  </div>
                  <div className={styles.payableTable}>
                    <div className={styles.payableRow} data-focus="true">
                      <span>AP-035</span><strong>R$ 5.800,00</strong><span>Solicitação #01</span><span>OS Escritório</span><span>Comprometido</span>
                    </div>
                    <div className={styles.payableRow}><span>AP-034</span><strong>R$ 2.480,00</strong><span>Compra direta</span><span>OS #414</span><span>Pendente</span></div>
                  </div>
                  <aside className={styles.historyDrawer}>
                    <div className={styles.drawerTabs}><b>Detalhe</b><b>Estados</b><b>Histórico</b></div>
                    <small>RASTRO · AP-035</small>
                    <strong>Origem preservada</strong>
                    <ul>
                      <li><span>28/09 · 14:02</span><b>Solicitação #01 criada</b></li>
                      <li><span>28/09 · 14:18</span><b>Aprovação N1</b></li>
                      <li><span>28/09 · 14:32</span><b>Aprovação N2 · Pedro Almeida</b></li>
                      <li><span>28/09 · 14:32</span><b>Compromisso AP-035 gerado</b></li>
                    </ul>
                  </aside>
                </section>

                <section className={`${styles.workspacePage} ${styles.reconcilePage}`}>
                  <div className={styles.pageHeader}>
                    <div><small>CONCILIAÇÃO BANCÁRIA</small><h3>Movimentos OFX e obrigações no mesmo contexto</h3></div>
                    <div className={styles.pageActions}><span>Importar OFX</span><b>Confirmar selecionados</b></div>
                  </div>
                  <div className={styles.reconcileGrid}>
                    <article className={styles.bankMovement}>
                      <small>MOVIMENTO OFX</small><strong>- R$ 5.800,00</strong><span>Fornecedor teste · 30/09</span><span>Referência: Escritório</span>
                    </article>
                    <span className={styles.matchLine} aria-hidden="true"><i /></span>
                    <article className={styles.obligationMatch}>
                      <small>OBRIGAÇÃO</small><strong>AP-035 · R$ 5.800,00</strong><span>Solicitação #01</span><span>OS Escritório</span>
                    </article>
                  </div>
                  <div className={styles.matchScore}><strong>96</strong><span>/100 · alta confiança</span></div>
                  <div className={styles.reconcileState}>{safePhase >= 5 ? "✓ Conciliado · rastro preservado" : "Confirmar conciliação"}</div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.storyCaption}>
        <strong>{captionTitle}</strong>
        <span>{captionText}</span>
      </div>
    </div>
  );
}

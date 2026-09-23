import type { FluxDemoOrder, FluxDemoStage } from "@/lib/fluxCycle";
import styles from "./FluxosPortfolioDemo.module.css";

export function OperationalItemDetail({
  stage,
  order,
}: {
  stage: FluxDemoStage;
  order: FluxDemoOrder;
}) {
  return (
    <article className={styles.detailCard} aria-live="polite">
      <div className={styles.detailHead}>
        <div>
          <span className={styles.detailKicker}>{stage.label}</span>
          <h3>{order.id} · {order.title}</h3>
        </div>
        <span className={order.risk ? styles.riskBadge : styles.okBadge}>
          {order.risk ? "Requer atenção" : "Dentro do fluxo"}
        </span>
      </div>

      <div className={styles.detailGrid}>
        <div>
          <span>Responsável</span>
          <strong>{order.responsible}</strong>
        </div>
        <div>
          <span>Prazo</span>
          <strong>{order.deadline}</strong>
        </div>
        <div>
          <span>Situação</span>
          <strong>{order.status}</strong>
        </div>
        <div>
          <span>Aging da etapa</span>
          <strong>{stage.agingDays} dias</strong>
        </div>
      </div>

      <div className={styles.contextBlock} data-tone="primary">
        <span>Próxima ação</span>
        <strong>{order.nextAction}</strong>
      </div>

      <div className={styles.contextBlock} data-tone={order.blocker ? "warning" : "neutral"}>
        <span>Bloqueio</span>
        <strong>{order.blocker || "Nenhum bloqueio registrado"}</strong>
      </div>

      <footer className={styles.detailFooter}>
        <span>Última movimentação</span>
        <strong>{order.lastMovement}</strong>
      </footer>
    </article>
  );
}

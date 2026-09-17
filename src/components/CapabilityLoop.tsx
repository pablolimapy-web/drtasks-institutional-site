"use client";

import LogoLoop from "./motion/LogoLoop";

const capabilities = [
  "FluxOS",
  "Projetos",
  "Tarefas",
  "Equipes",
  "Operações",
  "Contratos",
  "Relatórios",
  "Financeiro",
].map((label) => ({
  node: <span className="capability-pill"><i />{label}</span>,
  title: label,
}));

export function CapabilityLoop() {
  return (
    <div className="capability-loop" aria-label="Capacidades do Dr. Tasks">
      <LogoLoop
        logos={capabilities}
        speed={58}
        direction="left"
        logoHeight={32}
        gap={16}
        hoverSpeed={10}
        fadeOut
        fadeOutColor="#ffffff"
        scaleOnHover
        ariaLabel="Capacidades do Dr. Tasks"
      />
    </div>
  );
}

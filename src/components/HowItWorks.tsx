"use client";

import { motion, useReducedMotion } from "motion/react";

const steps = [
  { title: "Cadastre o contexto", body: "Organize instituição, cliente, workspace, projeto e equipe." },
  { title: "Configure o caminho", body: "Crie os estágios que representam o processo real da operação." },
  { title: "Faça o trabalho avançar", body: "Registre tarefas, responsáveis, prazos, bloqueios e próxima ação." },
];

export function HowItWorks() {
  const reducedMotion = useReducedMotion();
  return (
    <section className="section how-section" id="como-funciona">
      <div className="container">
        <div className="section-head split-head how-head"><div><span className="eyebrow">Como funciona</span><h2>Do contexto à próxima ação, sem perder o caminho.</h2></div><p>Projeto é o resultado. Estágio é a fase. Tarefa é a ação. O FluxOS é a visão operacional que conecta tudo.</p></div>
        <div className="hierarchy-visual" aria-label="Instituição ou cliente, Workspace, Projeto, Estágio e Tarefa; FluxOS como visão operacional">
          {['Instituição / cliente','Workspace','Projeto','Estágio','Tarefa'].map((item, index) => <div className="hierarchy-node" key={item}><span>{String(index + 1).padStart(2,'0')}</span><strong>{item}</strong></div>)}
          <motion.i className="hierarchy-line" initial={reducedMotion ? false : { scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: .9, ease: [0.22,1,0.36,1] }} />
          <div className="hierarchy-flux"><span>↘</span><strong>FluxOS</strong><small>visão operacional</small></div>
        </div>
        <div className="how-grid">
          {steps.map((step,index)=><article className="how-card" key={step.title}><span>0{index+1}</span><h3>{step.title}</h3><p>{step.body}</p></article>)}
        </div>
      </div>
    </section>
  );
}

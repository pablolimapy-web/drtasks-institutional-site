"use client";

import Link from "next/link";
import { useState } from "react";
import { CheckIcon } from "./Icons";

const plans = [
  { name: "Essencial", desc: "Para equipes pequenas que querem sair do improviso.", features: ["Gestão de tarefas e projetos","Responsáveis e prazos","Visão de andamento","Histórico básico","Acesso web"], cta: "Começar teste" },
  { name: "Profissional", desc: "Para equipes que precisam transformar rotina em processo.", features: ["Tudo do Essencial","FluxOS e fluxos personalizados","Visões avançadas","Permissões e organização de equipe","Relatórios e indicadores","Suporte prioritário"], cta: "Testar Profissional", featured: true },
  { name: "Empresa", desc: "Para operações com necessidades específicas, maior escala ou integrações.", features: ["Tudo do Profissional","Múltiplas equipes","Integrações","Configuração orientada","Suporte comercial dedicado"], cta: "Falar com a equipe", enterprise: true },
];

export function Pricing() {
  const [annual, setAnnual] = useState(false);
  return (
    <section className="section pricing-section" id="planos">
      <div className="container surface pricing-surface">
        <div className="pricing-head"><div><span className="eyebrow">Planos</span><h2>Simples para começar.<br/>Preparado para crescer.</h2><p>Experimente o Dr. Tasks gratuitamente e escolha o plano que acompanha o ritmo da sua operação.</p></div><div className="billing-toggle" role="group" aria-label="Periodicidade"><button className={!annual ? 'active' : ''} onClick={()=>setAnnual(false)}>Mensal</button><button className={annual ? 'active' : ''} onClick={()=>setAnnual(true)}>Anual</button></div></div>
        <div className="pricing-grid">
          {plans.map(plan => <article className={`plan-card ${plan.featured ? 'featured' : ''}`} key={plan.name}>{plan.featured && <span className="recommended">Recomendado</span>}<h3>{plan.name}</h3><p className="plan-desc">{plan.desc}</p><div className="plan-price">{plan.enterprise ? 'Fale conosco' : 'R$ —'}{!plan.enterprise && <small>{annual ? ' / ano' : ' / mês'}</small>}</div><ul>{plan.features.map(f=><li key={f}><CheckIcon/>{f}</li>)}</ul><Link href={plan.enterprise ? '/contato' : '/teste-gratis'} className={`button ${plan.featured ? 'button-primary':'button-secondary'} button-block`}>{plan.cta}</Link></article>)}
        </div>
        <div className="trial-banner"><div><span className="eyebrow eyebrow-dark">14 dias grátis</span><h3>14 dias para colocar o trabalho em ordem.</h3><p>Crie sua conta, convide sua equipe e experimente o Dr. Tasks antes de contratar.</p><div className="trial-points"><span>Sem cartão para começar</span><span>Cancele quando quiser</span><span>Ajuda para configurar os primeiros FluxOS</span></div></div><Link href="/teste-gratis" className="button button-primary">Começar meus 14 dias</Link><div className="trial-glow"/></div>
      </div>
    </section>
  );
}

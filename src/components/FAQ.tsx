"use client";

import { useState } from "react";
import { ChevronIcon } from "./Icons";

const faqs = [
  ["O que é o Dr. Tasks?", "O Dr. Tasks é uma plataforma de gestão de trabalho para organizar tarefas, responsáveis, etapas, projetos e acompanhamento em um único ambiente."],
  ["O que é o FluxOS?", "O FluxOS é a forma visual de organizar o caminho do trabalho: da entrada da demanda até a conclusão, deixando responsáveis e próximos passos claros."],
  ["Para quais empresas o Dr. Tasks é indicado?", "Para equipes que precisam coordenar tarefas, projetos e processos com mais clareza — de pequenas empresas a operações com múltiplas áreas."],
  ["Existe teste gratuito?", "Sim. A proposta inicial deste projeto é oferecer 14 dias de teste para conhecer a plataforma antes da contratação."],
  ["Preciso cadastrar cartão para testar?", "A proposta atual é começar sem cartão. Essa condição deve ser confirmada antes do lançamento comercial."],
  ["Posso cadastrar usuários e equipes?", "A estrutura do produto prevê usuários, equipes, permissões e acessos individuais."],
  ["Como funcionará o pagamento?", "O site está preparado para conectar checkout online, escolha de plano e ativação de assinatura quando a operação comercial estiver disponível."],
  ["O site e o sistema são separados?", "Sim. O site institucional apresenta o produto e conduz cadastro, teste e contratação; o ambiente autenticado é onde a equipe trabalha."],
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return <section className="section faq-section" id="duvidas"><div className="container faq-grid"><div className="faq-head"><span className="eyebrow">Dúvidas</span><h2>Dúvidas frequentes.</h2><p>O que você precisa saber antes de começar.</p></div><div className="faq-list">{faqs.map(([q,a],i)=><article className={`faq-item ${open===i?'open':''}`} key={q}><button onClick={()=>setOpen(open===i?null:i)} aria-expanded={open===i}><span>{q}</span><ChevronIcon/></button><div className="faq-answer"><p>{a}</p></div></article>)}</div></div></section>
}

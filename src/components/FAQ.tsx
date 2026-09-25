"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { ChevronIcon } from "./Icons";
import styles from "./FAQ.module.css";

const faqs=[
 ["O Dr. Tasks é um gerenciador de tarefas ou de projetos?","O Dr. Tasks organiza projetos, estágios e tarefas, mas a proposta central é dar uma leitura operacional do trabalho. O FluxOS conecta essas informações para mostrar onde cada OS está e qual é a próxima ação."],
 ["O que é o FluxOS?","É a visão operacional do Dr. Tasks. Ele consolida projetos, estágios e tarefas sem virar mais um nível da hierarquia, permitindo acompanhar carteira, risco, bloqueio, responsável, prazo e próxima ação."],
 ["Posso criar meus próprios estágios?","A proposta do produto é permitir que os estágios representem o processo real da operação. A disponibilidade e o escopo final dessa configuração devem ser validados no fluxo comercial e de demonstração."],
 ["Qual é a diferença entre projeto, estágio e tarefa?","Projeto é o resultado que a empresa quer alcançar. Estágio é uma fase do caminho até esse resultado. Tarefa é a ação concreta que faz o projeto avançar."],
 ["Posso usar o sistema fora da construção civil?","Sim. A construção é o primeiro contexto comercial, mas o modelo por projetos, estágios, responsáveis, prazos e próximas ações foi desenhado para operações por projeto ou contrato."],
 ["O financeiro já está disponível?","O financeiro por contexto está em validação comercial e técnica para o lançamento. O site não o apresenta como disponibilidade garantida até que o fluxo esteja concluído e validado."],
 ["Controle de tempo e geolocalização já estão disponíveis?","Esses recursos estão em desenvolvimento e não fazem parte da promessa principal do lançamento."],
 ["Existe teste gratuito?","As condições de teste ainda precisam de definição comercial e técnica. Por enquanto, a ação principal do site é agendar uma demonstração."],
 ["Como funcionam usuários, papéis e permissões?","O produto prevê organização por usuários, papéis e permissões. A demonstração comercial deve mostrar o que já está disponível e quais limites se aplicam ao cenário da empresa."],
 ["O sistema registra as alterações realizadas?","Auditoria e histórico fazem parte da direção do produto. A disponibilidade deve ser apresentada como validada somente quando o registro estiver persistido e consultável no fluxo principal."],
] as const;

export function FAQ(){const [open,setOpen]=useState<number|null>(0);const reducedMotion=Boolean(useReducedMotion());return <section className={styles.section} id="duvidas"><div className={styles.inner}><aside className={styles.context}><span>DÚVIDAS</span><h2>Antes da demonstração, vale saber o que já é claro.</h2><p>Respostas diretas sobre o produto, seus conceitos e o que ainda está em validação.</p><strong>{String(faqs.length).padStart(2,"0")} perguntas</strong></aside><i className={styles.verticalRule} aria-hidden="true"/><div className={styles.list}>{faqs.map(([q,a],i)=>{const isOpen=open===i;const panelId=`faq-panel-${i}`;return <article className={styles.item} key={q}><button type="button" onClick={()=>setOpen(isOpen?null:i)} aria-expanded={isOpen} aria-controls={panelId}><span>{String(i+1).padStart(2,"0")}</span><strong>{q}</strong><ChevronIcon/></button><AnimatePresence initial={false}>{isOpen&&<motion.div id={panelId} role="region" aria-label={q} className={styles.answer} initial={reducedMotion?false:{height:0,opacity:0}} animate={{height:"auto",opacity:1}} exit={reducedMotion?{opacity:0}:{height:0,opacity:0}} transition={{duration:reducedMotion?0:.25}}><p>{a}</p></motion.div>}</AnimatePresence></article>})}</div></div></section>}

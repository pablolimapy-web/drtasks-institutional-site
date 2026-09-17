"use client";

import { motion, useReducedMotion } from "motion/react";
import { HistoryIcon, UsersIcon, WorkflowIcon } from "./Icons";

const questions = [
  { text: "A OS está em qual estágio?", icon: WorkflowIcon },
  { text: "Quem precisa agir agora?", icon: UsersIcon },
  { text: "Por que isso ainda não avançou?", icon: HistoryIcon },
];

export function PainBand() {
  const reducedMotion = useReducedMotion();
  return (
    <section className="pain-band section" id="dor">
      <div className="container">
        <div className="pain-band-head">
          <span className="eyebrow">Clareza operacional</span>
          <h2>Feito para quem já perdeu tempo perguntando pelo status.</h2>
        </div>
        <div className="pain-grid">
          {questions.map(({ text, icon: Icon }, index) => (
            <motion.article
              className="pain-card"
              key={text}
              initial={reducedMotion ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: .45 }}
              transition={{ duration: .45, delay: index * .08 }}
            >
              <motion.span className="pain-icon" animate={reducedMotion ? undefined : { y: [0, -4, 0] }} transition={{ duration: 2.8, repeat: Infinity, delay: index * .2 }}><Icon /></motion.span>
              <strong>{text}</strong>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

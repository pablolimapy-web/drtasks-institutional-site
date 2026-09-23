"use client";

import { FormEvent, useMemo, useState } from "react";
import {
  createHttpLeadTransport,
  isDemoLeadSubmissionConfigured,
  validateDemoLead,
  type DemoLead,
  type DemoLeadErrors,
} from "@/lib/demoForm";
import styles from "./DemoForm.module.css";

type SubmissionStatus = "idle" | "submitting" | "success" | "error";

const initialLead: DemoLead = {
  name: "",
  email: "",
  company: "",
  segment: "",
  approximateUsers: "",
  mainProblem: "",
};

const segmentOptions = [
  "Construção civil",
  "Engenharia e manutenção",
  "Serviços técnicos",
  "Operações por projeto",
  "Outro",
];

const userRanges = ["1–10", "11–30", "31–100", "101–300", "301+"];

export function DemoForm() {
  const endpoint = process.env.NEXT_PUBLIC_DEMO_LEAD_ENDPOINT;
  const submissionConfigured = isDemoLeadSubmissionConfigured(endpoint);
  const transport = useMemo(
    () => (submissionConfigured && endpoint ? createHttpLeadTransport(endpoint) : null),
    [endpoint, submissionConfigured],
  );

  const [lead, setLead] = useState<DemoLead>(initialLead);
  const [errors, setErrors] = useState<DemoLeadErrors>({});
  const [status, setStatus] = useState<SubmissionStatus>("idle");

  function updateField<K extends keyof DemoLead>(field: K, value: DemoLead[K]) {
    setLead((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    if (status !== "idle") setStatus("idle");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors = validateDemoLead(lead);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    if (!transport) {
      setStatus("error");
      return;
    }

    setStatus("submitting");

    try {
      await transport.submit({
        ...lead,
        name: lead.name.trim(),
        email: lead.email.trim(),
        company: lead.company.trim(),
        mainProblem: lead.mainProblem?.trim(),
      });
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className={styles.formShell}>
      <div className={styles.formHead}>
        <div>
          <span>Conversa comercial</span>
          <h2>Conte um pouco da sua operação.</h2>
        </div>
        <p>Essas informações ajudam a demonstração a partir do processo que sua equipe já executa.</p>
      </div>

      {!submissionConfigured ? (
        <div className={styles.validationNotice} role="status">
          <strong>Formulário em ambiente de validação.</strong>{" "}
          O envio comercial será conectado antes da publicação. Você pode preencher os campos para revisar a
          experiência, mas nenhum dado será enviado enquanto o canal definitivo não estiver configurado.
        </div>
      ) : null}

      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        <div className={styles.grid}>
          <div className={styles.field}>
            <label htmlFor="demo-name">Nome</label>
            <input
              id="demo-name"
              name="name"
              autoComplete="name"
              value={lead.name}
              onChange={(event) => updateField("name", event.target.value)}
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? "demo-name-error" : undefined}
              placeholder="Seu nome"
            />
            {errors.name ? <p className={styles.error} id="demo-name-error">{errors.name}</p> : null}
          </div>

          <div className={styles.field}>
            <label htmlFor="demo-email">E-mail de trabalho</label>
            <input
              id="demo-email"
              name="email"
              type="email"
              autoComplete="email"
              value={lead.email}
              onChange={(event) => updateField("email", event.target.value)}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? "demo-email-error" : undefined}
              placeholder="voce@empresa.com.br"
            />
            {errors.email ? <p className={styles.error} id="demo-email-error">{errors.email}</p> : null}
          </div>

          <div className={styles.field}>
            <label htmlFor="demo-company">Empresa</label>
            <input
              id="demo-company"
              name="company"
              autoComplete="organization"
              value={lead.company}
              onChange={(event) => updateField("company", event.target.value)}
              aria-invalid={Boolean(errors.company)}
              aria-describedby={errors.company ? "demo-company-error" : undefined}
              placeholder="Nome da empresa"
            />
            {errors.company ? <p className={styles.error} id="demo-company-error">{errors.company}</p> : null}
          </div>

          <div className={styles.field}>
            <label htmlFor="demo-segment">Segmento</label>
            <select
              id="demo-segment"
              name="segment"
              value={lead.segment}
              onChange={(event) => updateField("segment", event.target.value)}
              aria-invalid={Boolean(errors.segment)}
              aria-describedby={errors.segment ? "demo-segment-error" : undefined}
            >
              <option value="">Selecione</option>
              {segmentOptions.map((option) => <option key={option} value={option}>{option}</option>)}
            </select>
            {errors.segment ? <p className={styles.error} id="demo-segment-error">{errors.segment}</p> : null}
          </div>

          <div className={styles.field}>
            <label htmlFor="demo-users">Pessoas que usariam o sistema</label>
            <select
              id="demo-users"
              name="approximateUsers"
              value={lead.approximateUsers}
              onChange={(event) => updateField("approximateUsers", event.target.value)}
              aria-invalid={Boolean(errors.approximateUsers)}
              aria-describedby={errors.approximateUsers ? "demo-users-error" : undefined}
            >
              <option value="">Selecione</option>
              {userRanges.map((option) => <option key={option} value={option}>{option}</option>)}
            </select>
            {errors.approximateUsers ? (
              <p className={styles.error} id="demo-users-error">{errors.approximateUsers}</p>
            ) : null}
          </div>

          <div className={`${styles.field} ${styles.fieldFull}`}>
            <label htmlFor="demo-problem">Qual é o principal problema que vocês querem organizar?</label>
            <textarea
              id="demo-problem"
              name="mainProblem"
              value={lead.mainProblem}
              onChange={(event) => updateField("mainProblem", event.target.value)}
              aria-invalid={Boolean(errors.mainProblem)}
              aria-describedby={errors.mainProblem ? "demo-problem-error" : undefined}
              placeholder="Ex.: saber em que estágio cada OS está, reduzir cobranças por status, acompanhar compras por obra..."
              maxLength={1000}
            />
            {errors.mainProblem ? <p className={styles.error} id="demo-problem-error">{errors.mainProblem}</p> : null}
          </div>
        </div>

        {status === "success" ? (
          <div className={`${styles.status} ${styles.success}`} role="status">
            Solicitação enviada. A equipe poderá usar este contexto para preparar a conversa.
          </div>
        ) : null}

        {status === "error" && submissionConfigured ? (
          <div className={`${styles.status} ${styles.failure}`} role="alert">
            Não foi possível enviar agora. Seus dados permanecem no formulário para você tentar novamente.
          </div>
        ) : null}

        <div className={styles.footer}>
          <p>
            Ao enviar, você compartilha apenas os dados preenchidos acima para contato comercial relacionado ao Dr. Tasks.
          </p>
          <button
            className={`button button-primary ${styles.submit}`}
            type="submit"
            disabled={!submissionConfigured || status === "submitting"}
          >
            {status === "submitting" ? "Enviando..." : submissionConfigured ? "Solicitar demonstração" : "Envio em validação"}
          </button>
        </div>
      </form>
    </div>
  );
}

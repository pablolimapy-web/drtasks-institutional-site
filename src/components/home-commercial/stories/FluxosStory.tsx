"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import Stepper, { Step } from "@/components/react-bits/Stepper";
import { homeCommercialModules } from "@/lib/homeCommercialNarrative";
import { ModuleStoryShell } from "../ModuleStoryShell";
import styles from "./FluxosStory.module.css";

const storyModule = homeCommercialModules.find((module) => module.id === "fluxos")!;

const steps = [
  {
    id: "request",
    label: "Solicitação",
    title: "O pedido deixa de nascer em mensagem solta.",
    supporting: "Origem e motivo já entram vinculados ao trabalho que precisa acontecer.",
  },
  {
    id: "budget",
    label: "Orçamento",
    title: "Escopo e valor avançam sem perder a origem.",
    supporting: "A análise continua ligada ao pedido que iniciou o processo.",
  },
  {
    id: "approval",
    label: "Aprovação",
    title: "A decisão segue adiante com o histórico intacto.",
    supporting: "Quem recebe a demanda entende o que foi decidido sem reconstruir contexto.",
  },
  {
    id: "execution",
    label: "Execução",
    title: "A equipe recebe a próxima ação pronta para agir.",
    supporting: "O fluxo entrega o contexto necessário para o trabalho continuar.",
  },
] as const;

const progressByStep = ["0%", "30%", "60%", "89%"] as const;

type StepId = (typeof steps)[number]["id"];

function FluxStepIcon({ kind, className }: { kind: StepId; className?: string }) {
  const common = {
    viewBox: "0 0 48 48",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className,
    "aria-hidden": true,
  };

  if (kind === "request") {
    return (
      <svg {...common}>
        <path d="M15 9h13l6 6v24H15z" />
        <path d="M28 9v7h7" />
        <path d="M20 24h9" />
        <path d="M20 30h6" />
      </svg>
    );
  }

  if (kind === "budget") {
    return (
      <svg {...common}>
        <rect x="13" y="9" width="22" height="30" rx="4" />
        <path d="M18 15h12" />
        <path d="M19 23h2M27 23h2M19 30h2M27 30h2" />
      </svg>
    );
  }

  if (kind === "approval") {
    return (
      <svg {...common}>
        <path d="M24 8l13 5v10c0 7-4.4 12.6-13 17-8.6-4.4-13-10-13-17V13z" />
        <path d="M17.5 24l4.2 4.2 8.8-9.4" />
      </svg>
    );
  }

  return (
    <svg {...common}>
      <path d="M30.5 10.5a8 8 0 0 0-9.3 10.3L10.5 31.5a4.2 4.2 0 1 0 6 6l10.7-10.7a8 8 0 0 0 10.3-9.3l-5.2 5.2-6.8-1.8-1.8-6.8z" />
      <path d="M13.5 34.5h.01" />
    </svg>
  );
}

function FluxStepScene({ step }: { step: (typeof steps)[number] }) {
  return (
    <div className={styles.stepScene}>
      <div className={styles.stepSceneVisual}>
        <FluxStepIcon kind={step.id} className={styles.stepSceneIcon} />
      </div>

      <div className={styles.stepSceneCopy}>
        <h3>{step.title}</h3>
        <p>{step.supporting}</p>
      </div>
    </div>
  );
}

export function FluxosStory() {
  const nextButtonRef = useRef<HTMLButtonElement | null>(null);
  const [activeStep, setActiveStep] = useState(1);
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      nextButtonRef.current?.click();
    }, activeStep === steps.length ? 3200 : 2700);

    return () => window.clearTimeout(timeout);
  }, [activeStep, cycle]);

  const stepperStyle = {
    "--flux-progress": progressByStep[activeStep - 1],
  } as CSSProperties;

  return (
    <ModuleStoryShell module={storyModule}>
      <div className={styles.stage}>
        <Stepper
          key={cycle}
          className={styles.stepperRoot}
          style={stepperStyle}
          initialStep={1}
          onStepChange={(step) => setActiveStep(step)}
          onFinalStepCompleted={() => {
            setActiveStep(1);
            setCycle((value) => value + 1);
          }}
          backButtonText="Anterior"
          nextButtonText="Avançar"
          stepCircleContainerClassName={styles.stepperSurface}
          stepContainerClassName={styles.stepperIndicators}
          contentClassName={styles.stepperContent}
          footerClassName={styles.stepperFooter}
          backButtonProps={{ "aria-label": "Etapa anterior do FluxOS" }}
          nextButtonProps={{ ref: nextButtonRef, "aria-label": "Próxima etapa do FluxOS" }}
          renderStepIndicator={({ step, currentStep, onStepClick }) => {
            const item = steps[step - 1];
            const status = currentStep === step ? "active" : currentStep > step ? "complete" : "idle";

            return (
              <button
                type="button"
                className={styles.stepIndicator}
                data-status={status}
                onClick={() => onStepClick(step)}
                aria-label={`${step}. ${item.label}`}
              >
                <span className={styles.stepIndicatorIcon}>
                  <FluxStepIcon kind={item.id} />
                </span>
                <span className={styles.stepIndicatorLabel}>{item.label}</span>
              </button>
            );
          }}
        >
          {steps.map((step) => (
            <Step key={step.id}>
              <FluxStepScene step={step} />
            </Step>
          ))}
        </Stepper>
      </div>
    </ModuleStoryShell>
  );
}

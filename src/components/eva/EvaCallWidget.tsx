"use client";

import { FormEvent, useCallback, useEffect, useMemo, useRef, useState } from "react";
import Vapi from "@vapi-ai/web";
import styles from "./EvaCallWidget.module.css";

type WidgetOrigin = "float" | "hero" | "header" | "final" | "external";
type WidgetMode = "call" | "chat";
type CallState = "idle" | "permission" | "calling" | "connected" | "ended" | "error" | "chat";
type TranscriptRole = "assistant" | "user";

type TranscriptLine = {
  id: string;
  role: TranscriptRole;
  text: string;
};

type LeadData = {
  name: string;
  segment: string;
  whatsapp: string;
  bestTime: string;
  intent?: "red" | "yellow" | "green";
};

type RuntimeConfig = {
  tenantId?: string;
  agentName?: string;
  primaryColor?: string;
  position?: "right" | "left";
  mode?: WidgetMode;
  textFallback?: boolean;
  launcherText?: string;
  publicKey?: string;
  assistantId?: string;
};

type VapiMessage = {
  type?: string;
  role?: string;
  transcript?: string;
  transcriptType?: string;
  toolCallList?: Array<{
    function?: { name?: string; arguments?: unknown };
    name?: string;
    arguments?: unknown;
  }>;
  toolCalls?: Array<{
    function?: { name?: string; arguments?: unknown };
    name?: string;
    arguments?: unknown;
  }>;
};

type DataLayerWindow = Window & {
  dataLayer?: Array<Record<string, unknown>>;
  DrTasksWidget?: RuntimeConfig & {
    open?: (origin?: WidgetOrigin) => void;
    close?: () => void;
  };
};

const envConfig: Required<Pick<RuntimeConfig, "tenantId" | "agentName" | "primaryColor" | "position" | "mode" | "textFallback" | "launcherText">> & Pick<RuntimeConfig, "publicKey" | "assistantId"> = {
  tenantId: process.env.NEXT_PUBLIC_EVA_TENANT_ID || "drtasks-site",
  agentName: process.env.NEXT_PUBLIC_EVA_AGENT_NAME || "Eva",
  primaryColor: process.env.NEXT_PUBLIC_EVA_PRIMARY_COLOR || "#1d4ed8",
  position: "right",
  mode: "call",
  textFallback: true,
  launcherText: "Falar com a Eva",
  publicKey: process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY,
  assistantId: process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID,
};

function nowId(prefix: string) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

function safeObject(value: unknown): Record<string, unknown> | null {
  if (!value) return null;
  if (typeof value === "object") return value as Record<string, unknown>;
  if (typeof value === "string") {
    try {
      const parsed = JSON.parse(value);
      return typeof parsed === "object" && parsed ? parsed as Record<string, unknown> : null;
    } catch {
      return null;
    }
  }
  return null;
}

function secondsLabel(total: number) {
  const minutes = Math.floor(total / 60).toString().padStart(2, "0");
  const seconds = (total % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
}

function pushAnalytics(event: string, payload: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  const target = window as DataLayerWindow;
  target.dataLayer = target.dataLayer || [];
  target.dataLayer.push({ event, ...payload });
}

function createRingtone() {
  if (typeof window === "undefined") return () => undefined;
  const AudioContextClass = window.AudioContext || (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!AudioContextClass) return () => undefined;

  let stopped = false;
  const context = new AudioContextClass();
  const playPulse = () => {
    if (stopped) return;
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(440, context.currentTime);
    oscillator.frequency.linearRampToValueAtTime(520, context.currentTime + 0.16);
    gain.gain.setValueAtTime(0.0001, context.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.045, context.currentTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + 0.32);
    oscillator.connect(gain);
    gain.connect(context.destination);
    oscillator.start();
    oscillator.stop(context.currentTime + 0.34);
  };
  playPulse();
  const timer = window.setInterval(playPulse, 950);
  return () => {
    stopped = true;
    window.clearInterval(timer);
    void context.close().catch(() => undefined);
  };
}

export function EvaCallWidget() {
  const [open, setOpen] = useState(false);
  const [callState, setCallState] = useState<CallState>("idle");
  const [origin, setOrigin] = useState<WidgetOrigin>("float");
  const [muted, setMuted] = useState(false);
  const [showTranscript, setShowTranscript] = useState(false);
  const [evaSpeaking, setEvaSpeaking] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [caption, setCaption] = useState("Estou pronta para entender sua operação.");
  const [transcript, setTranscript] = useState<TranscriptLine[]>([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [lead, setLead] = useState<LeadData>({ name: "", segment: "", whatsapp: "", bestTime: "" });
  const [leadSaved, setLeadSaved] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatBusy, setChatBusy] = useState(false);
  const [chatId, setChatId] = useState<string | undefined>();

  const vapiRef = useRef<Vapi | null>(null);
  const ringtoneStopRef = useRef<(() => void) | null>(null);
  const callStartedAtRef = useRef<number | null>(null);
  const connectedAtRef = useRef<number | null>(null);
  const pendingPartialRef = useRef<string | null>(null);

  const config = useMemo(() => {
    if (typeof window === "undefined") return envConfig;
    const runtime = (window as DataLayerWindow).DrTasksWidget || {};
    return { ...envConfig, ...runtime };
  }, [open]);

  const analytics = useCallback((event: string, extra: Record<string, unknown> = {}) => {
    pushAnalytics(event, {
      tenantId: config.tenantId,
      timestamp: new Date().toISOString(),
      ...extra,
    });
  }, [config.tenantId]);

  const stopRingtone = useCallback(() => {
    ringtoneStopRef.current?.();
    ringtoneStopRef.current = null;
  }, []);

  const persistLead = useCallback(async (data: LeadData, reason: string) => {
    if (!data.name && !data.whatsapp) return;
    try {
      const response = await fetch("/api/eva/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tenantId: config.tenantId,
          source: origin,
          reason,
          lead: data,
          transcript,
          durationSeconds: elapsed,
          createdAt: new Date().toISOString(),
        }),
      });
      if (response.ok) {
        setLeadSaved(true);
        analytics("lead_captured", { intent: data.intent || "yellow" });
        if (data.bestTime) analytics("meeting_scheduled", { period: data.bestTime, contact: data.whatsapp });
      }
    } catch {
      // The visitor must never lose the conversation UI because CRM forwarding failed.
    }
  }, [analytics, config.tenantId, elapsed, origin, transcript]);

  const handleToolCalls = useCallback((message: VapiMessage) => {
    const calls = message.toolCallList || message.toolCalls || [];
    calls.forEach((call) => {
      const name = call.function?.name || call.name;
      const args = safeObject(call.function?.arguments ?? call.arguments);
      if (!args || !name) return;

      if (name === "capture_lead" || name === "lead_captured") {
        const next: LeadData = {
          name: String(args.name || ""),
          segment: String(args.segment || ""),
          whatsapp: String(args.whatsapp || args.phone || ""),
          bestTime: String(args.bestTime || args.best_time || ""),
          intent: ["red", "yellow", "green"].includes(String(args.intent)) ? String(args.intent) as LeadData["intent"] : "yellow",
        };
        setLead(next);
        void persistLead(next, "assistant_tool");
      }

      if (name === "meeting_scheduled") {
        const nextTime = String(args.bestTime || args.best_time || args.period || "");
        setLead((current) => {
          const next = { ...current, bestTime: nextTime };
          void persistLead(next, "meeting_tool");
          return next;
        });
      }
    });
  }, [persistLead]);

  const ensureVapi = useCallback(async () => {
    if (vapiRef.current) return vapiRef.current;
    if (!config.publicKey || !config.assistantId) {
      throw new Error("Configure NEXT_PUBLIC_VAPI_PUBLIC_KEY e NEXT_PUBLIC_VAPI_ASSISTANT_ID para ativar a Eva ao vivo.");
    }

    const client = new Vapi(config.publicKey);

    client.on("call-start", () => {
      stopRingtone();
      connectedAtRef.current = Date.now();
      setCallState("connected");
      setCaption(`Oi, eu sou a ${config.agentName}. Me conta como vocês acompanham as obras hoje.`);
      analytics("call_connected", {
        connectTimeMs: callStartedAtRef.current ? Date.now() - callStartedAtRef.current : undefined,
      });
    });

    client.on("call-end", () => {
      stopRingtone();
      setEvaSpeaking(false);
      setCallState("ended");
      analytics("call_ended", {
        duration: connectedAtRef.current ? Math.round((Date.now() - connectedAtRef.current) / 1000) : elapsed,
        endedBy: "unknown",
      });
    });

    client.on("speech-start", () => setEvaSpeaking(true));
    client.on("speech-end", () => setEvaSpeaking(false));

    client.on("message", (raw: VapiMessage) => {
      if (raw.type === "transcript" && raw.transcript && (raw.role === "assistant" || raw.role === "user")) {
        const role = raw.role as TranscriptRole;
        const text = raw.transcript.trim();
        if (!text) return;
        setCaption(text);
        if (raw.transcriptType === "partial") {
          pendingPartialRef.current = text;
        } else {
          pendingPartialRef.current = null;
          setTranscript((current) => [...current, { id: nowId(role), role, text }]);
        }
      }
      if (raw.type === "tool-calls" || raw.toolCallList || raw.toolCalls) handleToolCalls(raw);
    });

    client.on("error", (error: unknown) => {
      stopRingtone();
      const message = error instanceof Error ? error.message : "Não foi possível conectar a chamada.";
      setErrorMessage(message);
      setCallState("error");
    });

    vapiRef.current = client;
    return client;
  }, [analytics, config.agentName, config.assistantId, config.publicKey, elapsed, handleToolCalls, stopRingtone]);

  const switchToText = useCallback(() => {
    stopRingtone();
    setCallState("chat");
    setCaption("Sem microfone. Podemos continuar por texto.");
    analytics("text_fallback");
  }, [analytics, stopRingtone]);

  const beginCall = useCallback(async (source: WidgetOrigin) => {
    setOrigin(source);
    setOpen(true);
    setErrorMessage("");
    setShowTranscript(false);
    setMuted(false);
    setEvaSpeaking(false);
    setElapsed(0);
    setCallState("permission");
    callStartedAtRef.current = Date.now();
    connectedAtRef.current = null;
    analytics("call_started", { origin: source });
    ringtoneStopRef.current?.();
    ringtoneStopRef.current = createRingtone();

    if (!navigator.mediaDevices?.getUserMedia) {
      setErrorMessage("Seu navegador não disponibilizou acesso ao microfone.");
      if (config.textFallback) switchToText();
      else setCallState("error");
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.getTracks().forEach((track) => track.stop());
      analytics("mic_granted");
      setCallState("calling");
      setCaption(`Chamando ${config.agentName}…`);
      const client = await ensureVapi();
      await client.start(config.assistantId || "", {
        variableValues: {
          tenantId: config.tenantId,
          source,
        },
      });
    } catch (error) {
      stopRingtone();
      const permissionDenied = error instanceof DOMException && ["NotAllowedError", "PermissionDeniedError"].includes(error.name);
      if (permissionDenied) {
        analytics("mic_denied");
        if (config.textFallback) {
          switchToText();
          return;
        }
      }
      setErrorMessage(error instanceof Error ? error.message : "Não foi possível iniciar a chamada.");
      setCallState("error");
    }
  }, [analytics, config.agentName, config.assistantId, config.tenantId, config.textFallback, ensureVapi, stopRingtone, switchToText]);

  useEffect(() => {
    if (callState !== "connected") return;
    const timer = window.setInterval(() => {
      if (!connectedAtRef.current) return;
      setElapsed(Math.floor((Date.now() - connectedAtRef.current) / 1000));
    }, 1000);
    return () => window.clearInterval(timer);
  }, [callState]);

  useEffect(() => {
    const target = window as DataLayerWindow;
    const previous = target.DrTasksWidget || {};
    target.DrTasksWidget = {
      ...previous,
      open: (source: WidgetOrigin = "external") => void beginCall(source),
      close: () => setOpen(false),
    };

    const clickHandler = (event: MouseEvent) => {
      const element = (event.target as HTMLElement | null)?.closest<HTMLElement>("[data-eva-trigger]");
      if (!element) return;
      event.preventDefault();
      const source = (element.dataset.evaTrigger as WidgetOrigin | undefined) || "external";
      void beginCall(source);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  }, [beginCall]);

  useEffect(() => () => {
    stopRingtone();
    vapiRef.current?.stop();
  }, [stopRingtone]);

  const toggleMute = () => {
    const next = !muted;
    vapiRef.current?.setMuted(next);
    setMuted(next);
  };

  const requestEnd = () => {
    if (callState === "connected" && !leadSaved && (!lead.name || !lead.whatsapp)) {
      vapiRef.current?.stop();
      stopRingtone();
      setShowTranscript(false);
      setCallState("ended");
      setCaption("Antes de encerrar, deixe seu contato para continuarmos daqui.");
      analytics("call_ended", { duration: elapsed, endedBy: "visitor" });
      return;
    }
    vapiRef.current?.stop();
    stopRingtone();
    setCallState("ended");
    analytics("call_ended", { duration: elapsed, endedBy: "visitor" });
  };

  const closeWidget = () => {
    if (["permission", "calling", "connected"].includes(callState)) {
      vapiRef.current?.stop();
      analytics("call_ended", { duration: elapsed, endedBy: "visitor_close" });
    }
    stopRingtone();
    setOpen(false);
    setCallState("idle");
  };

  const submitLead = async (event: FormEvent) => {
    event.preventDefault();
    await persistLead(lead, "visitor_form");
    vapiRef.current?.stop();
    setCallState("ended");
    setCaption("Perfeito. A conversa ficou registrada para o próximo contato.");
  };

  const sendChat = async (event: FormEvent) => {
    event.preventDefault();
    const text = chatInput.trim();
    if (!text || chatBusy) return;
    setChatInput("");
    setTranscript((current) => [...current, { id: nowId("user"), role: "user", text }]);
    setChatBusy(true);
    try {
      const response = await fetch("/api/eva/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input: text, previousChatId: chatId, tenantId: config.tenantId }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data?.error || "A Eva não conseguiu responder agora.");
      if (data.chatId) setChatId(data.chatId);
      const answer = String(data.response || "Posso continuar te ajudando por aqui.");
      setCaption(answer);
      setTranscript((current) => [...current, { id: nowId("assistant"), role: "assistant", text: answer }]);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Falha no chat por texto.");
    } finally {
      setChatBusy(false);
    }
  };

  const needsLeadForm = callState === "ended" && !leadSaved && (!lead.name || !lead.whatsapp);
  const status = callState === "permission"
    ? "Permita o microfone"
    : callState === "calling"
      ? `Chamando ${config.agentName}…`
      : callState === "connected"
        ? `Em chamada ${secondsLabel(elapsed)}`
        : callState === "chat"
          ? "Conversa por texto"
          : callState === "ended"
            ? "Chamada encerrada"
            : callState === "error"
              ? "Não foi possível conectar"
              : "Especialista IA";

  const launcherPrimary = callState === "connected"
    ? `${config.agentName} · ${secondsLabel(elapsed)}`
    : callState === "calling" || callState === "permission"
      ? `Chamando ${config.agentName}…`
      : callState === "ended"
        ? "Ligar novamente"
        : config.launcherText;

  const launcherSecondary = callState === "connected"
    ? "Chamada em andamento"
    : callState === "calling" || callState === "permission"
      ? "Conectando por voz"
      : "Especialista Dr.Tasks";

  const stageTitle = evaSpeaking
    ? `${config.agentName} está falando`
    : callState === "permission"
      ? "Vamos iniciar a conversa"
      : callState === "calling"
        ? `Chamando ${config.agentName}…`
        : callState === "connected"
          ? `Você está com a ${config.agentName}`
          : callState === "ended"
            ? "Conversa encerrada"
            : callState === "error"
              ? "Não foi possível conectar"
              : `${config.agentName}, especialista IA`;

  return (
    <>
      <button
        type="button"
        className={`${styles.launcher} ${config.position === "left" ? styles.launcherLeft : ""} ${callState === "connected" ? styles.launcherLive : ""}`}
        style={{ "--eva-accent": config.primaryColor } as React.CSSProperties}
        onClick={() => void beginCall("float")}
        aria-label={`${launcherPrimary}. Iniciar chamada com ${config.agentName}`}
      >
        <span className={styles.launcherAvatar} aria-hidden="true">
          <img src="/eva-voice-mark-v3.png" alt="" draggable={false} />
        </span>
        <span className={styles.launcherCopy}>
          <strong>{launcherPrimary}</strong>
          <small>{launcherSecondary}</small>
        </span>
        <span className={styles.launcherArrow} aria-hidden="true">↗</span>
      </button>

      {open && (
        <div className={styles.layer} role="presentation">
          <button className={styles.backdrop} type="button" aria-label="Fechar chamada" onClick={closeWidget} />
          <section
            className={styles.widget}
            role="dialog"
            aria-modal="true"
            aria-labelledby="eva-widget-title"
            style={{ "--eva-accent": config.primaryColor } as React.CSSProperties}
          >
            <header className={styles.topbar}>
              <div className={styles.brandLockup}>
                <span className={styles.brandMark} aria-hidden="true">DT</span>
                <div>
                  <strong id="eva-widget-title">{config.agentName}</strong>
                  <span>Especialista Dr.Tasks</span>
                </div>
              </div>
              <div className={styles.topActions}>
                <span className={styles.liveBadge}><i aria-hidden="true" />IA ao vivo</span>
                <button type="button" className={styles.close} onClick={closeWidget} aria-label="Fechar">×</button>
              </div>
            </header>

            {needsLeadForm ? (
              <div className={styles.followupStage}>
                <div className={styles.followupIntro}>
                  <span className={styles.followupIcon} aria-hidden="true">✓</span>
                  <span className={styles.eyebrow}>CONVERSA REGISTRADA</span>
                  <h3>Deixe a Eva encaminhar o próximo passo.</h3>
                  <p>Confirme seus dados para um especialista continuar exatamente de onde a conversa parou.</p>
                </div>
                <form className={styles.leadForm} onSubmit={submitLead}>
                  <div className={styles.leadGrid}>
                    <label><span>Nome</span><input required value={lead.name} onChange={(e) => setLead({ ...lead, name: e.target.value })} placeholder="Seu nome" /></label>
                    <label><span>WhatsApp</span><input required value={lead.whatsapp} onChange={(e) => setLead({ ...lead, whatsapp: e.target.value })} inputMode="tel" placeholder="(00) 00000-0000" /></label>
                    <label><span>Segmento</span><input value={lead.segment} onChange={(e) => setLead({ ...lead, segment: e.target.value })} placeholder="Construtora, serviços…" /></label>
                    <label><span>Melhor horário</span><input value={lead.bestTime} onChange={(e) => setLead({ ...lead, bestTime: e.target.value })} placeholder="Ex.: amanhã às 10h" /></label>
                  </div>
                  <button type="submit" className={styles.saveLead}>Continuar com um especialista <span aria-hidden="true">→</span></button>
                  <button type="button" className={styles.secondaryAction} onClick={() => void beginCall(origin)}>Ligar novamente para a Eva</button>
                </form>
              </div>
            ) : (
              <>
                <div className={styles.callStage}>
                  <div className={`${styles.avatarWrap} ${evaSpeaking ? styles.speaking : ""} ${callState === "calling" || callState === "permission" ? styles.ringing : ""}`}>
                    <i className={styles.ringA} aria-hidden="true" />
                    <i className={styles.ringB} aria-hidden="true" />
                    <i className={styles.ringC} aria-hidden="true" />
                    <div className={styles.avatar} aria-hidden="true"><img src="/eva-voice-mark-v3.png" alt="" draggable={false} /></div>
                    <div className={styles.waveform} aria-hidden="true">
                      <i /><i /><i /><i /><i />
                    </div>
                  </div>

                  <div className={styles.identity}>
                    <span className={styles.statusLine}><i aria-hidden="true" />{status}</span>
                    <h2>{stageTitle}</h2>
                  </div>

                  <div className={styles.caption} aria-live="polite">
                    <span className={styles.quoteMark} aria-hidden="true">“</span>
                    <p>{callState === "permission" ? "Permita o acesso ao microfone no navegador. Assim que você confirmar, a Eva entra na chamada." : caption}</p>
                  </div>

                  {callState === "permission" && (
                    <div className={styles.permissionHint}>
                      <span aria-hidden="true">●</span>
                      O pedido de microfone pode aparecer no topo do navegador.
                    </div>
                  )}
                </div>

                {errorMessage && <div className={styles.error} role="alert">{errorMessage}</div>}

                {(showTranscript || callState === "chat") && (
                  <div className={styles.transcriptPanel}>
                    <div className={styles.transcriptHeader}>
                      <div><span>{callState === "chat" ? "Conversa com a Eva" : "Transcrição"}</span><small>Ao vivo</small></div>
                      <button type="button" onClick={() => setShowTranscript(false)} aria-label="Fechar transcrição">×</button>
                    </div>
                    <div className={styles.messages} aria-live="polite">
                      {transcript.length === 0 && <p className={styles.empty}>A conversa aparece aqui conforme vocês falam.</p>}
                      {transcript.map((line) => (
                        <div key={line.id} className={`${styles.message} ${line.role === "user" ? styles.messageUser : styles.messageEva}`}>
                          <span>{line.role === "user" ? "Você" : config.agentName}</span>
                          <p>{line.text}</p>
                        </div>
                      ))}
                    </div>
                    {callState === "chat" && (
                      <form className={styles.chatComposer} onSubmit={sendChat}>
                        <input value={chatInput} onChange={(event) => setChatInput(event.target.value)} placeholder={`Escreva para a ${config.agentName}…`} aria-label={`Mensagem para ${config.agentName}`} />
                        <button type="submit" disabled={chatBusy || !chatInput.trim()}>{chatBusy ? "…" : "Enviar"}</button>
                      </form>
                    )}
                  </div>
                )}

                {callState !== "chat" && (
                  <footer className={styles.controls}>
                    <button type="button" onClick={toggleMute} disabled={callState !== "connected"} className={muted ? styles.controlActive : ""}>
                      <span className={styles.controlIcon} aria-hidden="true">{muted ? "M" : "◉"}</span>
                      <small>{muted ? "Ativar áudio" : "Mudo"}</small>
                    </button>
                    <button type="button" onClick={() => setShowTranscript((value) => !value)} className={showTranscript ? styles.controlActive : ""}>
                      <span className={styles.controlIcon} aria-hidden="true">≡</span>
                      <small>Transcrição</small>
                    </button>
                    <button type="button" onClick={requestEnd} className={styles.hangup} disabled={!['calling', 'connected', 'permission'].includes(callState)}>
                      <span className={styles.controlIcon} aria-hidden="true">↘</span>
                      <small>Encerrar</small>
                    </button>
                  </footer>
                )}

                {callState === "ended" && (
                  <div className={styles.afterCall}>
                    <button type="button" onClick={() => void beginCall(origin)}>Ligar novamente</button>
                    {config.textFallback && <button type="button" onClick={switchToText}>Continuar por texto</button>}
                  </div>
                )}

                {callState === "error" && config.textFallback && (
                  <div className={styles.afterCall}>
                    <button type="button" onClick={switchToText}>Continuar por texto</button>
                    <button type="button" onClick={() => void beginCall(origin)}>Tentar novamente</button>
                  </div>
                )}
              </>
            )}
          </section>
        </div>
      )}
    </>
  );
}

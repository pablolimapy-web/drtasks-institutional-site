"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { type CSSProperties, type FormEvent, useEffect, useMemo, useState } from "react";
import { getFluxosHeroScene, nextFluxosHeroScene } from "@/lib/fluxosHeroSequence";
import styles from "./ProductPreview.module.css";

type ProductPreviewProps = {
  phaseIndex?: number;
  mode?: "hero" | "showcase";
  paused?: boolean;
};

type FluxRow = {
  os: string;
  project: string;
  institution: string;
  type: string;
  workspace: string;
  responsible: string;
  days: string;
  cycle: string;
  schedule: string;
  stage: string;
  health: number;
  progress: number;
  priority: "M" | "A";
  tag?: string;
  value?: string;
  taskCount?: number;
  regressions?: number;
};

type DrawerTab = "Resumo" | "Tarefas" | "Registros" | "Comentários";
type RowOverride = Partial<Pick<FluxRow, "stage" | "progress">>;

type ModulePreview = {
  eyebrow: string;
  title: string;
  description: string;
  metrics: readonly [readonly [string, string], readonly [string, string], readonly [string, string]];
};

type NavGroup = {
  label?: string;
  items: readonly string[];
};

type IconName =
  | "menu"
  | "dashboard"
  | "building"
  | "grid"
  | "projects"
  | "tasks"
  | "bolt"
  | "folder"
  | "pin"
  | "wallet"
  | "chat"
  | "users"
  | "clock"
  | "card"
  | "help"
  | "file"
  | "settings"
  | "trash"
  | "search"
  | "checklist"
  | "bell"
  | "image"
  | "sparkles"
  | "chevronDown"
  | "chevronRight"
  | "panel"
  | "filter"
  | "mail"
  | "summary"
  | "history"
  | "comment"
  | "paperclip"
  | "send"
  | "edit"
  | "delete"
  | "finance"
  | "alert"
  | "coins"
  | "bars"
  | "pulse";

const KPI = [
  { value: "323", label: "Ativas", tone: "violet", icon: "grid" },
  { value: "R$ 3,4M", label: "Futura", tone: "green", icon: "coins" },
  { value: "2", label: "Em Risco", tone: "amber", icon: "alert" },
  { value: "R$ 3,4M", label: "Dispon.", tone: "blue", icon: "bars" },
  { value: "82", label: "Faturam. At.", tone: "red", icon: "pulse" },
] as const;

const STAGES = [
  { label: "ORÇAMENTO", color: "#5B6FE8" },
  { label: "ENVIADA", color: "#4E7BF2" },
  { label: "APROVADO", color: "#3C88E8" },
  { label: "ORÇ.M/M", color: "#338EDB" },
  { label: "CONTRATO", color: "#2C97D8" },
  { label: "AG.PGTO", color: "#2D9FCF" },
  { label: "EM ANDAM.", color: "#28A8C7" },
  { label: "ELAB.REL.", color: "#27AEC0" },
] as const;

const ROWS: FluxRow[] = [
  { os: "10", project: "130 - N° 09/2025 - MANUTENÇÃO EM SUBESTAÇÃO", institution: "130 - ANATEL SC", type: "Serviço", workspace: "Sem workspace", responsible: "Ryan Lucca", days: "62d", cycle: "62d", schedule: "Definido", stage: "EM ANDAM.", health: 49, progress: 45, priority: "M", tag: "compras", value: "46.355,95", taskCount: 0, regressions: 1 },
  { os: "11", project: "130 - N° 06/2025 - IMPLANTAÇÃO DE SHP", institution: "130 - ANATEL SC", type: "Serviço", workspace: "Sem workspace", responsible: "Ryan Lucca", days: "57d", cycle: "57d", schedule: "Definido", stage: "EM ANDAM.", health: 87, progress: 13, priority: "M", value: "139.000,00", taskCount: 0, regressions: 0 },
  { os: "13", project: "102 - LT14 - OS 663/1130 - MANUTENÇÃO DE COBERTURA", institution: "102 - SESA PR", type: "Serviço", workspace: "2 - LOTE 14 - CAM", responsible: "Kaiky Silva Oliveira", days: "55d", cycle: "55d", schedule: "Datas", stage: "AG.PGTO", health: 76, progress: 31, priority: "A", value: "3.650,28", taskCount: 0, regressions: 0 },
  { os: "14", project: "102 - LT14 - OS 1790 - PROTEÇÃO CONTRA SINANTRÓPICOS", institution: "102 - SESA PR", type: "Serviço", workspace: "2 - LOTE 14 - CAM", responsible: "Kaiky Silva Oliveira", days: "55d", cycle: "55d", schedule: "Datas", stage: "AG.PGTO", health: 76, progress: 28, priority: "A", value: "3.459,53", taskCount: 0, regressions: 0 },
  { os: "15", project: "102 - LT14 - OS 1770 - REPARO ESTRUTURAL EM CONCRETO", institution: "102 - SESA PR", type: "Serviço", workspace: "2 - LOTE 14 - CAM", responsible: "Kaiky Silva Oliveira", days: "55d", cycle: "55d", schedule: "Datas", stage: "AG.PGTO", health: 76, progress: 34, priority: "A", value: "4.098,45", taskCount: 0, regressions: 0 },
  { os: "16", project: "102 - LT14 - OS 1771 - INSPEÇÃO E REPARO ESTRUTURAL", institution: "102 - SESA PR", type: "Serviço", workspace: "2 - LOTE 14 - CAM", responsible: "Kaiky Silva Oliveira", days: "55d", cycle: "55d", schedule: "Datas", stage: "AG.PGTO", health: 76, progress: 29, priority: "A", value: "5.298,74", taskCount: 0, regressions: 0 },
  { os: "17", project: "102 - LT14 - OS 1746 - MANUTENÇÃO DE ESTRUTURA", institution: "102 - SESA PR", type: "Serviço", workspace: "2 - LOTE 14 - CAM", responsible: "Kaiky Silva Oliveira", days: "55d", cycle: "55d", schedule: "Datas", stage: "AG.PGTO", health: 74, progress: 37, priority: "A", value: "8.328,48", taskCount: 0, regressions: 0 },
  { os: "20", project: "102 - LT16 - OS 362 - REVESTIMENTO DE BANHEIRO", institution: "102 - SESA PR", type: "Serviço", workspace: "A PR - LOTE 16", responsible: "Kaiky Silva Oliveira", days: "83d", cycle: "83d", schedule: "Definido", stage: "CONTRATO", health: 87, progress: 61, priority: "A", value: "894,24", taskCount: 0, regressions: 0 },
  { os: "22", project: "102 - LT16 - OS 1583 - INFRAESTRUTURA DE PROJEÇÃO", institution: "102 - SESA PR", type: "Serviço", workspace: "A PR - LOTE 16", responsible: "Kaiky Silva Oliveira", days: "0d", cycle: "0d", schedule: "Definido", stage: "APROVADO", health: 79, progress: 42, priority: "A", value: "2.234,55", taskCount: 0, regressions: 0 },
];

const NAV_GROUPS: readonly NavGroup[] = [
  { items: ["Dashboard"] },
  { label: "INÍCIO DO TRABALHO", items: ["Instituições", "Workspace", "Projetos", "Tarefas"] },
  { label: "GESTÃO", items: ["FluxOS"] },
  { label: "RECURSOS", items: ["Arquivos", "Localização"] },
  { label: "FINANCEIRO", items: ["Financeiro"] },
  { label: "COMUNICAÇÃO", items: ["Chat", "Usuários", "Gestão de Tempo"] },
  { label: "MENU", items: ["Planos", "FAQs.", "Termos & Condições", "Configurações", "Lixeira"] },
] as const;

const NAV_ICONS: Record<string, IconName> = {
  Dashboard: "dashboard",
  Instituições: "building",
  Workspace: "grid",
  Projetos: "projects",
  Tarefas: "tasks",
  FluxOS: "bolt",
  Arquivos: "folder",
  Localização: "pin",
  Financeiro: "wallet",
  Chat: "chat",
  Usuários: "users",
  "Gestão de Tempo": "clock",
  Planos: "card",
  "FAQs.": "help",
  "Termos & Condições": "file",
  Configurações: "settings",
  Lixeira: "trash",
};

const MODULE_PREVIEWS: Record<string, ModulePreview> = {
  Dashboard: { eyebrow: "Visão geral", title: "A operação inteira em um relance.", description: "Indicadores, pendências e próximos movimentos concentrados em uma leitura rápida.", metrics: [["Projetos ativos", "42"], ["Tarefas hoje", "86"], ["Alertas", "7"]] },
  Instituições: { eyebrow: "Início do trabalho", title: "Instituições organizadas por contexto.", description: "Contratos, equipes e projetos relacionados aparecem juntos sem perder rastreabilidade.", metrics: [["Instituições", "18"], ["Contratos", "31"], ["Ativas", "16"]] },
  Workspace: { eyebrow: "Início do trabalho", title: "Workspaces separam operações sem separar o contexto.", description: "Cada frente pode organizar projetos, pessoas e rotinas mantendo a visão da operação.", metrics: [["Workspaces", "6"], ["Projetos", "42"], ["Equipes", "8"]] },
  Projetos: { eyebrow: "Início do trabalho", title: "Projetos com progresso e responsabilidade visíveis.", description: "Cada projeto mostra avanço, responsável e pontos que exigem atenção antes de virar atraso.", metrics: [["Em andamento", "29"], ["No prazo", "24"], ["Atenção", "5"]] },
  Tarefas: { eyebrow: "Início do trabalho", title: "O trabalho de hoje sem caça ao contexto.", description: "Prioridades, responsáveis e dependências aparecem em uma fila operacional simples.", metrics: [["Para hoje", "38"], ["Bloqueadas", "4"], ["Concluídas", "71"]] },
  Arquivos: { eyebrow: "Recursos", title: "Arquivos ligados ao trabalho certo.", description: "Documentos ficam associados a projetos, OS e tarefas para reduzir versões perdidas.", metrics: [["Recentes", "24"], ["Compartilhados", "62"], ["Pendências", "3"]] },
  Localização: { eyebrow: "Recursos", title: "Equipes e frentes com localização operacional.", description: "Visualize onde o trabalho está acontecendo e conecte o campo ao acompanhamento da operação.", metrics: [["Frentes", "12"], ["Em campo", "27"], ["Rotas", "9"]] },
  Financeiro: { eyebrow: "Financeiro", title: "Execução e financeiro conversando no mesmo fluxo.", description: "Valores previstos e realizados acompanham o andamento operacional sem duplicar controles.", metrics: [["Previsto", "R$ 3,1M"], ["Realizado", "R$ 2,4M"], ["A liberar", "R$ 420K"]] },
  Chat: { eyebrow: "Comunicação", title: "Conversas conectadas ao contexto do trabalho.", description: "Decisões e mensagens permanecem próximas do projeto, tarefa ou OS em que surgiram.", metrics: [["Conversas", "14"], ["Menções", "6"], ["Resolvidas", "21"]] },
  Usuários: { eyebrow: "Comunicação", title: "Papéis e acessos organizados por responsabilidade.", description: "Permissões e participação ficam claras para que cada pessoa veja o que precisa operar.", metrics: [["Usuários", "58"], ["Equipes", "8"], ["Perfis", "6"]] },
  "Gestão de Tempo": { eyebrow: "Comunicação", title: "Tempo registrado junto da execução.", description: "Horas, apontamentos e produtividade permanecem conectados ao trabalho que os originou.", metrics: [["Hoje", "126h"], ["Equipe", "27"], ["Pendentes", "5"]] },
  Planos: { eyebrow: "Menu", title: "Plano, limites e uso em uma leitura simples.", description: "A administração acompanha assinatura e capacidade disponível sem sair do ambiente.", metrics: [["Plano", "Pro"], ["Usuários", "58"], ["Uso", "74%"]] },
  "FAQs.": { eyebrow: "Menu", title: "Ajuda contextual para dúvidas frequentes.", description: "Respostas rápidas ajudam a equipe a continuar trabalhando sem interromper a operação.", metrics: [["Guias", "32"], ["Artigos", "84"], ["Novos", "6"]] },
  "Termos & Condições": { eyebrow: "Menu", title: "Políticas e termos centralizados.", description: "Documentos institucionais ficam disponíveis no próprio ambiente administrativo.", metrics: [["Documentos", "8"], ["Atualizados", "8"], ["Pendentes", "0"]] },
  Configurações: { eyebrow: "Menu", title: "Preferências da operação em um só lugar.", description: "Parâmetros gerais, notificações e regras podem ser ajustados conforme a empresa.", metrics: [["Regras", "26"], ["Integrações", "7"], ["Ativas", "19"]] },
  Lixeira: { eyebrow: "Menu", title: "Itens removidos continuam recuperáveis.", description: "A equipe mantém segurança operacional com histórico e restauração controlada.", metrics: [["Itens", "12"], ["7 dias", "4"], ["Restaurados", "3"]] },
};

const DRAWER_TABS: DrawerTab[] = ["Resumo", "Tarefas", "Registros", "Comentários"];
const TOTAL_ITEMS = 323;

function UiIcon({ name, className }: { name: IconName; className?: string }) {
  const common = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className,
    "aria-hidden": true,
  };

  switch (name) {
    case "menu": return <svg {...common}><path d="M4 7h16M4 12h16M4 17h16" /></svg>;
    case "dashboard": return <svg {...common}><rect x="4" y="4" width="7" height="7" rx="1.8" /><rect x="13" y="4" width="7" height="5" rx="1.8" /><rect x="13" y="11" width="7" height="9" rx="1.8" /><rect x="4" y="13" width="7" height="7" rx="1.8" /></svg>;
    case "building": return <svg {...common}><path d="M7 20V7l5-3 5 3v13" /><path d="M4 20h16" /><path d="M9 10h.01M15 10h.01M9 14h.01M15 14h.01" /></svg>;
    case "grid": return <svg {...common}><rect x="4" y="4" width="6" height="6" rx="1.5" /><rect x="14" y="4" width="6" height="6" rx="1.5" /><rect x="4" y="14" width="6" height="6" rx="1.5" /><rect x="14" y="14" width="6" height="6" rx="1.5" /></svg>;
    case "projects": return <svg {...common}><path d="M4 7h7M4 12h16M4 17h11" /><circle cx="18" cy="7" r="2" /><circle cx="12" cy="17" r="2" /></svg>;
    case "tasks": return <svg {...common}><path d="M9 6h11M9 12h11M9 18h11" /><path d="M4 6l1.5 1.5L7.5 5" /><path d="M4 12l1.5 1.5L7.5 11" /><path d="M4 18l1.5 1.5L7.5 17" /></svg>;
    case "bolt": return <svg {...common}><path d="M13 2 6 13h5l-1 9 7-11h-5l1-9Z" /></svg>;
    case "folder": return <svg {...common}><path d="M3 7h6l2 2h10v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z" /></svg>;
    case "pin": return <svg {...common}><path d="M12 21s6-5.2 6-11a6 6 0 1 0-12 0c0 5.8 6 11 6 11Z" /><circle cx="12" cy="10" r="2.4" /></svg>;
    case "wallet": return <svg {...common}><path d="M4 8.5A2.5 2.5 0 0 1 6.5 6H18a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6.5A2.5 2.5 0 0 1 4 15.5Z" /><path d="M16 12h4" /><circle cx="16" cy="12" r="0.6" fill="currentColor" stroke="none" /></svg>;
    case "chat": return <svg {...common}><path d="M5 6.5h14a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H10l-4 3v-3H5a2 2 0 0 1-2-2v-6a2 2 0 0 1 2-2Z" /><path d="M8 10h8M8 13h5" /></svg>;
    case "users": return <svg {...common}><path d="M16 21v-1.5a3.5 3.5 0 0 0-3.5-3.5h-1A3.5 3.5 0 0 0 8 19.5V21" /><circle cx="12" cy="9" r="3.2" /><path d="M19.5 20v-1a3 3 0 0 0-2.2-2.9" /><path d="M6.7 16.1A3 3 0 0 0 4.5 19v1" /></svg>;
    case "clock": return <svg {...common}><circle cx="12" cy="12" r="8" /><path d="M12 8v4.2l2.7 2.1" /><path d="M5.3 5.3 3.9 3.9M18.7 5.3l1.4-1.4" /></svg>;
    case "card": return <svg {...common}><rect x="3" y="6" width="18" height="12" rx="2.4" /><path d="M3 10h18M7 14h4" /></svg>;
    case "help": return <svg {...common}><circle cx="12" cy="12" r="8" /><path d="M9.8 9.5a2.4 2.4 0 1 1 3.9 2c-.9.7-1.7 1.2-1.7 2.5" /><circle cx="12" cy="17" r="0.8" fill="currentColor" stroke="none" /></svg>;
    case "file": return <svg {...common}><path d="M8 3h6l4 4v14H8a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z" /><path d="M14 3v4h4" /><path d="M9 12h6M9 16h6" /></svg>;
    case "settings": return <svg {...common}><circle cx="12" cy="12" r="2.7" /><path d="M19 12a7 7 0 0 0-.1-1l2-1.5-2-3.4-2.4 1a7 7 0 0 0-1.7-1l-.3-2.5h-4l-.3 2.5a7 7 0 0 0-1.7 1l-2.4-1-2 3.4 2 1.5a7 7 0 0 0 0 2l-2 1.5 2 3.4 2.4-1a7 7 0 0 0 1.7 1l.3 2.5h4l.3-2.5a7 7 0 0 0 1.7-1l2.4 1 2-3.4-2-1.5c.1-.3.1-.7.1-1Z" /></svg>;
    case "trash": return <svg {...common}><path d="M4 7h16" /><path d="M9 7V5h6v2" /><path d="M7 7l1 12h8l1-12" /><path d="M10 11v5M14 11v5" /></svg>;
    case "search": return <svg {...common}><circle cx="11" cy="11" r="6" /><path d="m20 20-3.5-3.5" /></svg>;
    case "checklist": return <svg {...common}><path d="M9 6h11M9 12h11M9 18h11" /><path d="M4.5 6.5h.01M4.5 12.5h.01M4.5 18.5h.01" /></svg>;
    case "bell": return <svg {...common}><path d="M7 10a5 5 0 1 1 10 0c0 5 2 6 2 6H5s2-1 2-6" /><path d="M10 18a2 2 0 0 0 4 0" /></svg>;
    case "image": return <svg {...common}><rect x="4" y="5" width="16" height="14" rx="2" /><circle cx="9" cy="10" r="1.3" /><path d="m20 15-4.5-4.5L8 18" /></svg>;
    case "sparkles": return <svg {...common}><path d="m12 3 1.2 3.6L17 8l-3.8 1.4L12 13l-1.2-3.6L7 8l3.8-1.4Z" /><path d="m18.5 14.5.6 1.8 1.9.6-1.9.6-.6 1.8-.6-1.8-1.9-.6 1.9-.6ZM5.5 14l.8 2.3 2.2.7-2.2.7-.8 2.3-.8-2.3-2.2-.7 2.2-.7Z" /></svg>;
    case "chevronDown": return <svg {...common}><path d="m6 9 6 6 6-6" /></svg>;
    case "chevronRight": return <svg {...common}><path d="m9 6 6 6-6 6" /></svg>;
    case "panel": return <svg {...common}><rect x="4" y="5" width="16" height="14" rx="2" /><path d="M9 5v14" /></svg>;
    case "filter": return <svg {...common}><path d="M4 6h16M7 12h10M10 18h4" /></svg>;
    case "mail": return <svg {...common}><rect x="4" y="6" width="16" height="12" rx="2" /><path d="m5 8 7 5 7-5" /></svg>;
    case "summary": return <svg {...common}><path d="M6 5h4v4H6zM14 5h4v4h-4zM6 15h4v4H6z" /><path d="M14 15h4M14 18h4" /></svg>;
    case "history": return <svg {...common}><path d="M4 12a8 8 0 1 0 2.3-5.7" /><path d="M4 4v5h5" /><path d="M12 8v4l2.5 1.5" /></svg>;
    case "comment": return <svg {...common}><path d="M5 6.5h14a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H9l-4 3v-3H5a2 2 0 0 1-2-2v-6a2 2 0 0 1 2-2Z" /></svg>;
    case "paperclip": return <svg {...common}><path d="M9.5 13.5 15 8a3 3 0 1 1 4.2 4.2l-7.1 7.1a5 5 0 0 1-7.1-7.1l7.1-7.1" /></svg>;
    case "send": return <svg {...common}><path d="m4 12 16-7-4 14-3.5-5.5L4 12Z" /><path d="M12.5 13.5 20 5" /></svg>;
    case "edit": return <svg {...common}><path d="m4 20 4.5-1 9-9a2.1 2.1 0 0 0-3-3l-9 9L4 20Z" /><path d="m13.5 6.5 3 3" /></svg>;
    case "delete": return <svg {...common}><rect x="6" y="5" width="12" height="15" rx="2" /><path d="M9 9h6M9 12h6" /></svg>;
    case "finance": return <svg {...common}><path d="M8.5 9.5a3.5 3.5 0 1 0 0 5" /><path d="M8.5 6.5v3M8.5 14.5v3" /><path d="M13 8h6M13 12h6M13 16h4" /></svg>;
    case "alert": return <svg {...common}><path d="M12 4 3.5 19h17L12 4Z" /><path d="M12 9v4" /><circle cx="12" cy="16.2" r="0.8" fill="currentColor" stroke="none" /></svg>;
    case "coins": return <svg {...common}><circle cx="12" cy="12" r="7.5" /><path d="M9.7 9.8c.5-.8 1.4-1.3 2.5-1.3 1.5 0 2.8.8 2.8 2.2 0 3-5.6 1.4-5.6 4.4 0 1.2 1.1 2 2.8 2 1.2 0 2.1-.4 2.7-1.1" /><path d="M12 7.2v10" /></svg>;
    case "bars": return <svg {...common}><path d="M6 18V11M12 18V7M18 18V9" /></svg>;
    case "pulse": return <svg {...common}><path d="M3 12h4l2-4 3 8 2-4h7" /></svg>;
    default: return null;
  }
}

function Drop({ index }: { index: number }) {
  return <span className={styles.drop} style={{ "--i": index } as CSSProperties} />;
}

export function ProductPreview({ phaseIndex: _phaseIndex = 0, mode = "hero", paused = false }: ProductPreviewProps) {
  const reducedMotion = useReducedMotion();
  const firstSceneIndex = mode === "showcase" ? 1 : 0;
  const [sceneIndex, setSceneIndex] = useState(firstSceneIndex);
  const [pointerInside, setPointerInside] = useState(false);
  const [interactionMode, setInteractionMode] = useState(false);
  const [activeNav, setActiveNav] = useState("FluxOS");
  const [activeKpi, setActiveKpi] = useState<number | null>(null);
  const [activeStage, setActiveStage] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOs, setSelectedOs] = useState(ROWS[0].os);
  const [manualDrawerOpen, setManualDrawerOpen] = useState(false);
  const [activeDrawerTab, setActiveDrawerTab] = useState<DrawerTab>("Resumo");
  const [rowOverrides, setRowOverrides] = useState<Record<string, RowOverride>>({});
  const [createdRows, setCreatedRows] = useState<FluxRow[]>([]);
  const [compactTable, setCompactTable] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [newOsOpen, setNewOsOpen] = useState(false);
  const [newOsTitle, setNewOsTitle] = useState("");
  const [newOsInstitution, setNewOsInstitution] = useState("");
  const [newOsPriority, setNewOsPriority] = useState<"M" | "A">("M");
  const scene = getFluxosHeroScene(sceneIndex);

  const nextSceneIndex = (current: number) => {
    const next = nextFluxosHeroScene(current);
    return mode === "showcase" && next === 0 ? firstSceneIndex : next;
  };

  useEffect(() => {
    setSceneIndex(firstSceneIndex);
  }, [firstSceneIndex]);

  useEffect(() => {
    if (reducedMotion) {
      setSceneIndex(mode === "showcase" ? 5 : 3);
    }
  }, [mode, reducedMotion]);

  const hoverPaused = pointerInside && sceneIndex >= 1;

  useEffect(() => {
    if (reducedMotion || paused) return;
    if (interactionMode || hoverPaused) return;
    const timeout = window.setTimeout(() => setSceneIndex((current) => nextSceneIndex(current)), scene.durationMs);
    return () => window.clearTimeout(timeout);
  }, [mode, paused, interactionMode, hoverPaused, reducedMotion, sceneIndex, scene.durationMs]);

  useEffect(() => {
    if (!feedback) return;
    const timeout = window.setTimeout(() => setFeedback(null), 2300);
    return () => window.clearTimeout(timeout);
  }, [feedback]);

  const enterInteractionMode = () => {
    setInteractionMode(true);
    setSceneIndex((current) => Math.max(current, 3));
  };

  const resetDemo = () => {
    setInteractionMode(false);
    setActiveNav("FluxOS");
    setActiveKpi(null);
    setActiveStage(null);
    setSearchTerm("");
    setSelectedOs(ROWS[0].os);
    setManualDrawerOpen(false);
    setActiveDrawerTab("Resumo");
    setRowOverrides({});
    setCreatedRows([]);
    setCompactTable(false);
    setFeedback(null);
    setNewOsOpen(false);
    setNewOsTitle("");
    setNewOsInstitution("");
    setNewOsPriority("M");
    setSceneIndex(firstSceneIndex);
  };

  const effectiveRows = useMemo(
    () => [...ROWS, ...createdRows].map((row) => ({ ...row, ...(rowOverrides[row.os] ?? {}) })),
    [createdRows, rowOverrides],
  );

  const selected = effectiveRows.find((row) => row.os === selectedOs) ?? effectiveRows[0];

  const filteredRows = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLocaleLowerCase("pt-BR");
    return effectiveRows.filter((row) => {
      const searchMatches = !normalizedSearch || [row.os, row.project, row.institution, row.responsible, row.stage, row.workspace, row.tag ?? ""]
        .join(" ")
        .toLocaleLowerCase("pt-BR")
        .includes(normalizedSearch);
      const stageMatches = !activeStage || row.stage === activeStage;
      const kpiMatches = activeKpi === null
        || activeKpi === 0
        || (activeKpi === 1 && Boolean(row.value))
        || (activeKpi === 2 && row.health < 70)
        || (activeKpi === 3 && row.progress >= 40)
        || (activeKpi === 4 && row.stage === "AG.PGTO");
      return searchMatches && stageMatches && kpiMatches;
    });
  }, [activeKpi, activeStage, effectiveRows, searchTerm]);

  const openRow = (os: string) => {
    enterInteractionMode();
    setSelectedOs(os);
    setActiveDrawerTab("Resumo");
    setManualDrawerOpen(true);
  };

  const chooseKpi = (index: number) => {
    enterInteractionMode();
    setActiveKpi((current) => current === index ? null : index);
    setActiveStage(null);
    setFeedback(activeKpi === index ? "Filtro removido" : `Indicador ${KPI[index].label} aplicado`);
  };

  const chooseStage = (stage: string) => {
    enterInteractionMode();
    setActiveStage((current) => current === stage ? null : stage);
    setActiveKpi(null);
  };

  const chooseNav = (item: string) => {
    enterInteractionMode();
    setActiveNav(item);
    setManualDrawerOpen(false);
    setNewOsOpen(false);
    setFeedback(item === "FluxOS" ? "FluxOS aberto" : `${item}: prévia do módulo`);
  };

  const advanceSelectedRow = () => {
    const currentStageIndex = Math.max(0, STAGES.findIndex((stage) => stage.label === selected.stage));
    const nextStage = STAGES[Math.min(currentStageIndex + 1, STAGES.length - 1)].label;
    if (nextStage === selected.stage) {
      setFeedback("Esta OS já está na última etapa da demonstração");
      return;
    }
    setRowOverrides((current) => ({
      ...current,
      [selected.os]: {
        ...(current[selected.os] ?? {}),
        stage: nextStage,
        progress: Math.min(100, selected.progress + 8),
      },
    }));
    setFeedback(`OS #${selected.os} avançou para ${nextStage}`);
  };

  const openNewOs = () => {
    enterInteractionMode();
    setManualDrawerOpen(false);
    setNewOsOpen(true);
  };

  const createOs = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!newOsTitle.trim() || !newOsInstitution.trim()) {
      setFeedback("Preencha o título e a instituição da OS");
      return;
    }
    const nextOs = String(Math.max(...effectiveRows.map((row) => Number.parseInt(row.os, 10) || 0)) + 1);
    const row: FluxRow = {
      os: nextOs,
      project: newOsTitle.trim(),
      institution: newOsInstitution.trim(),
      type: "Serviço",
      workspace: "Sem workspace",
      responsible: "Pablo Lima",
      days: "0d",
      cycle: "0d",
      schedule: "Definir",
      stage: "ORÇAMENTO",
      health: 100,
      progress: 0,
      priority: newOsPriority,
      value: "0,00",
      taskCount: 0,
      regressions: 0,
    };
    setCreatedRows((current) => [row, ...current]);
    setSelectedOs(nextOs);
    setNewOsOpen(false);
    setNewOsTitle("");
    setNewOsInstitution("");
    setNewOsPriority("M");
    setFeedback(`OS #${nextOs} criada na demonstração`);
  };

  const intro = scene.id === "brandIntro";
  const shellBuilt = sceneIndex >= 1;
  const kpiFocus = scene.id === "kpiFocus";
  const tableScaffold = sceneIndex >= 2;
  const tableRowsReady = sceneIndex >= 3;
  const rowSpotlight = !interactionMode && scene.id === "rowSpotlight";
  const drawerOpen = activeNav === "FluxOS" && (interactionMode ? manualDrawerOpen : sceneIndex >= 5);
  const showKpiAnnotations = !interactionMode && mode === "hero" && scene.id === "kpiFocus";
  const showTableAnnotation = !interactionMode && mode === "hero" && (scene.id === "tableBuild" || scene.id === "rowSpotlight");
  const showDrawerAnnotation = !interactionMode && mode === "hero" && (scene.id === "drawer" || scene.id === "drawerCallouts");

  return (
    <div
      className={`${styles.showcase} ${mode === "showcase" ? styles.showcaseMode : ""} ${interactionMode ? styles.interactive : ""}`}
      role="region"
      aria-label="Demonstração interativa do FluxOS"
      onPointerEnter={() => setPointerInside(true)}
      onPointerLeave={() => setPointerInside(false)}
      onPointerDown={enterInteractionMode}
      onFocusCapture={enterInteractionMode}
    >
      <motion.div
        className={styles.frame}
        initial={reducedMotion ? false : { opacity: 0, y: 18, scale: 0.975, rotateX: 1.5 }}
        animate={{ opacity: 1, y: 0, scale: drawerOpen ? 1.006 : 1, rotateX: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className={styles.screen}>
          <div className={styles.screenTexture} />

          <motion.aside
            className={styles.sidebar}
            initial={false}
            animate={{ opacity: shellBuilt ? 1 : 0, x: shellBuilt ? 0 : -56, filter: shellBuilt ? "blur(0px)" : "blur(7px)" }}
            transition={{ duration: 0.9, delay: shellBuilt ? 0.04 : 0, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className={styles.logoRow}>
              <span className={styles.menuGlyph}><UiIcon name="menu" className={styles.menuGlyphIcon} /></span>
              <img src="/hero/drtasks-wordmark.png" alt="DR TASKS" className={styles.sidebarLogo} />
            </div>
            <nav className={styles.sideNav} aria-label="Menu da demonstração">
              {NAV_GROUPS.map((group, groupIndex) => (
                <div className={styles.navGroup} key={group.label ?? `main-${groupIndex}`}>
                  {group.label && <span className={styles.navGroupLabel}>{group.label}</span>}
                  {group.items.map((item, itemIndex) => (
                    <motion.button
                      type="button"
                      key={item}
                      className={`${styles.navItem} ${item === activeNav ? styles.navActive : ""}`}
                      initial={false}
                      animate={{ opacity: shellBuilt ? 1 : 0, x: shellBuilt ? 0 : -20 }}
                      transition={{ duration: 0.4, delay: shellBuilt ? 0.14 + (groupIndex * 0.08) + itemIndex * 0.025 : 0, ease: [0.16, 1, 0.3, 1] }}
                      onClick={() => chooseNav(item)}
                      aria-pressed={item === activeNav}
                    >
                      <span className={styles.navIcon}><UiIcon name={NAV_ICONS[item] ?? "grid"} className={styles.iconSvg} /></span><b>{item}</b>{item === "Financeiro" && <em><UiIcon name="chevronRight" className={styles.iconSvg} /></em>}
                    </motion.button>
                  ))}
                </div>
              ))}
            </nav>
          </motion.aside>

          <motion.header
            className={styles.topbar}
            initial={false}
            animate={{ opacity: shellBuilt ? 1 : 0, y: shellBuilt ? 0 : -42, filter: shellBuilt ? "blur(0px)" : "blur(7px)" }}
            transition={{ duration: 0.82, delay: shellBuilt ? 0.12 : 0, ease: [0.16, 1, 0.3, 1] }}
          >
            <button
              type="button"
              className={`${styles.toggle} ${interactionMode ? styles.toggleOn : ""}`}
              aria-label={interactionMode ? "Sair do modo interativo" : "Ativar modo interativo"}
              onClick={() => interactionMode ? resetDemo() : enterInteractionMode()}
            />
            <label className={styles.search}>
              <span aria-hidden="true"><UiIcon name="search" className={styles.iconSvg} /></span>
              <input
                type="search"
                value={searchTerm}
                onChange={(event) => { enterInteractionMode(); setSearchTerm(event.target.value); setActiveNav("FluxOS"); }}
                placeholder="Pesquise aqui"
                aria-label="Pesquisar na demonstração"
              />
            </label>
            <div className={styles.topActions}>
              <button type="button" className={styles.notificationButton} onClick={() => setFeedback("45 atividades aguardam sua leitura")}><span><UiIcon name="checklist" className={styles.iconSvg} /></span><i>45</i></button>
              <button type="button" onClick={() => setFeedback("Nenhuma notificação crítica agora")}><UiIcon name="bell" className={styles.iconSvg} /></button>
              <button type="button" onClick={() => setFeedback("Central de arquivos aberta")}><UiIcon name="image" className={styles.iconSvg} /></button>
              <button type="button" onClick={() => setFeedback("Assistente operacional disponível")}><UiIcon name="sparkles" className={styles.iconSvg} /></button>
              <button type="button" className={styles.avatarButton} onClick={() => setFeedback("Perfil da demonstração")}>PL</button>
              <span className={styles.topChevron}><UiIcon name="chevronDown" className={styles.iconSvg} /></span>
            </div>
          </motion.header>

          <motion.main
            className={styles.appMain}
            initial={false}
            animate={{ opacity: shellBuilt ? 1 : 0, y: shellBuilt ? 0 : 28 }}
            transition={{ duration: 0.9, delay: shellBuilt ? 0.18 : 0, ease: [0.16, 1, 0.3, 1] }}
          >
            {activeNav === "FluxOS" ? (
              <>
                <motion.div
                  className={styles.titleBar}
                  initial={false}
                  animate={{ opacity: shellBuilt ? 1 : 0, x: shellBuilt ? 0 : 34 }}
                  transition={{ duration: 0.7, delay: shellBuilt ? 0.42 : 0 }}
                >
                  <div><h3><span>Flux</span>OS</h3><p>Visão clara da operação, do andamento aos resultados.</p></div>
                  <div className={styles.titleActions}>
                    <button
                      type="button"
                      className={compactTable ? styles.titleActionActive : ""}
                      onClick={() => { enterInteractionMode(); setCompactTable((value) => !value); }}
                    ><UiIcon name="panel" className={styles.inlineActionIcon} /> {compactTable ? "Compacto" : "Confortável"}
                    </button>
                    <button type="button" onClick={() => setFeedback("Opções de visualização disponíveis")}><UiIcon name="mail" className={styles.inlineActionIcon} /></button>
                    <button type="button" onClick={() => setFeedback("Filtros da grade disponíveis")}><UiIcon name="filter" className={styles.inlineActionIcon} /></button>
                    <button type="button" className={styles.newOsButton} onClick={openNewOs}>+ Nova OS</button>
                  </div>
                </motion.div>

                <div className={styles.kpiGrid}>
                  {KPI.map((item, index) => (
                    <motion.button
                      type="button"
                      key={item.label}
                      className={`${styles.kpiCard} ${styles[`tone_${item.tone}`]} ${activeKpi === index ? styles.kpiCardActive : ""}`}
                      data-tone={item.tone}
                      initial={false}
                      animate={{
                        opacity: shellBuilt ? 1 : 0,
                        y: shellBuilt ? (kpiFocus && !interactionMode ? -5 - (index % 2) * 2 : 0) : 24,
                        scale: kpiFocus && !interactionMode ? 1.035 : activeKpi === index ? 1.018 : 1,
                        boxShadow: kpiFocus && !interactionMode ? "0 14px 34px rgba(38, 61, 103, 0.11)" : "0 4px 12px rgba(34, 49, 77, 0.025)",
                      }}
                      transition={{ duration: 0.66, delay: shellBuilt ? 0.58 + index * 0.12 : 0, ease: [0.16, 1, 0.3, 1] }}
                      onClick={() => chooseKpi(index)}
                      aria-pressed={activeKpi === index}
                    >
                      <div><i className={styles.kpiIcon}><UiIcon name={item.icon} className={styles.iconSvg} /></i><strong>{item.value}</strong></div><span>{item.label}</span>
                    </motion.button>
                  ))}
                </div>

                <motion.section
                  className={`${styles.tableCard} ${compactTable ? styles.tableCardCompact : ""}`}
                  initial={false}
                  animate={{ opacity: tableScaffold ? 1 : 0, y: tableScaffold ? 0 : 38, scale: tableScaffold ? 1 : 0.982 }}
                  transition={{ duration: 0.92, delay: tableScaffold ? 0.3 : 0, ease: [0.16, 1, 0.3, 1] }}
                >
                  <motion.div
                    className={styles.tableScaffold}
                    initial={false}
                    animate={{ opacity: tableScaffold ? 1 : 0, clipPath: tableScaffold ? "inset(0% 0% 0% 0%)" : "inset(0% 100% 0% 0%)" }}
                    transition={{ duration: 1.1, delay: tableScaffold ? 0.42 : 0, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <div className={styles.groupBar}><span>FIXO · IDENTIFICAÇÃO</span><span>GRUPO 1 · PROJETO</span></div>
                    <div className={styles.stageRail}>
                      <button type="button" className={`${styles.stageRailLabel} ${activeStage === null ? styles.stageRailActive : ""}`} onClick={() => { enterInteractionMode(); setActiveStage(null); }} aria-label="Mostrar todo o fluxo">FLUXO</button>
                      {STAGES.map((stage, index) => (
                        <motion.button
                          type="button"
                          key={stage.label}
                          className={`${styles.stageRailItem} ${activeStage === stage.label ? styles.stageRailActive : ""}`}
                          style={{ "--stage": stage.color } as CSSProperties}
                          initial={false}
                          animate={{ opacity: tableScaffold ? 1 : 0, y: tableScaffold ? 0 : -8 }}
                          transition={{ duration: 0.38, delay: tableScaffold ? 0.68 + index * 0.06 : 0 }}
                          onClick={() => chooseStage(stage.label)}
                          aria-pressed={activeStage === stage.label}
                        ><i />{stage.label}</motion.button>
                      ))}
                    </div>
                    <div className={`${styles.tableHeader} ${styles.realTableGrid}`}>
                      <span>□</span><span>OS</span><span>+</span><span>PROJETO</span><span>T.</span><span>SECRETARIA / INST.</span><span>TIPO</span><span>WORKSPACE</span><span>C.</span><span>ETIQUETAS</span><span>P.</span><span>RESPONSÁVEL</span><span>STATUS</span><span>DIAS</span><span>CICLO</span><span>CRONOGRAMA</span>
                    </div>
                  </motion.div>

                  <div className={styles.rows}>
                    {filteredRows.map((row, index) => (
                      <motion.button
                        type="button"
                        key={row.os}
                        className={`${styles.tableRow} ${styles.realTableGrid} ${row.os === ROWS[0].os && rowSpotlight ? styles.rowSourceHidden : ""} ${interactionMode && selectedOs === row.os ? styles.tableRowActive : ""}`}
                        initial={false}
                        animate={{ opacity: tableRowsReady ? 1 : 0, x: tableRowsReady ? 0 : -78, y: tableRowsReady ? 0 : 7 }}
                        transition={{ duration: 0.68, delay: tableRowsReady ? 0.18 + index * 0.055 : 0, ease: [0.16, 1, 0.3, 1] }}
                        onClick={() => openRow(row.os)}
                        aria-label={`Abrir OS ${row.os}: ${row.project}`}
                      >
                        <span className={styles.checkCell}>□</span>
                        <span className={styles.osCell}>{row.os}</span>
                        <span className={styles.plusCell}>+</span>
                        <span className={styles.projectCell}>{row.project}</span>
                        <span className={styles.taskMini}>{row.taskCount ?? 0} <i>0</i></span>
                        <span>{row.institution}</span>
                        <span><em className={styles.typePill}>{row.type}</em></span>
                        <span><em className={styles.workspacePill}>{row.workspace}</em></span>
                        <span className={styles.personAvatar}>{row.responsible.split(" ").map((part) => part[0]).slice(0, 2).join("")}</span>
                        <span>{row.tag ? <em className={styles.tagPill}>{row.tag}</em> : <em className={styles.addTag}>◇ Adicionar</em>}</span>
                        <span><em className={`${styles.priorityPill} ${row.priority === "A" ? styles.priorityHigh : ""}`}>{row.priority}</em></span>
                        <span className={styles.responsibleCell}>{row.responsible}</span>
                        <span className={styles.statusDots}><i>I</i><i>C</i><i>N</i><i>S</i></span>
                        <span className={styles.days}>{row.days}</span>
                        <span>{row.cycle}</span>
                        <span><em className={`${styles.schedule} ${row.schedule !== "Definido" ? styles.warn : ""}`}>▣ {row.schedule}</em></span>
                      </motion.button>
                    ))}
                    {interactionMode && filteredRows.length === 0 && (
                      <div className={styles.emptyRows}>Nenhuma OS corresponde a este filtro. Clique novamente no indicador ou estágio para limpar.</div>
                    )}
                  </div>
                  <div className={styles.tableFooter}><span>Exibindo {Math.min(filteredRows.length, 100)} de {TOTAL_ITEMS}</span><span>Itens por página <b>100</b></span><i /></div>
                </motion.section>
              </>
            ) : (
              <motion.section key={activeNav} className={styles.modulePreview} initial={{ opacity: 0, y: 18 }} animate={{ opacity: shellBuilt ? 1 : 0, y: 0 }} transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}>
                <span className={styles.moduleEyebrow}>{MODULE_PREVIEWS[activeNav]?.eyebrow ?? "Dr. Tasks"}</span>
                <h3>{MODULE_PREVIEWS[activeNav]?.title ?? `${activeNav} no mesmo ambiente.`}</h3>
                <p>{MODULE_PREVIEWS[activeNav]?.description ?? "Uma prévia interativa deste módulo dentro da experiência comercial."}</p>
                <div className={styles.moduleMetrics}>
                  {(MODULE_PREVIEWS[activeNav]?.metrics ?? [["Itens", "24"], ["Hoje", "8"], ["Atenção", "2"]] as const).map(([label, value]) => (
                    <article key={label}><small>{label}</small><strong>{value}</strong><span /></article>
                  ))}
                </div>
                <div className={styles.moduleList}>
                  <div><i>01</i><span><b>Prioridade visível</b><small>O contexto mais importante aparece antes dos detalhes.</small></span><em>Agora</em></div>
                  <div><i>02</i><span><b>Responsável definido</b><small>Cada item mantém dono, prazo e próxima ação próximos.</small></span><em>Hoje</em></div>
                  <div><i>03</i><span><b>Histórico preservado</b><small>A equipe acompanha o que mudou sem procurar em várias telas.</small></span><em>7d</em></div>
                </div>
                <button type="button" className={styles.backToFluxos} onClick={() => chooseNav("FluxOS")}>← Voltar ao FluxOS</button>
              </motion.section>
            )}
          </motion.main>

          <AnimatePresence>
            {rowSpotlight && (
              <>
                <motion.div className={styles.overlay} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.55 }} />
                <motion.div className={styles.spotlightRow} initial={{ opacity: 0, y: 64, scale: 0.68, rotateX: -5 }} animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }} exit={{ opacity: 0, y: -20, scale: 0.94 }} transition={{ duration: 1.02, ease: [0.16, 1, 0.3, 1] }}>
                  <div className={styles.spotlightTop}><span className={styles.osBadge}>OS #{selected.os}</span><strong>{selected.project}</strong><span className={styles.healthBadge}>Saúde {selected.health}/100</span></div>
                  <div className={styles.spotlightGrid}>
                    <div><small>Instituição</small><b>{selected.institution}</b></div>
                    <div><small>Responsável</small><b>{selected.responsible}</b></div>
                    <div><small>Prazo</small><b>{selected.days}</b></div>
                    <div><small>Cronograma</small><b>{selected.schedule}</b></div>
                    <div><small>Estágio atual</small><b>{selected.stage}</b></div>
                    <div><small>Valor planejado</small><b>R$ {selected.value}</b></div>
                  </div>
                  <div className={styles.spotlightProgress}><span><i style={{ width: `${selected.progress}%` }} /></span><b>{selected.progress}% concluído</b></div>
                </motion.div>
              </>
            )}
          </AnimatePresence>

          <motion.button type="button" className={`${styles.drawerBackdrop} ${interactionMode && drawerOpen ? styles.drawerBackdropInteractive : ""}`} initial={false} animate={{ opacity: drawerOpen ? 1 : 0 }} transition={{ duration: 0.52 }} onClick={() => interactionMode && setManualDrawerOpen(false)} aria-label="Fechar detalhes da OS" tabIndex={interactionMode && drawerOpen ? 0 : -1} />

          <motion.aside className={styles.drawer} initial={false} animate={{ x: drawerOpen ? "0%" : "106%", opacity: drawerOpen ? 1 : 0 }} transition={{ duration: 1.05, ease: [0.16, 1, 0.3, 1] }} aria-hidden={!drawerOpen}>
            <div className={styles.drawerScroll}>
              <div className={styles.drawerHeader}>
                <div className={styles.drawerHeaderIdentity}>
                  <span className={styles.drawerIcon}>✓</span>
                  <div>
                    <div className={styles.drawerHeaderTitle}><strong>OS #{selected.os}</strong><button type="button" onClick={() => setFeedback("Edição rápida disponível na demonstração")}><UiIcon name="edit" className={styles.iconSvg} /></button><button type="button" className={styles.drawerDelete} onClick={() => setFeedback("Exclusão protegida na demonstração")}><UiIcon name="delete" className={styles.iconSvg} /></button></div>
                    <p>{selected.project}</p>
                    <small>EXECUÇÃO DOS SEGUINTES SERVIÇOS: - ADEQUAÇÃO DA SUBESTAÇÃO, DOS ITENS ELENCADOS NA VISTORIA...</small>
                    <button type="button" className={styles.attachLink} onClick={() => setFeedback("Link anexado à OS")}><UiIcon name="paperclip" className={styles.inlineButtonIcon} /> Anexar link</button>
                  </div>
                </div>
                <button type="button" className={styles.drawerClose} onClick={() => { enterInteractionMode(); setManualDrawerOpen(false); }} aria-label="Fechar painel da OS"><UiIcon name="chevronRight" className={styles.iconSvg} /></button>
              </div>

              <div className={styles.drawerTabs}>
                {DRAWER_TABS.map((tab) => (
                  <button type="button" key={tab} className={activeDrawerTab === tab ? styles.drawerTabActive : ""} onClick={() => { enterInteractionMode(); setActiveDrawerTab(tab); }} aria-pressed={activeDrawerTab === tab}>
                    <span>{tab === "Resumo" ? <UiIcon name="summary" className={styles.iconSvg} /> : tab === "Tarefas" ? <UiIcon name="tasks" className={styles.iconSvg} /> : tab === "Registros" ? <UiIcon name="history" className={styles.iconSvg} /> : <UiIcon name="comment" className={styles.iconSvg} />}</span>{tab}{tab === "Registros" && <em>16</em>}
                  </button>
                ))}
              </div>
              <button type="button" className={styles.drawerFinance} onClick={() => setFeedback("Financeiro da OS disponível no módulo completo")}><UiIcon name="finance" className={styles.inlineButtonIcon} /> Financeiro</button>

              {activeDrawerTab === "Resumo" && (
                <>
                  <section className={styles.drawerSection}>
                    <h4>◎ Estágio atual</h4>
                    <motion.div className={styles.stageCard} initial={false} animate={{ y: drawerOpen ? 0 : 18, opacity: drawerOpen ? 1 : 0 }} transition={{ duration: 0.62, delay: drawerOpen ? 0.18 : 0 }}>
                      <div className={styles.stageCardTop}><small>ETAPA</small><em>{selected.health < 70 ? "FORA DO SLA" : "EM ACOMPANHAMENTO"}</em></div>
                      <h3>{selected.stage}</h3>
                      <div className={styles.stageMetrics}><div><small>DIAS NO ESTÁGIO</small><strong>{selected.days.replace("d", "")}<em>/30</em></strong></div><div><small>SALDO SLA</small><strong>+{Math.max(0, Number.parseInt(selected.days, 10) - 30)}</strong></div><div><small>REGRESSÕES</small><strong>{selected.regressions ?? 0}</strong></div></div>
                      <p>⊙ <b>Sugestão: avançar para {selected.stage === "EM ANDAM." ? "ELAB.REL." : "a próxima etapa"}.</b><br /><span>Não há marcos obrigatórios pendentes para a próxima etapa.</span></p>
                      <button type="button" className={styles.primaryAction} onClick={advanceSelectedRow}>→ Avançar para próximo estágio</button>
                      <button type="button" className={styles.secondaryAction} onClick={() => setFeedback(`Arquivos da OS #${selected.os} destacados`)}>📎 Arquivos desta OS</button>
                      <button type="button" className={styles.secondaryAction} onClick={() => setFeedback("Avanço sugerido analisado")}>Avançar sugerido</button>
                      <button type="button" className={styles.secondaryAction} onClick={() => setFeedback("Medição do dia registrada")}>Registrar medição do dia</button>
                    </motion.div>
                  </section>
                  <section className={styles.drawerSection}>
                    <h4>♡ Saúde da OS</h4>
                    <motion.div className={styles.healthCard} initial={false} animate={{ y: drawerOpen ? 0 : 18, opacity: drawerOpen ? 1 : 0 }} transition={{ duration: 0.62, delay: drawerOpen ? 0.28 : 0 }}>
                      <div><small>SAÚDE</small><em>{selected.health < 70 ? "CRÍTICA" : "ESTÁVEL"}</em></div>
                      <div className={styles.healthScore}><strong>{selected.health}<small>/100</small></strong><b>{selected.health < 70 ? "4,4×" : `${selected.progress}%`}</b></div>
                      <span><motion.i initial={false} animate={{ width: drawerOpen ? `${selected.health}%` : "0%" }} transition={{ duration: 0.8, delay: drawerOpen ? 0.4 : 0 }} /></span>
                      <p>Momentum estagnado · 0 dias sem evolução</p>
                    </motion.div>
                  </section>
                  <section className={styles.drawerSection}>
                    <h4>ⓘ Informações gerais</h4>
                    <div className={styles.infoCard}>
                      <div><small>INSTITUIÇÃO</small><b>{selected.institution}</b></div><div><small>TIPO</small><b>{selected.type}</b></div>
                      <div><small>WORKSPACE</small><b>{selected.workspace}</b></div><div><small>RESPONSÁVEL</small><b>{selected.responsible}</b></div>
                      <div><small>PREVISÃO NF</small><b>12/10/2026</b></div>
                      <p>Central operacional de {selected.institution}</p>
                      <button type="button" onClick={() => setFeedback("Central do contrato aberta")}>Abrir central do Contrato</button>
                    </div>
                    <button type="button" className={styles.advancedButton} onClick={() => setFeedback("Detalhes avançados da OS")}>▦ <span><b>Detalhes avançados da OS</b><small>Ciclo · Saúde · Forecast · Nota Fiscal · Despesas</small></span>›</button>
                  </section>
                </>
              )}

              {activeDrawerTab === "Tarefas" && (
                <section className={styles.drawerTabContent}>
                  <h4>☷ Tarefas ({selected.taskCount ?? 0})</h4>
                  <div className={styles.emptyTaskCard}><span>Nenhuma tarefa vinculada a esta OS.</span><button type="button" onClick={() => setFeedback("Ciclo completo da OS")}>Ver ciclo completo</button></div>
                  <button type="button" className={styles.advancedButton} onClick={() => setFeedback("Detalhes avançados da OS")}>▦ <span><b>Detalhes avançados da OS</b><small>Ciclo · Saúde · Forecast · Nota Fiscal · Despesas</small></span>›</button>
                  <button type="button" className={styles.exportButton} onClick={() => setFeedback("Exportação preparada")}>⇩ <span><b>Exportar informações</b><small>PDF · Excel · CSV · JSON</small></span></button>
                </section>
              )}

              {activeDrawerTab === "Registros" && (
                <section className={styles.drawerTabContent}>
                  <h4>◎ Medição de conclusão (1)</h4>
                  <div className={styles.measurementSummary}><strong>{selected.progress}%</strong><span>conclusão atual · última medição em 27/07/2026</span></div>
                  <div className={styles.measurementChart}><i style={{ height: `${Math.max(12, selected.progress)}%` }}><b>{selected.progress}</b></i><span>27/07</span></div>
                  <div className={styles.measurementDelta}><b>12% → {selected.progress}% (+33%)</b><span>27/07/2026</span><small>MANUTENÇÃO PREVENTIVA DA SUBESTAÇÃO E EMISSÃO DE LAUDO...</small></div>
                  <h4>◷ Atividade recente</h4>
                  <div className={styles.activityList}><div><b>Etiqueta "compras" aplicada à OS.</b><small>flow_tag_attached <span>05/09/2026, 17:05</span></small></div><div><b>Medição da OS auditada.</b><small>flow_measurement_audited <span>27/07/2026, 11:22</span></small></div></div>
                </section>
              )}

              {activeDrawerTab === "Comentários" && (
                <section className={styles.drawerTabContent}>
                  <h4>◯ Comentários do projeto</h4>
                  <p className={styles.commentIntro}>Registre atualizações, decisões e arquivos para toda a equipe.</p>
                  <div className={styles.commentComposer}>
                    <span>Adicionar um comentário...</span>
                    <div><button type="button" onClick={() => setFeedback("Arquivo pronto para anexar")}><UiIcon name="paperclip" className={styles.iconSvg} /></button><button type="button" onClick={() => setFeedback("Comentário de demonstração publicado")}><UiIcon name="send" className={styles.iconSvg} /></button></div>
                    <small>Reagir: <b>✅ Tudo certo</b><b>🙋 Preciso de ajuda</b><b>⛔ Está bloqueado</b><b>🔎 Pode esclarecer?</b></small>
                  </div>
                  <div className={styles.commentsEmpty}><span>◯</span><b>Nenhum comentário ainda</b><small>Publique a primeira atualização deste projeto para iniciar o histórico da equipe.</small></div>
                </section>
              )}
            </div>
          </motion.aside>

          <AnimatePresence>
            {newOsOpen && (
              <motion.div className={styles.modalLayer} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <motion.form className={styles.newOsModal} onSubmit={createOs} initial={{ opacity: 0, y: 24, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 14, scale: 0.98 }} transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}>
                  <header><span><UiIcon name="bolt" className={styles.iconSvg} /></span><div><strong>Criação rápida da Ordem de Serviço</strong><small>Cadastre apenas as informações essenciais.</small></div><button type="button" onClick={() => setNewOsOpen(false)}><UiIcon name="chevronRight" className={styles.iconSvg} /></button></header>
                  <div className={styles.modalBody}>
                    <p className={styles.modalInfo}>ⓘ Você poderá completar os demais dados depois.</p>
                    <h5>INFORMAÇÕES BÁSICAS</h5>
                    <label>Título da OS *<input value={newOsTitle} onChange={(event) => setNewOsTitle(event.target.value)} placeholder="Ex.: OS 301 - Manutenção elétrica" /></label>
                    <div className={styles.modalGrid}><label>Chegada *<input defaultValue="22/09/2026" /></label><label>Data limite<input placeholder="dd/mm/aaaa" /></label></div>
                    <div className={styles.modalGrid}><label>Status *<select defaultValue="Em Breve"><option>Em Breve</option><option>Em andamento</option></select></label><label>Prioridade *<select value={newOsPriority} onChange={(event) => setNewOsPriority(event.target.value as "M" | "A")}><option value="M">Média</option><option value="A">Alta</option></select></label></div>
                    <label>Valor planejado<input defaultValue="0,00" /></label>
                    <h5>RESPONSÁVEIS</h5>
                    <label>Instituição *<input value={newOsInstitution} onChange={(event) => setNewOsInstitution(event.target.value)} placeholder="Selecione a instituição" /></label>
                    <div className={styles.modalGrid}><label>Responsável<input defaultValue="Pablo Lima" /></label><label>Usuários do projeto<input placeholder="Selecionar usuários" /></label></div>
                  </div>
                  <footer><button type="button" className={styles.modalFullButton} onClick={() => setFeedback("Cadastro completo disponível no produto")}><UiIcon name="panel" className={styles.inlineButtonIcon} /> Abrir cadastro completo</button><span /><button type="button" onClick={() => setNewOsOpen(false)}>Cancelar</button><button type="submit" className={styles.modalSubmit}>Criar OS</button></footer>
                </motion.form>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {feedback && interactionMode && (
              <motion.div className={styles.feedbackToast} initial={{ opacity: 0, y: 12, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 8, scale: 0.98 }} role="status"><span>✓</span>{feedback}</motion.div>
            )}
          </AnimatePresence>

          {interactionMode && (
            <div className={styles.interactionControls}><span><i /> Demo interativa</span><button type="button" onClick={resetDemo}>Reiniciar</button></div>
          )}

          <AnimatePresence>
            {intro && mode !== "showcase" && !reducedMotion && (
              <motion.div className={styles.brandIntro} initial={{ opacity: 1 }} exit={{ opacity: 0, scale: 1.035, filter: "blur(2px)" }} transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}>
                <div className={styles.brandGrid} />
                <span className={`${styles.brandRibbon} ${styles.brandRibbonOne}`} />
                <span className={`${styles.brandRibbon} ${styles.brandRibbonTwo}`} />
                <span className={`${styles.brandGlow} ${styles.brandGlowOne}`} />
                <span className={`${styles.brandGlow} ${styles.brandGlowTwo}`} />
                <span className={`${styles.brandBeam} ${styles.brandBeamOne}`} />
                <span className={`${styles.brandBeam} ${styles.brandBeamTwo}`} />
                <div className={styles.dropField}>{Array.from({ length: 18 }, (_, index) => <Drop key={index} index={index} />)}</div>
                <span className={`${styles.brandOrb} ${styles.brandOrbOne}`} />
                <span className={`${styles.brandOrb} ${styles.brandOrbTwo}`} />
                <motion.div className={styles.brandWordmark} initial={{ opacity: 0, y: 24, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 1.0, delay: 0.42, ease: [0.16, 1, 0.3, 1] }}>
                  <motion.div className={styles.brandBadge} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.32 }}>FluxOS • demo guiada</motion.div>
                  <motion.div className={styles.brandLogoShell} initial={{ clipPath: "inset(0 100% 0 0)", opacity: 0.2 }} animate={{ clipPath: "inset(0 0% 0 0)", opacity: 1 }} transition={{ duration: 1.05, delay: 0.62, ease: [0.16, 1, 0.3, 1] }}>
                    <span className={styles.brandLogoGlow} />
                    <img src="/hero/drtasks-wordmark.png" alt="DR TASKS" className={styles.brandLogoImage} />
                    <motion.span className={styles.brandSweep} initial={{ x: "-155%" }} animate={{ x: "200%" }} transition={{ duration: 1.35, delay: 0.95, ease: "easeInOut" }} />
                  </motion.div>
                  <motion.span className={styles.brandUnderline} initial={{ scaleX: 0, opacity: 0 }} animate={{ scaleX: 1, opacity: 1 }} transition={{ duration: 0.75, delay: 1.28, ease: [0.16, 1, 0.3, 1] }} />
                  <motion.small initial={{ opacity: 0, y: 7 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 1.45 }}>Operação clara. Próxima ação visível.</motion.small>
                  <motion.div className={styles.brandMeta} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 1.62 }}>
                    <span><i /> Fluxos conectados</span>
                    <span><i /> Contexto operacional em segundos</span>
                  </motion.div>
                </motion.div>
                <motion.div className={styles.brandLaunchLine} initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1.2, delay: 1.8, ease: [0.16, 1, 0.3, 1] }} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {mode === "hero" && (
        <div className={styles.externalAnnotations} aria-hidden="true">
          <AnimatePresence mode="sync">
            {showKpiAnnotations && (
              <>
                <motion.div key="kpi-metric" className={`${styles.externalAnnotation} ${styles.annotationTop} ${styles.annotationTopLeft}`} initial={{ opacity: 0, x: -28, y: 10, scale: 0.94 }} animate={{ opacity: 1, x: 0, y: 0, scale: 1 }} exit={{ opacity: 0, x: -14, y: -4, scale: 0.97 }} transition={{ type: "spring", stiffness: 180, damping: 22, mass: 0.78 }}>
                  <div className={`${styles.externalPill} ${styles.externalDriftOne}`}><i /><span>R$ 3,4M organizados no FluxOS</span></div>
                </motion.div>
                <motion.div key="kpi-context" className={`${styles.externalAnnotation} ${styles.annotationTop} ${styles.annotationTopRight}`} initial={{ opacity: 0, x: 30, y: 12, scale: 0.92 }} animate={{ opacity: 1, x: 0, y: 0, scale: 1 }} exit={{ opacity: 0, x: 14, y: -4, scale: 0.97 }} transition={{ type: "spring", stiffness: 170, damping: 21, mass: 0.8, delay: 0.18 }}>
                  <div className={`${styles.externalCard} ${styles.externalDriftTwo}`}><span className={styles.externalEyebrow}>Operação ao vivo</span><strong>323 OS ativas em um só fluxo.</strong><small>Indicadores operacionais entram antes da leitura detalhada da tabela.</small></div>
                </motion.div>
              </>
            )}

            {showTableAnnotation && (
              <motion.div key="table-context" className={`${styles.externalAnnotation} ${styles.annotationBottom} ${styles.annotationBottomLeft}`} initial={{ opacity: 0, x: -24, y: -10, scale: 0.95 }} animate={{ opacity: 1, x: 0, y: 0, scale: 1 }} exit={{ opacity: 0, x: -12, y: 4, scale: 0.98 }} transition={{ type: "spring", stiffness: 175, damping: 23, mass: 0.78 }}>
                <div className={`${styles.externalPill} ${styles.externalDriftThree}`}><i /><span>Colunas, responsáveis e estágios como no produto real.</span></div>
              </motion.div>
            )}

            {showDrawerAnnotation && (
              <motion.div key="drawer-context" className={`${styles.externalAnnotation} ${styles.annotationBottom} ${styles.annotationBottomRight}`} initial={{ opacity: 0, x: 28, y: -12, scale: 0.93 }} animate={{ opacity: 1, x: 0, y: 0, scale: 1 }} exit={{ opacity: 0, x: 14, y: 5, scale: 0.98 }} transition={{ type: "spring", stiffness: 168, damping: 22, mass: 0.8 }}>
                <div className={`${styles.externalCard} ${styles.externalDriftFour}`}><span className={styles.externalEyebrow}>Próxima ação</span><strong>Drawer, SLA, saúde e histórico da OS.</strong><small>O contexto detalhado aparece sem tirar o usuário da grade operacional.</small></div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}

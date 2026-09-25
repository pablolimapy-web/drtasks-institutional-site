import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const read = (path: string) => readFileSync(new URL(path, import.meta.url), "utf8");
const page = read("../app/page.tsx");
const journey = read("../components/home-modules/HomeModuleJourney.tsx");
const files = {
  fluxos: read("../components/home-modules/FluxosChapter.tsx"),
  projects: read("../components/home-modules/ProjectsChapter.tsx"),
  finance: read("../components/home-modules/FinanceChapter.tsx"),
  team: read("../components/home-modules/TeamChapter.tsx"),
  resources: read("../components/home-modules/ResourcesChapter.tsx"),
};
const how = read("../components/HowItWorks.tsx");
const segments = read("../components/Segments.tsx");
const origin = read("../components/OriginStory.tsx");
const proof = read("../components/SocialProof.tsx");
const pricing = read("../components/Pricing.tsx");
const faq = read("../components/FAQ.tsx");
const finalCta = read("../components/FinalCTA.tsx");

function indexInOrder(source: string, tokens: string[]) {
  let cursor = -1;
  for (const token of tokens) {
    const next = source.indexOf(token);
    assert.ok(next > cursor, `${token} must remain in approved order`);
    cursor = next;
  }
}

test("home preserves the approved section order", () => {
  indexInOrder(page, [
    "<HeroCommercial />",
    "<TechnologyLogoLoop />",
    "<ModuleShowcase />",
    "<HomeModuleJourney />",
    "<HowItWorks />",
    "<Segments />",
    "<OriginStory />",
    "<SocialProof />",
    "<Pricing />",
    "<FAQ />",
    "<FinalCTA />",
  ]);
});

test("module journey exposes the narrative-v2 wrapper and all five chapters", () => {
  assert.match(journey, /data-home-visual-language="narrative-v2"/);
  for (const component of ["FluxosChapter", "ProjectsChapter", "FinanceChapter", "TeamChapter", "ResourcesChapter"]) {
    assert.match(journey, new RegExp(`<${component}\\s*/>`));
  }
});

test("each module chapter has its own narrative primitive", () => {
  assert.match(files.fluxos, /RECEBIDA/);
  assert.match(files.fluxos, /MEDIÇÃO/);
  assert.match(files.projects, /Instituição/);
  assert.match(files.projects, /Workspace/);
  assert.match(files.projects, /activeStep/);
  assert.match(files.finance, /Solicitação/);
  assert.match(files.finance, /Conciliação/);
  assert.match(files.finance, /financeStages/);
  assert.match(files.team, /08:00/);
  assert.match(files.team, /workday/);
  assert.match(files.resources, /CAMPO/);
  assert.match(files.resources, /PROJETO/);
});

test("animated module chapters respect reduced motion", () => {
  assert.match(files.fluxos, /useReducedMotion/);
  assert.match(files.team, /useReducedMotion/);
  assert.match(files.resources, /useReducedMotion/);
});

test("all detailed module CTAs remain intact", () => {
  assert.match(files.fluxos, /Saiba mais sobre FluxOS/);
  assert.match(files.projects, /Saiba mais sobre Projetos e Tarefas/);
  assert.match(files.finance, /Saiba mais sobre Financeiro/);
  assert.match(files.team, /Saiba mais sobre Equipe e Tempo/);
  assert.match(files.resources, /Saiba mais sobre Recursos/);
});

test("how it works uses continuous storytelling instead of cards", () => {
  assert.doesNotMatch(how, /how-grid|how-card/);
  for (const label of ["Contexto", "Fluxo", "Trabalho", "Próxima ação"]) assert.match(how, new RegExp(label));
});

test("segments is an editorial selector, not a card grid", () => {
  assert.doesNotMatch(segments, /segments-grid|segment-card/);
  assert.match(segments, /aria-pressed/);
  assert.match(segments, /Construção e obras/);
});

test("origin is manifesto-style and proof is ledger-style", () => {
  assert.match(origin, /manifesto/i);
  assert.match(proof, /ledger/i);
  assert.doesNotMatch(proof, /beta-card/);
});

test("commercial close avoids repeated surface cards", () => {
  assert.doesNotMatch(pricing, /surface pricing-surface/);
  assert.match(faq, /aria-controls/);
  assert.doesNotMatch(finalCta, /final-cta-v18/);
});

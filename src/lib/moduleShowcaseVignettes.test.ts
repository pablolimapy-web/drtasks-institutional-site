import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

const read = (path: string) => fs.readFileSync(path, "utf8");
const showcase = read("src/components/ModuleShowcase.tsx");

test("every showcase module owns a dedicated opening vignette", () => {
  const source = read("src/components/module-showcase/ModuleIntroScene.tsx");

  assert.match(source, /function FluxosIntro/);
  assert.match(source, /function ProjectsIntro/);
  assert.match(source, /function FinanceIntro/);
  assert.match(source, /function TeamIntro/);
  assert.match(source, /function ResourcesIntro/);
  assert.match(source, /FLUXOS · DEMO GUIADA/);
  assert.match(source, /PROJETOS · CARTEIRA VIVA/);
  assert.match(source, /FINANCEIRO · LEITURA CONECTADA/);
  assert.match(source, /EQUIPE · TEMPO EM CONTEXTO/);
  assert.match(source, /RECURSOS · OPERAÇÃO EM CAMPO/);
});

test("vignettes use different visual grammars instead of one generic preset", () => {
  const source = read("src/components/module-showcase/ModuleIntroScene.tsx");
  const css = read("src/components/module-showcase/ModuleIntroScene.module.css");

  assert.match(source, /fluxTrack/);
  assert.match(source, /projectOrbit/);
  assert.match(source, /financeNumbers/);
  assert.match(source, /teamConstellation/);
  assert.match(source, /resourceRadar/);

  for (const animation of [
    "fluxRouteDraw",
    "projectCardConverge",
    "financeNumberRise",
    "teamOrbit",
    "resourceRadarSweep",
  ]) {
    assert.match(css, new RegExp(`@keyframes\\s+${animation}`));
  }
});

test("the real interface waits for its vignette before starting the guided demo", () => {
  assert.match(showcase, /ModuleIntroScene/);
  assert.match(showcase, /CINEMATIC_INTRO_MS\s*=\s*2[0-9]{3}/);
  assert.match(showcase, /!introReady/);
  assert.match(showcase, /introReady &&/);
  assert.match(showcase, /paused=\{presentationPaused \|\| deckHovered \|\| !introReady\}/);
});

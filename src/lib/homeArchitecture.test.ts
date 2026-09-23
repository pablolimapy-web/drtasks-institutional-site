import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

const pageSource = fs.readFileSync("src/app/page.tsx", "utf8");
const moduleShowcaseSource = fs.readFileSync("src/lib/moduleShowcase.ts", "utf8");

test("home moves directly from the Hero into the interactive module Product Stage", () => {
  assert.match(pageSource, /<HeroCommercial\s*\/>[\s\S]*?<ModuleShowcase\s*\/>/);
  assert.doesNotMatch(pageSource, /<PainBand\s*\/>/);
  assert.doesNotMatch(pageSource, /<FluxOS\s*\/>/);
  assert.doesNotMatch(pageSource, /<ProductPillars\s*\/>/);
});

test("home Product Stage keeps every published product deep link", () => {
  const architecture = fs.readFileSync("src/lib/productArchitecture.ts", "utf8");
  assert.match(moduleShowcaseSource, /hrefFor/);
  for (const href of [
    "/produto/fluxos",
    "/produto/projetos-e-tarefas",
    "/produto/financeiro",
    "/produto/recursos",
    "/produto/equipe",
  ]) {
    assert.match(architecture, new RegExp(href.replaceAll("/", "\\/")));
  }
});

test("home keeps contextual deep links for construction and company story", () => {
  const segments = fs.readFileSync("src/components/Segments.tsx", "utf8");
  const origin = fs.readFileSync("src/components/OriginStory.tsx", "utf8");
  assert.match(segments, /\/segmentos\/construcao/);
  assert.match(origin, /\/sobre/);
});

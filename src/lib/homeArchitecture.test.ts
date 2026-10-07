import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

const pageSource = fs.readFileSync("src/app/page.tsx", "utf8");
const narrative = fs.readFileSync("src/lib/homeCommercialNarrative.ts", "utf8");

test("home is a short commercial composition instead of the legacy chapter stack", () => {
  for (const component of ["HomeNarrativeHero", "HomeModulesOverview", "HomeCommercialJourney", "OriginStory", "FinalCTA"]) {
    assert.match(pageSource, new RegExp(`<${component}\\s*\\/>`));
  }
  for (const retired of ["TechnologyLogoLoop", "ModuleShowcase", "HomeModuleJourney", "HowItWorks", "Segments", "SocialProof", "FAQ"]) {
    assert.doesNotMatch(pageSource, new RegExp(retired));
  }
});

test("home commercial narrative keeps every published product deep link", () => {
  for (const href of ["/produto/fluxos", "/produto/projetos-e-tarefas", "/produto/financeiro", "/produto/equipe", "/produto/recursos"]) {
    assert.match(narrative, new RegExp(href.replaceAll("/", "\\/")));
  }
});

test("home still keeps the company story deep link", () => {
  const origin = fs.readFileSync("src/components/OriginStory.tsx", "utf8");
  assert.match(origin, /\/sobre/);
});

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

const read = (path: string) => fs.readFileSync(path, "utf8");

const overview = read("src/components/home-commercial/HomeModulesOverview.tsx");
const overviewCss = read("src/components/home-commercial/HomeModulesOverview.module.css");
const shell = read("src/components/home-commercial/ModuleStoryShell.tsx");
const shellCss = read("src/components/home-commercial/ModuleStoryShell.module.css");
const page = read("src/app/page.tsx");
const fluxos = read("src/components/home-commercial/stories/FluxosStory.tsx");

const commercialSections = [
  "OperationalEfficiencyStory",
  "OperationalProof",
  "CompetitiveDifference",
  "AIPositioning",
];

test("V104 restores the module map that already worked before the asymmetric V103 experiment", () => {
  assert.doesNotMatch(overview, /OITO FRENTES\. UMA OPERAÇÃO\./);
  assert.match(overview, /O mesmo contexto precisa atravessar a obra inteira\./);
  assert.match(overview, /gridGlow/);
  assert.doesNotMatch(overview, /className=\{styles\.track\}/);
  assert.match(overviewCss, /grid-template-columns:\s*repeat\(4,1fr\)/);
  assert.doesNotMatch(overviewCss, /item\[data-module="fluxos"\]\{grid-column:span 7/);
});

test("V104 preserves the FluxOS icon-stepper scene as the internal art-direction reference", () => {
  assert.match(fluxos, /<Stepper/);
  assert.match(fluxos, /FluxStepIcon/);
  assert.match(fluxos, /progressByStep/);
  assert.match(fluxos, /stepIndicatorIcon/);
});

test("V104 gives every non-FluxOS story a module-specific composition instead of one shared text-interface split", () => {
  assert.match(shell, /data-module=\{module\.id\}/);
  for (const moduleId of ["projects", "finance", "quotes", "requests", "chat", "team-time", "resources"]) {
    assert.match(shellCss, new RegExp(`data-module=["']${moduleId}["']`));
  }
  assert.match(shellCss, /grid-template-columns:\s*repeat\(12/);
});

test("V104 adds the approved commercial narrative without adding new narrative-loop animation", () => {
  for (const component of commercialSections) {
    assert.match(page, new RegExp(`<${component} \\/>`));
    const source = read(`src/components/home-commercial/${component}.tsx`);
    assert.doesNotMatch(source, /useNarrativeLoop|setInterval|setTimeout|requestAnimationFrame/);
  }
  assert.ok(page.indexOf("<OperationalEfficiencyStory />") < page.indexOf("<HomeCommercialJourney />"));
  assert.ok(page.indexOf("<OperationalProof />") > page.indexOf("<HomeCommercialJourney />"));
  assert.ok(page.indexOf("<CompetitiveDifference />") > page.indexOf("<OperationalProof />"));
  assert.ok(page.indexOf("<AIPositioning />") > page.indexOf("<CompetitiveDifference />"));
});

test("V104 keeps the commercial sections visually distinct from the generic title-text-interface pattern", () => {
  const efficiencyCss = read("src/components/home-commercial/OperationalEfficiencyStory.module.css");
  const proofCss = read("src/components/home-commercial/OperationalProof.module.css");
  const comparisonCss = read("src/components/home-commercial/CompetitiveDifference.module.css");
  const aiCss = read("src/components/home-commercial/AIPositioning.module.css");

  assert.match(efficiencyCss, /\.entry\{[^}]*grid-template-columns/s);
  assert.match(proofCss, /\.metric\{[^}]*font-size:clamp\(/s);
  assert.match(comparisonCss, /\.comparisonBoard\{[^}]*min-width:980px/s);
  assert.match(aiCss, /\.signalField\{[^}]*display:grid/s);
  assert.match(aiCss, /\.contextCore\{[^}]*background:#07080a/s);
});

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

const read = (path: string) => fs.readFileSync(path, "utf8");

const shellCss = read("src/components/home-commercial/ModuleStoryShell.module.css");
const projects = read("src/components/home-commercial/stories/ProjectsStory.tsx");
const projectsCss = read("src/components/home-commercial/stories/ProjectsStory.module.css");
const finance = read("src/components/home-commercial/stories/FinanceStory.tsx");
const financeCss = read("src/components/home-commercial/stories/FinanceStory.module.css");
const quotes = read("src/components/home-commercial/stories/QuotesStory.tsx");
const requests = read("src/components/home-commercial/stories/RequestsStory.tsx");
const chat = read("src/components/home-commercial/stories/ChatStory.tsx");
const team = read("src/components/home-commercial/stories/TeamTimeStory.tsx");
const resources = read("src/components/home-commercial/stories/ResourcesStory.tsx");
const efficiencyCss = read("src/components/home-commercial/OperationalEfficiencyStory.module.css");
const proofCss = read("src/components/home-commercial/OperationalProof.module.css");
const comparisonCss = read("src/components/home-commercial/CompetitiveDifference.module.css");
const aiCss = read("src/components/home-commercial/AIPositioning.module.css");

const fluxTsx = read("src/components/home-commercial/stories/FluxosStory.tsx");
const fluxCss = read("src/components/home-commercial/stories/FluxosStory.module.css");

test("V106 makes product scenes visually dominant instead of boxed mockups", () => {
  assert.match(shellCss, /\.section\[data-module="projects"\] \.visual[\s\S]*margin-inline:/);
  assert.match(projectsCss, /\.stage\s*\{[\s\S]*border:\s*0/);
  assert.match(financeCss, /\.stage\s*\{[\s\S]*border:\s*0/);
  assert.match(projectsCss, /\.taskInspector[\s\S]*box-shadow:/);
  assert.match(financeCss, /\.reconcilePanel[\s\S]*box-shadow:/);
});

test("V106 adds section-specific focus devices without generic marketing cards", () => {
  assert.match(projects, /sceneIndex/);
  assert.match(finance, /flowTrace/);
  assert.match(quotes, /decisionEquation/);
  assert.match(requests, /handoffTicket/);
  assert.match(chat, /contextIndex/);
  assert.match(team, /currentBand/);
  assert.match(resources, /fieldLegend/);
});

test("V106 strengthens commercial sections as editorial evidence, not card grids", () => {
  assert.match(efficiencyCss, /\.eliminationStage[\s\S]*border-top:1px solid/);
  assert.match(proofCss, /font-size:clamp\(132px,17vw,260px\)/);
  assert.match(comparisonCss, /\.comparisonBoard[\s\S]*min-width:980px/);
  assert.match(aiCss, /\.signalField[\s\S]*grid-template-columns:/);
});

test("V106 keeps FluxOS implementation untouched", () => {
  assert.match(fluxTsx, /<Stepper/);
  assert.match(fluxTsx, /FluxStepIcon/);
  assert.match(fluxCss, /\.stepperRoot/);
});

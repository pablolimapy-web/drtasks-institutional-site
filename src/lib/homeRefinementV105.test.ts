import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

const read = (path: string) => fs.readFileSync(path, "utf8");

const hero = read("src/components/home-commercial/HomeNarrativeHero.tsx");
const overview = read("src/components/home-commercial/HomeModulesOverview.tsx");
const shell = read("src/components/home-commercial/ModuleStoryShell.tsx");
const shellCss = read("src/components/home-commercial/ModuleStoryShell.module.css");

const commercial = [
  "OperationalEfficiencyStory",
  "OperationalProof",
  "CompetitiveDifference",
  "AIPositioning",
];

const stories = [
  ["ProjectsStory", "projectToolbar", "taskInspector"],
  ["FinanceStory", "financeToolbar", "reconcilePanel"],
  ["QuotesStory", "quoteHeader", "decisionStrip"],
  ["RequestsStory", "requestSheet", "handoffTicket"],
  ["ChatStory", "contextRibbon", "decisionRegister"],
  ["TeamTimeStory", "hourRuler", "workLedger"],
  ["ResourcesStory", "siteCanvas", "evidenceInspector"],
] as const;

test("V105 removes repeated marketing micro-labels from the home surface", () => {
  assert.doesNotMatch(hero, /Solicitação · aprovação · pagamento · conciliação/);
  assert.doesNotMatch(overview, /OITO FRENTES\. UMA OPERAÇÃO\./);
  for (const component of commercial) {
    const source = read(`src/components/home-commercial/${component}.tsx`);
    assert.doesNotMatch(source, /className=\{styles\.eyebrow\}/);
  }
});

test("V105 removes the repeated check-line-result ornament from module stories", () => {
  assert.doesNotMatch(shell, /resultMark|resultTrack|resultCheck|module\.result/);
  assert.doesNotMatch(shellCss, /\.resultMark|\.resultTrack|@keyframes resultPulse/);
});

test("V105 gives module navigation a real action control instead of a tiny underlined link", () => {
  assert.match(shell, /className=\{styles\.cta\}/);
  assert.match(shellCss, /\.cta\s*\{/);
  assert.match(shellCss, /min-height:\s*48px/);
  assert.match(shellCss, /\.ctaIcon/);
});

test("V105 makes every non-FluxOS story a richer product scene with its own information architecture", () => {
  for (const [name, markerA, markerB] of stories) {
    const source = read(`src/components/home-commercial/stories/${name}.tsx`);
    assert.match(source, new RegExp(`styles\\.${markerA}`));
    assert.match(source, new RegExp(`styles\\.${markerB}`));
  }
});

test("V105 keeps FluxOS as the untouched visual reference", () => {
  const fluxos = read("src/components/home-commercial/stories/FluxosStory.tsx");
  assert.match(fluxos, /<Stepper/);
  assert.match(fluxos, /FluxStepIcon/);
  assert.match(fluxos, /progressByStep/);
});

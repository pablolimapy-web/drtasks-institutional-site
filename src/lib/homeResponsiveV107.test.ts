import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

const read = (path: string) => fs.readFileSync(path, "utf8");

const shell = read("src/components/home-commercial/ModuleStoryShell.module.css");
const projects = read("src/components/home-commercial/stories/ProjectsStory.module.css");
const finance = read("src/components/home-commercial/stories/FinanceStory.module.css");
const quotes = read("src/components/home-commercial/stories/QuotesStory.module.css");
const requests = read("src/components/home-commercial/stories/RequestsStory.module.css");
const chat = read("src/components/home-commercial/stories/ChatStory.module.css");
const team = read("src/components/home-commercial/stories/TeamTimeStory.module.css");
const resources = read("src/components/home-commercial/stories/ResourcesStory.module.css");
const efficiency = read("src/components/home-commercial/OperationalEfficiencyStory.module.css");
const comparison = read("src/components/home-commercial/CompetitiveDifference.module.css");

const legacyStoryCss = [finance, requests, chat, team, resources];

test("V107 adds desktop, notebook and mobile responsive art-direction breakpoints", () => {
  assert.match(shell, /V107 responsive polish/);
  assert.match(shell, /@media\s*\(max-width:\s*1366px\)/);
  assert.match(shell, /@media\s*\(max-width:\s*760px\)/);
  for (const css of legacyStoryCss) assert.match(css, /@media\(max-width:/);
  assert.match(quotes, /@media\(max-width:620px\)/);
  assert.match(quotes, /comparisonViewport/);
  assert.match(projects, /@media\(max-width:760px\)/);
});

test("V107 prevents product scenes from shrinking into unreadable miniatures", () => {
  assert.match(projects, /@media\(max-width:760px\)[\s\S]*\.railTree\s*\{[\s\S]*overflow:auto/);
  assert.match(projects, /@media\(max-width:760px\)[\s\S]*\.taskRow\s*\{[\s\S]*grid-template-columns:minmax\(0,1fr\) auto/);
  assert.match(finance, /\.ledgerScroller\{overflow-x:auto/);
  assert.match(quotes, /\.comparisonViewport\s*\{[^}]*overflow-x:\s*auto/);
  assert.match(team, /\.timelineViewport\{overflow-x:auto/);
});

test("V107 makes commercial proof sections adapt without reverting to card stacks", () => {
  assert.match(efficiency, /@media\(max-width:620px\)/);
  assert.match(efficiency, /\.entry\{grid-template-columns:52px 1fr/);
  assert.match(comparison, /@media\(max-width:620px\)/);
  assert.match(comparison, /\.boardViewport\{[^}]*overflow-x:auto/);
});

import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const read = (path: string) => readFileSync(new URL(path, import.meta.url), "utf8");
const page = read("../app/page.tsx");
const journey = read("../components/home-commercial/HomeCommercialJourney.tsx");
const heroCss = read("../components/home-commercial/HomeNarrativeHero.module.css");
const shellCss = read("../components/home-commercial/ModuleStoryShell.module.css");

function indexInOrder(source: string, tokens: string[]) {
  let cursor = -1;
  for (const token of tokens) {
    const next = source.indexOf(token);
    assert.ok(next > cursor, `${token} must remain in approved order`);
    cursor = next;
  }
}

test("home uses the approved compact dark commercial composition", () => {
  indexInOrder(page, [
    "<HomeNarrativeHero />",
    "<HomeModulesOverview />",
    "<HomeCommercialJourney />",
    "<OriginStory />",
    "<FinalCTA />",
  ]);
  assert.doesNotMatch(page, /TechnologyLogoLoop|ModuleShowcase|HomeModuleJourney|HowItWorks|Segments|SocialProof|FAQ/);
});

test("new commercial journey is the mounted eight-story wrapper", () => {
  assert.match(journey, /data-home-visual-language="commercial-dark-v1"/);
  for (const component of ["FluxosStory", "ProjectsStory", "FinanceStory", "QuotesStory", "RequestsStory", "ChatStory", "TeamTimeStory", "ResourcesStory"]) {
    assert.match(journey, new RegExp(`<${component}\\s*`));
  }
});

test("commercial home owns the approved dark palette and avoids viewport-locking every module", () => {
  for (const token of ["#06111F", "#2F7CFF", "#F5F8FF", "#9BAEC9"]) assert.match(heroCss.toUpperCase(), new RegExp(token.toUpperCase()));
  assert.doesNotMatch(shellCss, /height:\s*100vh/);
  assert.match(shellCss, /section\[data-module="projects"\] \{ min-height: 980px/);
});

test("new commercial visual system remains responsive and reduced-motion safe", () => {
  assert.match(heroCss, /prefers-reduced-motion:\s*reduce/);
  assert.match(heroCss, /@media\s*\(max-width:/);
  assert.match(shellCss, /@media\s*\(max-width:/);
});

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

const home = fs.readFileSync("src/app/page.tsx", "utf8");

test("Home places the eight-module overview immediately before the commercial journey", () => {
  assert.match(home, /<HomeNarrativeHero \/>[\s\S]*?<HomeModulesOverview \/>[\s\S]*?<HomeCommercialJourney \/>[\s\S]*?<OriginStory \/>/);
  assert.doesNotMatch(home, /<HomeModuleJourney|<HowItWorks/);
});

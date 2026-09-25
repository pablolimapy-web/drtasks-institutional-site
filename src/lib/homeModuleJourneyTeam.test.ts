import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

const source = fs.readFileSync("src/components/home-modules/TeamChapter.tsx", "utf8");
const css = fs.readFileSync("src/components/home-modules/TeamChapter.module.css", "utf8");
const presentation = fs.readFileSync("src/components/home-modules/TeamProductPresentation.tsx", "utf8");
const sequence = fs.readFileSync("src/lib/teamPresentationSequence.ts", "utf8");

test("Team chapter presents the real time and people interfaces as one constant cinematic story", () => {
  assert.match(source, /setTimeout/);
  assert.doesNotMatch(source, /setInterval/);
  assert.match(source, /TEAM_PRESENTATION_SEQUENCE/);
  assert.match(source, /TeamProductPresentation/);
  assert.match(source, /TEAM_PRESENTATION_SCENES/);
  assert.match(source, /section-opening/);
  assert.match(source, /IntersectionObserver/);
  assert.match(css, /\.timeline/);
  assert.match(css, /\.sectionOpening/);
  assert.match(css, /linear-gradient\(180deg, #051426 0%, #071a31 100%\)/);
  assert.match(presentation, /Tempo e produtividade/);
  assert.match(presentation, /Equipe, funções e acessos ao sistema/);
  assert.match(presentation, /presentationCursor/);
  assert.match(presentation, /interface-transition/);
  assert.match(presentation, /closing/);
  assert.match(sequence, /section-opening/);
  assert.match(sequence, /users-vignette/);
  assert.doesNotMatch(source, /\/product\/team\/time\.jpg/);
});

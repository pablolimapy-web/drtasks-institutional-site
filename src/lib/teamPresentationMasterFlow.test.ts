import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

const team = fs.readFileSync("src/components/home-modules/TeamChapter.tsx", "utf8");
const presentation = fs.readFileSync("src/components/home-modules/TeamProductPresentation.tsx", "utf8");
const css = fs.readFileSync("src/components/home-modules/TeamChapter.module.css", "utf8");

test("Equipe e Tempo uses one master sequence instead of independent scene timers", () => {
  assert.match(team, /TEAM_PRESENTATION_SEQUENCE/);
  assert.match(team, /setTimeout/);
  assert.doesNotMatch(team, /setInterval/);
  assert.doesNotMatch(team, /pauseUntil/);
  assert.doesNotMatch(team, /onMouseEnter/);
});

test("Equipe e Tempo has a dedicated cinematic section opening before product interfaces", () => {
  assert.match(team, /section-opening/);
  assert.match(team, /04 \/ EQUIPE E TEMPO/);
  assert.match(team, /Um dia de trabalho deixa rastros/);
  assert.match(css, /\.sectionOpening/);
  assert.match(css, /\.openingBridge/);
});

test("timeline is progress-only and the presentation receives the current master phase", () => {
  assert.doesNotMatch(team, /<button[\s\S]*className=\{`\$\{styles\.event/);
  assert.match(team, /data-progress-step/);
  assert.match(team, /phaseId=\{phase\.id\}/);
  assert.match(presentation, /phaseId/);
  assert.match(presentation, /time-vignette/);
  assert.match(presentation, /interface-transition/);
  assert.match(presentation, /users-vignette/);
  assert.match(presentation, /closing/);
});

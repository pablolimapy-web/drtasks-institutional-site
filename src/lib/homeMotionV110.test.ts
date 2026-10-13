import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

const orchestratorPath = "src/components/home-commercial/HomeMotionOrchestrator.tsx";
const motionCssPath = "src/app/home-motion.css";
const page = fs.readFileSync("src/app/page.tsx", "utf8");
const layout = fs.readFileSync("src/app/layout.tsx", "utf8");

const revealComponents = [
  "src/components/home-commercial/OperationalEfficiencyStory.tsx",
  "src/components/home-commercial/OperationalProof.tsx",
  "src/components/home-commercial/CompetitiveDifference.tsx",
  "src/components/home-commercial/AIPositioning.tsx",
  "src/components/OriginStory.tsx",
  "src/components/FinalCTA.tsx",
];

test("V110 orchestrates viewport motion without replacing module story animations", () => {
  assert.equal(fs.existsSync(orchestratorPath), true);
  const source = fs.readFileSync(orchestratorPath, "utf8");
  assert.match(source, /IntersectionObserver/);
  assert.match(source, /prefers-reduced-motion: reduce/);
  assert.match(source, /data-home-reveal-state/);
  assert.match(page, /HomeMotionOrchestrator/);
});

test("V110 assigns semantic motion roles to the static commercial sections", () => {
  for (const path of revealComponents) {
    const source = fs.readFileSync(path, "utf8");
    assert.match(source, /data-home-motion=/);
    assert.match(source, /data-home-replay="true"/);
  }
});

test("V110 uses masks, line drawing and focus changes instead of generic fade-up", () => {
  assert.equal(fs.existsSync(motionCssPath), true);
  const css = fs.readFileSync(motionCssPath, "utf8");
  assert.match(css, /clip-path/);
  assert.match(css, /scaleX\(/);
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)/);
  assert.doesNotMatch(css, /translateY\(/);
  assert.match(layout, /home-motion\.css/);
});

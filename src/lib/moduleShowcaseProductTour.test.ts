import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

const read = (path: string) => fs.readFileSync(path, "utf8");
const showcase = read("src/components/ModuleShowcase.tsx");

const demos = [
  "ProjectsModuleDemo.tsx",
  "FinanceModuleDemo.tsx",
  "TimeModuleDemo.tsx",
  "LocationModuleDemo.tsx",
] as const;

test("ModuleShowcase mounts real module demos directly instead of wrapping them in a generic camera overlay", () => {
  assert.doesNotMatch(showcase, /ModuleProductTour/);
  assert.match(showcase, /ProductPreview/);
  assert.match(showcase, /ProjectsModuleDemo/);
  assert.match(showcase, /FinanceModuleDemo/);
  assert.match(showcase, /TimeModuleDemo/);
  assert.match(showcase, /LocationModuleDemo/);
  assert.match(showcase, /module\.id === active\.id/);
});

test("each reconstructed module owns its own product-tour timeline and compact in-product cue", () => {
  for (const file of demos) {
    const source = read(`src/components/product-showcase/${file}`);
    assert.match(source, /useShowcaseSequence/);
    assert.match(source, /DemoTourCue/);
    assert.match(source, /activeSceneIndex/);
    assert.doesNotMatch(source, /sceneIndex\?: number/);
  }
});

test("the in-product tour cue stays lightweight but can render contextual card variants per module", () => {
  const source = read("src/components/product-showcase/DemoTourCue.tsx");
  const css = read("src/components/product-showcase/DemoTourCue.module.css");

  assert.match(source, /tourCursor/);
  assert.match(source, /cueCard/);
  assert.match(source, /variant:\s*"progress"/);
  assert.match(source, /variant:\s*"metric"/);
  assert.match(source, /variant:\s*"split"/);
  assert.match(source, /variant:\s*"checklist"/);
  assert.match(source, /variant:\s*"context"/);
  assert.match(css, /\.tourCursor/);
  assert.match(css, /\.cueCard/);
  assert.match(css, /\.metricCard/);
  assert.match(css, /\.splitCard/);
  assert.match(css, /\.checklistCard/);
  assert.match(css, /\.contextCard/);
  assert.match(css, /\.clickPulse/);
  assert.doesNotMatch(source, /tourFocus|camera|Report AI|Analyst AI|signalRail|presentationInsight/);
});

test("the FluxOS showcase uses the same real ProductPreview presentation language as the Hero at a readable pace", () => {
  const preview = read("src/components/ProductPreview.tsx");
  assert.match(showcase, /<ProductPreview[^>]*mode="showcase"/);
  assert.match(preview, /scene\.durationMs \* 0\.32/);
});

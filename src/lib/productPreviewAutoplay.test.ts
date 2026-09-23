import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const source = readFileSync(new URL("../components/ProductPreview.tsx", import.meta.url), "utf8");

test("FluxOS autoplay reschedules on every scene change, even when durations repeat", () => {
  const effectMatch = source.match(/useEffect\(\(\) => \{[\s\S]*?setTimeout\([\s\S]*?scene\.durationMs\);[\s\S]*?\},\s*\[([^\]]+)\]\);/);
  assert.ok(effectMatch, "expected to find the FluxOS autoplay effect");

  const dependencies = effectMatch[1];
  assert.match(dependencies, /sceneIndex/, "autoplay must depend on sceneIndex, not only durationMs");
});

test("ProductPreview keeps Hero as the default mode", () => {
  assert.match(source, /mode\s*=\s*"hero"/);
  assert.match(source, /mode === "showcase"/);
});

test("FluxOS showcase starts after brandIntro and pauses scene timers when requested", () => {
  assert.match(source, /mode === "showcase" \? 1 : 0/);
  assert.match(source, /if \(reducedMotion \|\| paused\) return/);
  assert.match(source, /nextSceneIndex/);
});

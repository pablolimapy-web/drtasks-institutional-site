import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const source = readFileSync(new URL("../components/ProductPreview.tsx", import.meta.url), "utf8");

test("FluxOS autoplay reschedules on every scene change, even with accelerated showcase timing", () => {
  const effectMatch = source.match(/useEffect\(\(\) => \{[\s\S]*?const sceneDelay =[\s\S]*?setTimeout\([\s\S]*?sceneDelay\);[\s\S]*?\},\s*\[([^\]]+)\]\);/);
  assert.ok(effectMatch, "expected to find the FluxOS autoplay effect");

  const dependencies = effectMatch[1];
  assert.match(dependencies, /sceneIndex/, "autoplay must depend on sceneIndex, not only durationMs");
  assert.match(source, /scene\.durationMs \* 0\.15/, "showcase should accelerate the internal FluxOS sequence");
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

import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const hero = readFileSync(new URL("../components/HeroCommercialRotating.tsx", import.meta.url), "utf8");
const previewStyles = readFileSync(new URL("../components/ProductPreview.module.css", import.meta.url), "utf8");

test("FluxOS preview keeps its native width without a rail wrapper inflating the hero", () => {
  assert.doesNotMatch(hero, /previewShell|previewTopRail|previewBottomRail/);
  const showcase = previewStyles.match(/\.showcase\s*\{([\s\S]*?)\}/)?.[1] ?? "";
  assert.match(showcase, /width:\s*100%/);
});

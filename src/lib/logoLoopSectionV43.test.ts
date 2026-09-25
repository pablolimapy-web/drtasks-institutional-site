import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const read = (path: string) => readFileSync(new URL(path, import.meta.url), "utf8");
const css = read("../components/TechnologyLogoLoop.module.css");

test("post-hero logo strip removes the divider and gives the hero more breathing room", () => {
  assert.doesNotMatch(css, /border-top\s*:/);
  assert.match(css, /\.section\s*\{[\s\S]*?margin-top:\s*-48px;[\s\S]*?padding:\s*120px 0 42px;/);
  assert.match(css, /linear-gradient\(180deg,[\s\S]*?rgba\(244,\s*248,\s*255/);
});

test("post-hero logo strip spans the full viewport instead of a centered max-width container", () => {
  assert.match(css, /\.inner\s*\{[\s\S]*?width:\s*100%;[\s\S]*?max-width:\s*none;/);
  assert.match(css, /\.loop\s*\{[\s\S]*?width:\s*100%;/);
});

test("technology icons use the Dr Tasks brand palette", () => {
  assert.match(css, /\.loop\s*\{[\s\S]*?color:\s*var\(--brand\);/);
  assert.match(css, /\.loop\s+:global\(\.logoloop__node\)\s*\{[\s\S]*?color:\s*var\(--brand\);/);
  assert.match(css, /background:\s*var\(--brand-soft\);/);
});

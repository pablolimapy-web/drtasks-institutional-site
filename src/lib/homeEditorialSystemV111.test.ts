import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

const read = (path: string) => fs.readFileSync(path, "utf8");
const page = read("src/app/page.tsx");
const editorial = read("src/components/home-commercial/HomeEditorialSystem.module.css");
const shell = read("src/components/home-commercial/ModuleStoryShell.module.css");
const overview = read("src/components/home-commercial/HomeModulesOverview.module.css");
const finalCta = read("src/components/FinalCTA.module.css");

test("home keeps the editorial wrapper but V126 restores Dr Tasks navy and stronger typography", () => {
  assert.match(page, /HomeEditorialSystem\.module\.css/);
  assert.match(page, /className=\{editorial\.home\}/);
  assert.match(editorial, /--home-canvas:\s*#06111f/i);
  assert.match(editorial, /--home-ink:\s*#f5f8ff/i);
  assert.match(editorial, /--home-muted:\s*#9baec9/i);
  assert.match(editorial, /--home-accent:\s*#2f7cff/i);
  assert.match(editorial, /--home-display-weight:\s*720/);
  assert.match(editorial, /--home-body-weight:\s*400/);
});

test("module shells preserve unique layouts while returning to subtle navy section identities", () => {
  for (const token of ["#06111f", "#071421", "#050f1b", "#081726", "#06121f", "#071522", "#06111d", "#071624"]) {
    assert.match(shell.toLowerCase(), new RegExp(token));
  }
  assert.match(shell, /font-size:\s*var\(--home-section-title\)/);
  assert.match(shell, /\.support[\s\S]*font-size:\s*var\(--home-section-body\)/);
  assert.match(shell, /\.cta[\s\S]*border-radius:\s*14px[\s\S]*linear-gradient/);
});

test("module map remains spatial but regains restrained dark surface depth", () => {
  assert.match(overview, /#071422/i);
  assert.match(overview, /\.list[\s\S]*rgba\(4,\s*16,\s*29,\s*0\.3\)/);
  assert.match(overview, /\.item[\s\S]*rgba\(255,\s*255,\s*255,\s*0\.012\)/);
});

test("closing action uses Dr Tasks blue instead of the superseded neutral Raycast CTA", () => {
  assert.match(finalCta, /background:linear-gradient\(180deg,#2f7cff,#1d61e8\)/i);
  assert.doesNotMatch(finalCta, /background:#e6e6e6/);
});

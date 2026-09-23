import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const read = (path: string) => readFileSync(new URL(path, import.meta.url), "utf8");

const home = read("../app/home.css");
const header = read("../components/Header.module.css");
const megaMenu = read("../components/StaggeredMegaMenu.module.css");
const preview = read("../components/ProductPreview.module.css");

test("hero controls use the softer rounded geometry approved for the first fold", () => {
  assert.match(home, /\/\* v40 — hero controls \*\/[\s\S]*?\.hero-commercial \.hero-actions \.button\s*\{[\s\S]*?border-radius:\s*18px\s*!important/);
  assert.match(header, /\.demoButton\s*\{[\s\S]*?border-radius:\s*16px/);
  assert.match(megaMenu, /\.trigger\s*\{[\s\S]*?border-radius:\s*16px/);
});

test("FluxOS drawer keeps blur on the background layer and the drawer itself crisp", () => {
  assert.match(preview, /\/\* v40 — drawer backdrop isolation \*\/[\s\S]*?\.drawerBackdrop\s*\{[\s\S]*?right:\s*35\.2%[\s\S]*?backdrop-filter:\s*blur\(2px\)/);
  assert.match(preview, /\/\* v40 — drawer backdrop isolation \*\/[\s\S]*?\.drawer\s*\{[\s\S]*?filter:\s*none\s*!important;[\s\S]*?backdrop-filter:\s*none\s*!important/);
  assert.match(preview, /@media \(max-width:\s*720px\)\s*\{[\s\S]*?\.drawerBackdrop\s*\{\s*right:\s*42%;\s*\}/);
});

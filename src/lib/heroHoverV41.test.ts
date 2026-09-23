import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const read = (path: string) => readFileSync(new URL(path, import.meta.url), "utf8");

const home = read("../app/home.css");
const header = read("../components/Header.module.css");
const menu = read("../components/StaggeredMegaMenu.module.css");

test("hero CTA hover has lift, light sweep, arrow travel and tactile press", () => {
  assert.match(home, /\/\* v41 — hero CTA interaction \*\/[\s\S]*?\.hero-commercial \.hero-actions \.button\s*\{[\s\S]*?position:\s*relative[\s\S]*?overflow:\s*hidden/);
  assert.match(home, /\.hero-commercial \.hero-actions \.button::before\s*\{[\s\S]*?linear-gradient[\s\S]*?translateX\(-145%\)/);
  assert.match(home, /\.hero-commercial \.hero-actions \.button:hover::before\s*\{[\s\S]*?translateX\(145%\)/);
  assert.match(home, /\.hero-commercial \.hero-actions \.button-primary:hover\s*\{[\s\S]*?translateY\(-3px\)[\s\S]*?scale\(1\.018\)/);
  assert.match(home, /\.hero-commercial \.hero-actions \.button-primary:hover svg\s*\{[\s\S]*?translateX\(4px\)/);
  assert.match(home, /\.hero-commercial \.hero-actions \.button:active\s*\{[\s\S]*?scale\(\.98\)/);
});

test("header CTA and plus trigger use richer matching hover motion", () => {
  assert.match(header, /\/\* v41 — header CTA interaction \*\/[\s\S]*?\.demoButton:hover\s*\{[\s\S]*?translateY\(-2px\)[\s\S]*?scale\(1\.015\)/);
  assert.match(header, /\.demoButton::before\s*\{[\s\S]*?translateX\(-145%\)/);
  assert.match(header, /\.demoButton:hover::before\s*\{[\s\S]*?translateX\(145%\)/);
  assert.match(menu, /\/\* v41 — menu trigger interaction \*\/[\s\S]*?\.trigger:hover \.icon\s*\{[\s\S]*?rotate\(18deg\)[\s\S]*?scale\(1\.08\)/);
  assert.match(menu, /\.trigger:active\s*\{[\s\S]*?scale\(\.94\)/);
});

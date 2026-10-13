import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const read = (path: string) => readFileSync(new URL(path, import.meta.url), "utf8");
const overview = read("../components/home-commercial/HomeModulesOverview.tsx");
const overviewCss = read("../components/home-commercial/HomeModulesOverview.module.css");
const shell = read("../components/home-commercial/ModuleStoryShell.tsx");
const shellCss = read("../components/home-commercial/ModuleStoryShell.module.css");

test("modules overview keeps the approved icon-led map and its existing reveal behavior", () => {
  assert.match(overview, /"use client"/);
  assert.match(overview, /IntersectionObserver/);
  assert.match(overview, /data-visible/);
  assert.match(overview, /moduleIcons/);
  assert.match(overview, /className=\{styles\.icon\}/);
  assert.match(overview, /className=\{styles\.rail\}/);
  assert.match(overview, /className=\{styles\.arrow\}/);
  assert.match(overview, /gridGlow/);
  assert.match(overviewCss, /@keyframes\s+moduleReveal/);
  assert.match(overviewCss, /@keyframes\s+networkPulse/);
  assert.match(overviewCss, /prefers-reduced-motion:\s*reduce/);
});

test("module overview restores the approved four-column module map instead of the V127 track layout", () => {
  assert.doesNotMatch(overview, /className=\{styles\.track\}/);
  assert.doesNotMatch(overview, /moduleOverviewMeta/);
  assert.match(overviewCss, /grid-template-columns:\s*repeat\(4,1fr\)/);
  assert.doesNotMatch(overviewCss, /item\[data-module="fluxos"\]\{grid-column:span 7/);
  assert.match(overviewCss, /@media\s*\(max-width:\s*980px\)/);
  assert.match(overviewCss, /@media\s*\(max-width:\s*620px\)/);
});

test("story CTAs use the stronger V105 action control without becoming pill-shaped SaaS buttons", () => {
  assert.match(shell, /className=\{styles\.cta\}/);
  assert.match(shell, /className=\{styles\.ctaIcon\}/);
  assert.match(shell, /module\.ctaLabel/);
  assert.match(shellCss, /\.cta\s*\{[^}]*min-height:\s*48px/s);
  assert.match(shellCss, /border-radius:\s*8px/);
  assert.doesNotMatch(shellCss, /\.cta\s*\{[^}]*border-radius:\s*999px/s);
});

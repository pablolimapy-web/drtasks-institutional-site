import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const read = (path: string) => readFileSync(new URL(path, import.meta.url), "utf8");

const home = read("../app/page.tsx");
const packageJson = JSON.parse(read("../../package.json")) as { dependencies?: Record<string, string> };

test("technology LogoLoop stays available as a legacy component but is retired from Home", () => {
  assert.doesNotMatch(home, /TechnologyLogoLoop/);
  assert.doesNotMatch(home, /ModuleShowcase/);
});

test("React Bits LogoLoop registry source is installed as the JS-CSS variant", () => {
  const source = read("../components/LogoLoop.jsx");
  const css = read("../components/LogoLoop.css");

  assert.match(source, /const ANIMATION_CONFIG = \{ SMOOTH_TAU: 0\.25, MIN_COPIES: 2, COPY_HEADROOM: 2 \}/);
  assert.match(source, /useAnimationLoop/);
  assert.match(source, /LogoLoop\.displayName = 'LogoLoop'/);
  assert.match(css, /\.logoloop__track/);
  assert.match(css, /prefers-reduced-motion: reduce/);
});

test("post-hero technology loop uses the requested horizontal configuration", () => {
  const source = read("../components/TechnologyLogoLoop.tsx");

  assert.match(source, /SiReact/);
  assert.match(source, /SiNextdotjs/);
  assert.match(source, /SiTypescript/);
  assert.match(source, /SiTailwindcss/);
  assert.match(source, /speed=\{120\}/);
  assert.match(source, /direction="left"/);
  assert.match(source, /logoHeight=\{48\}/);
  assert.match(source, /gap=\{40\}/);
  assert.match(source, /hoverSpeed=\{0\}/);
  assert.match(source, /scaleOnHover/);
  assert.match(source, /fadeOut/);
  assert.match(source, /fadeOutColor="#ffffff"/);
  assert.match(source, /ariaLabel="Technology partners"/);
});

test("react-icons is installed for the configured technology logos", () => {
  assert.ok(packageJson.dependencies?.["react-icons"], "react-icons dependency should be declared");
});

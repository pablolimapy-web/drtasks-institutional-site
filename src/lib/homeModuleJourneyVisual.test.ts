import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { moduleShowcaseModules } from "./moduleShowcase.ts";

const chapterNames = ["Fluxos", "Projects", "Finance", "Team", "Resources"] as const;
const files = chapterNames.map((name) => fs.readFileSync(`src/components/home-modules/${name}Chapter.tsx`, "utf8"));
const joined = files.join("\n");

test("every Home chapter uses a real product image and the centralized product deep link", () => {
  assert.deepEqual(moduleShowcaseModules.map((module) => module.href), [
    "/produto/fluxos",
    "/produto/projetos-e-tarefas",
    "/produto/financeiro",
    "/produto/equipe",
    "/produto/recursos",
  ]);
  assert.equal((joined.match(/next\/image/g) ?? []).length >= 5, true);
  assert.equal((joined.match(/href=\{module\.href\}/g) ?? []).length, 5);
});

test("Home module chapters do not mount duplicate ProductPreview engines", () => {
  assert.doesNotMatch(joined, /<ProductPreview/);
});

test("all five chapter styles declare responsive and reduced-motion handling", () => {
  for (const name of chapterNames) {
    const css = fs.readFileSync(`src/components/home-modules/${name}Chapter.module.css`, "utf8");
    assert.match(css, /@media \(max-width:/);
    assert.match(css, /prefers-reduced-motion/);
  }
});

test("Anime.js dependency is fully represented in the package lock", () => {
  const lock = JSON.parse(fs.readFileSync("package-lock.json", "utf8"));
  assert.equal(lock.packages[""].dependencies.animejs, "^4.5.0");
  assert.equal(lock.packages["node_modules/animejs"]?.version, "4.5.0");
});

test("mobile chapter reading order keeps the product visual before the deep-link CTA", () => {
  files.forEach((source, index) => {
    const visual = source.indexOf('className={styles.visual}');
    const cta = source.indexOf('<ModuleChapterLink');
    assert.ok(visual >= 0, `${chapterNames[index]} is missing the visual region`);
    assert.ok(cta > visual, `${chapterNames[index]} renders the deep-link CTA before the product visual`);
  });
});

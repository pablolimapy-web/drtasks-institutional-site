import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

const shell = fs.readFileSync("src/components/home-commercial/ModuleStoryShell.tsx", "utf8");
const css = fs.readFileSync("src/components/home-commercial/ModuleStoryShell.module.css", "utf8");
const stories = fs
  .readdirSync("src/components/home-commercial/stories")
  .filter((name) => name.endsWith("Story.tsx"))
  .map((name) => fs.readFileSync(`src/components/home-commercial/stories/${name}`, "utf8"))
  .join("\n");

test("module story shell exposes module identity while keeping accessible copy first in the DOM", () => {
  assert.match(shell, /data-module=\{module\.id\}/);
  assert.match(shell, /module\.ctaLabel/);
  assert.doesNotMatch(shell, /reverse\s*=|data-reverse/);
  assert.ok(shell.indexOf("className={styles.copy}") < shell.indexOf("className={styles.visual}"));
  assert.doesNotMatch(stories, /<ModuleStoryShell[^>]*\breverse\b/);
});

test("module story shell uses a twelve-column field with a distinct composition per module and collapses safely", () => {
  assert.match(css, /grid-template-columns:\s*repeat\(12/);
  for (const moduleId of ["fluxos", "projects", "finance", "quotes", "requests", "chat", "team-time", "resources"]) {
    assert.match(css, new RegExp(`data-module=["']${moduleId}["']`));
  }
  assert.match(css, /@media\s*\(max-width:\s*(?:980|1080)px\)/);
  assert.match(css, /@media\s*\(max-width:\s*620px\)/);
  assert.doesNotMatch(css, /height:\s*100vh/);
});

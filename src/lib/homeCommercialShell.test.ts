import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

const overview = "src/components/home-commercial/HomeModulesOverview.tsx";
const overviewCss = "src/components/home-commercial/HomeModulesOverview.module.css";
const shell = "src/components/home-commercial/ModuleStoryShell.tsx";
const shellCss = "src/components/home-commercial/ModuleStoryShell.module.css";

test("module overview is sourced from the single commercial module list", () => {
  assert.equal(fs.existsSync(overview), true);
  const source = fs.readFileSync(overview, "utf8");
  assert.match(source, /homeCommercialModules\.map/);
  assert.match(source, /id="modulos"/);
  assert.match(source, /`#\$\{module\.anchor\}`/);
  assert.equal((source.match(/FluxOS/g) ?? []).length, 0, "overview must not duplicate literal module labels");
});

test("story shell owns commercial copy and keeps visual after copy in reading order", () => {
  assert.equal(fs.existsSync(shell), true);
  const source = fs.readFileSync(shell, "utf8");
  assert.match(source, /module\.painHeadline/);
  assert.match(source, /<h2/);
  assert.match(source, /module\.support/);
  assert.doesNotMatch(source, /module\.result/);
  assert.match(source, /className=\{styles\.cta\}/);
  assert.match(source, /module\.ctaLabel/);
  assert.match(source, /href=\{module\.href\}/);
  assert.match(source, /data-layout=\{module\.layout\}/);
  assert.doesNotMatch(source, /reverse\s*=|data-reverse/);
  assert.doesNotMatch(source, /styles\.kicker/);
  assert.doesNotMatch(source, /module\.index|module\.label/);
  assert.ok(source.indexOf("className={styles.copy}") < source.indexOf("className={styles.visual}"));
});

test("overview and story shell stay compact, dark, responsive and keyboard visible", () => {
  for (const cssPath of [overviewCss, shellCss]) {
    assert.equal(fs.existsSync(cssPath), true);
    const css = fs.readFileSync(cssPath, "utf8");
    assert.match(css, /focus-visible/);
    assert.match(css, /@media\s*\(max-width:/);
    assert.doesNotMatch(css, /height:\s*100vh/);
  }
  const shellSource = fs.readFileSync(shellCss, "utf8");
  assert.match(shellSource, /grid-template-columns/);
  assert.doesNotMatch(shellSource, /\.kicker(?:\b|\s|:)/);
});

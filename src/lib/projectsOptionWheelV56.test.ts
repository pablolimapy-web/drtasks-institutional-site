import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

const source = fs.readFileSync("src/components/home-modules/ProjectsChapter.tsx", "utf8");
const css = fs.readFileSync("src/components/home-modules/ProjectsChapter.module.css", "utf8");

test("Projects chapter restores a strong editorial headline above the hierarchy", () => {
  assert.match(source, /Do contexto à execução/);
  assert.match(source, /tudo no mesmo fluxo/);
  assert.match(source, /02 \/ PROJETOS E TAREFAS/);
  assert.match(css, /\.intro h2/);
});

test("Projects desktop composition exposes the hierarchy side by side", () => {
  assert.match(css, /\.hierarchyGrid\s*\{[\s\S]*grid-template-columns:\s*repeat\(4/);
  assert.match(css, /\.hierarchyColumn \+ \.hierarchyColumn/);
  assert.match(source, /flowConnector/);
});

test("Projects hierarchy adapts to two columns and one column responsively", () => {
  assert.match(css, /@media \(max-width: 1180px\)[\s\S]*grid-template-columns:\s*repeat\(2/);
  assert.match(css, /@media \(max-width: 720px\)[\s\S]*grid-template-columns:\s*1fr/);
});

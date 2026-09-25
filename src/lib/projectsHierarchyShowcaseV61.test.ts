import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

const source = fs.readFileSync("src/components/home-modules/ProjectsChapter.tsx", "utf8");
const css = fs.readFileSync("src/components/home-modules/ProjectsChapter.module.css", "utf8");

test("Projects chapter presents the four-level hierarchy in one visual flow", () => {
  assert.doesNotMatch(source, /OptionWheel/);
  assert.match(source, /Do contexto à execução/);
  assert.match(source, /tudo no mesmo fluxo/);
  assert.match(source, /hierarchyGrid/);
  assert.match(source, /hierarchyColumn/);
  assert.match(source, /InstitutionScene/);
  assert.match(source, /WorkspaceScene/);
  assert.match(source, /ProjectScene/);
  assert.match(source, /TaskScene/);
  for (const label of ["Instituição", "Workspace", "Projeto", "Tarefa"]) {
    assert.match(source, new RegExp(label));
  }
});

test("Projects hierarchy stays alive with staged entrance and automatic focus", () => {
  assert.match(source, /activeStep/);
  assert.match(source, /window\.setInterval/);
  assert.match(source, /4800/);
  assert.match(source, /whileInView/);
  assert.match(source, /onMouseEnter/);
  assert.match(source, /onFocus/);
  assert.match(css, /\.flowLine/);
  assert.match(css, /\.flowParticle/);
  assert.match(css, /@keyframes flowTravel/);
  assert.match(css, /\.hierarchyColumn\[data-active="true"\]/);
});

test("Each hierarchy level has a dedicated mini-interface rather than a screenshot swap", () => {
  for (const className of ["institutionScene", "workspaceScene", "projectScene", "taskScene"]) {
    assert.match(css, new RegExp(`\\.${className}`));
  }
  assert.match(css, /\.miniKanban/);
  assert.match(css, /\.taskCard/);
  assert.match(css, /\.workspaceList/);
  assert.match(css, /\.branchNode/);
});

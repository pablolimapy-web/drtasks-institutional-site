import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

const source = fs.readFileSync("src/components/home-modules/ProjectsChapter.tsx", "utf8");

test("Projects chapter shows hierarchy with real product screens", () => {
  for (const asset of ["institutions.jpg", "workspace.jpg", "tasks.jpg"]) assert.match(source, new RegExp(asset.replace(".", "\\.")));
  for (const level of ["Instituição", "Workspace", "Projeto", "Tarefa"]) assert.match(source, new RegExp(level));
  assert.match(source, /Saiba mais sobre Projetos e Tarefas/);
});

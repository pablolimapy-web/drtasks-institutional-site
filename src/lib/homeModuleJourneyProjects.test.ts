import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

const source = fs.readFileSync("src/components/home-modules/ProjectsChapter.tsx", "utf8");

test("Projects chapter explains the operational hierarchy in one connected visual", () => {
  for (const level of ["Instituição", "Workspace", "Projeto", "Tarefa"]) assert.match(source, new RegExp(level));
  for (const scene of ["InstitutionScene", "WorkspaceScene", "ProjectScene", "TaskScene"]) assert.match(source, new RegExp(scene));
  assert.match(source, /Saiba mais sobre Projetos e Tarefas/);
});

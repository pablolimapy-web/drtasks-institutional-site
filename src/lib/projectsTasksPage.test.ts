import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

const pagePath = "src/app/produto/projetos-e-tarefas/page.tsx";
const explorerPath = "src/components/product/HierarchyExplorer.tsx";

test("projects and tasks page exists with its own canonical metadata", () => {
  assert.equal(fs.existsSync(pagePath), true);
  const source = fs.readFileSync(pagePath, "utf8");
  assert.match(source, /Do cliente à tarefa/);
  assert.match(source, /createPageMetadata[\s\S]*["']\/produto\/projetos-e-tarefas["']/);
  assert.match(source, /Agendar demonstração/);
});

test("projects and tasks page explains the operational hierarchy", () => {
  const source = fs.readFileSync(pagePath, "utf8");
  for (const label of ["Instituição", "Workspace", "Projeto", "Estágio", "Tarefa"]) {
    assert.match(source, new RegExp(label));
  }
  assert.match(source, /\/produto\/fluxos/);
});

test("hierarchy explorer uses sanitized real-product screens", () => {
  assert.equal(fs.existsSync(explorerPath), true);
  const source = fs.readFileSync(explorerPath, "utf8");
  assert.match(source, /\/product\/projects-tasks\/institutions\.jpg/);
  assert.match(source, /\/product\/projects-tasks\/workspace\.jpg/);
  assert.match(source, /\/product\/pillars\/projects\.jpg/);
  assert.match(source, /\/product\/projects-tasks\/tasks\.jpg/);
  assert.match(source, /Dados demonstrativos protegidos/);
});

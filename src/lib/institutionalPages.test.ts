import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

const howPath = "src/app/como-funciona/page.tsx";
const aboutPath = "src/app/sobre/page.tsx";
const guidePath = "src/app/guia/page.tsx";
const fluxGuidePath = "src/app/guia/fluxos/page.tsx";
const hierarchyGuidePath = "src/app/guia/projeto-estagio-tarefa/page.tsx";

test("how it works page explains the product model and onboarding path", () => {
  assert.equal(fs.existsSync(howPath), true, "how-it-works page should exist");
  const source = fs.readFileSync(howPath, "utf8");

  assert.match(source, /createPageMetadata[\s\S]*["']\/como-funciona["']/);
  assert.match(source, /Cadastre o contexto/);
  assert.match(source, /Configure o caminho/);
  assert.match(source, /Faça o trabalho avançar/);
  for (const label of ["Instituição", "Workspace", "Projeto", "Estágio", "Tarefa", "FluxOS"]) {
    assert.match(source, new RegExp(label));
  }
});

test("about page tells the real origin without competitor attacks", () => {
  assert.equal(fs.existsSync(aboutPath), true, "about page should exist");
  const source = fs.readFileSync(aboutPath, "utf8");

  assert.match(source, /createPageMetadata[\s\S]*["']\/sobre["']/);
  assert.match(source, /Nascido de uma operação real/);
  assert.match(source, /planilhas/i);
  assert.match(source, /contratos/i);
  assert.match(source, /obras/i);
  assert.match(source, /próxima ação/i);
  assert.doesNotMatch(source, /Vobi|Bitrix|BoxObra/);
});

test("guide publishes activation-focused help routes", () => {
  for (const path of [guidePath, fluxGuidePath, hierarchyGuidePath]) {
    assert.equal(fs.existsSync(path), true, `${path} should exist`);
  }

  const guide = fs.readFileSync(guidePath, "utf8");
  assert.match(guide, /createPageMetadata[\s\S]*["']\/guia["']/);
  assert.match(guide, /O que é o FluxOS/);
  assert.match(guide, /Diferença entre projeto, estágio e tarefa/);
  assert.match(guide, /Como configurar os primeiros estágios/);
  assert.match(guide, /Como acompanhar aging e bloqueios/);
  assert.match(guide, /Papéis e permissões/);
  assert.match(guide, /Histórico/);

  const fluxGuide = fs.readFileSync(fluxGuidePath, "utf8");
  assert.match(fluxGuide, /createPageMetadata[\s\S]*["']\/guia\/fluxos["']/);
  assert.match(fluxGuide, /carteira/i);
  assert.match(fluxGuide, /próxima ação/i);

  const hierarchyGuide = fs.readFileSync(hierarchyGuidePath, "utf8");
  assert.match(hierarchyGuide, /createPageMetadata[\s\S]*["']\/guia\/projeto-estagio-tarefa["']/);
  assert.match(hierarchyGuide, /Projeto/);
  assert.match(hierarchyGuide, /Estágio/);
  assert.match(hierarchyGuide, /Tarefa/);
});

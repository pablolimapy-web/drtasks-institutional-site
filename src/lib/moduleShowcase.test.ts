import test from "node:test";
import assert from "node:assert/strict";
import {
  getModuleShowcaseModule,
  moduleShowcaseModules,
} from "./moduleShowcase.ts";

test("home Product Stage exposes exactly five modules in the approved order", () => {
  assert.deepEqual(
    moduleShowcaseModules.map((module) => module.id),
    ["fluxos", "projects", "finance", "team", "resources"],
  );
  assert.deepEqual(
    moduleShowcaseModules.map((module) => module.label),
    ["FluxOS", "Projetos", "Financeiro", "Equipe & tempo", "Recursos"],
  );
});

test("Product Stage keeps the published product deep links", () => {
  assert.deepEqual(
    moduleShowcaseModules.map((module) => module.href),
    [
      "/produto/fluxos",
      "/produto/projetos-e-tarefas",
      "/produto/financeiro",
      "/produto/equipe",
      "/produto/recursos",
    ],
  );
});

test("module lookup falls back to FluxOS for invalid ids", () => {
  assert.equal(getModuleShowcaseModule("finance").id, "finance");
  assert.equal(getModuleShowcaseModule("unknown").id, "fluxos");
});

test("public demo metadata does not expose supplied production identities", () => {
  const serialized = JSON.stringify(moduleShowcaseModules);
  for (const forbidden of [
    "SESA PR",
    "ANATEL SC",
    "Pablo Miguel",
    "Ryan Lucca",
    "Kaiky Silva Oliveira",
    "POLICIA FEDERAL",
  ]) {
    assert.doesNotMatch(serialized, new RegExp(forbidden, "i"));
  }
});

import test from "node:test";
import assert from "node:assert/strict";
import { moduleShowcaseModules } from "./moduleShowcase.ts";

test("home module journey exposes the five approved anchors in order", () => {
  assert.deepEqual(
    moduleShowcaseModules.map((module) => module.anchor),
    [
      "modulo-fluxos",
      "modulo-projetos",
      "modulo-financeiro",
      "modulo-equipe",
      "modulo-recursos",
    ],
  );
});

test("home module journey keeps the approved product deep links", () => {
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

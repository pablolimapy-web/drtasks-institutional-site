import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import assert from "node:assert/strict";

const root = process.cwd();
const component = fs.readFileSync(path.join(root, "src/components/home-modules/ResourcesChapter.tsx"), "utf8");
const css = fs.readFileSync(path.join(root, "src/components/home-modules/ResourcesChapter.module.css"), "utf8");

test("resources v63 uses one canonical stylesheet instead of stacked version overrides", () => {
  assert.doesNotMatch(css, /\/\*\s*v\d+/i);
  assert.match(css, /\.referenceGrid\s*\{/);
  assert.match(css, /\.drTasksShell\s*\{/);
});

test("resources v63 makes the field-to-project transfer an animated narrative", () => {
  assert.match(component, /from "animejs"/);
  assert.match(component, /\banimate\(/);
  assert.match(component, /\bstagger\(/);
  assert.match(component, /data-resource-field/);
  assert.match(component, /fieldConnectorPulse/);
  assert.match(component, /fieldConnectorDot/);
  assert.match(component, /Evidência vinculada/);
});

test("resources v63 promotes the reconstructed Dr Tasks evidence workspace", () => {
  for (const token of ["Reforma Sede", "Evidências", "Adicionar evidência", "Fotos", "Documentos", "Checklists", "Localizações"]) {
    assert.match(component, new RegExp(token));
  }
  assert.ok((component.match(/evidenceCards/g) ?? []).length >= 2);
  assert.match(component, /files\.jpg/);
  assert.match(component, /location\.jpg/);
});

test("resources v63 keeps four operational benefits in a single feature rail", () => {
  for (const token of ["Localização", "Documentos", "Evidências", "Contexto no projeto"]) {
    assert.match(component, new RegExp(token));
  }
  assert.match(component, /featureRail/);
});

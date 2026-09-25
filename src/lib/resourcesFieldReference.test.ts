import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import assert from "node:assert/strict";

const component = fs.readFileSync(path.join(process.cwd(),"src/components/home-modules/ResourcesChapter.tsx"),"utf8");
const css = fs.readFileSync(path.join(process.cwd(),"src/components/home-modules/ResourcesChapter.module.css"),"utf8");

test("Campo reproduces four reference cards and a separate convergence hub", () => {
  for (const label of ["Foto no campo","Localização","Documento","Registro"]) assert.match(component,new RegExp(label));
  assert.match(component,/fieldConnectorDot/);
  assert.match(component,/hubIcon/);
  assert.match(component,/hubCaption/);
  assert.match(component,/Evidência vinculada/);
  assert.match(component,/M276 68 C320 68 306 194 329 194/);
  assert.match(component,/M276 320 C320 320 306 194 329 194/);
  assert.match(component,/M354 194 C370 194 371 214 387 214/);
  assert.match(component,/productConnectorDot/);
});

test("Campo reference geometry keeps cards, hub and connector visually explicit", () => {
  for (const token of [".fieldCard{",".fieldConnectorDot{",".hubIcon{",".hubCaption{"]) assert.ok(css.includes(token), token);
});

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

const read = (path: string) => fs.readFileSync(path, "utf8");

test("root layout does not force the home canonical on every route", () => {
  const source = read("src/app/layout.tsx");
  assert.doesNotMatch(source, /alternates\s*:\s*\{\s*canonical\s*:\s*["']\/["']\s*\}/);
});

test("SEO metadata is centralized in a reusable helper", () => {
  assert.equal(fs.existsSync("src/lib/seo.ts"), true);
  const source = read("src/lib/seo.ts");
  assert.match(source, /export function createPageMetadata/);
  assert.match(source, /openGraph/);
  assert.match(source, /twitter/);
});

test("sitemap is driven by the published route source of truth", () => {
  const source = read("src/app/sitemap.ts");
  assert.match(source, /publishedRoutes/);
  assert.doesNotMatch(source, /\["",\s*"\/demo"/);
});

test("robots keeps non-public app and checkout flows out of indexing", () => {
  const source = read("src/app/robots.ts");
  assert.match(source, /\/app/);
  assert.match(source, /\/checkout/);
});

test("published routes include public guide articles and contact", () => {
  const source = read("src/lib/productArchitecture.ts");
  for (const route of ["/guia/fluxos", "/guia/projeto-estagio-tarefa", "/contato"]) {
    assert.match(source, new RegExp(`["']${route}["']`), route);
  }
});

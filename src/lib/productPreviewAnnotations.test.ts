import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const hero = readFileSync(new URL("../components/HeroCommercialRotating.tsx", import.meta.url), "utf8");
const preview = readFileSync(new URL("../components/ProductPreview.tsx", import.meta.url), "utf8");
const previewStyles = readFileSync(new URL("../components/ProductPreview.module.css", import.meta.url), "utf8");

test("external FluxOS annotations are scene-aware and owned by ProductPreview", () => {
  assert.doesNotMatch(hero, /previewTopRail|previewBottomRail|annotationAnchor/);
  assert.match(preview, /externalAnnotations/);
  assert.match(preview, /showKpiAnnotations/);
  assert.match(preview, /showTableAnnotation/);
  assert.match(preview, /showDrawerAnnotation/);
  assert.match(preview, /AnimatePresence/);
});

test("annotations orbit outside the frame without adding layout rows", () => {
  assert.match(previewStyles, /\.externalAnnotations\s*\{[\s\S]*?position:\s*absolute/);
  assert.match(previewStyles, /\.annotationTop\s*\{[\s\S]*?bottom:\s*calc\(100% \+ /);
  assert.match(previewStyles, /\.annotationBottom\s*\{[\s\S]*?top:\s*calc\(100% \+ /);
  assert.doesNotMatch(hero, /grid-template-rows:\s*auto\s+auto\s+auto/);
});

test("brand intro exits cleanly without a long heavy blur", () => {
  assert.match(preview, /filter:\s*"blur\(2px\)"/);
  assert.doesNotMatch(preview, /filter:\s*"blur\(8px\)"/);
});

test("showcase mode does not render the Hero-only brand launch", () => {
  assert.match(preview, /mode !== "showcase"/);
  assert.match(preview, /intro && mode !== "showcase"/);
});

test("showcase mode keeps Hero-only external annotations out of the Product Stage", () => {
  assert.match(preview, /mode === "hero" && \(/);
});

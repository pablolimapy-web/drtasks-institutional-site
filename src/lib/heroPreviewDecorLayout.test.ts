import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const preview = readFileSync(new URL("../components/ProductPreview.tsx", import.meta.url), "utf8");
const styles = readFileSync(new URL("../components/ProductPreview.module.css", import.meta.url), "utf8");

test("explanatory annotations stay outside FluxOS content instead of covering the interface", () => {
  assert.match(preview, /externalAnnotations/);
  assert.doesNotMatch(preview, /kpiCallout|rowCallout|stageCallout|healthCallout/);
  assert.match(styles, /\.externalAnnotations/);
  assert.match(styles, /\.annotationTop/);
  assert.match(styles, /\.annotationBottom/);
});

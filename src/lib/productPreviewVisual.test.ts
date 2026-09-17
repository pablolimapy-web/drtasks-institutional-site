import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const source = readFileSync(new URL("../components/ProductPreview.tsx", import.meta.url), "utf8");
const styles = readFileSync(new URL("../components/ProductPreview.module.css", import.meta.url), "utf8");

test("FluxOS opening uses the supplied Dr Tasks wordmark and a layered brand reveal", () => {
  assert.match(source, /\/hero\/drtasks-wordmark\.png/);
  assert.match(source, /brandLogoImage/);
  assert.match(styles, /\.brandLogoImage/);
  assert.match(styles, /\.brandSweep/);
});

test("FluxOS interface builds the table progressively instead of leaving an empty canvas", () => {
  assert.match(source, /tableScaffold/);
  assert.match(source, /stageRail/);
  assert.match(source, /tableRowsReady/);
  assert.match(styles, /\.tableScaffold/);
  assert.match(styles, /\.stageRail/);
});

test("FluxOS table keeps real OS data while exposing the real progress signal", () => {
  assert.match(source, /progress:\s*45/);
  assert.match(source, /130 - N° 09\/2025 - MANUTENÇÃO EM SUBESTAÇÃO/);
  assert.match(source, /46\.355,95/);
});

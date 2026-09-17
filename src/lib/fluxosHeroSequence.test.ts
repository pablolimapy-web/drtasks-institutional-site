import test from "node:test";
import assert from "node:assert/strict";
import {
  FLUXOS_HERO_SCENES,
  getFluxosHeroScene,
  nextFluxosHeroScene,
} from "./fluxosHeroSequence.ts";

test("FluxOS hero tells a paced product story and loops", () => {
  assert.deepEqual(FLUXOS_HERO_SCENES.map(scene => scene.id), [
    "brandIntro",
    "shellBuild",
    "kpiFocus",
    "tableBuild",
    "rowSpotlight",
    "drawer",
    "drawerCallouts",
  ]);

  for (let index = 0; index < FLUXOS_HERO_SCENES.length - 1; index += 1) {
    assert.equal(nextFluxosHeroScene(index), index + 1);
  }
  assert.equal(nextFluxosHeroScene(FLUXOS_HERO_SCENES.length - 1), 0);
});

test("hero scenes hold long enough to be understood", () => {
  const scene = (id: string) => FLUXOS_HERO_SCENES.find(item => item.id === id);

  assert.ok(scene("brandIntro")!.durationMs >= 2800);
  assert.ok(scene("shellBuild")!.durationMs >= 2800);
  assert.ok(scene("kpiFocus")!.durationMs >= 2800);
  assert.ok(scene("tableBuild")!.durationMs >= 3400);
  assert.ok(scene("rowSpotlight")!.durationMs >= 4000);
  assert.ok(scene("drawer")!.durationMs >= 3200);
  assert.ok(scene("drawerCallouts")!.durationMs >= 4200);
});

test("getFluxosHeroScene safely normalizes invalid indexes", () => {
  assert.equal(getFluxosHeroScene(-1).id, "drawerCallouts");
  assert.equal(getFluxosHeroScene(7).id, "brandIntro");
  assert.equal(getFluxosHeroScene(Number.NaN).id, "brandIntro");
});

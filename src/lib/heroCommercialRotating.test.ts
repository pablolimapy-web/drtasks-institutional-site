import test from "node:test";
import assert from "node:assert/strict";
import { heroRotatingCopy } from "./heroCommercialRotating.ts";

test("commercial hero keeps a compact static promise with rotating operational outcomes", () => {
  assert.equal(heroRotatingCopy.staticTitle, "Saiba o processo em cada projeto");
  assert.deepEqual(heroRotatingCopy.phrases, [
    "Veja a próxima ação.",
    "Saiba quem precisa agir.",
    "Encontre o que está bloqueado.",
    "Antecipe prazos sem riscos.",
  ]);
});

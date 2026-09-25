import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

const showcase = fs.readFileSync("src/components/ModuleShowcase.tsx", "utf8");
const cardSwap = fs.readFileSync("src/components/react-bits/CardSwap.tsx", "utf8");
const cardSwapCss = fs.readFileSync("src/components/react-bits/CardSwap.module.css", "utf8");

test("module copy crossfades cleanly instead of morphing words between modules", () => {
  assert.match(showcase, /AnimatePresence[^>]*mode="wait"/);
  assert.doesNotMatch(showcase, /LayoutGroup/);
  assert.doesNotMatch(showcase, /layoutId=/);
  assert.match(showcase, /opacity:\s*0/);
  assert.match(showcase, /filter:\s*"blur\(5px\)"/);
  assert.match(showcase, /filter:\s*"blur\(0px\)"/);
});

test("CardSwap uses a short focus transition instead of dropping the front card off-stage", () => {
  assert.doesNotMatch(cardSwap, /y:\s*["']\+=260["']/);
  assert.match(cardSwap, /focusOut/);
  assert.match(cardSwap, /scale:\s*0\.985/);
  assert.match(cardSwap, /filter:\s*"blur\(3px\)"/);
  assert.match(cardSwap, /timeline\.addLabel\("promote"/);
  assert.match(cardSwap, /ease:\s*"power3\.out"/);
});

test("incoming copy is announced after the outgoing interface starts to recede", () => {
  const focusOutIndex = cardSwap.indexOf('timeline.addLabel("focusOut"');
  const notifyIndex = cardSwap.indexOf("onActiveChangeRef.current?.(nextFrontIndex)");
  assert.ok(focusOutIndex >= 0, "focus-out label must exist");
  assert.ok(notifyIndex >= 0, "incoming front index must be announced");
  assert.ok(focusOutIndex < notifyIndex, "copy should not switch before focus-out begins");
});

test("deck transition includes a restrained blue focus veil", () => {
  assert.match(cardSwap, /focusVeil/);
  assert.match(cardSwapCss, /\.focusVeil\s*\{/);
  assert.match(cardSwapCss, /radial-gradient/);
  assert.match(cardSwapCss, /rgba\(37,\s*99,\s*235,/);
});

test("ModuleShowcase opts into the focus transition rather than elastic motion", () => {
  assert.match(showcase, /easing="focus"/);
  assert.doesNotMatch(showcase, /easing="elastic"/);
});

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

const source = fs.readFileSync("src/components/ModuleShowcase.tsx", "utf8");
const styles = fs.readFileSync("src/components/ModuleShowcase.module.css", "utf8");
const cardSwapSource = fs.readFileSync("src/components/react-bits/CardSwap.tsx", "utf8");
const cardSwapStyles = fs.readFileSync("src/components/react-bits/CardSwap.module.css", "utf8");

test("showcase removes the extra institutional intro and click hint", () => {
  assert.doesNotMatch(source, /Produto conectado/);
  assert.doesNotMatch(source, /Projetos, execução, financeiro, equipe e recursos compartilham/);
  assert.doesNotMatch(source, /Clique na interface para avançar/);
  assert.doesNotMatch(source, /deckHint/);
});

test("showcase puts the animated explanation before the CardSwap stack", () => {
  const copyIndex = source.indexOf("className={styles.copyColumn}");
  const deckIndex = source.indexOf("className={styles.deckColumn}");
  assert.ok(copyIndex >= 0, "copy column must exist");
  assert.ok(deckIndex >= 0, "deck column must exist");
  assert.ok(copyIndex < deckIndex, "copy must render before the card stack");
});

test("showcase uses a dedicated next-interface button instead of card clicks", () => {
  assert.match(source, /Próxima interface/);
  assert.match(source, /cardSwapRef\.current\?\.next\(\)/);
  assert.doesNotMatch(source, /onCardClick=/);
});

test("showcase keeps the React Bits deck geometry but advances only from explicit controls", () => {
  assert.match(source, /cardDistance=\{60\}/);
  assert.match(source, /verticalDistance=\{70\}/);
  assert.match(source, /delay=\{0\}/);
  assert.match(source, /pauseOnHover=\{false\}/);
});

test("copy column has no vertical divider and CardSwap uses original bottom-right anchoring", () => {
  const copyRule = styles.match(/\.copyColumn\s*\{[\s\S]*?\n\}/)?.[0] ?? "";
  assert.doesNotMatch(copyRule, /border-left/);
  assert.match(cardSwapStyles, /bottom:\s*0/);
  assert.match(cardSwapStyles, /right:\s*0/);
  assert.match(cardSwapStyles, /transform:\s*translate\(5%,\s*20%\)/);
});

test("CardSwap exposes an imperative next action for external controls", () => {
  assert.match(cardSwapSource, /export type CardSwapHandle/);
  assert.match(cardSwapSource, /next:\s*\(\)\s*=>/);
  assert.match(cardSwapSource, /useImperativeHandle/);
});

test("showcase removes AI-like kicker subtitles and lets the module name lead", () => {
  const metadata = fs.readFileSync("src/lib/moduleShowcase.ts", "utf8");
  assert.doesNotMatch(source, /moduleKicker|active\.eyebrow/);
  assert.doesNotMatch(metadata, /eyebrow\s*:/);
});

test("left presentation uses react-spring for first reveal and synchronized module copy transitions", () => {
  const packageJson = fs.readFileSync("package.json", "utf8");
  assert.match(packageJson, /"@react-spring\/web"/);
  assert.match(source, /from "@react-spring\/web"/);
  assert.match(source, /useTransition/);
  assert.match(source, /useTrail/);
  assert.match(source, /useSpring/);
  assert.match(source, /<animated\./);
});

test("CardSwap announces the incoming front card when the swap starts", () => {
  assert.match(cardSwapSource, /nextFrontIndex/);
  const notifyIndex = cardSwapSource.indexOf("onActiveChangeRef.current?.(nextFrontIndex)");
  const motionIndex = cardSwapSource.indexOf("timeline.to(frontElement");
  assert.ok(notifyIndex >= 0, "incoming front index must be announced");
  assert.ok(motionIndex >= 0, "front card animation must exist");
  assert.ok(notifyIndex < motionIndex, "copy must update as the card transition begins");
});

test("left presentation is larger and sits closer to the product deck", () => {
  assert.match(styles, /grid-template-columns:\s*minmax\(360px,\s*\.72fr\)\s+minmax\(0,\s*1\.28fr\)/);
  assert.match(styles, /gap:\s*clamp\(18px,\s*2vw,\s*32px\)/);
  assert.match(styles, /font-size:\s*clamp\(46px,\s*4\.2vw,\s*62px\)/);
  assert.match(styles, /font-size:\s*clamp\(17px,\s*1\.25vw,\s*19px\)/);
});

test("first copy reveal waits until the showcase enters the viewport", () => {
  assert.match(source, /const transitionItems = stageInView \|\| reducedMotion \? \[active\] : \[\];/);
  assert.match(source, /useTransition\(transitionItems/);
});

test("react-spring dependency is locked with its runtime packages", () => {
  const lock = JSON.parse(fs.readFileSync("package-lock.json", "utf8"));
  for (const name of ["animated", "core", "rafz", "shared", "types", "web"]) {
    assert.ok(lock.packages[`node_modules/@react-spring/${name}`], `missing @react-spring/${name} lock entry`);
  }
});


test("left presentation keeps only primary copy and actions", () => {
  assert.doesNotMatch(source, /storySteps|storyStep|storySignal/);
  assert.doesNotMatch(source, /copyControls|positionCount|positionTrack|pauseButton/);
  assert.doesNotMatch(source, /Pausar animação|Movimento reduzido|Retomar/);
  assert.match(source, /Próxima interface/);
  assert.match(source, /Conhecer \{module\.label\}/);
});

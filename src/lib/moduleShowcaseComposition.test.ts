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

test("showcase composes copy and CardSwap inside one presentation stage", () => {
  const stageIndex = source.indexOf("className={styles.presentationStage}");
  const copyIndex = source.indexOf("className={styles.stageCopy}", stageIndex);
  const productIndex = source.indexOf("className={styles.stageProduct}", stageIndex);
  const deckIndex = source.indexOf("<CardSwap\n", productIndex);
  assert.ok(stageIndex >= 0, "presentation stage must exist");
  assert.ok(copyIndex > stageIndex, "copy must live inside the presentation stage");
  assert.ok(productIndex > stageIndex, "product must live inside the presentation stage");
  assert.ok(deckIndex > productIndex, "CardSwap must live inside the product area");
  assert.doesNotMatch(source, /showcaseGrid|copyColumn|deckColumn/);
});

test("showcase uses a dedicated next-interface button instead of card clicks", () => {
  assert.match(source, /Próxima interface/);
  assert.match(source, /cardSwapRef\.current\?\.next\(\)/);
  assert.doesNotMatch(source, /onCardClick=/);
});

test("showcase keeps a restrained CardSwap deck with hover-pausable rotation", () => {
  assert.match(source, /cardDistance=\{18\}/);
  assert.match(source, /verticalDistance=\{20\}/);
  assert.match(source, /MODULE_ROTATION_DELAY_MS\s*=\s*12400/);
  assert.match(source, /delay=\{MODULE_ROTATION_DELAY_MS\}/);
  assert.match(source, /pauseOnHover/);
});

test("unified stage has no divider and CardSwap stays contained inside the colored canvas", () => {
  const stageRule = styles.match(/\.presentationStage\s*\{[\s\S]*?\n\}/)?.[0] ?? "";
  assert.doesNotMatch(stageRule, /border-left/);
  assert.match(stageRule, /overflow:\s*hidden/);
  assert.match(cardSwapStyles, /bottom:\s*0/);
  assert.match(cardSwapStyles, /right:\s*0/);
  assert.match(cardSwapStyles, /transform:\s*translate\(2%,\s*8%\)/);
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

test("stage copy swaps sequentially without shared-layout ghosting", () => {
  const packageJson = fs.readFileSync("package.json", "utf8");
  assert.match(packageJson, /"@react-spring\/web"/);
  assert.match(source, /from "@react-spring\/web"/);
  assert.match(source, /AnimatePresence/);
  assert.match(source, /mode="wait"/);
  assert.doesNotMatch(source, /LayoutGroup/);
  assert.doesNotMatch(source, /layoutId=/);
  assert.match(source, /exit=\{reducedMotion \? undefined : \{ opacity: 0,/);
  assert.match(source, /useSpring/);
  assert.match(source, /<animated\.div/);
  assert.doesNotMatch(source, /useTrail|useTransition/);
});

test("CardSwap announces the incoming front card when the swap starts", () => {
  assert.match(cardSwapSource, /nextFrontIndex/);
  const notifyIndex = cardSwapSource.indexOf("onActiveChangeRef.current?.(nextFrontIndex)");
  const motionIndex = cardSwapSource.indexOf("timeline.to(frontElement");
  assert.ok(notifyIndex >= 0, "incoming front index must be announced");
  assert.ok(motionIndex >= 0, "front card animation must exist");
  assert.ok(notifyIndex < motionIndex, "copy must update as the card transition begins");
});

test("colored stage integrates editorial copy with a dominant product surface", () => {
  assert.match(styles, /\.presentationStage\s*\{[\s\S]*?min-height:\s*770px/);
  assert.match(styles, /\.stageCopy\s*\{[\s\S]*?width:\s*min\(37%,\s*500px\)/);
  assert.match(styles, /\.stageProduct\s*\{[\s\S]*?width:\s*62%/);
  assert.match(styles, /font-size:\s*clamp\(42px,\s*4\.1vw,\s*62px\)/);
  assert.match(styles, /font-size:\s*clamp\(16px,\s*1\.15vw,\s*18px\)/);
});

test("first copy reveal waits until the showcase enters the viewport", () => {
  assert.match(source, /\(stageInView \|\| reducedMotion\) && \(/);
  assert.match(source, /initial=\{reducedMotion \? false : \{ opacity: 0, y: 16, filter: "blur\(6px\)" \}\}/);
});

test("react-spring dependency is locked with its runtime packages", () => {
  const lock = JSON.parse(fs.readFileSync("package-lock.json", "utf8"));
  for (const name of ["animated", "core", "rafz", "shared", "types", "web"]) {
    assert.ok(lock.packages[`node_modules/@react-spring/${name}`], `missing @react-spring/${name} lock entry`);
  }
});

test("stage presentation keeps only primary copy and actions", () => {
  assert.doesNotMatch(source, /storySteps|storyStep|storySignal/);
  assert.doesNotMatch(source, /copyControls|positionCount|positionTrack|pauseButton/);
  assert.doesNotMatch(source, /Pausar animação|Movimento reduzido|Retomar/);
  assert.match(source, /Próxima interface/);
  assert.match(source, /Conhecer \{module\.label\}/);
});

test("desktop product deck is framed by the same colored stage instead of escaping into a separate column", () => {
  assert.match(source, /width="86%"/);
  assert.match(source, /height="72%"/);
  assert.match(styles, /\.presentationStage\s*\{[\s\S]*?overflow:\s*hidden/);
  assert.match(styles, /\.stageProduct\s*\{[\s\S]*?position:\s*absolute/);
  assert.match(styles, /@media \(max-width:\s*1040px\)[\s\S]*?\.stageProduct\s*\{[\s\S]*?width:\s*104%/);
});

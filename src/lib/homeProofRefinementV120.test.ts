import test from "node:test";import assert from "node:assert/strict";import fs from "node:fs";
const read=(p:string)=>fs.readFileSync(p,"utf8");const story=read("src/components/home-commercial/OperationalProof.tsx");const css=read("src/components/home-commercial/OperationalProof.module.css");
test("V120 makes 10-20% a typographic manifesto rather than a KPI card",()=>{for(const cue of ["metricStage","metricMeaning","baseline","proofLedger","disclaimer"])assert.match(story,new RegExp(cue));assert.doesNotMatch(story,/className=\{styles\.metric\} aria-label/);});
test("V120 keeps the percentage cautiously qualified",()=>{assert.match(story,/operationalProof\.metricLabel/);assert.match(story,/operationalProof\.disclaimer/);assert.match(story,/operationalProof\.mechanisms/);});
test("V120 uses scale and rules instead of card surfaces",()=>{assert.match(css,/font-size:clamp\(132px,17vw,260px\)/);assert.match(css,/border-left:1px solid rgba\(74,152,255/);assert.doesNotMatch(css,/border-radius|box-shadow/);});
test("V120 reserves motion for the proof baseline",()=>{assert.match(css,/data-motion-visible="true"[\s\S]*baseline::before/);assert.match(css,/@keyframes proof-line/);});

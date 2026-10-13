import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

const declaration = "src/components/react-bits/Stepper.d.ts";

test("V108 gives the React Bits Stepper explicit strict TypeScript contracts", () => {
  assert.equal(fs.existsSync(declaration), true);
  const source = fs.readFileSync(declaration, "utf8");
  assert.match(source, /onStepChange\?: \(step: number\) => void/);
  assert.match(source, /renderStepIndicator\?: \(args: StepIndicatorRenderArgs\) => ReactNode/);
  assert.match(source, /onStepClick: \(step: number\) => void/);
  assert.match(source, /export function Step/);
});

import test from 'node:test';
import assert from 'node:assert/strict';
import { nextFluxStep } from './fluxCycle.ts';

test('nextFluxStep advances through all steps and loops back to zero', () => {
  assert.equal(nextFluxStep(0, 4), 1);
  assert.equal(nextFluxStep(1, 4), 2);
  assert.equal(nextFluxStep(2, 4), 3);
  assert.equal(nextFluxStep(3, 4), 0);
});

test('nextFluxStep handles invalid totals safely', () => {
  assert.equal(nextFluxStep(2, 0), 0);
  assert.equal(nextFluxStep(2, -1), 0);
});

test('fluxStepPercent returns exact grid centers for four steps', async () => {
  const { fluxStepPercent } = await import('./fluxCycle.ts');
  assert.equal(fluxStepPercent(0, 4), 12.5);
  assert.equal(fluxStepPercent(1, 4), 37.5);
  assert.equal(fluxStepPercent(2, 4), 62.5);
  assert.equal(fluxStepPercent(3, 4), 87.5);
});

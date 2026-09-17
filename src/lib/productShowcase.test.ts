import test from 'node:test';
import assert from 'node:assert/strict';
import { nextProductView } from './productShowcase.ts';

test('nextProductView advances through the four product views and loops', () => {
  assert.equal(nextProductView(0, 4), 1);
  assert.equal(nextProductView(1, 4), 2);
  assert.equal(nextProductView(2, 4), 3);
  assert.equal(nextProductView(3, 4), 0);
});

test('nextProductView normalizes invalid values safely', () => {
  assert.equal(nextProductView(Number.NaN, 4), 1);
  assert.equal(nextProductView(3, 0), 0);
});

test('normalizeProductViewIndex keeps InfiniteMenu and product copy in the same range', async () => {
  const { normalizeProductViewIndex } = await import('./productShowcase.ts');
  assert.equal(normalizeProductViewIndex(5, 4), 1);
  assert.equal(normalizeProductViewIndex(-1, 4), 3);
  assert.equal(normalizeProductViewIndex(Number.NaN, 4), 0);
  assert.equal(normalizeProductViewIndex(2, 0), 0);
});

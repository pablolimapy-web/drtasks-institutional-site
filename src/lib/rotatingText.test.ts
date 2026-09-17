import test from 'node:test';
import assert from 'node:assert/strict';
import { splitRotatingText, getRotatingStaggerDelay } from './rotatingText.ts';

test('splitRotatingText preserves word spacing for character animation', () => {
  assert.deepEqual(splitRotatingText('próximo passo', 'characters'), [
    { characters: ['p','r','ó','x','i','m','o'], needsSpace: true },
    { characters: ['p','a','s','s','o'], needsSpace: false },
  ]);
});

test('splitRotatingText can animate whole words', () => {
  assert.deepEqual(splitRotatingText('quem é responsável', 'words'), [
    { characters: ['quem'], needsSpace: true },
    { characters: ['é'], needsSpace: true },
    { characters: ['responsável'], needsSpace: false },
  ]);
});

test('getRotatingStaggerDelay supports last and center origins', () => {
  assert.equal(getRotatingStaggerDelay(0, 4, 0.02, 'last'), 0.06);
  assert.equal(getRotatingStaggerDelay(3, 4, 0.02, 'last'), 0);
  assert.equal(getRotatingStaggerDelay(2, 5, 0.02, 'center'), 0);
});

import { describe, expect, it } from 'vitest';
import { Drawing, sanitizeActions } from './canvas.ts';
import { isClose, maskWord, normalize, parseCustomWords } from './words.ts';

describe('drawing', () => {
  it('adds points to the stroke in progress, undoes and clears', () => {
    const d = new Drawing();
    expect(d.apply({ k: 's', id: 1, c: '#000000', w: 10, p: [10, 10] })).toBe(true);
    expect(d.apply({ k: 'p', id: 1, p: [20, 20, 9999, -5] })).toBe(true);
    expect(d.actions[0]).toMatchObject({ points: [10, 10, 20, 20, 800, 0] });
    expect(d.apply({ k: 'p', id: 2, p: [1, 1] })).toBe(false);
    d.apply({ k: 'f', x: 5, y: 5, c: '#ff0000' });
    d.apply({ k: 'u' });
    expect(d.actions).toHaveLength(1);
    d.apply({ k: 'x' });
    expect(d.points).toBe(0);
  });

  it('turns down bad colors and odd point lists', () => {
    const d = new Drawing();
    expect(d.apply({ k: 's', id: 1, c: 'red', w: 10, p: [1, 1] })).toBe(false);
    expect(d.apply({ k: 's', id: 1, c: '#000000', w: 10, p: [1] })).toBe(false);
    expect(sanitizeActions([{ k: 'oops' }])).toBeNull();
    expect(sanitizeActions([{ k: 'fill', x: 1, y: 2, color: '#123456' }])).toHaveLength(1);
  });
});

describe('words', () => {
  it('matches guesses whatever the case, punctuation and ё', () => {
    expect(normalize('  Ёлка!! ')).toBe('елка');
    expect(normalize('Ice-Cream')).toBe('ice cream');
  });

  it('spots a guess one letter off', () => {
    expect(isClose('elefant', 'elephant')).toBe(true);
    expect(isClose('cat', 'car')).toBe(false);
    expect(isClose('table', 'banana')).toBe(false);
  });

  it('hides letters but keeps spaces', () => {
    expect(maskWord('hot dog', [0])).toBe('h__ ___');
  });

  it('reads the host word list', () => {
    expect(parseCustomWords('cat, Dog\ncat,, x')).toEqual(['cat', 'Dog']);
  });
});

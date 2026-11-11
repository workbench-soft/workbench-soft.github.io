import { describe, expect, it } from 'vitest';
import { Drawing, HEIGHT, WIDTH } from '../shared/canvas.ts';
import { shapePoints } from './shapes.ts';

describe('shapePoints', () => {
  it('draws a line from start to end', () => {
    expect(shapePoints('line', 10, 20, 30, 40)).toEqual([10, 20, 30, 40]);
  });

  it('closes a rectangle on its first corner', () => {
    expect(shapePoints('rect', 10, 20, 30, 40)).toEqual([10, 20, 30, 20, 30, 40, 10, 40, 10, 20]);
  });

  it('keeps a circle inside its drag box and closes it', () => {
    const p = shapePoints('circle', 100, 100, 300, 200);
    expect(p.slice(0, 2)).toEqual(p.slice(-2));
    for (let i = 0; i < p.length; i += 2) {
      expect(p[i]).toBeGreaterThanOrEqual(100);
      expect(p[i]).toBeLessThanOrEqual(300);
      expect(p[i + 1]).toBeGreaterThanOrEqual(100);
      expect(p[i + 1]).toBeLessThanOrEqual(200);
    }
  });

  it('keeps each point on the grid', () => {
    const p = shapePoints('circle', -50, -50, WIDTH + 50, HEIGHT + 50);
    expect(Math.min(...p)).toBe(0);
    expect(Math.max(...p.filter((_, i) => i % 2 === 0))).toBe(WIDTH);
  });

  it('lands in a drawing as one stroke', () => {
    const d = new Drawing();
    expect(d.apply({ k: 's', id: 1, c: '#000000', w: 10, p: shapePoints('circle', 0, 0, 80, 80) })).toBe(true);
    expect(d.actions).toHaveLength(1);
  });
});

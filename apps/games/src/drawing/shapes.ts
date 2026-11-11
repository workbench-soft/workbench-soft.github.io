import { HEIGHT, WIDTH } from '../shared/canvas.ts';

export const SHAPES = ['line', 'rect', 'circle'] as const;
export type Shape = (typeof SHAPES)[number];

const CIRCLE_STEPS = 48;

const onGrid = (x: number, y: number): [number, number] => [
  Math.min(WIDTH, Math.max(0, Math.round(x))),
  Math.min(HEIGHT, Math.max(0, Math.round(y))),
];

/** The x, y pairs of a shape dragged from (x0, y0) to (x1, y1). A rectangle and a circle close on their first point. */
export function shapePoints(shape: Shape, x0: number, y0: number, x1: number, y1: number): number[] {
  if (shape === 'line') return [...onGrid(x0, y0), ...onGrid(x1, y1)];
  if (shape === 'rect') {
    const corners = [
      [x0, y0],
      [x1, y0],
      [x1, y1],
      [x0, y1],
      [x0, y0],
    ];
    return corners.flatMap(([x, y]) => onGrid(x, y));
  }
  const cx = (x0 + x1) / 2;
  const cy = (y0 + y1) / 2;
  const rx = Math.abs(x1 - x0) / 2;
  const ry = Math.abs(y1 - y0) / 2;
  const out: number[] = [];
  for (let i = 0; i <= CIRCLE_STEPS; i++) {
    const a = (i / CIRCLE_STEPS) * Math.PI * 2;
    out.push(...onGrid(cx + rx * Math.cos(a), cy + ry * Math.sin(a)));
  }
  return out;
}

// A drawing is a list of actions on a fixed 800 by 600 grid.
// The server and each browser apply the same ops, so every screen shows the same picture.

export const WIDTH = 800;
export const HEIGHT = 600;
/** Grid points a single drawing may hold. A long session stays far below it. */
export const MAX_POINTS = 80_000;
export const MAX_ACTIONS = 3_000;
export const MIN_SIZE = 2;
export const MAX_SIZE = 60;

export type Stroke = { k: 'stroke'; id: number; color: string; size: number; eraser: boolean; points: number[] };
export type Fill = { k: 'fill'; x: number; y: number; color: string };
export type Action = Stroke | Fill;

/** What the artist's browser sends. `p` holds x, y pairs. */
export type Op =
  | { k: 's'; id: number; c: string; w: number; e?: 1; p: number[] }
  | { k: 'p'; id: number; p: number[] }
  | { k: 'f'; x: number; y: number; c: string }
  | { k: 'u' }
  | { k: 'x' };

export const COLORS = [
  '#000000', '#ffffff', '#7f7f7f', '#c3c3c3',
  '#e53935', '#ff8a80', '#fb8c00', '#ffd180',
  '#fdd835', '#fff59d', '#43a047', '#b9f6ca',
  '#1e88e5', '#82b1ff', '#8e24aa', '#ea80fc',
  '#6d4c41', '#d7ccc8', '#00acc1', '#f06292',
];
export const SIZES = [4, 10, 20, 40];

const COLOR_RE = /^#[0-9a-f]{6}$/i;

export function isColor(value: unknown): value is string {
  return typeof value === 'string' && COLOR_RE.test(value);
}

function clampInt(value: unknown, max: number): number | null {
  if (typeof value !== 'number' || !Number.isFinite(value)) return null;
  return Math.min(max, Math.max(0, Math.round(value)));
}

/** Clamps x, y pairs onto the grid. Returns null on a malformed list. */
function cleanPoints(value: unknown, room: number): number[] | null {
  if (!Array.isArray(value) || value.length % 2 !== 0 || value.length > room) return null;
  const out: number[] = [];
  for (let i = 0; i < value.length; i += 2) {
    const x = clampInt(value[i], WIDTH);
    const y = clampInt(value[i + 1], HEIGHT);
    if (x === null || y === null) return null;
    out.push(x, y);
  }
  return out;
}

export class Drawing {
  actions: Action[] = [];
  points = 0;
  /** Goes up when an action is removed, so a painter knows to start over. */
  rev = 0;
  /** Goes up on every change. */
  version = 0;

  /** Applies one op and returns false when the op is malformed or over the limits. */
  apply(op: Op): boolean {
    const ok = this.applyInner(op);
    if (ok) this.version++;
    return ok;
  }

  private applyInner(op: Op): boolean {
    if (!op || typeof op !== 'object') return false;
    switch (op.k) {
      case 's': {
        if (typeof op.id !== 'number' || !isColor(op.c) || this.actions.length >= MAX_ACTIONS) return false;
        const points = cleanPoints(op.p, MAX_POINTS - this.points);
        const size = clampInt(op.w, MAX_SIZE);
        if (!points || points.length < 2 || size === null) return false;
        this.actions.push({ k: 'stroke', id: op.id, color: op.c, size: Math.max(MIN_SIZE, size), eraser: op.e === 1, points });
        this.points += points.length;
        return true;
      }
      case 'p': {
        const last = this.actions.at(-1);
        if (!last || last.k !== 'stroke' || last.id !== op.id) return false;
        const points = cleanPoints(op.p, MAX_POINTS - this.points);
        if (!points) return false;
        last.points.push(...points);
        this.points += points.length;
        return true;
      }
      case 'f': {
        const x = clampInt(op.x, WIDTH);
        const y = clampInt(op.y, HEIGHT);
        if (x === null || y === null || !isColor(op.c) || this.actions.length >= MAX_ACTIONS) return false;
        this.actions.push({ k: 'fill', x, y, color: op.c });
        return true;
      }
      case 'u': {
        const removed = this.actions.pop();
        if (!removed) return false;
        if (removed.k === 'stroke') this.points -= removed.points.length;
        this.rev++;
        return true;
      }
      case 'x':
        if (this.actions.length === 0) return false;
        this.clear();
        return true;
      default:
        return false;
    }
  }

  clear(): void {
    this.actions = [];
    this.points = 0;
    this.rev++;
    this.version++;
  }

  /** Replaces the drawing with checked actions from the network. */
  load(actions: Action[]): void {
    this.actions = actions;
    this.points = actions.reduce((sum, a) => sum + (a.k === 'stroke' ? a.points.length : 0), 0);
    this.rev++;
    this.version++;
  }
}

/** Checks a whole drawing a browser sends, such as a telephone entry. */
export function sanitizeActions(value: unknown): Action[] | null {
  if (!Array.isArray(value) || value.length > MAX_ACTIONS) return null;
  const drawing = new Drawing();
  let id = 0;
  for (const a of value) {
    if (!a || typeof a !== 'object') return null;
    if (a.k === 'stroke') {
      if (!drawing.apply({ k: 's', id: ++id, c: a.color, w: a.size, e: a.eraser ? 1 : undefined, p: a.points })) return null;
    } else if (a.k === 'fill') {
      if (!drawing.apply({ k: 'f', x: a.x, y: a.y, c: a.color })) return null;
    } else {
      return null;
    }
  }
  return drawing.actions;
}

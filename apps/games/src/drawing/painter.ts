import { HEIGHT, WIDTH, type Action, type Drawing, type Stroke } from '../shared/canvas.ts';
import { floodFill } from './flood.ts';

/** Canvas pixels per grid point. Fixed, so a fill lands on the same pixels on every screen. */
export const RES = 2;

/** Paints a Drawing on a canvas. New points go on top, and an undo repaints from the start. */
export class Painter {
  private ctx: CanvasRenderingContext2D;
  private rev = -1;
  private count = 0;
  private lastPoints = 0;

  constructor(canvas: HTMLCanvasElement) {
    canvas.width = WIDTH * RES;
    canvas.height = HEIGHT * RES;
    this.ctx = canvas.getContext('2d', { willReadFrequently: true })!;
  }

  sync(drawing: Drawing): void {
    const { actions } = drawing;
    if (drawing.rev !== this.rev || actions.length < this.count) return this.repaint(drawing);
    const open = actions[this.count - 1];
    if (open?.k === 'stroke' && open.points.length > this.lastPoints) this.stroke(open, this.lastPoints);
    for (let i = this.count; i < actions.length; i++) this.paint(actions[i]);
    this.count = actions.length;
    const last = actions.at(-1);
    this.lastPoints = last?.k === 'stroke' ? last.points.length : 0;
  }

  private repaint(drawing: Drawing): void {
    this.ctx.fillStyle = '#ffffff';
    this.ctx.fillRect(0, 0, WIDTH * RES, HEIGHT * RES);
    this.rev = drawing.rev;
    this.count = 0;
    this.lastPoints = 0;
    this.sync(drawing);
  }

  private paint(action: Action): void {
    if (action.k === 'stroke') this.stroke(action, 0);
    else floodFill(this.ctx, action.x * RES, action.y * RES, action.color);
  }

  /** Draws a stroke from point index `from` on. `from` counts numbers, so 2 per point. */
  private stroke(s: Stroke, from: number): void {
    const ctx = this.ctx;
    const p = s.points;
    ctx.strokeStyle = s.color;
    ctx.fillStyle = s.color;
    ctx.lineWidth = s.size * RES;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    if (p.length === 2) {
      ctx.beginPath();
      ctx.arc(p[0] * RES, p[1] * RES, (s.size * RES) / 2, 0, Math.PI * 2);
      ctx.fill();
      return;
    }
    const begin = Math.max(2, from);
    ctx.beginPath();
    ctx.moveTo(p[begin - 2] * RES, p[begin - 1] * RES);
    for (let i = begin; i < p.length; i += 2) ctx.lineTo(p[i] * RES, p[i + 1] * RES);
    ctx.stroke();
  }
}

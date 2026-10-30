/** Colors this close to the clicked one get filled too, so the soft edge of a line fills as well. */
const TOLERANCE = 72;

function parseHex(color: string): [number, number, number] {
  const n = Number.parseInt(color.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

/** Scanline flood fill from pixel x, y. */
export function floodFill(ctx: CanvasRenderingContext2D, x: number, y: number, color: string): void {
  const { width: w, height: h } = ctx.canvas;
  if (x < 0 || y < 0 || x >= w || y >= h) return;
  const image = ctx.getImageData(0, 0, w, h);
  const data = image.data;
  const start = (y * w + x) * 4;
  const [sr, sg, sb] = [data[start], data[start + 1], data[start + 2]];
  const [fr, fg, fb] = parseHex(color);
  if (Math.abs(sr - fr) + Math.abs(sg - fg) + Math.abs(sb - fb) < 6) return;
  const seen = new Uint8Array(w * h);
  const matches = (i: number) => {
    if (seen[i]) return false;
    const p = i * 4;
    return Math.abs(data[p] - sr) + Math.abs(data[p + 1] - sg) + Math.abs(data[p + 2] - sb) <= TOLERANCE;
  };
  const paint = (i: number) => {
    seen[i] = 1;
    const p = i * 4;
    data[p] = fr;
    data[p + 1] = fg;
    data[p + 2] = fb;
    data[p + 3] = 255;
  };
  const stack = [x, y];
  while (stack.length) {
    const sy = stack.pop()!;
    let sx = stack.pop()!;
    let i = sy * w + sx;
    while (sx > 0 && matches(i - 1)) {
      sx--;
      i--;
    }
    let up = false;
    let down = false;
    for (; sx < w && matches(i); sx++, i++) {
      paint(i);
      if (sy > 0) {
        const m = matches(i - w);
        if (m && !up) stack.push(sx, sy - 1);
        up = m;
      }
      if (sy < h - 1) {
        const m = matches(i + w);
        if (m && !down) stack.push(sx, sy + 1);
        down = m;
      }
    }
  }
  ctx.putImageData(image, 0, 0);
}

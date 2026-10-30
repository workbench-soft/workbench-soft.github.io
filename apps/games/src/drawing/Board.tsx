import { useEffect, useRef, useState } from 'preact/hooks';
import type { Signal } from '@preact/signals';
import { COLORS, Drawing, HEIGHT, SIZES, WIDTH, type Action, type Op } from '../shared/canvas.ts';
import { t } from '../game/i18n.ts';
import { Painter } from './painter.ts';

type Tool = 'pen' | 'eraser' | 'fill';

/** Ops leave the artist's browser this often. Fewer messages keep the free plan going longer. */
const SEND_EVERY = 80;
/** Points closer than this to the last one get dropped. */
const MIN_STEP = 1.5;

type Props = {
  drawing: Drawing;
  /** Bump to repaint after the drawing changed from outside. */
  version?: Signal<number>;
  editable?: boolean;
  /** Gets the ops to send. Without it the drawing stays in this browser, as in drawing telephone. */
  onOps?: (ops: Op[]) => void;
};

let strokeIds = Math.floor(Math.random() * 1e6);

export function Board({ drawing, version, editable = false, onOps }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const painter = useRef<Painter | null>(null);
  const [tool, setTool] = useState<Tool>('pen');
  const [color, setColor] = useState('#000000');
  const [size, setSize] = useState(SIZES[1]);
  const stroke = useRef<{ id: number; x: number; y: number } | null>(null);
  const outbox = useRef<Op[]>([]);
  const frame = useRef(0);

  const repaint = () => {
    if (frame.current) return;
    frame.current = requestAnimationFrame(() => {
      frame.current = 0;
      painter.current?.sync(drawing);
    });
  };

  useEffect(() => {
    painter.current = new Painter(canvasRef.current!);
    painter.current.sync(drawing);
  }, [drawing]);

  // oxlint-disable-next-line react-hooks/exhaustive-deps -- repaint reads refs only, so a stale copy works the same.
  useEffect(() => version?.subscribe(repaint), [version, drawing]);

  useEffect(() => {
    if (!editable || !onOps) return;
    const timer = setInterval(() => {
      if (!outbox.current.length) return;
      onOps(outbox.current);
      outbox.current = [];
    }, SEND_EVERY);
    return () => clearInterval(timer);
  }, [editable, onOps]);

  const emit = (op: Op) => {
    if (!drawing.apply(op)) return;
    repaint();
    if (version) version.value++;
    if (!onOps) return;
    const last = outbox.current.at(-1);
    // Points of the stroke in progress join the op already waiting to go.
    if (op.k === 'p' && last && (last.k === 's' || last.k === 'p') && last.id === op.id) last.p.push(...op.p);
    else outbox.current.push(op.k === 's' || op.k === 'p' ? { ...op, p: [...op.p] } : op);
  };

  const toGrid = (e: PointerEvent): [number, number] => {
    const rect = canvasRef.current!.getBoundingClientRect();
    return [Math.round(((e.clientX - rect.left) / rect.width) * WIDTH), Math.round(((e.clientY - rect.top) / rect.height) * HEIGHT)];
  };

  const down = (e: PointerEvent) => {
    if (!editable || e.button > 0) return;
    e.preventDefault();
    const [x, y] = toGrid(e);
    if (tool === 'fill') return emit({ k: 'f', x, y, c: color });
    canvasRef.current!.setPointerCapture(e.pointerId);
    const id = ++strokeIds;
    stroke.current = { id, x, y };
    const eraser = tool === 'eraser';
    emit({ k: 's', id, c: eraser ? '#ffffff' : color, w: eraser ? size * 2 : size, e: eraser ? 1 : undefined, p: [x, y] });
  };

  const move = (e: PointerEvent) => {
    const s = stroke.current;
    if (!s) return;
    for (const ev of e.getCoalescedEvents?.() ?? [e]) {
      const [x, y] = toGrid(ev);
      if (Math.hypot(x - s.x, y - s.y) < MIN_STEP) continue;
      s.x = x;
      s.y = y;
      emit({ k: 'p', id: s.id, p: [x, y] });
    }
  };

  const up = () => {
    stroke.current = null;
  };

  useEffect(() => {
    if (!editable) return;
    const key = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z' && !(e.target instanceof HTMLInputElement)) {
        e.preventDefault();
        emit({ k: 'u' });
      }
    };
    addEventListener('keydown', key);
    return () => removeEventListener('keydown', key);
  });

  return (
    <div class={`board${editable ? ' board-edit' : ''}`}>
      <canvas
        ref={canvasRef}
        class={`board-canvas tool-${tool}`}
        onPointerDown={down}
        onPointerMove={move}
        onPointerUp={up}
        onPointerCancel={up}
      />
      {editable && (
        <div class="tools" role="toolbar">
          <div class="tool-group">
            {(['pen', 'eraser', 'fill'] as Tool[]).map((name) => (
              <button type="button" class={`icon-btn${tool === name ? ' on' : ''}`} title={t(name)} aria-label={t(name)} aria-pressed={tool === name} onClick={() => setTool(name)}>
                <Icon name={name} />
              </button>
            ))}
          </div>
          <div class="tool-group">
            {SIZES.map((s) => (
              <button type="button" class={`icon-btn${size === s ? ' on' : ''}`} title={`${t('size')} ${s}`} aria-label={`${t('size')} ${s}`} onClick={() => setSize(s)}>
                <span class="dot" style={{ width: `${Math.max(4, s / 1.6)}px`, height: `${Math.max(4, s / 1.6)}px` }} />
              </button>
            ))}
          </div>
          <div class="swatches" aria-label={t('color')}>
            {COLORS.map((c) => (
              <button
                type="button"
                class={`swatch${color === c ? ' on' : ''}`}
                style={{ background: c }}
                aria-label={c}
                onClick={() => {
                  setColor(c);
                  if (tool === 'eraser') setTool('pen');
                }}
              />
            ))}
          </div>
          <div class="tool-group">
            <button type="button" class="icon-btn" title={t('undo')} aria-label={t('undo')} onClick={() => emit({ k: 'u' })}>
              <Icon name="undo" />
            </button>
            <button type="button" class="icon-btn" title={t('clear')} aria-label={t('clear')} onClick={() => emit({ k: 'x' })}>
              <Icon name="clear" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/** A finished drawing, such as a telephone entry. */
export function Picture({ actions }: { actions: Action[] }) {
  const [drawing] = useState(() => {
    const d = new Drawing();
    d.load(actions);
    return d;
  });
  return <Board drawing={drawing} />;
}

const PATHS: Record<string, string> = {
  pen: 'M4 20l4-1 11-11-3-3L5 16l-1 4zM14 6l3 3',
  eraser: 'M8 20h12M5 15l8-8 6 6-6 6H9l-4-4z',
  fill: 'M5 12l7-7 7 7-7 7-7-7zM19 15c0 2 1 3 1 4a1 1 0 0 1-2 0c0-1 1-2 1-4z',
  undo: 'M9 14L4 9l5-5M4 9h10a6 6 0 0 1 0 12h-3',
  clear: 'M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3',
};

export function Icon({ name }: { name: string }) {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d={PATHS[name]} />
    </svg>
  );
}

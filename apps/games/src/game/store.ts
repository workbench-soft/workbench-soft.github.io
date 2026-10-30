import { signal } from '@preact/signals';
import { Drawing } from '../shared/canvas.ts';
import { PROTOCOL, type ChatMsg, type ClientMsg, type ErrorKey, type RoomView, type ServerMsg, type TeleEntry, type TeleKind } from '../shared/protocol.ts';
import { lang } from './i18n.ts';
import { socketUrl } from './platform.ts';
import { token } from './storage.ts';

export const room = signal<RoomView | null>(null);
export const chats = signal<ChatMsg[]>([]);
export const status = signal<'connecting' | 'open' | 'lost'>('connecting');
export const fatal = signal<ErrorKey | null>(null);
export const task = signal<{ step: number; kind: TeleKind; prompt: TeleEntry | null } | null>(null);
export const album = signal<{ chain: number; entries: TeleEntry[] } | null>(null);
export const clueError = signal(0);
/** Server time minus local time, so every timer shows the same seconds. */
export const clockOffset = signal(0);

/** The shared picture of guess the drawing. `drawingVersion` tells the board to repaint. */
export const drawing = new Drawing();
export const drawingVersion = signal(0);

const CLOSE_FATAL: Record<number, ErrorKey> = { 4001: 'full', 4002: 'kicked', 4003: 'replaced', 4004: 'bad' };

let socket: WebSocket | null = null;
let retry = 0;
let identity = { name: '', color: '' };

export function serverNow(): number {
  return Date.now() + clockOffset.value;
}

export function send(msg: ClientMsg): void {
  if (socket?.readyState === WebSocket.OPEN) socket.send(JSON.stringify(msg));
}

function handle(msg: ServerMsg): void {
  switch (msg.t) {
    case 'state':
      clockOffset.value = msg.room.now - Date.now();
      room.value = msg.room;
      break;
    case 'draw':
      for (const op of msg.ops) drawing.apply(op);
      drawingVersion.value++;
      break;
    case 'canvas':
      drawing.load(msg.actions);
      drawingVersion.value++;
      break;
    case 'chat':
      chats.value = [...chats.value.slice(-99), msg.m];
      break;
    case 'chats':
      chats.value = msg.list;
      break;
    case 'task':
      task.value = msg;
      break;
    case 'album':
      album.value = msg;
      break;
    case 'error':
      if (msg.key === 'clue') clueError.value++;
      else fatal.value = msg.key;
      break;
  }
}

export function connect(code: string, name: string, color: string): void {
  identity = { name, color };
  const ws = new WebSocket(socketUrl(code));
  socket = ws;
  status.value = retry ? 'lost' : 'connecting';
  let ping = 0;
  ws.addEventListener('open', () => {
    retry = 0;
    status.value = 'open';
    ws.send(JSON.stringify({ t: 'hello', v: PROTOCOL, token: token(), name: identity.name, color: identity.color, lang: lang.value } satisfies ClientMsg));
    ping = window.setInterval(() => ws.readyState === WebSocket.OPEN && ws.send('ping'), 25_000);
  });
  ws.addEventListener('message', (event) => {
    if (event.data === 'pong') return;
    try {
      handle(JSON.parse(event.data));
    } catch {
      // A broken message gets dropped. The next state brings the page back in line.
    }
  });
  ws.addEventListener('close', (event) => {
    clearInterval(ping);
    if (socket !== ws) return;
    const reason = CLOSE_FATAL[event.code];
    if (reason) {
      fatal.value = reason;
      return;
    }
    status.value = 'lost';
    retry++;
    setTimeout(() => connect(code, identity.name, identity.color), Math.min(5000, 500 * 2 ** retry));
  });
}

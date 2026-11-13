import { signal } from '@preact/signals';
import { Drawing } from '../shared/canvas.ts';
import {
  CLOSE_CODES,
  PROTOCOL,
  type ChatMsg,
  type ClientMsg,
  type ErrorKey,
  type RoomView,
  type ServerMsg,
  type TeleEntry,
  type TeleKind,
} from '../shared/protocol.ts';
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
/** The lobby's Change button opens the join screen again. */
export const editingProfile = signal(false);
/** Server time minus local time, so every timer shows the same seconds. */
const clockOffset = signal(0);

/** The shared picture of guess the drawing. `drawingVersion` tells the board to repaint. */
export const drawing = new Drawing();
export const drawingVersion = signal(0);

/** The keepalive gets a pong every 25 seconds. A socket silent this long is dead, though it never fired close. */
const SILENT_LIMIT = 75_000;
const CLOSE_FATAL = new Map(Object.entries(CLOSE_CODES).map(([key, code]) => [code, key as ErrorKey]));

let socket: WebSocket | null = null;
let retry = 0;
let identity = { name: '', color: '', avatar: '' };

export function serverNow(): number {
  return Date.now() + clockOffset.value;
}

/** Returns false when the socket is down and the message went nowhere. */
export function send(msg: ClientMsg): boolean {
  if (socket?.readyState !== WebSocket.OPEN) return false;
  socket.send(JSON.stringify(msg));
  return true;
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

/** A new name or animal from the lobby. A reconnect keeps it too. */
export function updateProfile(name: string, avatar: string): void {
  identity = { ...identity, name, avatar };
  send({ t: 'profile', name, avatar });
}

export function connect(code: string, name: string, color: string, avatar = ''): void {
  identity = { name, color, avatar };
  const ws = new WebSocket(socketUrl(code));
  socket = ws;
  status.value = retry ? 'lost' : 'connecting';
  let ping = 0;
  let heard = Date.now();
  const retryLater = () => {
    clearInterval(ping);
    socket = null;
    status.value = 'lost';
    retry++;
    setTimeout(() => connect(code, identity.name, identity.color, identity.avatar), Math.min(5000, 500 * 2 ** retry));
  };
  ws.addEventListener('open', () => {
    retry = 0;
    heard = Date.now();
    status.value = 'open';
    ws.send(
      JSON.stringify({
        t: 'hello',
        v: PROTOCOL,
        token: token(),
        name: identity.name,
        color: identity.color,
        avatar: identity.avatar || undefined,
        lang: lang.value,
      } satisfies ClientMsg),
    );
    ping = window.setInterval(() => {
      if (ws.readyState !== WebSocket.OPEN) return;
      // A phone that moved from wifi to mobile data keeps the old socket open with nobody on the other end.
      if (Date.now() - heard > SILENT_LIMIT) {
        retryLater();
        return ws.close();
      }
      ws.send('ping');
    }, 25_000);
  });
  ws.addEventListener('message', (event) => {
    heard = Date.now();
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
    const reason = CLOSE_FATAL.get(event.code);
    if (reason) {
      fatal.value = reason;
      return;
    }
    retryLater();
  });
}

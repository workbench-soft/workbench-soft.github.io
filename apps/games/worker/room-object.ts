import { DurableObject } from 'cloudflare:workers';
import type { Action } from '../src/shared/canvas.ts';
import type { ClientMsg, ErrorKey, Lang, ServerMsg, TeleEntry } from '../src/shared/protocol.ts';
import { Room, type Out } from '../src/server/room.ts';
import { minTime } from '../src/server/util.ts';

/** The drawing goes to storage at most this often. */
const CANVAS_SAVE_GAP = 2_000;
const MAX_MESSAGE = 256 * 1024;
const CLOSE_CODES: Record<ErrorKey, number> = { full: 4001, kicked: 4002, replaced: 4003, bad: 4004, clue: 4005 };

/** `v` is the client's protocol version, so a later Worker can answer each socket in its own format. */
type Attachment = { id: string; v: number } | null;

async function playerId(token: string): Promise<string> {
  const hash = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(`workbench-games:${token}`));
  return [...new Uint8Array(hash).slice(0, 9)].map((b) => b.toString(16).padStart(2, '0')).join('');
}

/** One room. The sockets use the Hibernation API, so an idle room costs no run time. */
export class RoomObject extends DurableObject<Env> {
  private room: Room | null = null;
  private canvasSavedAt = 0;
  private canvasDue: number | null = null;

  private out: Out = {
    send: (id, msg) => {
      const text = JSON.stringify(msg);
      for (const ws of this.socketsOf(id)) ws.send(text);
    },
    close: (id, reason) => {
      const text = JSON.stringify({ t: 'error', key: reason } satisfies ServerMsg);
      for (const ws of this.socketsOf(id)) {
        ws.send(text);
        ws.close(CLOSE_CODES[reason], reason);
      }
    },
  };

  constructor(ctx: DurableObjectState, env: Env) {
    super(ctx, env);
    // Answers the keepalive without waking the object.
    ctx.setWebSocketAutoResponse(new WebSocketRequestResponsePair('ping', 'pong'));
    void ctx.blockConcurrencyWhile(() => this.load());
  }

  async fetch(request: Request): Promise<Response> {
    const code = new URL(request.url).pathname.slice(1);
    this.room ??= new Room(code, this.out);
    const [client, server] = Object.values(new WebSocketPair());
    this.ctx.acceptWebSocket(server);
    server.serializeAttachment(null);
    return new Response(null, { status: 101, webSocket: client });
  }

  async webSocketMessage(ws: WebSocket, data: string | ArrayBuffer): Promise<void> {
    const room = this.room;
    if (!room || typeof data !== 'string' || data.length > MAX_MESSAGE) return;
    let msg: ClientMsg;
    try {
      msg = JSON.parse(data);
    } catch {
      return;
    }
    if (!msg || typeof msg !== 'object') return;
    const now = Date.now();
    const attachment = ws.deserializeAttachment() as Attachment;
    if (msg.t === 'hello') {
      if (attachment || typeof msg.token !== 'string' || msg.token.length < 16) return;
      const id = await playerId(msg.token);
      // A second tab with the same token takes the seat over.
      for (const old of this.socketsOf(id)) {
        old.send(JSON.stringify({ t: 'error', key: 'replaced' } satisfies ServerMsg));
        old.close(CLOSE_CODES.replaced, 'replaced');
        old.serializeAttachment(null);
      }
      const v = Number.isInteger(msg.v) ? Number(msg.v) : 1;
      ws.serializeAttachment({ id, v } satisfies Attachment);
      const lang: Lang = msg.lang === 'ru' ? 'ru' : 'en';
      room.connect(id, String(msg.name ?? ''), String(msg.color ?? ''), lang, now);
    } else if (attachment) {
      room.message(attachment.id, msg, now);
    }
    await this.save(now);
  }

  async webSocketClose(ws: WebSocket): Promise<void> {
    await this.dropSocket(ws);
  }

  async webSocketError(ws: WebSocket): Promise<void> {
    await this.dropSocket(ws);
  }

  async alarm(): Promise<void> {
    const now = Date.now();
    if (!this.room) return;
    if (this.room.alarm(now)) {
      // The room sat empty long enough. Its storage goes, and the next visitor starts fresh.
      this.room = null;
      await this.ctx.storage.deleteAlarm();
      await this.ctx.storage.deleteAll();
      return;
    }
    await this.save(now, true);
  }

  private socketsOf(id: string): WebSocket[] {
    return this.ctx.getWebSockets().filter((ws) => (ws.deserializeAttachment() as Attachment)?.id === id);
  }

  private async dropSocket(ws: WebSocket): Promise<void> {
    const attachment = ws.deserializeAttachment() as Attachment;
    ws.serializeAttachment(null);
    if (!this.room || !attachment || this.socketsOf(attachment.id).some((s) => s !== ws)) return;
    const now = Date.now();
    this.room.disconnect(attachment.id, now);
    await this.save(now);
  }

  private async load(): Promise<void> {
    const meta = await this.ctx.storage.get<ReturnType<Room['toJSON']>>('meta');
    if (!meta) return;
    const actions = (await this.ctx.storage.get<Action[]>('canvas')) ?? [];
    const count = meta.tele?.order.length ?? 0;
    const keys = Array.from({ length: count }, (_, i) => `chain:${i}`);
    const stored = keys.length ? await this.ctx.storage.get<TeleEntry[]>(keys) : new Map<string, TeleEntry[]>();
    const chains = keys.map((k) => stored.get(k) ?? []);
    this.room = Room.restore(meta, this.out, actions, chains);
    // Sockets that stayed open through the sleep keep their seats.
    const now = Date.now();
    const awake = new Set(this.ctx.getWebSockets().map((ws) => (ws.deserializeAttachment() as Attachment)?.id));
    for (const p of this.room.players.values()) p.online = awake.has(p.id);
    if (awake.size === 0) this.room.markAllOffline(now);
  }

  /** Writes what changed, then sets the alarm for the next timer. */
  private async save(now: number, fromAlarm = false): Promise<void> {
    const room = this.room;
    if (!room) return;
    const { dirty } = room;
    const writes: Record<string, unknown> = {};
    if (dirty.meta) writes.meta = room.toJSON();
    for (const chain of dirty.chains) writes[`chain:${chain}`] = room.tele?.chains[chain] ?? [];
    if (dirty.canvas) {
      if (now - this.canvasSavedAt >= CANVAS_SAVE_GAP || fromAlarm) {
        writes.canvas = room.drawing.actions;
        this.canvasSavedAt = now;
        this.canvasDue = null;
        dirty.canvas = false;
      } else {
        this.canvasDue ??= this.canvasSavedAt + CANVAS_SAVE_GAP;
      }
    }
    dirty.meta = false;
    dirty.chains.clear();
    if (Object.keys(writes).length) await this.ctx.storage.put(writes);
    const next = minTime(room.wakeAt(), this.canvasDue);
    const current = await this.ctx.storage.getAlarm();
    if (next === null) {
      if (current !== null) await this.ctx.storage.deleteAlarm();
    } else if (current !== next) {
      await this.ctx.storage.setAlarm(Math.max(next, now + 10));
    }
  }
}

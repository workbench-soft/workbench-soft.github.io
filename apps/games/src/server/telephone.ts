import { sanitizeActions } from '../shared/canvas.ts';
import {
  MAX_PHRASE,
  type AlbumView,
  type ClientMsg,
  type Speed,
  type TeleEntry,
  type TeleKind,
  type TeleView,
} from '../shared/protocol.ts';
import { randomPrompt } from '../words/prompts.ts';
import type { Room } from './room.ts';
import { shuffle } from './util.ts';

/** Seconds per step: writing, drawing, describing. */
export const STEP_TIMES: Record<Speed, Record<TeleKind, number>> = {
  fast: { write: 30, draw: 60, describe: 30 },
  normal: { write: 45, draw: 90, describe: 45 },
  slow: { write: 60, draw: 150, describe: 60 },
};
/** The server waits this long past the deadline for the last entries the browsers send on their own. */
export const GRACE = 3_000;

export function kindOf(step: number): TeleKind {
  if (step === 0) return 'write';
  return step % 2 === 1 ? 'draw' : 'describe';
}

/**
 * Drawing telephone. Chain i starts with player i. At step s, player j works on chain (j - s) mod n,
 * so each player touches each chain once.
 */
export class TelephoneGame {
  order: string[] = [];
  step = 0;
  deadline = 0;
  chains: TeleEntry[][] = [];
  album: { chain: number; shown: number; done: boolean } | null = null;

  constructor(private room: Room) {}

  get steps(): number {
    return this.order.length;
  }

  start(now: number): void {
    this.order = shuffle(
      this.room.online().map((p) => p.id),
      this.room.random,
    );
    this.chains = this.order.map(() => []);
    this.step = 0;
    this.beginStep(now);
  }

  chainOf(id: string, step = this.step): number {
    const n = this.order.length;
    return (((this.order.indexOf(id) - step) % n) + n) % n;
  }

  isDone(id: string): boolean {
    if (this.album || !this.order.includes(id)) return false;
    return this.chains[this.chainOf(id)][this.step] !== undefined;
  }

  message(id: string, msg: ClientMsg, now: number): void {
    if (msg.t === 'next') {
      if (id === this.room.hostId) this.next();
      return;
    }
    if (msg.t !== 'submit' || this.album || !this.order.includes(id) || this.isDone(id)) return;
    const kind = kindOf(this.step);
    const chain = this.chainOf(id);
    const name = this.room.name(id);
    let entry: TeleEntry;
    if (kind === 'draw') {
      const actions = sanitizeActions(msg.actions ?? []);
      if (!actions) return;
      entry = { by: id, name, kind: 'drawing', actions, skipped: actions.length === 0 || undefined };
    } else {
      const text = String(msg.text ?? '')
        .replace(/\s+/g, ' ')
        .trim()
        .slice(0, MAX_PHRASE);
      if (text) entry = { by: id, name, kind: 'text', text };
      else if (kind === 'write')
        entry = {
          by: id,
          name,
          kind: 'text',
          text: randomPrompt(this.room.settings.wordLang, this.room.random),
          skipped: true,
        };
      else entry = { by: id, name, kind: 'text', text: '', skipped: true };
    }
    this.chains[chain][this.step] = entry;
    this.room.dirty.chains.add(chain);
    this.room.changed();
    if (this.allDone()) this.advance(now);
  }

  alarm(now: number): void {
    if (!this.album && now >= this.deadline + GRACE) this.advance(now);
  }

  wakeAt(): number | null {
    return this.album ? null : this.deadline + GRACE;
  }

  playerLeft(now: number): void {
    if (!this.album && this.allDone()) this.advance(now);
  }

  view(): TeleView | null {
    if (this.album) return null;
    return {
      step: this.step,
      steps: this.steps,
      kind: kindOf(this.step),
      deadline: this.deadline,
      playing: this.order,
    };
  }

  albumView(): AlbumView | null {
    if (!this.album) return null;
    const { chain, shown, done } = this.album;
    return { chain, chains: this.chains.length, shown, length: this.steps, owner: this.order[chain], done };
  }

  /** Sends a player who just connected the task, or the album page on screen. */
  resend(id: string): void {
    if (this.album) this.sendAlbum(id);
    else if (this.order.includes(id)) this.sendTask(id);
  }

  private allDone(): boolean {
    return this.order.filter((id) => this.room.isOnline(id)).every((id) => this.isDone(id));
  }

  private beginStep(now: number): void {
    const kind = kindOf(this.step);
    this.deadline = now + STEP_TIMES[this.room.settings.speed][kind] * 1000;
    for (const id of this.order) this.sendTask(id);
    this.room.setPhase('tele');
  }

  private sendTask(id: string): void {
    const prompt = this.step === 0 ? null : (this.chains[this.chainOf(id)][this.step - 1] ?? null);
    this.room.send(id, { t: 'task', step: this.step, kind: kindOf(this.step), prompt });
  }

  private advance(now: number): void {
    const kind = kindOf(this.step);
    for (const id of this.order) {
      const chain = this.chainOf(id);
      if (this.chains[chain][this.step]) continue;
      const name = this.room.name(id);
      this.chains[chain][this.step] =
        kind === 'draw'
          ? { by: id, name, kind: 'drawing', actions: [], skipped: true }
          : {
              by: id,
              name,
              kind: 'text',
              text: kind === 'write' ? randomPrompt(this.room.settings.wordLang, this.room.random) : '',
              skipped: true,
            };
      this.room.dirty.chains.add(chain);
    }
    this.step++;
    if (this.step < this.steps) return this.beginStep(now);
    this.album = { chain: 0, shown: 1, done: false };
    this.room.setPhase('album');
    this.sendAlbum();
  }

  private next(): void {
    const album = this.album;
    if (!album || album.done) return;
    if (album.shown < this.steps) album.shown++;
    else if (album.chain < this.chains.length - 1) {
      album.chain++;
      album.shown = 1;
    } else album.done = true;
    this.room.changed();
    this.sendAlbum();
  }

  private sendAlbum(to?: string): void {
    if (!this.album) return;
    const msg = {
      t: 'album' as const,
      chain: this.album.chain,
      entries: this.chains[this.album.chain].slice(0, this.album.shown),
    };
    if (to) this.room.send(to, msg);
    else this.room.broadcast(msg);
  }

  toJSON() {
    return { order: this.order, step: this.step, deadline: this.deadline, album: this.album };
  }

  static restore(room: Room, data: ReturnType<TelephoneGame['toJSON']>, chains: TeleEntry[][]): TelephoneGame {
    const game = Object.assign(new TelephoneGame(room), data);
    game.chains = data.order.map((_, i) => chains[i] ?? []);
    return game;
  }
}

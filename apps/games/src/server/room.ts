import { Drawing, isColor, type Action } from '../shared/canvas.ts';
import {
  DEFAULT_SETTINGS,
  DRAW_TIME_OPTIONS,
  MAX_CHAT,
  MAX_NAME,
  MAX_PLAYERS,
  ROUND_OPTIONS,
  type ChatMsg,
  type ClientMsg,
  type ErrorKey,
  type Lang,
  type Phase,
  type RoomView,
  type ServerMsg,
  type Settings,
  type SystemKey,
  type Team,
  type TeleEntry,
} from '../shared/protocol.ts';
import { DuelGame } from './duel.ts';
import { GuessGame } from './guess.ts';
import { TelephoneGame } from './telephone.ts';
import { minTime, shuffle, type Random } from './util.ts';

export type Player = {
  id: string;
  name: string;
  color: string;
  score: number;
  online: boolean;
  team: Team | null;
};

/** How the room reaches the sockets. The Durable Object gives the real one, tests a fake. */
export interface Out {
  send(id: string, msg: ServerMsg): void;
  close(id: string, reason: ErrorKey): void;
}

/** A host who stays offline this long hands the room to the next player. */
export const HOST_GRACE = 20_000;
/** An empty room deletes its storage after this long. */
export const EMPTY_TTL = 30 * 60_000;
const CHAT_LOG = 40;
const CHAT_GAP = 350;

const MIN_PLAYERS = { guess: 2, telephone: 2, duel: 4 } as const;

export class Room {
  players = new Map<string, Player>();
  hostId = '';
  hostAwaySince: number | null = null;
  emptySince: number | null = null;
  banned = new Set<string>();
  settings: Settings = { ...DEFAULT_SETTINGS };
  phase: Phase = 'lobby';
  drawing = new Drawing();
  chats: ChatMsg[] = [];
  guess: GuessGame | null = null;
  tele: TelephoneGame | null = null;
  duel: DuelGame | null = null;
  /** What the Durable Object must write to storage after this event. */
  dirty = { meta: false, canvas: false, chains: new Set<number>() };
  private stateChanged = false;
  private lastChat = new Map<string, number>();

  constructor(
    public code: string,
    public out: Out,
    public random: Random = Math.random,
  ) {}

  // Events from the Durable Object. Each one ends with flush(), which sends the new state.

  connect(id: string, name: string, color: string, lang: Lang, now: number): boolean {
    if (this.banned.has(id)) {
      this.out.close(id, 'kicked');
      return false;
    }
    let player = this.players.get(id);
    if (!player && this.online().length >= MAX_PLAYERS) {
      this.out.close(id, 'full');
      return false;
    }
    const cleanName = name.trim().replace(/\s+/g, ' ').slice(0, MAX_NAME) || 'Player';
    if (!player) {
      if (this.players.size === 0) this.settings.wordLang = lang;
      player = { id, name: cleanName, color: isColor(color) ? color : '#1e88e5', score: 0, online: true, team: this.smallerTeam() };
      this.players.set(id, player);
      this.sys('joined', player.name);
    } else {
      player.name = cleanName;
      if (isColor(color)) player.color = color;
      player.online = true;
    }
    this.emptySince = null;
    if (!this.hostId || !this.players.get(this.hostId)) this.hostId = id;
    if (this.hostId === id) this.hostAwaySince = null;
    this.changed();
    this.sendSnapshot(id);
    this.flush(now);
    return true;
  }

  disconnect(id: string, now: number): void {
    const player = this.players.get(id);
    if (!player || !player.online) return;
    // The seat stays, so a reload keeps the name, the score and the host role. The next start drops it.
    player.online = false;
    if (this.hostId === id) this.hostAwaySince = now;
    if (this.online().length === 0) this.emptySince = now;
    this.guess?.playerLeft(id, now);
    this.tele?.playerLeft(now);
    this.duel?.playerLeft(id, now);
    this.checkEnough();
    this.changed();
    this.flush(now);
  }

  message(id: string, msg: ClientMsg, now: number): void {
    const player = this.players.get(id);
    if (!player || !msg || typeof msg !== 'object') return;
    const host = id === this.hostId;
    switch (msg.t) {
      case 'chat':
        this.chat(player, String(msg.text ?? ''), now);
        break;
      case 'settings':
        if (host && this.phase === 'lobby') this.updateSettings(msg.settings);
        break;
      case 'start':
        if (host && (this.phase === 'lobby' || this.phase === 'gameEnd' || this.tele?.album?.done)) this.start(now);
        break;
      case 'lobby':
        if (host) this.backToLobby();
        break;
      case 'kick':
        if (host && msg.id !== id) this.kick(String(msg.id), now);
        break;
      case 'team':
        if (this.phase === 'lobby' && (msg.team === 'red' || msg.team === 'blue')) {
          player.team = msg.team;
          this.changed();
        }
        break;
      case 'shuffle':
        if (host && this.phase === 'lobby') this.shuffleTeams();
        break;
      case 'pick':
      case 'draw':
        this.guess?.message(id, msg, now);
        break;
      case 'submit':
      case 'next':
        this.tele?.message(id, msg, now);
        break;
      case 'clue':
      case 'toggle':
      case 'lock':
        this.duel?.message(id, msg, now);
        break;
    }
    this.flush(now);
  }

  /** Runs the timers that are due. Returns true once the room has sat empty long enough to delete. */
  alarm(now: number): boolean {
    if (this.emptySince !== null && now >= this.emptySince + EMPTY_TTL) return true;
    if (this.hostAwaySince !== null && now >= this.hostAwaySince + HOST_GRACE) this.passHost();
    this.guess?.alarm(now);
    this.tele?.alarm(now);
    this.duel?.alarm(now);
    this.flush(now);
    return false;
  }

  wakeAt(): number | null {
    return minTime(
      this.emptySince === null ? null : this.emptySince + EMPTY_TTL,
      this.hostAwaySince === null ? null : this.hostAwaySince + HOST_GRACE,
      this.guess?.wakeAt(),
      this.tele?.wakeAt(),
      this.duel?.wakeAt(),
    );
  }

  // Helpers for the games.

  online(): Player[] {
    return [...this.players.values()].filter((p) => p.online);
  }

  isOnline(id: string): boolean {
    return this.players.get(id)?.online ?? false;
  }

  name(id: string): string {
    return this.players.get(id)?.name ?? '?';
  }

  changed(): void {
    this.dirty.meta = true;
    this.stateChanged = true;
  }

  send(id: string, msg: ServerMsg): void {
    this.out.send(id, msg);
  }

  broadcast(msg: ServerMsg, filter: (id: string) => boolean = () => true, except?: string): void {
    for (const p of this.players.values()) if (p.online && p.id !== except && filter(p.id)) this.out.send(p.id, msg);
  }

  sys(key: SystemKey, name?: string, word?: string, to?: string): void {
    const m: ChatMsg = { kind: 'sys', key, name, word };
    if (to) return this.send(to, { t: 'chat', m });
    this.log(m);
    this.broadcast({ t: 'chat', m });
  }

  setPhase(phase: Phase): void {
    this.phase = phase;
    this.changed();
  }

  finish(): void {
    this.setPhase('gameEnd');
  }

  backToLobby(): void {
    this.guess = null;
    this.tele = null;
    this.duel = null;
    this.drawing.clear();
    this.dirty.canvas = true;
    for (const p of this.players.values()) if (!p.online) this.players.delete(p.id);
    this.broadcast({ t: 'canvas', actions: [] });
    this.setPhase('lobby');
  }

  viewFor(id: string, now: number): RoomView {
    return {
      code: this.code,
      you: id,
      hostId: this.hostId,
      now,
      phase: this.phase,
      settings: this.settings,
      players: [...this.players.values()].map((p) => ({
        id: p.id,
        name: p.name,
        color: p.color,
        score: p.score,
        online: p.online,
        team: p.team,
        guessed: this.guess?.hasGuessed(p.id) ?? false,
        done: this.tele?.isDone(p.id) ?? false,
      })),
      guess: this.guess?.view(id) ?? null,
      tele: this.tele?.view() ?? null,
      album: this.tele?.albumView() ?? null,
      duel: this.duel?.view(id) ?? null,
    };
  }

  /** Sends the new state to each player, once per event. */
  flush(now = Date.now()): void {
    if (!this.stateChanged) return;
    this.stateChanged = false;
    for (const p of this.players.values()) if (p.online) this.out.send(p.id, { t: 'state', room: this.viewFor(p.id, now) });
  }

  // Storage. The drawing and the telephone entries sit under keys of their own.

  toJSON() {
    return {
      v: 1,
      code: this.code,
      players: [...this.players.values()],
      hostId: this.hostId,
      hostAwaySince: this.hostAwaySince,
      emptySince: this.emptySince,
      banned: [...this.banned],
      settings: this.settings,
      phase: this.phase,
      chats: this.chats,
      guess: this.guess?.toJSON() ?? null,
      tele: this.tele?.toJSON() ?? null,
      duel: this.duel?.toJSON() ?? null,
    };
  }

  static restore(data: ReturnType<Room['toJSON']>, out: Out, actions: Action[], chains: TeleEntry[][], random?: Random): Room {
    const room = new Room(data.code, out, random);
    room.players = new Map(data.players.map((p) => [p.id, { ...p, online: false }]));
    room.hostId = data.hostId;
    room.hostAwaySince = data.hostAwaySince;
    room.emptySince = data.emptySince;
    room.banned = new Set(data.banned);
    room.settings = { ...DEFAULT_SETTINGS, ...data.settings };
    room.phase = data.phase;
    room.chats = data.chats;
    room.drawing.load(actions);
    if (data.guess) room.guess = GuessGame.restore(room, data.guess);
    if (data.tele) room.tele = TelephoneGame.restore(room, data.tele, chains);
    if (data.duel) room.duel = DuelGame.restore(room, data.duel);
    return room;
  }

  /** Marks every player offline after the object wakes from storage. Sockets that are still open connect again. */
  markAllOffline(now: number): void {
    for (const p of this.players.values()) p.online = false;
    this.emptySince ??= now;
  }

  // Private.

  private sendSnapshot(id: string): void {
    this.send(id, { t: 'chats', list: this.chats });
    if (this.guess) this.send(id, { t: 'canvas', actions: this.drawing.actions });
    this.tele?.resend(id);
  }

  private log(m: ChatMsg): void {
    this.chats.push(m);
    if (this.chats.length > CHAT_LOG) this.chats.splice(0, this.chats.length - CHAT_LOG);
    this.dirty.meta = true;
  }

  private chat(player: Player, raw: string, now: number): void {
    const text = raw.replace(/\s+/g, ' ').trim().slice(0, MAX_CHAT);
    if (!text) return;
    const last = this.lastChat.get(player.id) ?? 0;
    if (now - last < CHAT_GAP) return;
    this.lastChat.set(player.id, now);
    if (this.guess?.handleChat(player, text, now)) return;
    const m: ChatMsg = { kind: 'chat', from: player.id, name: player.name, text };
    this.log(m);
    this.broadcast({ t: 'chat', m });
  }

  private updateSettings(next: Partial<Settings> | undefined): void {
    if (!next || typeof next !== 'object') return;
    const s = this.settings;
    if (next.mode === 'guess' || next.mode === 'telephone' || next.mode === 'duel') s.mode = next.mode;
    if (typeof next.rounds === 'number' && ROUND_OPTIONS.includes(next.rounds)) s.rounds = next.rounds;
    if (typeof next.drawTime === 'number' && DRAW_TIME_OPTIONS.includes(next.drawTime)) s.drawTime = next.drawTime;
    if (next.wordLang === 'en' || next.wordLang === 'ru') s.wordLang = next.wordLang;
    if (typeof next.hints === 'boolean') s.hints = next.hints;
    if (typeof next.customOnly === 'boolean') s.customOnly = next.customOnly;
    if (typeof next.customWords === 'string') s.customWords = next.customWords.slice(0, 5000);
    if (next.speed === 'fast' || next.speed === 'normal' || next.speed === 'slow') s.speed = next.speed;
    this.changed();
  }

  private start(now: number): void {
    for (const p of this.players.values()) if (!p.online) this.players.delete(p.id);
    this.changed();
    const need = MIN_PLAYERS[this.settings.mode];
    if (this.online().length < need) return this.sys('needMore', undefined, String(need), this.hostId);
    for (const p of this.players.values()) p.score = 0;
    this.guess = null;
    this.tele = null;
    this.duel = null;
    if (this.settings.mode === 'guess') {
      this.guess = new GuessGame(this);
      this.guess.start(now);
    } else if (this.settings.mode === 'telephone') {
      this.tele = new TelephoneGame(this);
      this.tele.start(now);
    } else {
      this.balanceTeams();
      this.duel = new DuelGame(this);
      this.duel.start(now);
    }
    this.changed();
  }

  private checkEnough(): void {
    if (this.phase === 'lobby' || this.phase === 'gameEnd' || this.phase === 'album') return;
    const need = this.settings.mode === 'duel' ? MIN_PLAYERS.duel : 2;
    if (this.online().length < need) this.backToLobby();
  }

  private kick(id: string, now: number): void {
    const player = this.players.get(id);
    if (!player) return;
    this.banned.add(id);
    this.sys('kicked', player.name);
    this.out.close(id, 'kicked');
    this.players.delete(id);
    this.guess?.playerLeft(id, now);
    this.tele?.playerLeft(now);
    this.duel?.playerLeft(id, now);
    this.checkEnough();
    this.changed();
  }

  private passHost(): void {
    this.hostAwaySince = null;
    const next = this.online()[0];
    if (!next || next.id === this.hostId) return;
    this.hostId = next.id;
    this.sys('host', next.name);
    this.changed();
  }

  private smallerTeam(): Team {
    let red = 0;
    let blue = 0;
    for (const p of this.players.values()) {
      if (p.team === 'red') red++;
      else if (p.team === 'blue') blue++;
    }
    return red <= blue ? 'red' : 'blue';
  }

  private shuffleTeams(): void {
    shuffle(this.online(), this.random).forEach((p, i) => (p.team = i % 2 === 0 ? 'red' : 'blue'));
    this.changed();
  }

  /** Moves players so each team has at least 2. */
  private balanceTeams(): void {
    const online = this.online();
    const count = (t: Team) => online.filter((p) => p.team === t).length;
    for (const p of online) p.team ??= this.smallerTeam();
    while (Math.abs(count('red') - count('blue')) > 1) {
      const big: Team = count('red') > count('blue') ? 'red' : 'blue';
      const mover = online.find((p) => p.team === big);
      if (!mover) break;
      mover.team = big === 'red' ? 'blue' : 'red';
    }
  }
}

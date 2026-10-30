import type { ClientMsg, GuessView } from '../shared/protocol.ts';
import { isClose, letterPositions, maskWord, normalize } from '../shared/words.ts';
import type { Player, Room } from './room.ts';
import { minTime, sample, shuffle } from './util.ts';
import { wordsFor } from './word-source.ts';

export const CHOOSE_TIME = 15_000;
export const TURN_END_TIME = 6_000;
/** Points per guesser that the artist gets. */
export const ARTIST_POINTS = 60;

type Stage = 'choosing' | 'drawing' | 'turnEnd';

/** Guess the drawing: each player draws once a round, the others type guesses. */
export class GuessGame {
  round = 1;
  order: string[] = [];
  turn = -1;
  drawerId = '';
  stage: Stage = 'choosing';
  choices: string[] = [];
  word = '';
  deadline = 0;
  turnTime = 0;
  hintAt: number[] = [];
  hintPos: number[] = [];
  hintsShown = 0;
  /** Players who guessed this turn, with their points. */
  guessed = new Map<string, number>();
  gains: Record<string, number> | null = null;
  used: string[] = [];

  constructor(private room: Room) {}

  start(now: number): void {
    this.order = shuffle(
      this.room.online().map((p) => p.id),
      this.room.random,
    );
    this.nextTurn(now);
  }

  message(id: string, msg: ClientMsg, now: number): void {
    if (msg.t === 'pick' && id === this.drawerId && this.stage === 'choosing') {
      // A name such as "length" would read a property of the list in place of a word.
      const word = Number.isInteger(msg.index) ? this.choices[msg.index] : undefined;
      if (word) this.beginDrawing(word, now);
    } else if (msg.t === 'draw' && id === this.drawerId && this.stage === 'drawing' && Array.isArray(msg.ops)) {
      const ok = msg.ops.slice(0, 200).filter((op) => this.room.drawing.apply(op));
      if (!ok.length) return;
      this.room.dirty.canvas = true;
      this.room.broadcast({ t: 'draw', ops: ok }, undefined, id);
    }
  }

  /** Returns true when the chat text was a guess and the room should not post it. */
  handleChat(player: Player, text: string, now: number): boolean {
    if (this.stage !== 'drawing') return false;
    const answer = normalize(this.word);
    const guess = normalize(text);
    const insider = player.id === this.drawerId || this.guessed.has(player.id);
    if (insider) {
      // The artist and the players who know the word may chat, but only among themselves.
      if (guess.includes(answer)) return true;
      const m = { kind: 'chat' as const, from: player.id, name: player.name, text, secret: true };
      this.room.broadcast({ t: 'chat', m }, (pid) => pid === this.drawerId || this.guessed.has(pid));
      return true;
    }
    if (guess === answer) {
      const left = Math.max(0, this.deadline - now);
      const points = Math.round(100 + (400 * left) / this.turnTime);
      this.guessed.set(player.id, points);
      this.room.sys('guessed', player.name);
      this.room.changed();
      if (this.everyoneGuessed()) this.endTurn(now);
      return true;
    }
    if (isClose(guess, answer)) {
      this.room.broadcast({ t: 'chat', m: { kind: 'chat', from: player.id, name: player.name, text } });
      this.room.sys('close', undefined, text, player.id);
      return true;
    }
    return false;
  }

  alarm(now: number): void {
    if (now < this.deadline) {
      // A hint came due. The new state shows one more letter.
      const shown = this.hintAt.filter((t) => t <= now).length;
      if (shown !== this.hintsShown) {
        this.hintsShown = shown;
        this.room.changed();
      }
      return;
    }
    if (this.stage === 'choosing')
      this.beginDrawing(this.choices[Math.floor(this.room.random() * this.choices.length)], now);
    else if (this.stage === 'drawing') this.endTurn(now);
    else this.nextTurn(now);
  }

  wakeAt(): number | null {
    if (this.room.phase === 'gameEnd') return null;
    return minTime(this.deadline, this.stage === 'drawing' ? this.hintAt[this.hintsShown] : null);
  }

  playerLeft(id: string, now: number): void {
    if (this.room.phase === 'gameEnd') return;
    if (id === this.drawerId && this.stage !== 'turnEnd') this.endTurn(now);
    else if (this.stage === 'drawing' && this.everyoneGuessed()) this.endTurn(now);
  }

  hasGuessed(id: string): boolean {
    return this.guessed.has(id);
  }

  view(id: string): GuessView {
    const isDrawer = id === this.drawerId;
    const showWord = this.stage === 'turnEnd' || (this.stage === 'drawing' && (isDrawer || this.guessed.has(id)));
    const shown = this.hintsShown;
    return {
      round: this.round,
      rounds: this.room.settings.rounds,
      drawerId: this.drawerId,
      deadline: this.deadline,
      choices: isDrawer && this.stage === 'choosing' ? this.choices : null,
      word: showWord ? this.word : null,
      hint: this.stage === 'drawing' ? maskWord(this.word, this.hintPos.slice(0, shown)) : '',
      gains: this.stage === 'turnEnd' ? this.gains : null,
    };
  }

  private everyoneGuessed(): boolean {
    const guessers = this.room.online().filter((p) => p.id !== this.drawerId);
    return guessers.length > 0 && guessers.every((p) => this.guessed.has(p.id));
  }

  private nextTurn(now: number): void {
    const room = this.room;
    this.turn++;
    while (this.turn < this.order.length && !room.isOnline(this.order[this.turn])) this.turn++;
    if (this.turn >= this.order.length) {
      this.round++;
      if (this.round > room.settings.rounds) {
        this.round = room.settings.rounds;
        this.stage = 'turnEnd';
        this.deadline = 0;
        return room.finish();
      }
      this.order = shuffle(
        room.online().map((p) => p.id),
        room.random,
      );
      this.turn = 0;
    }
    this.drawerId = this.order[this.turn];
    const pool = wordsFor(room.settings).filter((w) => !this.used.includes(w));
    this.choices = sample(pool.length >= 3 ? pool : wordsFor(room.settings), 3, room.random);
    this.word = '';
    this.guessed.clear();
    this.gains = null;
    this.hintAt = [];
    this.hintPos = [];
    this.hintsShown = 0;
    this.stage = 'choosing';
    this.deadline = now + CHOOSE_TIME;
    room.drawing.clear();
    room.dirty.canvas = true;
    room.broadcast({ t: 'canvas', actions: [] });
    room.setPhase('choosing');
  }

  private beginDrawing(word: string, now: number): void {
    const room = this.room;
    this.word = word;
    this.used.push(word);
    this.stage = 'drawing';
    this.turnTime = room.settings.drawTime * 1000;
    this.deadline = now + this.turnTime;
    if (room.settings.hints) {
      const letters = letterPositions(word);
      const count = Math.min(3, Math.floor(letters.length / 3));
      this.hintPos = shuffle(letters, room.random).slice(0, count);
      // Hints come in the second half of the turn, spread evenly.
      this.hintAt = this.hintPos.map(
        (_, i) => now + Math.round(this.turnTime * (0.5 + (count > 1 ? (0.4 * i) / (count - 1) : 0))),
      );
    }
    room.sys('drawing', room.name(this.drawerId));
    room.setPhase('drawing');
  }

  private endTurn(now: number): void {
    const room = this.room;
    const gains: Record<string, number> = {};
    for (const [id, points] of this.guessed) gains[id] = points;
    if (this.guessed.size) gains[this.drawerId] = this.guessed.size * ARTIST_POINTS;
    for (const [id, points] of Object.entries(gains)) {
      const p = room.players.get(id);
      if (p) p.score += points;
    }
    this.gains = gains;
    if (!this.word) this.word = this.choices[0] ?? '';
    room.sys('word', undefined, this.word);
    this.stage = 'turnEnd';
    this.deadline = now + TURN_END_TIME;
    room.setPhase('turnEnd');
  }

  toJSON() {
    const { room: _room, guessed, ...rest } = this;
    return { ...rest, guessed: [...guessed] };
  }

  static restore(room: Room, data: ReturnType<GuessGame['toJSON']>): GuessGame {
    const { guessed, ...rest } = data;
    const game = Object.assign(new GuessGame(room), rest);
    game.guessed = new Map(guessed);
    return game;
  }
}

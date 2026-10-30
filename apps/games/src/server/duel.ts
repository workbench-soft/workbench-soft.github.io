import { BOARD_SIZE, TEAMS, type ClientMsg, type DuelStage, type DuelView, type Team } from '../shared/protocol.ts';
import { normalize } from '../shared/words.ts';
import type { Room } from './room.ts';
import { sample, shuffle } from './util.ts';
import { wordsFor } from './word-source.ts';

export const CLUE_TIME = 60_000;
export const PICK_TIME = 60_000;
export const REVEAL_TIME = 8_000;
export const TARGETS = 2;
/** Points for a word of your own team, and for a word taken from the other team. */
export const OWN_POINTS = 2;
export const STEAL_POINTS = 1;

const other = (team: Team): Team => (team === 'red' ? 'blue' : 'red');
const both = <T>(value: () => T): Record<Team, T> => ({ red: value(), blue: value() });

/**
 * Clue duel. Each team's clue giver sees 2 secret words on a shared board of 12 and gives a one word clue.
 * Both clues are public, so the other team may pick the words too and take a point for each.
 */
export class DuelGame {
  round = 0;
  stage: DuelStage = 'clue';
  deadline = 0;
  board: string[] = [];
  givers: Record<Team, string> = both(() => '');
  clues: Record<Team, string | null> = both(() => null);
  targets: Record<Team, number[]> = both(() => []);
  picks: Record<Team, number[]> = both(() => []);
  locked: Record<Team, boolean> = both(() => false);
  score: Record<Team, number> = both(() => 0);
  gains: Record<Team, number> | null = null;
  /** Rounds each team has had a giver, so the role goes round the team. */
  turns: Record<Team, number> = both(() => 0);

  constructor(private room: Room) {}

  start(now: number): void {
    this.nextRound(now);
  }

  members(team: Team): string[] {
    return this.room.online().filter((p) => p.team === team).map((p) => p.id);
  }

  message(id: string, msg: ClientMsg, now: number): void {
    const team = this.room.players.get(id)?.team;
    if (!team || this.room.phase !== 'duel') return;
    if (msg.t === 'clue') this.clue(id, team, String(msg.text ?? ''), now);
    else if (msg.t === 'toggle') this.toggle(id, team, msg.index);
    else if (msg.t === 'lock') this.lock(id, team, now);
  }

  alarm(now: number): void {
    if (this.room.phase !== 'duel' || now < this.deadline) return;
    if (this.stage === 'clue') this.startGuess(now);
    else if (this.stage === 'guess') this.reveal(now);
    else this.nextRound(now);
  }

  wakeAt(): number | null {
    return this.room.phase === 'duel' ? this.deadline : null;
  }

  playerLeft(id: string, now: number): void {
    if (this.room.phase !== 'duel' || this.stage !== 'clue') return;
    for (const team of TEAMS) if (this.givers[team] === id && this.clues[team] === null) this.clues[team] = '';
    if (TEAMS.every((t) => this.clues[t] !== null)) this.startGuess(now);
  }

  view(id: string): DuelView {
    const mine = this.room.players.get(id)?.team ?? null;
    const reveal = this.stage === 'reveal' || this.room.phase === 'gameEnd';
    const see = <T>(values: Record<Team, T>, own: boolean, all: boolean): Record<Team, T | null> => ({
      red: all || (own && mine === 'red') ? values.red : null,
      blue: all || (own && mine === 'blue') ? values.blue : null,
    });
    const giver = mine !== null && this.givers[mine] === id;
    return {
      round: this.round,
      rounds: this.room.settings.rounds,
      stage: this.stage,
      deadline: this.deadline,
      board: this.board,
      givers: this.givers,
      clues: see(this.clues, true, this.stage !== 'clue'),
      targets: see(this.targets, giver, reveal),
      picks: see(this.picks, true, reveal),
      locked: this.locked,
      score: this.score,
      gains: reveal ? this.gains : null,
    };
  }

  private nextRound(now: number): void {
    const room = this.room;
    if (this.round >= room.settings.rounds) {
      this.stage = 'reveal';
      this.deadline = 0;
      return room.finish();
    }
    this.round++;
    this.board = sample(wordsFor(room.settings), BOARD_SIZE, room.random);
    const spots = shuffle([...this.board.keys()], room.random);
    this.targets = { red: spots.slice(0, TARGETS), blue: spots.slice(TARGETS, TARGETS * 2) };
    for (const team of TEAMS) {
      const members = this.members(team);
      this.givers[team] = members[this.turns[team] % Math.max(1, members.length)] ?? '';
      this.turns[team]++;
    }
    this.clues = both(() => null);
    this.picks = both(() => []);
    this.locked = both(() => false);
    this.gains = null;
    this.stage = 'clue';
    this.deadline = now + CLUE_TIME;
    room.setPhase('duel');
  }

  private clue(id: string, team: Team, raw: string, now: number): void {
    if (this.stage !== 'clue' || this.givers[team] !== id || this.clues[team] !== null) return;
    const text = raw.trim().slice(0, 24);
    const word = normalize(text);
    // One word, and no board word inside it or around it.
    const bad =
      !word ||
      word.includes(' ') ||
      this.board.some((w) => {
        const b = normalize(w);
        return b === word || (b.length >= 3 && word.includes(b)) || (word.length >= 3 && b.includes(word));
      });
    if (bad) return this.room.send(id, { t: 'error', key: 'clue' });
    this.clues[team] = text;
    this.room.changed();
    if (TEAMS.every((t) => this.clues[t] !== null)) this.startGuess(now);
  }

  private toggle(id: string, team: Team, index: number): void {
    if (this.stage !== 'guess' || this.givers[team] === id || this.locked[team]) return;
    if (!Number.isInteger(index) || index < 0 || index >= this.board.length) return;
    const picks = this.picks[team];
    const at = picks.indexOf(index);
    if (at >= 0) picks.splice(at, 1);
    else {
      picks.push(index);
      if (picks.length > TARGETS) picks.shift();
    }
    this.room.changed();
  }

  private lock(id: string, team: Team, now: number): void {
    if (this.stage !== 'guess' || this.givers[team] === id || this.picks[team].length !== TARGETS) return;
    this.locked[team] = true;
    this.room.changed();
    if (TEAMS.every((t) => this.locked[t])) this.reveal(now);
  }

  private startGuess(now: number): void {
    for (const team of TEAMS) this.clues[team] ??= '';
    this.stage = 'guess';
    this.deadline = now + PICK_TIME;
    this.room.changed();
  }

  private reveal(now: number): void {
    const gains = both(() => 0);
    for (const team of TEAMS) {
      for (const spot of this.picks[team]) {
        if (this.targets[team].includes(spot)) gains[team] += OWN_POINTS;
        else if (this.targets[other(team)].includes(spot)) gains[team] += STEAL_POINTS;
      }
      this.score[team] += gains[team];
    }
    this.gains = gains;
    this.stage = 'reveal';
    this.deadline = now + REVEAL_TIME;
    this.room.changed();
  }

  toJSON() {
    const { room: _room, ...rest } = this;
    return rest;
  }

  static restore(room: Room, data: ReturnType<DuelGame['toJSON']>): DuelGame {
    return Object.assign(new DuelGame(room), data);
  }
}

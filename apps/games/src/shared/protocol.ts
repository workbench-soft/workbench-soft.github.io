import type { Action, Op } from './canvas.ts';

export type Lang = 'en' | 'ru';
export type Mode = 'guess' | 'telephone' | 'duel';
export type Speed = 'fast' | 'normal' | 'slow';
export type Phase = 'lobby' | 'choosing' | 'drawing' | 'turnEnd' | 'gameEnd' | 'tele' | 'album' | 'duel';
export type TeleKind = 'write' | 'draw' | 'describe';
export type Team = 'red' | 'blue';
export type DuelStage = 'clue' | 'guess' | 'reveal';
export const TEAMS: readonly Team[] = ['red', 'blue'];
export const BOARD_SIZE = 12;

export const MAX_PLAYERS = 12;
export const MAX_NAME = 20;
export const MAX_CHAT = 100;
export const MAX_PHRASE = 80;
export const CODE_ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
export const CODE_RE = /^[A-HJ-NP-Z2-9]{6}$/;

export type Settings = {
  mode: Mode;
  rounds: number;
  drawTime: number;
  wordLang: Lang;
  hints: boolean;
  customWords: string;
  customOnly: boolean;
  speed: Speed;
};

export const DEFAULT_SETTINGS: Settings = {
  mode: 'guess',
  rounds: 3,
  drawTime: 80,
  wordLang: 'en',
  hints: true,
  customWords: '',
  customOnly: false,
  speed: 'normal',
};

export const ROUND_OPTIONS = [1, 2, 3, 4, 5, 6, 8, 10];
export const DRAW_TIME_OPTIONS = [30, 45, 60, 80, 100, 120, 150, 180];

export type PlayerView = {
  id: string;
  name: string;
  color: string;
  score: number;
  online: boolean;
  /** Guessed the word this turn. */
  guessed: boolean;
  /** Sent the telephone entry for this step. */
  done: boolean;
  /** The clue duel team. */
  team: Team | null;
};

export type DuelView = {
  round: number;
  rounds: number;
  stage: DuelStage;
  deadline: number;
  board: string[];
  givers: Record<Team, string>;
  /** Both clues once both givers sent theirs. Before that, only your own team's. */
  clues: Record<Team, string | null>;
  /** Board positions a team must find. A giver sees the own team's, everyone sees both at the reveal. */
  targets: Record<Team, number[] | null>;
  /** Board positions a team picked. Your team's live, the other team's at the reveal. */
  picks: Record<Team, number[] | null>;
  locked: Record<Team, boolean>;
  score: Record<Team, number>;
  /** Points each team got this round, at the reveal. */
  gains: Record<Team, number> | null;
};

export type GuessView = {
  round: number;
  rounds: number;
  drawerId: string;
  deadline: number;
  /** Only the artist gets the choices. */
  choices: string[] | null;
  /** The word for the artist and the players who guessed it, or for everyone once the turn ends. */
  word: string | null;
  /** Hidden letters as `_`. */
  hint: string;
  /** Points each player got this turn, shown when the turn ends. */
  gains: Record<string, number> | null;
};

export type TeleView = {
  step: number;
  steps: number;
  kind: TeleKind;
  deadline: number;
  /** Players who play this game. A player who joined later watches. */
  playing: string[];
};

export type AlbumView = {
  chain: number;
  chains: number;
  /** Entries of the current chain on screen. */
  shown: number;
  length: number;
  owner: string;
  done: boolean;
};

export type RoomView = {
  code: string;
  you: string;
  hostId: string;
  now: number;
  phase: Phase;
  settings: Settings;
  players: PlayerView[];
  guess: GuessView | null;
  tele: TeleView | null;
  album: AlbumView | null;
  duel: DuelView | null;
};

export type TeleEntry = {
  by: string;
  name: string;
  kind: 'text' | 'drawing';
  text?: string;
  actions?: Action[];
  skipped?: boolean;
};

export type SystemKey =
  | 'joined'
  | 'left'
  | 'kicked'
  | 'guessed'
  | 'close'
  | 'word'
  | 'drawing'
  | 'host'
  | 'skipped'
  /** `word` holds the player count the game needs. */
  | 'needMore';

export type ChatMsg =
  | { kind: 'chat'; from: string; name: string; text: string; secret?: boolean }
  | { kind: 'sys'; key: SystemKey; name?: string; word?: string };

export type ClientMsg =
  | { t: 'hello'; token: string; name: string; color: string; lang: Lang }
  | { t: 'chat'; text: string }
  | { t: 'settings'; settings: Partial<Settings> }
  | { t: 'start' }
  | { t: 'pick'; index: number }
  | { t: 'draw'; ops: Op[] }
  | { t: 'submit'; text?: string; actions?: Action[] }
  | { t: 'next' }
  | { t: 'lobby' }
  | { t: 'kick'; id: string }
  | { t: 'team'; team: Team }
  | { t: 'shuffle' }
  | { t: 'clue'; text: string }
  | { t: 'toggle'; index: number }
  | { t: 'lock' };

export type ErrorKey = 'full' | 'kicked' | 'replaced' | 'bad' | 'clue';

export type ServerMsg =
  | { t: 'state'; room: RoomView }
  | { t: 'draw'; ops: Op[] }
  | { t: 'canvas'; actions: Action[] }
  | { t: 'chat'; m: ChatMsg }
  | { t: 'chats'; list: ChatMsg[] }
  | { t: 'task'; step: number; kind: TeleKind; prompt: TeleEntry | null }
  | { t: 'album'; chain: number; entries: TeleEntry[] }
  | { t: 'error'; key: ErrorKey };

export function randomCode(random: () => number = Math.random): string {
  let code = '';
  for (let i = 0; i < 6; i++) code += CODE_ALPHABET[Math.floor(random() * CODE_ALPHABET.length)];
  return code;
}

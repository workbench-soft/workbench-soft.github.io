import { describe, expect, it } from 'vitest';
import { CHOOSE_TIME, TURN_END_TIME } from './guess.ts';
import { HOST_GRACE, EMPTY_TTL, Room } from './room.ts';
import { GRACE, STEP_TIMES } from './telephone.ts';
import { CLUE_TIME, PICK_TIME, REVEAL_TIME } from './duel.ts';
import { makeRoom } from './test-helpers.ts';

describe('room', () => {
  it('makes the first player the host and passes the room on when the host stays away', () => {
    const { room, view, join } = makeRoom();
    join(['a', 'b']);
    expect(view('b').hostId).toBe('a');
    room.message('a', { t: 'settings', settings: { mode: 'telephone' } }, 0);
    room.message('a', { t: 'start' }, 0);
    room.disconnect('a', 1000);
    room.alarm(1000 + HOST_GRACE);
    expect(view('b').hostId).toBe('b');
  });

  it('keeps the seat of a player who drops out, and ignores settings from other players', () => {
    const { room, view, join } = makeRoom();
    join(['a', 'b']);
    room.message('b', { t: 'settings', settings: { rounds: 8 } }, 0);
    expect(view('a').settings.rounds).toBe(3);
    room.disconnect('b', 0);
    expect(view('a').players.find((p) => p.id === 'b')?.online).toBe(false);
    room.message('a', { t: 'settings', settings: { mode: 'telephone' } }, 0);
    room.message('a', { t: 'start' }, 0);
    expect(view('a').players.map((p) => p.id)).toEqual(['a']);
  });

  it('turns away a kicked player', () => {
    const { room, closed, join } = makeRoom();
    join(['a', 'b']);
    room.message('a', { t: 'kick', id: 'b' }, 0);
    expect(closed.get('b')).toBe('kicked');
    expect(room.connect('b', 'B', '#000000', 'en', 1)).toBe(false);
  });

  it('asks to be deleted after sitting empty', () => {
    const { room, join } = makeRoom();
    join(['a']);
    room.disconnect('a', 0);
    expect(room.alarm(EMPTY_TTL - 1)).toBe(false);
    expect(room.wakeAt()).toBe(EMPTY_TTL);
    expect(room.alarm(EMPTY_TTL)).toBe(true);
  });

  it('comes back from storage with the same game', () => {
    const { room, join } = makeRoom();
    join(['a', 'b']);
    room.message('a', { t: 'start' }, 0);
    const copy = Room.restore(JSON.parse(JSON.stringify(room.toJSON())), room.out, [], []);
    expect(copy.guess?.drawerId).toBe(room.guess?.drawerId);
    expect(copy.phase).toBe('choosing');
  });
});

function startGuess() {
  const t = makeRoom();
  t.join(['a', 'b', 'c']);
  t.room.message('a', { t: 'settings', settings: { rounds: 1, drawTime: 60 } }, 0);
  t.room.message('a', { t: 'start' }, 0);
  const drawer = t.room.guess!.drawerId;
  const others = ['a', 'b', 'c'].filter((id) => id !== drawer);
  return { ...t, drawer, others };
}

function startDuel() {
  const t = makeRoom();
  t.join(['a', 'b', 'c', 'd']);
  t.room.message('a', { t: 'settings', settings: { mode: 'duel', rounds: 1 } }, 0);
  t.room.message('a', { t: 'start' }, 0);
  return { ...t, duel: t.room.duel! };
}

describe('guess the drawing', () => {
  const started = startGuess;

  it('gives the choices to the artist only and hides the word from the guessers', () => {
    const { view, drawer, others, room } = started();
    expect(view(drawer).guess?.choices).toHaveLength(3);
    expect(view(others[0]).guess?.choices).toBeNull();
    room.message(drawer, { t: 'pick', index: 1 }, 1000);
    expect(view(drawer).guess?.word).toBe(room.guess!.word);
    expect(view(others[0]).guess?.word).toBeNull();
    expect(view(others[0]).guess?.hint).toMatch(/^[_ -]+$/);
  });

  it('scores a fast guess higher and ends the turn once everyone guessed', () => {
    const { view, drawer, others, room } = started();
    room.message(drawer, { t: 'pick', index: 0 }, 0);
    const word = room.guess!.word;
    room.message(others[0], { t: 'chat', text: word.toUpperCase() }, 1000);
    room.message(others[1], { t: 'chat', text: word }, 50_000);
    const gains = view(drawer).guess!.gains!;
    expect(view(drawer).phase).toBe('turnEnd');
    expect(gains[others[0]]).toBeGreaterThan(gains[others[1]]);
    expect(gains[drawer]).toBe(120);
  });

  it('keeps chat from players who know the word away from the others', () => {
    const { inbox, drawer, others, room } = started();
    room.message(drawer, { t: 'pick', index: 0 }, 0);
    room.message(others[0], { t: 'chat', text: room.guess!.word }, 1000);
    inbox.clear();
    room.message(others[0], { t: 'chat', text: 'easy one' }, 2000);
    expect(inbox.get(others[1])).toBeUndefined();
    expect(inbox.get(drawer)?.[0]).toMatchObject({ t: 'chat', m: { secret: true } });
  });

  it('passes the strokes of the artist to the others and drops strokes from anyone else', () => {
    const { inbox, drawer, others, room } = started();
    room.message(drawer, { t: 'pick', index: 0 }, 0);
    inbox.clear();
    room.message(others[0], { t: 'draw', ops: [{ k: 'f', x: 1, y: 1, c: '#ff0000' }] }, 1);
    expect(room.drawing.actions).toHaveLength(0);
    room.message(drawer, { t: 'draw', ops: [{ k: 's', id: 1, c: '#ff0000', w: 10, p: [1, 1] }] }, 2);
    expect(inbox.get(others[1])?.[0]).toMatchObject({ t: 'draw' });
    expect(inbox.get(drawer)).toBeUndefined();
  });

  it('picks a word on its own, runs out of time, and ends the game after the last turn', () => {
    const { view, drawer, room } = started();
    room.alarm(CHOOSE_TIME);
    expect(view(drawer).phase).toBe('drawing');
    let now = CHOOSE_TIME + 60_000;
    room.alarm(now);
    expect(view(drawer).phase).toBe('turnEnd');
    for (let i = 0; i < 2; i++) {
      now += TURN_END_TIME;
      room.alarm(now);
      now += CHOOSE_TIME;
      room.alarm(now);
      now += 60_000;
      room.alarm(now);
    }
    room.alarm(now + TURN_END_TIME);
    expect(view(drawer).phase).toBe('gameEnd');
  });
});

describe('drawing telephone', () => {
  it('passes each entry to the next player and shows the chains at the end', () => {
    const { room, view, last, join } = makeRoom();
    const ids = ['a', 'b', 'c'];
    join(ids);
    room.message('a', { t: 'settings', settings: { mode: 'telephone' } }, 0);
    room.message('a', { t: 'start' }, 0);
    for (const id of ids) room.message(id, { t: 'submit', text: `phrase of ${id}` }, 1);
    expect(view('a').tele?.kind).toBe('draw');
    const task = last('a', 'task')!;
    expect(task.prompt?.text).toMatch(/^phrase of /);
    expect(task.prompt?.by).not.toBe('a');
    for (const id of ids) room.message(id, { t: 'submit', actions: [{ k: 'fill', x: 5, y: 5, color: '#00ff00' }] }, 2);
    expect(last('b', 'task')!.prompt?.kind).toBe('drawing');
    // Nobody describes, so the timer fills the step in.
    room.alarm(2 + STEP_TIMES.normal.describe * 1000 + GRACE);
    expect(view('a').phase).toBe('album');
    expect(last('c', 'album')!.entries).toHaveLength(1);
    for (let i = 0; i < 9; i++) room.message('a', { t: 'next' }, 3);
    expect(view('a').album?.done).toBe(true);
  });
});

describe('clue duel', () => {
  const started = startDuel;

  it('shows the secret words to the clue giver only', () => {
    const { view, duel } = started();
    const red = duel.givers.red;
    const redGuesser = duel.members('red').find((id) => id !== red)!;
    expect(view(red).duel?.targets.red).toHaveLength(2);
    expect(view(red).duel?.targets.blue).toBeNull();
    expect(view(redGuesser).duel?.targets.red).toBeNull();
  });

  it('refuses a clue made of a board word', () => {
    const { room, last, duel } = started();
    room.message(duel.givers.red, { t: 'clue', text: duel.board[0] }, 1);
    expect(last(duel.givers.red, 'error')?.key).toBe('clue');
    expect(duel.clues.red).toBeNull();
  });

  it('scores own words and words taken from the other team', () => {
    const { room, view, duel } = started();
    room.message(duel.givers.red, { t: 'clue', text: 'zzq' }, 1);
    room.message(duel.givers.blue, { t: 'clue', text: 'qqz' }, 1);
    expect(duel.stage).toBe('guess');
    const redGuesser = duel.members('red').find((id) => id !== duel.givers.red)!;
    const blueGuesser = duel.members('blue').find((id) => id !== duel.givers.blue)!;
    for (const i of duel.targets.red) room.message(redGuesser, { t: 'toggle', index: i }, 2);
    room.message(blueGuesser, { t: 'toggle', index: duel.targets.red[0] }, 2);
    room.message(blueGuesser, { t: 'toggle', index: duel.targets.blue[0] }, 2);
    room.message(redGuesser, { t: 'lock' }, 3);
    room.message(blueGuesser, { t: 'lock' }, 3);
    expect(view('a').duel?.gains).toEqual({ red: 4, blue: 3 });
    room.alarm(3 + REVEAL_TIME);
    expect(view('a').phase).toBe('gameEnd');
  });

  it('moves on when the timers run out', () => {
    const { room, duel } = started();
    room.alarm(CLUE_TIME);
    expect(duel.stage).toBe('guess');
    room.alarm(CLUE_TIME + PICK_TIME);
    expect(duel.stage).toBe('reveal');
  });
});

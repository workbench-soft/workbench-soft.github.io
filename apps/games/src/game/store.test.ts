import { afterEach, describe, expect, it, vi } from 'vitest';
import { connect, send } from './store.ts';

/** A socket that opens when the test says so and records what it sent. */
class FakeSocket {
  static OPEN = 1;
  static last: FakeSocket | null = null;
  readyState = 0;
  sent: string[] = [];
  private handlers = new Map<string, ((event: unknown) => void)[]>();
  constructor(public url: string) {
    FakeSocket.last = this;
  }
  addEventListener(type: string, fn: (event: unknown) => void) {
    this.handlers.set(type, [...(this.handlers.get(type) ?? []), fn]);
  }
  send(text: string) {
    this.sent.push(text);
  }
  close() {}
  emit(type: string, event: unknown = {}) {
    if (type === 'open') this.readyState = FakeSocket.OPEN;
    for (const fn of this.handlers.get(type) ?? []) fn(event);
  }
}

describe('room socket', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.useRealTimers();
  });

  it('opens a new socket when a ping gets no answer', () => {
    vi.useFakeTimers();
    vi.stubGlobal('WebSocket', FakeSocket);
    vi.stubGlobal('location', new URL('https://games.workbench-soft.com/games/r/ABC234'));
    vi.stubGlobal('window', globalThis);
    connect('ABC234', 'Ann', '#000000');
    const first = FakeSocket.last!;
    first.emit('open');
    vi.advanceTimersByTime(30_000);
    expect(FakeSocket.last).toBe(first);
    vi.advanceTimersByTime(30_000);
    expect(FakeSocket.last).not.toBe(first);
  });

  it('tells the caller when a message could not go out', () => {
    vi.stubGlobal('WebSocket', FakeSocket);
    vi.stubGlobal('location', new URL('https://games.workbench-soft.com/games/r/ABC234'));
    vi.stubGlobal('window', globalThis);
    connect('ABC234', 'Ann', '#000000');
    expect(send({ t: 'submit', step: 0, text: 'a cat' })).toBe(false);
    FakeSocket.last!.emit('open');
    expect(send({ t: 'submit', step: 0, text: 'a cat' })).toBe(true);
    expect(FakeSocket.last!.sent.at(-1)).toBe(JSON.stringify({ t: 'submit', step: 0, text: 'a cat' }));
  });

  it('tries again when a socket never opens', () => {
    vi.useFakeTimers();
    vi.stubGlobal('WebSocket', FakeSocket);
    vi.stubGlobal('location', new URL('https://games.workbench-soft.com/games/r/ABC234'));
    vi.stubGlobal('window', globalThis);
    connect('ABC234', 'Ann', '#000000');
    const first = FakeSocket.last!;
    vi.advanceTimersByTime(9_000);
    expect(FakeSocket.last).toBe(first);
    vi.advanceTimersByTime(10_000);
    expect(FakeSocket.last).not.toBe(first);
  });

  it('keeps the socket after the page wakes from a freeze', () => {
    vi.useFakeTimers();
    vi.stubGlobal('WebSocket', FakeSocket);
    vi.stubGlobal('location', new URL('https://games.workbench-soft.com/games/r/ABC234'));
    vi.stubGlobal('window', globalThis);
    connect('ABC234', 'Ann', '#000000');
    const first = FakeSocket.last!;
    first.emit('open');
    vi.advanceTimersByTime(25_000);
    first.emit('message', { data: 'pong' });
    // Five minutes pass with no timer running, as in a frozen background tab.
    vi.setSystemTime(Date.now() + 300_000);
    vi.advanceTimersByTime(25_000);
    expect(FakeSocket.last).toBe(first);
    expect(first.sent.at(-1)).toBe('ping');
  });
});

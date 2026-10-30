import type { ErrorKey, ServerMsg } from '../shared/protocol.ts';
import { Room, type Out } from './room.ts';

/** A room with a fake socket layer that records what each player got. */
export function makeRoom(seed = 1) {
  const inbox = new Map<string, ServerMsg[]>();
  const closed = new Map<string, ErrorKey>();
  const out: Out = {
    send: (id, msg) => inbox.set(id, [...(inbox.get(id) ?? []), msg]),
    close: (id, reason) => closed.set(id, reason),
  };
  let state = seed;
  // A small fixed generator, so each run deals the same words.
  const random = () => ((state = (state * 16807) % 2147483647) - 1) / 2147483646;
  const room = new Room('ABCDEF', out, random);
  const last = <T extends ServerMsg['t']>(id: string, t: T) =>
    (inbox.get(id) ?? []).findLast((m) => m.t === t) as Extract<ServerMsg, { t: T }> | undefined;
  const view = (id: string) => last(id, 'state')!.room;
  const join = (ids: string[], now = 0) => ids.forEach((id) => room.connect(id, id.toUpperCase(), '#000000', 'en', now));
  return { room, inbox, closed, last, view, join };
}

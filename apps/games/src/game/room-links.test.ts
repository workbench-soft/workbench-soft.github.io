import { describe, expect, it } from 'vitest';
import { roomFromLink } from './room-links.ts';

describe('room links', () => {
  it('reads the code of a shared room link', () => {
    expect(roomFromLink('https://games.workbench-soft.com/games/r/abcdef')).toBe('ABCDEF');
    expect(roomFromLink('https://games.workbench-soft.com/games/r/ABCDEF/?x=1')).toBe('ABCDEF');
  });

  it('skips other addresses', () => {
    expect(roomFromLink('https://games.workbench-soft.com/games/')).toBeNull();
    expect(roomFromLink('https://evil.example/games/r/ABCDEF')).toBeNull();
    expect(roomFromLink('workbenchsoft-dev:unlock?key=1')).toBeNull();
  });
});

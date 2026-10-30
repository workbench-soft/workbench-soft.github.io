import { afterEach, describe, expect, it, vi } from 'vitest';
import { codeFromLocation } from './platform.ts';

const at = (url: string) => vi.stubGlobal('location', new URL(url));

describe('room code from the address', () => {
  afterEach(() => vi.unstubAllGlobals());

  it('reads the code from a room link and from the app query', () => {
    at('https://workbenchsoft.com/games/r/abc234');
    expect(codeFromLocation()).toBe('ABC234');
    at('https://localhost/games/room/?code=XYZ789&mode=duel');
    expect(codeFromLocation()).toBe('XYZ789');
  });

  it('turns down a code with a letter that codes do not use', () => {
    at('https://workbenchsoft.com/games/r/ABC123');
    expect(codeFromLocation()).toBeNull();
    at('https://localhost/games/room/?code=OOOOOO');
    expect(codeFromLocation()).toBeNull();
  });
});

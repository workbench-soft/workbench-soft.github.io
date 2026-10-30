import { describe, expect, it } from 'vitest';
import { appFor } from './index.ts';

describe('edge routes', () => {
  it('sends the games paths to the games app', () => {
    expect(appFor('/games')?.name).toBe('games');
    expect(appFor('/games/r/ABC123')?.name).toBe('games');
    expect(appFor('/games/ws/ABC123')?.name).toBe('games');
  });

  it('sends every other path to the public site', () => {
    expect(appFor('/')).toBeNull();
    expect(appFor('/langflip/')).toBeNull();
    expect(appFor('/gamesroom')).toBeNull();
  });
});

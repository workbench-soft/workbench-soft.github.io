export type Random = () => number;

export function shuffle<T>(list: readonly T[], random: Random): T[] {
  const out = [...list];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

export function sample<T>(list: readonly T[], count: number, random: Random): T[] {
  return shuffle(list, random).slice(0, count);
}

export function minTime(...times: (number | null | undefined)[]): number | null {
  const real = times.filter((t): t is number => typeof t === 'number');
  return real.length ? Math.min(...real) : null;
}

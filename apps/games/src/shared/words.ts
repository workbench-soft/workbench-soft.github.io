/** Lower case, ё as е, punctuation as spaces, so "Ёлка!" matches "елка". */
export function normalize(text: string): string {
  return text
    .toLowerCase()
    .replaceAll('ё', 'е')
    .replace(/[^\p{L}\p{N}]+/gu, ' ')
    .trim();
}

/** Edit distance, stopping early once it passes `limit`. */
export function distance(a: string, b: string, limit = 3): number {
  if (Math.abs(a.length - b.length) > limit) return limit + 1;
  let prev = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    const cur = [i];
    let best = i;
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + cost);
      best = Math.min(best, cur[j]);
    }
    if (best > limit) return limit + 1;
    prev = cur;
  }
  return prev[b.length];
}

/** A guess one typo away from the word, or two for a long word. */
export function isClose(guess: string, word: string): boolean {
  if (word.length < 4 || guess === word) return false;
  const allowed = word.length >= 8 ? 2 : 1;
  return distance(guess, word, allowed) <= allowed;
}

/** The word with hidden letters as `_`. Spaces and dashes stay visible. */
export function maskWord(word: string, revealed: readonly number[]): string {
  const shown = new Set(revealed);
  return [...word].map((ch, i) => (ch === ' ' || ch === '-' || shown.has(i) ? ch : '_')).join('');
}

/** Positions of letters a hint may reveal. */
export function letterPositions(word: string): number[] {
  return [...word].flatMap((ch, i) => (ch === ' ' || ch === '-' ? [] : [i]));
}

/** Words from the host's list: comma or line separated, 2 to 30 letters. */
export function parseCustomWords(text: string): string[] {
  const seen = new Set<string>();
  return text
    .split(/[,\n]/)
    .map((w) => w.trim().replace(/\s+/g, ' '))
    .filter((w) => w.length >= 2 && w.length <= 30 && !seen.has(w.toLowerCase()) && seen.add(w.toLowerCase()))
    .slice(0, 300);
}

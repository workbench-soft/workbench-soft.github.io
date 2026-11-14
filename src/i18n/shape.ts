// Helpers for the catalog tests of the home page and the astrology section.

/**
 * Each string becomes its path plus the {placeholders} it holds, so a missing key, an extra key,
 * a lost placeholder or a list of another length shows up as a diff against English.
 */
export function shape(value: unknown, path = ''): string[] {
  if (typeof value === 'string') return [`${path} ${(value.match(/\{\w+\}/g) ?? []).toSorted().join(' ')}`];
  if (Array.isArray(value)) return [`${path}[${value.length}]`, ...value.flatMap((v, i) => shape(v, `${path}.${i}`))];
  if (value && typeof value === 'object')
    return Object.entries(value)
      .toSorted(([a], [b]) => a.localeCompare(b))
      .flatMap(([k, v]) => shape(v, `${path}.${k}`));
  return [`${path} ${typeof value}`];
}

/** Each string a catalog holds, for the check that none is empty. */
export const strings = (value: unknown): string[] =>
  typeof value === 'string' ? [value] : value && typeof value === 'object' ? Object.values(value).flatMap(strings) : [];

// Low precision Sun and Moon positions for the Today page, good to about a degree.
// The formulas are the short series from the Astronomical Almanac.
const rad = Math.PI / 180;
const norm = (deg: number) => ((deg % 360) + 360) % 360;
const days = (date: Date) => date.getTime() / 864e5 - 10957.5;

/** The Sun's tropical ecliptic longitude in degrees. */
export function sunLongitude(date: Date): number {
  const d = days(date);
  const g = (357.528 + 0.9856003 * d) * rad;
  return norm(280.46 + 0.9856474 * d + 1.915 * Math.sin(g) + 0.02 * Math.sin(2 * g));
}

/** The Moon's tropical ecliptic longitude in degrees. */
export function moonLongitude(date: Date): number {
  const d = days(date);
  const l = 218.316 + 13.176396 * d;
  const m = (134.963 + 13.064993 * d) * rad;
  const f = (93.272 + 13.22935 * d) * rad;
  const e = (297.85 + 12.190749 * d) * rad;
  const s = (357.529 + 0.98560028 * d) * rad;
  return norm(
    l +
      6.289 * Math.sin(m) -
      1.274 * Math.sin(m - 2 * e) +
      0.658 * Math.sin(2 * e) +
      0.214 * Math.sin(2 * m) -
      0.186 * Math.sin(s) -
      0.114 * Math.sin(2 * f),
  );
}

/** The index of the sign a longitude falls in, 0 for Aries. */
export const signAt = (longitude: number) => Math.floor(norm(longitude) / 30);

/** The day count of a local calendar date, so each reader gets the same tip on the same date. */
export const dayNumber = (date: Date) =>
  Math.floor(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) / 864e5);

/** Which tip and which focus line a sign gets on a day. */
export const pick = (day: number, sign: number, tips: number, focus: number) => ({
  tip: (day * 7 + sign * 11) % tips,
  focus: (day + sign) % focus,
});

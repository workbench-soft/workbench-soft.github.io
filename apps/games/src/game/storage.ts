// localStorage can throw in private windows. The game then forgets the name on reload, and still works.

export function load(key: string): string | null {
  try {
    return localStorage.getItem(`wg-${key}`);
  } catch {
    return null;
  }
}

export function save(key: string, value: string): void {
  try {
    localStorage.setItem(`wg-${key}`, value);
  } catch {
    // The value lives for this page only.
  }
}

/** A secret that ties this browser to its seat in a room. The server only sees its hash. */
export function token(): string {
  let value = load('token');
  if (!value) {
    const bytes = crypto.getRandomValues(new Uint8Array(16));
    value = [...bytes].map((b) => b.toString(16).padStart(2, '0')).join('');
    save('token', value);
  }
  return value;
}

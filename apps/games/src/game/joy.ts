import confetti from 'canvas-confetti';

let audio: AudioContext | null = null;

/** Three rising notes, made on the spot, so the app ships no sound file. */
function chime(): void {
  try {
    audio ??= new AudioContext();
    const start = audio.currentTime;
    [523, 659, 784].forEach((freq, i) => {
      const osc = audio!.createOscillator();
      const gain = audio!.createGain();
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0.2, start + i * 0.12);
      gain.gain.exponentialRampToValueAtTime(0.001, start + i * 0.12 + 0.3);
      osc.connect(gain).connect(audio!.destination);
      osc.start(start + i * 0.12);
      osc.stop(start + i * 0.12 + 0.3);
    });
  } catch {
    // A browser without Web Audio stays quiet.
  }
}

/** A right guess: a chime and a burst of confetti. */
export function celebrate(): void {
  chime();
  const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!still) void confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
}

/** Stars for a guess, 1 to 3, so a child who can't read numbers still sees how well it went. */
export function stars(points: number): string {
  return '⭐'.repeat(points >= 400 ? 3 : points >= 250 ? 2 : 1);
}

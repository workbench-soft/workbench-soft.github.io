import { useEffect, useRef, useState } from 'preact/hooks';
import type { PlayerView } from '../shared/protocol.ts';
import { t } from './i18n.ts';
import { isNative } from './platform.ts';
import { room, send, serverNow } from './store.ts';

export function useSecondsLeft(deadline: number): number {
  const [, tick] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => tick((n) => n + 1), 250);
    return () => clearInterval(timer);
  }, []);
  return Math.max(0, Math.ceil((deadline - serverNow()) / 1000));
}

export function Timer({ deadline }: { deadline: number }) {
  const left = useSecondsLeft(deadline);
  return (
    <span class={`timer${left <= 10 ? ' timer-low' : ''}`} role="timer" aria-live="off">
      {left}
    </span>
  );
}

export function Avatar({ player, size = 32 }: { player: Pick<PlayerView, 'name' | 'color'>; size?: number }) {
  return (
    <span
      class="avatar"
      style={{ background: player.color, width: `${size}px`, height: `${size}px` }}
      aria-hidden="true"
    >
      {player.name.slice(0, 1).toUpperCase()}
    </span>
  );
}

type ListProps = { mark?: (p: PlayerView) => string | null; scores?: boolean };

export function PlayerList({ mark, scores = true }: ListProps) {
  const view = room.value!;
  const players = scores ? view.players.toSorted((a, b) => b.score - a.score) : view.players;
  const isHost = view.you === view.hostId;
  return (
    <ul class="players">
      {players.map((p) => (
        <li class={`player${p.online ? '' : ' player-off'}${p.id === view.you ? ' player-me' : ''}`}>
          <Avatar player={p} />
          <span class="player-name">
            {p.name}
            {p.id === view.you && <small> ({t('you')})</small>}
            {p.id === view.hostId && <small class="tag">{t('host')}</small>}
            {!p.online && <small> · {t('offline')}</small>}
          </span>
          {mark?.(p) && <span class="player-mark">{mark(p)}</span>}
          {scores && <span class="player-score">{p.score}</span>}
          {isHost && p.id !== view.you && view.phase === 'lobby' && (
            <button type="button" class="link-btn" onClick={() => send({ t: 'kick', id: p.id })}>
              {t('kick')}
            </button>
          )}
        </li>
      ))}
    </ul>
  );
}

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

const CLIENT: string | undefined = import.meta.env.PUBLIC_ADSENSE_CLIENT;
const SLOT: string | undefined = import.meta.env.PUBLIC_ADSENSE_SLOT_ROOM;

/** A banner for the lobby and the results. AdSense rules forbid it inside the apps, where AdMob shows its own. */
export function AdSlot() {
  const ref = useRef<HTMLModElement>(null);
  useEffect(() => {
    if (!CLIENT || !SLOT || isNative()) return;
    if (!document.querySelector('script[data-adsense]')) {
      const script = document.createElement('script');
      script.async = true;
      script.dataset.adsense = '';
      script.crossOrigin = 'anonymous';
      script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${CLIENT}`;
      document.head.append(script);
    }
    (window.adsbygoogle ??= []).push({});
  }, []);
  if (!CLIENT || !SLOT || isNative()) return null;
  return (
    <div class="ad">
      <ins
        ref={ref}
        class="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={CLIENT}
        data-ad-slot={SLOT}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}

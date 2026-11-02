import { useEffect, useRef, useState } from 'preact/hooks';
import type { PlayerView } from '../shared/protocol.ts';
import { setDevAdsShown } from './admob.ts';
import { devAdsShown, isDevDevice } from './dev-device.ts';
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

/**
 * A circle that empties as the time runs out, so a child who can't read numbers still sees it.
 * The number shows inside only outside kids mode.
 */
export function Timer({ deadline }: { deadline: number }) {
  const left = useSecondsLeft(deadline);
  const total = useRef({ deadline, max: left });
  if (total.current.deadline !== deadline) total.current = { deadline, max: left };
  total.current.max = Math.max(total.current.max, left, 1);
  const share = left / total.current.max;
  const kids = room.value?.settings.kids ?? false;
  return (
    <span
      class={`timer${share <= 0.2 ? ' timer-low' : ''}`}
      style={{ '--share': `${Math.round(share * 360)}deg` }}
      role="timer"
      aria-label={String(left)}
      aria-live="off"
    >
      <span>{kids ? '' : left}</span>
    </span>
  );
}

export function Avatar({
  player,
  size = 32,
}: {
  player: Pick<PlayerView, 'name' | 'color' | 'avatar'>;
  size?: number;
}) {
  return (
    <span
      class="avatar"
      style={{
        background: player.color,
        width: `${size}px`,
        height: `${size}px`,
        fontSize: player.avatar ? `${Math.round(size * 0.6)}px` : undefined,
      }}
      aria-hidden="true"
    >
      {player.avatar ?? player.name.slice(0, 1).toUpperCase()}
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
            <button
              type="button"
              class="link-btn"
              onClick={() => confirm(t('kickAsk', { name: p.name })) && send({ t: 'kick', id: p.id })}
            >
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

/** The developer's phone only, in the app. Brings Google's test banner back or hides it. */
export function DevAdsSwitch() {
  if (!isNative() || !isDevDevice()) return null;
  return (
    <label class="check dev-ads">
      <input type="checkbox" checked={devAdsShown()} onChange={(e) => setDevAdsShown(e.currentTarget.checked)} />
      {t('devAds')}
    </label>
  );
}

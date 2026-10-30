import { useEffect, useState } from 'preact/hooks';
import { COLORS } from '../shared/canvas.ts';
import { MAX_NAME, type Mode } from '../shared/protocol.ts';
import { syncBanner } from './admob.ts';
import { DuelScreen } from './DuelScreen.tsx';
import { GuessScreen } from './GuessScreen.tsx';
import { lang, setLang, t } from './i18n.ts';
import { Lobby } from './Lobby.tsx';
import { codeFromLocation, isNative } from './platform.ts';
import { Results } from './Results.tsx';
import { ROUTES, asset } from '../site/routes.ts';
import { load, save } from './storage.ts';
import { connect, fatal, room, send, status } from './store.ts';
import { AlbumScreen, TeleScreen } from './TeleScreen.tsx';

const AVATAR_COLORS = COLORS.filter(
  (c) => !['#ffffff', '#c3c3c3', '#fff59d', '#d7ccc8', '#ffd180', '#b9f6ca'].includes(c),
);

function JoinForm({ onJoin }: { onJoin: () => void }) {
  const [name, setName] = useState(load('name') ?? '');
  const [color, setColor] = useState(
    () => load('color') ?? AVATAR_COLORS[Math.floor(Math.random() * AVATAR_COLORS.length)],
  );
  return (
    <form
      class="card join"
      onSubmit={(e) => {
        e.preventDefault();
        const clean = name.trim();
        if (!clean) return;
        save('name', clean);
        save('color', color);
        onJoin();
      }}
    >
      <h1>{t('join')}</h1>
      <label class="field">
        <span>{t('yourName')}</span>
        <input
          value={name}
          maxLength={MAX_NAME}
          onInput={(e) => setName(e.currentTarget.value)}
          autofocus
          required
          autocomplete="off"
        />
      </label>
      <fieldset class="field">
        <legend>{t('pickColor')}</legend>
        <div class="swatches">
          {AVATAR_COLORS.map((c) => (
            <button
              type="button"
              class={`swatch${c === color ? ' on' : ''}`}
              style={{ background: c }}
              aria-label={c}
              aria-pressed={c === color}
              onClick={() => setColor(c)}
            />
          ))}
        </div>
      </fieldset>
      <button type="submit" class="btn btn-big">
        {t('join')}
      </button>
    </form>
  );
}

function Screen() {
  const view = room.value;
  if (!view) return <p class="card center">{t('connecting')}</p>;
  switch (view.phase) {
    case 'lobby':
      return <Lobby />;
    case 'choosing':
    case 'drawing':
    case 'turnEnd':
      return <GuessScreen />;
    case 'tele':
      return <TeleScreen />;
    case 'album':
      return <AlbumScreen />;
    case 'duel':
      return <DuelScreen />;
    case 'gameEnd':
      return <Results />;
  }
}

export function App() {
  const code = codeFromLocation();
  // A player who gave a name before goes straight in.
  const [joined, setJoined] = useState(() => Boolean(code && load('name')));
  // The join form saves the name and the color first, so both ways in read them here.
  useEffect(() => {
    if (joined && code) connect(code, load('name') ?? '', load('color') ?? AVATAR_COLORS[0]);
  }, [joined, code]);
  const phase = room.value?.phase;
  const albumDone = room.value?.album?.done ?? false;
  const you = room.value?.you;

  // A room opened from a game page starts on that game.
  useEffect(() => {
    const view = room.peek();
    const mode = new URLSearchParams(location.search).get('mode') as Mode | null;
    if (
      view &&
      mode &&
      view.you === view.hostId &&
      view.phase === 'lobby' &&
      view.players.length === 1 &&
      view.settings.mode !== mode
    ) {
      send({ t: 'settings', settings: { mode } });
    }
  }, [you]);

  // In the apps the AdMob banner shows where the site shows AdSense: the lobby and the results.
  useEffect(() => {
    if (isNative()) void syncBanner(phase === 'lobby' || phase === 'gameEnd' || albumDone);
  }, [phase, albumDone]);

  const home = isNative() ? `${ROUTES.home[lang.value]}index.html` : ROUTES.home[lang.value];
  return (
    <>
      <header class="site-header">
        <a class="logo" href={home}>
          <img src={asset('/favicon.svg')} width="28" height="28" alt="" />
          <span>{t('appName')}</span>
        </a>
        <div class="header-tools">
          {code && (
            <span class="room-code">
              {t('room')} <b>{code}</b>
            </span>
          )}
          <button
            type="button"
            class="btn btn-ghost btn-small"
            onClick={() => setLang(lang.value === 'ru' ? 'en' : 'ru')}
          >
            {lang.value === 'ru' ? 'EN' : 'RU'}
          </button>
        </div>
      </header>
      {status.value === 'lost' && !fatal.value && <p class="banner">{t('reconnecting')}</p>}
      <main class="room-main">
        {!code ? (
          <p class="card center">
            {t('badCode')} <a href={home}>{t('home')}</a>
          </p>
        ) : fatal.value ? (
          <p class="card center">
            {t(fatal.value === 'clue' ? 'bad' : fatal.value)} <a href={home}>{t('home')}</a>
          </p>
        ) : !joined ? (
          <JoinForm onJoin={() => setJoined(true)} />
        ) : (
          <Screen />
        )}
      </main>
    </>
  );
}

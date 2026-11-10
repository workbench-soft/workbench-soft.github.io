import { useEffect, useState } from 'preact/hooks';
import { COLORS } from '../shared/canvas.ts';
import { AVATARS } from '../shared/avatars.ts';
import { MAX_NAME, type Lang, type Mode } from '../shared/protocol.ts';
import { syncBanner } from './admob.ts';
import { DuelScreen } from './DuelScreen.tsx';
import { GuessScreen } from './GuessScreen.tsx';
import { lang, setLang, t } from './i18n.ts';
import { Lobby } from './Lobby.tsx';
import { codeFromLocation, isNative } from './platform.ts';
import { useCopyLink } from './common.tsx';
import { Results } from './Results.tsx';
import { ROUTES, asset } from '../site/routes.ts';
import { load, loadTab, save, saveTab } from './storage.ts';
import { connect, editingProfile, fatal, room, send, status, updateProfile } from './store.ts';
import { AlbumScreen, TeleScreen } from './TeleScreen.tsx';

const AVATAR_COLORS = COLORS.filter(
  (c) => !['#ffffff', '#c3c3c3', '#fff59d', '#d7ccc8', '#ffd180', '#b9f6ca'].includes(c),
);

const randomColor = () => AVATAR_COLORS[Math.floor(Math.random() * AVATAR_COLORS.length)];

function LangPicker() {
  return (
    <select
      class="lang-pick"
      aria-label={t('language')}
      value={lang.value}
      onChange={(e) => setLang(e.currentTarget.value as Lang)}
    >
      <option value="en">English</option>
      <option value="ru">Русский</option>
    </select>
  );
}

/** The link to send, in every phase, so a host alone in the room can share it at once. */
function RoomLink({ code }: { code: string }) {
  const { copied, copy } = useCopyLink(code);
  return (
    <button type="button" class="room-code" title={t('copy')} onClick={copy}>
      {copied ? (
        t('copied')
      ) : (
        <>
          🔗 {t('room')} <b>{code}</b>
        </>
      )}
    </button>
  );
}

/**
 * Everyone who opens a room in a new tab lands here, the host too, with the saved animal and name.
 * A tap on an animal joins. A child who can't type needs nothing else, and the name stays optional.
 */
function JoinForm({ onJoin }: { onJoin: () => void }) {
  const [name, setName] = useState(load('name') ?? '');
  const picked = load('avatar');
  const join = (avatar: string) => {
    save('name', name.trim());
    save('avatar', avatar);
    if (!load('color')) save('color', randomColor());
    onJoin();
  };
  return (
    <form
      class="card join"
      onSubmit={(e) => {
        e.preventDefault();
        join(picked ?? AVATARS[0].emoji);
      }}
    >
      <h1>{t('pickAnimal')}</h1>
      <div class="animals">
        {AVATARS.map((a) => (
          <button
            type="button"
            class={`animal${picked === a.emoji ? ' on' : ''}`}
            aria-label={a[lang.value]}
            aria-pressed={picked === a.emoji}
            onClick={() => join(a.emoji)}
          >
            <span aria-hidden="true">{a.emoji}</span>
          </button>
        ))}
      </div>
      <label class="field">
        <span>{t('nameOptional')}</span>
        <input value={name} maxLength={MAX_NAME} onInput={(e) => setName(e.currentTarget.value)} autocomplete="off" />
      </label>
      <label class="field">
        <span>{t('language')}</span>
        <LangPicker />
      </label>
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
  // A reload in the same tab goes straight in. A new tab shows the join screen, so everyone picks an animal.
  const [joined, setJoined] = useState(() => Boolean(code && loadTab(`joined-${code}`)));
  // The join form saves the name and the color first, so both ways in read them here.
  useEffect(() => {
    if (joined && code) connect(code, load('name') ?? '', load('color') ?? AVATAR_COLORS[0], load('avatar') ?? '');
  }, [joined, code]);
  const phase = room.value?.phase;
  const albumDone = room.value?.album?.done ?? false;
  const you = room.value?.you;

  // The game started while a player was still picking an animal: the room only takes changes in the lobby.
  useEffect(() => {
    if (phase && phase !== 'lobby') editingProfile.value = false;
  }, [phase]);

  const onJoin = () => {
    if (editingProfile.value) {
      updateProfile(load('name') ?? '', load('avatar') ?? '');
      editingProfile.value = false;
    } else if (code) {
      saveTab(`joined-${code}`, '1');
      setJoined(true);
    }
  };

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
        <a
          class="logo"
          href={home}
          // A stray tap on the logo must not throw a child out of a game.
          onClick={(e) => joined && phase && phase !== 'lobby' && !confirm(t('leaveRoom')) && e.preventDefault()}
        >
          <img src={asset('/favicon.svg')} width="28" height="28" alt="" />
          <span>{t('appName')}</span>
        </a>
        <div class="header-tools">
          {code && <RoomLink code={code} />}
          {(!phase || phase === 'lobby') && <LangPicker />}
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
        ) : !joined || editingProfile.value ? (
          <JoinForm onJoin={onJoin} />
        ) : (
          <Screen />
        )}
      </main>
    </>
  );
}

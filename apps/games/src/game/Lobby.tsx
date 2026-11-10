import { useState } from 'preact/hooks';
import {
  DRAW_TIME_OPTIONS,
  LANG_NAMES,
  LANGS,
  ROUND_OPTIONS,
  TEAMS,
  type Mode,
  type Settings,
  type Speed,
} from '../shared/protocol.ts';
import { Chat } from './Chat.tsx';
import { GAME_EMOJI } from '../site/routes.ts';
import { AdSlot, Avatar, DevAdsSwitch, PlayerList, useCopyLink } from './common.tsx';
import { HowTo } from './kids.tsx';
import { t } from './i18n.ts';
import { room, send } from './store.ts';

const MODES: Mode[] = ['guess', 'telephone', 'duel'];
const NEED: Record<Mode, number> = { guess: 2, telephone: 2, duel: 4 };

function Invite({ code }: { code: string }) {
  const { link, copied, copy } = useCopyLink(code);
  return (
    <section class="card invite">
      <h2>{t('invite')}</h2>
      <p class="muted">{t('inviteHint')}</p>
      <div class="invite-row">
        <input
          class="invite-link"
          readOnly
          value={link}
          aria-label={t('invite')}
          onFocus={(e) => e.currentTarget.select()}
        />
        <button type="button" class="btn" onClick={copy}>
          {copied ? t('copied') : t('copy')}
        </button>
        {'share' in navigator && (
          <button
            type="button"
            class="btn btn-ghost"
            onClick={() => navigator.share({ title: t('appName'), url: link }).catch(() => {})}
          >
            {t('share')}
          </button>
        )}
      </div>
    </section>
  );
}

function Field({ label, children }: { label: string; children: preact.ComponentChildren }) {
  return (
    <label class="field">
      <span>{label}</span>
      {children}
    </label>
  );
}

const set = (settings: Partial<Settings>) => send({ t: 'settings', settings });

function SettingsForm({ s, host }: { s: Settings; host: boolean }) {
  const [words, setWords] = useState(s.customWords);
  return (
    <details class="settings-fold">
      <summary>⚙️ {t('settings')}</summary>
      <fieldset class="settings" disabled={!host}>
        {s.mode !== 'telephone' && (
          <Field label={t('rounds')}>
            <select value={s.rounds} onChange={(e) => set({ rounds: Number(e.currentTarget.value) })}>
              {ROUND_OPTIONS.map((n) => (
                <option value={n}>{n}</option>
              ))}
            </select>
          </Field>
        )}
        {s.mode === 'guess' && !s.kids && (
          <Field label={t('drawTime')}>
            <select value={s.drawTime} onChange={(e) => set({ drawTime: Number(e.currentTarget.value) })}>
              {DRAW_TIME_OPTIONS.map((n) => (
                <option value={n}>{t('seconds', { n })}</option>
              ))}
            </select>
          </Field>
        )}
        {s.mode === 'telephone' && (
          <Field label={t('speed')}>
            <select value={s.speed} onChange={(e) => set({ speed: e.currentTarget.value as Speed })}>
              {(['fast', 'normal', 'slow'] as Speed[]).map((v) => (
                <option value={v}>{t(v)}</option>
              ))}
            </select>
          </Field>
        )}
        <Field label={t('wordLang')}>
          <select value={s.wordLang} onChange={(e) => set({ wordLang: e.currentTarget.value as Settings['wordLang'] })}>
            {LANGS.map((code) => (
              <option key={code} value={code}>
                {LANG_NAMES[code]}
              </option>
            ))}
          </select>
        </Field>
        {s.mode === 'guess' && !s.kids && (
          <label class="check">
            <input type="checkbox" checked={s.hints} onChange={(e) => set({ hints: e.currentTarget.checked })} />
            {t('hints')}
          </label>
        )}
        {s.mode !== 'telephone' && !(s.mode === 'guess' && s.kids) && (
          <>
            <Field label={t('customWords')}>
              <textarea
                rows={2}
                value={host ? words : s.customWords}
                maxLength={5000}
                placeholder={t('customWordsHint')}
                onInput={(e) => setWords(e.currentTarget.value)}
                onBlur={() => set({ customWords: words })}
              />
            </Field>
            <label class="check">
              <input
                type="checkbox"
                checked={s.customOnly}
                onChange={(e) => set({ customOnly: e.currentTarget.checked })}
              />
              {t('customOnly')}
            </label>
          </>
        )}
      </fieldset>
    </details>
  );
}

function Teams({ host }: { host: boolean }) {
  const view = room.value!;
  return (
    <section class="teams">
      {TEAMS.map((team) => {
        const members = view.players.filter((p) => p.team === team && p.online);
        const mine = view.players.find((p) => p.id === view.you)?.team === team;
        return (
          <div class={`team team-${team}`}>
            <h3>{t(team)}</h3>
            <ul>
              {members.map((p) => (
                <li>
                  <Avatar player={p} size={24} /> {p.name}
                </li>
              ))}
            </ul>
            {!mine && (
              <button type="button" class="btn btn-small" onClick={() => send({ t: 'team', team })}>
                {t('joinTeam')}
              </button>
            )}
          </div>
        );
      })}
      {host && (
        <button type="button" class="link-btn" onClick={() => send({ t: 'shuffle' })}>
          {t('shuffle')}
        </button>
      )}
    </section>
  );
}

export function Lobby() {
  const view = room.value!;
  const host = view.you === view.hostId;
  const s = view.settings;
  const online = view.players.filter((p) => p.online).length;
  const enough = online >= NEED[s.mode];
  return (
    <div class="lobby">
      <div class="lobby-main">
        <Invite code={view.code} />
        <section class="card">
          <h2>{t('game')}</h2>
          <div class="modes">
            {MODES.map((mode) => (
              <button
                type="button"
                aria-pressed={s.mode === mode}
                class={`mode mode-${mode}${s.mode === mode ? ' on' : ''}`}
                disabled={!host}
                title={t(`${mode}Short`)}
                onClick={() => send({ t: 'settings', settings: { mode } })}
              >
                <span class="mode-pic" aria-hidden="true">
                  {GAME_EMOJI[mode]}
                </span>
                <strong>{t(mode)}</strong>
                {mode === 'duel' && <small class="tag">{t('age8')}</small>}
              </button>
            ))}
          </div>
          <HowTo mode={s.mode} kids={s.kids} />
          {s.mode === 'guess' && !s.kids && <p class="muted points-rule">{t('pointsRule')}</p>}
          <label class="check kids-switch">
            <input
              type="checkbox"
              checked={s.kids}
              disabled={!host}
              onChange={(e) => set({ kids: e.currentTarget.checked })}
            />
            <span>
              👶 <b>{t('kids')}</b> <small class="muted">{t('kidsHint')}</small>
            </span>
          </label>
          {s.mode === 'duel' && <Teams host={host} />}
          <div class="start">
            {host ? (
              <button
                type="button"
                class="btn btn-big btn-play"
                disabled={!enough}
                onClick={() => send({ t: 'start' })}
              >
                ▶ {t('start')}
              </button>
            ) : (
              <p class="wait-host">⏳ {t('waitHost')}</p>
            )}
            {!enough && <p class="muted">{t('needPlayers', { n: NEED[s.mode] })}</p>}
          </div>
          <SettingsForm s={s} host={host} key={s.mode} />
        </section>
        <AdSlot />
        <DevAdsSwitch />
      </div>
      <aside class="lobby-side">
        <section class="card">
          <h2>
            {t('players')} <small class="muted">{online}/12</small>
          </h2>
          <PlayerList scores={false} />
        </section>
        <Chat />
      </aside>
    </div>
  );
}

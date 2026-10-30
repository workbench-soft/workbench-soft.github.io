import { useEffect, useRef, useState } from 'preact/hooks';
import { signal } from '@preact/signals';
import { Drawing } from '../shared/canvas.ts';
import { MAX_PHRASE, type TeleEntry } from '../shared/protocol.ts';
import { randomPrompt } from '../words/prompts.ts';
import { Board, Picture } from '../drawing/Board.tsx';
import { AdSlot, Avatar, Timer, useSecondsLeft } from './common.tsx';
import { lang, t } from './i18n.ts';
import { album, room, send, task } from './store.ts';

const localVersion = signal(0);

function Entry({ entry, index }: { entry: TeleEntry; index: number }) {
  const label = entry.kind === 'drawing' ? 'drew' : index === 0 ? 'wrote' : 'described';
  return (
    <li class={`entry entry-${entry.kind}`}>
      <p class="entry-by">{t(label, { name: entry.name })}</p>
      {entry.kind === 'drawing' ? (
        entry.skipped ? <p class="muted">{t('skipped')}</p> : <Picture actions={entry.actions ?? []} />
      ) : (
        <p class="bubble">{entry.skipped && !entry.text ? t('skipped') : entry.text}</p>
      )}
    </li>
  );
}

function Task() {
  const view = room.value!;
  const tele = view.tele!;
  const current = task.value;
  const [text, setText] = useState('');
  const [sent, setSent] = useState(false);
  const local = useRef(new Drawing());
  const left = useSecondsLeft(tele.deadline);
  const kind = tele.kind;

  // A new step clears the work of the last one.
  useEffect(() => {
    setText('');
    setSent(false);
    local.current = new Drawing();
    localVersion.value++;
  }, [tele.step]);

  const submit = () => {
    if (sent) return;
    setSent(true);
    if (kind === 'draw') send({ t: 'submit', actions: local.current.actions });
    else send({ t: 'submit', text });
  };

  // When time runs out, the work so far goes in as it is.
  useEffect(() => {
    if (left === 0 && !sent) submit();
  });

  const done = view.players.find((p) => p.id === view.you)?.done || sent;
  if (done) {
    const playing = view.players.filter((p) => tele.playing.includes(p.id));
    return (
      <div class="card wait">
        <h2>{t('waitOthers')}</h2>
        <ul class="done-list">
          {playing.map((p) => (
            <li class={p.done ? 'is-done' : ''}>
              <Avatar player={p} size={28} /> {p.name} {p.done ? '✓' : '…'}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  const prompt = current?.step === tele.step ? current.prompt : null;
  return (
    <div class="task">
      {kind === 'write' && (
        <div class="card">
          <h2>{t('write')}</h2>
          <form
            class="task-form"
            onSubmit={(e) => {
              e.preventDefault();
              submit();
            }}
          >
            <input value={text} maxLength={MAX_PHRASE} placeholder={t('writePlaceholder')} aria-label={t('write')} onInput={(e) => setText(e.currentTarget.value)} autofocus />
            <button type="button" class="btn btn-ghost" onClick={() => setText(randomPrompt(lang.value))}>
              {t('idea')}
            </button>
            <button type="submit" class="btn">
              {t('done')}
            </button>
          </form>
        </div>
      )}
      {kind === 'draw' && (
        <>
          <h2 class="task-prompt">
            {t('draw')}: <strong>{prompt?.text || t('skipped')}</strong>
          </h2>
          <Board drawing={local.current} version={localVersion} editable key={tele.step} />
          <button type="button" class="btn btn-big" onClick={submit}>
            {t('done')}
          </button>
        </>
      )}
      {kind === 'describe' && (
        <>
          <h2 class="task-prompt">{t('describe')}</h2>
          {prompt?.actions && !prompt.skipped ? <Picture actions={prompt.actions} key={tele.step} /> : <p class="muted">{t('skipped')}</p>}
          <form
            class="task-form"
            onSubmit={(e) => {
              e.preventDefault();
              submit();
            }}
          >
            <input value={text} maxLength={MAX_PHRASE} placeholder={t('describePlaceholder')} aria-label={t('describe')} onInput={(e) => setText(e.currentTarget.value)} />
            <button type="submit" class="btn">
              {t('done')}
            </button>
          </form>
        </>
      )}
    </div>
  );
}

export function TeleScreen() {
  const view = room.value!;
  const tele = view.tele!;
  return (
    <div class="play play-narrow">
      <header class="play-bar">
        <span class="muted">{t('stepOf', { a: tele.step + 1, b: tele.steps })}</span>
        <strong>{t('telephone')}</strong>
        <Timer deadline={tele.deadline} />
      </header>
      {tele.playing.includes(view.you) ? <Task /> : <p class="card">{t('watching')}</p>}
    </div>
  );
}

export function AlbumScreen() {
  const view = room.value!;
  const a = view.album!;
  const host = view.you === view.hostId;
  const owner = view.players.find((p) => p.id === a.owner);
  const entries = album.value?.chain === a.chain ? album.value.entries : [];
  const end = useRef<HTMLDivElement>(null);
  useEffect(() => end.current?.scrollIntoView({ behavior: 'smooth', block: 'end' }), [entries.length, a.chain]);
  return (
    <div class="play play-narrow">
      <header class="play-bar">
        <span class="muted">
          {a.chain + 1}/{a.chains}
        </span>
        <strong>{t('albumOf', { name: owner?.name ?? '' })}</strong>
        <span />
      </header>
      <ol class="album">
        {entries.map((entry, i) => (
          <Entry entry={entry} index={i} />
        ))}
      </ol>
      <div class="start" ref={end}>
        {a.done ? (
          <>
            {host && (
              <div class="row">
                <button type="button" class="btn btn-big" onClick={() => send({ t: 'start' })}>
                  {t('playAgain')}
                </button>
                <button type="button" class="btn btn-ghost" onClick={() => send({ t: 'lobby' })}>
                  {t('backToLobby')}
                </button>
              </div>
            )}
            <AdSlot />
          </>
        ) : host ? (
          <button type="button" class="btn btn-big" onClick={() => send({ t: 'next' })}>
            {t('next')}
          </button>
        ) : (
          <p class="muted">{t('hostShows')}</p>
        )}
      </div>
    </div>
  );
}

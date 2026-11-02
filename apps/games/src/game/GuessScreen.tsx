import { useCallback, useEffect, useRef } from 'preact/hooks';
import type { Op } from '../shared/canvas.ts';
import { Board } from '../drawing/Board.tsx';
import { Chat } from './Chat.tsx';
import { PlayerList, Timer } from './common.tsx';
import { t } from './i18n.ts';
import { celebrate, stars } from './joy.ts';
import { PictureWord, SpeakButton } from './kids.tsx';
import { drawing, drawingVersion, room, send } from './store.ts';
import { speak } from './voice.ts';

function Hint({ hint }: { hint: string }) {
  return (
    <span class="hint" aria-label={hint.replaceAll('_', '?')}>
      {[...hint].map((ch) =>
        ch === ' ' ? <span class="hint-gap" /> : <span class="hint-cell">{ch === '_' ? '' : ch}</span>,
      )}
      <small class="muted">{[...hint].filter((c) => c !== ' ' && c !== '-').length}</small>
    </span>
  );
}

/** Kids mode: the guesser taps one of 4 pictures. A wrong one greys out. */
function Options({ options, wrong }: { options: string[]; wrong: number[] }) {
  return (
    <section class="options" aria-label={t('tapGuess')}>
      <p class="options-title">{t('tapGuess')}</p>
      <div class="options-grid">
        {options.map((word, index) => (
          <button
            type="button"
            class={`option${wrong.includes(index) ? ' option-wrong' : ''}`}
            disabled={wrong.includes(index)}
            onClick={() => send({ t: 'tap', index })}
          >
            <PictureWord word={word} />
          </button>
        ))}
      </div>
    </section>
  );
}

export function GuessScreen() {
  const view = room.value!;
  const g = view.guess!;
  const me = view.you;
  const kids = view.settings.kids;
  const isDrawer = g.drawerId === me;
  const drawer = view.players.find((p) => p.id === g.drawerId);
  const guessed = view.players.find((p) => p.id === me)?.guessed ?? false;
  const onOps = useCallback((ops: Op[]) => send({ t: 'draw', ops }), []);

  // A right guess gets a chime and confetti, once per turn.
  const wasGuessed = useRef(guessed);
  useEffect(() => {
    if (guessed && !wasGuessed.current) celebrate();
    wasGuessed.current = guessed;
  }, [guessed]);

  // In kids mode the artist hears the word, since a small child can't read it.
  useEffect(() => {
    if (kids && isDrawer && view.phase === 'drawing' && g.word) speak(g.word, view.settings.wordLang);
  }, [kids, isDrawer, view.phase, g.word, view.settings.wordLang]);

  return (
    <div class="play">
      <header class="play-bar">
        <span class="muted">{t('roundOf', { a: g.round, b: g.rounds })}</span>
        <div class="word">
          {view.phase === 'drawing' &&
            (g.word ? (
              <strong class="word-now">
                {isDrawer && <span>{t('youDraw')}</span>}
                <PictureWord word={g.word} />
                {isDrawer && <SpeakButton text={g.word} />}
              </strong>
            ) : kids ? (
              <span>{t('drawingNow', { name: drawer?.name ?? '' })}</span>
            ) : (
              <Hint hint={g.hint} />
            ))}
          {view.phase === 'choosing' && (
            <span>{isDrawer ? t('chooseWord') : t('choosing', { name: drawer?.name ?? '' })}</span>
          )}
          {view.phase === 'turnEnd' && (
            <span>
              {t('theWordWas')} <PictureWord word={g.word ?? ''} />
            </span>
          )}
        </div>
        {view.phase !== 'turnEnd' && <Timer deadline={g.deadline} />}
      </header>
      <div class="play-grid">
        <aside class="play-players card">
          <PlayerList mark={(p) => (p.id === g.drawerId ? '✎' : p.guessed ? '✓' : null)} />
        </aside>
        <div class="stage">
          <Board
            drawing={drawing}
            version={drawingVersion}
            editable={isDrawer && view.phase === 'drawing'}
            onOps={onOps}
            simple={kids}
          />
          {view.phase === 'choosing' && isDrawer && g.choices && (
            <div class="overlay">
              <h2>{t('chooseWord')}</h2>
              <div class="choices">
                {g.choices.map((word, index) => (
                  <div class="choice">
                    <button type="button" class="btn btn-big" onClick={() => send({ t: 'pick', index })}>
                      <PictureWord word={word} />
                    </button>
                    <SpeakButton text={word} />
                  </div>
                ))}
              </div>
            </div>
          )}
          {view.phase === 'turnEnd' && (
            <div class="overlay overlay-low">
              <h2>
                {t('theWordWas')} <PictureWord word={g.word ?? ''} />
              </h2>
              {g.gains && Object.keys(g.gains).length ? (
                <ul class="gains">
                  {view.players
                    .filter((p) => g.gains![p.id])
                    .toSorted((a, b) => g.gains![b.id] - g.gains![a.id])
                    .map((p) => (
                      <li>
                        {p.avatar} {p.name} <b>{kids ? stars(g.gains![p.id]) : `+${g.gains![p.id]}`}</b>
                      </li>
                    ))}
                </ul>
              ) : (
                <p>{t('nobodyGuessed')}</p>
              )}
            </div>
          )}
          {view.phase === 'drawing' && g.options && <Options options={g.options} wrong={g.wrong ?? []} />}
          {view.phase === 'drawing' && guessed && !isDrawer && <p class="got-it">🎉 {t('youGotIt')}</p>}
        </div>
        <Chat placeholder={isDrawer || guessed || view.phase !== 'drawing' ? t('say') : t('guessHere')} />
      </div>
    </div>
  );
}

import { useCallback } from 'preact/hooks';
import type { Op } from '../shared/canvas.ts';
import { Board } from '../drawing/Board.tsx';
import { Chat } from './Chat.tsx';
import { PlayerList, Timer } from './common.tsx';
import { t } from './i18n.ts';
import { drawing, drawingVersion, room, send } from './store.ts';

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

export function GuessScreen() {
  const view = room.value!;
  const g = view.guess!;
  const me = view.you;
  const isDrawer = g.drawerId === me;
  const drawer = view.players.find((p) => p.id === g.drawerId);
  const guessed = view.players.find((p) => p.id === me)?.guessed ?? false;
  const onOps = useCallback((ops: Op[]) => send({ t: 'draw', ops }), []);

  return (
    <div class="play">
      <header class="play-bar">
        <span class="muted">{t('roundOf', { a: g.round, b: g.rounds })}</span>
        <div class="word">
          {view.phase === 'drawing' &&
            (g.word ? <strong>{isDrawer ? `${t('youDraw')} ${g.word}` : g.word}</strong> : <Hint hint={g.hint} />)}
          {view.phase === 'choosing' && (
            <span>{isDrawer ? t('chooseWord') : t('choosing', { name: drawer?.name ?? '' })}</span>
          )}
          {view.phase === 'turnEnd' && (
            <span>
              {t('theWordWas')} <strong>{g.word}</strong>
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
          />
          {view.phase === 'choosing' && isDrawer && g.choices && (
            <div class="overlay">
              <h2>{t('chooseWord')}</h2>
              <div class="choices">
                {g.choices.map((word, index) => (
                  <button type="button" class="btn btn-big" onClick={() => send({ t: 'pick', index })}>
                    {word}
                  </button>
                ))}
              </div>
              <Timer deadline={g.deadline} />
            </div>
          )}
          {view.phase === 'turnEnd' && (
            <div class="overlay">
              <h2>
                {t('theWordWas')} <strong>{g.word}</strong>
              </h2>
              {g.gains && Object.keys(g.gains).length ? (
                <ul class="gains">
                  {view.players
                    .filter((p) => g.gains![p.id])
                    .toSorted((a, b) => g.gains![b.id] - g.gains![a.id])
                    .map((p) => (
                      <li>
                        {p.name} <b>+{g.gains![p.id]}</b>
                      </li>
                    ))}
                </ul>
              ) : (
                <p>{t('nobodyGuessed')}</p>
              )}
            </div>
          )}
        </div>
        <Chat placeholder={isDrawer || guessed || view.phase !== 'drawing' ? t('say') : t('guessHere')} />
      </div>
    </div>
  );
}

import { AdSlot, Avatar } from './common.tsx';
import { DuelScreen } from './DuelScreen.tsx';
import { t } from './i18n.ts';
import { room, send } from './store.ts';

export function Results() {
  const view = room.value!;
  const host = view.you === view.hostId;
  const d = view.duel;
  const ranked = view.players.toSorted((a, b) => b.score - a.score);
  const winner = d ? (d.score.red === d.score.blue ? null : d.score.red > d.score.blue ? 'red' : 'blue') : null;
  return (
    <div class="play play-narrow">
      <section class="card results">
        <h1>{t('results')}</h1>
        {d ? (
          <p class={`big team-text-${winner ?? 'none'}`}>{winner ? t('teamWins', { team: t(winner) }) : t('tie')}</p>
        ) : (
          <ol class="podium">
            {ranked.map((p, i) => (
              <li class={i === 0 ? 'first' : ''}>
                <span class="place">{i + 1}</span>
                <Avatar player={p} />
                <span class="player-name">{p.name}</span>
                <b>{t('points', { n: p.score })}</b>
              </li>
            ))}
          </ol>
        )}
        {host ? (
          <div class="row">
            <button type="button" class="btn btn-big" onClick={() => send({ t: 'start' })}>
              {t('playAgain')}
            </button>
            <button type="button" class="btn btn-ghost" onClick={() => send({ t: 'lobby' })}>
              {t('backToLobby')}
            </button>
          </div>
        ) : (
          <p class="muted">{t('waitHost')}</p>
        )}
      </section>
      {d && <DuelScreen />}
      <AdSlot />
    </div>
  );
}

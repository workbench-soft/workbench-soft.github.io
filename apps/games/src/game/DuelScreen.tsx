import { useEffect, useState } from 'preact/hooks';
import { TEAMS, type Team } from '../shared/protocol.ts';
import { Avatar, Timer } from './common.tsx';
import { t } from './i18n.ts';
import { clueError, room, send } from './store.ts';

export function DuelScreen() {
  const view = room.value!;
  const d = view.duel!;
  const me = view.players.find((p) => p.id === view.you);
  const team = me?.team ?? null;
  const giver = team !== null && d.givers[team] === view.you;
  const reveal = d.stage === 'reveal' || view.phase === 'gameEnd';
  const [clue, setClue] = useState('');
  const [bad, setBad] = useState(false);

  const errors = clueError.value;
  useEffect(() => setClue(''), [d.round]);
  useEffect(() => setBad(errors > 0), [errors]);

  const ownTargets = team ? (d.targets[team] ?? []) : [];
  const ownPicks = team ? (d.picks[team] ?? []) : [];
  const canPick = d.stage === 'guess' && team !== null && !giver && !d.locked[team];

  const cardClass = (i: number) => {
    const c = ['duel-card'];
    if (reveal) {
      for (const tm of TEAMS) if (d.targets[tm]?.includes(i)) c.push(`target-${tm}`);
      for (const tm of TEAMS) if (d.picks[tm]?.includes(i)) c.push(`picked-${tm}`);
    } else {
      if (giver && ownTargets.includes(i)) c.push(`target-${team}`);
      if (ownPicks.includes(i)) c.push(`picked-${team}`);
    }
    return c.join(' ');
  };

  const teamBox = (tm: Team) => {
    const members = view.players.filter((p) => p.team === tm && p.online);
    const clueText = d.clues[tm];
    return (
      <section class={`team team-${tm}`}>
        <h3>
          {t(tm)} <b class="team-score">{d.score[tm]}</b>
        </h3>
        <p class="clue">
          {clueText === null ? (
            <span class="muted">{d.stage === 'clue' ? t('thinking') : ''}</span>
          ) : clueText ? (
            <strong>{clueText}</strong>
          ) : (
            <span class="muted">{t('noClue')}</span>
          )}
          {d.locked[tm] && d.stage === 'guess' && <small class="tag">{t('locked')}</small>}
        </p>
        <ul>
          {members.map((p) => (
            <li>
              <Avatar player={p} size={22} /> {p.name}
              {d.givers[tm] === p.id && <small class="tag">{t('clueGiver')}</small>}
            </li>
          ))}
        </ul>
      </section>
    );
  };

  return (
    <div class="play">
      <header class="play-bar">
        <span class="muted">{t('roundOf', { a: d.round, b: d.rounds })}</span>
        <strong>{t('duel')}</strong>
        {view.phase === 'duel' ? <Timer deadline={d.deadline} /> : <span />}
      </header>
      <div class="duel">
        {teamBox('red')}
        <div class="duel-center">
          <div class="duel-board">
            {d.board.map((word, i) => (
              <button
                type="button"
                class={cardClass(i)}
                disabled={!canPick}
                aria-pressed={ownPicks.includes(i)}
                onClick={() => send({ t: 'toggle', index: i })}
              >
                {word}
              </button>
            ))}
          </div>
          {view.phase === 'duel' && d.stage === 'clue' && giver && d.clues[team!] === null && (
            <form
              class="task-form"
              onSubmit={(e) => {
                e.preventDefault();
                setBad(false);
                send({ t: 'clue', text: clue });
              }}
            >
              <p class="muted">{t('yourWords')}</p>
              <input
                value={clue}
                maxLength={24}
                placeholder={t('clueInput')}
                aria-label={t('clueInput')}
                onInput={(e) => setClue(e.currentTarget.value)}
                autofocus
              />
              <button type="submit" class="btn">
                {t('send')}
              </button>
              {bad && <p class="error">{t('clueBad')}</p>}
            </form>
          )}
          {view.phase === 'duel' && d.stage === 'clue' && !(giver && d.clues[team!] === null) && (
            <p class="muted center">{t('waitClues')}</p>
          )}
          {d.stage === 'guess' && canPick && (
            <div class="row center">
              <p class="muted">{t('pickTwo')}</p>
              <button type="button" class="btn" disabled={ownPicks.length !== 2} onClick={() => send({ t: 'lock' })}>
                {t('lock')}
              </button>
            </div>
          )}
          {d.stage === 'guess' && giver && <p class="muted center">{t('giverWaits')}</p>}
          {reveal && d.gains && <p class="center">{t('roundPoints', { r: d.gains.red, b: d.gains.blue })}</p>}
        </div>
        {teamBox('blue')}
      </div>
    </div>
  );
}

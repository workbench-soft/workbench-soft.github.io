import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'Hvert alias er et bash-skript i ett git-repo. En include i git-oppsettet peker på klonen, så en pull oppdaterer hvert alias på maskinen.',
  parts: [
    { name: 'bash-skript', role: 'ett skript per alias, kjørt av bash som følger med git på macOS, Linux og Windows.' },
    { name: 'Include i git-oppsettet', role: 'kobler hvert aliasnavn til skriptet sitt og peker git på klonen.' },
    { name: 'fzf', role: 'menyen med uskarpt søk for å velge grener og worktrees.' },
    { name: 'zsh- og PowerShell-funksjoner', role: 'gjør mappelinjen fra grenbyttet om til et ekte mappebytte.' },
    {
      name: 'Installasjonsskript',
      role: 'ett for macOS og Linux og ett for Windows. De setter opp git, skallet og hooken.',
    },
    { name: 'shellcheck og shfmt', role: 'sjekker hvert skript i commit-hooken og i CI.' },
    {
      name: 'GitHub Actions',
      role: 'kjører lint og tester på Linux og Windows, og tagger så hver grønn push til main.',
    },
  ],
  flow: [
    'Personen skriver en kort kommando, som git co.',
    'Git finner aliaset i det inkluderte oppsettet og kjører skriptet.',
    'Skriptet kaller git, og fzf når noe skal velges.',
    'En skallfunksjon gjør en mappelinje om til et mappebytte.',
    'Resultatet vises i terminalen, og repoet endres gjennom git.',
  ],
  links: [{ to: 'GitHub', text: 'Huser repoet, kjører sjekkene og publiserer de daterte utgivelsene.' }],
  features: {
    Aliases:
      'En oppsettfil kobler hvert aliasnavn til et bash-skript i klonen. git a leser kommentaren øverst i hvert skript og skriver ut listen.',
    'Switch branch folders':
      'git sb viser de lokale grenene i fzf, med worktrees. Skriptet skriver ut stien, og en zsh- eller PowerShell-funksjon flytter skallet og VS Code-vinduet dit.',
    'Delete branches and worktrees':
      'git db velger dem i fzf, og git dbm finner grener der den eksterne grenen er borte. En felles hjelper sletter hver worktree med grenen og spør før den tvinger en med endringer.',
    Installer:
      'Et skallskript for macOS og Linux og et PowerShell-skript for Windows skriver include inn i git-oppsettet. Hver fil de endrer får først en datert kopi.',
    'Lint hook':
      'Installasjonen peker git-hooks til en mappe i repoet. Hver commit der kjører shellcheck, shfmt og repoets regler, deretter oxfmt og markdownlint på de stagede filene.',
    'Reset to the default branch':
      'Skriptet leser standardgrenen fra HEAD på remote, henter og tilbakestiller hardt til den. Det spør først når lokale endringer eller upushede commits ville gå tapt.',
    Releases:
      'En GitHub Actions-arbeidsflyt starter når lint går gjennom på main. Den velger neste datoversjon og skriver notatene fra commitene siden forrige tag.',
  },
};

export default arch;

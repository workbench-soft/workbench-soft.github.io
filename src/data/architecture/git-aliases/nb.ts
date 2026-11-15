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
  design: {
    scale: [
      'Én utvikler på noen få maskiner, uten server. Hvert alias er ett bash-skript i bin/.',
      'Lasten er noen få git-kall per alias, så git og repoet setter grensene, ikke skriptene.',
    ],
    data: [
      'Aliasene har ingen egen tilstand. De leser og endrer repoet gjennom git.',
      'Installasjonsprogrammene skriver gitaliases.dir og include.path til brukerens git-konfig, og en funksjon til zsh- eller PowerShell-profilen.',
      'aliases.gitconfig knytter hvert aliasnavn til skriptet i klonen.',
    ],
    interfaces: [
      'Git kjører et alias som en barneprosess, så et skript får argumenter og skriver til terminalen.',
      'git sb skriver en __cd__-linje med en sti til stdout, og en zsh- eller PowerShell-funksjon gjør den til en cd.',
      'fzf tegner utvalget, og skriptene laster hjelperne _shared.sh og _prune.sh.',
    ],
    reliability: [
      'Hvert skript kjører med set -euo pipefail, så et mislykket git-kall stopper aliaset.',
      'Sletting av grener og worktrees hopper over hovedworktreet, den gjeldende mappa og låste worktrees.',
      'Esc i utvalget avslutter aliaset uten å slette noe.',
    ],
    security: [
      'Den eneste eksterne tjenesten er git-remoten. Skriptene lagrer ingen token og kaller ingen API.',
      'Installasjonsprogrammene spør før hver endring og kopierer hver fil de endrer først.',
      'Slettealiasene lister kandidatene og fjerner bare det personen velger.',
    ],
    performance: [
      'Hvert alias er én bash-prosess med noen få git-kall, og en pull oppdaterer alle.',
      'Opprydningslistene kommer fra ett for-each-ref-kall og worktree-lista, og one_line bruker printf -v fordi en kommandosubstitusjon per worktree koster en fork.',
    ],
    operations: [
      'lint.sh kjører shellcheck og shfmt og sjekker at hvert alias har et skript, en beskrivelse og en README-rad. test.sh kjører aliasene på prøverepoer.',
      'En pre-commit- og en pre-push-hook kjører mise run lint, og lint.yml kjører den på Linux- og Windows-runnere.',
      'Hvert grønne push til main får en datert utgivelse som v2026.10.30.1.',
    ],
    tradeoffs: [
      'Ett bash-skript per alias i stedet for innebygde !-alias eller shell-funksjoner, så shellcheck og tester dekker det, mot en fil per alias.',
      'Bash i stedet for TypeScript eller Rust, fordi git har bash med på hvert system og ingen maskin trenger Node.',
      'En include som peker på klonen i stedet for kopierte alias, så en git pull oppdaterer dem. Å flytte klonen ødelegger dem.',
      'To installasjonsprogrammer i stedet for ett, fordi bare PowerShell må få profilen endret, mot to kopier som må holdes i takt.',
    ],
  },
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

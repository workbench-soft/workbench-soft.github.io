import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'En Node-server på PC-en serverer en nettside til et Edge-appvindu. Serveren leser repoer og kjøringer og åpner en konsoll med en kodeagent for hver oppgave.',
  parts: [
    { name: 'Node 24', role: 'kjører serveren som TypeScript, uten pakker og uten byggesteg.' },
    { name: 'Nettside', role: 'én modul per fane, vist i et Edge-appvindu på PC-en.' },
    { name: 'Kodeagenter', role: 'Claude Code, Codex eller Kimi Code, kjørt i en konsoll per oppgave.' },
    { name: 'adb', role: 'installerer og åpner appene på en tilkoblet telefon eller TV.' },
    { name: 'JSON-datafiler', role: 'repoene, appene og agentoppgavene som Archon lister.' },
    { name: 'Tailscale', role: 'publiserer Archon i tailnettet så telefonen kan åpne det.' },
    { name: 'PowerShell-skript', role: 'gjenoppretter en PC og flytter arbeidsområdet til en ny mappe.' },
    { name: 'Sider i ramme', role: 'CI-statussiden, Reddit Desk og Memories-indekseringen vist i faner.' },
  ],
  flow: [
    'Personen krysser av repoer og velger en oppgave, eller sier en kommando.',
    'Siden sender valget til den lokale serveren.',
    'Serveren skriver en batchfil og åpner en konsoll med agenten.',
    'Agenten jobber i repoet og skriver et sluttmerke.',
    'Hvert 5. sekund spør siden etter kjøringene og viser fremdriften.',
  ],
  links: [
    { to: 'local-ci', text: 'CI-fanen viser statussiden derfra i en ramme og starter den når den er av.' },
    { to: 'reddit-desk', text: 'Reddit-fanen viser appvinduet i en ramme over lokal HTTP.' },
    { to: 'memories', text: 'Memories-fanen viser fremdriften til fotoindekseringen derfra.' },
    { to: 'songfactory', text: 'Songs-fanen kjører flisene i samlebåndet derfra og viser hver kjøring.' },
    {
      to: 'agent-skills-private',
      text: 'Reglene og ferdighetene derfra bestemmer hvordan hver agent Archon starter, leverer en endring.',
    },
  ],
  design: {
    scale: [
      'PC-en til én utvikler, noen titalls repoer og 5 til 10 agenter samtidig.',
      'Kjøreregisteret beholder de siste 200 kjøringene, og resten er små JSON-lister, så det trengs ingen database.',
    ],
    data: [
      'JSON-lister navngir repoene, appene og agentoppgavene som Archon viser.',
      'runs.json i den lokale appdatamappen holder hver kjøring med start, slutt og resultat.',
      'Hvert repos TODO.md og agentenes øktfiler leses på stedet, og Archon har ingen kopi.',
    ],
    interfaces: [
      'server.ts knytter hver sti til én funksjon: lesinger svarer på GET med JSON, og handlinger svarer på POST med en tekstlinje.',
      'En konsollkjøring ender med en markør, done eller failed, som registeret leser.',
      'Andre verktøy ligger bak adb, git, GitHubs utgivelses-API og registrene npm, crates.io og PyPI. Noen faner rammer inn lokale sider over HTTP.',
    ],
    reliability: [
      'Serveren går til utlogging, så kjøringer og oppdateringer fortsetter med alle vinduer lukket.',
      'En ny start finner porten tatt og åpner ett vindu til på samme server.',
      'Siden starter på egne kataloger, så fanknappene virker uten nett, og en fane som ikke lastet, prøver igjen ved neste klikk.',
    ],
    security: [
      'Serveren lytter bare på loopback, og telefonen når den gjennom Tailscale i tailnettet.',
      'En handling trenger innholdstypen JSON, så en side på et annet nettsted kan ikke poste uten preflight, som serveren ikke svarer på.',
      'Ask Archon når ikke sletting av grener eller nøkkelrotasjon. Fanen Keys viser alderen til hver hemmelighet, ikke verdien.',
    ],
    performance: [
      'Siden henter kjøringene hvert 5. sekund fra små filer, så det trengs ingen push-kanal.',
      'Gjenstående tid for en kjøring er medianen av tidligere ferdige kjøringer av samme slag.',
      'Repo-synkronisering og pakkeskanning tar 8 repoer om gangen.',
    ],
    operations: [
      'Hvert 2. minutt henter oppdateringen main og installerer nyere skrivebordsbygg. Ny Archon-kode starter serveren på nytt og laster siden på nytt.',
      'En skjult snarvei i oppstartsmappen starter serveren ved innlogging, uten vindu.',
      'mise run test sjekker at den engelske og den russiske katalogen har de samme nøklene, og kjører så Nodes testløper.',
    ],
    tradeoffs: [
      'En lokal nettside i stedet for Tauri, siden den kjører på Node alene og kan åpnes på telefonen. Den trenger Edge til appvinduet og talen.',
      'Ingen pakker og ingen byggtrinn, så git pull er hele utrullingen. Rutingen er skrevet for hånd.',
      'En synlig konsoll per agentkjøring i stedet for hodeløse kjøringer, så personen kan se på og svare på spørsmål.',
    ],
  },
  features: {
    'Ask Archon':
      'Edge gjør tale om til tekst. Claude Code på Haiku velger så én handling i startprogrammet, og serveren kjører den og åpner fanen.',
    'Runs strip':
      'Serveren fører et register over kjøringer og leser sluttmerket til hver. Tiden som er igjen, er medianen av tidligere kjøringer av samme slag.',
    Apps: 'Kortene kommer fra en JSON-liste og de nyeste byggene i release-repoet til studioet. adb installerer og åpner dem på telefonen eller TV-en.',
    'Ads on this phone':
      'Et skript sender hver studioapp en opplåsingslenke gjennom adb. En nøkkel som stemmer, merker telefonen i lagringen til appen og setter annonsebryteren.',
    'To do':
      'Serveren leser de åpne punktene i hver TODO.md-fil. Avkryssede punkter går til en agentkonsoll i repoet sitt.',
    Sessions:
      'Serveren leser øktfilene til Claude-appen og øktene i Codex og Kimi Code. Å fortsette åpner en konsoll med øktens egen agent.',
    Agents:
      'Repoene med formålet kommer fra én JSON-liste, og oppgavene fra en annen. Hvert avkrysset repo får en konsoll med agenten på oppgaven.',
    Docs: 'Serveren serverer Markdown fra hvert repo. Siden tegner teksten med marked og diagrammene med mermaid.',
    Rules:
      'Serveren leser de felles regelfilene og AGENTS.md i hvert repo. Den sjekker hvert repo for filene og oppgavene konvensjonene krever.',
    Branches:
      'git lister grener, worktrees og stashes i hvert repo med PR-ene deres. Slettinger kjøres i git, og flettinger går til en agent.',
    Packages:
      'Serveren går gjennom pakkefilene i hvert repo og spør npm, crates.io eller PyPI etter nyeste stabile versjon. En oppdatering går til en agentkonsoll per repo.',
    'CI, Reddit and Memories':
      'Hver fane viser en side i en ramme som et annet lokalt program serverer. Start kjører programmet mens siden er av.',
    Songs:
      'Serveren leser temaene i songfactory og kjører hver flis som en barneprosess. Stegene og loggen leser den fra utdataene til prosessen.',
    Voices:
      'Fanen lister edge-tts-stemmene og spiller av én. Use for the agents kjører installasjonsskriptet for turn-voice-kroken på nytt med valgene.',
    Keys: 'Skriptet rotate-secrets lister hver CI-hemmelighet med alderen. En fornyelse åpner en konsoll der Claude Code kjører ferdigheten rotate-secrets.',
    'Archon on the phone':
      'Tailscale serve publiserer den lokale serveren i tailnettet. Telefonen legger siden på startskjermen som en app.',
    'Restore a PC':
      'Et PowerShell-skript henter tilbake hvert element en JSON-liste nevner. En sjekkoppgave feiler på et element PC-en har og listen mangler.',
    'Move the workspace':
      'Et PowerShell-skript kjører fra en midlertidig kopi og flytter mappen. Så retter det hvert sted som nevner den gamle stien, fra worktree-lenker til planlagte oppgaver.',
    'Sync the repos':
      'Et Node-skript kloner hvert repo fra JSON-listen som mappen mangler. Resten henter det med git, 8 om gangen.',
  },
};

export default arch;

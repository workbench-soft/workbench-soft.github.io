import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'Ett bash-skript kjører på Macen, startet hvert 3. minutt av en launchd-agent. Det leser GitHub gjennom gh CLI og viser hver ny hendelse i Varslingssenter.',
  parts: [
    {
      name: 'launchd-agent',
      role: 'starter skriptet hvert 180. sekund og tar igjen tapte kjøringer når Macen våkner.',
    },
    {
      name: 'bash-skript',
      role: 'søker etter PR-er, leser vurderinger og kommentarer, filtrerer dem og sender varslene.',
    },
    {
      name: 'GitHub CLI',
      role: 'gjør hvert GitHub-kall med innloggingen gh allerede har, så verktøyet lagrer ingen token.',
    },
    { name: 'jq', role: 'leser JSON-svarene fra GitHub.' },
    { name: 'terminal-notifier', role: 'viser varselet og åpner kommentaren ved klikk, med osascript som reserve.' },
    {
      name: 'Hurtigbufferfiler',
      role: 'enkle filer i brukerens hurtigbuffermappe holder viste hendelser og siste oppdatering for hver PR.',
    },
  ],
  flow: [
    'launchd starter skriptet, og en lås stopper en ny kjøring.',
    'gh søker etter dine åpne PR-er oppdatert de siste 3 dagene.',
    'Skriptet leser vurderinger og kommentarer bare på endrede PR-er.',
    'Hendelser som står i listen over viste faller bort.',
    'terminal-notifier viser resten, og et klikk åpner kommentaren.',
  ],
  links: [
    { to: 'GitHub', text: 'Kilden til hver PR, vurdering og kommentar, lest gjennom gh CLI.' },
    { to: 'Homebrew', text: 'Installerer jq og terminal-notifier ved installasjonen.' },
  ],
  features: {
    'Review and comment notifications':
      'gh søker etter åpne PR-er du skrev, vurderte eller deltok i, og leser vurderinger og kommentarer på hver endret PR. Hver ny hendelse blir et varsel.',
    'Review requests':
      'Et oppslag hos GitHub beholder forespørslene med navnet ditt og dropper dem til et team. Et mislykket oppslag holdes utenfor hurtigbufferen, så neste kjøring spør igjen.',
    'Comment bursts':
      'Før varselet teller skriptet nye kommentarer per PR. Flere enn 4 blir 1 varsel med antall og navn, og et klikk åpner PR-en.',
    'Quiet first run':
      'Uten hurtigbuffer skriver skriptet hendelsene fra de siste 3 dagene til listen over viste og viser ingen. En mislykket første kjøring lar hurtigbufferen stå tom, og neste kjøring starter på nytt.',
    'Bot filter':
      'Skriptet dropper kommentarer fra bot-kontoer før det sammenligner hendelser. En innstilling gitt ved installasjonen havner i launchd-agenten og slår dem på igjen.',
    'Status and test':
      'Ett flagg skriver ut agentens tilstand, kontoen, siste kjøring og innstillingene. Et annet sender et testvarsel samme vei.',
    Releases:
      'En GitHub Actions-arbeidsflyt tagger hver push til main som består shellcheck, med en datoversjon. Notatene viser commitene siden forrige utgivelse.',
  },
};

export default arch;

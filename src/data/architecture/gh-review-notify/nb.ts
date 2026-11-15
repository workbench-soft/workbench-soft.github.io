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
  design: {
    scale: [
      'Én person på én Mac. Søket dekker åpne PR-er som er oppdatert de siste 3 dagene.',
      'En kjøring etter den første tar under 10 sekunder, siden bare PR-er der updatedAt har flyttet seg åpnes på nytt.',
      'Verktøyet er én bash-fil på under 400 linjer.',
    ],
    data: [
      'Flate filer i brukerens hurtigbuffermappe: seen.txt, pr-updated.tsv, review-requests.tsv og en låsemappe.',
      'seen.txt holder de siste 3000 hendelsesnøklene. En nøkkel er URL-en til vurderingen eller kommentaren.',
      'Mappa kan bare leses av kontoen, siden den lister URL-ene til private PR-er.',
    ],
    interfaces: [
      'gh search prs og gh api leser GitHub, og jq leser JSON-svarene.',
      'terminal-notifier viser hvert varsel og åpner kommentaren ved et klikk, med osascript som reserve.',
      'launchd starter agenten hvert 180. sekund. GH_REVIEW_NOTIFY_INTERVAL og GH_REVIEW_NOTIFY_BOTS endrer intervallet og botfilteret.',
    ],
    reliability: [
      'En låsemappe får en andre kjøring til å avslutte med en gang.',
      'Et mislykket PR-søk stopper kjøringen før noen bufferfil endres, og et mislykket oppslag av vurderingsforespørsler holdes utenfor bufferen, så neste kjøring spør på nytt.',
      'En hendelse vises opptil 3 minutter for sent, og bare mens Macen er våken. launchd tar igjen etter oppvåkning.',
    ],
    security: [
      'Den bruker innloggingen fra gh auth, så verktøyet lagrer ingen token.',
      'Bufferfilene kan bare leses av kontoen.',
      'Den poller github.com fra Macen, så ingen webhook og ingen offentlig adresse når maskinen.',
    ],
    performance: [
      'Vurderinger og kommentarer leses bare for PR-er der updatedAt har flyttet seg, eller for hver PR ved en seed.',
      'Teamforespørsler om vurdering droppes, og mer enn 4 kommentarer på én PR foldes til 1 varsel.',
      'grep og awk sjekker hver hendelsesnøkkel mot seen.txt, uten database.',
    ],
    operations: [
      'install.sh kopierer skriptet til den lokale bin-mappa, skriver plist-filen og laster agenten. uninstall.sh gjør det motsatte.',
      'tests/run.sh kjører skriptet på ferdige GitHub-svar, med stubber for gh, date og terminal-notifier.',
      'Kontrollene kjører på en macOS-runner hos GitHub, og hvert grønne push får en datert utgivelse. Installasjonen henter siste main.',
    ],
    tradeoffs: [
      'Polling hvert 3. minutt i stedet for e-post, Slack-appen eller webhooks, så ingen server og ingen offentlig adresse, mot en forsinkelse på opptil 3 minutter.',
      'gh-CLI i stedet for curl med token, så ingen token å lagre. Verktøyet stopper når gh mister innloggingen.',
      'Én bash-fil i stedet for TypeScript eller Rust, så den kopieres inn uten bygg, og testene trenger stubber.',
      'Flate filer i stedet for SQLite, så bash bare trenger grep og awk. Et nytt format tar et nytt filnavn.',
    ],
  },
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

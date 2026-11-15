import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'Enkle skills i Markdown og noen få skript, uten server og uten bygg. Et installasjonsprogram lenker én klon inn i hver kodeagent på maskinen, og CI sjekker skillene før hver utgivelse.',
  parts: [
    {
      name: 'Agent Skills-formatet',
      role: 'hver skill er én Markdown-mappe som en agent laster når en forespørsel passer.',
    },
    {
      name: 'Installasjon i POSIX shell',
      role: 'lenker klonen inn i Claude Code, Codex, Kimi Code og andre agenter, med en PowerShell-innpakning for Windows.',
    },
    { name: 'Git hooks', role: 'lenker skillene på nytt etter en pull, en merge eller en checkout.' },
    { name: 'Node-skript', role: 'fletter agenthookene inn i innstillingene til hver agent og kopierer MCP-serverne.' },
    {
      name: 'turn-voice-hooken',
      role: 'en C#-spiller på Windows og en Node-tvilling på Mac som sier slutten på en tur.',
    },
    { name: 'Sjekker i Python og TypeScript', role: 'sjekker skillformatet, nøkkelordene og lengden på hver skill.' },
    { name: 'GitHub Actions', role: 'kjører sjekkene på Windows og Linux, og lager så en datert utgivelse.' },
  ],
  flow: [
    'En person kloner repoet og kjører installasjonen.',
    'Installasjonen lenker hver skillmappe inn i hver agent den finner.',
    'Agenten leser beskrivelsen av hver skill ved starten av en økt.',
    'En forespørsel som passer laster hele skillen, og agenten følger stegene.',
    'På slutten av turen sier stemmehooken utfallet.',
  ],
  links: [
    { to: 'agent-skills-private', text: 'Eierens private regler og skills ligger der, ved siden av disse åpne.' },
    { to: 'Claude Code', text: 'Installasjonen lenker skillene og fletter hookene inn i innstillingene.' },
    { to: 'Codex', text: 'De samme skillene, hookene og en kopi av MCP-serverne fra Claude Code.' },
    { to: 'GitHub', text: 'Sjekkene og de daterte utgivelsene kjører på GitHub Actions.' },
  ],
  design: {
    scale: [
      'Én person per maskin, 33 skills og så mange agenter som helst som leser Agent Skills-formatet.',
      'Hver økt laster beskrivelsen av hver skill, så en beskrivelse holder seg under 480 tegn og en skill-tekst under 300 linjer.',
    ],
    data: [
      'Ingen database. En skill er en mappe med en SKILL.md og front matter, pluss referansefiler som lastes ved behov.',
      'Hook-grupper ligger i JSON-filer, og turn-voice-hooken holder bufrede stemmeklipp i en lokal mappe.',
    ],
    interfaces: [
      'Avtalen med en agent er front matter: navnet er likt mappen, og beskrivelsen sier når skillen skal lastes.',
      'Installasjonsprogrammet slår hook-grupper inn i innstillingene til Claude Code og Codex, og skriver en merket blokk for Kimi Code.',
      'turn-voice-hooken leser statusmarkøren på siste linje i en tur og sier den passende frasen.',
    ],
    reliability: [
      'Git-hooks i klonen kobler skillene på nytt etter pull, merge, checkout og rebase, så en ny skill dukker opp med en gang.',
      'Sammenslåingen av hooks beholder personens egne hooks. Uten Node hopper installasjonen over hooks og sier fra.',
      'Mislykkes stemmehentingen, blir bare lydsignalet igjen, og et bufret klipp spilles uten nett.',
    ],
    security: [
      'Repoet er offentlig og har ingen token. PR-er fra forks kjører på GitHub-runnere, så koden deres holdes unna PC-en.',
      'Nettsted-skillene stopper ved innlogging, CAPTCHA, hemmeligheter og betaling, og overlater dem til personen.',
    ],
    performance: [
      'Bare de korte skrivereglene lastes hver tur. En hel skill lastes når en forespørsel passer til beskrivelsen.',
      'Stemmeklipp bufres, og signalet og stemmen går i ett PlaySound-kall, så det første ordet kommer helt med.',
    ],
    operations: [
      'Check-arbeidsflyten kjører på Windows for PowerShell-installasjonen og på Linux for shell-installasjonen, med mise som låser hvert verktøy.',
      'Release-arbeidsflyten starter på workflow_run når check består på main, og setter en datotagg som v2026.10.30.1.',
      'mise run test sjekker skill-formatet, tekstbudsjettet, enhetstestene og en installasjon og avinstallasjon i en midlertidig hjemmemappe.',
    ],
    tradeoffs: [
      'En Markdown-mappe per skill i stedet for en regelfil per agent, så én kopi tjener rundt 50 agenter. Bare agenten som leser, håndhever en regel.',
      'Én klon lenket inn i hver agent i stedet for en kopi per agent, så en endring når alle med en gang. Windows uten utviklermodus får junctions.',
      'En C#-hook bygget med csc.exe som følger med Windows, så ingen SDK trengs. Den kjører bare på Windows, og en Node-tvilling dekker Mac.',
    ],
  },
  features: {
    'Writing style':
      'En kort regelfil lastes på hver tur gjennom agentens hovedregelfil. Hele skillen lastes før den første teksten, med ordtabeller og en sluttsjekk.',
    'Code review':
      'Skillen review leser PR-en eller diffen og sjekker hvert problem mot koden. Tilbake kommer én tabell med linjen, inndataene som knekker den og rettingen.',
    'Reviewer lenses':
      'Skillen reviewer velger vinklene for en diff eller et repo og starter én underagent per vinkel. En fagvinkel som juss eller SEO laster sin egen skill.',
    'Pull requests':
      'Skillen create-pr skriver teksten og åpner eller oppdaterer PR-en med GitHub CLI. Mermaid-diagrammer viser hver flyt før og etter.',
    'Review comments':
      'Skillen address-comments leser hver åpne tråd gjennom GitHub CLI. Hver retting blir en egen commit, og svaret oppgir SHA-en.',
    'Ticket to merge':
      'Skillen implement-ticket leser Jira gjennom MCP-serveren fra Atlassian eller CLI-en. Planen havner i specs i repoet, og hver commit har saksnøkkelen.',
    'App audit':
      'Skillen app-audit starter vinklene til reviewer, med hver agent i sin egen git-worktree. Hovedagenten samler de trygge rettingene på én gren og fletter PR-en.',
    'Specs first':
      'Skillen specs holder én Markdown-fil per funksjon i repoet. Hver endring legger til en datert oppføring i den første commiten, før koden.',
    'One-pager':
      'Skillen one-pager skriver hele teksten først. Så legger den et sammendrag på én skjerm øverst, som ikke legger til egne fakta.',
    'Commands through mise':
      'Skillen mise kjører hver oppgave med mise run og andre kommandoer med mise x. Et nytt verktøy havner i mise-oppsettet i repoet med fast versjon.',
    Translations:
      'Skillen translations velger i18n-verktøyet for stakken og legger hver tekst inn i hver katalog. En test holder katalogene på de samme nøklene.',
    Worktrees:
      'Skillen git-worktrees lager en mappe ved siden av repoet med de ignorerte filene og avhengighetene. Etter flettingen sjekker et skript PR-en og fjerner mappen og grenene.',
    'Fast JavaScript':
      'Skillen javascript har regler fra React best practices fra Vercel, uten React-delene. Hvert funn oppgir regelen, linjen og kostnaden.',
    Architecture:
      'Skillen architecture skriver utformingen i dokumentasjonen i repoet med diagrammer og én beslutning per valg. Lint eller CI håndhever så lagreglene.',
    Monorepos:
      'Skillen monorepo velger oppgavekjøreren og ett workspace per språk. Ett API-skjema lager en klient per plattform, og CI kjører bare de berørte appene.',
    'History reset':
      'Skillen reset-history lagrer en git-bundle utenfor repoet og bygger så én commit fra hovedgrenen. Den spør én gang og tvangspusher med lease.',
    'Rewrite a repo':
      'Skillen rewrite-repo noterer oppførselen og lager en liste over nye navn for koden og dokumentene. Den ender med én fersk commit i stedet for historikken.',
    'Help on a site':
      'Skillen guide-on-site styrer din egen Chrome gjennom Claude in Chrome. Den fyller inn feltene den kjenner og stopper ved hvert steg bare personen kan ta.',
    'Hung runs':
      'Skillen hung-process finner verktøyet som holder en port eller en lås på Windows. Den avslutter det prosesstreet og kjører steget på nytt, eller gir en kommando som administrator.',
    'Search setup':
      'Skillen seo-setup finner hvor DNS ligger og sjekker den levende siden og repoet. Så setter den opp Search Console, Bing og Cloudflare Web Analytics i nettleseren.',
    Ads: 'Skillen ads-setup går gjennom dashbordene til AdSense og AdMob mens personen er logget inn. Den legger ID-ene inn i koden med testannonser i debug-bygg.',
    'Google Play release':
      'Skillen play-release bygger en signert bundle med ny versjonskode og holder nøkkelen utenfor repoet. Den ruller den ut til intern testing og gir tilbake testerlenken.',
    'Launch in one run':
      'Skillen launch spør om de felles opplysningene én gang. Så kjører den skillene for søk, annonser og Google Play i rekkefølge og ender med en tabell over tjenestene.',
    Marketing:
      'Skillen marketing starter med budsjettet og skriver budskapet og en lanseringskalender. Planen blir liggende i dokumentasjonen i repoet, så neste kjøring tar den opp igjen.',
    'In-app updates':
      'Skillen app-update legger til en sjekk mot GitHub-utgivelser ved oppstart og ved retur. En nedlastingslinje og et varsel følger, og koden holdes utenfor Play-bygget.',
    'Names and domains':
      'Et skript sjekker hvert navn mot 3 domeneendelser og det australske foretaksregisteret. Det sjekker også varemerkene hos IP Australia og trenger ikke API-nøkler.',
    'Legal risks':
      'Et skript skanner lisensene til avhengighetene og data-SDK-ene i repoet. Skillen vurderer hver risiko i et dokument og leverer de trygge rettingene i en PR.',
    'App icons':
      'Agenten tegner 10 flate SVG-ikoner og viser en velger i chatten. Et skript med resvg eksporterer så valget til hver størrelse plattformene trenger.',
    'Demo screenshots':
      'Appen kjører med oppdiktede demodata mens agenten tar skjermbilder og korte videoer. En bildeliste i repoet lar neste kjøring ta de samme bildene.',
    'Store media':
      'Skillen store-media tar skjermbildene og ikonet fra repoet og lager hver størrelse. Den laster dem opp i nettleseren mens personen er logget inn, og spør før en gjennomgang.',
    'End to end walk of a release':
      'Skillen e2e-walk installerer den nyeste utgivelsen på en emulator eller en telefon og går gjennom hver flyt fra dokumentasjonen. Den hopper over hver sletting og holder flytlisten i repoet.',
    'Hear and pick a voice':
      'Et Python-skript henter hver nevrale stemme fra Microsoft gjennom edge-tts og mellomlagrer klippene. Det skriver ut ID-en til hver stemme og fortsetter fra hvilket som helst nummer.',
    'Reddit comments':
      'Skillen henter populære tråder gjennom Reddit-MCP-serveren og beholder dem repoet kan svare på. Playwright skriver utkastet inn i Chrome, og personen trykker Comment.',
    'Voice at the end of a turn':
      'En hook leser markøren på siste linje og velger signalet og frasen. edge-tts sier den gjennom en C#-spiller på Windows og Node på Mac.',
    Install:
      'En installasjon i POSIX shell lenker én klon inn i hver agent den finner, med en PowerShell-innpakning for Windows. Git hooks i klonen lenker skillene på nytt etter hver pull.',
    'Agent hooks':
      'Et Node-skript fletter hookgruppene inn i innstillingene til Claude Code og Codex. Det kopierer også MCP-serverne fra Claude Code til Codex og Kimi Code.',
    Releases:
      'En arbeidsflyt i GitHub Actions starter når sjekkene består på en push til main. Den tagger commiten med en datoversjon og skriver notatene fra commitene.',
  },
};

export default arch;

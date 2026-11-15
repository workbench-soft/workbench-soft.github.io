import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'Oppsettskript i PowerShell og POSIX sh gjør klar en Windows-PC eller en Mac og registrerer den som GitHub Actions-runnere. En Next.js-side på PC-en viser runnerne og kjøringene, og serveren dens fordeler og avbryter jobber.',
  parts: [
    { name: 'Installere i PowerShell og sh', role: 'setter opp utviklerverktøyene med winget eller Homebrew og mise.' },
    {
      name: 'GitHub Actions-runner',
      role: 'tar CI-jobbene til organisasjonen, flere per PC med et eget felt for tunge bygg.',
    },
    {
      name: 'Oppgaveplanlegging i Windows',
      role: 'starter runnerne og siden ved oppstart og kjører oppdateringen hvert 5. minutt.',
    },
    { name: 'Next.js', role: 'den lokale statussiden, der serverhandlinger stopper kjøringer og installerer APK-er.' },
    { name: 'GitHub REST API', role: 'gir siden kjøringer og releaser, hentet med ETag for å spare grensen for kall.' },
    { name: 'adb', role: 'installerer en release-APK på telefonen som er koblet til med USB.' },
    { name: 'Blacksmith og Oracle Cloud', role: 'de gratis skyløperne som tar jobber før PC-en gjør det.' },
    { name: 'SVG-diagrammer', role: 'tegnes på serveren fra 90 dager med kjøringer i en JSON-fil.' },
  ],
  flow: [
    'En push til et repo i organisasjonen setter jobber i kø på GitHub.',
    'Sideserveren peker hvert repo mot en skyløper eller denne PC-en.',
    'En runner tar jobben som passer etikettene dens.',
    'Sideserveren leser kjøringene og stopper de erstattede.',
    'Hvert 15. sekund viser siden jobbene, releasene og grunnene til stopp.',
  ],
  links: [
    { to: 'GitHub Actions', text: 'Maskinene registreres som runnere i organisasjonen, og siden leser API-et.' },
    { to: 'archon', text: 'CI-fanen i Archon viser statussiden i en ramme.' },
    {
      to: 'ci',
      text: 'Jobber som kaller oppsettsteget derfra på denne PC-en, kopierer pakker fra det felles lageret.',
    },
    {
      to: 'agent-skills-private',
      text: 'repo-ci-malene derfra leser runner-variablene og setter reglene for avbrudd.',
    },
    { to: 'Blacksmith', text: 'Skyløpere for lette og tunge jobber så lenge gratisminuttene varer.' },
  ],
  design: {
    scale: [
      'Én PC og én Mac betjener de private repoene til én organisasjon, med 4 runnere som standard på PC-en.',
      'GitHubs grense på 5000 API-kall i timen formet henteintervallet, etter at siden brukte den opp én dag.',
      'Blacksmith gir 3000 gratis minutter i måneden, så ruteren slutter å bruke det ved 2700.',
    ],
    data: [
      'Siden holder 90 dager med ferdige kjøringer i én JSON-fil, og cloud-usage.json teller Blacksmith-minuttene.',
      'Runner-antallet står i en runner-count-fil i hjemmemappen. Ruten står i 3 repo-variabler: CI_RUNNER, CI_HEAVY_RUNNER og CI_WINDOWS_RUNNER.',
    ],
    interfaces: [
      'GitHubs REST-API gir runnere, kjøringer, jobber, fakturering og utgivelser, og siden setter repo-variablene gjennom det.',
      'En jobbs runs-on leser en repo-variabel, med PC-etikettene som reserve, og en runner tar jobben med etiketter som passer.',
      'Serverhandlinger kjører PowerShell og adb, og adb installerer en release-APK på en telefon koblet til med USB.',
    ],
    reliability: [
      'En vakthund starter en runner-oppgave på nytt når runneren vises frakoblet på GitHub i over 10 minutter.',
      'En jobb som har stått i kø hos Blacksmith i 5 minutter, avbrytes og kjøres på nytt på neste runner.',
      'Variablene beholder siste verdi mens PC-en er av, og en variabel som ikke er satt, faller tilbake til PC-etikettene.',
      'En installasjonslås hindrer oppdateringsoppgaven og START.cmd i å kjøre installasjonsprogrammer samtidig.',
    ],
    security: [
      'Runnere starter som personens egen planlagte oppgave og ikke som en tjeneste, så jobbene ser personens gh-innlogging og mise-oppsett.',
      'Runner-nedlastingen sjekkes mot SHA256 før den registreres.',
      'Dette repoet er offentlig, så dets egen CI kjører på GitHub-runnere. En fork-PR på PC-runneren ville kjørt koden sin på PC-en.',
    ],
    performance: [
      'Serveren sender If-None-Match, siden en 304 ikke koster noe av grensen, og deler hvert svar i 20 sekunder mellom faner.',
      'De 2 første runnerne har etiketten heavy, så Gradle-, Cargo- og Tauri-jobber ikke kryper når 8 kjører samtidig.',
      'Dashbordet bygges til mappen som den kjørende siden ikke serverer, så siden stopper bare for byttet.',
    ],
    operations: [
      'Oppdateringsoppgaven kjører hvert 5. minutt og ved pålogging, flytter utsjekkingen til den nyeste utgivelsestaggen og kjører bare om igjen installasjonsprogrammene der filene har flyttet seg.',
      'Release starter etter Checks gjennom workflow_run, og mislykkede Checks avbryter bygget.',
      'Sideserveren stopper hvert 10. sekund kjøringer som en nyere commit har erstattet, og logger årsaken til hver.',
    ],
    tradeoffs: [
      'Egne runnere i stedet for GitHub-drevne, så private repoer koster 0 minutter. CI står når PC-en er av.',
      'Repo-variabler i stedet for en rute-jobb per workflow, som ville lagt til en jobb ekstra i hver kjøring.',
      'En planlagt oppgave i stedet for en Windows-tjeneste, som mangler personens mise og gh-innlogging. Siden kjenner en levende runner på loggfilene.',
      'En Next.js-serverside i stedet for Grafana, med SVG-diagrammer fra egen historikk. De har ikke zoom.',
    ],
  },
  features: {
    'Mac setup':
      'Et POSIX sh-skript installerer Homebrew-verktøy, mise og skalloppsettet. Så setter det git-oppsettet og kloner repoene i organisasjonen. En ny kjøring hopper over det som er på plass.',
    'Windows setup':
      'Et PowerShell-skript installerer de samme verktøyene gjennom winget og mise, med Python og en kompileringsbuffer for Rust. Det hopper over delene som bare er for Mac og det som er på plass.',
    'Self-hosted CI runner':
      'Runner-skriptene laster ned GitHub-runneren, sjekker SHA256 og registrerer 4 runnere på Windows. De 2 første tar jobbene for Gradle, Cargo og Tauri.',
    'Start button':
      'Et dobbeltklikk flytter utsjekken til nyeste release og kjører de endrede installerne på nytt. Så starter det oppgavene for runnerne og siden og åpner siden.',
    'CI status page':
      'En Next.js-server leser runnere, kjøringer og jobber fra GitHub-API-et og runner-mappene på denne PC-en. Fremdriftslinjene kommer fra de 10 siste fullførte kjøringene.',
    'Build cancellation':
      'Concurrency i workflowene avbryter eldre kjøringer på GitHub. Hvert 10. sekund stopper sideserveren også en erstattet kjøring og en release der Checks feilet, og skriver grunnen i en fil.',
    'Cloud runners first':
      'Sideserveren teller gratisminuttene hos Blacksmith og GitHub. Den setter en runner-variabel i hvert privat repo, og uten den faller jobbene tilbake til PC-etikettene.',
    Releases:
      'Serverhandlinger starter release-workflowen til en app eller bygger APK-en fra main i en midlertidig klon. Så installerer adb APK-en på den tilkoblede telefonen.',
    'Updates by themselves':
      'En planlagt oppgave kjører hvert 5. minutt og ved pålogging. Den flytter utsjekken til nyeste release-tagg og kjører bare installerne der filene har endret seg.',
    Sites:
      'En gang i timen leser siden workflowene i hvert repo og finner den som publiserer et nettsted. Knappen starter den på main.',
    'CI trends':
      'Hvert 10. minutt leser sideserveren de fullførte kjøringene og holder 90 dager i en JSON-fil. Diagrammene tegner den som SVG på serveren.',
  },
};

export default arch;

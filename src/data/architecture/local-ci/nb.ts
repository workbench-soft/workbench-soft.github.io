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

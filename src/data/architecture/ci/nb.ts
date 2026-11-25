import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'Et privat GitHub-repo med felles steg som hvert repo i organisasjonen kaller fra sine egne workflows. En sammensatt action setter opp verktøyene, og gjenbrukbare workflows fletter Dependabot-PR-er og bygger for iPhone-simulatoren.',
  parts: [
    {
      name: 'Sammensatt action',
      role: 'oppsettsteget som kjører i jobben til den som kaller, og installerer de låste verktøyene og pakkene.',
    },
    { name: 'mise', role: 'installerer hvert verktøy i versjonen repoet låser.' },
    { name: 'pnpm', role: 'installerer pakkene fra låsefilen og kopierer dem på Windows i stedet for harde lenker.' },
    { name: 'Gjenbrukbare workflows', role: 'Dependabot-flettingen og iOS-simulatorbygget som hvert app-repo kaller.' },
    { name: 'Node-skript', role: 'lister delene av en app som bare finnes for Android og mangler en iOS-plan.' },
    { name: 'macOS-runner og Maestro', role: 'bygger appen for iPhone-simulatoren og kjører testløpene.' },
    { name: 'Release-skript', role: 'shell-skript som velger datotaggen og skriver notatene fra commitene.' },
  ],
  flow: [
    'En workflow i et app-repo kaller et steg herfra på main.',
    'GitHub laster steget fra dette repoet for den kjøringen.',
    'Oppsettsteget installerer de låste verktøyene og så pakkene.',
    'Egne sjekker hos den som kaller følger i samme jobb.',
    'En retting flettet her når hvert repo ved neste kjøring.',
  ],
  links: [
    { to: 'GitHub Actions', text: 'Hvert repo i organisasjonen kaller stegene her fra sine egne workflows.' },
    {
      to: 'local-ci',
      text: 'På PC-runnerne kopierer oppsettsteget pakker fra det felles lageret for å unngå fillåser.',
    },
    { to: 'agent-skills-private', text: 'Release-skriptene følger CI-malene i repo-ci-ferdigheten derfra.' },
    {
      to: 'Dependabot',
      text: 'PR-ene flettes gjennom den felles workflowen, og en større oppdatering venter på et menneske.',
    },
  ],
  design: {
    scale: [
      'Én eier og de titalls app-repoene i én GitHub-organisasjon, som hver kaller de samme få stegene fra sine egne arbeidsflyter.',
      'En rettelse her når hver kaller ved neste kjøring, så én dårlig sammenslåing kan ødelegge alle.',
    ],
    data: [
      'Ingen database. Tilstanden er en datotagg, et format for commit-emner og mise.toml som låser hvert verktøy.',
      'Taggen er v<yyyy.mm.dd>.<n>, og notatene sorterer feat-, fix- og perf-commits fra emner på formen type(scope)!: text.',
    ],
    interfaces: [
      'Oppsettssteget er en sammensatt handling som en kaller kjører med uses, og den kjører i kallerens jobb.',
      'Dependabot-sammenslåingen og iOS-simulatorbyggingen er gjenbrukbare arbeidsflyter som tar imot listen over arbeidsflyter som skal starte på main.',
      'Automatisk sammenslåing går fra pull_request_target, og iOS-sjekken er et Node-skript med bestått eller ikke bestått som resultat.',
    ],
    reliability: [
      'Sammenslåingsjobben kjører bare når dependabot[bot] åpnet PR-en og utløste hendelsen, og den stopper på en PR som er slått sammen eller lukket.',
      'På PC-runnerne kopierer pnpm pakker fra et felles lager, siden en slettet hard lenke fikk andre lesninger til å feile med EBUSY.',
      'Hver jobb får sin egen mise-shim-mappe, så en kjørende prosess som holder den delte uvx.exe ikke blokkerer en verktøyoppdatering.',
    ],
    security: [
      'Repoet er privat, og Actions-tilgangen er satt til organisasjonen slik at kallerne kan laste arbeidsflytene.',
      'pull_request_target kjører fra main med et skrive-token, så bare Dependabots egne PR-er slås sammen, og en hovedoppdatering venter på en person.',
    ],
    performance: [
      'Verktøyinstallasjoner deles mellom jobbene på en runner, og bare den lille shim-mappen bygges på nytt for hver jobb.',
      'pnpm installerer fra låsfilen uten oppslagssteg, og iOS-sjekken kjører først, så en dårlig plan feiler før Mac-minuttene starter.',
    ],
    operations: [
      'Lint kjører ved hver push til main. Release-arbeidsflyten starter på workflow_run etter bestått Lint og setter en datotagg på committen.',
      'En push med bare Markdown hopper over Lint og får derfor ingen release.',
      'mise run test bygger et kastbart git-repo og sjekker de to release-skriptene, og Vitest dekker ios-check.',
    ],
    tradeoffs: [
      'Kallerne bruker @main i stedet for en fast tagg, så én rettelse lander overalt. Et repo som må holde igjen, låser en release-tagg.',
      'En sammensatt handling i stedet for en gjenbrukbar arbeidsflyt til oppsettet, så kallerens egne sjekker følger i samme jobb.',
      'Slå sammen ved åpning og sjekk på main i stedet for å vente på PR-sjekker, siden org-repoene ikke kjører noen på PR-er. En dårlig oppdatering når main først.',
      'En macOS-runner til iPhone-byggingen, siden PC-runnerne er Windows. Ett macOS-minutt teller som 10, så kallerne starter den for hånd eller ved release.',
    ],
  },
  features: {
    'Setup step':
      'En sammensatt action kjører mise for de låste verktøyene, så installerer pnpm fra låsefilen. Den kjører i jobben til den som kaller, så sjekkene derfra følger rett etter.',
    'Dependabot details':
      'Metadata-actionen fra Dependabot leser oppdateringstypen til hver PR. Flettejobben bruker den til å la en større oppdatering vente på et menneske.',
    'Dependabot auto merge':
      'En gjenbrukbar workflow fletter en Dependabot-PR med squash så snart den åpnes og starter så sjekkene på main. Bare en PR som Dependabot selv åpnet og pushet flettes slik.',
    Releases:
      'En release-workflow starter når Lint består på en push til main. To shell-skript velger datotaggen og skriver notatene fra commitene siden forrige tagg.',
    'iOS check and simulator build':
      'Et Node-skript leter etter deler som bare finnes for Android i pakker, native moduler og Gradle-filer. Så bygger en gjenbrukbar workflow på en macOS-runner fra GitHub, og Maestro tar skjermbildene.',
    'Affected step':
      'En sammensatt action sammenligner pushen med siste grønne kjøring på main for sjekker, eller siste utgivelsestagg for en utgivelse. Så kobler den filene til stiene i affected.json.',
  },
};

export default arch;

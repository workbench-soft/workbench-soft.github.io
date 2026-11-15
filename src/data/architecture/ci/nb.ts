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
  },
};

export default arch;

import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'Markdown-ferdigheter og en regelfil som et shell-installasjonsskript kobler inn i Claude Code, Codex og Kimi Code. Hjelpeskript sjekker CI-en, lagrer hemmeligheter og setter opp MCP-porten.',
  parts: [
    { name: 'Markdown-ferdigheter', role: 'stegene for én jobb hver, lastet når en forespørsel nevner den jobben.' },
    { name: 'Regelfil', role: 'arbeidsreglene som lastes i hver tur i hver økt.' },
    {
      name: 'Shell-installasjonsskript',
      role: 'lenker ferdighetene inn i hver agent og kobler regelfilen inn i oppsettet.',
    },
    {
      name: 'GitHub Actions-maler',
      role: 'workflowene Checks og Release og release-porten som repo-ci kopierer inn i et repo.',
    },
    {
      name: 'gh og GraphQL',
      role: 'leser workflows og hemmelighetslister i hvert repo i organisasjonen med ett kall.',
    },
    { name: 'PowerShell-skript', role: 'lagrer en ny hemmelig verdi i GitHub uten at agenten ser den.' },
    { name: 'mcpproxy', role: 'én portserver som står i stedet for 5 MCP-servere.' },
    {
      name: 'Sjekker i Python og TypeScript',
      role: 'sjekker ferdighetene for frontmatter, lenker, nøkkelord og lengde.',
    },
  ],
  flow: [
    'Installasjonsskriptet lenker ferdighetene og kopierer regelfilen inn i hver agent.',
    'En økt laster regelfilen i hver tur.',
    'En forespørsel som passer beskrivelsen til en ferdighet, laster den ferdigheten.',
    'Ferdigheten bruker gh, skript og MCP-verktøy mot GitHub og konsollene.',
    'Agenten leverer endringen og avslutter turen med et statusmerke.',
  ],
  links: [
    {
      to: 'agent-skills',
      text: 'De offentlige ferdighetene installeres først, og disse ferdighetene laster skrivereglene derfra.',
    },
    { to: 'local-ci', text: 'repo-ci-malene bygger på runnerne som local-ci fordeler.' },
    { to: 'ci', text: 'Release-skriptene derfra følger repo-ci-malene.' },
    { to: 'Bitwarden', text: 'Hvert token går først til hvelvet og så til GitHub gjennom rotasjonsskriptet.' },
    { to: 'GitHub', text: 'Ferdighetene flytter repoer, legger til workflows og lagrer hemmeligheter gjennom gh.' },
  ],
  design: {
    scale: [
      'Én eier, 11 skills og de titalls repoene i én GitHub-organisasjon som skillene reviderer og leverer.',
      'En regelfil lastes ved hver tur i hver økt, så den holdes kort, og reglene for enkeltoppgaver ligger i skills.',
    ],
    data: [
      'Ingen database. Skills er Markdown-mapper, og regelfilen er én Markdown-fil som installasjonsprogrammet kopierer inn i hver agent.',
      'Hvert app-repo lister hemmelighetene sine i .github/secret-rotation.json: typen, leverandørsiden og hva en ny verdi koster.',
    ],
    interfaces: [
      'Revisjonsskriptet leser workflow-filene og hemmelighetslistene til alle repoer med ett gh GraphQL-kall.',
      'Installasjonsprogrammet kobler regelfilen til de globale filene til Claude Code og Codex i en merket blokk, og Kimi Code leser den samme linjen.',
      'Én gateway-server står for 5 MCP-servere, så en agent laster én verktøyliste.',
    ],
    reliability: [
      'Release-arbeidsflyten bygger ved siden av Checks. Et portskript slår opp Checks til slutt, så en mislykket Checks avbryter byggingen.',
      'En senere Checks starter publiseringsjobben via workflow_run, så ingen jobb holder en runner mens den venter.',
      'Kjøringer flytter til eierens PC når skyminuttene går tom, og jobbene venter i køen mens den er av.',
    ],
    security: [
      'Rotasjonsskriptet leser en ny verdi fra en skjult inntasting eller en fil og lagrer den med gh secret set, så agenten ikke ser den.',
      'Hvert token går først til hvelvet, så til GitHub.',
      'Repoet er privat, siden det nevner organisasjonens hemmelighetslister og runnere. De generelle skillene ligger i det offentlige agent-skills.',
    ],
    performance: [
      'Bare reglene hver tur trenger, lastes hver gang. En oppgaveregel lastes fra skillen sin når en forespørsel passer.',
      'Release-byggingen lagrer filene i cachen under kjørings-id-en, så publiseringsjobben gjenbruker dem og tar en lett runner i ett minutt.',
    ],
    operations: [
      'check.yml og release.yml leser runneren fra repo-variabler, som en ruter peker først mot sky-runnere og sist mot PC-en.',
      'Releaser får en datotagg som v2026.10.30.1 fra shell-skript som repo-ci-malene deler med ci-repoet.',
      'mise run test sjekker skillene, tekstbudsjettet, installasjonen i en midlertidig hjemmemappe, gatewayen og release-skriptene.',
    ],
    tradeoffs: [
      'Et privat repo ved siden av det offentlige, så organisasjonens runnere og hemmelighetslister forblir upubliserte. Det koster to kloner og to installasjonsprogrammer.',
      'Oppgaveregler i skills i stedet for én lang regelfil, så en rolig tur betaler færre tokens. En skill med svak beskrivelse blir hoppet over.',
      'Et manifest i hvert app-repo i stedet for én sentral liste, så en workflow-endring og hemmelighetsoppføringen kommer i én PR. Et repo uten manifest får ingen rotasjon.',
    ],
  },
  features: {
    'Move a repo':
      'Ferdigheten move-repo får agenten til å finne hver lenke til den gamle adressen med gh. Så flytter den repoet, gjør det privat og flytter CI-en til den egne runneren.',
    'CI and releases for every repo':
      'Et shell-skript leser workflowene i hvert repo i organisasjonen med ett GraphQL-kall. Ferdigheten repo-ci legger så til manglende Checks og Release fra malene.',
    'Rotate secrets':
      'Et PowerShell-skript leser hemmelighetslisten i hvert repo og lagrer hver ny verdi med gh. Personen kopierer verdien, så agenten ser den ikke.',
    'Workflow rules':
      'En regelfil i Markdown lastes i hver tur i Claude Code, Codex og Kimi Code. Den nevner ferdigheten hver jobb laster.',
    'MCP gateway':
      'mcpproxy kjører de 5 serverne bak én stdio-server, og hver økt får sin egen datamappe. Agenten søker etter et verktøy og kaller det så.',
    Releases:
      'En release-workflow starter når workflowen check består på main. To shell-skript velger datotaggen og skriver notatene.',
    'Feature queue':
      'Hver økt skriver en reservasjonsfil på en tavle i hjemmemappen på denne PC-en. En økt med overlappende filer venter og sjekker på nytt.',
  },
};

export default arch;

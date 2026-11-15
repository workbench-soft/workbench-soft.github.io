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

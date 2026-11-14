import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'En Tauri 2-app for Windows med en Rust-kjerne og et React-vindu. Kjernen kjører Claude Code for å finne tråder og skrive utkast, og den åpner Chrome for publiseringen.',
  parts: [
    { name: 'Tauri 2', role: 'skrivebordsskallet som pakker vinduet og Rust-kjernen i ett installasjonsprogram.' },
    { name: 'Rust-kjerne', role: 'kjører Claude Code og Chrome, holder JSON-filene og tempogrensene.' },
    { name: 'React og Vite', role: 'vinduet med fanene Comments og Posts og kortene deres.' },
    { name: 'Claude Code', role: 'leser repoet, henter tråder gjennom en Reddit-MCP-server og skriver utkastene.' },
    { name: 'chromiumoxide', role: 'styrer appens eget Chrome-vindu når personen trykker Post it for me.' },
    { name: 'axum', role: 'serverer det samme vinduet over lokal HTTP, så Archon kan vise det i en ramme.' },
    { name: 'i18next', role: 'de 9 språkkatalogene i vinduet.' },
    { name: 'Tauri-oppdateringstillegg', role: 'finner et signert nytt bygg og installerer det.' },
  ],
  flow: [
    'Personen velger et repo og trykker Find.',
    'Kjernen starter Claude Code i det repoet med ferdigheten reddit-comments.',
    'Claude leser populære tråder gjennom Reddit-serveren og skriver utkast til en fil.',
    'Kjernen beholder 6 utkast og viser dem som kort.',
    'Personen åpner et kort, og Chrome får tråden med utkastet.',
  ],
  links: [
    { to: 'agent-skills', text: 'Ferdigheten reddit-comments derfra velger trådene og gir hver kommentar tonen.' },
    { to: 'archon', text: 'Reddit-fanen i Archon viser vinduet i en ramme og starter appen når den er lukket.' },
    { to: 'Reddit', text: 'Claude leser tråder gjennom en MCP-server, og personen publiserer i Chrome.' },
    {
      to: 'GitHub Releases',
      text: 'Installasjonsprogrammet og den signerte oppdateringsfilen ligger i en release i det offentlige nettstedsrepoet.',
    },
  ],
  features: {
    'Repo picker':
      'Rust-kjernen lister hver git-mappe under rotmappen fra innstillingene. Valget lagres i en JSON-fil i datamappen til appen.',
    Subreddits:
      'Kjernen kjører Claude Code uten MCP-server og bare med leseverktøy. Claude navngir subs ut fra repoet, og listen lagres per repo.',
    'Find threads':
      'Kjernen kjører Claude Code i repoet med ferdigheten reddit-comments og en Reddit-MCP-server. Claude skriver tråder og utkast til en fil, og kjernen beholder 6.',
    'Steps on top': 'React-vinduet lyser opp steget som venter, ut fra tilstanden til søket og kortene.',
    Cards: 'Kortene kommer fra en køfil som kjernen skriver. Endringer lagres der når tekstfeltet mister fokus.',
    'Open in Chrome':
      'Kjernen legger utkastet på utklippstavlen og starter Chrome i profilen personen valgte. En grense holder tempoet på 3 publiserte kommentarer i timen.',
    'Post it for me':
      'Kjernen starter sin egen Chrome med en feilsøkingsport og styrer den gjennom chromiumoxide. Den fyller ut skjemaet på gamle Reddit, trykker Save og sjekker at kommentaren vises.',
    'Posts tab':
      'Claude Code leser de avkryssede repoene og ferdigheten marketing og skriver så innleggsutkast til en fil. Kjernen beholder 3 og fjerner medier uten fil.',
    'Screenshots and videos':
      'Claude velger opptil 4 filer fra skjermbildemappen i repoet ut fra bildetekstene. Et trykk på en fil viser den i Utforsker.',
    'Open a post':
      'Kjernen åpner innsendingssiden på gamle Reddit i Chrome med tittel og tekst i adressen. Et innlegg med medier viser den første filen i Utforsker.',
    'Ban risk':
      'En Rust-modul vurderer neste innlegg ut fra historikkfilene for innlegg og kommentarer. Reglene kommer fra ferdigheten marketing, som ett fellesskap om dagen.',
    'Tester post':
      'Kjernen fyller ut en mal fra Google Group-lenken og applinjene i panelet. Det trengs ingen kjøring av Claude.',
    'Inside Archon':
      'Kjernen serverer det samme vinduet og de samme kommandoene over lokal HTTP med axum. Archon viser det i en ramme, og appen avslutter 2 minutter etter at fanen lukkes.',
    'Info button':
      'En dialog i vinduet viser hva Find trenger og reglene for utestengelsesrisiko. Den viser også versjonen og en sjekk etter oppdateringer.',
    Updates:
      'Tauri-oppdateringstillegget leser en signert oppdateringsfil fra en GitHub-release ved oppstart og hver 24. time. Det sjekker signaturen før det kjører installasjonsprogrammet.',
    Language:
      'i18next holder de 9 katalogene i vinduet. Valget lagres i innstillingsfilen, så Tauri-vinduet og Archon-rammen deler det.',
    'Done list':
      'Publiserte og hoppede tråder flyttes til en historikkfil med datoen. Neste søk gir dem til Claude så de hoppes over.',
  },
};

export default arch;

import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'En VS Code-utvidelse som bygger hver lenke fra lokal git. Den sender ingen forespørsler til vertene, og åpner lenken i nettleseren eller kopierer den.',
  parts: [
    { name: 'VS Code API', role: 'registrerer de 8 kommandoene og menyene, og leser innstillingene og markeringen.' },
    { name: 'git', role: 'gir roten til repoet, remote-URL-en og grenene, med 10 sekunders grense per kall.' },
    {
      name: 'Lenkebyggere',
      role: 'ren TypeScript som gjør en remote om til fil-, blame- og historikklenken for hver vert.',
    },
    {
      name: 'vscode.env',
      role: 'åpner lenken i nettleseren eller legger den på utklippstavlen, i lokale og eksterne vinduer.',
    },
    { name: 'vscode.l10n', role: 'oversetter kommandoer, innstillinger og meldinger til 9 språk.' },
    { name: 'esbuild', role: 'bunter koden i én fil, så utvidelsen laster raskt.' },
    { name: 'GitHub Actions', role: 'bygger .vsix ved siden av sjekkene og publiserer den når de består.' },
  ],
  flow: [
    'Personen kjører en kommando fra paletten, editoren eller utforskeren.',
    'Utvidelsen finner roten til filens repo med git.',
    'git returnerer remote-URL-en og en gren som har filen.',
    'Lenkebyggeren skriver URL-en for den verten med de markerte linjene.',
    'VS Code åpner den i nettleseren eller kopierer den med et varsel.',
  ],
  links: [
    { to: 'GitHub', text: 'Huser forken og utgivelsene med .vsix. GitHub-lenker er standard.' },
    { to: 'GitLab and Bitbucket', text: 'Lenkemål ved siden av GitHub, bygget fra remote-URL-en uten API-kall.' },
    { to: 'Visual Studio Marketplace', text: 'Viser utvidelsen. Hver publisering der gjøres for hånd.' },
  ],
  design: {
    scale: [
      'Én person per VS Code-vindu, én lenke per klikk, så arbeidet er noen få git-kall på ett repo.',
      'Den kjører i lokale, SSH- og container-vinduer, og et git-kall stopper etter 10 sekunder så en treg remote ikke henger editoren.',
    ],
    data: [
      'Utvidelsen har ingen tilstand. Hver kommando leser innstillingene, utvalget og git, bygger en lenke og glemmer dem.',
      'openInGitHub-innstillingene og remote-URL-en avgjør verten, grenen og en tilordnet adresse.',
    ],
    interfaces: [
      'Kommandoene kommer fra paletten, editormenyen og Utforsker-menyen, 8 til sammen, og hver kaller den samme lenkekjøreren.',
      'git gir reporoten, remote-URL-en og grenene gjennom execFile, og lenkebyggerne skriver URL-ene for fil, blame og historikk for hver vert.',
      'vscode.env.openExternal åpner nettleseren og vscode.env.clipboard kopierer, så begge virker i eksterne vinduer.',
    ],
    reliability: [
      'Grensjekken prøver innstillingen, remote-HEAD, main og master, og faller så tilbake til gjeldende gren eller committen ved frakoblet HEAD.',
      'En git-feil viser gits egen melding, og git ber ikke om passord i en terminal.',
    ],
    security: [
      'Utvidelsen sender ingen forespørsler til vertene, så den trenger ikke token eller innlogging for GitHub, GitLab eller Bitbucket.',
      'git kjører gjennom execFile uten skall, så innstillingen defaultRemote kan ikke kjøre en kommando.',
    ],
    performance: [
      'esbuild samler kildene i én fil, noe som gjorde pakken mindre og lastingen raskere.',
      'Hvert git-kall er en kort prosess gjennom execFile med 10 sekunders grense, så et klikk koster noen få små prosesser.',
    ],
    operations: [
      'Checks kjører lint, typesjekk, enhetstester og bygg ved hver push, og release-arbeidsflyten bygger .vsix ved siden av.',
      'Et portskript publiserer bygget når Checks består, og en mislykket Checks avbryter det. Publisering til Marketplace forblir manuell.',
      'Vanlig TypeScript i git og links kjører i Node under mise run test, og bare editorlimet trenger et VS Code-testvindu.',
    ],
    tradeoffs: [
      'Lenker fra lokal git i stedet for hver verts REST-API, så ingen token og ingen nettverkskall per klikk. Lenken kan ikke bekrefte at filen finnes hos verten.',
      'vscode.env.openExternal i stedet for pakken open, som ødela navn som users.$id.tsx og ikke åpnet nettleser fra SSH-vinduer.',
      'En fork av en eksisterende utvidelse i stedet for omskriving, som beholdt verts-lenkekoden og testene. Den nye id-en betyr at folk må installere på nytt.',
    ],
  },
  features: {
    'Open a file, blame or history link':
      'Kommandoen leser filen og de markerte linjene fra editoren og remote fra git. En vertsmodul skriver lenken, og VS Code åpner den i nettleseren.',
    'Copy a link':
      'Den samme lenken går til utklippstavlen i VS Code, så et eksternt vindu fyller den lokale. Et varsel viser URL-en.',
    'Links from the Explorer':
      'Utforskermenyen gir filen eller mappen til den samme kommandoen. Lenken har ikke noe linjeanker.',
    'Main or master first':
      'git sjekker innstillingen, så remote-HEAD, main og master etter en gren med filen. Uten treff bruker lenken gjeldende gren.',
    'Hosts and mapped URLs':
      'Verten kommer fra en innstilling eller fra remote-URL-en. En tilordning bytter ut remote-URL-en før lenken skrives.',
    Languages:
      'vscode.l10n velger katalogen etter visningsspråket i VS Code. Kommandonavn og innstillinger kommer fra 9 pakkekataloger.',
  },
};

export default arch;

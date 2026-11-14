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

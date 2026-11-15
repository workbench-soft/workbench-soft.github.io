import type { Engineering } from './types';

export default {
  title: 'Slik bygges koden',
  intro:
    'Alle repoene følger de samme reglene for kode, tester, spesifikasjoner og dokumentasjon. Kodeagenter skriver mesteparten av koden, og reglene holder arbeidet lite, kontrollert og dokumentert.',
  numbers: {
    title: 'Koden i dag',
    source:
      'Talt opp fra {repos} repoer på GitHub {date}. Opptellingen kjøres på nytt ved hver utrulling og hver natt.',
    languages: 'Linjer per språk',
    other: 'Andre',
    metrics: {
      lines: ['Kodelinjer', 'Linjer med kildekode som ikke er tomme, uten bygd eller medfølgende kode.'],
      files: ['Kildefiler', 'Hver fil i et programmeringsspråk.'],
      functions: ['Funksjoner', 'Navngitte funksjoner og metoder, talt fra syntakstreet.'],
      types: ['Typer', 'Klasser, grensesnitt, structs, enums og traits.'],
      tests: ['Tester', 'Testtilfeller i Vitest, Rust, Kotlin, Swift og Python.'],
      modules: ['Moduler', 'npm-pakker, Rust-crates og Gradle-moduler.'],
      smallFiles: ['Filer under 100 linjer', 'Andelen kildefiler som følger 100-linjersregelen.'],
      medianLines: ['Median fil', 'Halvparten av kildefilene er så mange linjer eller kortere.'],
      specs: ['Spesifikasjoner', 'Funksjonsspesifikasjoner i specs-mappen i hvert repo.'],
      docs: ['Dokumentsider', 'README-filer og sidene i hver docs-mappe.'],
      commits: ['Commits på 30 dager', 'Commits på hovedgrenen i hvert repo.'],
      prs: ['Flettede PR-er på 30 dager', 'Pull requests flettet i hele organisasjonen.'],
    },
  },
  topics: [
    {
      id: 'code',
      title: 'Liten og enkel kode',
      lead: 'Koden er klar å lese første gang, og hver fil har én jobb.',
      points: [
        ['Under 100 linjer', 'en fil holder seg under 100 linjer. En lengre deles etter jobb.'],
        ['Gjenbruk først', 'ny kode starter med et søk i repoet og de delte pakkene.'],
        ['Bibliotek først', 'et vedlikeholdt bibliotek slår kode skrevet for hånd.'],
        ['Delte pakker', 'kode som to apper trenger, flyttes til én pakke som begge installerer.'],
        ['Strengt', 'TypeScript kjører i strict-modus, og linterne feiler på en advarsel.'],
      ],
    },
    {
      id: 'tests',
      title: 'Testet i hvert steg',
      lead: 'En endring består de samme kontrollene på PC-en, i CI og på en ekte telefon.',
      points: [
        ['Før push', 'en git-hook kjører lint, formatkontroll og typekontroll.'],
        ['CI ved hver push', 'kontrollene og utgivelsesbygget starter samtidig. En feilet kontroll avbryter bygget.'],
        ['Enhetstester', 'Vitest, cargo test og Gradle-tester kjører i hvert repo med mise run test.'],
        ['Ekte enheter', 'flettet arbeid installeres på en ekte telefon eller åpnes i en nettleser, flyt for flyt.'],
        ['Språktester', 'en test feiler når et språk mangler en tekst som engelsk har.'],
      ],
    },
    {
      id: 'specs',
      title: 'En spesifikasjon per funksjon',
      lead: 'Hver funksjon har én spesifikasjon i repoet, skrevet før koden.',
      points: [
        ['Første commit', 'spesifikasjonen eller den nye oppføringen kommer før noen kode.'],
        ['Kort sammendrag øverst', 'et kort sammendrag står først, så flytene, modulene, dataene og grensene.'],
        ['Historikk under', 'hver endring legger til en datert oppføring med grunnen, filene og stegene.'],
        ['Beholdt', 'spesifikasjoner blir etter flettingen, så grunnen bak koden blir også.'],
      ],
    },
    {
      id: 'docs',
      title: 'Dokumentasjon i samme endring',
      lead: 'En endring oppdaterer hvert dokument den gjør utdatert, i samme commit.',
      points: [
        ['Hvert repo', 'en README, en endringslogg, en gjøremålsliste og spesifikasjonene.'],
        ['Hver app', 'arkitekturen med diagrammer, brukerflytene og funksjonene.'],
        [
          'Kontrollert',
          'et skript sjekker at hver funksjon i dokumentene har sin spesifikasjon og sin linje på dette nettstedet.',
        ],
        ['Enkle ord', 'dokumenter, commits og PR-er følger én skriveguide: svaret først, korte setninger.'],
        ['9 språk', 'hver tekst en person ser, leveres på 9 språk i samme endring.'],
      ],
    },
    {
      id: 'agents',
      title: 'Kodeagenter med regler',
      lead: 'Claude Code, Codex og Kimi Code leser de samme reglene og ferdighetene.',
      points: [
        ['Regler som filer', 'hvert repo har sin egen AGENTS.md, og én delt fil setter stakken og oppsettet.'],
        ['Ferdigheter', 'en ferdighet per jobb: levere, gjennomgå, teste, utgi. De offentlige ligger i agent-skills.'],
        [
          'Én oppgave, ett worktree',
          'hver økt reserverer filene sine, jobber i sitt eget git worktree og fletter gjennom en PR.',
        ],
        ['Archon', 'en starter på PC-en åpner en økt per oppgave og viser hva hver av dem gjør.'],
        ['Lærdom', 'et steg som kostet en agent et nytt forsøk, blir en regel, så neste økt hopper over det.'],
      ],
    },
    {
      id: 'tools',
      title: 'Ett verktøy per jobb',
      lead: 'Hvert repo bruker de samme verktøyene i de samme versjonene.',
      points: [
        ['Låst', 'mise låser hver verktøyversjon, og låsfilene ligger i git.'],
        ['Nyeste stabile', 'et nytt verktøy starter på siste stabile utgave.'],
        ['Oppgradert sammen', 'et hovedhopp i et delt verktøy går til hvert repo som bruker det.'],
        ['Gratis', 'hvert verktøy og hver tjeneste er gratis, eller holder seg innenfor gratisnivået.'],
      ],
    },
  ],
  stack: {
    title: 'Stakken',
    head: ['Jobb', 'Valg'],
    rows: [
      ['Telefon- og nettapper', 'Expo, React Native og react-native-web, én kodebase'],
      ['Skrivebordsapper', 'Tauri 2, med et Vite- og React-grensesnitt over en Rust-kjerne'],
      ['Logikk for hver plattform', 'en Rust-crate, bygd til wasm for nettet og gjennom FFI for telefoner'],
      ['Backend', 'Rust på Cloudflare Workers, med D1 og R2'],
      ['Levende delte data', 'Firestore med Firebase Auth'],
      ['Statiske nettsteder', 'Astro på GitHub Pages'],
      ['Android-kode', 'Kotlin og Jetpack Compose'],
      ['Skript', 'TypeScript på Node'],
      ['TypeScript-kontroller', 'Vitest, oxlint, oxfmt, knip og tsc'],
      ['Rust-kontroller', 'clippy, rustfmt og cargo-shear'],
    ],
  },
} satisfies Engineering;

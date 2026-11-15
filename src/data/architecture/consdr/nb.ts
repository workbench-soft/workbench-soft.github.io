import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'Et statisk React-nettsted bygd med Vite regner ut hele kalkulatoren i nettleseren, og Cloudflare leverer det. En Java-app med WebView på Android viser det levende nettstedet, og en Capacitor-app på iPhone har nettstedet inni seg.',
  parts: [
    { name: 'React and Vite', role: 'kalkulatorsiden, forhåndsrendret ved bygging med standardtallene.' },
    {
      name: 'Regel- og kostnadsmoduler',
      role: 'enkel TypeScript med skattereglene, kildene deres og utregningene for hvert valg.',
    },
    { name: 'localStorage', role: 'de endrede feltene, temaet og språket, bare i denne nettleseren.' },
    { name: 'Service worker', role: 'en cache av sidene og filene, så senere besøk virker uten nett.' },
    { name: 'i18next', role: 'de 9 katalogene, hver lastet når personen velger den.' },
    { name: 'Cloudflare', role: 'leverer de bygde filene, omdirigeringene og Web Analytics.' },
    {
      name: 'Android WebView app',
      role: 'Java rundt det levende nettstedet, med et AdMob-banner og et kjøp i Google Play.',
    },
    { name: 'Capacitor', role: 'iPhone-appen med nettstedets filer inni, og Swift for reklame, StoreKit og deling.' },
  ],
  flow: [
    'Cloudflare sender den forhåndsrendrede siden med standardtallene.',
    'Siden leser de lagrede feltene fra localStorage.',
    'Hver endring kjører sammenligningen på nytt i nettleseren og lagrer feltene.',
    'Siden viser de 3 summene, delene deres og utregningen.',
    'Service workeren lagrer filene for neste besøk uten nett.',
  ],
  links: [
    { to: 'Cloudflare', text: 'Er vert for nettstedet og kjører omdirigeringene og Web Analytics.' },
    { to: 'Google AdSense', text: 'Automatiske annonser på nettstedet. Appene laster ikke AdSense.' },
    { to: 'Google Play', text: 'AdMob-banneret og kjøpet Fjern reklame i Android-appen.' },
    { to: 'App Store', text: 'StoreKit selger Fjern reklame i iPhone-appen når den er i App Store.' },
  ],
  design: {
    scale: [
      'En person per nettleser, med 23 felt på én kalkulatorside. Sammenligningen regnes på nytt i nettleseren ved hver endring.',
      'Nettstedet er statiske filer på Cloudflare, så ingen egen server hos studioet bærer lasten.',
      'Skattetrinn, FBT og stempelavgift er faste tall i koden, så grensen er å holde dem oppdatert, ikke last.',
    ],
    data: [
      'Ingen database og ingen konto. Endringer ligger i localStorage som JSON under 3 nøkler: felt (med versjonsfelt), tema og språk.',
      'Bare endrede felt lagres, så en urørt startdato leses som i dag, og en standardverdi følger biltypen og reglene.',
      'Skattetrinn, FBT-konstanter og stempelavgift per delstat ligger som konstanter i src/rules, hver med en lenke til kilden.',
    ],
    interfaces: [
      'compareOptions tar ett CalcInputs-objekt og gir tilbake en Comparison: kostnad, kontoforløp og kostnadsdeler per alternativ.',
      'Siden snakker med Android-appen over window.ConsdrApp, med meldingene state, buy, privacy og devAds og svar som JSON.',
      'iPhone-appen svarer på den samme broen fra Swift, og Capacitor serverer det bygde nettstedet fra innsiden av appen.',
      'Bygget skriver sitemap.xml, llms.txt, ads.txt og JSON-LD for de vanlige spørsmålene.',
    ],
    reliability: [
      'Sider går først til nettet og faller tilbake på kopien i hurtigbufferen etter 3 sekunder eller ved en serverfeil.',
      'Når nettstedsdata er blokkert, gir lesing null og skriving hoppes over, og siden fungerer videre for det besøket.',
      'En lagret verdi av feil type eller en ukjent listeverdi forkastes ved innlasting. Å lagre i én fane laster de andre på nytt.',
    ],
    security: [
      'Ingen innlogging, og tallene går til ingen server, så det som skrives inn forlater aldri nettleseren.',
      'Svarhodene setter frame-ancestors none, object-src none, nosniff og HSTS, og slår av kamera, mikrofon og posisjon.',
      'Android-signeringsnøkkelen er en CI-hemmelighet som dekrypteres på runneren, og repoet har ingen nøkkel.',
      'Android-appen ber om samtykke til annonser gjennom Googles samtykke-SDK.',
    ],
    performance: [
      'Engelsk ligger i hovedskriptet, og hver av de 8 andre katalogene lastes som en egen bit når den velges.',
      'Bygget forhåndsrenderer kalkulatoren med standardverdiene og forhåndslaster de latinske skriftene, så innholdet vises tidlig og tallene holder seg i ro.',
      'Filer i /assets/ har innholds-hash, får en hurtigbuffer-header på ett år og serveres fra hurtigbufferen først av workeren.',
    ],
    operations: [
      'Én jobb sjekker, tester og bygger, og så publiserer wrangler deploy dist/ til Cloudflare ved hver push til main.',
      'CI kjører på studioets egen Windows-runner, så det private repoet bruker ingen Actions-minutter.',
      'En nattlig kjøring klokken 19:00 Sydney-tid bygger den signerte Android-pakken for Google Play, bare når android/ er endret.',
      'Hurtigbuffernavnet til service workeren hasher fillisten, sideteksten og worker-koden, så hver utrulling erstatter den gamle hurtigbufferen.',
    ],
    tradeoffs: [
      'Beregning i nettleseren i stedet for en server-API, så ingen data forlater enheten og vertstjenesten er statiske filer.',
      'På Android en WebView rundt det levende nettstedet i stedet for native skjermer, så én kodebase dekker web og app, og en utrulling av nettstedet når appen med en gang.',
      'Sider først fra nettet i stedet for fra hurtigbufferen, så en utrulling synes med en gang, til en pris på opptil 3 sekunder på tregt nett.',
      'Faste regler i koden med kilder i stedet for en rente-API, så hvert tall kan etterprøves, men et nytt skatteår krever en utgivelse.',
    ],
  },
  features: {
    'Compare a lease, a loan and cash':
      'En enkel TypeScript-funksjon tar feltene og gir én sum per valg. Den kjører i nettleseren ved hver endring, og ingen server ser tallene.',
    'Where the money goes':
      'Sammenligningen gir delene av hver sum ved siden av summen selv. En notatmodul skriver linjen og formelen ved hvert tall.',
    'Lease and loan settings':
      'Skjemamodulen gjør den skrevne teksten om til tall og lagrer hver endring i localStorage. En halvskrevet verdi blir stående.',
    'FBT by car type and start date':
      'En regelmodul velger FBT-satsen og elbilfritaket ut fra biltype, startdato og pris. Hver konstant oppgir kilden sin.',
    'Stamp duty by state': 'En tabell per delstat i regelmodulen regner ut avgiften fra pris, biltype og startdato.',
    'Account interest':
      'Sammenligningen fører kontoen måned for måned til sin rente, for hvert valg og uten bil. Forskjellen gir den tapte renten.',
    'Borrowing for another home':
      'Sammenligningen regner ut hvor mye mindre en bank låner ut mens bilen betales ned. Den bruker APRA-bufferen på 3 poeng over 30 år.',
    'Working and sources':
      'En notatmodul skriver hvert steg og hver formel ved tallene. En kildefil lenker hvert fast tall til siden sin.',
    'Common questions':
      'En modul bygger svarene på gjeldende språk fra de samme reglene. Den engelske utgaven går også inn i siden som JSON-LD for søk.',
    'Guides and pages':
      'En Vite-plugin rendrer hver guide til statisk HTML ved bygging, med tall fra de samme reglene. Den skriver også sitemapen.',
    'Saved inputs and reset':
      'De endrede feltene går til localStorage som JSON. Tilbakestill sletter dem, og standardverdiene kommer tilbake.',
    'Offline use':
      'En service worker skrevet ved bygging lagrer sidene og filene. Sidene prøver nettet først og tar kopien fra cachen etter 3 sekunder.',
    'Colour theme':
      'Et lite skript i sidehodet setter det lagrede temaet før første tegning. Valget ligger i localStorage.',
    'Remove ads in the Android app':
      'Siden spør Java-appen over en bro, og Google Play Billing selger produktet. Appen sender tilbake tilstanden uten reklame.',
    'Which lease term costs least':
      'En funksjon kjører sammenligningen én gang per løpetid fra 1 til 5 år. Den fører kontoen videre til år 5, så hver løpetid dekker de samme årene.',
    'If you leave your job':
      'En modul regner ut innløsningen på sluttdatoen og kostnaden ved hver vei ut mot å fortsette. Den bruker leasingtallene fra sammenligningen.',
    Language:
      'i18next med react-i18next laster hver katalog som egen fil når den velges. Beløpene blir i australske dollar.',
    Ads: 'AdSense viser automatiske annonser på nettstedet. Appene merker siden, så AdSense er av der og AdMob viser det native banneret.',
    "No ads on the developer's phone":
      'Android-appen holder en utviklernøkkel som PC-en sender til telefonen én gang. Med den skjuler hvert bygg banneret.',
    'iPhone app':
      'Capacitor leverer det bygde nettstedet fra inne i appen, så den åpner uten nett. Swift-kode svarer på den samme sidebroen som Android-appen.',
    'Remove ads on the iPhone':
      'StoreKit 2 selger den samme produkt-id-en som Google Play. Gjenopprett kjøp spør App Store om tidligere kjøp.',
    'Share the result':
      'Siden lager konklusjonslinjen med lenken. iPhone-appen åpner delingsarket i iOS, og en mobilnettleser bruker Web Share.',
  },
};

export default arch;

import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'Et statisk Astro-nettsted på GitHub Pages, redigert gjennom en Git-basert admin. Én Rust Worker på Cloudflare logger Maria inn og tegner KI-bildene.',
  parts: [
    { name: 'Astro', role: 'bygger hver side til statisk HTML og hvert bilde til AVIF- eller WebP-størrelser.' },
    { name: 'GitHub Pages', role: 'leverer nettstedet fra et offentlig byggerepo, gratis og raskt i Russland.' },
    { name: 'Sveltia CMS', role: 'adminen, som lagrer hver endring som en commit i det private kilderepoet.' },
    {
      name: 'Rust Worker',
      role: 'logger inn admins med en kode på e-post og sjekker repotilgangen deres for KI-siden.',
    },
    { name: 'Workers AI', role: 'kjører FLUX.2-modellene som tegner interiørene.' },
    { name: 'FormSubmit', role: 'sender hvert bestillingsskjema til Maria, uten konto eller server.' },
    {
      name: 'GitHub Actions',
      role: 'sjekker hver endring, bygger nettstedet og pusher det til det offentlige repoet.',
    },
  ],
  flow: [
    'Nettleseren til en besøkende ber GitHub Pages om en side.',
    'Pages sender statisk HTML og bilder i størrelsene oppsettet trenger.',
    'Bestillingsskjemaet går til FormSubmit, som sender e-post til Maria.',
    'Marias endringer blir commits, og nettstedet bygges på nytt på 2 minutter.',
  ],
  links: [
    { to: 'GitHub', text: 'Holder den private kilden og det offentlige byggerepoet, og leverer sidene.' },
    { to: 'Cloudflare', text: 'Kjører Workeren, Workers AI og e-posten med innloggingskoden.' },
    { to: 'FormSubmit', text: 'Sender hver bestilling til Maria.' },
    {
      to: 'Yandex',
      text: 'Leser de strukturerte dataene, og en Yandex-regel i robots.txt samler filterlenkene til én side.',
    },
  ],
  design: {
    scale: [
      'En studioportefølje for besøkende i Russland, med 16 gallerier og rundt 270 bilder.',
      'Noen få personer redigerer den, så siden trenger verken server eller database, og hver endring er en commit.',
      'AI-siden holder seg innenfor gratisgrensen i Workers AI på 10 000 nevroner om dagen, og et bilde tar rundt 3 til 15 sekunder.',
    ],
    data: [
      'Hvert galleri er en mappe med en index.md og bildene sine. Toppen har tittel, kategori, rekkefølge, forside og bildetekster.',
      'Én settings.json har kontaktene, tekstene på forsiden og skrifthvalget. Et zod-skjema sjekker den og galleriene ved bygging.',
      'Innloggingskodene lagres ikke. Hver kode er en HMAC av e-posten og et vindu på 10 minutter.',
    ],
    interfaces: [
      'Rust-Workeren betjener GET /auth, POST /auth/code, POST /auth/verify og POST /generate.',
      'Administrasjonen skriver gjennom GitHub-API-et som commits. Bestillingsskjemaet går til FormSubmit, som sender det på e-post.',
      '/generate tar en prompt, en modell, en størrelse fra 256 til 1536 i steg på 64 og opptil 2 referansebilder som multipart-skjemadata.',
    ],
    reliability: [
      'Workeren oppgir ett tillatt opphav i CORS-headeren, siden nettlesere avviser en liste. En feil etter det går ut som JSON administrasjonssiden kan vise.',
      'En GitHub-feil får en beskjed om å prøve igjen og ikke en melding om manglende tilgang. En oppbrukt AI-kvote har sin egen melding.',
      'Hver utgivelse bygges på nytt fra kilden, så en dårlig endring er én commit å rulle tilbake.',
    ],
    security: [
      'Man logger inn med en 6-sifret kode på e-post, 5 forsøk i minuttet per e-post, og Workeren gir administrasjonen et finmasket repo-token.',
      '/generate sjekker at kallerens token kan pushe til repoet før det kaller modellen.',
      'Tokenet går bare til et vindu på de tillatte opphavene. Administratorenes e-poster og tokens ligger i Worker-innstillinger og hemmeligheter, ikke på siden.',
    ],
    performance: [
      'Astro skriver hvert bilde som AVIF eller WebP i størrelsene oppsettet trenger, og GitHub Pages serverer statisk HTML.',
      'Utgivelsen beholder Astros bildebuffer mellom kjøringer i stedet for å tegne alle bildene på nytt.',
      'Et romfoto krymper til 512 px i nettleseren før opplasting. FLUX.2 klein skisserer på rundt 3 sekunder, dev bruker rundt 15.',
    ],
    operations: [
      'Hver push til main bygger siden ved siden av sjekkene, venter på sjekkene for samme commit og skyver så sidene til det offentlige byggrepoet.',
      'Én utgivelse kjører om gangen, og en nyere push avbryter den foreldede, så et gammelt bygg ikke overskriver et nytt. Commits får datotagger.',
      'Endringen vises rundt 2 minutter etter lagring. Workeren rulles ut med wrangler, og observerbarhet er på.',
    ],
    tradeoffs: [
      'GitHub Pages fra et offentlig byggrepo framfor Cloudflare Pages, siden russiske leverandører bremser Cloudflare, på bekostning av to repoer og et utgivelsestoken.',
      'En Git-basert administrasjon framfor et driftet CMS, så det ikke trengs server eller database, på bekostning av 2 minutters ventetid per endring.',
      'FormSubmit framfor en Worker med e-post, siden det er gratis og uten konto, på bekostning av en tjeneste utenfor Russland.',
      'Workers AI med FLUX.2 framfor betalte bilde-API-er, siden det leser russisk og passer i gratisnivået, på bekostning av trege bilder fra Cloudflare.',
    ],
  },
  features: {
    Portfolio:
      'Hvert galleri er en mappe med Markdown og bilder i repoet. Astro bygger sidene og bildestørrelsene, og filteret kjører i nettleseren.',
    'Order a design':
      'Hvert skjema går til FormSubmit, som sender forespørselen til Maria. Nettstedet har ingen egen server for det.',
    Admin:
      'Sveltia CMS kjører på adminsiden og committer hver endring til repoet. Workeren sender Maria en innloggingskode og gir så adminen en repotoken.',
    Fonts:
      'De 10 fontene kommer fra Fontsource og følger med nettstedet. Valget ligger i innstillingsfilen, og oppsettet bruker det ved neste bygg.',
    'AI generator':
      'Adminsiden pakker Marias russiske forespørsel og stil inn i en engelsk prompt. Workeren sjekker GitHub-tilgangen hennes, og så tegner FLUX.2 på Workers AI bildet.',
    Search:
      'Astro-oppsettet skriver tittel, beskrivelse, delingsbilde og strukturerte data på hver side. Bygget skriver robots.txt, llms.txt og et nettstedskart med datoer fra git.',
  },
};

export default arch;

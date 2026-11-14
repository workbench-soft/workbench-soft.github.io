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

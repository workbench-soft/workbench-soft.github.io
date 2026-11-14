import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'En Cloudflare Worker i TypeScript snakker WebDAV-metodene som Memories sender. Ett Durable Object holder filene i sin SQLite-lagring på gratisplanen.',
  parts: [
    { name: 'Cloudflare Worker', role: 'sjekker Basic-innloggingen og sender hver WebDAV-forespørsel videre.' },
    { name: 'Durable Object', role: 'ett lager for hele treet, med filene i biter på 1 MB i sin SQLite.' },
    { name: 'Statiske filer', role: 'tar eksempelbildene med Workeren og fyller lageret ved hver oppstart.' },
    { name: 'Python-skript for eksempler', role: 'tegner de 42 kunstige bildene og 2 videoene med EXIF-dato og GPS.' },
    { name: 'Cron-utløser', role: 'sletter opplastingslaget hver natt klokka 03:00 UTC.' },
  ],
  flow: [
    'Appen sender en WebDAV-forespørsel med Basic-innlogging.',
    'Workeren sjekker innloggingen og gir forespørselen til Durable Object.',
    'En lesing ser først i opplastingslaget og så i eksemplene.',
    'Appen får en mappeliste eller bytene i området den ba om.',
  ],
  links: [
    {
      to: 'memories',
      text: 'Kontrolløren hos Google Play skriver inn denne serveren i tilkoblingsskjermen i Memories.',
    },
    { to: 'Google Play', text: 'Notatene under App access gir kontrolløren adressen og innloggingen.' },
    { to: 'Cloudflare', text: 'Gratisplanen for Workers kjører den, og CI ruller den ut når sjekkene går gjennom.' },
  ],
  features: {
    'Sample library':
      'Et Python-skript tegner bildene med EXIF-dato og noen GPS-punkter. De følger med som statiske filer og fyller Durable Object ved oppstart.',
    'Sign in': 'Workeren sjekker én Basic-bruker mot en Worker-hemmelighet. OPTIONS svarer uten innlogging.',
    'Uploads and sorting':
      'Opplastinger og flyttinger havner i et eget lag over de skrivebeskyttede eksemplene. En nattlig cron sletter laget, og eksemplene kommer tilbake.',
  },
};

export default arch;

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
  design: {
    scale: [
      'Ett delt demobibliotek for Google Play-vurderere: 42 bilder, 2 videoer og én innlogging.',
      'Ett Durable Object tar alle forespørsler, så alle vurderere deler én kopi på den gratis Workers-planen.',
    ],
    data: [
      'Filer ligger i biter på 1 MB i SQLite-lageret til Durable Object, under radgrensen på 2 MB.',
      'Eksemplene under base/ er skrivebeskyttet. Opplastinger og mapper fra en klient går til Uploads/, med markører for sletting og flytting.',
      'En JSON-fil har EXIF-datoen til hvert eksempel, som PROPFIND melder som endringstid.',
    ],
    interfaces: [
      'WebDAV bare så langt appen trenger: OPTIONS, PROPFIND med dybde 0 eller 1, GET og HEAD med område, PUT, MKCOL, MOVE og DELETE.',
      'LOCK svarer 405, og PROPFIND med uendelig dybde svarer 403.',
      'Worker sender hver forespørsel videre til Durable Object, som har kallene head, get med område, put, delete og list.',
    ],
    reliability: [
      'En daglig cron kl. 03:00 UTC sletter Uploads/, og demoen går tilbake til eksemplene.',
      'Ved hver oppstart justerer Durable Object base/ etter eksempellisten, så en halvferdig fylling leges.',
      'En PUT slutter å lese etter 50 MB, og en GET med område laster bare sine biter, for å holde seg innenfor 128 MB minne.',
    ],
    security: [
      'Én Basic-bruker sjekkes mot en Worker-hemmelighet. OPTIONS svarer uten innlogging.',
      'Eksempelfilene ligger som statiske ressurser bak Worker, så innloggingen vokter dem også.',
      'Eksemplene er syntetiske, så ingen ekte personer eller steder vises.',
    ],
    performance: [
      'En GET med område leser bare bitene den trenger, så en fil på 50 MB bruker ikke 100 MB minne.',
      'Eksempeldatoene kommer fra en JSON-fil, så PROPFIND trenger ikke lese EXIF.',
    ],
    operations: [
      'Checks kjører lint, typesjekk og enhetstester ved hvert push til main, og Deploy starter når de består.',
      'Deploy bygger eksemplene, kjører wrangler deploy gjennom mise og merker commit med en datoversjon.',
      'Den stopper hvis eksempelmappen og datolisten er uenige, eller Cloudflare-tokenet mangler.',
      'Én utrulling kjører om gangen, og en nyere ventende erstatter en eldre.',
    ],
    tradeoffs: [
      'SQLite i Durable Object framfor R2, siden R2 krever betalingskort og den gratis planen dekker Durable Object.',
      'Et skrivelag over skrivebeskyttede eksempler framfor å skrive i dem, så en nullstilling er én sletting på prefiks.',
      'Syntetiske bilder framfor ekte, så en fremmed ikke ser ekte personer eller steder.',
      'En TypeScript-Worker nå framfor Rust, for å levere først. Organisasjonens stack planlegger flytting til workers-rs.',
    ],
  },
  features: {
    'Sample library':
      'Et Python-skript tegner bildene med EXIF-dato og noen GPS-punkter. De følger med som statiske filer og fyller Durable Object ved oppstart.',
    'Sign in': 'Workeren sjekker én Basic-bruker mot en Worker-hemmelighet. OPTIONS svarer uten innlogging.',
    'Uploads and sorting':
      'Opplastinger og flyttinger havner i et eget lag over de skrivebeskyttede eksemplene. En nattlig cron sletter laget, og eksemplene kommer tilbake.',
  },
};

export default arch;

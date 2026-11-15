import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'En synkroniserer i .NET kjørte i Docker på NAS-en og skrev opptaksdatoen for hvert bilde inn i en LiteDB-indeks. En WPF-app i systemfeltet i Windows slo opp i indeksen etter dato og åpnet filene rett fra NAS-en.',
  parts: [
    { name: '.NET', role: 'én plattform for tjenesten på NAS-en og Windows-appen.' },
    { name: 'Docker', role: 'kjørte synkronisereren på NAS-en ved siden av bildearkivet.' },
    { name: 'LiteDB', role: 'indeksen over opptaksdatoer, som galleriet leste dag for dag.' },
    { name: 'WPF', role: 'ikonet i systemfeltet, galleriet og bildevinduet i Windows.' },
    { name: 'Quartz', role: 'planleggeren som startet den daglige påminnelsen.' },
  ],
  flow: [
    'Synkronisereren på NAS-en leste EXIF for hvert bilde.',
    'Den skrev opptaksdatoen inn i LiteDB-indeksen.',
    'Én gang om dagen kalte et Windows-varsel til galleriet.',
    'Galleriet slo opp bildene for perioden i indeksen.',
    'Det åpnet filene rett fra bildearkivet.',
  ],
  links: [{ to: 'memories', text: 'Telefonappen tok over for den og arvet ideen om «på denne dagen».' }],
  design: {
    scale: [
      'En person og én Windows-PC som leser bildearkivet på en NAS hjemme.',
      'Indeksen har bare opptaksdatoer, så den er liten ved siden av bildene.',
    ],
    data: [
      'LiteDB, en innebygd dokumentdatabase, holder indeksen over opptaksdatoer.',
      'Synkroniseringen leser EXIF-en til hvert bilde, og galleriet åpner indeksen for hver dag i perioden.',
    ],
    interfaces: [
      'Synkroniseringen på NAS-en og Windows-appen møtes i LiteDB-indeksen, som leses etter dato.',
      'Appen åpner bildefilene rett fra NAS-arkivet, uten server-API imellom.',
    ],
    reliability: [
      'Synkroniseringen kjørte i Docker ved siden av arkivet, så indekseringen trengte ikke PC-en.',
      'Galleriet hopper over filer i papirkurven og laster resten mens du ruller.',
    ],
    security: [
      'Ingen konto og ingen skytjeneste: bilder og indeks ble på NAS-en hjemme og PC-en.',
      'Appen åpner arkivet med den filtilgangen PC-en allerede hadde.',
    ],
    performance: [
      'Opptaksdatoer leses én gang på NAS-en, så galleriet slipper å skanne bildene.',
      'Galleriet laster bilder mens du ruller, én dag av perioden om gangen.',
    ],
    operations: [
      'Synkroniseringen kom som en Docker-container på NAS-en, og appen som et Windows-program.',
      'Repoet er arkivert, siden telefonappen erstattet det.',
    ],
    tradeoffs: [
      '.NET til begge delene framfor to stacker, så én plattform dekket NAS-tjenesten og Windows-appen.',
      'En indeks bygd på NAS-en framfor en skanning fra PC-en, så datoene var klare da galleriet åpnet.',
      'Erstattet av telefonappen, som leser NAS-en over WebDAV og ikke trenger en Windows-PC.',
    ],
  },
  features: {
    Tray: 'Et WPF-vindu bor i systemfeltet. Et klikk eller menyen på ikonet åpner galleriet.',
    'Daily reminder': 'En Quartz-jobb viser et Windows-varsel med en knapp. Knappen åpner galleriet.',
    'Gallery by period':
      'Galleriet åpner LiteDB-indeksen for hver dag i perioden. Det hopper over filer i papirkurven og laster resten mens du blar.',
    'Photo window': 'Et WPF-vindu viser ett bilde stort. En tast går til neste eller forrige fil i perioden.',
    'Details and map': 'Appen leser kameradata fra selve bildefilen og viser stedet på et kart.',
    Send: 'De valgte filene går til en annen app i én handling.',
  },
};

export default arch;

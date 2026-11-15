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

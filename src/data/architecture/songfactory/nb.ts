import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'Et kommandolinjeverktøy i Python kjører på Windows-PC-en med ffmpeg og den lokale GPU-en. Det gjør en temamappe om til en YouTube-video, og et skrivebordsvindu eller Archon styrer det.',
  parts: [
    { name: 'Python og uv', role: 'kommandoen songfactory og modulene, kjørt med uv.' },
    { name: 'ffmpeg', role: 'mikser sangene, looper klippet og koder på GPU-en med NVENC.' },
    { name: 'numpy og Apollo', role: 'bygger opp igjen det øvre båndet som en tapsbasert koder kuttet.' },
    { name: 'Claude CLI', role: 'skriver emnene, sangtekstene og YouTube-teksten på Claude-abonnementet.' },
    { name: 'Playwright', role: 'styrer Suno-siden i Chromium for å lage og laste ned sangene.' },
    { name: 'ComfyUI', role: 'tegner bakgrunnsklippet på den lokale GPU-en ut fra en prompt.' },
    { name: 'YouTube Data API', role: 'laster opp videoen med miniatyrbilde, KI-merke og publiseringstid.' },
    { name: 'tkinter', role: 'skrivebordsvinduet som renser eller forbedrer valgte sanger på 9 språk.' },
  ],
  flow: [
    'Sangene kommer fra en temamappe eller fra Suno-flisen.',
    'ffmpeg renser hver sang og beholder originalen.',
    'ffmpeg setter sammen sangene med overtoning over et klipp i loop.',
    'Bygget skriver kapitlene, beskrivelsen og miniatyrbildet.',
    'YouTube Data API laster opp videoen med en publiseringstid.',
  ],
  links: [
    { to: 'archon', text: 'Songs-fanen i Archon tegner flisene og kjører hver av dem med kommandoen songfactory.' },
    { to: 'Suno', text: 'Suno lager sangene, og Playwright laster dem ned.' },
    { to: 'YouTube', text: 'Videoene går opp via YouTube Data API, rundt 6 om dagen.' },
    { to: 'Claude', text: 'Claude CLI skriver teksten på abonnementet uten en API-konto.' },
  ],
  features: {
    'Audio workbench':
      'Et vindu i tkinter kjører kommandoen for rensing eller forbedring på de valgte filene. En navnesjekk stopper bunken før to resultater kolliderer.',
    'Tile pipeline':
      'Hvert prosjekt lagrer de 10 flisene og innstillingene deres i en JSON-fil. En kjører gir hver flis resultatet fra den forrige, og Archon tegner flisene.',
    'Per-song videos':
      'Klippmodulen gjenbruker temaet, rensingen og koderen til en video i loop per sang. Ved behov setter ffmpeg dem sammen med rene kutt.',
    'Install and check the setup':
      'Et PowerShell-skript installerer mise, de låste verktøyene og pakkene. En sjekkmodul tester hvert krav og sier hva som må fikses.',
    'Long video from a playlist':
      'ffmpeg mikser sangene med overtoning og gjentar klippet til lydens lengde. Kodingen går via NVENC når GPU-en har det.',
    'Cleanup of AI artifacts':
      'Én filterkjede i ffmpeg setter en fast forsterkning og fjerner brumming, sus og sterk glitring. Den rensede kopien havner i en FLAC-fil ved siden av originalen.',
    'Enhance a song':
      'numpy bygger opp det øvre båndet fra båndet under. Apollo-modellen på GPU-en kan gjøre jobben i stedet, og en side viser begge spektrogrammene.',
    'Seamless loop':
      'ffmpeg spiller klippet forlengs og så baklengs før det looper. Hoppet mellom siste og første bilde blir borte.',
    'Chapters and thumbnail':
      'Kapitteltidene kommer fra sanglengdene minus overtoningene. Pillow skriver tittelen på et bilde fra klippet.',
    'Scheduled upload':
      'YouTube Data API laster opp videoen med KI-merke og en publiseringstid. Oppgaveplanlegging i Windows kjører det daglige bygget kl. 03:00.',
    'Text from Claude':
      'Claude CLI fyller tomme felt for tittel, beskrivelse og tagger ut fra sangnavnene. En fil i temamappen tar vare på svaret til neste bygg.',
    'Background from ComfyUI':
      'Verktøyet sender prompten til en ComfyUI-arbeidsflyt på den lokale GPU-en. Klippet som kommer tilbake blir bakgrunnen i loop.',
  },
};

export default arch;

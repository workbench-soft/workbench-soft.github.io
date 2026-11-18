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
  design: {
    scale: [
      'Én skaper på én Windows-PC med GPU. Den daglige kjøringen laster opp omtrent 6 videoer som mest.',
      'Hver opplasting koster omtrent 1600 av de 10 000 daglige kvoteenhetene hos YouTube, og kvoten setter taket.',
      'Den lokale GPU-en lager omtrent 5 s video i 720p per kjøring, så hver bakgrunn er en løkkeklipp.',
    ],
    data: [
      'Tilstanden er filer i temamappen: theme.toml holder innstillingene, out/upload.json markerer et tema som ferdig, og out/claude.json beholder teksten Claude skrev.',
      'Et prosjekt har de ti flisene sine i pipeline.json, hver med kind, enabled og params.',
      'Rensede sanger går til out/clean/ som FLAC, og originalene blir. Hemmeligheter ligger i en mappe utenfor repoet.',
    ],
    interfaces: [
      'CLI-en har kommandoene bg, clean, build, upload, publish, run, enhance, clips og flisekommandoer. Songs-fanen i Archon leser songfactory project og kjører songfactory tile.',
      'ffmpeg og ffprobe kjører som underprosesser, og ComfyUI får workflows/loop.json over HTTP med prompt og seed fylt inn.',
      'upload.py kaller videos.insert og thumbnails.set i YouTube Data API etter en OAuth-pålogging for skrivebordsapper.',
      'progress.py skriver linjer med step, file i/n og progress NN%, som oppstarteren gjør om til stolper.',
    ],
    reliability: [
      'upload.json skrives så snart YouTube gir tilbake video-ID-en, så et mislykket miniatyrbilde gir ikke en ny opplasting.',
      'run hopper over mapper som starter med _ eller punktum, og går videre til neste tema når ett feiler.',
      'claude.py er valgfri. En manglende CLI eller et mislykket kall skriver én linje, og temaet fortsetter med mappenavnet som tittel.',
      'En avslått flis sender inndataene videre, og en lydflis tar filene fra den nærmeste tidligere flisen som kjørte.',
    ],
    security: [
      'OAuth-tokenet til YouTube og de andre hemmelighetene ligger i en mappe utenfor repoet.',
      'claude -p kjører uten API-nøkkelvariabelen, så det belaster abonnementet det er logget inn med og ingen API-konto.',
      'Opplastinger setter containsSyntheticMedia og blir private til Google har gjennomgått prosjektet.',
    ],
    performance: [
      'h264_nvenc koder på GPU-en når PC-en har en, og libx264 tar over ellers.',
      'Klippet går i løkke med -stream_loop og ping-pong, så et klipp på 5 s dekker en lang video uten lang rendering.',
      'Rensingen er ett ffmpeg-kall med fast forsterkning, highpass, afftdn og et dynamisk kutt ved 7 kHz, uten nevral modell.',
      'En enhance på mange filer går gjennom én CLI-prosess, så den skriver én compare.html for alle sangene.',
    ],
    operations: [
      'En planlagt Windows-oppgave kjører mise run daily klokken 03:00 på PC-en som har sangene, tokenet og GPU-en.',
      'checks.yml kjører lint, tester og uv build på den selvdrevne Windows-runneren ved hver push til main.',
      'release.yml bygger wheel og sdist ved siden av Checks, og release-gate.sh publiserer når Checks består. En mislykket Checks-kjøring avbryter bygget.',
      'mise run doctor skriver én linje per forutsetning, ok eller MISSING, og som JSON for oppstarteren.',
    ],
    tradeoffs: [
      'ffmpeg på kommandolinjen i stedet for et Python-videobibliotek, så miksing, løkke og NVENC-koding ligger i ett verktøy, men filtergrafer er strenger, og en skrivefeil vises først ved kjøring.',
      'Et kort løkkeklipp i stedet for et klipp like langt som sangene, siden GPU-en lager omtrent 5 s per kjøring.',
      'Vanlige filer per tema i stedet for en database, så én fil svarer på om et tema er lastet opp, men å flytte en mappe mister koblingen til opplastingen.',
      'Den lokale Oppgaveplanleggeren i stedet for en CI-cron, siden sangene og tokenet ligger utenfor git, men PC-en må være på klokken 03:00.',
    ],
  },
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
    'ComfyStack video and robot pictures':
      'songfactory workflows sync trykker på nedlastingsknappene på comfystack.online i Playwright og lagrer hver arbeidsflyt i workflows/comfystack/, i UI- og API-format. comfy_graph.py fyller inn bildet, sangbiten og prompten etter nodetype, og pictures.py ber aspirationstyle-roboten om et omslag og går videre til neste side ved 429 eller 502.',
  },
};

export default arch;

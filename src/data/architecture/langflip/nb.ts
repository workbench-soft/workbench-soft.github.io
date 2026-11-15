import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'Langflip er ett Rust-program for Windows og macOS, uten server. En kjerne-crate avgjør hvert ord, og et tynt lag per system fanger tastene og skriver rettingen.',
  parts: [
    {
      name: 'langflip-core',
      role: 'Rust-craten med de 2 oppsettene, språkmodellen og valget mellom å beholde eller rette.',
    },
    {
      name: 'Windows-hooks',
      role: 'lavnivå-hooks for tastatur og mus ser hver tast i hver app og sender rettingen som Unicode.',
    },
    { name: 'Event tap på macOS', role: 'samme jobb på Mac, med inndatakildene for oppsettet.' },
    {
      name: 'Språkmodell',
      role: 'poeng for bokstavtripler og en ordliste per språk, laget fra wordfreq og bygd inn i exe-filen.',
    },
    { name: 'tray-icon', role: 'ikonet i systemstatusfeltet med gjeldende oppsett, og menyen på begge systemer.' },
    { name: 'rust-i18n', role: 'teksten i menyen og verktøytipset på 9 språk, bygd inn i programmet.' },
    {
      name: 'ureq og self-replace',
      role: 'sjekken etter oppdateringer på GitHub Releases, og byttet av den kjørende exe-filen.',
    },
  ],
  flow: [
    'En lavnivå-hook fanger hver tast i appen som er foran.',
    'Hooken knytter den fysiske tasten til en plass, uansett oppsett.',
    'Kjernen gir bokstavene poeng i begge oppsett med modellen.',
    'Når det andre oppsettet vinner, svelger hooken tasten.',
    'Langflip sletter ordet, skriver det i det andre oppsettet og bytter oppsett.',
  ],
  links: [
    {
      to: 'GitHub Releases',
      text: 'Exe-filen for Windows ligger der. Langflip ser etter en nyere én gang om dagen og sender bare sin egen versjon.',
    },
  ],
  design: {
    scale: [
      'En person per PC eller Mac. Teksten som skrives blir på maskinen, og hele installasjonen er én exe.',
      'Modellen dekker 2 språk, engelsk og russisk, hver med en ordbok over de 100 000 vanligste ordene og en tabell over bokstavtripler.',
      'Det finnes bare 2 faste oppsett, US QWERTY og russisk ЙЦУКЕН. Kroken må svare inne i sitt kall, så en avgjørelse tar mikrosekunder.',
    ],
    data: [
      'Innstillingene ligger i settings.toml i appdatamappen. Modellfilen er bygget inn i binærfilen.',
      'Modellfilen starter med magien LFM1, og så følger per språk et alfabet, logsannsynligheter for bokstavtripler som f32 og en ordbok.',
      'Windows-loggen holder tastetall, appnavn og avgjørelser, uten bokstaver, i filer på 1 MB som går over til langflip.old.log.',
    ],
    interfaces: [
      'Kjerne-craten tar tastposisjoner og oppsettet som er i bruk, og gir en rettelse eller ingen. Begge systemlagene kaller den.',
      'Windows bruker krokene WH_KEYBOARD_LL og WH_MOUSE_LL, SendInput for rettelsen og WM_INPUTLANGCHANGEREQUEST for oppsettet.',
      'macOS bruker en økt-CGEventTap, CGEvent-sendinger for rettelsen og Text Input Sources for oppsettet.',
      'Oppdateringssjekken leser GitHub-API-et for utgivelser én gang om dagen etter langflip-v*-merker og sender bare sin egen versjon.',
    ],
    reliability: [
      'Hendelser fra rettelsen bærer et Langflip-merke, så kroken slipper dem gjennom. Taster som trykkes under en rettelse venter og spilles av etter en sluttmarkør.',
      'Holdte taster venter opptil 500 ms på at vinduet tar det nye oppsettet, og en fastlåst rettelse slipper dem etter 1 sekund.',
      'Angre skriver ordet tilbake slik det ble skrevet, og en ny Angre på samme ord legger det i beholdlisten.',
      'Autostart er en oppføring i Run-nøkkelen, støttet av en oppgave i Oppgaveplanleggeren, i tilfelle Utforskeren hopper over Run-nøkkelen.',
    ],
    security: [
      'Ingen server og ingen konto. Det eneste nettkallet er oppdateringssjekken, og den bærer ingen tekst som er skrevet.',
      'Passordfelt og administratorvinduer hoppes over, og innstillingsfilen lister flere apper som skal hoppes over.',
      'Loggen har ingen bokstaver. Vinduer med forhøyede rettigheter ligger utenfor rekkevidde med mindre Langflip kjører som administrator, og macOS krever tilgang til Tilgjengelighet og Inndataovervåking.',
      'Byttet ved oppdatering sjekker HTTPS og filstørrelsen, uten signatur, og exe-en er usignert.',
    ],
    performance: [
      'Kjernen gir et ord poeng med et tabelloppslag på mikrosekunder, uten pause fra en søppelrydder inne i krokens kall.',
      'Fra den 4. bokstaven sjekker motoren ordet mens det skrives, så rettelsen kommer før ordet er ferdig.',
      'Modellen er innebygd, og den sorterte ordlisten lastes på omtrent 20 ms. Et sett av alle ordstarter brukte 0,4 s ved hver oppstart og tapte.',
      'caret.rs leser opptil 40 tegn før markøren gjennom UI Automation, i sin egen tråd, 40 ms etter et klikk.',
    ],
    operations: [
      'mise run lint dekker rustfmt, clippy, cargo shear, ruff, shellcheck og actionlint, og CI sjekker macOS-bygget fra Windows.',
      'mise run eval måler feilrettinger og bom på 10 000 ordbokord og 10 000 sjeldnere ord per språk.',
      'En utgivelsesflyt publiserer langflip.exe på GitHub Releases med en datoversjon sendt i LANGFLIP_VERSION.',
      'Appen ser etter en nyere utgivelse, spør først, og self-replace bytter ut exe-en som kjører. mise run install trenger ikke administratorrettigheter.',
    ],
    tradeoffs: [
      'En Rust-kjerne-crate og et tynt lag per system i stedet for én blandet crate, så kjernetestene kjører på alle OS, til en pris av at hver rettelse lages to ganger.',
      'Lavnivåkroker i Langflips egen prosess i stedet for en krok-DLL, så ingen kode lastes inn i andre apper, men vinduer med forhøyede rettigheter ligger utenfor rekkevidde.',
      'Bokstavtripler pluss en ordbok i stedet for bare en ordbok, så ukjente ord fanges opp, men et sjeldent ord kan bytte tidlig, og Angre setter det tilbake.',
      'Statiske tabeller for 2 oppsett i stedet for å lese et hvilket som helst oppsett fra systemet, så Windows og macOS gir de samme bokstavene, men andre oppsett virker ikke.',
    ],
  },
  features: {
    'Fix the layout of a word':
      'Fra 4. bokstav sammenligner kjernen de skrevne bokstavene med de samme tastene i det andre oppsettet. Modellen gir begge poeng, og en klar vinner skrives på nytt.',
    'Short words':
      'På 1 til 3 bokstaver er poengene for usikre, så kjernen sjekker bare ordlisten. Rettingen venter på mellomrom, Enter eller Tab.',
    'Digits kept':
      'Et siffer skrives likt i begge oppsett, så ordbufferen holder det på plass. Ordlisten har ord med sifre, som mp3.',
    'Undo a fix':
      'Kjernen husker det siste ordet slik det ble skrevet, og Angre skriver det tilbake. Angrer du samme ord 2 ganger, havner det på unntakslisten.',
    'Convert by hand':
      'Kjernen holder ordet du skriver eller det forrige ordet. Hurtigtasten flytter det til det andre oppsettet uten sjekk.',
    'Skip apps and fields':
      'Systemlaget sammenligner appen foran med listen i innstillingsfilen. Passordfelt og adminvinduer kjennes igjen på signaler fra systemet.',
    'The current layout on the icon':
      'Windows-laget følger bytter av vindu og fokus og leser oppsettet til vinduet foran. tray-icon tegner EN eller RU på ikonet.',
    'Pause with a click': 'Et klikk slår av rettingen, og hooken slipper hver tast gjennom. Ikonet blir grått.',
    'Switch the layout with a double click':
      'På Windows henter Langflip tilbake vinduet som var foran og ber det bytte oppsett. På Mac bytter det inndatakilde.',
    'Start at login':
      'På Windows starter en oppføring i Run-nøkkelen Langflip, og en oppgave i Oppgaveplanlegging er reserve. På Mac gjør en oppstartsagent jobben.',
    'Settings file':
      'En TOML-fil i appdatamappen har bryteren, de utelatte appene, ordene som skal stå og menyspråket. Langflip leser den på nytt ved neste vindusbytte.',
    'Go on with a word':
      'På Windows leser UI Automation ordet foran markøren etter et klikk eller et feltbytte. Kjernen regner de nye bokstavene som resten av det ordet.',
    'The app icon':
      'Én SVG er kilden til ikonet. Bygget skriver det inn i exe-filen, og installasjonsskriptet setter det på snarveiene.',
    'Install on Windows':
      'Skriptet bygger exe-filen med Cargo og kopierer den til programmappen til brukeren. Snarveiene og oppføringen i Innstillinger kommer uten adminrettigheter.',
    'Tray menu':
      'tray-icon tegner samme meny på Windows og macOS. rust-i18n gir teksten på 9 språk, etter systemspråket eller valget.',
    'Decision log':
      'Windows-laget skriver hver avgjørelse i en loggfil med antall taster, appen og grunnen. Bokstaver holdes utenfor, og ved 1 MB starter en ny fil.',
    'Update from GitHub':
      'En tråd spør GitHub om listen over utgivelser én gang om dagen med ureq. Etter et klikk sjekker den størrelse og SHA-256, og self-replace bytter den kjørende exe-filen.',
  },
};

export default arch;

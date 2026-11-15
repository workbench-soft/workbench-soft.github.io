import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'Eine Next.js-App läuft im Browser und auf Cloudflare Workers. Capacitor packt denselben Build in die Android-Apps und die iPhone-App, und die Klangmaschine läuft auf dem Gerät.',
  parts: [
    {
      name: 'Next.js und React',
      role: 'die eine Seite mit jeder Funktion, einmal vom Server gerendert und dann im Browser ausgeführt.',
    },
    {
      name: 'Klangmaschine',
      role: 'die Player und Rekorder außerhalb von React, verbunden über einen Event-Bus mit RxJS.',
    },
    { name: 'Web Workers', role: 'der Taktgeber, die Griffsuche und die Akkorderkennung abseits des Hauptthreads.' },
    { name: 'smplr und Web Audio', role: 'gesampelte General-MIDI-Instrumente mit einem Bus für Hall und Delay.' },
    { name: 'Redux Toolkit', role: 'die Einstellungen und der Zustand des Bildschirms, gespeichert im Browser.' },
    { name: 'Konva', role: 'die Canvas-Flächen für Griffbrett, Piano Roll und Tabulatur.' },
    {
      name: 'Capacitor',
      role: 'packt den statischen Build mit nativen Plugins in die Android-Apps und die iPhone-App.',
    },
    {
      name: 'Cloudflare Workers und KV',
      role: 'hosten den Server-Build über OpenNext, leiten die Songseiten weiter und halten die eingebauten Songs.',
    },
  ],
  flow: [
    'Ein Tippen, ein Akkord oder ein geladener Song legt Noten auf den Event-Bus.',
    'Ein Taktgeber im Web Worker hält Wiedergabe, Anschlag und Looper im Takt.',
    'Die Bibliothek smplr spielt jede Note durch Hall und Delay.',
    'Die Rekorder legen jede Note nach Tick für Piano Roll und MIDI ab.',
    'Songs und Texte fremder Seiten kommen über den Worker auf Cloudflare.',
  ],
  links: [
    { to: 'lumiere-player', text: 'Lumiere Player öffnet den laufenden Song über einen Link in Guitar Upscale.' },
    { to: 'keeppad', text: 'Die Phrase Hey Guitar nutzt dasselbe Schlüsselwortmodell von sherpa-onnx wie KeepPad.' },
    { to: 'Songsterr', text: 'Tabs von Songsterr kommen über den Proxy im Worker und werden zu Guitar-Pro-Dateien.' },
    { to: 'Google Play', text: 'Google Play verkauft Pro und Remove ads, und AdMob zeigt die Werbung.' },
    { to: 'Cloudflare', text: 'Cloudflare Workers hosten die Seite, und KV hält die eingebauten Songs.' },
  ],
  design: {
    scale: [
      'Ein Spieler pro Gerät, und Klang, Takt und Rekorder laufen alle auf dem Gerät.',
      'Rund 100 eingebaute Songs kommen als Guitar-Pro-Dateien, die eigenen Songs der Nutzer bleiben im Browser.',
      'Schwere Arbeit hat harte Grenzen. Ein Akkorderkennungslauf kann den wasm-Speicher auf etwa 600 MB wachsen lassen, und ein Worker-Upload bleibt unter 3 MiB.',
    ],
    data: [
      'Redux-Slices für Einstellungen, Bildschirmzustand und Piano Roll werden in localStorage gespeichert, ein Schlüssel pro Slice.',
      'Songs, Aufnahmen, Loops und Piano-Roll-Änderungen teilen eine TickTimeline aus Noten und Akkorden, nach Takt der Uhr abgelegt.',
      'Eingebaute Songs liegen in Cloudflare KV nach Dateiname, und eine song-settings.json hält die Akkordwahl je Song.',
    ],
    interfaces: [
      'Song-Seiten laufen über Worker-Routen: Songsterr-Suche und -Meta, Songdatei-Suche und -Download sowie Songtexte.',
      'Noten und Akkorde laufen über zwei RxJS-Subjects, sodass der Sender nicht weiß, wer sie spielt, aufnimmt oder animiert.',
      'Songs laden als .gp- oder MIDI-Dateien und werden genauso exportiert. Die eingebaute Liste ist songs/index.json, jeder Song ist songs-json/<name>.json mit einem Inhalts-Hash in der URL.',
    ],
    reliability: [
      'Jeder Seiten-Proxy hat ein Timeout. Eine Textsuche, die an einer ausgefallenen Seite scheitert, kommt nicht in den Cache.',
      'Ein Versionssprung bei redux-persist löscht einen unter alter Version gespeicherten Slice, und der Looper sichert seine Loops, bevor ein Wechsel von Tonleiter, Stimmung oder Kapodaster sie löscht.',
      'Eine Melodie überspringt einen Tick, der über 10 ms wartete, bis zu 8 in Folge, sodass ein langsames Rendern nach Play die erste Note nicht verzögert.',
    ],
    security: [
      'Die Besitzer-Route prüft den SHA-256 des Entwicklerschlüssels und antwortet bei Fehlern mit 404. Das GitHub-Token fürs Deploy liegt in einem Worker-Secret.',
      'CORS lässt nur die Capacitor-Ursprünge und die Seite an die Proxys, und der Server-Build sendet HSTS, nosniff und frame-ancestors none.',
      'Akkorde aus einer Audiodatei werden auf dem Gerät mit ONNX erkannt. Nur die GitHub-APK schickt eine kurze Probe an Shazam, um einen Song zu benennen.',
    ],
    performance: [
      'Der Taktgeber läuft in einem Web Worker mit Timeouts auf die genaue Zeit seit dem Start, sodass ein ausgelasteter Hauptthread den Takt nicht bremst.',
      'Ein Pool aus bis zu 4 Workern findet Griffbilder je Akkordtyp, und jede Funktion der App lädt als Lazy-Komponente.',
      'Die Akkordmodelle laden bei erster Nutzung und bleiben im Cache Storage. Der Audiokontext am Handy verlangt einen 12-ms-Puffer, weil der Hall bei 4 bis 8 ms knisterte.',
    ],
    operations: [
      'Jeder Push auf main startet Prüfungen und den Android-Build nebeneinander, und eine fehlgeschlagene Prüfung bricht den Lauf ab. Das Release erscheint, wenn beide bestehen.',
      'Ein nächtlicher Job um 19:00 Sydney-Zeit baut das Google-Play-Bundle nur bei Änderungen. Ein Bundle brauchte 40 bis 46 Minuten auf dem schweren Runner.',
      'OpenNext baut den Server für Cloudflare Workers mit eingeschalteter Observability. Releases bekommen ein Tag aus Datum und Zähler, und der GitHub-Build aktualisiert sich daran.',
    ],
    tradeoffs: [
      'Ein statischer Build für Seite, Android und iPhone statt nativer Apps, damit jede Funktion nur einmal entsteht, auf Kosten von Capacitor-Plugins für Handyklang und Käufe.',
      'Die Engine läuft außerhalb von React mit einer einfachen Kopie der Einstellungen statt überall den Store zu lesen, damit Audiocode keine Hooks braucht, auf Kosten eines Spiegels, den man synchron halten muss.',
      'Akkordmodelle laufen auf dem Gerät statt über eine Server-API, damit keine Datei das Handy verlässt, auf Kosten von 14 MB Modellen beim ersten Lauf.',
      'Gesampelte General-MIDI-Instrumente statt eines Synthesizers für echten Gitarren- und Klavierklang, auf Kosten des Ladens der Samples beim ersten Tippen.',
    ],
  },
  features: {
    Fretboard:
      'Konva zeichnet das Griffbrett auf eine Canvas aus Skala und Stimmung der Einstellungen. Ein Tippen schickt die Note auf den Event-Bus, und smplr spielt sie.',
    'Scale, tuning and capo':
      'Skalen und Stimmungen liegen als feste Daten in der App. Eine Wahl geht in den Redux Store, und Griffbrett und Griffe bauen sich neu auf.',
    Tuner:
      'Die Bibliothek pitchy liest die Tonhöhe vom Mikrofon direkt im Browser. Die App errät die Stimmung aus den leeren Saiten, und Konva zeichnet die Skala.',
    Chords:
      'Ein Pool von bis zu 4 Web Workers sucht die Griffe für Griffbrett und Kapodaster. Das Panel füllt sich Akkordtyp für Akkordtyp.',
    Strumming:
      'Jede gehaltene Akkordtaste spielt das gewählte Muster im Takt des Workers. Eigene Muster bleiben im Browser gespeichert.',
    'Song list':
      'Eingebaute Songs sind Guitar-Pro-Dateien in Cloudflare KV und werden beim Build zu JSON. Ihre Songs bleiben im Browser, und die Liste nennt die Skala jedes Songs.',
    'Voice search':
      'Im Browser hört die Speech API die Wörter, und die Android-App nutzt den Sprachdienst des Telefons. Danach spielt die App den Song aus der Liste oder sucht ihn auf den Songseiten.',
    'Hey Guitar':
      'Unter Android hört ein Schlüsselwortmodell von sherpa-onnx aus KeepPad die Phrase offline. Im Browser hört der Sprachdienst des Browsers zu, solange die Seite offen ist.',
    'MIDI recording':
      'Ein Rekorder hört den Event-Bus ab und legt jede Note nach Tick ab. Noten der App tragen eine Marke, also überspringt die Aufnahme sie.',
    Looper:
      'Jeder der bis zu 8 Kanäle nimmt im Takt des Workers vom Event-Bus auf. Loops runden auf ganze Takte und spielen im Takt.',
    Quantize:
      'Eine Länge in den Einstellungen setzt das Raster der Piano Roll. Die Rekorder setzen jede Note schon beim Eingang auf dieses Raster.',
    'Piano roll':
      'Die Piano Roll bearbeitet die gemeinsame Notenspur direkt und mit Rückgängig pro Spur. Konva zeichnet die Noten, und ein Worker errät die Songteile ohne Marken in der Datei.',
    'Tab view':
      'Ein Layoutmodul macht aus den Noten einer Spur Bünde auf Saiten. Konva zeichnet die Takte und folgt dem gemeinsamen Abspielkopf.',
    'Chord sheet':
      'Der Worker holt die Texte von Seiten für Akkorde und Liedtexte, denn diese sperren Aufrufe aus dem Browser. Die App setzt ihre Akkorde in die Tonart des Songs und legt jede Zeile zeitlich an.',
    'Song upload':
      'Leser machen aus Guitar Pro und MIDI-Dateien Noten im Browser. Eine Audiodatei sucht ihren Song auf den Songseiten, oder ONNX-Modelle hören die Akkorde auf dem Gerät.',
    'Find a song online':
      'Der Worker auf Cloudflare leitet jede Suche an die 4 Songseiten weiter, die Aufrufe aus dem Browser sperren. Die App macht aus einem Song von Songsterr eine Guitar-Pro-Datei.',
    'Chord and scale detection':
      'Ein Akkorddetektor im Web Worker gleicht die getippten Noten mit den Griffen ab. Der Skalendetektor läuft im Hauptthread und schlägt Skalen vor.',
    'Instruments and sound':
      'Die Bibliothek smplr spielt General-MIDI-Soundfonts aus freien Sample-Sets und lädt sie beim ersten Tippen. Melodie und Akkorde bekommen je ein eigenes Instrument.',
    Effects:
      'Jedes Instrument speist einen Web-Audio-Bus mit Faltungshall und Feedback-Delay. Ein Regler ändert den Bus live ohne Neuladen des Instruments.',
    'MIDI export':
      'Die Bibliothek midi-writer-js schreibt die geladenen Noten als MIDI-Datei. Ein Guitar-Pro-Writer speichert dieselben Noten als Guitar-Pro-Datei.',
    'Guitar Upscale Pro':
      'Jeder Build enthält jede Funktion. Die Android-App verbirgt die Pro-Funktionen, bis Google Play Billing auf dem Telefon den Kauf meldet.',
    'Install and offline':
      'Ein Service Worker speichert Seiten, Code und Songs für die Nutzung offline. Die Android-App trägt den statischen Build und ihre Klänge in der APK.',
    'iPhone app':
      'Capacitor packt denselben statischen Build in ein iOS-Projekt mit Plugins in Swift. StoreKit verkauft die Käufe, und AdMob zeigt Werbung nach der Tracking-Abfrage.',
    'Screen layout':
      'React-Komponenten schweben über der Canvas des Griffbretts im Vollbild. Eine Einstellung setzt die Akkorde nach links oder rechts.',
    'Play panel':
      'Ein Player geht im Takt des Workers durch die Notenspur und schickt jede Note auf den Bus. Das Akkordpanel holt seine Griffe von den Workern der Griffsuche.',
    'Easy and Pro mode':
      'Ein Filter im Player lässt bei Easy nur die Akkordereignisse durch. Ein Song ohne Akkorde spielt ganz.',
    'Song links':
      'Das Menü baut aus dem Songnamen eine Suchadresse für jede Seite. Die Seite öffnet sich in einem neuen Tab oder im Browser von Android.',
    'Built-in songs admin':
      'Die Adminseite und das Telefon des Inhabers schreiben Songs in Cloudflare KV. Die Route für das Telefon prüft einen Entwicklerschlüssel und startet einen Deploy über GitHub Actions.',
    Settings:
      'Redux Toolkit hält jede Einstellung, und redux-persist speichert sie im Browser. Die Engine liest eine einfache Kopie außerhalb von React.',
    'Android updates':
      'Der Build von GitHub fragt GitHub Releases beim Start und bei der Rückkehr nach einer neueren APK. Ein natives Plugin lädt sie und öffnet den Installer.',
    Ads: 'AdMob zeigt Banner und Vollbildwerbung in den Apps. Ein Kauf von Remove ads in Google Play oder der Entwicklerschlüssel auf dem Telefon schaltet sie ab.',
    Languages:
      'i18next hält den App-Text in 10 Katalogen und folgt der Sprache von Telefon oder Browser. Die Lernseiten entstehen je Sprache unter einem eigenen Pfad.',
  },
};

export default arch;

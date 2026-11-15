import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'Eine statische React-Seite, gebaut mit Vite, rechnet den ganzen Rechner im Browser, und Cloudflare liefert sie aus. Eine Java-App mit WebView auf Android zeigt die Live-Seite, und eine Capacitor-App auf dem iPhone trägt die Seite in sich.',
  parts: [
    { name: 'React and Vite', role: 'die Rechnerseite, beim Build mit den Standardwerten vorgerendert.' },
    {
      name: 'Regel- und Kostenmodule',
      role: 'schlichtes TypeScript mit den Steuerregeln, ihren Quellen und den Summen jeder Option.',
    },
    { name: 'localStorage', role: 'die geänderten Felder, das Design und die Sprache, nur in diesem Browser.' },
    { name: 'Service worker', role: 'ein Cache der Seiten und Dateien, damit spätere Besuche offline klappen.' },
    { name: 'i18next', role: 'die 9 Kataloge, jeder lädt, wenn die Person ihn wählt.' },
    { name: 'Cloudflare', role: 'liefert die gebauten Dateien, die Weiterleitungen und Web Analytics.' },
    {
      name: 'Android WebView app',
      role: 'Java um die Live-Seite, mit einem AdMob-Banner und einem Kauf über Google Play.',
    },
    {
      name: 'Capacitor',
      role: 'die iPhone-App mit den Seitendateien in sich, und Swift für Werbung, StoreKit und Teilen.',
    },
  ],
  flow: [
    'Cloudflare schickt die vorgerenderte Seite mit den Standardwerten.',
    'Die Seite liest die gespeicherten Felder aus localStorage.',
    'Jede Änderung rechnet den Vergleich im Browser neu und speichert die Felder.',
    'Die Seite zeigt die 3 Summen, ihre Teile und den Rechenweg.',
    'Der Service Worker speichert die Dateien für den nächsten Besuch offline.',
  ],
  links: [
    { to: 'Cloudflare', text: 'Hostet die Seite und führt ihre Weiterleitungen und Web Analytics.' },
    { to: 'Google AdSense', text: 'Automatische Anzeigen auf der Website. Die Apps laden kein AdSense.' },
    { to: 'Google Play', text: 'Das AdMob-Banner und der Kauf Werbung entfernen in der Android-App.' },
    { to: 'App Store', text: 'StoreKit verkauft Werbung entfernen in der iPhone-App, sobald sie im App Store ist.' },
  ],
  design: {
    scale: [
      'Eine Person pro Browser, 23 Eingaben auf einer Rechnerseite. Der Vergleich läuft bei jeder Änderung neu im Browser.',
      'Die Seite besteht aus statischen Dateien auf Cloudflare, daher trägt kein eigener Server des Studios die Last.',
      'Steuerstufen, FBT und Stempelsteuer sind feste Zahlen im Code, die Grenze ist also die Aktualität der Regeln, nicht die Last.',
    ],
    data: [
      'Keine Datenbank und kein Konto. Änderungen liegen als JSON in localStorage unter 3 Schlüsseln: Eingaben (mit Versionsfeld), Design und Sprache.',
      'Nur geänderte Felder werden gespeichert, daher gilt ein unberührtes Startdatum als heute, und ein Standardwert folgt Fahrzeugtyp und Regeln.',
      'Steuerstufen, FBT-Konstanten und Stempelsteuer je Bundesstaat liegen als Konstanten in src/rules, jede mit Link zur Quelle.',
    ],
    interfaces: [
      'compareOptions nimmt ein CalcInputs-Objekt und liefert einen Comparison: Kosten, Kontoverlauf und Kostenteile je Option.',
      'Die Seite spricht über window.ConsdrApp mit der Android-App: Nachrichten state, buy, privacy und devAds, Antworten als JSON.',
      'Die iPhone-App beantwortet dieselbe Brücke aus Swift, und Capacitor liefert die gebaute Seite aus der App selbst.',
      'Der Build schreibt sitemap.xml, llms.txt, ads.txt und das JSON-LD der häufigen Fragen.',
    ],
    reliability: [
      'Seiten gehen zuerst ins Netz und fallen nach 3 Sekunden oder bei einem Serverfehler auf die Kopie im Cache zurück.',
      'Bei gesperrten Websitedaten liefert Lesen null und Schreiben wird übersprungen, die Seite läuft für diesen Besuch weiter.',
      'Ein gespeicherter Wert vom falschen Typ oder ein unbekannter Auswahlwert fällt beim Laden weg. Ein Speichern in einem Tab lädt die anderen Tabs neu.',
    ],
    security: [
      'Keine Anmeldung, und die Zahlen gehen an keinen Server, die Eingaben verlassen den Browser also nie.',
      'Antwort-Header setzen frame-ancestors none, object-src none, nosniff und HSTS und sperren Kamera, Mikrofon und Standort.',
      'Der Android-Signierschlüssel ist ein CI-Geheimnis, das auf dem Runner entschlüsselt wird, und das Repo enthält keinen Schlüssel.',
      'Die Android-App fragt die Einwilligung für Werbung über das Consent-SDK von Google ab.',
    ],
    performance: [
      'Englisch steckt im Hauptskript, und jeder der 8 anderen Kataloge lädt bei der Auswahl als eigener Chunk.',
      'Der Build rendert den Rechner mit den Standardwerten vorab und lädt die lateinischen Schriften vor, damit Inhalt früh erscheint und Zahlen stillhalten.',
      'Dateien unter /assets/ tragen einen Inhalts-Hash, bekommen einen einjährigen Cache-Header und kommen im Worker zuerst aus dem Cache.',
    ],
    operations: [
      'Ein Job prüft, testet und baut, dann veröffentlicht wrangler deploy dist/ bei jedem Push auf main in Cloudflare.',
      'CI läuft auf dem eigenen Windows-Runner des Studios, daher verbraucht das private Repo keine Actions-Minuten.',
      'Ein nächtlicher Lauf um 19:00 Sydney-Zeit baut das signierte Android-Bundle für Google Play, nur wenn sich android/ geändert hat.',
      'Der Cache-Name des Service Workers hasht Dateiliste, Seitentext und Worker-Code, daher ersetzt jedes Deploy den alten Cache.',
    ],
    tradeoffs: [
      'Rechnen im Browser statt einer Server-API, damit keine Daten das Gerät verlassen und das Hosting aus statischen Dateien besteht.',
      'Auf Android ein WebView um die Live-Seite statt nativer Bildschirme, damit ein Code für Web und App reicht und ein Seiten-Deploy die App sofort erreicht.',
      'Seiten zuerst aus dem Netz statt aus dem Cache, damit ein Deploy sofort sichtbar ist, mit bis zu 3 Sekunden Wartezeit bei langsamer Verbindung.',
      'Feste Regeln im Code mit Quellen statt einer Zins-API, damit jede Zahl prüfbar ist, doch ein neues Steuerjahr braucht ein Release.',
    ],
  },
  features: {
    'Compare a lease, a loan and cash':
      'Eine schlichte TypeScript-Funktion nimmt die Felder und gibt eine Summe pro Option zurück. Sie läuft bei jeder Änderung im Browser, und kein Server sieht die Zahlen.',
    'Where the money goes':
      'Der Vergleich gibt die Teile jeder Summe neben der Summe selbst zurück. Ein Notizmodul schreibt Zeile und Formel neben jede Zahl.',
    'Lease and loan settings':
      'Das Formularmodul macht aus dem getippten Text Zahlen und speichert jede Änderung in localStorage. Ein halb getippter Wert bleibt stehen.',
    'FBT by car type and start date':
      'Ein Regelmodul wählt den FBT-Satz und die EV-Befreiung nach Autotyp, Startdatum und Preis. Jede Konstante nennt ihre Quelle.',
    'Stamp duty by state':
      'Eine Tabelle pro Bundesstaat im Regelmodul berechnet die Gebühr aus Preis, Autotyp und Startdatum.',
    'Account interest':
      'Der Vergleich führt das Konto Monat für Monat zu seinem Zinssatz, für jede Option und ohne Auto. Die Differenz ergibt die entgangenen Zinsen.',
    'Borrowing for another home':
      'Der Vergleich rechnet aus, wie viel weniger eine Bank leiht, solange das Auto abbezahlt wird. Er nutzt den APRA-Puffer von 3 Punkten über 30 Jahre.',
    'Working and sources':
      'Ein Notizmodul schreibt jeden Schritt und jede Formel neben die Zahlen. Eine Quellendatei verlinkt jede feste Zahl mit ihrer Seite.',
    'Common questions':
      'Ein Modul baut die Antworten in der aktuellen Sprache aus denselben Regeln. Die englische Fassung geht zusätzlich als JSON-LD für die Suche in die Seite.',
    'Guides and pages':
      'Ein Vite-Plugin rendert jeden Ratgeber beim Build als statisches HTML, mit Zahlen aus denselben Regeln. Es schreibt auch die Sitemap.',
    'Saved inputs and reset':
      'Die geänderten Felder gehen als JSON in localStorage. Zurücksetzen löscht sie, und die Standardwerte kommen zurück.',
    'Offline use':
      'Ein beim Build geschriebener Service Worker speichert Seiten und Dateien. Seiten fragen zuerst das Netz und nehmen nach 3 Sekunden die Kopie aus dem Cache.',
    'Colour theme':
      'Ein kleines Skript im Seitenkopf setzt das gespeicherte Design vor dem ersten Zeichnen. Die Wahl liegt in localStorage.',
    'Remove ads in the Android app':
      'Die Seite fragt die Java-App über eine Brücke, und Google Play Billing verkauft das Produkt. Die App meldet den werbefreien Zustand zurück.',
    'Which lease term costs least':
      'Eine Funktion rechnet den Vergleich einmal pro Laufzeit von 1 bis 5 Jahren. Sie führt das Konto bis Jahr 5 weiter, so decken die Laufzeiten dieselben Jahre ab.',
    'If you leave your job':
      'Ein Modul berechnet die Ablöse zum Austrittsdatum und die Kosten jedes Auswegs gegenüber dem Weiterlaufen. Es nutzt die Leasingwerte des Vergleichs.',
    Language:
      'i18next mit react-i18next lädt jeden Katalog als eigene Datei, wenn er gewählt wird. Geld bleibt in australischen Dollar.',
    Ads: 'AdSense zeigt automatische Anzeigen auf der Website. Die Apps markieren die Seite, so bleibt AdSense dort aus, und AdMob zeigt das native Banner.',
    "No ads on the developer's phone":
      'Die Android-App hält einen Entwicklerschlüssel, den der PC einmal ans Handy schickt. Damit blendet jeder Build das Banner aus.',
    'iPhone app':
      'Capacitor liefert die gebaute Seite aus der App selbst, so öffnet sie offline. Swift-Code bedient dieselbe Seitenbrücke wie die Android-App.',
    'Remove ads on the iPhone':
      'StoreKit 2 verkauft dieselbe Produkt-ID wie Google Play. Kauf wiederherstellen fragt den App Store nach früheren Käufen.',
    'Share the result':
      'Die Seite baut die Ergebniszeile mit dem Link. Die iPhone-App öffnet das Teilen-Menü von iOS, und ein Handy-Browser nutzt Web Share.',
  },
};

export default arch;

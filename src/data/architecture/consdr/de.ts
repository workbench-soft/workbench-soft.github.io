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

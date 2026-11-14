import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'Eine statische Next.js-Seite auf Cloudflare zeigt die Blitzerkarte, und Capacitor packt dieselben Dateien in die Apps für Android und das iPhone. Nativer Code in Kotlin und Swift steuert die Fahrfunktionen, und ein kleiner Worker speichert geteilte Fahrten.',
  parts: [
    {
      name: 'Blitzerdaten-Build',
      role: 'ein TypeScript-Skript in der CI, das jede Nacht die Listen der Bundesstaaten und Neuseelands zu einer JSON-Datei zusammenführt.',
    },
    {
      name: 'OpenStreetMap',
      role: 'der Punkt jedes Blitzers, die Tempolimits und die zeitlichen Limits der Schulzonen.',
    },
    { name: 'Next.js', role: 'ein statischer Export mit der Karte, den Seiten und einer Seite pro Blitzer.' },
    {
      name: 'Leaflet und MapLibre',
      role: 'Leaflet zeichnet Blitzer und Fahrten, und MapLibre malt darunter die Kacheln von OpenFreeMap.',
    },
    { name: 'Cloudflare Worker und KV', role: 'liefert die Seite aus und speichert geteilte Fahrten.' },
    {
      name: 'Capacitor und Kotlin',
      role: 'die Android-Hülle mit nativen Diensten für Tempo, Warnungen, Fahrten, Routen und Hey Spot.',
    },
    { name: 'Photon, Valhalla und TomTom', role: 'Ortssuche, Routen mit Abbiegehinweisen und der Verkehr des Tages.' },
    { name: 'Swift und StoreKit 2', role: 'die iPhone-Fassung des Fahr- und Routencodes und die Käufe im App Store.' },
  ],
  flow: [
    'Jede Nacht holt ein CI-Job die Blitzerlisten der Staaten und Neuseelands.',
    'OpenStreetMap ergänzt Punkt und Tempolimit jedes Blitzers.',
    'Next.js baut die Seite, und Cloudflare liefert sie mit der Blitzerdatei aus.',
    'Der Browser wählt das Limit der aktuellen Minute und zeichnet die Karte.',
    'Auf dem Handy liest ein nativer Dienst dieselbe Datei und warnt vor Blitzern.',
    'Fahrten bleiben auf dem Handy, bis die Person eine teilt.',
  ],
  links: [
    {
      to: 'keeppad',
      text: 'Hey Spot nutzt dasselbe Weckwortmodell wie keepPad. Eine App hält das Mikrofon für beide Sätze.',
    },
    { to: 'lumiere-player', text: 'Hey Lumi teilt sich das Mikrofon mit Hey Spot über dieselbe Weckwort-Bibliothek.' },
    {
      to: 'Google Maps',
      text: 'Start öffnet Google Maps mit den Stopps in der besten Reihenfolge, und die App warnt weiter.',
    },
    {
      to: 'Google Play',
      text: 'Play Billing verkauft Werbung entfernen und SpotTheCam Pro. AdMob zeigt das Banner in der App.',
    },
    {
      to: 'GitHub Releases',
      text: 'Jedes Release legt dort die APK ab, und der GitHub-Build aktualisiert sich daraus selbst.',
    },
  ],
  features: {
    'Camera map':
      'Der nächtliche Build macht aus den zeitlichen Limits jedes Blitzers Zeitfenster für die nächsten 35 Tage. Der Browser wählt das Fenster der aktuellen Minute.',
    'Search and filter':
      'Die Seite baut aus der Blitzerdatei einen Index der Vororte und durchsucht ihn im Browser. Kein Server ist beteiligt.',
    'Camera types':
      'Jeder Blitzer trägt seinen Typ aus der Quellliste. Der Browser merkt sich die Wahl, und die Android-App warnt nur vor den Typen auf der Karte.',
    'Follow me':
      'Die Seite dreht die Karte nach dem GPS-Kurs, solange sich die Person bewegt. MapLibre dreht die Straßenkacheln mit eigenem Winkel, so bleiben die Namen aufrecht.',
    'Camera details':
      'Das Popup liest die Blitzerdatei, die mit der Seite kommt. Jede Quelle in der Typenliste trägt den Link zu ihrer offiziellen Seite.',
    'Offline map':
      'Ein Service Worker hält die Seite, die Blitzerdatei und bis zu 500 Kartenkacheln auf dem Gerät. Ein Web-Manifest lässt den Browser sie als App installieren.',
    'Light and dark theme':
      'Das Design greift, bevor die Seite zeichnet. Ein Vektorstil gibt der dunklen Karte helle Straßen direkt im Code.',
    Languages:
      'i18next hält 9 Kataloge für die Karte und die App-Bildschirme. Android-Benachrichtigungen nehmen ihren Text aus den Android-Textdateien.',
    'Site pages and ads':
      'Next.js schreibt beim Build eine statische Seite pro Staat, Vorort und Blitzer. AdSense füllt das Banner auf der Website.',
    'Speed badge':
      'Kotlin-Code ordnet die GPS-Position den Straßen von OpenStreetMap und ihren Limits zu. Die Aktivitätsmeldungen von Android und die Formen von Gleisen und Pisten trennen Auto von Zug oder Flugzeug.',
    'Camera warnings':
      'Ein Kotlin-Dienst prüft die Blitzer vor dem Kurs und spricht etwa 20 Sekunden vorher. Die Straßenformen am Blitzer zeigen, auf welcher Seite er steht.',
    'Camera alerts stay ready':
      'Die Aktivitätsmeldungen von Android und ein Zaun von 300 m um den letzten Parkplatz starten den Fahrdienst. Ein durchsichtiger Bildschirm startet ihn nach Neustart oder Update wieder.',
    'Over the limit':
      'Die Tempolimits kommen über Overpass aus OpenStreetMap und bleiben 60 Tage auf dem Handy. Eine Kotlin-Prüfung spricht nach 5 Sekunden über dem Limit.',
    'School zones':
      'Die zeitlichen Limits in OpenStreetMap geben die Zeiten der Zone. Eine Liste der veröffentlichten Schulquartale von NSW in der App gibt die Schultage.',
    'Loud warnings':
      'Jeder Ton spielt als Alarm über den eingebauten Lautsprecher, und die App hebt die Lautstärke, bis die Worte enden. Die Schalter in den Einstellungen geben die Ausgabe zurück.',
    "Author's voice":
      'Ein offenes Sprachmodell auf einem PC hat die Warnworte aus der Stimme des Machers erzeugt. Die Aufnahmen stecken in der App, und Pro schaltet sie frei.',
    'Trip log':
      'Kotlin-Dienste zeichnen jede Fahrt und jeden Weg mit dem Tempo an jedem Blitzer auf. Die Fahrten bleiben 400 Tage im privaten Speicher der App.',
    'Trip line by limit':
      'Jeder aufgezeichnete Punkt hält das Tempo und das OpenStreetMap-Limit der Straße. Die Karte färbt jedes Stück der Linie aus diesen beiden Werten.',
    'Trip stats':
      'Die App rechnet die Werte auf dem Handy aus den Punkten der Fahrt. Ein Stück unter 20 km/h für 3 Minuten oder länger zählt als Stau.',
    'Share a trip':
      'Die App schickt eine ausgedünnte Route an einen Cloudflare Worker, der sie unter eigener ID in KV ablegt. Teilen beenden löscht sie dort.',
    Distance: 'Die Ziffern lesen die Summen, die der Fahrdienst auf dem Handy speichert. Kein Server ist beteiligt.',
    'Turn by turn routes':
      'Valhalla misst die Zeit zwischen je zwei Stopps, und die App probiert jede Reihenfolge. TomTom wählt Straßen um den Verkehr, und eine MapLibre-Navigationsbibliothek verfolgt das Auto.',
    'Route options':
      'Die Häkchen geben zu Fuß oder ohne Maut an die Routendienste weiter. Favoriten bleiben auf dem Handy, und Hey Spot erkennt sie am Namen.',
    'Hey Spot':
      'sherpa-onnx hört die Weckworte auf dem Handy ohne Netz. Der Sprachdienst von Android hört den Rest, und Photon findet die Orte.',
    'Hey Spot, what street am I on?':
      'Die App liest Namen und Limit der OpenStreetMap-Straße unter dem Auto. Die Sprachausgabe des Handys spricht sie.',
    'Screen stays on':
      'Das Android-Fenster der App bittet das System, den Bildschirm anzulassen. Das endet, sobald die App in den Hintergrund geht.',
    'Self-update':
      'Der GitHub-Build fragt GitHub Releases nach einer neueren APK und gibt sie an den Android-Installer. Der Google-Play-Build lässt den Update-Code weg.',
    'Same app on the iPhone':
      'Capacitor packt dieselbe Seite für iOS. Swift-Fassungen des Kotlin-Codes für Fahrten und Routen erledigen die native Arbeit, und StoreKit 2 verkauft Pro.',
  },
};

export default arch;

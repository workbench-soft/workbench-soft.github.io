import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'Astro baut statische Seiten, und eine Preact-App führt den Raum im Browser. Ein Cloudflare Worker liefert die Seiten aus und gibt jedem Raum ein eigenes Durable Object.',
  parts: [
    { name: 'Astro', role: 'die Seiten für Start, Spiele und Infos als statisches HTML für Suchmaschinen.' },
    { name: 'Preact', role: 'die Raum-App mit Lobby, Spielen und Chat.' },
    { name: 'Cloudflare Worker', role: 'liefert die Seiten aus und öffnet den WebSocket jedes Raums.' },
    {
      name: 'Durable Objects',
      role: 'ein Objekt pro Raumcode hält den Zustand in seinem SQLite-Speicher und führt die Timer.',
    },
    {
      name: 'Spielregeln in TypeScript',
      role: 'einfache Klassen für den Raum und die 3 Spiele, getestet ohne Cloudflare.',
    },
    {
      name: 'Gemeinsames Canvas-Modul',
      role: 'hält eine Zeichnung als Liste von Aktionen auf einem Raster von 800 mal 600.',
    },
    { name: 'Capacitor', role: 'packt dieselben Seiten mit einem AdMob-Banner in die Apps für Android und iOS.' },
  ],
  flow: [
    'Der Gastgeber erstellt einen Raum und schickt den Link.',
    'Jeder Spieler öffnet einen WebSocket zum Durable Object des Raums.',
    'Der Raum führt die Spielregeln aus und schickt jedem Spieler den Zustand.',
    'Zeichnungen reisen in Abständen von 80 ms als kleine Aktionen.',
    'Alarme beenden jede Runde, und ein leerer Raum löscht sich nach 30 Minuten.',
  ],
  links: [
    { to: 'Cloudflare', text: 'Workers Free hostet die Seiten und die Räume.' },
    { to: 'Google AdSense', text: 'AdSense zeigt das Banner auf der Website.' },
    { to: 'Google AdMob', text: 'AdMob zeigt das Banner in den Apps für Android und iOS.' },
  ],
  features: {
    'Rooms by link':
      'Der Worker ordnet jedem Raumcode ein eigenes Durable Object zu. Ein zufälliges Token im Browser steht für den Spieler, und der Raum speichert nur seinen Hash.',
    'Kids mode':
      'Die Sprachausgabe des Browsers liest jedes Wort vor. Die Kinderwortliste verbindet 80 Wörter mit einem Bild in jeder der 9 Sprachen.',
    'Guess the drawing':
      'Das Raumobjekt wählt das Wort und prüft jeden Rateversuch auf dem Server. Alarme beenden jede Runde, und die Punkte folgen der Geschwindigkeit.',
    'Drawing telephone':
      'Der Raum gibt jeden Satz und jede Zeichnung nach Zeitplan an den nächsten Spieler. Jede Geschichte landet für das Album im Speicher des Raums.',
    'Clue duel':
      'Der Raum verteilt ein gemeinsames Brett aus 12 Wörtern und 2 geheime Wörter pro Team. Der Server zählt eigene und gestohlene Wörter getrennt.',
    'Drawing tools':
      'Der Canvas-Maler macht aus jedem Strich Aktionen auf einem festen Raster. Der Raum schickt sie in Abständen von 80 ms an die anderen Spieler, und Rückgängig entfernt die letzte Aktion.',
    Languages:
      'Die Raum-App hält ihre Texte in 9 Sprachdateien, und die Wortlisten gibt es in 9 Sprachen. Astro baut die Seiten auf Englisch und Russisch.',
    Ads: 'AdSense setzt das Banner auf die Seiten der Website. In den Apps zeigt es das AdMob-Plugin für Capacitor nach dem Einwilligungsformular, wo das Gesetz es verlangt.',
    'Android and iOS apps':
      'Capacitor packt die gebauten Seiten in native Apps, die sie aus lokalen Dateien laden. Die Apps öffnen ihre Sockets beim Worker der Spiele.',
    'Party look':
      'Gemeinsames CSS setzt das nächtliche Leuchten, die hellen Pastelltöne und eine Farbe pro Spiel. Die Bewegung stoppt bei der Einstellung für reduzierte Bewegung.',
  },
};

export default arch;

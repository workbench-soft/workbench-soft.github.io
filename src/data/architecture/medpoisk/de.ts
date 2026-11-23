import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'Eine Expo-App ohne Server. Versteckte WebViews auf dem Telefon laden die Suchseite jeder Quelle, und die App liest die Preise aus dem HTML, das zurückkommt.',
  parts: [
    {
      name: 'Expo und React Native',
      role: 'die App und ihre Bildschirme über expo-router, in 9 Sprachen über i18next.',
    },
    {
      name: 'react-native-webview',
      role: 'lädt jede Suchseite unsichtbar und schickt ihr HTML an die App zurück.',
    },
    {
      name: 'node-html-parser',
      role: 'liest die Preise aus diesem HTML, mit demselben Code, den die Tests auf gespeicherten Seiten laufen lassen.',
    },
    {
      name: 'metro.json',
      role: 'ordnet jede Moskauer Metro-, МЦК- und МЦД-Station ihrem Bezirk zu.',
    },
    {
      name: 'expo-sqlite',
      role: 'speichert die Einkaufsliste auf dem Telefon.',
    },
    {
      name: 'GitHub Actions',
      role: 'prüft jeden Push, baut die signierte APK, öffnet sie auf einem Emulator und veröffentlicht das Release.',
    },
  ],
  flow: [
    'Der Einkäufer tippt einen Artikel und drückt Suchen.',
    'Ein verstecktes WebView je Quelle öffnet ihre Suchseite über die Verbindung des Telefons.',
    'Das HTML kommt zurück, und eine Parse-Funktion je Quelle macht daraus Angebote.',
    'Der Bezirksfilter und eine Sortierung nach Preis bauen eine Liste auf dem Bildschirm.',
  ],
  links: [
    {
      to: 'АптекаМос',
      text: 'Produkt- und Apothekenseiten mit Preis, Adresse und Metro jeder Apotheke.',
    },
    {
      to: 'Мегаптека',
      text: 'Eine JSON-Such-API, für Moskau mit Sortierung nach Preis abgefragt.',
    },
    {
      to: 'Wildberries',
      text: 'Produktkarten, gelesen nach der eigenen Skriptprüfung der Seite.',
    },
    {
      to: 'Ozon',
      text: 'Suchergebnisse nach bestem Bemühen, da ihre Botprüfung die strengste ist.',
    },
    {
      to: 'GitHub',
      text: 'Hält die APK-Releases, nach denen die App Updates sucht.',
    },
  ],
  design: {
    scale: [
      'Ein Einkäufer mit einem Android-Telefon in Moskau sucht wenige Artikel auf einmal.',
      'Kostenlos im Betrieb: kein Server, keine bezahlte API und keine Werbung, also läuft jede Suche auf dem Telefon.',
    ],
    data: [
      'Angebote liegen für die laufende Suche im Speicher: Produkt, Packung, Preis, Verkäufer, Adresse und Metro.',
      'Die Einkaufsliste liegt in SQLite. Die Bezirkswahl und die Sprache liegen im lokalen Speicher.',
    ],
    interfaces: [
      'Jedes Quellmodul gibt eine Such-URL und eine Parse-Funktion. Das eingefügte Skript schickt das bereinigte HTML über window.ReactNativeWebView.postMessage.',
      'Мегаптека antwortet auf ein einfaches fetch an api.megapteka.ru mit city_id 6565 für Moskau.',
    ],
    reliability: [
      'Jede Quelle scheitert für sich nach höchstens 60 Sekunden, und ihre Zeile nennt den Grund. Die anderen Quellen laufen weiter.',
      'Ein Test je Quelle lässt ihren Parser auf einer gespeicherten Seite laufen, sodass eine geänderte Seite in CI auffällt.',
    ],
    security: [
      'Die App hat kein Konto und schickt keine Daten an einen eigenen Server.',
      'Anmeldungen bei Großhändlern bleiben im Cookie-Speicher des WebView auf dem Telefon. Der Signaturschlüssel liegt in Bitwarden und in den Repo-Secrets.',
    ],
    performance: [
      'Die Quellen laden parallel, und АптекаМос liest nur die 3 Produkte, die die meisten Apotheken führen.',
      'Das eingefügte Skript entfernt Skripte und Styles, bevor es das HTML zurückschickt.',
    ],
    operations: [
      'Checks lässt Lint, Typen, knip, die Tests und ein Android-Bundle bei jedem Push auf main laufen.',
      'Release baut die signierte APK, öffnet sie auf einem Emulator gegen Abstürze und veröffentlicht sie als medpoisk-v<date>.<n>.',
    ],
    tradeoffs: [
      'Auslesen auf dem Telefon statt auf einem Server, da die russischen Quellen ausländische und Rechenzentrums-IPs sperren. Eine geänderte Seite legt ihre Quelle lahm, bis der Parser repariert ist.',
      'Ein Fenster für den Robotertest statt eines Lösers im Code, sodass der Einkäufer ihn einmal von Hand besteht.',
      'Großhandelsportale mit der eigenen Anmeldung des Einkäufers statt Großhandelspreisen in der Liste, da diese Preise sein Konto brauchen.',
    ],
  },
  features: {
    'Price search':
      'run-search.ts startet jede Quelle zugleich. HiddenPages.tsx lädt jede Seite in einem unsichtbaren WebView, und jedes Quellmodul macht aus dem HTML Angebote, nach Preis sortiert.',
    'Moscow okrugs':
      'okrug-of.ts sucht die Metrostation der Apotheke in metro.json. Eine Adresse ohne Station zählt nach ihrem Ort: Moskau bleibt unbekannt, ein anderer Ort ist Подмосковье.',
    'Site checks':
      'Jede Quelle hat einen Test, der ihre Prüfseite von einer Ergebnisseite unterscheidet. CheckSheet.tsx zeigt die Prüfung, die Cookies bleiben im gemeinsamen WebView-Speicher, und die Quelle läuft wieder versteckt.',
    'Shopping list':
      'items.ts speichert die getippten Wörter in SQLite. check-all.ts sucht jeden Artikel der Reihe nach und behält sein günstigstes Angebot in den gewählten Bezirken.',
    Distributors:
      'distributors.ts führt die Startseite jeder Firma. browser.tsx öffnet sie in einem WebView, das seine Cookies behält.',
    'Languages and updates':
      'i18n.ts schaltet i18next sofort um und merkt sich die Wahl. newer-release.ts fragt GitHub beim Start und bei der Rückkehr nach einer neueren medpoisk-APK.',
  },
};

export default arch;

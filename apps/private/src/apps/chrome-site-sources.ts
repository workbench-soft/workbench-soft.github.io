import type { PrivateApp } from '../apps.ts';
import { chromeSteps } from './chrome-steps.ts';

const pin = {
  en: 'Pin Site Sources from the puzzle icon, then click it on any page, or press Alt+Shift+S.',
  ru: 'Закрепите Site Sources через значок пазла, затем нажмите на него на любой странице или нажмите Alt+Shift+S.',
  de: 'Heften Sie Site Sources über das Puzzle-Symbol an und klicken Sie es auf einer beliebigen Seite an, oder drücken Sie Alt+Shift+S.',
  fr: 'Épinglez Site Sources depuis l’icône puzzle, puis cliquez dessus sur n’importe quelle page, ou appuyez sur Alt+Shift+S.',
  es: 'Fija Site Sources desde el icono del puzle y púlsalo en cualquier página, o pulsa Alt+Shift+S.',
  zh: '从拼图图标固定 Site Sources，然后在任意页面点它，或按 Alt+Shift+S。',
  ja: 'パズルアイコンから Site Sources を固定し、どのページでもクリックするか Alt+Shift+S を押します。',
  ko: '퍼즐 아이콘에서 Site Sources를 고정한 뒤 아무 페이지에서나 누르거나 Alt+Shift+S를 누릅니다.',
  nb: 'Fest Site Sources fra puslespillikonet, og klikk på det på en hvilken som helst side, eller trykk Alt+Shift+S.',
};

export const chromeSiteSources: PrivateApp = {
  id: 'chrome-site-sources',
  name: 'Site Sources',
  repo: 'workbench-soft/chrome-site-sources',
  asset: '^site-sources-.*\\.zip$',
  about: {
    en: 'A Chrome extension that saves the open page, its files and the original sources from its source maps as one zip.',
    ru: 'Расширение Chrome: одним нажатием сохраняет открытую страницу, её файлы и исходники из source map в один zip.',
    de: 'Eine Chrome-Erweiterung, die die offene Seite, ihre Dateien und die Originalquellen aus ihren Source Maps als ein Zip speichert.',
    fr: 'Une extension Chrome qui enregistre la page ouverte, ses fichiers et les sources d’origine de ses source maps dans un seul zip.',
    es: 'Una extensión de Chrome que guarda la página abierta, sus archivos y las fuentes originales de sus source maps en un solo zip.',
    zh: '一个 Chrome 扩展：把当前页面、它的文件以及 source map 里的原始源码保存为一个 zip。',
    ja: '開いているページとそのファイル、ソースマップの元のソースを 1 つの zip に保存する Chrome 拡張機能。',
    ko: '열린 페이지와 그 파일, 소스 맵의 원본 소스를 zip 하나로 저장하는 Chrome 확장 프로그램.',
    nb: 'En Chrome-utvidelse som lagrer den åpne siden, filene og originalkildene fra kildekartene som én zip.',
  },
  steps: Object.fromEntries(
    Object.entries(chromeSteps).map(([lang, steps]) => [lang, [...steps, pin[lang as keyof typeof pin]]]),
  ) as PrivateApp['steps'],
};

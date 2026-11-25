import type { PrivateApp } from '../apps.ts';
import { chromeSteps } from './chrome-steps.ts';

export const sunoDownload: PrivateApp = {
  id: 'suno-download',
  name: 'Suno Download',
  repo: 'workbench-soft/suno-download',
  asset: '^suno-download-.*\\.zip$',
  about: {
    en: 'A Chrome extension that adds a download button to each song on suno.com and sorts the files by style and language.',
    ru: 'Расширение Chrome: кнопка скачивания у каждой песни на suno.com, файлы раскладываются по стилю и языку.',
    de: 'Eine Chrome-Erweiterung mit einem Download-Knopf an jedem Song auf suno.com, die Dateien nach Stil und Sprache ordnet.',
    fr: 'Une extension Chrome qui ajoute un bouton de téléchargement à chaque chanson sur suno.com et range les fichiers par style et par langue.',
    es: 'Una extensión de Chrome que añade un botón de descarga a cada canción de suno.com y ordena los archivos por estilo e idioma.',
    zh: '一个 Chrome 扩展：在 suno.com 的每首歌旁加一个下载按钮，并按风格和语言整理文件。',
    ja: 'suno.com の各曲にダウンロードボタンを付け、ファイルをスタイルと言語で分ける Chrome 拡張機能。',
    ko: 'suno.com의 노래마다 다운로드 버튼을 달고 파일을 스타일과 언어별로 정리하는 Chrome 확장 프로그램.',
    nb: 'En Chrome-utvidelse som gir hver sang på suno.com en nedlastingsknapp og sorterer filene etter stil og språk.',
  },
  steps: chromeSteps,
};

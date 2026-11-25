import type { Lang } from '../../../src/i18n/locales.ts';

export interface PrivateApp {
  id: string;
  name: string;
  /** owner/name on GitHub. The page links its latest release. */
  repo: string;
  /** One line on what the app does, in each language. */
  about: Record<Lang, string>;
  /** How to install it, in each language. */
  steps: Record<Lang, string[]>;
}

// The apps the page lists, in this order. A new app is one more entry.
export const apps: PrivateApp[] = [
  {
    id: 'suno-download',
    name: 'Suno Download',
    repo: 'workbench-soft/suno-download',
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
    steps: {
      en: [
        'Download suno-download-<version>.zip from the latest release and unzip it.',
        'Open chrome://extensions and turn on Developer mode.',
        'Press Load unpacked and pick the unzipped folder.',
      ],
      ru: [
        'Скачайте suno-download-<version>.zip из последнего релиза и распакуйте.',
        'Откройте chrome://extensions и включите режим разработчика.',
        'Нажмите «Загрузить распакованное» и выберите распакованную папку.',
      ],
      de: [
        'Laden Sie suno-download-<version>.zip aus der neuesten Version herunter und entpacken Sie es.',
        'Öffnen Sie chrome://extensions und schalten Sie den Entwicklermodus ein.',
        'Drücken Sie „Entpackte Erweiterung laden“ und wählen Sie den entpackten Ordner.',
      ],
      fr: [
        'Téléchargez suno-download-<version>.zip depuis la dernière version et décompressez-le.',
        'Ouvrez chrome://extensions et activez le mode développeur.',
        'Appuyez sur « Charger l’extension non empaquetée » et choisissez le dossier décompressé.',
      ],
      es: [
        'Descarga suno-download-<version>.zip de la última versión y descomprímelo.',
        'Abre chrome://extensions y activa el modo de desarrollador.',
        'Pulsa «Cargar descomprimida» y elige la carpeta descomprimida.',
      ],
      zh: [
        '从最新版本下载 suno-download-<version>.zip 并解压。',
        '打开 chrome://extensions，开启“开发者模式”。',
        '点“加载已解压的扩展程序”，选择解压后的文件夹。',
      ],
      ja: [
        '最新リリースから suno-download-<version>.zip をダウンロードして展開します。',
        'chrome://extensions を開き、デベロッパー モードをオンにします。',
        '「パッケージ化されていない拡張機能を読み込む」を押し、展開したフォルダを選びます。',
      ],
      ko: [
        '최신 릴리스에서 suno-download-<version>.zip을 내려받아 압축을 풉니다.',
        'chrome://extensions를 열고 개발자 모드를 켭니다.',
        '"압축해제된 확장 프로그램을 로드합니다"를 누르고 압축을 푼 폴더를 고릅니다.',
      ],
      nb: [
        'Last ned suno-download-<version>.zip fra den nyeste utgivelsen og pakk den ut.',
        'Åpne chrome://extensions og slå på utviklermodus.',
        'Trykk «Last inn upakket» og velg den utpakkede mappen.',
      ],
    },
  },
];

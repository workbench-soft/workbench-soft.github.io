import type { Lang } from '../../../../src/i18n/locales.ts';

/** The install steps every unpacked Chrome extension shares, after the download. */
export const chromeSteps: Record<Lang, string[]> = {
  en: [
    'Press Download and unzip the file.',
    'Open chrome://extensions and turn on Developer mode.',
    'Press Load unpacked and pick the unzipped folder.',
  ],
  ru: [
    'Нажмите «Скачать» и распакуйте файл.',
    'Откройте chrome://extensions и включите режим разработчика.',
    'Нажмите «Загрузить распакованное» и выберите распакованную папку.',
  ],
  de: [
    'Drücken Sie „Herunterladen“ und entpacken Sie die Datei.',
    'Öffnen Sie chrome://extensions und schalten Sie den Entwicklermodus ein.',
    'Drücken Sie „Entpackte Erweiterung laden“ und wählen Sie den entpackten Ordner.',
  ],
  fr: [
    'Appuyez sur « Télécharger » et décompressez le fichier.',
    'Ouvrez chrome://extensions et activez le mode développeur.',
    'Appuyez sur « Charger l’extension non empaquetée » et choisissez le dossier décompressé.',
  ],
  es: [
    'Pulsa «Descargar» y descomprime el archivo.',
    'Abre chrome://extensions y activa el modo de desarrollador.',
    'Pulsa «Cargar descomprimida» y elige la carpeta descomprimida.',
  ],
  zh: [
    '点“下载”，然后解压文件。',
    '打开 chrome://extensions，开启“开发者模式”。',
    '点“加载已解压的扩展程序”，选择解压后的文件夹。',
  ],
  ja: [
    '「ダウンロード」を押してファイルを展開します。',
    'chrome://extensions を開き、デベロッパー モードをオンにします。',
    '「パッケージ化されていない拡張機能を読み込む」を押し、展開したフォルダを選びます。',
  ],
  ko: [
    '"다운로드"를 누르고 파일의 압축을 풉니다.',
    'chrome://extensions를 열고 개발자 모드를 켭니다.',
    '"압축해제된 확장 프로그램을 로드합니다"를 누르고 압축을 푼 폴더를 고릅니다.',
  ],
  nb: [
    'Trykk «Last ned» og pakk ut filen.',
    'Åpne chrome://extensions og slå på utviklermodus.',
    'Trykk «Last inn upakket» og velg den utpakkede mappen.',
  ],
};

import type { PrivateApp } from '../apps.ts';

export const diskReorg: PrivateApp = {
  id: 'disk-reorg',
  name: 'Disk Reorg',
  // No asset: its releases carry only the source zip.
  repo: 'workbench-soft/disk-reorg',
  about: {
    en: 'Sorts, dedupes and archives folders by your own rules. It moves files to a quarantine folder and leaves each delete to you.',
    ru: 'Сортирует папки, убирает дубликаты и архивирует по вашим правилам. Файлы уходят в карантин, удаляете вы сами.',
    de: 'Sortiert, entdoppelt und archiviert Ordner nach Ihren eigenen Regeln. Dateien landen in einem Quarantäneordner, und das Löschen bleibt bei Ihnen.',
    fr: 'Trie, dédoublonne et archive des dossiers selon vos règles. Les fichiers vont en quarantaine, et chaque suppression reste à vous.',
    es: 'Ordena, deduplica y archiva carpetas según tus reglas. Mueve los archivos a una cuarentena y cada borrado queda en tus manos.',
    zh: '按你自己的规则整理、去重和归档文件夹。文件先移到隔离文件夹，删除由你决定。',
    ja: '自分のルールでフォルダーを整理、重複削除、アーカイブします。ファイルは隔離フォルダーへ移し、削除はあなたに任せます。',
    ko: '내 규칙대로 폴더를 정리하고 중복을 없애고 보관합니다. 파일은 격리 폴더로 옮기고 삭제는 직접 합니다.',
    nb: 'Sorterer, fjerner duplikater og arkiverer mapper etter dine egne regler. Filer flyttes til karantene, og hver sletting er opp til deg.',
  },
  steps: {
    en: [
      'Press Download and unzip the file.',
      'Copy config.example.json to %USERPROFILE%\\.config\\disk-reorg\\config.json and put your folders and rules in it.',
      'In the unzipped folder run mise run install, then mise run reorg -- inbox --dry-run.',
    ],
    ru: [
      'Нажмите «Скачать» и распакуйте файл.',
      'Скопируйте config.example.json в %USERPROFILE%\\.config\\disk-reorg\\config.json и впишите туда свои папки и правила.',
      'В распакованной папке запустите mise run install, затем mise run reorg -- inbox --dry-run.',
    ],
    de: [
      'Drücken Sie „Herunterladen“ und entpacken Sie die Datei.',
      'Kopieren Sie config.example.json nach %USERPROFILE%\\.config\\disk-reorg\\config.json und tragen Sie Ihre Ordner und Regeln ein.',
      'Führen Sie im entpackten Ordner mise run install aus, dann mise run reorg -- inbox --dry-run.',
    ],
    fr: [
      'Appuyez sur « Télécharger » et décompressez le fichier.',
      'Copiez config.example.json vers %USERPROFILE%\\.config\\disk-reorg\\config.json et mettez-y vos dossiers et vos règles.',
      'Dans le dossier décompressé, lancez mise run install, puis mise run reorg -- inbox --dry-run.',
    ],
    es: [
      'Pulsa «Descargar» y descomprime el archivo.',
      'Copia config.example.json en %USERPROFILE%\\.config\\disk-reorg\\config.json y pon ahí tus carpetas y reglas.',
      'En la carpeta descomprimida ejecuta mise run install y luego mise run reorg -- inbox --dry-run.',
    ],
    zh: [
      '点“下载”，然后解压文件。',
      '把 config.example.json 复制到 %USERPROFILE%\\.config\\disk-reorg\\config.json，填入你的文件夹和规则。',
      '在解压后的文件夹里运行 mise run install，然后运行 mise run reorg -- inbox --dry-run。',
    ],
    ja: [
      '「ダウンロード」を押してファイルを展開します。',
      'config.example.json を %USERPROFILE%\\.config\\disk-reorg\\config.json にコピーし、フォルダーとルールを書き込みます。',
      '展開したフォルダーで mise run install、次に mise run reorg -- inbox --dry-run を実行します。',
    ],
    ko: [
      '"다운로드"를 누르고 파일의 압축을 풉니다.',
      'config.example.json을 %USERPROFILE%\\.config\\disk-reorg\\config.json으로 복사하고 폴더와 규칙을 적습니다.',
      '압축을 푼 폴더에서 mise run install, 그다음 mise run reorg -- inbox --dry-run을 실행합니다.',
    ],
    nb: [
      'Trykk «Last ned» og pakk ut filen.',
      'Kopier config.example.json til %USERPROFILE%\\.config\\disk-reorg\\config.json og legg inn mappene og reglene dine.',
      'Kjør mise run install i den utpakkede mappen, deretter mise run reorg -- inbox --dry-run.',
    ],
  },
};

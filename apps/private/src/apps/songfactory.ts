import type { PrivateApp } from '../apps.ts';

export const songfactory: PrivateApp = {
  id: 'songfactory',
  name: 'Songfactory',
  // No asset: the source zip holds install.ps1, which sets up the rest.
  repo: 'workbench-soft/songfactory',
  about: {
    en: 'Turns a folder of songs into a long looping YouTube video and uploads it, and can restore the sound of MP3 songs.',
    ru: 'Превращает папку песен в длинное зацикленное видео для YouTube и загружает его, а ещё восстанавливает звук MP3.',
    de: 'Macht aus einem Ordner mit Songs ein langes, geloopte YouTube-Video und lädt es hoch. Es kann auch den Klang von MP3s wiederherstellen.',
    fr: 'Transforme un dossier de chansons en une longue vidéo YouTube en boucle et la met en ligne. Il restaure aussi le son des MP3.',
    es: 'Convierte una carpeta de canciones en un vídeo largo en bucle para YouTube y lo sube. También restaura el sonido de los MP3.',
    zh: '把一个文件夹的歌曲做成一段循环的长 YouTube 视频并上传，还能修复 MP3 的音质。',
    ja: '曲のフォルダーをループする長い YouTube 動画にしてアップロードします。MP3 の音質の復元もできます。',
    ko: '노래 폴더를 반복되는 긴 YouTube 영상으로 만들어 올리고, MP3의 음질도 되살립니다.',
    nb: 'Gjør en mappe med sanger om til en lang YouTube-video i loop og laster den opp. Den kan også gjenopprette lyden i MP3-filer.',
  },
  steps: {
    en: [
      'Press Download and unzip the file.',
      'In the unzipped folder run: powershell -ExecutionPolicy Bypass -File install.ps1',
      'Run mise run setup for YouTube, ComfyUI and the daily task.',
    ],
    ru: [
      'Нажмите «Скачать» и распакуйте файл.',
      'В распакованной папке запустите: powershell -ExecutionPolicy Bypass -File install.ps1',
      'Запустите mise run setup, чтобы настроить YouTube, ComfyUI и ежедневную задачу.',
    ],
    de: [
      'Drücken Sie „Herunterladen“ und entpacken Sie die Datei.',
      'Führen Sie im entpackten Ordner aus: powershell -ExecutionPolicy Bypass -File install.ps1',
      'Führen Sie mise run setup für YouTube, ComfyUI und die tägliche Aufgabe aus.',
    ],
    fr: [
      'Appuyez sur « Télécharger » et décompressez le fichier.',
      'Dans le dossier décompressé, lancez : powershell -ExecutionPolicy Bypass -File install.ps1',
      'Lancez mise run setup pour YouTube, ComfyUI et la tâche quotidienne.',
    ],
    es: [
      'Pulsa «Descargar» y descomprime el archivo.',
      'En la carpeta descomprimida ejecuta: powershell -ExecutionPolicy Bypass -File install.ps1',
      'Ejecuta mise run setup para YouTube, ComfyUI y la tarea diaria.',
    ],
    zh: [
      '点“下载”，然后解压文件。',
      '在解压后的文件夹里运行：powershell -ExecutionPolicy Bypass -File install.ps1',
      '运行 mise run setup，设置 YouTube、ComfyUI 和每日任务。',
    ],
    ja: [
      '「ダウンロード」を押してファイルを展開します。',
      '展開したフォルダーで実行します: powershell -ExecutionPolicy Bypass -File install.ps1',
      'mise run setup を実行して YouTube、ComfyUI、毎日のタスクを設定します。',
    ],
    ko: [
      '"다운로드"를 누르고 파일의 압축을 풉니다.',
      '압축을 푼 폴더에서 실행합니다: powershell -ExecutionPolicy Bypass -File install.ps1',
      'mise run setup을 실행해 YouTube, ComfyUI, 매일 작업을 설정합니다.',
    ],
    nb: [
      'Trykk «Last ned» og pakk ut filen.',
      'Kjør i den utpakkede mappen: powershell -ExecutionPolicy Bypass -File install.ps1',
      'Kjør mise run setup for YouTube, ComfyUI og den daglige oppgaven.',
    ],
  },
};

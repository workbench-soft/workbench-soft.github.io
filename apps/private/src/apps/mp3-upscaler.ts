import type { PrivateApp } from '../apps.ts';

export const mp3Upscaler: PrivateApp = {
  id: 'mp3-upscaler',
  name: 'MP3 Upscaler',
  repo: 'workbench-soft/mp3-upscaler',
  asset: '^mp3-upscaler-.*-windows\\.zip$',
  about: {
    en: 'A Windows app that restores an MP3: it fills the band the encoder cut, lowers the AI hiss and writes a FLAC, a 320 kbps MP3 and a compare page.',
    ru: 'Приложение для Windows, которое восстанавливает MP3: возвращает срезанные кодеком частоты, убирает шипение ИИ и сохраняет FLAC, MP3 320 кбит/с и страницу для сравнения.',
    de: 'Eine Windows-App, die ein MP3 wiederherstellt: Sie füllt das vom Encoder abgeschnittene Band, senkt das KI-Rauschen und schreibt ein FLAC, ein MP3 mit 320 kbit/s und eine Vergleichsseite.',
    fr: 'Une appli Windows qui restaure un MP3 : elle comble la bande coupée par l’encodeur, réduit le souffle de l’IA et écrit un FLAC, un MP3 à 320 kbit/s et une page de comparaison.',
    es: 'Una app de Windows que restaura un MP3: rellena la banda que cortó el codificador, baja el siseo de la IA y escribe un FLAC, un MP3 a 320 kbps y una página para comparar.',
    zh: '一个修复 MP3 的 Windows 应用：补回编码器切掉的频段，降低 AI 嘶声，并生成 FLAC、320 kbps MP3 和对比页面。',
    ja: 'MP3 を復元する Windows アプリ。エンコーダーが削った帯域を補い、AI のヒスノイズを下げ、FLAC、320 kbps の MP3、比較ページを書き出します。',
    ko: 'MP3를 복원하는 Windows 앱. 인코더가 잘라 낸 대역을 채우고 AI 잡음을 줄여 FLAC, 320kbps MP3, 비교 페이지를 만듭니다.',
    nb: 'En Windows-app som gjenoppretter en MP3: den fyller båndet koderen kuttet, demper AI-suset og skriver en FLAC, en MP3 på 320 kbps og en sammenligningsside.',
  },
  steps: {
    en: [
      'Press Download and unzip the file.',
      'Double click install.cmd.',
      'Open MP3 Upscaler from the desktop or the Start menu.',
    ],
    ru: [
      'Нажмите «Скачать» и распакуйте файл.',
      'Дважды щёлкните install.cmd.',
      'Откройте MP3 Upscaler с рабочего стола или из меню «Пуск».',
    ],
    de: [
      'Drücken Sie „Herunterladen“ und entpacken Sie die Datei.',
      'Doppelklicken Sie auf install.cmd.',
      'Öffnen Sie MP3 Upscaler über den Desktop oder das Startmenü.',
    ],
    fr: [
      'Appuyez sur « Télécharger » et décompressez le fichier.',
      'Double-cliquez sur install.cmd.',
      'Ouvrez MP3 Upscaler depuis le bureau ou le menu Démarrer.',
    ],
    es: [
      'Pulsa «Descargar» y descomprime el archivo.',
      'Haz doble clic en install.cmd.',
      'Abre MP3 Upscaler desde el escritorio o el menú Inicio.',
    ],
    zh: ['点“下载”，然后解压文件。', '双击 install.cmd。', '从桌面或“开始”菜单打开 MP3 Upscaler。'],
    ja: [
      '「ダウンロード」を押してファイルを展開します。',
      'install.cmd をダブルクリックします。',
      'デスクトップかスタート メニューから MP3 Upscaler を開きます。',
    ],
    ko: [
      '"다운로드"를 누르고 파일의 압축을 풉니다.',
      'install.cmd를 두 번 클릭합니다.',
      '바탕 화면이나 시작 메뉴에서 MP3 Upscaler를 엽니다.',
    ],
    nb: [
      'Trykk «Last ned» og pakk ut filen.',
      'Dobbeltklikk på install.cmd.',
      'Åpne MP3 Upscaler fra skrivebordet eller Start-menyen.',
    ],
  },
};

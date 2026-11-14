import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'NAS の Docker で動く .NET の同期サービスが、各写真の撮影日を LiteDB のインデックスに書き込みました。Windows のトレイにいる WPF アプリがそのインデックスを日付で引き、NAS からファイルを開きました。',
  parts: [
    { name: '.NET', role: 'NAS のサービスと Windows アプリに共通のプラットフォーム。' },
    { name: 'Docker', role: 'NAS の写真アーカイブの横で同期サービスを動かしました。' },
    { name: 'LiteDB', role: '撮影日のインデックスで、ギャラリーが 1 日ずつ読みました。' },
    { name: 'WPF', role: 'Windows のトレイアイコン、ギャラリー、写真ウィンドウ。' },
    { name: 'Quartz', role: '毎日のリマインダーを起動するスケジューラー。' },
  ],
  flow: [
    'NAS の同期サービスが各写真の EXIF を読みました。',
    '撮影日を LiteDB のインデックスに書き込みました。',
    '1 日 1 回、Windows の通知がギャラリーへ呼びかけました。',
    'ギャラリーがインデックスでその期間の写真を探しました。',
    '写真アーカイブから直接ファイルを開きました。',
  ],
  links: [{ to: 'memories', text: 'スマホアプリがこれに代わり、「この日の思い出」の考え方を受け継ぎました。' }],
  features: {
    Tray: 'WPF のウィンドウがシステムトレイに常駐します。クリックかトレイのメニューでギャラリーが開きます。',
    'Daily reminder': 'Quartz のジョブがボタン付きの Windows 通知を出します。ボタンでギャラリーが開きます。',
    'Gallery by period':
      'ギャラリーが期間の各日について LiteDB のインデックスを開きます。ごみ箱のファイルは飛ばし、残りはスクロールに合わせて読み込みます。',
    'Photo window': 'WPF のウィンドウが写真を 1 枚大きく見せます。キー 1 つで期間内の次か前のファイルへ移ります。',
    'Details and map': 'アプリが写真ファイルからカメラの情報を読み、撮影地を地図に示します。',
    Send: '選んだファイルを 1 回の操作で別のアプリに送ります。',
  },
};

export default arch;

import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'サーバーを持たない Manifest V3 の Chrome 拡張です。ポップアップが保存を始め、service worker が進め、隠れた offscreen ページがファイルを取得して zip を作ります。',
  parts: [
    { name: 'ポップアップ', role: 'ホスト、ダウンロードボタン、バーを出し、保存された状態から描き直します。' },
    {
      name: 'Service worker',
      role: 'タブごとに 1 つの保存を進め、ページにスクリプトを入れ、zip を Chrome のダウンロードに渡します。',
    },
    { name: 'ページスクリプト', role: '各フレームで動き、HTML とページが読み込んだ各 URL を返します。' },
    {
      name: 'Offscreen ドキュメント',
      role: 'ファイルを見つけ、取得し、zip にします。blob URL を作れるのはページだけだからです。',
    },
    { name: 'fflate', role: 'zip を組み、画像とフォントはそのまま入れます。' },
    { name: 'chrome.storage.session', role: '各保存の状態を持ち、開き直したポップアップにも見せます。' },
    { name: 'chrome.i18n', role: 'ポップアップの文と拡張の名前を 9 言語で出します。' },
    { name: 'Vite', role: 'service worker、ポップアップ、offscreen ページをバンドルします。' },
  ],
  flow: [
    '利用者がポップアップのダウンロードを押します。',
    'service worker がタブの各フレームにスクリプトを入れます。',
    'スクリプトは HTML とページが読み込んだ URL を返します。',
    'offscreen ページが source map とスタイルシートから追加のファイルを見つけ、取得します。',
    '件数はセッションストレージを通じて 100 ms ごとにポップアップへ届きます。',
    'Chrome のダウンロードが zip をダウンロードフォルダーに保存します。',
  ],
  links: [],
  features: {
    'Download from the popup':
      'ポップアップはタブを service worker に渡し、保存はそちらが単独で進めます。状態はセッションストレージにあるので、ポップアップを閉じても続きます。',
    'Progress bar':
      'offscreen ページが先にファイルを見つけるので、合計は変わりません。完了と失敗の件数を 100 ms ごとに送り、ポップアップはそれで描き直します。',
    'One zip':
      'fflate はライブの HTML と各ファイルを、サーバーのパスのままホストごとのフォルダーに入れます。Chrome のダウンロードがホストと時刻を名前に付けて保存します。',
    'Original sources':
      'offscreen ページは各スクリプトとスタイルシートの source map を読みます。map の中の元のファイルは zip 内のそれぞれのフォルダーに入ります。',
    Languages:
      'chrome.i18n は Chrome の言語でカタログを選びます。9 つのカタログがポップアップの文、名前、説明を持ちます。',
  },
};

export default arch;

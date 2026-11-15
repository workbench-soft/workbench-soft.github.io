import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'Rust で書いた 1 つの Cloudflare Worker が Astro の静的ページと API を配信します。D1 が予約と設定を、R2 が写真を持ちます。',
  parts: [
    { name: 'Astro', role: '静的ページ、head タグ、サイトマップを作ります。' },
    { name: 'Rust Worker', role: '写真、予約、ログイン、ギャラリー、カレンダーフィードの API に応えます。' },
    { name: 'booking-core', role: '空き時間、日の入り、iCal のテキストを計算する Rust のクレート。' },
    { name: 'D1', role: '写真の一覧、予約、ギャラリー、設定、ログインのセッションを持ちます。' },
    { name: 'R2', role: '縮小した写真、ギャラリーのファイル、アップロードしたフォントを持ちます。' },
    { name: 'Email Routing', role: 'Alina に予約と質問を、管理者にログインリンクを送ります。' },
    { name: 'ブラウザーのスクリプト', role: '本人の端末で写真を縮小、編集し、透かしを入れ、zip も作ります。' },
    { name: 'Google カレンダー', role: '非公開の iCal アドレスで予定のある時間を示し、予約フィードも読み込みます。' },
  ],
  flow: [
    'お客さまがページを開き、Worker が静的 HTML を返します。',
    'ページが Worker の API に写真や空き時間を尋ねます。',
    'Worker が D1 と Alina のカレンダーを読み、booking-core が空き時間を出します。',
    '新しい予約は D1 に入り、カレンダーファイル付きで Alina にメールが届きます。',
    '写真は R2 から 2 つのサイズで読み込まれます。',
  ],
  links: [
    {
      to: 'Google Calendar',
      text: '予定のある時間を iCal で読み、5 分キャッシュします。非公開フィードが各予約を返します。',
    },
    { to: 'Cloudflare', text: 'Worker、D1、R2、Email Routing、フォームの回数制限を動かします。' },
    { to: 'GitHub', text: 'main のチェックが通るとリリースが D1 のマイグレーションとデプロイを行います。' },
  ],
  features: {
    Portfolio:
      'ページは Worker から写真の一覧を読み、Worker は D1 から取り出します。各写真は R2 から 800 px と 2400 px の 2 つの WebP サイズで届きます。',
    Booking:
      'Rust の booking-core が、Alina の営業時間、D1 の予約、カレンダーの予定から空き時間を出します。日の入りからゴールデンアワーに印を付けます。',
    Questions:
      'フォームは Worker に送られ、Worker が Cloudflare Email Routing で Alina にメールします。Alina はそのメールからお客さまに返信します。',
    Admin:
      'Worker がログインリンクをメールで送り、セッションを D1 に持ちます。写真はブラウザーで 2400 px に縮み、GPS 情報を消してから R2 に上がります。',
    'Calendar sync':
      'Worker は Alina の Google カレンダーの非公開 iCal アドレスを読み、5 分キャッシュします。非公開フィードと予約メールのファイルが予約をカレンダーに戻します。',
    Fonts:
      '10 書体はサイトに同梱され、アップロードした書体は R2 に入ります。Worker は D1 の選択からテーマのスタイルシートを出し、1 分キャッシュします。',
    'Client galleries':
      'ブラウザーがアップロード前に各プルーフに透かしを描き、R2 がプルーフと元データを持ちます。お客さまのブラウザーが client-zip で元データの zip を作ります。',
    Search:
      'Astro がビルド時に各ページへタイトル、説明、写真カード、構造化データを書きます。サイトマップはビルドしたページから作られます。',
  },
};

export default arch;

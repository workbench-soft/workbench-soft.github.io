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
  design: {
    scale: [
      '写真家 1 人のスタジオサイトで、客は予約してギャラリーを開き、Alina が管理画面を使います。トラフィックは小さいです。',
      '写真は 2400 px と 800 px の 2 サイズで保存し、25 MB のカメラファイルは 1 MB 未満でアップロードされます。',
      'Worker の 1 リクエストの CPU は数ミリ秒で、wasm ビルドは約 2.5 MB のため、重い処理はブラウザに回しました。',
    ],
    data: [
      'D1 には photos、bookings、settings、sessions、login_links、galleries、gallery_files があります。時刻は UTC の文字列なので、文字列の順が時刻の順です。',
      'settings の行はバージョンなしの JSON です。読めなくなった行は既定値に戻り、エラーを記録します。',
      'R2 には p/<id>/l.webp と s.webp の写真、アップロードしたフォント、g/<gallery>/ 下のギャラリーファイル（見本、160 px のサムネイル、原本）があります。',
    ],
    interfaces: [
      'Worker は /api で日、枠、予約、写真、ギャラリー、サインインの JSON を返し、/calendar/<token>.ics でカレンダーフィードを出します。',
      '入力のカレンダーは Alina の秘密の iCal アドレスで、5 分キャッシュします。出力は予約フィードで、予約メールには booking.ics も付きます。',
      'メールは Email Routing の send_email バインディングから、Alina の確認済みアドレスにだけ送ります。',
      'booking-core は枠、予約の再確認、日没時刻、iCal を扱う Rust クレートで、繰り返しの予定には rrule クレートを使います。',
    ],
    reliability: [
      '予約の POST は枠がまだ空いているかを再確認するので、一覧を読み込んだ後に埋まった枠は断られます。',
      '購読したカレンダーフィードは数時間遅れるので、予約メールには iCal ファイルも付けます。',
      '期限切れのセッションとログインリンクは D1 から削除し、保存済みのテストが今日の settings 行を読めることを保ちます。',
      'リリースは D1 を移行してからデプロイし、Cloudflare のタイムアウトでは移行とデプロイにそれぞれ 3 回試します。',
    ],
    security: [
      'サインインはメールで届く 15 分有効のリンクです。メールスキャナーが GET リンクを開くので、リンク先はトークンを POST するページです。',
      'セッションは HttpOnly、SameSite Lax の cookie で 30 日続き、D1 にはトークンのハッシュだけを保存します。',
      'Workers のレート制限バインディングが、予約とメール送信のフォームで IP ごとに 1 分 5 回までに制限します。',
      'ギャラリー ID はリンクのハッシュにあるので、サーバーログや referrer に残りません。リンクを知る人はギャラリーを見られます。',
    ],
    performance: [
      'ブラウザがアップロード前に写真を 2 サイズに縮小するので、25 MB のファイルが 1 MB 未満で上がり、GPS データも消えます。',
      'client-zip がギャラリーの zip をブラウザで作ります。Worker は CPU の制限内で数 GB を読めないからです。',
      'ページは Worker が返す静的な Astro の HTML で、カレンダーの文面は 5 分キャッシュします。',
    ],
    operations: [
      '1 つの Worker がページと API を返します。worker-build が Rust を wasm にし、mise が Rust、Node、pnpm を固定します。',
      'main で Checks が通ると workflow_run でリリースが始まり、1 回に 1 つずつ、ビルド、D1 移行、デプロイ、タグの順に進みます。',
      '移行は migrations/ の番号付き SQL ファイルです。lint は oxlint、oxfmt、tsc、knip、rustfmt、PC 向けと wasm 向けの clippy、cargo shear を含みます。',
    ],
    tradeoffs: [
      'GitHub Pages と Worker の組み合わせではなく 1 つの Worker でページと API を出し、管理用 cookie が 1 つのオリジンで CORS なしで動きます。',
      'パスワードや Cloudflare Access ではなくメールリンクでサインインし、Alina が忘れるパスワードがなく、Zero Trust の設定も要りません。',
      'Google カレンダー API ではなく iCal の入出力にして、OAuth アプリ、審査、トークン更新が要りませんが、フィードは数時間遅れます。',
      'CPU が足りない Worker ではなくブラウザで縮小、透かし、zip を行い、見本は原本がないと透かしを付け直せません。',
    ],
  },
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

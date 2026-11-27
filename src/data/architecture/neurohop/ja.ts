import type { Arch } from '../types';

const arch: Arch = {
  summary:
    '1つの Expo アプリがサイト、Android アプリ、iOS アプリを兼ねます。Rust 製の Cloudflare Worker が、1つのドメインでサイト、R2 の遊びのデータ、管理 API を配信します。',
  parts: [
    { name: 'Expo と React Native', role: 'カタログ、遊びのページ、設定、管理画面。9言語に対応。' },
    {
      name: 'Rust Worker',
      role: 'Web エクスポート、R2 からの /content/*、管理とプレミアムの遊び向けの /api/* を配信。',
    },
    { name: 'Cloudflare R2', role: 'index.json、遊びごとの JSON ファイル、WebP の画像を保存。' },
    { name: 'Workbench アカウント', role: 'プレミアムの遊びを開き広告を隠す共通サブスクリプションを確認。' },
    { name: 'AdMob と AdSense', role: 'アプリとサイトのバナー。' },
  ],
  flow: [
    'アプリがリストとカードを含む /content/index.json を読み込みます。',
    '検索と絞り込みは端末上で動き、リクエストを送りません。',
    'カードは /content/games/<id>.json を開き、プレミアムの遊びは Google ID トークン付きで /api/premium/<id> を開きます。',
    '管理画面での書き込みが index.json を作り直し、エッジキャッシュから消します。',
  ],
  links: [
    { to: 'Cloudflare', text: 'Workers、R2、エッジキャッシュ。' },
    {
      to: 'account.workbench-soft.com',
      text: 'Google アカウントに Workbench のサブスクリプションがあるかを答えます。',
    },
    { to: 'Google Play', text: 'Android アプリで Workbench プランを販売します。' },
    { to: 'GitHub', text: '署名済み APK のリリースを workbench-soft.github.io に置きます。' },
  ],
  design: {
    scale: [
      '保護者と専門家、主にロシア語話者が、一度にいくつかの遊びを読みます。',
      '数百の遊びのカタログが、端末が絞り込む1つのインデックスファイルに収まります。',
    ],
    data: [
      '各遊びは年齢、機能単位、目的、各項目を持つ JSON ファイルです。リストは index.json にあります。',
      'プレミアムの遊びは R2 の premium/ にあり、公開パスの外です。',
    ],
    interfaces: [
      'GET /content/* が R2 のファイルを返します。/api/premium/<id> は Google ID トークンを受け取ります。',
      '/api/admin/* は管理パスワードから得たトークンを受け取り、遊び、画像、リストを書き込みます。',
    ],
    reliability: [
      'アプリはインデックスと開いた各遊びのコピーを保存し、オフラインでも表示します。',
      '15秒を超えて待つリクエストは失敗とみなし、画面は読み込み中の表示ではなくエラーを出します。',
    ],
    security: [
      '管理パスワードとセッションの秘密鍵は Worker のシークレットで、Bitwarden に保管しています。',
      'Worker は account.workbench-soft.com がプランを確認してからプレミアムの遊びを読みます。',
    ],
    performance: [
      'index.json はブラウザで60秒、エッジで300秒キャッシュします。画像は1年キャッシュします。',
      '画像は名前にハッシュを含む WebP なので、新しい画像にキャッシュの削除は要りません。',
    ],
    operations: [
      'Checks は main への各プッシュで PC のランナー上で lint とテストを実行します。',
      'Release は署名済み APK をビルドし、エミュレーターで開き、neurohop-v<version> として公開します。Deploy が Worker を公開します。',
    ],
    tradeoffs: [
      'ネイティブアプリではなく、サイトとスマホで1つの Expo アプリ。各機能を一度で出せます。',
      '検索 API ではなく端末上の絞り込み。カタログ全体が小さな1ファイルに収まるためです。',
    ],
  },
  features: {
    'Catalog with filters and search':
      'catalog/ が端末上で index.json を絞り込みます。同じグループのチェックはリストを広げ、グループ同士は狭めます。画像のないカードは最初の機能単位の色になります。',
    'Game page':
      'game/ が id で遊びのファイルを読み込み、各項目を描きます。遊びごとに専用のルートがあるので、共有したリンクで開けます。',
    'Premium games':
      'Worker が Google ID トークンで account.workbench-soft.com に問い合わせ、R2 から premium/<id>.json を読みます。',
    'Free game of the week':
      'pro/free-game.ts が @workbench-soft/taste の freePick で、端末の週に合わせて遊びを選びます。Worker は同じルールを Rust で持ち、その遊びをトークンなしで返します。',
    Ads: 'ads/ がアプリで AdMob、サイトで AdSense のバナーを出し、プランが有効なら隠します。',
    'Settings and the Workbench plan':
      'pro/ にペイウォール、Google Play での購入、useEntitled() があります。サイトと iOS はサインインして、スマホで買ったプランを開きます。',
    Admin:
      'admin/ はパスワードでサインインし、/api/admin/* で遊びの編集、画像のアップロード、CSV の取り込みをします。書き込みのたびに index.json を作り直します。',
    'App icon and store listing':
      'アイコンは design/icons/ の1つの SVG から作ります。store/listing.md に Play の文面とコンソールの回答があります。',
  },
};

export default arch;

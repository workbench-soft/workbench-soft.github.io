import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'TypeScript の Cloudflare Worker が Memories の送る WebDAV メソッドに応えます。1 つの Durable Object が SQLite ストレージにファイルを保存し、無料プランで動きます。',
  parts: [
    { name: 'Cloudflare Worker', role: 'Basic ログインを確かめ、各 WebDAV リクエストを渡します。' },
    {
      name: 'Durable Object',
      role: 'ツリー全体を 1 つのストアで持ち、ファイルを 1 MB ずつ SQLite に分けて保存します。',
    },
    { name: '静的ファイル', role: 'サンプル写真を Worker と一緒に運び、起動のたびにストアを埋めます。' },
    { name: 'Python のサンプルスクリプト', role: 'EXIF の日付と GPS 付きの合成写真 42 枚と動画 2 本を描きます。' },
    { name: 'Cron トリガー', role: '毎晩 03:00 UTC にアップロード層を消します。' },
  ],
  flow: [
    'アプリが Basic ログイン付きの WebDAV リクエストを送ります。',
    'Worker がログインを確かめ、リクエストを Durable Object に渡します。',
    '読み込みはまずアップロード層を見て、次にサンプルを見ます。',
    'アプリはフォルダの一覧か、頼んだ範囲のバイトを受け取ります。',
  ],
  links: [
    { to: 'memories', text: 'Google Play の審査担当者が Memories の接続画面にこのサーバーを入力します。' },
    { to: 'Google Play', text: 'App access の説明で審査担当者にアドレスとログインを伝えます。' },
    { to: 'Cloudflare', text: '無料の Workers プランで動き、チェックが通ると CI がデプロイします。' },
  ],
  design: {
    scale: [
      'Google Play の審査担当者向けの共有デモライブラリで、写真 42 枚、動画 2 本、ログイン 1 つです。',
      '1 つの Durable Object がすべてのリクエストを受けるので、無料の Workers プランで全員が同じ 1 つのコピーを共有します。',
    ],
    data: [
      'ファイルは Durable Object の SQLite ストレージに 1 MB のチャンクで置かれ、行の上限 2 MB の下に収まります。',
      'base/ のサンプルは読み取り専用です。クライアントのアップロードとフォルダーは Uploads/ に入り、削除と移動はマーカーで記録します。',
      'JSON ファイルが各サンプルの EXIF 日付を持ち、PROPFIND はそれを更新時刻として返します。',
    ],
    interfaces: [
      'WebDAV はアプリが使う分だけです。OPTIONS、深さ 0 か 1 の PROPFIND、範囲付きの GET と HEAD、PUT、MKCOL、MOVE、DELETE があります。',
      'LOCK は 405 を返し、深さ無限の PROPFIND は 403 を返します。',
      'Worker は各リクエストを Durable Object に渡し、そこに head、範囲付き get、put、delete、list の呼び出しがあります。',
    ],
    reliability: [
      '毎日 03:00 UTC の cron が Uploads/ を消し、デモはサンプルの状態に戻ります。',
      '起動のたびに Durable Object が base/ をサンプル一覧に合わせるので、途中で止まった初期投入も直ります。',
      'PUT は 50 MB を超えると読むのをやめ、範囲付き GET は必要なチャンクだけを読み込んで 128 MB のメモリに収めます。',
    ],
    security: [
      'Basic 認証のユーザーは 1 人で、Worker のシークレットと照合します。OPTIONS はログインなしで答えます。',
      'サンプルのファイルは Worker の後ろの静的アセットなので、ログインがそれも守ります。',
      'サンプルは合成なので、実在の人物や場所は出ません。',
    ],
    performance: [
      '範囲付き GET は必要なチャンクだけを読むので、50 MB のファイルでも 100 MB のメモリは使いません。',
      'サンプルの日付は JSON ファイルから取るので、PROPFIND は EXIF を読みません。',
    ],
    operations: [
      'main への push ごとに Checks が lint、型チェック、ユニットテストを走らせ、通ったら Deploy が始まります。',
      'Deploy はサンプルをビルドし、mise 経由で wrangler deploy を実行して、コミットに日付バージョンのタグを付けます。',
      'サンプルのフォルダーと日付の一覧が食い違うか、Cloudflare のトークンがないと止まります。',
      'デプロイは 1 つずつ走り、待っている新しいものが古いものに替わります。',
    ],
    tradeoffs: [
      'R2 ではなく Durable Object の SQLite を選びました。R2 は支払いカードが要り、無料プランは Durable Object を含むからです。',
      'サンプルに直接書くのではなく、読み取り専用のサンプルの上に書き込み層を置き、リセットはプレフィックスの削除 1 回で済みます。',
      '実写ではなく合成の写真にして、見知らぬ人に実在の人や場所を見せません。',
      'Rust ではなく今は TypeScript の Worker で、先に出します。組織のスタックは workers-rs への移行を予定しています。',
    ],
  },
  features: {
    'Sample library':
      'Python スクリプトが EXIF の日付付きで写真を描き、一部に GPS を入れます。静的ファイルとして届き、起動時に Durable Object を埋めます。',
    'Sign in':
      'Worker が 1 人の Basic ユーザーを Worker のシークレットと照らし合わせます。OPTIONS はログインなしで応えます。',
    'Uploads and sorting':
      'アップロードと移動は、読み取り専用のサンプルの上にある別の層に入ります。夜の cron がその層を消し、サンプルが元に戻ります。',
  },
};

export default arch;

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

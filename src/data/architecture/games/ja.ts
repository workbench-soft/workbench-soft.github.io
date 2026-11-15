import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'Astro が静的なページを作り、Preact のアプリがブラウザで部屋を動かします。1 つの Cloudflare Worker がページを配り、部屋ごとに専用の Durable Object を割り当てます。',
  parts: [
    { name: 'Astro', role: 'トップ、ゲーム、案内のページを検索エンジン向けの静的な HTML にします。' },
    { name: 'Preact', role: 'ロビー、ゲーム、チャットを持つ部屋のアプリです。' },
    { name: 'Cloudflare Worker', role: 'ページを配り、部屋ごとの WebSocket を開きます。' },
    {
      name: 'Durable Objects',
      role: '部屋コードごとの 1 つのオブジェクトが状態を自分の SQLite に保ち、タイマーを動かします。',
    },
    { name: 'TypeScript のゲームルール', role: '部屋と 3 つのゲームの素朴なクラスで、Cloudflare なしでテストします。' },
    { name: '共有キャンバスモジュール', role: '絵を 800 × 600 のグリッド上の操作の並びとして持ちます。' },
    { name: 'Capacitor', role: '同じページを AdMob のバナー付きで Android と iOS のアプリに詰めます。' },
  ],
  flow: [
    'ホストが部屋を作ってリンクを送ります。',
    '各プレイヤーが部屋の Durable Object へ WebSocket をつなぎます。',
    '部屋がゲームのルールを動かし、各プレイヤーに状態を送ります。',
    '絵は小さな操作として 80 ミリ秒ごとに届きます。',
    'アラームが各ターンを終え、空いた部屋は 30 分後に消えます。',
  ],
  links: [
    { to: 'Cloudflare', text: 'Workers Free がページと部屋を動かします。' },
    { to: 'Google AdSense', text: 'AdSense がサイトにバナーを出します。' },
    { to: 'Google AdMob', text: 'AdMob が Android と iOS のアプリにバナーを出します。' },
  ],
  design: {
    scale: [
      '1つのルームは最大12人で、ヒントバトルは4人以上が必要です。',
      'Workers Free は1日10万リクエストで、お絵かきにすると1日約40時間分です。',
      'メッセージは256 KB、1枚の絵は3000アクションまでです。',
    ],
    data: [
      '各ルームは専用の SQLite ストレージを持つ Durable Object で、キーは meta、canvas、chain:N の3種類です。',
      'meta は変更のたびにプレイヤー、得点、設定、フェーズ、チャット、ゲーム状態を保存します。canvas は2秒に1回までです。',
      '絵は 800 × 600 のグリッド上のアクションの列です。ブラウザは wg- で始まるキーでトークンと設定を持ちます。',
    ],
    interfaces: [
      'プレイヤーごとに /games/ws/CODE へ WebSocket を1本張ります。Worker は idFromName でコードをルームのオブジェクトに結びつけます。',
      '最初のメッセージ hello は、プロトコルのバージョン、トークン、名前、色を運びます。その後に state、chat、draw が続きます。',
      'Android と iOS のアプリも同じソケットをゲームの Worker に開きます。Origin のチェックでサイトとアプリを通します。',
    ],
    reliability: [
      'Hibernation API で、使われていないルームはメモリを離れ、ソケットのメッセージかアラームがストレージから起こします。',
      'アラームがすべての締め切りを動かし、ルームが空になって30分後に片づけます。',
      'PROTOCOL の番号で、Worker は古いアプリにそのアプリの形式で答えます。切れたプレイヤーの席は、ルームが24席で埋まるまで残ります。',
    ],
    security: [
      'アカウントはありません。ブラウザがランダムなトークンを持ち、ルームはそのハッシュをプレイヤー ID として保存します。',
      'ルームのオブジェクトがお題を選んで答えを判定するので、正解はサーバーに残ります。',
      '他のサイトからのソケットは断ります。名前は20文字、チャットは1行100文字までです。',
    ],
    performance: [
      '絵は画素ではなく、小さなアクションのリストを80 msごとに送ります。',
      'Hibernation を使うと、WebSocket のメッセージ20件が1リクエストとして数えられます。',
      '静的ページは無料です。run_worker_first がルームのリンクとソケットだけを Worker のコードに通すからです。',
    ],
    operations: [
      'Worker は wrangler で出荷し、静的な dist/ フォルダとルームのオブジェクトを含みます。Games ワークフローは main への push のたびにデプロイします。',
      'mise run check は各ゲームのルールに oxlint、型チェック、Vitest をかけます。',
      'Worker の可観測性はオンです。Android アプリは Google Play のクローズドテストで配信します。',
    ],
    tradeoffs: [
      'Supabase Realtime、PartyKit、VPS ではなく hibernation 付きの Durable Objects を選び、サーバーなしで無料枠に収めました。ルームのコードは Cloudflare 向けです。',
      'Preact のシングルページアプリではなく Preact のアイランド付き Astro 静的ページにして、検索エンジンが完全な HTML を得られます。',
      '画素ではなく固定グリッド上の描画アクションにして、メッセージを小さく、取り消しを1手にしました。',
      'Trusted Web Activity や React Native ではなく Capacitor を選び、同じページをネイティブの AdMob バナー付きでアプリに載せます。',
    ],
  },
  features: {
    'Rooms by link':
      'Worker が部屋コードごとに専用の Durable Object を結び付けます。ブラウザのランダムなトークンがプレイヤーを表し、部屋はそのハッシュだけを持ちます。',
    'Kids mode':
      'ブラウザの音声合成が各単語を読み上げます。子ども向けの単語リストは 9 言語それぞれで 80 語に絵を付けています。',
    'Guess the drawing':
      '部屋のオブジェクトがお題を選び、サーバーで各回答を確かめます。アラームがターンを終え、点数は当てる速さで決まります。',
    'Drawing telephone':
      '部屋がタイマーに合わせて各文と各絵を次のプレイヤーへ渡します。各物語は部屋の保存領域に入り、アルバムで使われます。',
    'Clue duel':
      '部屋が 12 語の共通の盤とチームごとに 2 つの秘密の語を配ります。サーバーは自分のチームの語と奪った語を分けて数えます。',
    'Drawing tools':
      'キャンバスの描画器が各ストロークを固定のグリッド上の操作に変えます。部屋は 80 ミリ秒ごとに他のプレイヤーへ送り、取り消しは最後の操作を外します。',
    Languages:
      '部屋のアプリは文章を 9 つの言語ファイルに持ち、単語リストも 9 言語あります。Astro はページを英語とロシア語で作ります。',
    Ads: 'AdSense がサイトのページにバナーを置きます。アプリでは Capacitor 用の AdMob プラグインが、法律で必要な地域では同意フォームの後に表示します。',
    'Android and iOS apps':
      'Capacitor が作ったページをネイティブアプリに詰め、アプリはローカルのファイルから読み込みます。アプリはゲームの Worker に接続を開きます。',
    'Party look': '共有の CSS が夜の光、淡いパステル、ゲームごとの色を決めます。動きを減らす設定では動きが止まります。',
  },
};

export default arch;

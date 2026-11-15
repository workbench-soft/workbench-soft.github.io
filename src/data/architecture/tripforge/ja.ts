import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'Android とウェブ向けの Expo アプリが、Cloudflare 上の Rust Worker を 1 つ呼びます。Worker が外部への呼び出しと鍵を受け持ち、旅のロジックは Rust の crate にあります。',
  parts: [
    {
      name: 'Expo and React Native',
      role: 'react-native-web で、Android アプリとウェブサイトを 1 つのコードから作ります。',
    },
    { name: 'Rust Worker', role: '場所、フライト、名所、穴場のルート。どれも Workers のキャッシュの後ろにあります。' },
    { name: 'trip-core', role: '日付の幅、グループの運賃、運賃カレンダー、スポットのタグを持つ Rust の crate です。' },
    { name: 'Travelpayouts', role: '運賃と、Aviasales へのパートナーリンク。' },
    { name: 'Wikivoyage and Wikidata', role: '名所、穴場、それらにタグを付けるクラス。' },
    { name: 'Google Play', role: 'AdMob の広告と、「広告を削除」と Pro の購入。' },
  ],
  flow: [
    '場所、だいたいの日付、泊数、メンバーを入力します。',
    'アプリは Worker に場所を、次にフライトを尋ねます。',
    'Worker はキャッシュの答えを返し、足りない分を Travelpayouts、Wikivoyage、Wikidata から取ります。',
    'trip-core がグループの料金を計算し、運賃カレンダーを作ります。',
    'アプリがプラン、カレンダー、リンクを表示します。保存した旅はスマホに残ります。',
  ],
  links: [
    {
      to: 'tickalot',
      text: 'リンク 1 つで旅を双方向に渡し、共通のアカウントは要りません。Tick-a-Lot も同じ Worker から名所を読みます。',
    },
  ],
  design: {
    scale: [
      '1 人が計画する旅行は年に数回なので、負荷は小さいです。Cloudflare Workers の無料プランは 1 日 100,000 リクエストまで使えます。',
      '全員が毎分の上限つきの Travelpayouts トークンを共有するため、無料の端末は 1 日 10 回まで検索できます。Pro で解除されます。',
    ],
    data: [
      'Worker にデータベースはありません。外部からの応答は、それぞれの有効期間のあいだ Workers のキャッシュに置かれます。',
      '端末は言語の選択、検索回数、保存した旅行、購入フラグを localStorage に持ち、Android では expo-sqlite を通します。',
      '旅行は v、place、start、nights と最大 60 か所を含む JSON としてリンクの中で Tick-a-Lot に届きます。サーバーには残りません。',
    ],
    interfaces: [
      'Worker には GET のルートが 4 つあります。/places、/flights、/sights、/spots で、どれもクエリパラメーターを受け取って JSON を返します。',
      'trip-core は生の運賃を受け取り、グループ向けに計算したオファー、運賃カレンダー、リンクを返します。',
      '旅行は base64url のハッシュで Tick-a-Lot に渡り、場所と泊数のクエリ文字列として Ask 画面に戻ります。',
    ],
    reliability: [
      'キャッシュの期間は、運賃が 6 時間、場所と名所が 7 日、Wikivoyage のページが 30 日です。',
      '200 で返るエラー（MediaWiki の maxlag や Travelpayouts の success:false など）と、途中で切れた JSON の本文は、キャッシュせずに返します。',
      '/spots の呼び出しは最大 6 回で、地元版の項目が 3 件未満のときは英語版 Wikivoyage に切り替えます。',
    ],
    security: [
      'すべてのシークレットと外部呼び出しは Worker が持ちます。アプリはクレートを取り込まず、鍵も持ちません。',
      'アカウントはありません。Pro と広告のフラグは端末にあり Google Play で購入するため、アプリのデータを消すと検索回数がリセットされます。',
      'Wikidata の呼び出しは、Wikimedia の求めどおり User-Agent にアプリ名を入れます。',
    ],
    performance: [
      '外部呼び出しはすべて Workers のキャッシュの後ろにあります。読み取った Wikivoyage の項目は 30 日置かれます。ロンドンの読み取りは CPU で約 20 ms、キャッシュなら 1 ms だからです。',
      'Wikidata へのクエリ 1 回で、1 ページ分の項目の言語数とクラスが分かるので、場所ごとの呼び出しは要りません。',
      '長いリストは FlashList で描くので、画面にある行だけが描かれます。',
    ],
    operations: [
      'main への push で Checks（lint、テスト、ビルド）が始まります。Checks が通ると、Release と Deploy が workflow_run で始まります。',
      'Release は順番待ちにして、各回が直前のタグの後でバージョンを選びます。新しい Deploy は古いものを取り消します。',
      'Deploy はウェブのエクスポートと Worker を出し、どちらかのホストが応答しなければ失敗します。Rust のバージョンは固定で、Worker は wasm 向けにビルドします。',
    ],
    tradeoffs: [
      'プランナーはアプリ内の wasm ではなく Worker で動かします。Hermes は wasm を動かせないからです。代償はオフラインで計画できないことです。',
      'Duffel やスクレイピングではなく Travelpayouts のキャッシュ運賃を選びました。無料で、1 回の呼び出しでどの日が最安か分かります。代償は 2 日から 7 日前の運賃になることです。',
      '名所データの業者ではなく Wikidata と Wikivoyage を選びました。無料で、Wikipedia の言語数が知名度の指標になり、穴場を見つけられます。',
      '広告枠を増やさず、フライト画面には広告を置きません。手数料リンクの隣での誤タップはアカウント停止のおそれがあるからです。',
    ],
  },
  features: {
    Ask: 'フォームは Worker を通して各地名を調べます。Tick-a-Lot からのリンクは、そのアドレスからフォームを埋めます。',
    Flights:
      'Worker は日付の幅の月ごとに Travelpayouts に尋ね、運賃を 6 時間保持します。trip-core がグループの料金にしてリンクを付けます。',
    Places:
      'Worker は都市の近くの Wikidata の名所と Wikivoyage の掲載をまとめます。Wikidata のクラスが各スポットにタグを付け、チップはそのタグで絞り込みます。',
    'To Tickalot':
      'アプリは場所、出発日、泊数を Tick-a-Lot のリンクそのものに入れます。旅を保存するサーバーはありません。',
    Settings: 'i18next が 9 言語のカタログを持ちます。選んだ言語は Expo の SQLite でスマホに残ります。',
    Ads: 'AdMob が Android でバナーと全画面広告を出します。同意の答えと 2 つの購入から、1 つのチェックが広告ごとに判断します。',
    'Tripforge Pro':
      'Google Play Billing が商品を売り、アプリは購入の印をスマホに保存します。ロックの判断は 1 つのモジュール、上限は 1 つのファイルにあります。',
    'Website pages for search':
      'Expo はビルド時にルートと言語ごとに HTML ページを書きます。そのあとスクリプトがページの言語を設定し、404 ページとサイトマップを作ります。',
  },
};

export default arch;

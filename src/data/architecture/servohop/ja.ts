import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'GitHub Actions のポーラーが州の燃料価格データを Cloudflare D1 に書き込みます。Pages Functions が D1 を読んでアプリと検索ページに答え、1 つの Expo アプリが Android、iPhone、Web で地図を描きます。',
  parts: [
    {
      name: 'GitHub Actions のポーラー',
      role: '予定に沿って各フィードを取り、変わった価格を D1 に書きます。',
    },
    {
      name: '州の価格フィード',
      role: 'NSW FuelCheck、VIC の Servo Saver、Fuel Prices QLD、FuelWatch WA が価格を出します。',
    },
    {
      name: '充電器の情報源',
      role: 'Open Charge Map、Transport for NSW、OpenStreetMap をまとめ、各充電器を 1 回だけ出します。',
    },
    { name: 'Cloudflare D1', role: '今の価格と、毎日の履歴をつけるトリガーです。' },
    {
      name: 'Cloudflare Pages Functions',
      role: 'API でアプリに答え、検索ページとサイトマップを作ります。',
    },
    { name: 'Expo と React Native', role: 'Android、iPhone、サイトで 1 つのコードです。' },
    { name: 'MapLibre と OpenFreeMap', role: 'ブラウザとスマホの地図で、キーのいらないタイルを使います。' },
    {
      name: 'Hey Servo モジュール',
      role: 'Kotlin の Expo モジュールで、オフラインのウェイクワードのモデルと Android の音声サービスを使います。',
    },
  ],
  flow: [
    'ポーラーが州のフィードを読み、NSW、VIC、QLD は 1 時間ごとです。',
    '変わった価格だけが D1 に入り、トリガーが毎日の履歴に足します。',
    'アプリが Pages Function に地図の枠内の給油所を尋ねます。',
    'エッジのキャッシュが 5 分間は繰り返しに答え、残りは D1 が答えます。',
    'アプリが価格で各ピンに色を付け、給油所を一覧にします。',
  ],
  links: [
    {
      to: 'spotthecam',
      text: 'Hey Servo は Hey Spot の作りにならいます。1 つのアプリが各ウェイクフレーズのためにマイクを持ちます。',
    },
    {
      to: 'keeppad',
      text: 'keepPad と Lumiere は wakeshare ライブラリで同じマイクを分け合います。',
    },
    {
      to: 'Google Maps',
      text: 'ルートをタップするか Hey Servo に話すと、Google Maps のナビが開きます。',
    },
    { to: 'Google Play', text: '広告の削除と ServoHop Pro は 1 回きりの購入です。AdMob がバナーを出します。' },
    { to: 'GitHub Releases', text: 'リリースごとに APK がそこに置かれ、GitHub 版はそこから自分で更新します。' },
  ],
  design: {
    scale: [
      '端末ごとに1回のインストールでアカウントはなく、負荷はドライバーと検索エンジンによる公開価格の読み取りです。',
      '無料枠が形を決めました。1日あたり Pages 10万リクエスト、D1 書き込み10万行、1リクエスト10 ms の CPU です。',
      '地図の応答には、画面の範囲にあるスタンドを最大400件まで入れます。',
    ],
    data: [
      'D1 には station、price_now、price_daily、price_report、ev_site、ev_price があります。スタンド ID は nsw-1234 のように取得元を含みます。',
      'price_now は給油所と燃料ごとに1行です。トリガーが変更ごとに price_daily へ、その日の最安、最高、件数を加えます。',
      '端末が持つのは燃料の選択と設定だけで、価格は D1 にあります。',
    ],
    interfaces: [
      'アプリは /api 以下の JSON ルートを呼びます。地図範囲のスタンド、1件の履歴、価格報告、充電器です。',
      '同じ Functions が /fuel 以下で素の HTML を返し、検索エンジン向けにサイトマップも出します。',
      'ポーラーは WA の RSS、NSW・VIC・QLD の API、Open Charge Map、OpenStreetMap を読み、wrangler d1 execute で書き込みます。',
    ],
    reliability: [
      'キーのない取得元は飛ばすので、ジョブは緑のままで、他の州は更新されます。',
      '各 upsert は WHERE price_now.cents <> excluded.cents で終わるため、再実行しても同じ行を二度書きません。',
      '自前のランナーが止まっている間はポーリングも止まります。価格は最大5分遅れ、VIC の価格は24時間遅れで届きます。',
    ],
    security: [
      'ログインもアカウントもありません。報告者はアドレスのソルト付きハッシュで、アドレス自体ではありません。',
      '報告は価格の範囲チェックと、送信者ごとに1時間10件の上限を通ります。',
      '取得元のキーは GitHub Actions のシークレットにあり、読めるのはポーラーだけです。アプリは持ちません。',
    ],
    performance: [
      'API の応答は s-maxage=300 を持ち、アプリが範囲を小数2桁に丸めるので、近い移動は1つのキャッシュ応答を共有します。',
      '検索ページは30分、履歴は1時間、サイトマップは6時間キャッシュします。',
      '数 MB ある NSW のリストはランナーで解析します。無料の Worker は CPU が10 ms しかないためです。',
    ],
    operations: [
      'チェックは push のたびに走ります。Release は APK と Play 用バンドルを同時に作り、チェックが失敗すると取り消します。',
      'Deploy web は db/schema.sql を本番の D1 に適用してから Pages を公開します。スキーマの各文は IF NOT EXISTS です。',
      'ポーリングは cron で動きます。NSW・VIC・QLD は毎時、タスマニアは6時間ごと、WA と充電器は毎日です。',
    ],
    tradeoffs: [
      'Firebase や有料サーバーではなく Pages Functions と D1 を選び、地図の範囲を無料枠で1回の SQL にしました。',
      'ポーリングごとに1行ではなく日次の集計にして、毎時のポーリングでも書き込み上限に収めました。変更のない日は行がありません。',
      'Worker の cron ではなく GitHub Actions のポーラーにしました。NSW のリストの解析に10 msを超えるためです。',
      'Google Maps ではなく OpenFreeMap タイルの MapLibre にして、キーも請求もなくしました。代償は地図のビルドが2つになることです。',
    ],
  },
  features: {
    'Fuel prices on a map':
      'Pages Function が地図の枠内の給油所を最大 400 件 D1 から返します。アプリは画面上の価格を 3 つに分け、ピンに色を付けます。',
    'Your place on the map':
      'スマホでは expo-location が位置とコンパスの向きを出します。Web ではブラウザの位置と向きのイベントが同じ役をします。',
    'Station list': '一覧は地図と同じ答えから、同じ給油所を出します。距離はスマホからの直線です。',
    'Price history chart':
      'Pages Function が D1 から日ごとの行を読み、共通のグラフのコードが変化のない日に価格を引き継ぎます。react-native-svg が線と帯を描きます。',
    'Driver price reports':
      'アプリは報告を Pages Function に送り、範囲と送り手ごとの 1 時間の上限を調べます。価格は D1 に入ります。',
    'EV chargers':
      'ポーラーが毎日 3 つのオープンな情報源の充電器をまとめます。ドライバーの報告が各ネットワークの kWh あたりの価格を D1 に残します。',
    'Search pages':
      'Pages Functions が州、地区、給油所ごとにシンプルな HTML を作り、グラフは SVG で描きます。エッジが各ページを 30 分保ちます。',
    'Site text and guides':
      'ビルドの手順がトップページの文を書き出した HTML に入れます。ガイドは Pages Functions がリポジトリの文から出します。',
    'Self-update from GitHub':
      'アプリは GitHub Releases に新しい APK を問い合わせ、Android のインストーラーに渡します。Google Play 版は更新のコードを空の代役に差し替えます。',
    'Remove ads':
      'expo-iap が Google Play で商品を売ります。購入は Google アカウントに付くので、新しいスマホでは復元で戻ります。',
    'ServoHop Pro':
      'expo-iap が起動のたびに Pro の購入を確かめます。アプリの 1 か所の確認で 365 日のグラフが開き、広告が消えます。',
    'Area search':
      'Pages Function が 2 つの索引で給油所の表から地区や郵便番号を探します。外部のジオコーダーもキーもいりません。',
    'Hey Servo':
      'sherpa-onnx がスマホの上でウェイクフレーズを聞き、Android の音声サービスがコマンドを聞きます。答えは ServoHop の API から来ます。',
    'Fuel panel':
      '選んだ燃料が API への各呼び出しに入り、アプリは次の起動まで覚えます。充電器はいちばん強いプラグで分けます。',
    Ads: 'react-native-google-mobile-ads が同意フォームの後にアプリでバナーを出します。サイトと検索ページでは AdSense が埋めます。',
    Languages: 'i18next が 9 つのカタログを持ち、expo-localization がスマホやブラウザの言語を読みます。',
    'Links open the app':
      'app.config.ts の autoVerify 付き intentFilters が servohop.com を受け持ち、servohop.com/.well-known/assetlinks.json がそれを確かめ、src/links/site-link.ts がアドレスをルートに変換します。',
    'Open source licences':
      'ビルド時に scripts/licences.ts が package.json を読み、設定が表示する src/licences/licences.json を書き出します。',
  },
};

export default arch;

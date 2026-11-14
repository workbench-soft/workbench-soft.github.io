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
  },
};

export default arch;

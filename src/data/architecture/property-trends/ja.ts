import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'Rust のパイプラインが政府のオープンデータを静的な JSON と PMTiles のファイルに変えます。ファイルは Web ビルドと一緒に GitHub Pages に載り、1 つの Expo アプリが Web、Android、iPhone で読みます。',
  parts: [
    {
      name: 'Rust のパイプライン',
      role: '情報源を取得し、各行を ABS の地区コードに合わせ、polars で中央値を出します。',
    },
    {
      name: 'PMTiles',
      role: '地区と郵便番号の境界を 1 つの静的なタイルファイルにまとめ、パイプラインが切り分けます。',
    },
    { name: 'GitHub Pages', role: 'Web ビルドとデータファイルを無料で配信します。' },
    { name: 'Expo と React Native', role: 'Web とスマホの地図、絞り込み、カード、グラフです。' },
    {
      name: 'MapLibre と OpenFreeMap',
      role: 'ベースの地図の上に地区の境界を描き、中央値で各地区に色を付けます。',
    },
    { name: 'TanStack Query', role: '絞り込みが求める地図と地区のファイルを読み込みます。' },
    { name: 'ts-rs', role: 'Rust の構造体からデータファイルの TypeScript の型を書きます。' },
    { name: 'expo-iap と AdMob', role: 'スマホのバナー、広告の削除、Pro です。' },
  ],
  flow: [
    '毎週月曜に CI が州の売買と家賃のファイルを取得します。',
    'Rust のパイプラインが各行を地区に合わせ、中央値を出します。',
    'JSON のファイルとタイルが Web ビルドと一緒に GitHub Pages に載ります。',
    'アプリは選んだ絞り込みの地図ファイルを 1 つ読み込みます。',
    'MapLibre が各地区に色を付け、タップでカードとグラフが開きます。',
  ],
  links: [
    { to: 'realestate.com.au', text: 'カードからそこの同じ検索へ飛べます。アプリはサイトのページを読みません。' },
    {
      to: 'Australian Bureau of Statistics',
      text: '地区と郵便番号の境界と、各カードにある 2021 年国勢調査の数字です。',
    },
    { to: 'Google Play', text: '広告の削除と Property Trends Pro は Android での 1 回きりの購入です。' },
    { to: 'App Store', text: '開発者アカウントが開いたら、iPhone でも同じ購入ができます。' },
  ],
  design: {
    scale: [
      '1 つの静的サイトがすべての訪問者に応えるので、読者が増えてもスタジオの費用は増えません。',
      '売買データは VIC、NSW、SA のもので、形状ファイルは ABS の 15,358 の郊外を 53 MB の PMTiles ファイル 1 つに切り分けます。',
      'ほかの州は無料の売買データを公開していないので灰色で表示されます。',
    ],
    data: [
      'フィルターの組み合わせごとに JSON ファイルが 1 つあります。中央値はグループ間で足せないためです。売買が 5 件未満のセルには中央値がありません。',
      '形状は boundaries.pmtiles にあり、フィーチャー ID は郊外コードで、タグはありません。',
      '郊外のファイルは、種別と土地の区分ごとに期間、中央値、件数のリストを持ちます。国勢調査のファイルが Census 2021 と SEIFA の数字を足します。',
    ],
    interfaces: [
      'アプリは静的な JSON と PMTiles を HTTP の range リクエストで読み、専用の API はありません。',
      'Rust のパイプラインは、CKAN API から VIC と SA の一覧を、NSW の .DAT の zip と ABS の形状を読みます。',
      'ts-rs が Rust の構造体から各データファイルの TypeScript の型を書き出します。',
    ],
    reliability: [
      'ソースのライセンスが変わるとパイプラインの実行が止まるので、ライセンスのないデータは公開されません。',
      'Pages はサイト全体を一度に入れ替えるので、訪問者は 1 つの完全な版を読みます。',
      'service worker はまだないので、インストールした web アプリにはネットワークが要ります。',
    ],
    security: [
      'サインインもサーバーもありません。購入は Google Play がスマホ上で確認するため、root 化したスマホでは偽装できます。',
      'ライセンスを明記した公開データだけを使います。NSW の売買は、ライセンスが非営利のため広告なしの web サイトにだけ出ます。',
      '予定している Rust の Worker は API キーを Worker のシークレットに置き、バンドルの外に保ちます。まだ作っていません。',
    ],
    performance: [
      'ファイルを事前計算してあるので、フィルターを変えると JSON を 1 つ取るだけで、web の地図は feature-state で色を替えます。',
      'スマホでは MapLibre がファイルから match 式を 1 つ作ります。15,000 回の feature-state 呼び出しがブリッジを 1 つずつ渡るのを避けるためです。',
      'PMTiles は同じタイルを 1 度だけ保存し、入力が前回の実行と同じならデプロイはパイプラインを飛ばします。',
    ],
    operations: [
      'Checks は PC のランナーで TypeScript と Rust のジョブを並べて実行します。lint、型、テスト、web と iOS のエクスポートです。',
      'Deploy web は緑になった Release のたびと毎週月曜に動きます。サイトのリポジトリのリリースを公開し、Pages が最新のものを展開します。',
      'ホスティング費用は 0 ドルです。GitHub Pages、キー不要の OpenFreeMap の背景地図、自前のランナーを使います。',
    ],
    tradeoffs: [
      'サーバーのデータベースではなく GitHub Pages の静的ファイルを選び、ホスティングを 0 ドルにしました。フィルターは固定の選択肢のままです。',
      '規約で禁じられたポータルのスクレイピングではなく、政府のオープンデータを選びました。代わりに寝室数はなく、灰色の州が出ます。',
      'Node のスクリプトではなく Rust のパイプラインを選びました。NSW は 1990 年以降のすべての売買を持ち、形状の処理も重いためです。',
      'web 専用のサイトではなく 1 つの Expo のコードベースを選び、ストア向けビルドが 2 つ目のアプリにならないようにしました。地図には 2 つのライブラリが要ります。',
    ],
  },
  features: {
    'Price map':
      'Rust のパイプラインが地区と種類ごとに、各期間の中央値を出します。MapLibre が ABS の各地区を、分位点で区切った 7 段階で塗ります。',
    Filters:
      '絞り込みの組み合わせごとに、前もって作った JSON ファイルがあります。切り替えるとファイルを 1 つ読み、URL が選択を保ちます。',
    'Listings on realestate.com.au':
      'アプリは地区、郵便番号、種類から realestate.com.au の検索リンクを作ります。サイトのページは読みません。',
    'Suburb card and history chart':
      'タップすると、各期間の中央値と件数を持つ地区のファイルを 1 つ読みます。react-native-svg と d3 がどの環境でもグラフを描きます。',
    Search: '検索は、各地区の名前、郵便番号、範囲を持つ索引ファイルを読みます。選ぶと地図がその範囲へ飛びます。',
    Languages: 'i18next が 9 つのカタログを持ち、Intl が言語ごとに価格と日付を整えます。ブラウザが選択を覚えます。',
    Rents:
      'パイプラインが州の敷金データと VIC Rental Report から、郵便番号ごとの週の家賃の中央値を出します。MapLibre は郵便番号の別のタイルファイルを塗ります。',
    'Install from the browser':
      'Web アプリのマニフェストが名前、アイコン、タイトルバーの色を決めます。Service worker はまだないので、ネットが必要です。',
    'Ads and Remove ads':
      'react-native-google-mobile-ads が Google の同意フォームの後にバナーを出します。expo-iap が起動のたびに広告の削除の購入を確かめ、Web ビルドは広告を切ります。',
    'Property Trends Pro':
      'expo-iap が起動のたびに Google Play か App Store で Pro の購入を確かめます。アプリの 1 か所の確認で家賃と全期間の履歴が開きます。',
    'iPhone app':
      '同じ Expo のコードが iOS 向けにビルドされ、AdMob の前に追跡の許可を尋ねます。今はシミュレーター用のアプリを macOS のランナーか EAS がビルドします。',
  },
};

export default arch;

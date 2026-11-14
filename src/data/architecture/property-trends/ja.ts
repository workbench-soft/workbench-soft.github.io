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

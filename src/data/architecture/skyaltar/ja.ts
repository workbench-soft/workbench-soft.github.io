import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'Sky Altar は Android とウェブ向けの 1 つの Expo アプリで、専用のサーバーはありません。星空は Astronomy Engine とアプリ内の星データから作り、Skia が描きます。',
  parts: [
    {
      name: 'Expo と React Native',
      role: 'Android アプリとサイトを 1 つのコードで作り、名前はスマホのフォントで出します。',
    },
    { name: 'Skia', role: '星空を GPU で 1 フレームにつき 1 枚の絵として描きます。' },
    { name: 'Astronomy Engine', role: '太陽と月と惑星の位置を出し、出生図を計算します。' },
    { name: 'd3-celestial のデータ', role: '5.5 等までの 2851 個の星と、名前付きの IAU の星座線。' },
    { name: 'expo-camera', role: '星の照合のため、1.5 秒ごとに無音で写真を撮ります。' },
    { name: 'Media3 ExoPlayer', role: '決めた音量でスピーカーから音楽をループ再生する Kotlin モジュール。' },
    { name: 'Cloudflare R2', role: '有料テーマの絵と曲を配信します。' },
    { name: 'Google Play Billing と AdMob', role: '広告の削除と Pro を販売し、同意の後に広告を出します。' },
  ],
  flow: [
    '回転センサーか指で星空の向きを変えます。',
    '1 秒ごとに Astronomy Engine が各星を地平座標に変えます。',
    '各フレームで星と星座線を画面に投影します。',
    'Skia が絵と線と星を 1 枚の絵に記録します。',
    'React Native が上に名前を書き、カメラの星がその上で光ります。',
  ],
  links: [
    { to: 'songfactory', text: 'テーマの曲は Songfactory を通して Suno で作り、テーマごとにスタイルを 1 行書きます。' },
    { to: 'tickalot', text: '更新の確認は Tick-a-Lot のものを写したものです。' },
    { to: 'app-updater', text: 'WBS Updater が共有リリースから同じ APK を入れます。' },
    { to: 'Google Play', text: 'Google Play Billing が広告の削除と Pro を販売します。' },
    { to: 'Open-Meteo', text: '出生地の検索は入力した都市名だけを送り、場所とタイムゾーンを受け取ります。' },
  ],
  design: {
    scale: [
      '1 インストールにつき 1 人で、アカウントも専用サーバーもありません。',
      '空には 2851 個の星、89 の図形、19 の文化テーマがあり、1 フレームに約 3000 点を描きます。',
      'アプリに入っているのは無料の 2 テーマだけで、有料の絵は 1 枚約 30 KB を CDN から取得します。',
    ],
    data: [
      '星、図形、名前はアプリ内の JSON です。物語は言語ごとに 1 つの .lore ファイルにあります。',
      '設定と保存した出生データは localStorage に、スマホでは expo-sqlite に入ります。',
      'ダウンロードした絵と曲は、スマホのアプリのドキュメントフォルダーに置かれます。',
    ],
    interfaces: [
      'CDN の manifest.json が、各テーマの絵を内容のハッシュで名付けたファイルに対応づけます。',
      'expo-iap が Google Play の 2 つの商品を読みます。更新確認は共有の GitHub リリース一覧を読みます。',
      'Open-Meteo のジオコーディングは入力された都市名を受け取り、場所とタイムゾーンを返します。',
    ],
    reliability: [
      '一度ダウンロードしたテーマはオフラインで動き、無料テーマは初回起動からオフラインで動きます。',
      'ダウンロードに失敗した絵は 1 分後に再試行します。',
      'ジャイロがビューを動かし、コンパスは回している間だけ補正するので、空が勝手に流れません。',
    ],
    security: [
      'サインインもサーバーもありません。保存した出生データはスマホの中だけに残ります。',
      'Open-Meteo に送るのは入力した都市名だけです。カメラの写真はスマホ上で読み取ります。',
      'EEA、英国、スイスでは広告の前に Google の同意フォームが出ます。署名キーはリポジトリの外に置きます。',
    ],
    performance: [
      '型付き配列の地平線キャッシュを 1 秒に 1 回埋め直すので、フレームごとに星ごとのオブジェクトを作りません。',
      'Skia は 1 フレームごとに 1 枚の絵を記録してビューに渡し、React の描画は通しません。静止中は 1 秒に約 8 回描き直します。',
      '絵のぼかしは読み込み時に 1 回だけ行い、ハッシュ付きのファイル名で CDN とスマホが 1 年キャッシュします。',
    ],
    operations: [
      'main への push ごとに Checks が lint、テスト、Android と web のバンドルを実行し、Release が隣で署名済み APK をビルドします。',
      'Publish が APK を共有リリース一覧に置き、一覧はアプリごとに直近 3 ビルドを残します。',
      'mise run deploy が新しい絵、曲、マニフェストをアップロードするので、描き直した絵にアプリのリリースは要りません。',
    ],
    tradeoffs: [
      'react-native-svg ではなく Skia を選びました。1 フレーム 3000 点には遅すぎるためで、代わりに web で 7 MB の CanvasKit ファイルが増えます。',
      '名前は Skia の段落ではなく React Native で描き、中国語、日本語、韓国語がスマホのフォントを使えるようにしました。',
      'Stellarium の星空文化ではなく d3-celestial のデータを選びました。前者はライセンスが混在し、一部は GPL です。',
      'Swiss Ephemeris ではなく Astronomy Engine を選びました。前者は AGPL か有料で、プラットフォームごとにネイティブビルドが要ります。',
    ],
  },
  features: {
    'Sky view':
      '回転センサーが向きを動かし、ジャイロがコンパスの補正の間を安定させます。Skia がアプリ内のデータから星と天体と 88 の星座を描きます。',
    Clock:
      'React Native のレイヤーが時刻と日付をテーマのフォントで描きます。タイマーは毎分動き、時計はボタンと一緒に暗くなります。',
    'Camera stars':
      'アプリは 1.5 秒ごとに無音で写真を撮り、JavaScript で光の点を探します。星表と一致した点が星空の上で金色に光ります。',
    'Culture themes':
      '文化ごとの記録が色と線のスタイルとフォントを決めます。各絵は星座の 3 つの星に留まり、有料テーマは Cloudflare R2 から 1 度だけダウンロードします。',
    'Ambient music':
      'Media3 ExoPlayer を使う Kotlin モジュールが、内蔵か CDN の曲をフェード付きでループ再生します。ファイル選択で自分の曲やフォルダをアプリにコピーできます。',
    'Ads and Remove ads':
      'AdMob はテーマのシートと設定にバナーを出し、全画面広告は 30 分に 1 回までです。広告の削除は Google Play Billing で販売します。',
    'Sky Altar Pro':
      'Google Play Billing が Pro を販売し、1 つの確認が各ロックを決めます。ウェブ版にはストアがなく、Pro の部分が開いています。',
    'App languages': 'i18next が画面用に 9 つのカタログを持ちます。星座名と伝承のファイルも各言語でそろっています。',
    'Updates from GitHub':
      '更新の確認が共有の GitHub リリースを読み、APK をダウンロードしてインストーラーに渡します。Google Play 版では確認が空の代わりのモジュールに置き換わります。',
    Astrology:
      'Astronomy Engine が出生図の惑星の位置を出し、ハウスはホールサインで分けます。Open-Meteo が出生地を探し、保存した出生データはスマホの中に残ります。',
    'Constellation navigation':
      '仮想化した一覧が星座を絞り込み、各ラベルの点を今の空の位置に変えます。タップすると 450 ミリ秒でそこへ向きが移ります。',
    'Constellation lore':
      '各カードは言語ごとの伝承ファイルからテーマの文化の物語を読みます。星のデータは ESA Gaia アーカイブにある Hipparcos のものです。',
    'Long lists':
      'スタジオ共通の fast-scroll パッケージが両方のリストを包み、画面上の行だけを描きます。つまみはシートの落ち着いた色かテーマのラベル色になります。',
  },
};

export default arch;

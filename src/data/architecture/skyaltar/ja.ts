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

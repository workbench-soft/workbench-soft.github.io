import type { Arch } from '../types';

const arch: Arch = {
  summary:
    '1 つの Expo アプリが Android とウェブで動き、各リストを端末の SQLite に保存します。共有したリストは Firestore にも送られ、アプリ専用のサーバーはありません。',
  parts: [
    {
      name: 'Expo and React Native',
      role: 'Android アプリとウェブサイトを 1 つのコードから作り、サイトは Firebase Hosting が配信します。',
    },
    { name: 'SQLite', role: 'expo-sqlite で各リストと項目を端末に保存し、ブラウザでは wasm で動きます。' },
    { name: 'Firestore', role: '共有リスト、店の通路、店内の順路を、匿名ログインの後ろで保存します。' },
    {
      name: '文のパーサーと絵文字辞書',
      role: 'スマホ上のルールで、文を項目に分け、絵文字と売り場を選びます。',
    },
    { name: 'OpenStreetMap', role: '店の検索と、スマホがいま居る店。' },
    { name: 'Wikipedia and Wikidata', role: '町とその名所。Tripforge の Worker が答えるときはそこから読みます。' },
    { name: 'Coles and Woolworths', role: '各店のサイト検索から読む単価。' },
    { name: 'Google Play', role: 'AdMob の広告と、expo-iap による「広告を削除」と Pro の購入。' },
  ],
  flow: [
    '項目を入力するか話すと、パーサーが分けます。',
    'スマホは各項目をすぐ SQLite に保存します。',
    '共有で、リストが Firestore に送られ、リンクが開きます。',
    'もう 1 台がリンクを開き、Firestore のリストを追います。',
    '片方のチェックが、1、2 秒でもう片方に出ます。',
  ],
  links: [
    {
      to: 'tripforge',
      text: 'Tripforge の旅のリンクから、見どころリストと荷造りリストができます。見どころリストからはフライトを計画しに戻れます。',
    },
    { to: 'guitar-upscale', text: '練習する曲のリストの曲は、Guitar Upscale で開いて一緒に弾けます。' },
    { to: 'Firebase', text: 'Firestore が共有リストを同期し、Hosting がサイトを配信します。' },
    { to: 'OpenStreetMap', text: 'Nominatim が店名で店を探し、Overpass が近くの店を見つけます。' },
    { to: 'Google Play', text: 'AdMob が広告を出し、Play Billing が「広告を削除」と Pro を売ります。' },
  ],
  design: {
    scale: [
      '個人用のリストは 1 台の端末にとどまり、共有リストは 1 本のリンクで家族や数人の友人に届きます。',
      'アプリにサーバーはないため、Firestore の無料枠（1 日 50,000 回の読み取りと 20,000 回の書き込み）が共有リストの予算を決めます。',
    ],
    data: [
      '端末の SQLite がリスト、項目、店、売り場、順路、既知の名前、価格を持ちます。ウェブ版は同じ SQLite を wasm で動かします。',
      'Firestore に届くのは共有リストだけで、lists/{id}/items/{itemId} に入り、店の売り場と順路は stores/{osmId} に入ります。',
      '削除は deleted = 1 を立てて行を残します。dirty = 1 は Firestore がまだ受け取っていない変更の印です。',
      '写真は 360 ピクセル、約 30 KB の JPEG で、項目の中に入ります。',
    ],
    interfaces: [
      '共有リンクはランダムな 32 桁の 16 進リスト ID を持ち、Android の intent filter がアプリで開きます。',
      'Tripforge の旅行リンクは、v、place、start、nights と最大 60 か所を含む base64url の JSON を運びます。',
      '価格は Woolworths と Coles のサイト検索の裏にある JSON から、店は Nominatim と Overpass から、名所は Tripforge の Worker か Wikidata から取ります。',
    ],
    reliability: [
      '変更はまず SQLite に保存し、画面はそこから描き直すので、電波がなくてもチェックできます。アプリを開いている間、送信は 30 秒ごとに再試行します。',
      '項目ごとに新しい updated の時刻が勝ち、端末でも Firestore のルールでも同じです。同じ項目へのオフライン編集 2 件は統合できず、後の編集が項目全体を取ります。',
      'リスナーはアプリがバックグラウンドに移ってから 1 分間動きます。閉じたアプリには通知が届きません。プッシュ用のサーバーが必要になるからです。',
    ],
    security: [
      '各インストールは匿名で Firebase にサインインし、リンクにあるランダムなリスト ID が秘密です。Firestore はリストの一覧取得を拒否します。',
      'ルールは 32 桁の 16 進 ID、既知のフィールド、そのサイズ、1 日先までの時刻を確認します。写真は JPEG データか Wikimedia Commons の画像に限ります。',
      'リンクを知っていれば誰でもリストを読み、変更し、削除できます。Firebase App Check は今のところオフです。',
    ],
    performance: [
      '送信は 0.5 秒待つので、続けてチェックした分は 1 回の書き込みで出ます。',
      '価格は Woolworths から 3 件ずつ、Coles から 1 件ずつ読み込みます。SQLite に 1 日残し、再描画するのは価格だけです。',
      '端末は店の売り場を Firestore から 10 分に 1 回までしか読みません。',
    ],
    operations: [
      'main への push ごとに Checks と Release が同時に始まります。Checks が通ると署名済み APK を公開し、Checks が失敗するとビルドを取り消します。',
      'Google Play 用の bundle は 1 日 1 回、シドニー時間の 19:00 に、アプリに変更があったときだけ作ります。',
      'ウェブ版は Firebase Hosting が配信し、Checks が通ると Firestore のルールと一緒にデプロイします。GitHub の APK は自分で更新し、Play 版はそのコードを含みません。',
    ],
    tradeoffs: [
      'Kotlin のネイティブアプリではなく Expo を選び、1 つのコードで共有リンクが開くページも作ります。',
      '自前サーバーや WebRTC ではなく Firestore の行を選び、動かすサーバーをなくし、チェックが眠った端末を待たないようにします。',
      '項目ごとに新しい変更を勝たせ、フィールド単位のマージはしません。コードは減りますが、古いオフライン編集は失われます。',
      'GitHub Pages ではなく Firebase Hosting を選びます。wasm の SQLite には COOP と COEP ヘッダーが要り、Pages では設定できないからです。',
    ],
  },
  features: {
    'Share by link':
      'Firestore が共有リストのコピーを持ち、リンクにはランダムな id が入ります。各スマホは変更をまず SQLite に保存し、回線が戻ると送ります。',
    'Base list':
      '基本リストから作ったリストは各項目をコピーし、どの項目に従うかを覚えます。基本リストの変更は、手を加えていないコピーに届きます。',
    'Typing and dictating':
      'スマホ上のルールベースのパーサーが、絵文字辞書と数字で文を分けます。expo-speech-recognition がスマホの音声サービスで声を文字にします。',
    Pictures:
      'アプリ内の辞書が名前に絵文字と売り場を割り当てます。英語とロシア語に対応します。写真は小さな JPEG になり、項目と一緒に運ばれます。',
    'The store and the walk through it':
      'OpenStreetMap の Overpass と Nominatim が店を見つけます。アプリはチェックの順から売り場の順番を覚え、SQLite に保存します。',
    'Shared aisles':
      '通路と順路は、店の OpenStreetMap id ごとに Firestore にあります。その店を選んだスマホが読み、入力した通路はすぐ送られます。',
    'Prices at Coles and Woolworths':
      'スマホが各店のサイト検索を読み、最初の商品を SQLite に 1 日保存します。安いほうの単価が緑で出ます。',
    'Packing for a trip':
      '荷造りリストは、SQLite にある基本の荷造りリストのコピーです。共有はほかのリストと同じく Firestore を通ります。',
    'Things to see':
      '町は Wikipedia から、名所は Tripforge の Worker か Wikidata から来ます。スマホ上の k-means が日ごとに振り分けます。',
    'Lists that are done':
      'スマホのタイマーが、最後のチェックから 3 時間後か、2 週間変更がないと、リストをアーカイブに移します。',
    'Light and dark': 'テーマは React Native でスマホに合わせるか、設定で選びます。選択は端末に残ります。',
    Updates:
      'GitHub 版は GitHub の releases に新しい APK を尋ね、Android のインストーラーを開きます。Google Play 版にはこのモジュールがありません。',
    Ads: 'AdMob が Google の同意フォームのあとにバナーと全画面広告を出します。「広告を削除」は Google Play Billing が売ります。',
    'Tick-a-Lot Pro':
      'Google Play Billing が expo-iap で Pro を売り、アプリは起動のたびに Play に確かめます。ロックの判断は 1 つのモジュールです。',
    'The weekly shop for two':
      '1 台が基本リストからリストを作り、Firestore で共有します。もう 1 台がチェックし、各チェックは数秒で戻ります。',
    'Songs to learn':
      '曲のパーサーはカンマでだけ分けます。各曲に、Guitar Upscale とコード、タブ譜、動画のサイトへの検索リンクが付きます。',
    'Changing and deleting':
      '各欄は、離れたときに SQLite に書かれます。削除は行に印を付けるだけなので、元に戻すも、もう 1 台への反映も動きます。',
    Languages:
      'i18next が 9 言語のカタログを持ち、expo-localization がスマホの言語を読みます。リストの文字は入力したままです。',
    'Finding Tick-a-Lot in search':
      'Expo の書き出しのあと、ビルドスクリプトがガイド、About、サイトマップを素の HTML で書きます。アプリのページは個人のリストなので noindex です。',
    'Open source licences':
      'ビルドのタスクが各パッケージのライセンス文をアプリ内の 1 つのファイルに集めます。設定画面はそのファイルから一覧を出します。',
    'Long lists':
      'スタジオ共通の fast-scroll パッケージが長いリストを包みます。リストは毎フレームつまみに追従し、隠れたつまみはタップを通します。',
  },
};

export default arch;

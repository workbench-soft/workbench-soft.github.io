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
  },
};

export default arch;

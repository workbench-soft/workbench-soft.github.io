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

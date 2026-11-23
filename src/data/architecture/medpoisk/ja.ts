import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'サーバーのない Expo アプリです。スマホ上の隠れた WebView が各情報源の検索ページを読み込み、アプリは返ってきた HTML から価格を読み取ります。',
  parts: [
    {
      name: 'Expo と React Native',
      role: 'アプリ本体です。画面は expo-router、9 言語は i18next で扱います。',
    },
    {
      name: 'react-native-webview',
      role: '各検索ページを見えないところで読み込み、その HTML をアプリに返します。',
    },
    {
      name: 'node-html-parser',
      role: 'その HTML から価格を読み取ります。テストが保存ページで動かす解析コードと同じものです。',
    },
    {
      name: 'metro.json',
      role: 'モスクワの地下鉄、МЦК、МЦД の各駅を行政管区に対応させます。',
    },
    {
      name: 'expo-sqlite',
      role: '買い物リストをスマホに保存します。',
    },
    {
      name: 'GitHub Actions',
      role: '各プッシュを検査し、署名済み APK をビルドし、エミュレーターで開いてからリリースを公開します。',
    },
  ],
  flow: [
    '担当者が品目を入力して検索を押します。',
    '情報源ごとの隠れた WebView が、スマホ自身の回線で検索ページを開きます。',
    'ページの HTML が返り、情報源ごとの解析関数がそれを商品情報に変えます。',
    '行政管区の絞り込みと価格順の並べ替えで、画面に 1 つのリストができます。',
  ],
  links: [
    {
      to: 'АптекаМос',
      text: '各薬局の価格、住所、地下鉄駅が載った商品と薬局のページです。',
    },
    {
      to: 'Мегаптека',
      text: 'JSON の検索 API で、モスクワを指定し価格順で問い合わせます。',
    },
    {
      to: 'Wildberries',
      text: 'サイト自身のスクリプト確認を通ったあとに読む商品カードです。',
    },
    {
      to: 'Ozon',
      text: 'ボット確認が最も厳しいため、検索結果はできる範囲で読みます。',
    },
    {
      to: 'GitHub',
      text: 'アプリが更新を確認する APK リリースを置いています。',
    },
  ],
  design: {
    scale: [
      'モスクワの購買担当者 1 人が Android スマホ 1 台で、一度に数品目を検索します。',
      '運用は無料です。サーバーも有料 API も広告もないので、検索はすべてスマホで動きます。',
    ],
    data: [
      '現在の検索の商品情報はメモリにあります。商品、包装、価格、販売者、住所、地下鉄駅です。',
      '買い物リストは SQLite にあります。選んだ管区と言語はローカルストレージにあります。',
    ],
    interfaces: [
      '各情報源のモジュールは検索 URL と解析関数を持ちます。注入スクリプトは整えた HTML を window.ReactNativeWebView.postMessage で送ります。',
      'Мегаптека は api.megapteka.ru への普通の fetch に答え、モスクワは city_id 6565 です。',
    ],
    reliability: [
      '各情報源は最長 60 秒で個別に失敗し、その行に理由が出ます。ほかの情報源は続きます。',
      '情報源ごとのテストが保存ページで解析を動かすので、ページ構造の変化は CI でわかります。',
    ],
    security: [
      'アプリにアカウントはなく、自前のサーバーにデータを送りません。',
      '卸売業者へのログインはスマホの WebView の cookie ストアに残ります。署名鍵は Bitwarden とリポジトリのシークレットにあります。',
    ],
    performance: [
      '情報源は並行して読み込み、АптекаМос は多くの薬局が扱う 3 商品だけを読みます。',
      '注入スクリプトは HTML を返す前にスクリプトとスタイルを取り除きます。',
    ],
    operations: [
      'Checks は main へのプッシュごとに lint、型、knip、テスト、Android バンドルを実行します。',
      'Release は署名済み APK をビルドし、クラッシュを見つけるためエミュレーターで開いてから、medpoisk-v<date>.<n> として公開します。',
    ],
    tradeoffs: [
      'サーバーではなくスマホでページを読みます。ロシアの情報源は国外とデータセンターの IP を遮断するためです。サイトが変わると、解析を直すまでその情報源は止まります。',
      'ロボット確認はコードで解かずシートに出し、担当者が一度だけ手で通ります。',
      '卸売価格をリストに載せず、担当者自身のログインでポータルを開きます。その価格には担当者のアカウントが必要なためです。',
    ],
  },
  features: {
    'Price search':
      'run-search.ts が各情報源を同時に始めます。HiddenPages.tsx が見えない WebView で各ページを読み込み、情報源のモジュールが HTML を価格順の商品情報に変えます。',
    'Moscow okrugs':
      'okrug-of.ts が薬局の地下鉄駅を metro.json で調べます。駅のない住所は町で決まり、モスクワは不明のまま、ほかの町は Подмосковье になります。',
    'Site checks':
      '各情報源には、確認ページと結果ページを見分けるテストがあります。CheckSheet.tsx が確認を表示し、cookie は共有の WebView ストアに残り、情報源は再び裏で動きます。',
    'Shopping list':
      'items.ts が入力した言葉を SQLite に保存します。check-all.ts が品目を順に検索し、選んだ管区での最安の商品情報を残します。',
    Distributors:
      'distributors.ts が各社のトップページを並べます。browser.tsx が cookie を保つ WebView でそれを開きます。',
    'Languages and updates':
      'i18n.ts が i18next をすぐ切り替えて選択を保ちます。newer-release.ts が起動時と復帰時に新しい medpoisk APK を GitHub に問い合わせます。',
  },
};

export default arch;

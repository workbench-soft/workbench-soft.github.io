import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'Android、iPhone、ウェブ向けの Expo アプリが、各カードを端末の SQLite に保存します。単語ベースはアプリに同梱され、端末をペアにすると Firestore がデッキを同期します。',
  parts: [
    { name: 'Expo and React Native', role: 'Android、iPhone、ウェブを 1 つのコードから作ります。' },
    { name: 'SQLite', role: '各端末のカード、解答、覚えた単語、画像。' },
    { name: 'ts-fsrs', role: '各カードがいつ戻るかを決める FSRS のスケジュール。' },
    { name: '単語ベース', role: 'アプリ内の英語とロシア語の単語の JSON。公開の単語リストと Wiktionary から作ります。' },
    { name: 'Firestore', role: '同期したデッキのコピー。ペアリングコードで開きます。' },
    { name: '会話エンジン', role: '本人のキーの Gemini、スマホ上の Qwen 3、または Chrome の内蔵モデル。' },
    {
      name: 'スピーカーモジュール',
      role: 'スマホのスピーカーから最大音量で単語を鳴らす、ローカルの Kotlin モジュール。',
    },
    { name: 'Google Play', role: 'AdMob の広告と、expo-iap による「広告を削除」と Pro の購入。' },
  ],
  flow: [
    '単語を入力するか、セットを始めます。',
    '検索は単語ベース、次に Wiktionary と MyMemory を見ます。',
    'アプリがカードを端末の SQLite に保存します。',
    'FSRS が復習のカードを選び、新しい単語がセットを埋めます。',
    'カードに単語、画像、音が出ます。',
  ],
  links: [
    { to: 'Firebase', text: 'Firestore がペアにしたデッキのコピーを、匿名ログインの後ろで持ちます。' },
    { to: 'Wiktionary and MyMemory', text: 'ベースにない単語の訳をここで取ります。キーは要りません。' },
    { to: 'Wikipedia', text: '単語の記事の代表写真と、Commons のクレジット。' },
    { to: 'Google Gemini', text: '会話練習とトピックの推測が、本人のキーで呼びます。' },
    { to: 'Google Play', text: 'AdMob が広告を出し、Play Billing が「広告を削除」と Pro を売ります。' },
  ],
  design: {
    scale: [
      '1 回のインストールに 1 人の学習者で、すべてのカードは端末の SQLite にあります。スタジオ自前のサーバーは動いていません。',
      '単語ベースは assets/words/en.json と ru.json としてアプリに入り、CEFR-J、Octanove、Wiktionary、OpenRussian から作ります。',
      '上限は無料サービスが決めます。MyMemory は端末あたり 1 日約 5,000 語、GitHub のリリース一覧は 1 アドレスで 1 時間 60 回です。',
      'スマホ上の会話モデルは約 1.2 GB のストレージと 2 GB の空きメモリを使います。',
    ],
    data: [
      'カード、復習、既知の語、画像は expo-sqlite 経由で SQLite にあり、Web でも同じです。',
      'カードは FSRS の状態を JSON で memory に持ち、due は索引のため専用の列にコピーします。(lang, term_key) は一意です。',
      '削除したカードはフラグ付きで残り、updated_at により同期では後の編集が勝ちます。',
      '設定は localStorage にあります。画像は各端末に残り、同期しません。',
    ],
    interfaces: [
      '同期は各カードを Firestore の decks/{code}/cards/{lang}_{termKey} に書き、firestore.rules がコードの長さと各フィールドを確認します。',
      '入力した語はまずベース、次に kaikki.org 経由で Wiktionary、その次に MyMemory API へ行きます。Wikipedia が代表画像を出します。',
      'Gemini は本人自身のキーで端末から呼び出し、Qwen 3 は react-native-executorch でスマホ上で動きます。',
      'modules/speaker/ の Kotlin モジュールが音声をファイルに書き出し、バックグラウンドのハンドラが Android のホーム画面ウィジェットを描きます。',
    ],
    reliability: [
      '各端末は自分の SQLite ファイルだけで動くのでアプリはオフラインで動き、同期はその上の任意の層です。',
      '同期では語の後の編集が勝ち、削除したカードはフラグ付きで残るので削除も同期されます。',
      '検索はベースから Wiktionary、さらに MyMemory へと切り替わります。kaikki.org は CORS ヘッダーを返さないので、Web 版は使いません。',
      'テスト済みの純粋な関数が 1 週間分のローカル通知を計画するので、アプリを開かない人にも 7 日間は毎日 1 件届きます。',
    ],
    security: [
      'Firebase の匿名サインインで端末ごとに 1 ユーザーとなり、80 ビットの乱数のペアリングコードでアカウントなしにデッキを共有します。',
      'コードを知っている人はそのデッキを読み書きできます。復習、設定、既知の語は各端末に残ります。',
      'Gemini は本人自身のキーで動き、選んだエンジンへの呼び出し以外にメッセージは端末の外に出ません。',
      'Android のキーストアとそのパスワードは CI のシークレットで、コピーはリポジトリの外に置いてあります。',
    ],
    performance: [
      'バッチのクエリは cards_due 索引で期限のカードを読み、そのあと 1 日の上限まで新しい語を足します。',
      'words/complete はネットワークなしで頭文字からベースの語を出し、ベースは初回使用時に読み込みます。',
      'expo-image は画像をディスクに保持し、画像が空だった結果は 30 日後にもう一度尋ねます。',
      '@expo/fingerprint が一致すると、リリースビルドは保持した android/ フォルダを再利用し、JS だけを作り直します。',
    ],
    operations: [
      'チェックは lint、フォーマット、型、knip、Vitest を 2 回実行します。Android と Web として、次に Platform.OS を ios にして。',
      'main への push は重いランナーで APK をビルドし、チェックが通ると release-gate.sh が公開します。チェックが失敗するとビルドを取り消します。',
      'PLAY_TRACK を設定すると、毎晩シドニー時間 19:00 の実行がバンドルを Google Play にアップロードし、アプリが変わったときだけです。',
      'GitHub の APK はリリース一覧に新しい memoire-v* タグがないか確認します。Play 版と iOS 版はこのコードを含みません。',
    ],
    tradeoffs: [
      'ネイティブの Kotlin アプリではなく Expo と React Native にして、1 つのコードで Android、iOS、Web をビルドし、代わりに一部がスマホ専用になります。',
      'Firestore だけを保存先にせず端末の SQLite にして、オフラインで動き、すぐ開き、同期は任意のままです。',
      'Google サインインではなくペアリングコードにして、アカウントなしで端末を結べますが、コードを知る人は誰でもデッキを編集できます。',
      'フィールドごとの列ではなく FSRS の状態を 1 つの JSON 列にして、ts-fsrs の変更でスキーマを変えずに済みますが、JSON の中は検索できません。',
    ],
  },
  features: {
    'Word batches':
      'セットのモジュールが SQLite から復習のカードを取り、次に 1 日の上限までベースの新しい単語を足します。ts-fsrs が各カードの戻る日を決めます。',
    'Ways to ask': '各カードは、目標で選んだスキルから出題の形を選びます。聞き取りはスマホ自身の声で単語を読みます。',
    'Add a word': '検索は内蔵ベース、Wiktionary、MyMemory の順に試します。候補はネットなしでベースから出ます。',
    Pictures:
      'アプリは学ぶ言語の Wikipedia API に記事の写真を尋ね、自由なライセンスのものだけ使います。expo-image が端末に保存し、同期には入りません。',
    'Built in words':
      'ビルドスクリプトが CEFR-J、Octanove、Wiktionary、OpenRussian を 2 つの JSON にまとめます。アプリは初回に読み込みます。',
    'Level test':
      'テストは各レベルのベースの単語と、作った単語を混ぜます。当て推量を引いたレベルごとの点で、新しい単語の出どころが決まります。',
    Topics:
      'ベースの単語はそれぞれトピックを持ちます。入力した単語は Wiktionary、Gemini、Chrome のモデルからトピックを得ます。',
    Reminders:
      'スマホ上のプランナーが expo-notifications で 1 週間分のローカル通知を入れます。アプリを開くたび、閉じるたびに組み直します。',
    'My words': '一覧は端末の SQLite からカードを読みます。削除はカードに印を付けるので、同期で伝わります。',
    'Look and language':
      'i18next が 9 言語のカタログを持ち、テーマはスマホか設定に従います。どちらの選択も端末に残ります。',
    'Talk practice':
      '場面の指示は、本人のキーの Gemini、スマホ上の Qwen 3、Chrome のモデルのどれかに送られます。返事の単語をタップするとカードになります。',
    'Sync between devices':
      '各端末は Firebase に匿名でログインし、変えたカードをコードのデッキに送ります。同じ単語は後の編集が勝ちます。',
    'Home screen widget':
      'react-native-android-widget がバックグラウンドで SQLite から描きます。30 分ごとと、アプリが裏に回ったときに更新します。',
    'Ads and Remove ads':
      'AdMob が同意フォームのあとにバナーと全画面広告を出します。「広告を削除」は Google Play Billing が expo-iap で売ります。',
    Sound:
      'ローカルの Kotlin モジュールが各単語をファイルにして、スピーカーから最大音量で鳴らします。iOS とウェブはシステムの出力を使います。',
    'Memoire Pro':
      'Google Play Billing が expo-iap で Pro を売ります。1 つのチェックが購入を読み、ロックされた項目を開きます。',
    Updates:
      'GitHub の APK は公開のリリース一覧を読み、Android のインストーラーを開きます。Play 版と iPhone 版にはこのモジュールがありません。',
  },
};

export default arch;

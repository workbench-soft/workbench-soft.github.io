import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'KeepPad は 1 つの Expo アプリで、同じコードから Android アプリ、iPhone アプリ、サイトを作ります。メモは端末の SQLite に残り、Firebase に送るのは共有メモだけです。',
  parts: [
    { name: 'Expo と React Native', role: 'Android、iPhone、サイトで 1 つのコード。画面は expo-router です。' },
    {
      name: 'Kotlin のリスナーサービス',
      role: 'Android のフォアグラウンドサービスが Hey Keep を聞き、メモを録音して返事を流します。',
    },
    { name: 'sherpa-onnx', role: '端末上の小さなキーワードモデルが、呼びかけのフレーズを見つけます。' },
    { name: '端末の音声認識', role: 'Android の音声サービスと Apple の認識エンジンが、声を文字にします。' },
    { name: 'SQLite', role: 'メモ、送ったメモの記録、処理済みの受信箱リストを端末に持ちます。' },
    {
      name: 'Gemini Nano と Apple Foundation Models',
      role: 'アプリが開いている間、端末のモデルがより合うグループを選びます。',
    },
    { name: 'Firebase', role: 'Firestore が共有メモを持ち、Hosting がサイトを配信します。' },
    { name: 'Google Play', role: 'AdMob の広告と、広告の削除と KeepPad Pro の購入。' },
  ],
  flow: [
    'アプリを閉じていても、サービスが「Hey Keep」を聞き取ります。',
    'メモを録音し、端末上で声を文字にします。',
    'サービスはメモを小さな受信箱ファイルに書きます。',
    'アプリがそれを SQLite に入れ、言葉でグループを選びます。',
    '端末のモデルがメモを移すこともあり、一覧が読み直されます。',
  ],
  links: [
    {
      to: 'memories',
      text: '人の名前で始まるメモは、WebDAV で自宅の NAS にあるその人の日記に入ります。',
    },
    {
      to: 'lumiere-player',
      text: 'Wake Share のおかげで、KeepPad のサービスは「Hey Lumi」も聞き取り、Lumiere に渡します。',
    },
    { to: 'spotthecam', text: '同じ共有マイクが「Hey Spot」を SpotTheCam に渡します。' },
    { to: 'Firebase', text: 'Firestore が共有メモをリアルタイムに保ち、Hosting がサイトを配信します。' },
    { to: 'Google Play', text: 'AdMob がバナーを出し、Play Billing が広告の削除と KeepPad Pro を売ります。' },
  ],
  features: {
    'Hey Keep':
      'Kotlin のフォアグラウンドサービスが静かな音を飛ばし、大きな音にだけ sherpa-onnx のモデルを使います。返事は声ごとに録った音声で流れ、調整でフレーズごとのしきい値を決めます。',
    'Long recording':
      'サービスは録音しながら音を一時ファイルに書きます。落ちたあとは、アプリがそのファイルをメモにし、音から文字を起こします。',
    'Stop and continue':
      'メモの途中では、キーワードモデルと認識エンジンの両方が「Stop」を待ちます。「continue」のあと、サービスは新しい言葉と音を最新のメモにつなげます。',
    'Record by button':
      'expo-speech-recognition が、話している間に言葉を画面に出します。メモは SQLite に入り、端末が許せば音も残ります。',
    Recordings: 'アプリが自分で音を録り、認識エンジンに渡します。WAV ファイルはメモと一緒に端末に残ります。',
    Groups:
      '英語とロシア語の語幹での照合が、すぐにグループを選びます。アプリが開いている間、Gemini Nano か Apple Foundation Models がより合うものを選ぶこともあります。',
    Languages:
      '端末の認識エンジンは英語とロシア語を聞き取り、言語パックがあればオフラインで動きます。i18next が画面を 9 つのカタログで持ちます。',
    'Share by link':
      'メモは Firestore に入り、リンクでアプリかブラウザから開けます。リスナーが 2 つのコピーを同期し、新しい方の編集が残ります。',
    'Send to other apps':
      'つないだアプリごとに、それぞれの Web API で新しいメモを送ります。Obsidian には選んだフォルダにファイルを置き、ログインのトークンは安全な保存領域に置きます。',
    Website:
      'Expo がルートごとに静的ページを書き出し、Firebase Hosting が配信します。共有メモはブラウザで Firestore から読み込みます。',
    'In-app update':
      'GitHub 版は起動時と復帰時にリリース一覧を読みます。APK をダウンロードして Android のインストーラーを開きます。Play 版にはこのコードがありません。',
    'Light and dark theme':
      'テーマのモジュールが端末の配色か、決めた設定に従います。選んだ設定はほかの設定と一緒に端末に残ります。',
    Ads: 'Google Mobile Ads のライブラリがホーム画面に AdMob のバナーを出します。ヨーロッパでは先に Google の同意フォームが出ます。',
    'Remove ads':
      'expo-iap が Google Play Billing で商品を売ります。購入の復元で、同じアカウントの新しい端末でも戻ります。',
    'Loud sound from the phone speaker':
      'ネイティブのモジュールが、音を最大音量で内蔵スピーカーに送ります。増幅で 6 dB 上げ、音が終わると音量を戻します。',
    'Notes about a person go to Memories':
      'アプリはメモの最初の言葉を Memories の名前と照らし合わせます。整えて日付を付けたメモが、WebDAV でその日記に入ります。',
    'KeepPad Pro':
      'expo-iap が Google Play で Pro を売り、Pro のモジュールがロックされた操作の前に確かめます。返金されると、次の起動で Pro が切れます。',
    'Fast scroll':
      'スタジオ共通の fast-scroll パッケージがメモ一覧を包みます。リストは毎フレームつまみに追従し、iOS と Web は標準のスクロールバーのままです。',
  },
};

export default arch;

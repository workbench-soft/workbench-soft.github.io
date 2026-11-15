import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'Android、iPhone、ブラウザ向けの Expo アプリが、自宅の NAS から WebDAV で写真を読み、自前の SQLite インデックスを持ちます。NAS 上の任意のコンテナが写真の索引作り、顔のグループ分け、アルバムリンクの配信を担います。',
  parts: [
    { name: 'Expo と React Native', role: 'Android アプリ、iPhone アプリ、ブラウザ版で 1 つのコードを共有します。' },
    { name: 'expo-sqlite', role: 'スマホ上のインデックスで、各ファイルの日付、場所、機器を持ちます。' },
    { name: 'WebDAV', role: '一覧、ヘッダーの読み取り、アップロード、移動に使う NAS との唯一の経路。' },
    {
      name: 'folder-rules クレート',
      role: '年、場所、日のフォルダを決める Rust の規則で、デスクトップの整理ツールと共有します。',
    },
    { name: 'places.db', role: 'アプリ内の GeoNames と OpenStreetMap のデータで、ネットなしで地名を付けます。' },
    { name: 'NAS の Node コンテナ', role: 'NAS 上の高速インデクサー、アルバムページ、ブラウザ版アプリ。' },
    { name: 'Rust の顔エンジン', role: 'NAS 上で tract により YuNet と SFace を動かし、顔を人ごとにまとめます。' },
    {
      name: 'Konva の写真エディター',
      role: 'Expo DOM コンポーネント内の 1 つのエディターで、Shuttrix とデスクトップと共有します。',
    },
  ],
  flow: [
    'バックグラウンドのタスクが数時間おきに NAS のフォルダを一覧します。',
    '新しいファイルはヘッダーだけを読み、日付と GPS を得ます。',
    'オフラインの地名データベースが場所を決め、SQLite が行を保存します。',
    'タスクが次の 7 日分のリマインダーを予約します。',
    '画面はインデックスを引き、NAS からフル画質の写真を読み込みます。',
  ],
  links: [
    {
      to: 'media-organizer',
      text: 'デスクトップの整理ツールは同じ Rust のフォルダ規則を使い、同じエディターを表示します。',
    },
    { to: 'shuttrix', text: 'このカメラは写真エディター、地名の検索、スポットの地図を共有します。' },
    { to: 'keeppad', text: 'Keeppad は Android のプロバイダー経由で、NAS 上の人の日記にメモを足します。' },
    { to: 'memories-demo-webdav', text: 'Google Play の審査はこのサンプル NAS にログインします。' },
    { to: 'Tailscale', text: '2 つ目のアドレスで外出先から NAS に届きます。Funnel がアルバムリンクを配信します。' },
  ],
  features: {
    'Daily reminder':
      'expo-notifications が次の 7 日分の単発リマインダーを持ち、バックグラウンドのタスクがインデックスから予約します。その日に海外旅行があれば、その年が選ばれます。',
    Today:
      '日ごとの写真数の表を引き、この日付に写真がある年を探します。トリガーがこの表を保つので、ファイルの行は読みません。',
    Trips:
      'アプリが日ごとの集計から海外にいた連続した日を切り出します。旅行のリンクは初日から最終日までの写真を開きます。',
    Photos:
      'FlashList が画面上と 1 画面先のタイルを描きます。各タイルはスマホにキャッシュした小さな EXIF サムネイルを見せます。',
    'Filter by place':
      '場所の検索は日ごとの集計から国と場所を読みます。選んだ場所はギャラリーの各クエリの条件に加わります。',
    'Camera and drone shots':
      '同期のときに EXIF の機種名かファイル名で、スマホ、カメラ、ドローンを見分けます。インデックスがファイルごとに記録します。',
    'Tile size': 'ピンチの処理が 1 行のタイルを 1 から 6 枚に決めます。保存した 1 つの値が各グリッドに効きます。',
    'Send many photos at once':
      'アプリが選んだファイルを 3 件ずつキャッシュにコピーします。小さなネイティブモジュールがシステムの共有シートへ一度に渡します。',
    'Share an album by link':
      'アプリが WebDAV で NAS にアルバムファイルを書きます。NAS の Node サーバーが Tailscale Funnel 経由で表示し、プレビューは sharp が作ります。',
    'Memories in the browser':
      'NAS の Node サーバーがウェブ版を配信し、同じアドレスで WebDAV を中継します。Tailscale Serve が tailnet の中だけに限ります。',
    Organize:
      '各カードが 1 つの作業を動かします。カメラの整理、アップロード、空き容量づくりです。ファイルを動かす前に Rust のフォルダ規則がフォルダと名前を決めます。',
    'Import from Google Photos':
      'Google フォトの Picker API は利用者が選んだものだけを見せます。アプリがカメラフォルダに落とし、アップロードが引き継ぎます。',
    'Sort picked photos on the NAS':
      'Rust のフォルダ規則がファイルごとに新しいフォルダと名前を決めます。WebDAV の MOVE で移し、スマホのインデックスもすぐ追いかけます。',
    Viewer:
      'expo-image がキャッシュのサムネイルの上にフル画質の写真を出します。expo-video が範囲リクエストで NAS の動画を再生します。',
    'Connect to the NAS':
      'mDNS の検索で Wi-Fi 上の機器を並べ、プローブで WebDAV のポートを探します。ログインはスマホの安全な保存場所に残ります。',
    'Photos away from home':
      '起動時とネットワークが変わるたびに自宅のアドレスを試します。応答がなければアプリは Tailscale のアドレスに切り替えます。',
    'Sync progress':
      'バナーがスマホ上の同期の状態をそのまま読みます。NAS の部分はインデクサーが毎分書く状態ファイルから来ます。',
    'Mobile data':
      'モバイルデータでは NAS の各作業の前に 1 つの確認が入ります。保存した答えで作業を進めるか Wi-Fi を待つかが決まります。',
    'Index from the NAS':
      'NAS の Node コンテナが自分のディスクからヘッダーを読み、写真の横にインデックスファイルを書きます。スマホはそれを落とし、足りない行を加えます。',
    'Move the index to a new phone':
      'SQLite がインデックスの NAS 部分を 1 つのファイルにまとめ、共有シートに渡します。新しいスマホはそのファイルをつなぎ、行を取り込みます。',
    Language:
      'i18next が 9 つのカタログを持ち、expo-localization がスマホの言語を読みます。設定での選択が優先され、リマインダーを予約し直します。',
    Theme: '1 つのパレットが明るい色と暗い色の組を持ちます。画面はスマホか保存した選択に従うフックで読みます。',
    'Ads and remove ads':
      '同意の後、Google Mobile Ads が AdMob のバナーと全画面広告を出します。expo-iap が Google Play で広告の削除を販売します。',
    'Memories Pro':
      'expo-iap が Google Play と App Store で販売します。1 つのモジュールが、鍵の付いた機能を開く前に購入を確かめます。',
    'Desktop sorter':
      'Rust のバックエンドを持つ Tauri アプリがパソコンのフォルダを整理します。スマホと同じフォルダ規則のクレートを使います。',
    Archive: '月の一覧はトリガーが保つ日ごとの写真数を読みます。タップするとその月のファイルを撮影時刻で引きます。',
    'Trip list and places map':
      '旅行の一覧は、日ごとの集計から海外旅行と国内のドライブ旅行をまとめます。WebView の Leaflet が小さなマスごとの写真数で地図を描きます。',
    People:
      'NAS の Rust エンジンが YuNet と SFace で顔をまとめます。スマホは結果を落とし、名前と統合を NAS に書き戻します。',
    'Indexing progress page':
      '顔エンジンとインデクサーが NAS に状態ファイルを書きます。Node サーバーがそれをサーバー送信イベントで動くページにします。',
    'Albums about a person':
      'アルバムファイルがその人、生年月日、メモを持ちます。NAS のアルバムサーバーが写真を年齢の 1 年ごとに並べます。',
    'Turn a photo':
      '顔エンジンが各写真を 90 度、180 度、270 度に回して試します。スマホが EXIF の向きを設定し、確認の後に NAS のファイルを差し替えます。',
    'Edit a photo':
      'Konva が Expo DOM コンポーネントの中でエディターを動かします。「コピーを保存」は JPEG をスマホと NAS に書き、「保存」はバイトを比べてからファイルを置き換えます。',
    'Draw a new picture':
      '同じ Konva のエディターが白紙で開きます。保存するとアップロードの規則でスマホと NAS に絵を書きます。',
    'Photos on the phone':
      'Kotlin のローカル Expo モジュールが、一度の許可でカメラフォルダを読みます。そのファイルは NAS のファイルと同じインデックスに入ります。',
    Settings:
      '小さな値は expo-sqlite のキーバリュー保存にあり、起動時に読みます。NAS のパスワードは安全な保存場所にあります。',
    'Duplicates on the NAS':
      'インデックスのクエリが NAS のファイルを撮影時刻とサイズでまとめます。WebDAV でバイトを比べて各組を確かめてから、コピーを NAS のごみ箱へ移します。',
    Updates:
      '共有の更新パッケージが最新の GitHub リリースを読み、Android のインストーラーを開きます。Google Play 版はこれを空の代替に差し替えます。',
    'Light, blur and fonts':
      'Konva のフィルターが色のスライダーを当て、次に楕円か帯の周りをぼかします。各キャプションは自分のフォントの種類を保ちます。',
    'On the iPhone':
      'iOS 用のファイルが Android のモジュールを写真ライブラリ、URLSession、App Store の版に差し替えます。フォルダ規則は Swift 経由で Rust の XCFramework として動きます。',
  },
};

export default arch;

import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'Android スマホと Google TV 向けの 1 つの Kotlin アプリが、スマホや USB メモリ、SMB 共有のファイルを libVLC で再生します。ライブラリと再生位置は端末の SQLite に残り、GitHub の APK はオンライン音楽も加えます。',
  parts: [
    { name: 'Kotlin と Android Views', role: 'リモコンとタッチ用の画面で、スマホと TV で同じアプリです。' },
    { name: 'libVLC', role: '動画と音楽を再生し、タグを読み、SMB 共有を一覧にします。' },
    { name: 'SQLite', role: '再生位置、音楽と本と動画のライブラリ、本ごとの位置を持ちます。' },
    { name: 'Media3', role: '通知、ロック画面の操作、Bluetooth ボタンを持つ音楽セッションです。' },
    { name: 'WorkManager', role: '音楽、本、動画のフォルダをバックグラウンドでスキャンします。' },
    { name: 'sherpa-onnx', role: 'スマホで Hey Lumi を聞き取るキーワード検出器です。' },
    {
      name: 'Chaquopy と yt-dlp',
      role: 'MusicBrainz の名前と YouTube の音を使うオンラインモジュールで、GitHub の APK だけに入ります。',
    },
    { name: 'Google Play Billing と AdMob', role: 'Pro と広告削除の購入、スマホのバナーです。' },
  ],
  flow: [
    'ユーザーがスマホのフォルダ、USB メモリ、SMB 共有を追加します。',
    'バックグラウンドのスキャンが名前とタグを端末の SQLite に書きます。',
    'ホーム画面がファイル、曲、本、動画を一覧にします。',
    'タップ、リモコンのキー、音声コマンドで再生するものを選びます。',
    'libVLC が再生し、アプリは再生中に位置を保存します。',
  ],
  links: [
    { to: 'guitar-upscale', text: 'タブを探すは Android のリンクで、再生中の曲を Guitar Upscale で開きます。' },
    { to: 'spotthecam', text: 'Hey Lumi は Hey Spot とマイクを分け合うので、両方のフレーズが同時に使えます。' },
    { to: 'keeppad', text: 'Hey Lumi は Hey Keep と同じキーワードモデルを使い、マイクも分け合います。' },
    { to: 'GitHub', text: 'APK とその更新は GitHub のリリースから届きます。' },
    { to: 'Google Play', text: 'Play 版、その更新、Pro と広告削除の購入です。' },
  ],
  features: {
    Sources:
      'USB のフォルダは Android のファイルシステムで開き、SMB 共有は libVLC が一覧にします。保存した NAS の一覧は端末に残り、Android のバックアップに入りません。',
    Resume:
      'プレーヤーは 5 秒ごとと終了時に再生位置を SQLite に保存します。ファイル一覧は同じ表を読み、各ファイルの下にバーを出します。',
    'Subtitles and audio':
      'libVLC が埋め込みトラックとフォルダ内の字幕ファイルを一覧にします。テキスト字幕は UTF-8 で読み、だめなら Windows-1251 で読みます。',
    Controls:
      'プレーヤーが libVLC のスキップと速度を操作します。キューのモジュールが再生順、シャッフル、リピートを持ちます。',
    Updates:
      '起動時に APK が GitHub の最新リリースを読み、新しい APK をダウンロードします。その後 Android のインストーラーが確認を求めます。',
    Ads: 'AdMob は Google の同意フォームのあと、スマホにバナーを出します。広告削除か Pro の購入で 1 つのチェックがバナーを隠し、TV には広告が出ません。',
    Languages:
      'Android の文字列リソースが 9 言語を持ちます。AppCompat の言語 API が設定での選択か端末の言語を使います。',
    'Touch on a phone':
      '動画の上のジェスチャー層が、タップとドラッグをスキップ、シーク、明るさ、音量に変えます。TV のリモコンはこの層を通りません。',
    'Panel buttons':
      '選んだボタンの組は端末のプレーヤー設定に残ります。プレーヤーはその組からボタンの列を作り、libVLC が画面の比率を変えます。',
    'Sponsor skip':
      'プレーヤーはファイル内の SponsorBlock チャプターを読むか、動画 ID のハッシュで SponsorBlock API に聞きます。その後 libVLC が各区間を飛ばします。',
    'Phone speaker':
      '内蔵スピーカーを選ぶ無音のオーディオトラックが、libVLC の音も連れていきます。毎秒のチェックで、音の出ない Bluetooth をスピーカーに戻します。',
    Look: 'コードで組んだシンプルな Android Views が、色、文字、フォーカスのピルを共有します。ロゴは Instrument Serif です。',
    'Music library':
      'WorkManager のジョブが各フォルダを回り、libVLC でタグを読みます。曲は端末の SQLite に入り、Android のバックアップには入りません。',
    'Music player':
      'Media3 のセッションが libVLC で曲を映像なしで再生します。通知とロック画面の操作を描き、プレーヤーバーは各画面でそれに従います。',
    'MusicBrainz and YouTube':
      'MusicBrainz が曲、アーティスト、アルバムの名前を出します。yt-dlp は Chaquopy 経由の Python で動き、YouTube から音を取ります。GitHub 版 APK のみです。',
    Audiobooks:
      'スキャンが OPF ファイル、タグ、フォルダ名で音声ファイルを本にまとめます。Wikidata が著者を示し、SQLite が本ごとの位置を持ちます。',
    'Video library':
      'スキャンは各動画のパスだけを SQLite に保存します。パーサーが名前から番組、シーズン、話数を読み、Wikidata が別名を加えます。',
    'Find tabs':
      'プレーヤーバーがアーティストと曲名入りの Android リンクを Guitar Upscale に送ります。Android がそのアプリを見つけたときだけボタンが出ます。',
    'Google Play build':
      '2 つ目のビルドタイプは自動更新、ファイルへの広いアクセス、オンラインモジュールを外します。更新は Google Play が行います。',
    'Voice commands':
      'sherpa-onnx がスマホで Hey Lumi を聞き、Android の音声認識がコマンドを受けます。照合で曲、本、動画を探し、音声合成が答えます。',
    'Online music':
      'オンラインモジュールが Chaquopy の Python で yt-dlp を動かします。MusicBrainz が曲名を出し、YouTube が音を出します。64 ビットのスマホの GitHub APK だけです。',
    'Lumiere Pro':
      'Google Play Billing が Pro を 1 つ売り、アプリは起動のたびに Google Play に聞きます。アプリ内の 1 つのチェックが音声機能を開き、バナーを隠します。',
  },
};

export default arch;

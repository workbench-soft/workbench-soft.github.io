import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'サーバーを持たない Kotlin の Android アプリです。フォアグラウンドサービスがウェイクワードを聞き、電話が Shazam のフィンガープリントを自分で作り、曲は Spotify と Lumiere に入ります。',
  parts: [
    {
      name: 'ListenService',
      role: 'フォアグラウンドのマイクサービス。80 ms ずつ読み、キャッチを始め、結果を声で伝えます。',
    },
    { name: 'sherpa-onnx', role: '1 行のフレーズ定義で「Shazam」を聞くキーワード検出。学習は不要です。' },
    {
      name: 'Signature.kt',
      role: 'shazamio のフィンガープリントの Kotlin 移植。16 kHz モノラルの FFT と 4 帯域のピークです。',
    },
    { name: 'Shazam', role: '認識サービス。3、6、9、12 秒の時点でフィンガープリントを送って問い合わせます。' },
    { name: 'Spotify.kt', role: 'PKCE ログイン、ISRC による曲の検索、お気に入りへの保存。' },
    { name: 'wakeshare', role: 'このリポジトリの共有マイクモジュール。ほかのウェイクアプリもフレーズを保てます。' },
  ],
  flow: [
    'キーワード検出が「Shazam」を聞き、サービスがマイクを取ってビープ音を鳴らします。',
    'キャッチは録音してフィンガープリントを作り、その裏で Shazam に問い合わせます。',
    '見つかった曲は broadcast で Lumiere に、そして Spotify のお気に入りに送られます。',
    '声が結果を伝え、マイクはまたすべてのウェイクフレーズを聞きます。',
  ],
  links: [
    { to: 'Shazam', text: 'フィンガープリントを受け取り、曲名、アーティスト、アルバム、ISRC を返します。' },
    { to: 'Spotify', text: 'ISRC で、次にアーティストと曲名で曲を探し、お気に入りに保存します。' },
    { to: 'lumiere-player', text: 'broadcast LIKE_CAUGHT_SONG で曲を受け取り、お気に入りに加えます。' },
    { to: 'keeppad', text: 'wakeshare を通じて SongCatcher、SpotTheCam、ServoHop とマイクを共有します。' },
  ],
  design: {
    scale: [
      '持ち主 1 人の電話で、1 日に数回のキャッチ。',
      'Shazam は 2 分で約 15 回の問い合わせのあと 429 を返したので、1 回のキャッチで送るのは最大 4 回です。',
    ],
    data: [
      '最新 50 曲と Spotify の状態は shared preferences に保存します。',
      'オフラインで作ったフィンガープリントは最大 1 週間そこで待ちます。音そのものは残しません。',
    ],
    interfaces: [
      'amp.shazam.com へのフィンガープリントの HTTPS POST と、bearer トークン付きの Spotify Web API。',
      'com.workbenchsoft.lumiere への明示的な broadcast と、ほかのウェイクアプリとの wakeshare バインドサービス。',
    ],
    reliability: [
      'ネットなし、429、5xx のときはフィンガープリントを残し、次の起動や開始時に送ります。',
      'Spotify のライブラリが確認して初めて保存済みにします。残りはボタンで再試行します。',
    ],
    security: [
      'ログインは PKCE なので、クライアントシークレットはありません。リフレッシュトークンは Android Keystore の鍵で暗号化します。',
      '電話から出るのは数 KB のピーク、フィンガープリントだけです。録音はキャッチの終わりに消えます。',
    ],
    performance: [
      '問い合わせは別スレッドで走るので、Shazam が 0.3 から 0.6 秒で答える間も録音は続きます。',
      '最初の問い合わせは音楽 3 秒後に出て、ほとんどの曲はそこで見つかります。',
    ],
    operations: [
      'CI が単体テストを走らせ、APK を songcatcher アーティファクトとしてビルドします。',
      'SignatureTest がフィンガープリントを shazamio のバイトに、CatalogTest が 9 つの文字列カタログを合わせます。',
    ],
    tradeoffs: [
      '問い合わせごとに有料トークンが要る AudD や、Apple の開発者費用が要る ShazamKit ではなく、無料の Shazam エンドポイントを選びました。公開 API ではないので変わる可能性があります。',
      '学習済みの openWakeWord ヘッドではなく sherpa のフレーズ定義を使い、学習なしで出しました。ヘッドはあとで入ります。',
      'Lumiere の中の機能ではなく独立アプリにし、Lumiere が止まっていてもキャッチできます。入れる APK は 1 つ増えます。',
    ],
  },
  features: {
    'Wake by voice':
      'KeywordAudio.kt が keywords.txt の行で sherpa-onnx を走らせます。ListenService.kt はキャッチ中に共有マイクを持ち、Voice.kt でビープ音を鳴らします。',
    'Song recognition':
      'Catch.kt が 100 ms ずつ Signature.kt に渡し、3、6、9、12 秒でフィンガープリントを送ります。Shazam.kt は曲名、アーティスト、アルバム、ISRC を読みます。',
    'Liked Songs in Spotify and Lumiere':
      'Lumiere.kt がアーティスト、曲名、アルバム、ISRC、時刻付きの broadcast を送ります。Spotify.kt は ISRC で、次に名前で探し、ライブラリに保存します。',
    'Spoken answer':
      'Voice.kt がビープ音を鳴らし、音楽を下げて Android の音声合成で話します。画面のスイッチで声を切れます。',
    'Offline catches':
      'History.kt がフィンガープリントと長さを残します。キャッチのたびと起動時に、サービスが待機分を送り、見つかった曲を声なしで保存します。',
    'Caught songs':
      'History.kt が最新 50 曲と Spotify の状態を残します。retryPending が待機中の曲を保存し、何曲入ったかを伝えます。',
    Lyrics:
      'Lyrics.kt はアーティスト、曲名、アルバムで LRCLIB に問い合わせ、次に検索し、結果をキャッシュフォルダに保存します。Compose の SongSheet は読み込み表示、歌詞、再試行を出します。',
    Languages:
      '表示と音声のテキストはすべて res/values の strings.xml に 9 言語であり、CatalogTest がキーをそろえます。',
    'Shared microphone':
      'WakeShare がバインドサービスでウェイクアプリをつなぎます。パッケージ名がいちばん小さいアプリがマイクを持ち、聞いたフレーズのアプリに WAKE を送ります。',
    'Wake engine':
      'wakeword が ONNX Runtime で openWakeWord ヘッドを持ち主ごとの検証器と共に走らせます。ヘッドのないフレーズは、今の SongCatcher のように sherpa 検出で聞きます。',
  },
};

export default arch;

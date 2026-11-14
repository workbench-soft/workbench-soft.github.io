import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'Next.js のアプリがブラウザと Cloudflare Workers で動きます。Capacitor が同じビルドを Android と iPhone のアプリに詰め、音のエンジンは端末の上で動きます。',
  parts: [
    { name: 'Next.js と React', role: '各機能を載せた 1 枚のページで、サーバーが一度描画した後はブラウザで動きます。' },
    { name: 'サウンドエンジン', role: 'React の外で動くプレーヤーと録音器で、RxJS のイベントバスでつながります。' },
    { name: 'Web Workers', role: '拍のクロック、押さえ方の探索、コード判定をメインスレッドの外で行います。' },
    { name: 'smplr と Web Audio', role: 'General MIDI のサンプル音源と、リバーブとディレイのバスです。' },
    { name: 'Redux Toolkit', role: '設定と画面の状態をブラウザに保存します。' },
    { name: 'Konva', role: '指板、ピアノロール、タブ譜のキャンバスです。' },
    { name: 'Capacitor', role: '静的ビルドをネイティブプラグインと一緒に Android と iPhone のアプリへ詰めます。' },
    {
      name: 'Cloudflare Workers と KV',
      role: 'OpenNext でサーバービルドを動かし、曲サイトを中継して内蔵曲を保管します。',
    },
  ],
  flow: [
    'タップ、コード、読み込んだ曲がイベントバスに音を流します。',
    'Web Worker のクロックが再生、ストローク、ルーパーを拍に合わせます。',
    'smplr ライブラリが各音をリバーブとディレイに通して鳴らします。',
    '録音器が各音を tick ごとに記録し、ピアノロールと MIDI に渡します。',
    '外部サイトの曲と歌詞は Cloudflare の Worker を通って届きます。',
  ],
  links: [
    { to: 'lumiere-player', text: 'Lumiere Player は再生中の曲をリンクで Guitar Upscale に開きます。' },
    { to: 'keeppad', text: 'Hey Guitar の呼びかけは KeepPad と同じ sherpa-onnx のキーワードモデルを使います。' },
    { to: 'Songsterr', text: 'Songsterr のタブ譜は Worker の中継を通って Guitar Pro ファイルになります。' },
    { to: 'Google Play', text: 'Google Play が Pro と Remove ads を売り、AdMob が広告を出します。' },
    { to: 'Cloudflare', text: 'Cloudflare Workers がサイトを動かし、KV が内蔵曲を保管します。' },
  ],
  features: {
    Fretboard:
      'Konva が設定のスケールとチューニングから指板をキャンバスに描きます。タップは音をイベントバスに送り、smplr が鳴らします。',
    'Scale, tuning and capo':
      'スケールとチューニングはアプリ内の固定データです。選ぶと Redux に入り、指板と押さえ方が作り直されます。',
    Tuner:
      'pitchy ライブラリがブラウザの中でマイクから音の高さを読みます。アプリは開放弦からチューニングを推測し、Konva がメーターを描きます。',
    Chords: '最大 4 つの Web Worker が指板とカポに合う押さえ方を探します。パネルはコードの種類ごとに埋まっていきます。',
    Strumming:
      '押さえたコードボタンが Worker のクロックで選んだパターンを弾きます。自作のパターンはブラウザに残ります。',
    'Song list':
      '内蔵曲は Cloudflare KV の Guitar Pro ファイルで、ビルド時に JSON になります。自分の曲はブラウザに残り、リストは曲ごとのスケールを示します。',
    'Voice search':
      'ブラウザでは Speech API が言葉を聞き、Android アプリは端末の音声サービスを使います。その後アプリはリストの曲を再生するか曲サイトを検索します。',
    'Hey Guitar':
      'Android では KeepPad の sherpa-onnx キーワードモデルがオフラインで呼びかけを聞きます。ブラウザではページが開いている間だけブラウザの音声サービスが聞きます。',
    'MIDI recording':
      '録音器はイベントバスを聞いて各音をクロックの tick ごとに記録します。アプリ自身が鳴らした音には印があり、テイクから外れます。',
    Looper:
      '最大 8 チャンネルが Worker のクロックでイベントバスから録音します。ループは小節単位にそろい、拍を合わせて鳴ります。',
    Quantize: '設定の 1 つの長さがピアノロールのグリッドを決めます。録音器は入ってきた音をすぐそのグリッドに乗せます。',
    'Piano roll':
      'ピアノロールは共有の音のタイムラインをその場で編集し、トラックごとに元に戻せます。Konva が音を描き、ファイルに区切りがなければ worker が曲の構成を推測します。',
    'Tab view':
      'レイアウトのモジュールが 1 トラックの音を弦とフレットに置き換えます。Konva が小節を描き、共有の再生位置を追います。',
    'Chord sheet':
      'コードと歌詞のサイトはブラウザからの呼び出しを拒むので、Worker が歌詞を取ります。アプリはそのコードを曲のキーに移し、各行を曲の時間に合わせます。',
    'Song upload':
      '読み込み器が Guitar Pro と MIDI のファイルをブラウザで音にします。音声ファイルは名前で曲サイトを探すか、ONNX モデルが端末でコードを聞き取ります。',
    'Find a song online':
      'Cloudflare の Worker がブラウザからの呼び出しを拒む 4 つの曲サイトへ検索を中継します。アプリは Songsterr の曲を Guitar Pro ファイルに変えます。',
    'Chord and scale detection':
      'Web Worker のコード判定器がタップした音を押さえ方と照らし合わせます。スケール判定器はメインスレッドで動いてスケールを提案します。',
    'Instruments and sound':
      'smplr ライブラリが無料の音源セットから General MIDI の音を鳴らし、最初のタップで読み込みます。メロディとコードはそれぞれ別の楽器を持ちます。',
    Effects:
      '各楽器はたたみ込みリバーブとフィードバックディレイを持つ Web Audio のバスに入ります。スライダーは楽器を読み直さずにバスをその場で変えます。',
    'MIDI export':
      'midi-writer-js ライブラリが読み込んだ音を MIDI ファイルに書きます。Guitar Pro の書き出し器が同じ音を Guitar Pro ファイルに保存します。',
    'Guitar Upscale Pro':
      '各ビルドには各機能が入っています。Android アプリは端末の Google Play Billing が購入を伝えるまで Pro の機能を隠します。',
    'Install and offline':
      'Service worker がページ、コード、曲をオフライン用にキャッシュします。Android アプリは静的ビルドと音を APK の中に持ちます。',
    'iPhone app':
      'Capacitor が同じ静的ビルドを Swift プラグイン付きの iOS プロジェクトに詰めます。StoreKit が購入を扱い、AdMob はトラッキングの確認の後に広告を出します。',
    'Screen layout': 'React のコンポーネントが全画面の指板キャンバスの上に浮かびます。設定でコードを左か右に置けます。',
    'Play panel':
      'プレーヤーが Worker のクロックで音のタイムラインを進み、各音をバスに送ります。コードパネルは押さえ方探索の worker から押さえ方を受け取ります。',
    'Easy and Pro mode':
      'Easy の間はプレーヤーのフィルターがコードのイベントだけを残します。コードのない曲は最初から最後まで鳴ります。',
    'Song links':
      'メニューは曲名から各サイトの検索アドレスを作ります。サイトは新しいタブか Android のブラウザで開きます。',
    'Built-in songs admin':
      '管理ページと持ち主の端末が曲を Cloudflare KV に書き込みます。端末用のルートは開発者キーを確かめ、GitHub Actions でデプロイを始めます。',
    Settings:
      'Redux Toolkit が各設定を持ち、redux-persist がブラウザに保存します。エンジンは React の外で単純なコピーを読みます。',
    'Android updates':
      'GitHub 版は起動時と復帰時に GitHub Releases へ新しい APK を尋ねます。ネイティブプラグインがそれを取ってきてインストーラーを開きます。',
    Ads: 'AdMob がアプリにバナーと全画面広告を出します。Google Play での Remove ads の購入か端末の開発者キーで広告が消えます。',
    Languages:
      'i18next がアプリの文章を 10 のカタログに持ち、端末かブラウザの言語に従います。レッスンページは言語ごとに専用のパスで作られます。',
  },
};

export default arch;

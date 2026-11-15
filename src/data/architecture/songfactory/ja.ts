import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'Python のコマンドラインツールが Windows の PC で ffmpeg とローカルの GPU を使って動きます。テーマのフォルダーを YouTube 動画に変え、デスクトップのウィンドウか Archon が操作します。',
  parts: [
    { name: 'Python と uv', role: 'songfactory コマンドとそのモジュールで、uv で動かします。' },
    { name: 'ffmpeg', role: '曲をミックスし、クリップをループさせ、GPU の NVENC でエンコードします。' },
    { name: 'numpy と Apollo', role: '非可逆の圧縮で切られた高音域を作り直します。' },
    { name: 'Claude CLI', role: 'Claude のサブスクリプションでトピック、歌詞、YouTube の文章を書きます。' },
    { name: 'Playwright', role: 'Chromium で Suno のサイトを操作し、曲を作ってダウンロードします。' },
    { name: 'ComfyUI', role: 'ローカルの GPU でプロンプトから背景クリップを描きます。' },
    { name: 'YouTube Data API', role: 'サムネイル、AI ラベル、公開時刻と一緒に動画をアップロードします。' },
    { name: 'tkinter', role: '選んだ曲を 9 言語の画面でクリーンアップか強化するデスクトップのウィンドウです。' },
  ],
  flow: [
    '曲はテーマのフォルダーか Suno のタイルから来ます。',
    'ffmpeg が各曲をクリーンアップし、元のファイルを残します。',
    'ffmpeg がループするクリップの上で曲をクロスフェードでつなぎます。',
    'ビルドがチャプター、説明、サムネイルを書きます。',
    'YouTube Data API が公開時刻を付けて動画をアップロードします。',
  ],
  links: [
    { to: 'archon', text: 'Archon の Songs タブがタイルを描き、songfactory コマンドで各タイルを動かします。' },
    { to: 'Suno', text: 'Suno が曲を作り、Playwright がダウンロードします。' },
    { to: 'YouTube', text: '動画は YouTube Data API で上がり、1 日に 6 本ほどです。' },
    { to: 'Claude', text: 'Claude CLI はサブスクリプションで文章を書き、API のアカウントは要りません。' },
  ],
  design: {
    scale: [
      'GPU 付きの Windows PC 1 台に作り手 1 人です。毎日の実行でアップロードするのは多くても約 6 本です。',
      '1 回のアップロードは YouTube の 1 日 10,000 クォータ単位のうち約 1,600 を使い、このクォータが上限を決めます。',
      'ローカルの GPU は 1 回の実行で 720p の約 5 秒の映像を作るので、背景はどれもループするクリップです。',
    ],
    data: [
      '状態はテーマフォルダのファイルです。theme.toml が設定を持ち、out/upload.json がテーマの完了を示し、out/claude.json が Claude の書いた文章を保存します。',
      'プロジェクトは 10 個のタイルを pipeline.json に持ち、それぞれ kind、enabled、params があります。',
      '整えた曲は FLAC で out/clean/ に入り、元のファイルは残ります。秘密情報はリポジトリの外のフォルダにあります。',
    ],
    interfaces: [
      'CLI には bg、clean、build、upload、publish、run、enhance、clips とタイルのコマンドがあります。Archon の Songs タブは songfactory project を読み、songfactory tile を実行します。',
      'ffmpeg と ffprobe はサブプロセスとして動き、ComfyUI にはプロンプトとシードを埋めた workflows/loop.json を HTTP で渡します。',
      'upload.py はデスクトップアプリ用の OAuth サインインの後、YouTube Data API の videos.insert と thumbnails.set を呼びます。',
      'progress.py が step、file i/n、progress NN% の行を出し、ランチャーがそれをバーにします。',
    ],
    reliability: [
      'upload.json は YouTube が動画 ID を返した時点で書くので、サムネイルが失敗しても 2 回目のアップロードは起きません。',
      'run は _ かドットで始まるフォルダを飛ばし、1 つが失敗しても次のテーマに進みます。',
      'claude.py は任意です。CLI がない、または呼び出しが失敗すると 1 行を出し、テーマはフォルダ名をタイトルにして続きます。',
      'オフにしたタイルは入力をそのまま渡し、音声タイルは実行された直前のタイルのファイルを受け取ります。',
    ],
    security: [
      'YouTube の OAuth トークンとその他の秘密情報は、リポジトリの外のフォルダにあります。',
      'claude -p は API キーの環境変数を外して動くので、API アカウントではなくサインイン済みのサブスクリプションに課金されます。',
      'アップロードは containsSyntheticMedia を設定し、Google がプロジェクトを監査するまで非公開のままです。',
    ],
    performance: [
      'PC に GPU があれば h264_nvenc で GPU がエンコードし、なければ libx264 が引き継ぎます。',
      'クリップは -stream_loop とピンポンでループするので、5 秒のクリップで長い動画をまかない、長いレンダリングは要りません。',
      '整音は固定ゲイン、highpass、afftdn、7 kHz の動的カットを 1 回の ffmpeg 呼び出しで行い、ニューラルモデルは使いません。',
      'バッチの enhance は 1 つの CLI プロセスで動くので、全曲で compare.html を 1 つだけ書きます。',
    ],
    operations: [
      'Windows のタスクスケジューラが、曲、トークン、GPU のある PC で毎日 03:00 に mise run daily を実行します。',
      'checks.yml は main への push のたびに、セルフホストの Windows ランナーで lint、テスト、uv build を実行します。',
      'release.yml は Checks と並べて wheel と sdist をビルドし、Checks が通ると release-gate.sh が公開します。Checks が失敗するとビルドを取り消します。',
      'mise run doctor は前提条件ごとに ok か MISSING を 1 行で出し、ランチャー向けには JSON でも出します。',
    ],
    tradeoffs: [
      'Python の動画ライブラリではなくコマンドラインの ffmpeg にして、ミックス、ループ、NVENC エンコードを 1 つのツールにまとめましたが、フィルターグラフは文字列なので打ち間違いは実行時に出ます。',
      '曲と同じ長さのクリップではなく短いループクリップにしました。GPU が 1 回で作るのは約 5 秒だからです。',
      'データベースではなくテーマごとのただのファイルにして、1 つのファイルでアップロード済みか分かりますが、フォルダを動かすとアップロードとの対応が切れます。',
      'CI の cron ではなくローカルのタスクスケジューラにしました。曲とトークンが git の外にあるためですが、03:00 に PC が起きている必要があります。',
    ],
  },
  features: {
    'Audio workbench':
      'tkinter のウィンドウが選んだファイルにクリーンアップか強化のコマンドを実行します。名前の確認で 2 つの出力がぶつかる前に処理を止めます。',
    'Tile pipeline':
      '各プロジェクトは 10 個のタイルとその設定を JSON ファイルに持ちます。ランナーは前のタイルの出力を次に渡し、Archon がタイルを描きます。',
    'Per-song videos':
      'クリップのモジュールがテーマ、クリーンアップ、エンコーダーを使い回して曲ごとのループ動画を作ります。求めれば ffmpeg がカットでつなぎます。',
    'Install and check the setup':
      'PowerShell のスクリプトが mise、固定した版のツール、パッケージを入れます。診断のモジュールが前提を 1 つずつ確かめ、直し方を示します。',
    'Long video from a playlist':
      'ffmpeg が曲をクロスフェードでミックスし、音声の長さまでクリップを繰り返します。GPU が対応していればエンコードは NVENC で行います。',
    'Cleanup of AI artifacts':
      '1 本の ffmpeg フィルターチェーンが固定のゲインを掛け、低いうなり、ヒスノイズ、強いきらつきを取ります。きれいにしたコピーは元の曲の隣に FLAC で置きます。',
    'Enhance a song':
      'numpy が下の帯域から高音域を作り直します。代わりに GPU の Apollo モデルも使え、ページが前後のスペクトログラムを並べます。',
    'Seamless loop':
      'ffmpeg がクリップを順再生してから逆再生し、そのあとループします。最後と最初のコマの間の飛びが消えます。',
    'Chapters and thumbnail':
      'チャプターの時刻は曲の長さからクロスフェードの分を引いて出します。Pillow がクリップの 1 コマにタイトルを書きます。',
    'Scheduled upload':
      'YouTube Data API が AI ラベルと公開時刻を付けて動画を上げます。Windows のタスク スケジューラが毎日 03:00 にビルドを動かします。',
    'Text from Claude':
      'Claude CLI が曲名から空のタイトル、説明、タグを書きます。テーマのフォルダーにあるファイルが答えを残し、次のビルドで使います。',
    'Background from ComfyUI':
      'ツールがローカルの GPU の ComfyUI ワークフローにプロンプトを送ります。返ってきたクリップがループする背景になります。',
  },
};

export default arch;

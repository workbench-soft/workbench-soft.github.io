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

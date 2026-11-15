import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'Rust のコアと React のウィンドウでできた、Windows 向けの Tauri 2 アプリです。コアが Claude Code を動かしてスレッドを探し下書きを書き、投稿には Chrome を開きます。',
  parts: [
    { name: 'Tauri 2', role: 'ウィンドウと Rust のコアを 1 つのインストーラーにまとめるデスクトップの殻。' },
    { name: 'Rust のコア', role: 'Claude Code と Chrome を動かし、JSON ファイルを保ち、投稿のペースを抑えます。' },
    { name: 'React と Vite', role: 'Comments と Posts のタブとそのカードがあるウィンドウ。' },
    { name: 'Claude Code', role: 'リポジトリを読み、Reddit の MCP サーバーでスレッドを取り、下書きを書きます。' },
    { name: 'chromiumoxide', role: 'Post it for me を押すと、アプリ専用の Chrome ウィンドウを操作します。' },
    { name: 'axum', role: '同じウィンドウをローカルの HTTP で配り、Archon が枠に入れられるようにします。' },
    { name: 'i18next', role: 'ウィンドウの 9 言語のカタログ。' },
    { name: 'Tauri の更新プラグイン', role: '署名された新しいビルドを見つけて入れます。' },
  ],
  flow: [
    '利用者がリポジトリを選び、Find を押します。',
    'コアがそのリポジトリで reddit-comments スキル付きの Claude Code を起動します。',
    'Claude が Reddit のサーバーで人気のスレッドを読み、下書きをファイルに書きます。',
    'コアが下書きを 6 件残し、カードで表示します。',
    'カードを開くと、Chrome にスレッドと下書きが渡ります。',
  ],
  links: [
    { to: 'agent-skills', text: 'その reddit-comments スキルがスレッドを選び、各コメントの口調を決めます。' },
    { to: 'archon', text: 'Archon の Reddit タブがウィンドウを枠に表示し、閉じていればアプリを起動します。' },
    { to: 'Reddit', text: 'Claude は MCP サーバーでスレッドを読み、投稿は利用者が Chrome で行います。' },
    {
      to: 'GitHub Releases',
      text: 'インストーラーと署名付きの更新ファイルは、公開サイトのリポジトリのリリースに置かれます。',
    },
  ],
  features: {
    'Repo picker':
      'Rust のコアが、設定にあるルートフォルダーの下の git フォルダーを並べます。選んだものはアプリのデータフォルダーの JSON ファイルに残ります。',
    Subreddits:
      'コアが MCP サーバーなし、読み取りツールだけで Claude Code を動かします。Claude がリポジトリからサブレディットを挙げ、一覧はリポジトリごとに残ります。',
    'Find threads':
      'コアがリポジトリで reddit-comments スキルと Reddit の MCP サーバー付きの Claude Code を動かします。Claude がスレッドと下書きをファイルに書き、コアが 6 件残します。',
    'Steps on top': 'React のウィンドウが、検索とカードの状態から待っている手順を光らせます。',
    Cards: 'カードはコアが書くキューのファイルから来ます。入力欄からフォーカスが外れると、編集がそこに保存されます。',
    'Open in Chrome':
      'コアが下書きをクリップボードに入れ、選んだプロファイルで Chrome を開きます。上限により、投稿したコメントは 1 時間に 3 件までです。',
    'Post it for me':
      'コアがデバッグポート付きの専用 Chrome を起動し、chromiumoxide で操作します。旧 Reddit のフォームを埋めて Save を押し、コメントが出たかを確かめます。',
    'Posts tab':
      'Claude Code がチェックしたリポジトリと marketing スキルを読み、投稿の下書きをファイルに書きます。コアは 3 件を残し、ファイルのないメディアを外します。',
    'Screenshots and videos':
      'Claude がリポジトリのスクリーンショットフォルダーから、キャプションをもとに 4 件まで選びます。ファイルを押すとエクスプローラーで表示します。',
    'Open a post':
      'コアが Chrome で旧 Reddit の投稿ページを開き、タイトルと本文をアドレスに入れます。メディア付きの投稿では最初のファイルをエクスプローラーで表示します。',
    'Ban risk':
      'Rust のモジュールが、投稿とコメントの履歴ファイルから次の投稿を評価します。ルールは marketing スキルによるもので、たとえば 1 日 1 コミュニティです。',
    'Tester post':
      'コアが Google Group のリンクとパネルのアプリの行からテンプレートを埋めます。Claude の実行はいりません。',
    'Inside Archon':
      'コアが axum で同じウィンドウとコマンドをローカルの HTTP で配ります。Archon がそれを枠に表示し、タブを閉じて 2 分後にアプリは終わります。',
    'Info button':
      'ウィンドウのダイアログが、Find に必要なものと BAN のリスクのルールを示します。バージョンと更新の確認もあります。',
    Updates:
      'Tauri の更新プラグインが、起動時と 24 時間ごとに GitHub のリリースから署名付きの更新ファイルを読みます。インストーラーを動かす前に署名を確かめます。',
    Language:
      'i18next がウィンドウに 9 つのカタログを持ちます。選んだ言語は設定ファイルに残るので、Tauri のウィンドウと Archon の枠で共有されます。',
    'Done list':
      '投稿したスレッドと飛ばしたスレッドは、日付とともに履歴ファイルに移ります。次の Find はそれを Claude に渡して飛ばさせます。',
  },
};

export default arch;

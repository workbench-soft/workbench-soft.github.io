import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'ローカルの git から各リンクを組み立てる VS Code 拡張です。ホストにはリクエストを送らず、リンクをブラウザーで開くかコピーします。',
  parts: [
    { name: 'VS Code API', role: '8 つのコマンドとメニューを登録し、設定と選択範囲を読みます。' },
    { name: 'git', role: 'リポジトリのルート、リモート URL、ブランチを返します。1 回の呼び出しは 10 秒までです。' },
    { name: 'リンクビルダー', role: 'リモートを各ホストのファイル、blame、履歴のリンクに変える素の TypeScript。' },
    {
      name: 'vscode.env',
      role: 'ローカルでもリモートのウィンドウでも、リンクをブラウザーで開くかクリップボードに入れます。',
    },
    { name: 'vscode.l10n', role: 'コマンド、設定、メッセージを 9 言語に訳します。' },
    { name: 'esbuild', role: 'コードを 1 ファイルにまとめ、拡張を速く読み込ませます。' },
    { name: 'GitHub Actions', role: 'チェックと並べて .vsix を作り、チェックが通ると公開します。' },
  ],
  flow: [
    '利用者がパレット、エディター、エクスプローラーからコマンドを実行します。',
    '拡張は git でファイルのリポジトリのルートを見つけます。',
    'git がリモート URL とファイルを含むブランチを返します。',
    'リンクビルダーが選択行付きでそのホスト向けの URL を書きます。',
    'VS Code がブラウザーで開くか、通知付きでコピーします。',
  ],
  links: [
    { to: 'GitHub', text: 'フォークと .vsix 付きのリリースを置きます。既定は GitHub のリンクです。' },
    { to: 'GitLab and Bitbucket', text: 'GitHub と並ぶリンク先で、API を呼ばずにリモート URL から組み立てます。' },
    { to: 'Visual Studio Marketplace', text: '拡張を掲載します。そこへの公開は毎回手作業です。' },
  ],
  features: {
    'Open a file, blame or history link':
      'コマンドはエディターからファイルと選択行を、git からリモートを読みます。ホストのモジュールがリンクを書き、VS Code がブラウザーで開きます。',
    'Copy a link':
      '同じリンクが VS Code のクリップボードに入るので、リモートのウィンドウでも手元のクリップボードに届きます。通知に URL が出ます。',
    'Links from the Explorer':
      'エクスプローラーのメニューがファイルかフォルダーを同じコマンドに渡します。リンクに行のアンカーは付きません。',
    'Main or master first':
      'git は設定、リモートの HEAD、main、master の順にファイルを含むブランチを探します。見つからなければ今のブランチを使います。',
    'Hosts and mapped URLs':
      'ホストは設定かリモート URL から決まります。対応付けの設定が、リンクを書く前にリモート URL を差し替えます。',
    Languages:
      'vscode.l10n は VS Code の表示言語でカタログを選びます。コマンド名と設定は 9 つのパッケージカタログから来ます。',
  },
};

export default arch;

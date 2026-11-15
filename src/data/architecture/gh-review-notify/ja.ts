import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'Mac 上で 1 本の bash スクリプトが動き、launchd エージェントが 3 分ごとに起動します。gh CLI で GitHub を読み、新しいイベントを通知センターに出します。',
  parts: [
    { name: 'launchd エージェント', role: '180 秒ごとにスクリプトを起動し、Mac のスリープ明けに遅れを取り戻します。' },
    { name: 'bash スクリプト', role: 'PR を検索し、レビューとコメントを読み、絞り込んで通知を送ります。' },
    { name: 'GitHub CLI', role: 'gh が持つログインで GitHub を呼ぶので、ツールはトークンを保存しません。' },
    { name: 'jq', role: 'GitHub の JSON の返答を読みます。' },
    { name: 'terminal-notifier', role: '通知を出し、クリックでコメントを開きます。無いときは osascript を使います。' },
    {
      name: 'キャッシュファイル',
      role: 'ユーザーのキャッシュフォルダーにある単純なファイルで、表示済みのイベントと各 PR の最終更新を持ちます。',
    },
  ],
  flow: [
    'launchd がスクリプトを起動し、ロックが 2 本目の実行を止めます。',
    'gh が直近 3 日に更新された自分の未完了 PR を検索します。',
    'スクリプトは変わった PR のレビューとコメントだけを読みます。',
    '表示済みリストにあるイベントは除かれます。',
    'terminal-notifier が残りを出し、クリックでコメントが開きます。',
  ],
  links: [
    { to: 'GitHub', text: '各 PR、レビュー、コメントの出どころで、gh CLI で読みます。' },
    { to: 'Homebrew', text: 'インストール時に jq と terminal-notifier を入れます。' },
  ],
  features: {
    'Review and comment notifications':
      'gh は自分が作成、レビュー、参加した未完了の PR を検索し、変わった各 PR のレビューとコメントを読みます。新しいイベントがそれぞれ通知になります。',
    'Review requests':
      'GitHub への問い合わせで自分の名前を指した依頼を残し、チーム宛ての依頼を捨てます。失敗した問い合わせはキャッシュに入らず、次の実行で聞き直します。',
    'Comment bursts':
      '通知の前に、スクリプトは PR ごとに新しいコメントを数えます。4 件を超えると件数と名前を載せた 1 件の通知にまとまり、クリックで PR が開きます。',
    'Quiet first run':
      'キャッシュが無いとき、スクリプトは直近 3 日のイベントを表示済みリストに書き、通知は出しません。初回が失敗するとキャッシュは空のままで、次の実行でやり直します。',
    'Bot filter':
      'スクリプトはイベントを比べる前にボットのコメントを捨てます。インストール時の設定が launchd エージェントに入り、再びオンにできます。',
    'Status and test':
      '1 つのフラグがエージェントの状態、アカウント、前回の実行、設定を出します。別のフラグは同じ通知の仕組みでテスト通知を送ります。',
    Releases:
      'main への push が shellcheck を通るたび、GitHub Actions のワークフローが日付バージョンのタグを付けます。ノートには前回のリリース以降のコミットが並びます。',
  },
};

export default arch;

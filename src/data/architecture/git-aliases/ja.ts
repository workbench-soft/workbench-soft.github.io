import type { Arch } from '../types';

const arch: Arch = {
  summary:
    '各エイリアスは 1 つの git リポジトリにある bash スクリプトです。git 設定の include がクローンを指すので、pull 1 回でマシン上の各エイリアスが更新されます。',
  parts: [
    {
      name: 'bash スクリプト',
      role: 'エイリアスごとに 1 つのスクリプト。macOS、Linux、Windows で git に付属する bash が実行します。',
    },
    { name: 'git 設定の include', role: '各エイリアス名をスクリプトに結び付け、git にクローンの場所を教えます。' },
    { name: 'fzf', role: 'ブランチと worktree を選ぶあいまい検索のメニュー。' },
    {
      name: 'zsh と PowerShell の関数',
      role: 'ブランチ切り替えが出すフォルダー行を、実際のフォルダー移動に変えます。',
    },
    {
      name: 'インストーラー',
      role: 'macOS と Linux 用に 1 つ、Windows 用に 1 つ。git 設定、シェル、フックを整えます。',
    },
    { name: 'shellcheck と shfmt', role: 'コミットフックと CI で各スクリプトを検査します。' },
    {
      name: 'GitHub Actions',
      role: 'Linux と Windows で lint とテストを実行し、main への成功した各 push にタグを付けます。',
    },
  ],
  flow: [
    '利用者が git co のような短いコマンドを打ちます。',
    'git は読み込んだ設定でエイリアスを見つけ、スクリプトを実行します。',
    'スクリプトは git を呼び、選択が要るときは fzf も呼びます。',
    'シェル関数がフォルダー行をフォルダー移動に変えます。',
    '結果はターミナルに出て、リポジトリは git を通して変わります。',
  ],
  links: [{ to: 'GitHub', text: 'リポジトリを置き、チェックを実行し、日付付きのリリースを公開します。' }],
  design: {
    scale: [
      '1人の開発者が数台のマシンで使い、サーバーはありません。各エイリアスは bin/ の bash スクリプト1つです。',
      '負荷はエイリアスごとの数回の git 呼び出しなので、上限を決めるのはスクリプトではなく git とリポジトリです。',
    ],
    data: [
      'エイリアス自身は状態を持たず、git を通じてリポジトリを読み、変更します。',
      'インストーラーは gitaliases.dir と include.path をユーザーの git 設定に、関数を zsh か PowerShell のプロファイルに書きます。',
      'aliases.gitconfig が各エイリアス名をクローン内のスクリプトに対応づけます。',
    ],
    interfaces: [
      'git はエイリアスを子プロセスとして実行するので、スクリプトは引数を受け取り、端末に出力できます。',
      'git sb はパス付きの __cd__ 行を stdout に出し、zsh か PowerShell の関数がそれを cd に変えます。',
      'fzf が選択画面を描き、スクリプトは補助の _shared.sh と _prune.sh を読み込みます。',
    ],
    reliability: [
      '各スクリプトは set -euo pipefail で動くので、git 呼び出しが失敗するとエイリアスは止まります。',
      'ブランチと worktree の削除は、メインの worktree、現在のフォルダ、ロックされた worktree を飛ばします。',
      '選択画面で Esc を押すと、何も削除せずにエイリアスが終わります。',
    ],
    security: [
      '外部サービスは git のリモートだけです。スクリプトはトークンを保存せず、API も呼びません。',
      'インストーラーは変更のたびに確認し、変更するファイルを先にコピーします。',
      '削除系のエイリアスは候補を並べ、人が選んだものだけを消します。',
    ],
    performance: [
      '各エイリアスは数回の git 呼び出しを持つ bash プロセス1つで、pull で全部が更新されます。',
      '整理用の一覧は for-each-ref 1回と worktree 一覧から作り、one_line は printf -v を使います。worktree ごとにコマンド置換すると fork がかかるためです。',
    ],
    operations: [
      'lint.sh は shellcheck と shfmt を走らせ、各エイリアスにスクリプト、説明、README の行があるか確かめます。test.sh は使い捨てのリポジトリでエイリアスを動かします。',
      'pre-commit と pre-push のフックが mise run lint を実行し、lint.yml が Linux と Windows のランナーで実行します。',
      'main へのチェックを通った push ごとに、v2026.10.30.1 のような日付付きリリースが付きます。',
    ],
    tradeoffs: [
      'インラインの ! エイリアスやシェル関数ではなくエイリアスごとの bash スクリプトにして、shellcheck とテストが届くようにしました。代償はエイリアスごとのファイルです。',
      'TypeScript や Rust ではなく bash にしました。git は全システムで bash を同梱し、どのマシンにも Node が要らないからです。',
      'コピーしたエイリアスではなくクローンを指す include にして、git pull で更新できます。クローンを動かすと壊れます。',
      'インストーラーを1つでなく2つにしました。プロファイルを編集するのは PowerShell だけだからで、代償は2つを揃えて保つことです。',
    ],
  },
  features: {
    Aliases:
      '設定ファイルが各エイリアス名をクローン内の bash スクリプトに結び付けます。git a は各スクリプト冒頭のコメントを読んで一覧を出します。',
    'Switch branch folders':
      'git sb は worktree を含むローカルブランチを fzf に並べます。スクリプトがパスを出し、zsh か PowerShell の関数がシェルと VS Code のウィンドウをそこへ移します。',
    'Delete branches and worktrees':
      'git db は fzf で選び、git dbm はリモートブランチが消えたブランチを見つけます。共通のヘルパーが worktree とそのブランチを消し、変更のある worktree を強制で消す前に確認します。',
    Installer:
      'macOS と Linux はシェルのインストーラー、Windows は PowerShell のインストーラーが git 設定に include を書きます。編集する各ファイルは先に日付付きのコピーを残します。',
    'Lint hook':
      'インストーラーは git のフックをリポジトリ内のフォルダーに向けます。各コミットで shellcheck、shfmt、リポジトリのルールが走り、続いてステージ済みのファイルに oxfmt と markdownlint が走ります。',
    'Reset to the default branch':
      'スクリプトはリモートの HEAD から既定のブランチを読み、fetch してそこへハードリセットします。ローカルの変更や未 push のコミットが消えるときは先に確認します。',
    Releases:
      'main で lint が通ると GitHub Actions のワークフローが始まります。次の日付バージョンを決め、前のタグ以降のコミットからノートを書きます。',
  },
};

export default arch;

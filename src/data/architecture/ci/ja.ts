import type { Arch } from '../types';

const arch: Arch = {
  summary:
    '組織の各リポジトリが自分の workflow から呼び出す共有ステップを置いた、非公開の GitHub リポジトリです。複合アクションがツールを入れ、再利用 workflow が Dependabot の PR のマージと iPhone シミュレーター向けのビルドを担います。',
  parts: [
    {
      name: '複合アクション',
      role: '呼び出し側の job の中で動き、固定したツールとパッケージを入れるセットアップのステップ。',
    },
    { name: 'mise', role: 'リポジトリが固定したバージョンで各ツールを入れます。' },
    { name: 'pnpm', role: 'lockfile からパッケージを入れ、Windows ではハードリンクの代わりにコピーします。' },
    { name: '再利用 workflow', role: '各アプリのリポジトリが呼ぶ Dependabot のマージと iOS シミュレーターのビルド。' },
    { name: 'Node スクリプト', role: 'iOS の方針がない Android 専用の部分をアプリから洗い出します。' },
    {
      name: 'macOS ランナーと Maestro',
      role: 'iPhone シミュレーター向けにアプリをビルドし、テストの流れを実行します。',
    },
    { name: 'リリーススクリプト', role: '日付のタグを決め、コミットからノートを書く shell スクリプト。' },
  ],
  flow: [
    'アプリのリポジトリの workflow が main にあるここのステップを呼びます。',
    'GitHub はその実行のためにこのリポジトリからステップを読み込みます。',
    'セットアップのステップが固定したツールを入れ、次にパッケージを入れます。',
    '呼び出し側のチェックが同じ job の中で続きます。',
    'ここでマージした修正は、各リポジトリの次の実行で届きます。',
  ],
  links: [
    { to: 'GitHub Actions', text: '組織の各リポジトリが自分の workflow からここのステップを呼びます。' },
    { to: 'local-ci', text: 'PC のランナーでは、ファイルのロックを避けるため共有ストアからパッケージをコピーします。' },
    { to: 'agent-skills-private', text: 'リリーススクリプトは repo-ci スキルの CI テンプレートと同じです。' },
    { to: 'Dependabot', text: 'その PR は共有 workflow でマージされ、メジャー更新は人を待ちます。' },
  ],
  features: {
    'Setup step':
      '複合アクションが固定したツールを mise で入れ、続けて pnpm が lockfile から入れます。呼び出し側の job の中で動くので、そのチェックがすぐ後に続きます。',
    'Dependabot details':
      'Dependabot のメタデータアクションが各 PR の更新の種類を読みます。マージの job はそれを見てメジャー更新を人に残します。',
    'Dependabot auto merge':
      '再利用 workflow が Dependabot の PR を開いた時点で squash マージし、main でチェックを始めます。この方法でマージされるのは Dependabot 自身が開いて push した PR だけです。',
    Releases:
      'main への push で Lint が通ると、リリースの workflow が始まります。2 本の shell スクリプトが日付のタグを決め、前のタグからのコミットでノートを書きます。',
    'iOS check and simulator build':
      'Node スクリプトがパッケージ、ネイティブモジュール、Gradle のファイルから Android 専用の部分を探します。次に再利用 workflow が GitHub の macOS ランナーでビルドし、Maestro がスクリーンショットを撮ります。',
  },
};

export default arch;

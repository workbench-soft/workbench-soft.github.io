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
  design: {
    scale: [
      'オーナーは 1 人、対象は 1 つの GitHub 組織の数十のアプリリポジトリで、どれも自分のワークフローから同じ数個のステップを呼びます。',
      'ここでの修正は、各呼び出し側の次の実行で届くので、1 つの悪いマージが全員を壊すことがあります。',
    ],
    data: [
      'データベースはありません。状態は、日付タグ、コミット件名の形式、各ツールを固定する mise.toml です。',
      'タグは v<yyyy.mm.dd>.<n> で、ノートは type(scope)!: text の形の件名から feat、fix、perf のコミットを分けます。',
    ],
    interfaces: [
      'セットアップのステップは composite アクションで、呼び出し側が uses で実行し、呼び出し側のジョブの中で動きます。',
      'Dependabot のマージと iOS シミュレーターのビルドは再利用可能なワークフローで、main で始めるワークフローの一覧を受け取ります。',
      '自動マージは pull_request_target から動き、iOS チェックは成功か失敗を返す Node スクリプトです。',
    ],
    reliability: [
      'マージのジョブは、dependabot[bot] が PR を開いてイベントを起こしたときだけ動き、マージ済みか閉じた PR では止まります。',
      'PC のランナーでは pnpm が共有ストアからパッケージをコピーします。ハードリンクを消すと、他の読み取りが EBUSY で失敗したためです。',
      '各ジョブは自分の mise シムのフォルダを持つので、共有の uvx.exe を握る実行中のプロセスがツールの更新を止めません。',
    ],
    security: [
      'リポジトリは非公開で、Actions のアクセスを組織に設定し、呼び出し側がワークフローを読み込めるようにしています。',
      'pull_request_target は main から書き込みトークンで動くので、マージされるのは Dependabot 自身の PR だけで、メジャー更新は人を待ちます。',
    ],
    performance: [
      'ツールのインストールはランナー上のジョブ間で共有し、ジョブごとに作り直すのは小さなシムのフォルダだけです。',
      'pnpm はロックファイルから解決の手順なしでインストールし、iOS チェックを先に走らせるので、悪い計画は Mac の分数が始まる前に失敗します。',
    ],
    operations: [
      'Lint は main への push ごとに動きます。リリースのワークフローは Lint が通ると workflow_run で始まり、コミットに日付タグを付けます。',
      'Markdown だけの push は Lint を飛ばすので、リリースは付きません。',
      'mise run test は使い捨ての git リポジトリを作って 2 つのリリーススクリプトを確かめ、Vitest が ios-check を受け持ちます。',
    ],
    tradeoffs: [
      '固定タグではなく呼び出し側が @main を使い、1 つの修正がどこにも届きます。待ちたいリポジトリはリリースタグを固定します。',
      'セットアップは再利用可能なワークフローではなく composite アクションにし、呼び出し側の自前のチェックを同じジョブで続けられるようにします。',
      'PR のチェックを待たず、開いたらマージして main で確かめます。組織のリポジトリは PR でチェックを走らせないからです。悪い更新が先に main に届きます。',
      'iPhone のビルドは macOS ランナーを使います。PC のランナーが Windows だからです。macOS の 1 分は 10 分に数えられるので、呼び出し側は手動かリリース時に始めます。',
    ],
  },
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

import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'シンプルな Markdown のスキルといくつかのスクリプトで、サーバーもビルドもありません。インストーラーが 1 つのクローンをマシン上の各コーディングエージェントにリンクし、CI がリリースのたびにスキルを検査します。',
  parts: [
    {
      name: 'Agent Skills 形式',
      role: '各スキルは 1 つの Markdown フォルダで、依頼が合うとエージェントが読み込みます。',
    },
    {
      name: 'POSIX shell のインストーラー',
      role: 'クローンを Claude Code、Codex、Kimi Code などにリンクし、Windows には PowerShell のラッパーがあります。',
    },
    { name: 'Git hooks', role: 'pull、merge、checkout のあとにスキルをリンクし直します。' },
    {
      name: 'Node スクリプト',
      role: 'エージェントのフックを各エージェントの設定に組み込み、MCP サーバーをコピーします。',
    },
    { name: 'turn-voice フック', role: 'Windows の C# プレーヤーと Mac の Node 版が、ターンの終わりを声で伝えます。' },
    { name: 'Python と TypeScript のチェック', role: 'スキルの形式、キーワード、各スキルの長さを検査します。' },
    { name: 'GitHub Actions', role: 'Windows と Linux でチェックを走らせ、日付付きのリリースを作ります。' },
  ],
  flow: [
    'ユーザーがリポジトリをクローンし、インストーラーを実行します。',
    'インストーラーが各スキルのフォルダを見つけた各エージェントにリンクします。',
    'セッションの始めにエージェントが各スキルの説明を読みます。',
    '合う依頼がスキル全体を読み込み、エージェントがその手順に従います。',
    'ターンの終わりに音声フックが結果を話します。',
  ],
  links: [
    { to: 'agent-skills-private', text: 'オーナーの非公開のルールとスキルがあり、この公開スキルと並びます。' },
    { to: 'Claude Code', text: 'インストーラーがスキルをリンクし、フックをその設定に組み込みます。' },
    { to: 'Codex', text: '同じスキル、フック、Claude Code の MCP サーバーのコピーです。' },
    { to: 'GitHub', text: 'チェックと日付付きのリリースは GitHub Actions で動きます。' },
  ],
  design: {
    scale: [
      '1 台に 1 人、スキルは 33 個、Agent Skills 形式を読むエージェントはいくつでも対応します。',
      'セッションごとに全スキルの説明を読み込むため、説明は 480 文字以内、スキル本文は 300 行以内に収めます。',
    ],
    data: [
      'データベースはありません。スキルは SKILL.md とフロントマターを持つフォルダで、必要時に読み込む参照ファイルが付きます。',
      'フックのグループは JSON ファイルにあり、turn-voice フックは音声クリップのキャッシュをローカルのフォルダに置きます。',
    ],
    interfaces: [
      'エージェントとの約束はフロントマターです。name はフォルダ名と同じで、description がスキルを読み込む場面を示します。',
      'インストーラーは Claude Code と Codex の設定にフックのグループを統合し、Kimi Code には目印付きのブロックを書きます。',
      'turn-voice フックはターン最後の行のステータスマーカーを読み、対応するフレーズを読み上げます。',
    ],
    reliability: [
      'クローン内の git フックが pull、merge、checkout、rebase の後にスキルを張り直すので、新しいスキルがすぐ現れます。',
      'フックの統合は本人のフックを残します。Node がなければ、インストールはフックを飛ばしてそう伝えます。',
      '音声の取得に失敗すると効果音だけが残り、キャッシュ済みのクリップはネットワークなしで鳴ります。',
    ],
    security: [
      'リポジトリは公開で、トークンを持ちません。フォークの PR は GitHub のランナーで動くため、そのコードは PC に届きません。',
      'サイト向けのスキルは、ログイン、CAPTCHA、秘密情報、支払いで止まり、それらを本人に任せます。',
    ],
    performance: [
      '毎ターン読み込むのは短い文章ルールだけです。スキル全体は、依頼がその説明に合ったときに読み込みます。',
      '音声クリップはキャッシュされ、効果音と声は 1 回の PlaySound にまとめるので、最初の語まで欠けずに鳴ります。',
    ],
    operations: [
      'check ワークフローは PowerShell のインストールを Windows で、シェルのインストールを Linux で確かめ、各ツールの版は mise で固定します。',
      'release ワークフローは main で check が通ると workflow_run で始まり、v2026.10.30.1 のような日付タグを付けます。',
      'mise run test はスキルの形式、文章の予算、ユニットテスト、一時ホームでのインストールと削除を確かめます。',
    ],
    tradeoffs: [
      'エージェントごとのルールファイルではなく、スキルごとに Markdown フォルダを選びました。1 つのコピーで約 50 のエージェントに届きます。ルールを守らせるのは、読むエージェントだけです。',
      'エージェントごとのコピーではなく、1 つのクローンを各エージェントへリンクする方式を選びました。変更が全員にすぐ届きます。開発者モードのない Windows ではジャンクションになります。',
      'Windows 標準の csc.exe でビルドする C# のフックを選び、SDK を要りません。Windows だけで動き、Mac は Node 版が担います。',
    ],
  },
  features: {
    'Writing style':
      '短いルールファイルがエージェントのメインのルールファイル経由で毎ターン読み込まれます。完全なスキルは最初の文章の前に読み込まれ、単語の表と最終チェックを持ちます。',
    'Code review':
      'review スキルが PR か diff を読み、各問題をコードで確かめます。行、壊れる入力、修正を並べた表が 1 つ返ります。',
    'Reviewer lenses':
      'reviewer スキルが diff やリポジトリに合う観点を選び、観点ごとにサブエージェントを 1 つ起動します。法律や SEO などの専門の観点は専用のスキルを読み込みます。',
    'Pull requests':
      'create-pr スキルが本文を書き、GitHub CLI で PR を作成または更新します。Mermaid の図が各フローの変更前と変更後を示します。',
    'Review comments':
      'address-comments スキルが GitHub CLI で未解決の各スレッドを読みます。修正ごとに 1 つのコミットを作り、返信にその SHA を書きます。',
    'Ticket to merge':
      'implement-ticket スキルが Atlassian の MCP サーバーか CLI で Jira を読みます。計画はリポジトリの specs に入り、各コミットにチケットキーが付きます。',
    'App audit':
      'app-audit スキルがレビュアーの観点を起動し、各エージェントは自分の git worktree で動きます。メインのエージェントが安全な修正を 1 つのブランチに集め、PR をマージします。',
    'Specs first':
      'specs スキルがリポジトリに機能ごとの Markdown ファイルを 1 つ持ちます。各変更はコードより先に、最初のコミットで日付付きの項目を足します。',
    'One-pager':
      'one-pager スキルはまず全文を書きます。そのあと 1 画面の要約を上に置き、要約は独自の事実を足しません。',
    'Commands through mise':
      'mise スキルがタスクを mise run で、ほかのコマンドを mise x で実行します。新しいツールは固定したバージョンでリポジトリの mise 設定に入ります。',
    Translations:
      'translations スキルがスタックに合う i18n ツールを選び、各文字列を各カタログに足します。テストがカタログのキーをそろえます。',
    Worktrees:
      'git-worktrees スキルがリポジトリの横に、無視されたファイルと依存関係を持つフォルダを作ります。マージ後にスクリプトが PR を確かめ、フォルダとブランチを消します。',
    'Fast JavaScript':
      'javascript スキルは Vercel の React ベストプラクティスから React 部分を除いたルールを持ちます。各指摘はルール、行、コストを示します。',
    Architecture:
      'architecture スキルが図と選択ごとの決定を付けて、設計をリポジトリのドキュメントに書きます。その後 lint か CI が層のルールを守らせます。',
    Monorepos:
      'monorepo スキルがタスクランナーと言語ごとの workspace を選びます。1 つの API スキーマがプラットフォームごとのクライアントを作り、CI は影響のあるアプリだけを動かします。',
    'History reset':
      'reset-history スキルが git bundle をリポジトリの外に保存し、既定のブランチから 1 つのコミットを作ります。確認は 1 回で、lease 付きの force push をします。',
    'Rewrite a repo':
      'rewrite-repo スキルが動作を記録し、コードとドキュメントの名前の変更表を作ります。最後に履歴の代わりに新しいコミットを 1 つ残します。',
    'Help on a site':
      'guide-on-site スキルが Claude in Chrome であなた自身の Chrome を操作します。わかる欄を埋め、本人にしかできない手順で止まります。',
    'Hung runs':
      'hung-process スキルが Windows でポートやロックを握る開発ツールを見つけます。そのプロセスツリーを終了して手順をやり直すか、管理者用のコマンドを渡します。',
    'Search setup':
      'seo-setup スキルが DNS の場所を調べ、公開中のサイトとリポジトリを確かめます。そのあとブラウザで Search Console、Bing、Cloudflare Web Analytics を設定します。',
    Ads: 'ads-setup スキルがログイン済みのユーザーと AdSense と AdMob の管理画面を進みます。ID をコードに入れ、デバッグビルドではテスト広告を使います。',
    'Google Play release':
      'play-release スキルが新しいバージョンコードで署名付きバンドルを作り、鍵はリポジトリの外に置きます。内部テストに公開し、テスター用のリンクを返します。',
    'Launch in one run':
      'launch スキルは共通の質問を 1 回だけします。そのあと検索、広告、Google Play のスキルを順に動かし、最後にサービスの表を出します。',
    Marketing:
      'marketing スキルが予算から始め、メッセージと公開カレンダーを書きます。計画はリポジトリのドキュメントに残り、次の実行が続きを進めます。',
    'In-app updates':
      'app-update スキルが起動時と復帰時に GitHub のリリースを確かめる処理を足します。ダウンロードのバーと通知が続き、そのコードは Play のビルドに入りません。',
    'Names and domains':
      'スクリプトが各名前を 3 つのドメインとオーストラリアの事業者登録で確かめます。IP Australia の商標も調べ、API キーは要りません。',
    'Legal risks':
      'スクリプトがリポジトリの依存関係のライセンスとデータ SDK を調べます。スキルは各リスクを文書で評価し、安全な修正を PR で出します。',
    'App icons':
      'エージェントが平らな SVG アイコンを 10 個描き、チャットに選択画面を出します。そのあと resvg を使うスクリプトが、選んだものを各プラットフォームのサイズに書き出します。',
    'Demo screenshots':
      'アプリが架空のデモデータで動き、エージェントがスクリーンショットと短い動画を撮ります。リポジトリの撮影リストで、次の実行も同じ画面を撮れます。',
    'Store media':
      'store-media スキルがリポジトリのスクリーンショットとアイコンから各サイズを作ります。ログイン済みのブラウザでアップロードし、審査に出す前に確認します。',
    'End to end walk of a release':
      'e2e-walk スキルが最新のリリースをエミュレーターかスマホに入れ、ドキュメントの各フローを試します。削除の操作は飛ばし、フローの一覧をリポジトリに残します。',
    'Hear and pick a voice':
      'Python のスクリプトが edge-tts で Microsoft の各ニューラル音声を取得し、クリップをキャッシュします。各音声の ID を表示し、好きな番号から再開できます。',
    'Reddit comments':
      'スキルが Reddit の MCP サーバーで人気のスレッドを集め、リポジトリが答えられるものを残します。Playwright が下書きを Chrome に入力し、ユーザーが Comment を押します。',
    'Voice at the end of a turn':
      'フックが最後の行のマーカーを読み、合図の音とフレーズを選びます。edge-tts が話し、Windows では C# のプレーヤー、Mac では Node が再生します。',
    Install:
      'POSIX shell のインストーラーが 1 つのクローンを見つけた各エージェントにリンクし、Windows には PowerShell のラッパーがあります。クローンの Git hooks が pull のたびにスキルをリンクし直します。',
    'Agent hooks':
      'Node のスクリプトがフックのグループを Claude Code と Codex の設定に組み込みます。Claude Code の MCP サーバーも Codex と Kimi Code にコピーします。',
    Releases:
      'main への push でチェックが通ると GitHub Actions のワークフローが動きます。コミットに日付のバージョンのタグを付け、コミットからノートを書きます。',
    'Progress bars':
      'Claude Code の mod が進捗ツールとペインを登録します。フックが最後の報告からの秒数を数えてエージェントに知らせます。',
    'Feature queue':
      '各セッションはリポジトリごとに、編集するファイルを書いた確保ファイルを作ります。スキルは main かワークツリーを選ぶ前にほかの確保を読みます。',
    'Workflow and code rules':
      'install.sh がルールファイルをホームフォルダにリンクし、各エージェントは毎ターン読み込みます。スキルは1つの作業のルールをそれぞれ持ちます。',
  },
};

export default arch;

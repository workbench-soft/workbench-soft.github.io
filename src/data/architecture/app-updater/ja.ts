import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'Kotlin で書いた Android アプリがスタジオの公開 GitHub リリースを読み、各 APK を Shizuku 経由でインストールします。専用のサーバーはありません。',
  parts: [
    {
      name: 'Kotlin と Android Views',
      role: 'アプリごとのカードと引っ張って更新を備えた、シンプルな View の画面ひとつ。',
    },
    { name: 'GitHub Releases API', role: '各アプリの最新 APK とそのノートやコミットの取得元。' },
    { name: 'Shizuku', role: '各インストールを shell ユーザーとして実行するので、Android は確認を出しません。' },
    {
      name: 'Android パッケージマネージャー',
      role: 'インストール済みアプリの名前とパッケージ名とバージョンを返します。',
    },
    { name: '更新ラン', role: 'キューを画面の外に持ち、各 APK を分割してダウンロードします。' },
    { name: 'Shared preferences', role: '直近のリリース一覧と、ランで覚えたパッケージ名を保存します。' },
    { name: 'スタジオカタログ', role: 'スタジオのサイトにある JSON で、各プロジェクトの名前と対応環境を示します。' },
  ],
  flow: [
    'アプリを開くか戻るか、一覧を下に引きます。',
    'アプリは GitHub のリリースを全ページ読むか、10 分以内の一覧を使います。',
    '各 APK を名前かパッケージ名でインストール済みアプリに結び付けます。',
    'スタジオカタログが各カードに名前を付け、APK のないプロジェクトを加えます。',
    'タップで APK をダウンロードし、Shizuku が確認なしでインストールします。',
    'アップデーターは最後に自分を更新し、スマホがそれを開き直します。',
  ],
  links: [
    { to: 'GitHub', text: '共有の公開リリースリポジトリが各アプリの APK を持つので、スマホにトークンは要りません。' },
    { to: 'Shizuku', text: 'Shizuku アプリが、アプリの追加と削除を行う shell ユーザーに権限を与えます。' },
    { to: 'Workbench Soft site', text: 'サイトが自分のプロジェクト一覧からアプリカタログを作ります。' },
    { to: 'archon', text: 'Archon は APK を出さないので、カードには開くリンクが付きます。' },
  ],
  features: {
    'Update all':
      '更新ランは遅れている各アプリを並べ、64 KB ずつダウンロードします。Shizuku が shell ユーザーとして順にインストールし、キャンセルは次のかたまりの前で止めます。',
    'Self update':
      'アップデーターは同じリリースに専用のタグで出て、最後に自分をインストールします。Shizuku 経由の 1 つの shell コマンドが更新し、古いプロセスの終了後にアプリを開き直します。',
    'Update one app':
      'カードの更新ボタンは、1 つの APK に同じダウンロードと Shizuku のインストールを行います。失敗したカードには再試行用のボタンが残ります。',
    'Install a missing app':
      'インストール済みアプリに当てはまらない APK にはインストールボタンが付きます。Shizuku が更新と同じ方法で入れます。',
    'App list':
      '公開された APK ごとにカードがあり、名前かパッケージ名でインストール済みアプリと結び付きます。スタジオカタログは APK のない各プロジェクトにリンク付きのカードを加えます。',
    'Saved list offline':
      'Shared preferences が直近のリリース一覧をノートと名前ごと保存します。GitHub の確認に失敗するとその一覧を出し、10 分以内に開くと API を使いません。',
    'Shizuku setup':
      '設定モジュールが残る Shizuku の手順を見つけ、Google Play か Shizuku アプリを開きます。許可が下りると、タップした更新が始まります。',
    'Release notes':
      'アプリは各 GitHub リリースのノートを整えます。ノートが空なら、リリースの比較リンクからコミットを裏で読みます。',
  },
};

export default arch;

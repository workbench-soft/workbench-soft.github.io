import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'Langflip は Windows と macOS 向けの Rust 製プログラムで、サーバーはありません。中核の crate が単語ごとに判断し、システムごとの薄い層がキーを捕まえて修正を打ち込みます。',
  parts: [
    { name: 'langflip-core', role: '2 つの配列、言語モデル、残すか直すかの判断を持つ Rust の crate。' },
    {
      name: 'Windows のフック',
      role: '低レベルのキーボードとマウスのフックがどのアプリでもキーを受け取り、修正を Unicode で送ります。',
    },
    { name: 'macOS のイベントタップ', role: 'Mac で同じ仕事をし、配列は入力ソースで扱います。' },
    { name: '言語モデル', role: '言語ごとの 3 文字組のスコアと辞書。wordfreq から作り、exe に埋め込みます。' },
    { name: 'tray-icon', role: '今の配列を示すトレイアイコンと、両システム共通のメニュー。' },
    { name: 'rust-i18n', role: 'メニューとツールチップの 9 言語のテキストを、プログラムに組み込みます。' },
    { name: 'ureq と self-replace', role: 'GitHub Releases での更新確認と、動いている exe の入れ替え。' },
  ],
  flow: [
    '低レベルのフックが、前面のアプリで押された各キーを受け取ります。',
    'フックは物理キーを位置に変えます。配列には左右されません。',
    '中核がモデルを使い、両方の配列で文字に点を付けます。',
    'もう一方の配列が勝つと、フックはそのキーを飲み込みます。',
    'Langflip は単語を消し、もう一方の配列で打ち直して配列を切り替えます。',
  ],
  links: [
    {
      to: 'GitHub Releases',
      text: 'Windows 版の exe はここで配布します。Langflip は 1 日 1 回新版を確かめ、送るのは自分のバージョンだけです。',
    },
  ],
  features: {
    'Fix the layout of a word':
      '4 文字目から、中核は打った文字ともう一方の配列の同じキーを比べます。モデルが両方に点を付け、はっきり勝った方で打ち直します。',
    'Short words':
      '1 から 3 文字ではスコアが当てにならないので、中核は辞書だけを見ます。修正は Space、Enter、Tab を待ちます。',
    'Digits kept':
      '数字はどちらの配列でも同じなので、単語バッファはそのまま残します。辞書には mp3 のような数字入りの単語もあります。',
    'Undo a fix':
      '中核は直前の単語を打ったままの形で覚え、元に戻すとそれを打ち直します。同じ単語を 2 回戻すと例外リストに入ります。',
    'Convert by hand':
      '中核は入力中か直前の単語を持っています。ショートカットはチェックなしでそれをもう一方の配列に変えます。',
    'Skip apps and fields':
      'システム層が前面のアプリを設定ファイルのリストと照らし合わせます。パスワード欄と管理者ウィンドウはシステムの合図で見分けます。',
    'The current layout on the icon':
      'Windows 層はウィンドウとフォーカスの変化を追い、前面のウィンドウの配列を読みます。tray-icon がアイコンに EN か RU を描きます。',
    'Pause with a click': 'クリックで修正が止まり、フックはキーをそのまま通します。トレイのアイコンは灰色になります。',
    'Switch the layout with a double click':
      'Windows では、Langflip が前にあったウィンドウを呼び戻し、配列の切り替えを頼みます。Mac では入力ソースを切り替えます。',
    'Start at login':
      'Windows では Run キーの項目が Langflip を起動し、タスク スケジューラのタスクが予備になります。Mac では起動エージェントが担います。',
    'Settings file':
      'アプリのデータフォルダの TOML ファイルが、スイッチ、除外アプリ、残す単語、メニューの言語を持ちます。Langflip は次にウィンドウが変わったときに読み直します。',
    'Go on with a word':
      'Windows では、クリックや入力欄の移動のあとに UI Automation がカーソル前の単語を読みます。中核は新しい文字をその単語の続きとして判断します。',
    'The app icon':
      'アイコンの元は 1 つの SVG です。ビルドが exe に書き込み、インストールスクリプトがショートカットに付けます。',
    'Install on Windows':
      'スクリプトが Cargo で exe をビルドし、ユーザーのプログラムフォルダに置きます。管理者権限なしでショートカットと設定のアプリ項目を加えます。',
    'Tray menu':
      'tray-icon が Windows と macOS で同じメニューを描きます。rust-i18n がシステムの言語か選んだ言語で、9 言語の文を出します。',
    'Decision log':
      'Windows 層が判断ごとに、キーの数、アプリ、理由をログに書きます。打った文字は書かず、1 MB で新しいファイルに替わります。',
    'Update from GitHub':
      'スレッドが 1 日 1 回、ureq で GitHub のリリース一覧を聞きます。クリック後にサイズと SHA-256 を確かめ、self-replace が動いている exe を入れ替えます。',
  },
};

export default arch;

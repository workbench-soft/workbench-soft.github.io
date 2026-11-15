import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'GitHub Pages 上の静的な Astro サイトで、Git ベースの管理画面から編集します。Cloudflare 上の 1 つの Rust Worker が Maria のログインと AI の絵を担います。',
  parts: [
    { name: 'Astro', role: '各ページを静的 HTML に、各写真を AVIF か WebP のサイズに変えます。' },
    { name: 'GitHub Pages', role: '公開のビルド用リポジトリからサイトを配信します。無料で、ロシアでも速く開きます。' },
    { name: 'Sveltia CMS', role: '管理画面で、各変更を非公開のソースリポジトリへのコミットとして保存します。' },
    {
      name: 'Rust Worker',
      role: 'メールのコードで管理者をログインさせ、AI ページのためにリポジトリの権限を確かめます。',
    },
    { name: 'Workers AI', role: 'インテリアを描く FLUX.2 のモデルを動かします。' },
    { name: 'FormSubmit', role: 'アカウントもサーバーも無しで、各注文フォームを Maria にメールします。' },
    { name: 'GitHub Actions', role: '各変更を検査し、サイトをビルドして公開リポジトリに push します。' },
  ],
  flow: [
    '訪問者のブラウザーが GitHub Pages にページを求めます。',
    'Pages が静的 HTML とレイアウトに合うサイズの写真を返します。',
    '注文フォームは FormSubmit に送られ、Maria にメールが届きます。',
    'Maria の編集はコミットになり、サイトは 2 分で作り直されます。',
  ],
  links: [
    { to: 'GitHub', text: '非公開のソースと公開のビルド用リポジトリを持ち、ページを配信します。' },
    { to: 'Cloudflare', text: 'Worker、Workers AI、ログインコードを運ぶメールを動かします。' },
    { to: 'FormSubmit', text: '各注文を Maria にメールします。' },
    {
      to: 'Yandex',
      text: '構造化データを読みます。robots.txt の Yandex 向けルールがフィルターのリンクを 1 ページにまとめます。',
    },
  ],
  features: {
    Portfolio:
      '各ギャラリーはリポジトリ内の Markdown と写真のフォルダーです。Astro がページと画像サイズを作り、フィルターはブラウザーで動きます。',
    'Order a design':
      '各フォームは FormSubmit に送られ、FormSubmit が依頼を Maria にメールします。サイトはそのためのサーバーを持ちません。',
    Admin:
      'Sveltia CMS は管理ページで動き、各変更をリポジトリにコミットします。Worker が Maria にログインコードをメールし、管理画面にリポジトリのトークンを渡します。',
    Fonts:
      '10 書体は Fontsource から来てサイトに同梱されます。選択はサイトの設定ファイルにあり、レイアウトが次のビルドで反映します。',
    'AI generator':
      '管理ページが Maria のロシア語の依頼とスタイルを英語のプロンプトで包みます。Worker が GitHub の権限を確かめ、Workers AI の FLUX.2 が絵を描きます。',
    Search:
      'Astro のレイアウトが各ページにタイトル、説明、共有用の写真、構造化データを書きます。ビルドが robots.txt、llms.txt、git の日付入りのサイトマップを書きます。',
  },
};

export default arch;

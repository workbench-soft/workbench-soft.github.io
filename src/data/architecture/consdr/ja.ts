import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'Vite でビルドした React の静的サイトが、計算をブラウザの中で行い、Cloudflare が配信します。Android の Java WebView アプリは公開中のサイトを表示し、iPhone の Capacitor アプリはサイトを中に持ちます。',
  parts: [
    { name: 'React and Vite', role: '計算機のページ。ビルド時に既定の数字で事前に描画します。' },
    { name: 'ルールと費用のモジュール', role: '税のルール、その出典、各方式の計算を持つ素の TypeScript。' },
    { name: 'localStorage', role: '変えた入力欄、テーマ、言語。そのブラウザだけに残ります。' },
    { name: 'Service worker', role: 'ページとファイルのキャッシュ。次からはオフラインでも開けます。' },
    { name: 'i18next', role: '9 言語のカタログ。選んだときに読み込みます。' },
    { name: 'Cloudflare', role: 'ビルドしたファイル、リダイレクト、Web Analytics を受け持ちます。' },
    { name: 'Android WebView app', role: '公開中のサイトを包む Java。AdMob のバナーと Google Play の購入を持ちます。' },
    { name: 'Capacitor', role: 'サイトのファイルを中に持つ iPhone アプリ。広告、StoreKit、共有は Swift です。' },
  ],
  flow: [
    'Cloudflare が、既定の数字で描画済みのページを送ります。',
    'ページが localStorage から保存した入力を読みます。',
    '入力を変えるたび、ブラウザで比較をやり直して保存します。',
    'ページに 3 つの総額、その内訳、計算の過程が出ます。',
    'Service worker が、次のオフライン訪問に備えてファイルを保存します。',
  ],
  links: [
    { to: 'Cloudflare', text: 'サイトをホストし、リダイレクトと Web Analytics を動かします。' },
    { to: 'Google AdSense', text: 'ウェブサイトの自動広告。アプリでは AdSense を読み込みません。' },
    { to: 'Google Play', text: 'Android アプリの AdMob バナーと「広告を削除」の購入。' },
    { to: 'App Store', text: 'iPhone アプリが App Store に出たら、StoreKit が「広告を削除」を売ります。' },
  ],
  features: {
    'Compare a lease, a loan and cash':
      '素の TypeScript の関数が入力を受け取り、方式ごとに総額を返します。入力のたびにブラウザで動き、数字を見るサーバーはありません。',
    'Where the money goes':
      '比較は各総額の内訳を総額と一緒に返します。注記のモジュールが、各数字の横に行と式を書きます。',
    'Lease and loan settings':
      '入力欄のモジュールが文字を数値に変え、変更のたびに localStorage に保存します。打ちかけの値も画面に残ります。',
    'FBT by car type and start date':
      'ルールのモジュールが、車種、開始日、価格から FBT の率と EV の免除を選びます。定数はそれぞれ出典を示します。',
    'Stamp duty by state': 'ルールのモジュールにある州ごとの表が、価格、車種、開始日から印紙税を出します。',
    'Account interest': '比較は口座を利率で月ごとに回します。方式ごとと、車なしの場合で回し、その差が失った利息です。',
    'Borrowing for another home':
      '比較は、車の支払い中に銀行が貸す額がどれだけ減るかを出します。APRA の 3 ポイントの上乗せを 30 年で使います。',
    'Working and sources':
      '注記のモジュールが各手順と式を数字の横に書きます。出典のファイルが固定の数字をそのページにつなぎます。',
    'Common questions':
      'モジュールが同じルールから、いまの言語で答えを作ります。英語版は検索向けに JSON-LD としてページにも入ります。',
    'Guides and pages':
      'Vite のプラグインがビルド時に各ガイドを静的 HTML にします。数字は同じルールから取り、サイトマップも書きます。',
    'Saved inputs and reset': '変えた入力は JSON で localStorage に入ります。リセットで消え、既定の値に戻ります。',
    'Offline use':
      'ビルド時に書いた Service worker が、ページとファイルをキャッシュします。ページはまずネットを試し、3 秒でキャッシュに切り替えます。',
    'Colour theme':
      'ページ先頭の小さなスクリプトが、最初の描画の前に保存したテーマを当てます。選択は localStorage にあります。',
    'Remove ads in the Android app':
      'ページはブリッジ越しに Java のアプリへ尋ね、Google Play Billing が商品を売ります。アプリは広告なしの状態を返します。',
    'Which lease term costs least':
      '関数が 1 年から 5 年まで、期間ごとに比較を回します。口座を 5 年目まで続けるので、どの期間も同じ年数で比べられます。',
    'If you leave your job':
      'モジュールが退職日の清算額と、続ける場合と比べた各抜け方の費用を出します。比較のリースの数字を使います。',
    Language:
      'i18next と react-i18next が、選んだカタログを別ファイルとして読み込みます。お金はオーストラリアドルのままです。',
    Ads: 'AdSense はウェブサイトで自動広告を出します。アプリはページに印を付けるので AdSense は止まり、AdMob がネイティブのバナーを出します。',
    "No ads on the developer's phone":
      'Android アプリは、PC が一度だけスマホに送る開発者キーを持ちます。キーがあれば、どのビルドもバナーを隠します。',
    'iPhone app':
      'Capacitor がビルドしたサイトをアプリの中から配るので、オフラインでも開きます。Swift のコードが Android アプリと同じページのブリッジに答えます。',
    'Remove ads on the iPhone':
      'StoreKit 2 が Google Play と同じ商品 id を売ります。購入の復元は App Store に過去の購入を尋ねます。',
    'Share the result':
      'ページがリンク付きで結論の 1 行を作ります。iPhone アプリは iOS の共有シートを開き、スマホのブラウザは Web Share を使います。',
  },
};

export default arch;

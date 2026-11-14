import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'Cloudflare 上の静的な Next.js サイトがカメラの地図を表示し、Capacitor が同じファイルを Android と iPhone のアプリに包みます。運転の機能は Kotlin と Swift のネイティブコードが担い、小さな Worker が 1 つ、共有された走行を保存します。',
  parts: [
    {
      name: 'カメラデータのビルド',
      role: 'CI の TypeScript スクリプトが毎晩、各州とニュージーランドのカメラ一覧を 1 つの JSON にまとめます。',
    },
    { name: 'OpenStreetMap', role: '各カメラの位置、道路の制限速度、スクールゾーンの時間帯別の制限です。' },
    { name: 'Next.js', role: '地図、サイトのページ、カメラ地点ごとのページを含む静的エクスポートです。' },
    {
      name: 'Leaflet と MapLibre',
      role: 'Leaflet がカメラと走行を描き、その下に MapLibre が OpenFreeMap のタイルを描きます。',
    },
    { name: 'Cloudflare Worker と KV', role: 'サイトを配信し、共有された走行を保存します。' },
    {
      name: 'Capacitor と Kotlin',
      role: 'Android の外枠で、速度、警告、走行、ルート、Hey Spot のネイティブサービスを持ちます。',
    },
    { name: 'Photon、Valhalla、TomTom', role: '場所の検索、曲がる案内付きのルート、その日の渋滞です。' },
    { name: 'Swift と StoreKit 2', role: '運転とルートのコードの iPhone 版と、App Store での購入です。' },
  ],
  flow: [
    '毎晩 CI のジョブが各州とニュージーランドのカメラ一覧を取得します。',
    'OpenStreetMap が各カメラの位置と道路の制限速度を加えます。',
    'Next.js がサイトを作り、Cloudflare がカメラのファイルと一緒に配信します。',
    'ブラウザが今の 1 分の制限を選び、地図を描きます。',
    'スマホではネイティブサービスが同じファイルを読み、前方のカメラを警告します。',
    '走行は、本人が共有するまでスマホに残ります。',
  ],
  links: [
    {
      to: 'keeppad',
      text: 'Hey Spot は keepPad と同じウェイクワードのモデルを使います。1 つのアプリが両方のフレーズのためにマイクを持ちます。',
    },
    { to: 'lumiere-player', text: 'Hey Lumi は同じウェイクワードのライブラリで Hey Spot とマイクを分け合います。' },
    {
      to: 'Google Maps',
      text: '開始を押すと、最適な順の立ち寄り先で Google Maps が開き、アプリは警告を続けます。',
    },
    {
      to: 'Google Play',
      text: 'Play Billing が広告の削除と SpotTheCam Pro を販売します。AdMob がアプリにバナーを出します。',
    },
    { to: 'GitHub Releases', text: 'リリースごとに APK がそこに置かれ、GitHub 版はそこから自分で更新します。' },
  ],
  features: {
    'Camera map':
      '夜のビルドが各カメラの時間帯別の制限を、この先 35 日分の時間枠に変えます。ブラウザは今の 1 分の枠を選びます。',
    'Search and filter':
      'ページはカメラのファイルから地区の索引を作り、ブラウザの中で検索します。サーバーは関わりません。',
    'Camera types':
      '各カメラは元の一覧の種類を持ちます。ブラウザが選択を覚え、Android アプリは地図に出ている種類だけを警告します。',
    'Follow me':
      '動いている間、ページは GPS の進行方向に地図を回します。MapLibre は通りのタイルを自分の角度で回すので、文字は正立のままです。',
    'Camera details':
      'ポップアップはサイトと一緒に届くカメラのファイルを読みます。種類の一覧の各情報源には公式ページへのリンクがあります。',
    'Offline map':
      'Service worker がページ、カメラのファイル、最大 500 枚の地図タイルを端末に保存します。Web マニフェストでブラウザからアプリとして入れられます。',
    'Light and dark theme':
      'テーマはページが描かれる前に適用されます。ベクタータイルのスタイルが、暗い地図の道路をコードで明るくします。',
    Languages:
      'i18next が地図とアプリ画面の 9 つのカタログを持ちます。Android の通知は Android の文字列ファイルから文を取ります。',
    'Site pages and ads':
      'Next.js がビルド時に州、地区、カメラ地点ごとの静的ページを書き出します。サイトのバナーは AdSense が埋めます。',
    'Speed badge':
      'Kotlin のコードが GPS の位置を OpenStreetMap の道路とその制限に合わせます。Android の活動の報告と線路や滑走路の形で、車と列車や飛行機を見分けます。',
    'Camera warnings':
      'Kotlin のサービスが進行方向の先のカメラを調べ、約 20 秒前に話します。カメラ付近の道路の形から、どちら側に立つかが分かります。',
    'Camera alerts stay ready':
      'Android の活動の報告と、最後の駐車場所を囲む 300 m の範囲が運転のサービスを起こします。再起動や更新の後は、透明な画面がもう一度起こします。',
    'Over the limit':
      '道路の制限は Overpass 経由で OpenStreetMap から届き、スマホに 60 日残ります。制限を 5 秒超えると Kotlin のチェックが話します。',
    'School zones':
      'OpenStreetMap の時間帯別の制限がゾーンの時間を示します。アプリ内の NSW の公表済み学期の一覧が登校日を示します。',
    'Loud warnings':
      '各音は内蔵スピーカーからアラームとして鳴り、言葉が終わるまでアプリが音量を上げます。設定のスイッチで出力をスマホに戻せます。',
    "Author's voice":
      'PC 上のオープンな音声モデルが、作者本人の声から警告の言葉を作りました。音声はアプリに入っていて、Pro で使えます。',
    'Trip log':
      'Kotlin のサービスが運転と徒歩をそれぞれ、各カメラでの速度と一緒に記録します。走行はアプリの専用領域に 400 日残ります。',
    'Trip line by limit':
      '記録した各点が速度と、その道路の OpenStreetMap の制限を持ちます。地図はこの 2 つから線の各区間に色を付けます。',
    'Trip stats':
      'アプリは走行の点からスマホの上で数字を出します。時速 20 km 未満が 3 分以上続く区間を渋滞と数えます。',
    'Share a trip':
      'アプリは間引いたルートを Cloudflare Worker に送り、Worker は専用の id で KV に保存します。共有をやめるとそこから消えます。',
    Distance: '数字は、運転のサービスがスマホに保存した走行の合計を読みます。サーバーは関わりません。',
    'Turn by turn routes':
      'Valhalla が立ち寄り先の 2 点ごとの時間を測り、アプリは各順番を試します。TomTom が渋滞を避ける道を選び、MapLibre のナビのライブラリが車を追います。',
    'Route options':
      'チェックは徒歩や有料道路の回避をルートのサービスに伝えます。お気に入りはスマホに残り、Hey Spot は名前で見つけます。',
    'Hey Spot':
      'sherpa-onnx がスマホの上でネットなしにウェイクワードを聞きます。続きは Android の音声サービスが聞き、Photon が場所を探します。',
    'Hey Spot, what street am I on?':
      'アプリは車の下にある OpenStreetMap の道路の名前と制限を読みます。スマホの音声合成がそれを話します。',
    'Screen stays on':
      'アプリの Android の画面が、画面を消さないようシステムに頼みます。アプリが裏に回るとその頼みは終わります。',
    'Self-update':
      'GitHub 版は GitHub Releases に新しい APK を問い合わせ、Android のインストーラーに渡します。Google Play 版には更新のコードがありません。',
    'Same app on the iPhone':
      'Capacitor が同じサイトを iOS 向けに包みます。Kotlin の運転とルートのコードを Swift に移したものがネイティブの仕事をし、StoreKit 2 が Pro を販売します。',
  },
};

export default arch;

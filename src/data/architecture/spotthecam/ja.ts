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
  design: {
    scale: [
      '1 回のインストールにつきドライバー 1 人です。カメラのファイルには約 13,700 台が 1 行ずつ入っています。',
      'サイトは静的ファイルなので、サーバーが要るのはトリップの共有だけです。小さな Worker 1 つが Cloudflare の無料枠に収まります。',
      '共有するトリップは 1 MB と 10 万点までで、1 つのアドレスから 1 分に 10 件まで共有できます。',
    ],
    data: [
      'data/cameras.json は 1 行に 1 台で、種類、州、位置、道路、郊外、出典、制限速度、向きを持ちます。',
      'トリップはアプリの非公開ストレージに 400 日、道路の制限速度は電話に 60 日残ります。',
      '共有トリップは Cloudflare KV に 10 文字の id で入り、間引いた経路の線と時刻なしの合計だけを持ちます。',
    ],
    interfaces: [
      'Worker が答えるのは POST /api/trips と、/api/trips/<id> の GET と DELETE です。残りは静的ファイルです。',
      'Capacitor のプラグインが、Web ページと Kotlin の運転サービスおよびその Swift 版をつなぎます。',
      'Overpass のタイルが道路、鉄道、滑走路を返します。Photon、Valhalla、TomTom が場所、経路、渋滞に答えます。',
    ],
    reliability: [
      'Service Worker はまずネットワークを試し、4 秒後にコピーへ切り替えます。地図タイルは最大 500 枚をオフライン用に保持します。',
      'Worker のストア障害は CORS ヘッダー付きの 503 で返るので、アプリは電波なしではなく失敗として読みます。',
      '公開の経路サーバーが落ちると、音声がそれを伝えます。TomTom の上限を超えると経路は渋滞なしになります。',
    ],
    security: [
      '共有にサインインは要りません。KV は削除キーの SHA-256 ハッシュだけを持つので、ストアを読んでもトリップは消せません。',
      'Worker は厳格なパーサーで各本文を検査し、nosniff と default-src none のポリシーを送ります。',
      'トリップは共有するまで電話に残ります。共有トリップに時刻はなく、カメラでの速度は同意がなければ含まれません。',
    ],
    performance: [
      'Kotlin のサービスが電話上で GPS をキャッシュした道路と照合し、ネットワークなしでカメラの約 20 秒前に知らせます。',
      '夜間ビルドが時間帯つきの制限を今後 35 日分の枠にするので、ブラウザは今の枠を選ぶだけです。',
      'KV は共有トリップを読み手の近くで 1 分キャッシュし、タイルは OpenFreeMap の週ごとのフォルダー名を除いて保存します。',
    ],
    operations: [
      'CI のジョブがシドニー時間の午前 3 時にカメラを更新し、差分を小さく保つため 1 行 1 台でファイルをコミットします。',
      'main への push ごとにサイトが Cloudflare にデプロイされます。アプリが変わると夜間ジョブが Android のバンドルを Google Play に送ります。',
      'GitHub 版の APK は GitHub Releases から自分で更新します。Google Play 版にはそのコードがありません。',
    ],
    tradeoffs: [
      'Expo ではなく Capacitor に包んだ静的な Next.js サイトにして、地図とサイトのページが 1 つのコードを共有します。代わりにトリップ用の Worker が要ります。',
      'API の後ろのデータベースではなく 1 日 1 回の JSON ファイルにして、オフラインでもサーバーなしで動きます。代わりに一覧は最大 1 日古くなります。',
      'WebView の JavaScript ではなくネイティブの Kotlin 運転サービスにしました。画面が消えると Android が WebView を止めるためです。',
      'Google Maps や Mapbox ではなく OpenFreeMap タイルの Leaflet にしました。キーも上限も要らないためです。',
    ],
  },
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
    'Streets in the recorded voice':
      'PC が edge-tts でオーストラリアとニュージーランドの名前のある道路をすべて読み上げ、音声を Cloudflare R2 に置きます。スマホは周りの通りの音声を取ってきてキャッシュに残します。',
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
    'SpotTheCam Pro':
      'ページの 1 つの表が無料の上限を決め、スマホのカウンターがサーバーなしで使用回数を保存します。Kotlin のコードが自動で始まった運転を数えるので、アプリを閉じていても上限が働きます。Pro は Google Play Billing が販売します。',
    'Same app on the iPhone':
      'Capacitor が同じサイトを iOS 向けに包みます。Kotlin の運転とルートのコードを Swift に移したものがネイティブの仕事をし、StoreKit 2 が Pro を販売します。',
  },
};

export default arch;

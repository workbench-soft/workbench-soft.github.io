import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'Cloudflare에 올린 정적 Next.js 사이트가 카메라 지도를 보여 주고, Capacitor가 같은 파일을 Android와 iPhone 앱으로 감쌉니다. 주행 기능은 Kotlin과 Swift 네이티브 코드가 맡고, 작은 Worker 하나가 공유된 주행을 저장합니다.',
  parts: [
    {
      name: '카메라 데이터 빌드',
      role: 'CI의 TypeScript 스크립트가 매일 밤 각 주와 뉴질랜드의 카메라 목록을 JSON 파일 하나로 합칩니다.',
    },
    { name: 'OpenStreetMap', role: '각 카메라의 위치, 도로 제한 속도, 스쿨존의 시간대별 제한입니다.' },
    { name: 'Next.js', role: '지도, 사이트 페이지, 카메라 지점별 페이지를 담은 정적 내보내기입니다.' },
    {
      name: 'Leaflet과 MapLibre',
      role: 'Leaflet이 카메라와 주행을 그리고, 그 아래에 MapLibre가 OpenFreeMap 타일을 그립니다.',
    },
    { name: 'Cloudflare Worker와 KV', role: '사이트를 제공하고 사람들이 공유한 주행을 저장합니다.' },
    {
      name: 'Capacitor와 Kotlin',
      role: 'Android 껍데기로, 속도, 경고, 주행, 경로, Hey Spot을 위한 네이티브 서비스를 담습니다.',
    },
    { name: 'Photon, Valhalla, TomTom', role: '장소 검색, 회전 안내가 있는 경로, 그날의 교통 상황입니다.' },
    { name: 'Swift와 StoreKit 2', role: '주행과 경로 코드의 iPhone 이식판과 App Store 구매입니다.' },
  ],
  flow: [
    '매일 밤 CI 작업이 각 주와 뉴질랜드의 카메라 목록을 가져옵니다.',
    'OpenStreetMap이 각 카메라의 위치와 도로 제한 속도를 더합니다.',
    'Next.js가 사이트를 만들고, Cloudflare가 카메라 파일과 함께 제공합니다.',
    '브라우저가 지금 이 1분의 제한을 골라 지도를 그립니다.',
    '휴대폰에서는 네이티브 서비스가 같은 파일을 읽고 앞의 카메라를 경고합니다.',
    '주행은 본인이 공유하기 전까지 휴대폰에 남습니다.',
  ],
  links: [
    {
      to: 'keeppad',
      text: 'Hey Spot은 keepPad와 같은 호출어 모델을 씁니다. 앱 하나가 두 문구를 위해 마이크를 잡습니다.',
    },
    { to: 'lumiere-player', text: 'Hey Lumi는 같은 호출어 라이브러리로 Hey Spot과 마이크를 나눠 씁니다.' },
    {
      to: 'Google Maps',
      text: '시작을 누르면 가장 좋은 순서의 경유지로 Google Maps가 열리고, 앱은 계속 경고합니다.',
    },
    {
      to: 'Google Play',
      text: 'Play Billing이 광고 제거와 SpotTheCam Pro를 판매합니다. AdMob이 앱에 배너를 띄웁니다.',
    },
    { to: 'GitHub Releases', text: '릴리스마다 APK가 그곳에 올라가고, GitHub 빌드는 거기서 스스로 업데이트합니다.' },
  ],
  design: {
    scale: [
      '설치 하나에 운전자 한 명입니다. 카메라 파일에는 약 13,700대가 한 줄에 하나씩 들어 있습니다.',
      '사이트는 정적 파일이라 서버가 필요한 것은 주행 공유뿐입니다. 작은 Worker 하나가 Cloudflare 무료 요금제 안에 머뭅니다.',
      '공유 주행은 1 MB와 10만 점까지이고, 한 주소에서 1분에 10건까지 공유할 수 있습니다.',
    ],
    data: [
      'data/cameras.json은 한 줄에 카메라 하나로 유형, 주, 위치, 도로, 교외, 출처, 제한 속도, 방향을 담습니다.',
      '주행은 앱의 비공개 저장소에 400일, 도로 제한 속도는 폰에 60일 남습니다.',
      '공유 주행은 Cloudflare KV에 10자 id로 저장되며, 간추린 경로 선과 시간 없는 합계만 담습니다.',
    ],
    interfaces: [
      'Worker는 POST /api/trips와 /api/trips/<id>의 GET, DELETE에만 답합니다. 나머지는 정적 파일입니다.',
      'Capacitor 플러그인이 웹 페이지를 Kotlin 주행 서비스와 그 Swift 포트에 연결합니다.',
      'Overpass 타일이 도로, 철도, 활주로를 줍니다. Photon, Valhalla, TomTom이 장소, 경로, 교통 요청에 답합니다.',
    ],
    reliability: [
      '서비스 워커는 먼저 네트워크를 시도하고 4초 뒤 사본으로 넘어가며, 지도 타일 최대 500장을 오프라인용으로 보관합니다.',
      'Worker의 저장소 오류는 CORS 헤더가 붙은 503으로 나가서, 앱이 신호 없음이 아니라 실패로 읽습니다.',
      '공개 경로 서버가 멈추면 음성이 알려 줍니다. TomTom 한도를 넘으면 경로는 교통 정보 없이 나옵니다.',
    ],
    security: [
      '공유에는 로그인이 필요 없습니다. KV는 삭제 키의 SHA-256 해시만 저장해서, 저장소를 읽어도 주행을 지울 수 없습니다.',
      'Worker는 엄격한 파서로 각 본문을 검사하고 nosniff와 default-src none 정책을 보냅니다.',
      '주행은 공유하기 전까지 폰에만 있습니다. 공유 주행에는 시간이 없고, 카메라 앞 속도는 동의 없이는 빠집니다.',
    ],
    performance: [
      'Kotlin 서비스가 폰에서 GPS를 캐시된 도로와 맞춰 보고, 네트워크 없이 카메라 약 20초 전에 알립니다.',
      '야간 빌드가 시간대별 제한을 앞으로 35일의 구간으로 바꿔서, 브라우저는 현재 구간만 고르면 됩니다.',
      'KV는 공유 주행을 읽는 사람 가까이에서 1분 캐시하고, 타일은 OpenFreeMap의 주간 폴더 이름 없이 저장합니다.',
    ],
    operations: [
      'CI 작업이 시드니 시간 새벽 3시에 카메라를 갱신하고, 차이를 작게 하려고 한 줄에 카메라 하나로 파일을 커밋합니다.',
      'main에 푸시할 때마다 사이트가 Cloudflare에 배포됩니다. 앱이 바뀌면 야간 작업이 Android 번들을 Google Play로 보냅니다.',
      'GitHub용 APK는 GitHub Releases에서 스스로 업데이트합니다. Google Play 빌드에는 그 코드가 없습니다.',
    ],
    tradeoffs: [
      'Expo 대신 Capacitor에 담은 정적 Next.js 사이트를 골라 지도와 사이트 페이지가 코드를 함께 쓰게 했고, 대신 주행용 Worker가 필요합니다.',
      'API 뒤의 데이터베이스 대신 하루 한 번 만드는 JSON 파일을 골라 오프라인과 무서버로 동작하게 했고, 대신 목록이 최대 하루 묵습니다.',
      'WebView의 JavaScript 대신 네이티브 Kotlin 주행 서비스를 골랐습니다. 화면이 꺼지면 Android가 WebView를 멈추기 때문입니다.',
      'Google Maps나 Mapbox 대신 OpenFreeMap 타일의 Leaflet을 골랐습니다. 키도 한도도 필요 없기 때문입니다.',
    ],
  },
  features: {
    'Camera map':
      '밤마다 도는 빌드가 각 카메라의 시간대별 제한을 앞으로 35일의 시간 창으로 바꿉니다. 브라우저는 지금 이 1분의 창을 고릅니다.',
    'Search and filter':
      '페이지가 카메라 파일로 지역 색인을 만들고 브라우저 안에서 검색합니다. 서버는 관여하지 않습니다.',
    'Camera types':
      '각 카메라는 원본 목록의 유형을 지닙니다. 브라우저가 선택을 기억하고, Android 앱은 지도에 보이는 유형만 경고합니다.',
    'Follow me':
      '움직이는 동안 페이지가 GPS 진행 방향으로 지도를 돌립니다. MapLibre는 거리 타일을 자체 각도로 돌려서 글자가 똑바로 섭니다.',
    'Camera details':
      '팝업은 사이트와 함께 오는 카메라 파일을 읽습니다. 유형 목록의 각 출처에는 공식 페이지 링크가 있습니다.',
    'Offline map':
      'Service worker가 페이지, 카메라 파일, 지도 타일 최대 500장을 기기에 저장합니다. 웹 매니페스트 덕분에 브라우저가 앱으로 설치할 수 있습니다.',
    'Light and dark theme':
      '테마는 페이지가 그려지기 전에 적용됩니다. 벡터 타일 스타일이 코드에서 어두운 지도의 도로를 밝게 만듭니다.',
    Languages:
      'i18next가 지도와 앱 화면용 카탈로그 9개를 담습니다. Android 알림은 Android 문자열 파일에서 글을 가져옵니다.',
    'Site pages and ads':
      'Next.js가 빌드 때 주, 지역, 카메라 지점마다 정적 페이지를 씁니다. 웹사이트의 배너는 AdSense가 채웁니다.',
    'Speed badge':
      'Kotlin 코드가 GPS 위치를 OpenStreetMap 도로와 그 제한에 맞춥니다. Android의 활동 보고와 철로와 활주로 모양으로 자동차를 기차나 비행기와 구별합니다.',
    'Camera warnings':
      'Kotlin 서비스가 진행 방향 앞의 카메라를 살피고 약 20초 전에 말합니다. 카메라 근처의 도로 모양으로 어느 쪽에 있는지 압니다.',
    'Camera alerts stay ready':
      'Android의 활동 보고와 마지막 주차 지점을 두른 300m 경계가 주행 서비스를 시작합니다. 재부팅이나 업데이트 뒤에는 투명한 화면이 다시 시작합니다.',
    'Over the limit':
      '도로 제한은 Overpass를 거쳐 OpenStreetMap에서 오고 휴대폰에 60일 남습니다. 제한을 5초 넘으면 Kotlin 검사가 말합니다.',
    'School zones':
      'OpenStreetMap의 시간대별 제한이 구역의 시간을 줍니다. 앱 안의 NSW 공개 학기 목록이 등교일을 줍니다.',
    'Loud warnings':
      '소리마다 내장 스피커에서 알람으로 울리고, 앱은 말이 끝날 때까지 볼륨을 올립니다. 설정의 스위치로 출력을 휴대폰에 돌려줍니다.',
    "Streets in Maisie's voice":
      'PC가 edge-tts로 호주와 뉴질랜드의 이름 있는 도로를 모두 읽고 녹음을 Cloudflare R2에 올립니다. 휴대폰은 주변 거리의 녹음을 받아 캐시에 둡니다.',
    "Author's voice":
      'PC의 공개 음성 모델이 제작자 본인의 목소리로 경고 문구를 만들었습니다. 녹음은 앱 안에 들어 있고 Pro가 잠금을 풉니다.',
    'Trip log':
      'Kotlin 서비스가 운전과 걷기를 카메라마다의 속도와 함께 기록합니다. 주행은 앱의 비공개 저장소에 400일 남습니다.',
    'Trip line by limit':
      '기록된 점마다 속도와 그 도로의 OpenStreetMap 제한이 있습니다. 지도는 이 두 값으로 선의 구간마다 색을 칠합니다.',
    'Trip stats': '앱은 주행의 점으로 휴대폰에서 통계를 냅니다. 시속 20km 아래가 3분 이상 이어진 구간은 정체로 셉니다.',
    'Share a trip':
      '앱이 줄인 경로를 Cloudflare Worker에 보내고, Worker는 고유 id로 KV에 저장합니다. 공유 중지는 그곳에서 지웁니다.',
    Distance: '숫자는 주행 서비스가 휴대폰에 저장한 주행 합계를 읽습니다. 서버는 관여하지 않습니다.',
    'Turn by turn routes':
      'Valhalla가 경유지 두 곳마다 시간을 재고, 앱은 순서를 하나씩 시험합니다. TomTom이 정체를 피하는 길을 고르고, MapLibre 내비게이션 라이브러리가 차를 따라갑니다.',
    'Route options':
      '체크 항목은 도보나 유료 도로 회피를 경로 서비스에 넘깁니다. 즐겨찾기는 휴대폰에 남고, Hey Spot이 이름으로 찾습니다.',
    'Hey Spot':
      'sherpa-onnx가 휴대폰에서 네트워크 없이 호출어를 듣습니다. 나머지는 Android 음성 서비스가 듣고, Photon이 장소를 찾습니다.',
    'Hey Spot, what street am I on?':
      '앱이 차 아래 OpenStreetMap 도로의 이름과 제한을 읽습니다. 휴대폰의 음성 합성이 그것을 말합니다.',
    'Screen stays on':
      '앱의 Android 창이 화면을 켜 두라고 시스템에 요청합니다. 앱이 백그라운드로 가면 요청이 끝납니다.',
    'Self-update':
      'GitHub 빌드는 GitHub Releases에 새 APK를 묻고 Android 설치 프로그램에 넘깁니다. Google Play 빌드에는 업데이트 코드가 빠져 있습니다.',
    'Same app on the iPhone':
      'Capacitor가 같은 사이트를 iOS용으로 감쌉니다. Kotlin 주행과 경로 코드를 Swift로 옮긴 코드가 네이티브 일을 하고, StoreKit 2가 Pro를 판매합니다.',
  },
};

export default arch;

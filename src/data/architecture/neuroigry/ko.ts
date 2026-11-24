import type { Arch } from '../types';

const arch: Arch = {
  summary:
    '하나의 Expo 앱이 사이트, Android 앱, iOS 앱입니다. Rust로 만든 Cloudflare Worker가 한 도메인에서 사이트, R2의 놀이 콘텐츠, 관리자 API를 제공합니다.',
  parts: [
    { name: 'Expo와 React Native', role: '목록, 놀이 페이지, 설정, 관리자. 9개 언어 지원.' },
    { name: 'Rust Worker', role: '웹 내보내기, R2의 /content/*, 관리자와 프리미엄 놀이용 /api/*를 제공.' },
    { name: 'Cloudflare R2', role: 'index.json, 놀이마다 JSON 파일 하나, WebP 사진을 보관.' },
    { name: 'Workbench 계정', role: '프리미엄 놀이를 열고 광고를 숨기는 공통 구독을 확인.' },
    { name: 'AdMob과 AdSense', role: '앱과 사이트의 배너.' },
  ],
  flow: [
    '앱이 목록과 카드가 담긴 /content/index.json을 불러옵니다.',
    '검색과 필터는 기기에서 실행되어 요청을 보내지 않습니다.',
    '카드는 /content/games/<id>.json을 열고, 프리미엄 놀이는 Google ID 토큰으로 /api/premium/<id>를 엽니다.',
    '관리자에서 쓰면 index.json을 다시 만들고 엣지 캐시에서 지웁니다.',
  ],
  links: [
    { to: 'Cloudflare', text: 'Workers, R2, 엣지 캐시.' },
    { to: 'account.workbench-soft.com', text: 'Google 계정에 Workbench 구독이 있는지 알려 줍니다.' },
    { to: 'Google Play', text: 'Android 앱에서 Workbench 요금제를 판매합니다.' },
    { to: 'GitHub', text: '서명된 APK 릴리스를 workbench-soft.github.io에 보관합니다.' },
  ],
  design: {
    scale: [
      '주로 러시아어를 쓰는 부모와 전문가가 한 번에 몇 가지 놀이를 읽습니다.',
      '수백 개 놀이의 목록이 기기가 거르는 색인 파일 하나에 들어갑니다.',
    ],
    data: [
      '각 놀이는 나이, 기능 단위, 목표, 항목이 담긴 JSON 파일입니다. 목록은 index.json에 있습니다.',
      '프리미엄 놀이는 R2의 premium/ 아래, 공개 경로 밖에 있습니다.',
    ],
    interfaces: [
      'GET /content/*가 R2 파일을 제공합니다. /api/premium/<id>는 Google ID 토큰을 받습니다.',
      '/api/admin/*은 관리자 비밀번호로 받은 토큰을 받아 놀이, 사진, 목록을 씁니다.',
    ],
    reliability: [
      '앱은 색인과 연 놀이마다 사본을 보관하고 오프라인에서도 보여 줍니다.',
      '15초 넘게 기다린 요청은 실패로 보고, 화면은 로딩 문구 대신 오류를 보여 줍니다.',
    ],
    security: [
      '관리자 비밀번호와 세션 비밀값은 Worker 시크릿이며 Bitwarden에 보관합니다.',
      'Worker는 account.workbench-soft.com이 요금제를 확인한 뒤에만 프리미엄 놀이를 읽습니다.',
    ],
    performance: [
      'index.json은 브라우저에서 60초, 엣지에서 300초 캐시합니다. 사진은 1년 캐시합니다.',
      '사진은 이름에 해시가 든 WebP라서 새 사진에 캐시 삭제가 필요 없습니다.',
    ],
    operations: [
      'Checks는 main에 푸시할 때마다 PC 러너에서 린트와 테스트를 실행합니다.',
      'Release는 서명된 APK를 빌드해 에뮬레이터에서 열고 neuroigry-v<version>으로 게시합니다. Deploy가 Worker를 배포합니다.',
    ],
    tradeoffs: [
      '네이티브 앱 대신 사이트와 휴대폰에 하나의 Expo 앱을 써서 각 기능을 한 번에 냅니다.',
      '검색 API 대신 기기에서 거릅니다. 전체 목록이 작은 파일 하나에 들어가기 때문입니다.',
    ],
  },
  features: {
    'Catalog with filters and search':
      'catalog/가 기기에서 index.json을 거릅니다. 한 그룹 안의 체크는 목록을 넓히고, 그룹끼리는 좁힙니다. 사진이 없는 카드는 첫 기능 단위의 색을 씁니다.',
    'Game page':
      'game/이 id로 놀이 파일을 불러와 각 항목을 그립니다. 놀이마다 고유 경로가 있어 공유한 링크로 열립니다.',
    'Premium games':
      'Worker가 Google ID 토큰으로 account.workbench-soft.com에 묻고, R2에서 premium/<id>.json을 읽습니다.',
    Ads: 'ads/가 앱에는 AdMob, 사이트에는 AdSense 배너를 띄우고, 요금제가 켜져 있으면 숨깁니다.',
    'Settings and the Workbench plan':
      'pro/에 결제 화면, Google Play 구매, useEntitled()가 있습니다. 사이트와 iOS는 로그인해 휴대폰에서 산 요금제를 엽니다.',
    Admin:
      'admin/은 비밀번호로 로그인한 뒤 /api/admin/*으로 놀이를 편집하고 사진을 올리고 CSV를 가져옵니다. 쓸 때마다 index.json을 다시 만듭니다.',
    'App icon and store listing':
      '아이콘은 design/icons/의 SVG 하나에서 만듭니다. store/listing.md에 Play 문구와 콘솔 답변이 있습니다.',
  },
};

export default arch;

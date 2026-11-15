import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'Rust 파이프라인이 정부 공개 자료를 정적 JSON과 PMTiles 파일로 바꿉니다. 이 파일은 웹 빌드와 함께 GitHub Pages에 올라가고, Expo 앱 하나가 웹, Android, iPhone에서 읽습니다.',
  parts: [
    {
      name: 'Rust 파이프라인',
      role: '출처를 내려받아 행마다 ABS 지역 코드에 맞추고 polars로 중앙값을 냅니다.',
    },
    { name: 'PMTiles', role: '지역과 우편번호 경계를 정적 타일 파일 하나에 담고, 파이프라인이 자릅니다.' },
    { name: 'GitHub Pages', role: '웹 빌드와 데이터 파일을 무료로 제공합니다.' },
    { name: 'Expo와 React Native', role: '웹과 휴대폰의 지도, 필터, 카드, 차트입니다.' },
    {
      name: 'MapLibre와 OpenFreeMap',
      role: '기본 지도 위에 지역 경계를 그리고 중앙값에 따라 지역마다 색을 입힙니다.',
    },
    { name: 'TanStack Query', role: '필터가 요청하는 지도와 지역 파일을 불러옵니다.' },
    { name: 'ts-rs', role: 'Rust 구조체로 데이터 파일의 TypeScript 타입을 씁니다.' },
    { name: 'expo-iap와 AdMob', role: '휴대폰의 배너, 광고 제거, Pro입니다.' },
  ],
  flow: [
    '매주 월요일 CI가 각 주의 매매와 임대 파일을 내려받습니다.',
    'Rust 파이프라인이 행마다 지역에 맞추고 중앙값을 냅니다.',
    'JSON 파일과 타일이 웹 빌드와 함께 GitHub Pages에 올라갑니다.',
    '앱이 고른 필터에 맞는 지도 파일 하나를 불러옵니다.',
    'MapLibre가 지역마다 색을 입히고, 누르면 카드와 차트가 열립니다.',
  ],
  links: [
    {
      to: 'realestate.com.au',
      text: '카드가 그곳의 같은 검색으로 연결됩니다. 앱은 그 사이트의 페이지를 읽지 않습니다.',
    },
    {
      to: 'Australian Bureau of Statistics',
      text: '지역과 우편번호 경계, 그리고 카드마다 있는 2021년 인구 조사 수치입니다.',
    },
    { to: 'Google Play', text: '광고 제거와 Property Trends Pro는 Android에서 한 번 사는 상품입니다.' },
    { to: 'App Store', text: '개발자 계정이 열리면 iPhone에서도 같은 구매를 합니다.' },
  ],
  design: {
    scale: [
      '정적 사이트 하나가 모든 방문자를 맡으므로 독자가 늘어도 스튜디오 비용은 늘지 않습니다.',
      '매매 데이터는 VIC, NSW, SA에서 오고, 형상 파일은 ABS 교외 15,358곳을 53 MB짜리 PMTiles 파일 하나로 자릅니다.',
      '다른 주는 무료 매매 데이터를 공개하지 않아 회색으로 보입니다.',
    ],
    data: [
      '필터 조합마다 자체 JSON 파일이 있습니다. 중앙값은 그룹끼리 더할 수 없기 때문입니다. 매매가 5건 미만인 칸에는 중앙값이 없습니다.',
      '형상은 boundaries.pmtiles에 있고, 피처 id는 교외 코드이며 태그는 없습니다.',
      '교외 파일은 유형과 대지 구간마다 기간, 중앙값, 거래 수의 목록을 담습니다. 인구조사 파일이 Census 2021과 SEIFA 수치를 더합니다.',
    ],
    interfaces: [
      '앱은 정적 JSON과 PMTiles를 HTTP range 요청으로 읽으며 자체 API는 없습니다.',
      'Rust 파이프라인은 CKAN API에서 VIC와 SA 목록을, NSW의 .DAT zip과 ABS 형상을 읽습니다.',
      'ts-rs가 Rust 구조체에서 각 데이터 파일의 TypeScript 타입을 만듭니다.',
    ],
    reliability: [
      '소스의 라이선스가 바뀌면 파이프라인 실행이 멈추므로 라이선스 없는 데이터는 공개되지 않습니다.',
      'Pages는 사이트 전체를 한 번에 바꾸므로 방문자는 하나의 완전한 버전을 읽습니다.',
      '아직 service worker가 없어서 설치한 웹 앱은 네트워크가 필요합니다.',
    ],
    security: [
      '로그인도 서버도 없습니다. 구매는 Google Play가 폰에서 확인하므로 루팅한 폰은 구매를 위조할 수 있습니다.',
      '라이선스가 명시된 공개 데이터만 씁니다. NSW 매매는 라이선스가 비상업용이어서 광고 없는 웹 사이트에만 나옵니다.',
      '계획 중인 Rust Worker는 API 키를 Worker 시크릿에 두어 번들 밖에 둡니다. 아직 만들지 않았습니다.',
    ],
    performance: [
      '파일을 미리 계산해 두어서 필터를 바꾸면 JSON 하나만 받고, 웹 지도는 feature-state로 색을 바꿉니다.',
      '폰에서는 MapLibre가 파일로 match 식 하나를 만듭니다. feature-state 호출 15,000번이 브리지를 하나씩 건너는 것을 피하려는 것입니다.',
      'PMTiles는 같은 타일을 한 번만 저장하고, 입력이 지난 실행과 같으면 배포는 파이프라인을 건너뜁니다.',
    ],
    operations: [
      'Checks는 PC 러너에서 TypeScript와 Rust 작업을 나란히 실행합니다. lint, 타입, 테스트, web과 iOS 내보내기입니다.',
      'Deploy web은 초록색 Release마다 그리고 매주 월요일에 돕니다. 사이트 저장소의 릴리스를 게시하고 Pages가 최신 것을 풉니다.',
      '호스팅 비용은 0달러입니다. GitHub Pages, 키가 필요 없는 OpenFreeMap 배경 지도, 자체 호스팅 러너를 씁니다.',
    ],
    tradeoffs: [
      '서버 데이터베이스 대신 GitHub Pages의 정적 파일을 골라 호스팅을 0달러로 했습니다. 필터는 정해진 선택지로 남습니다.',
      '약관이 금지하는 포털 스크래핑 대신 정부 공개 데이터를 골랐습니다. 대가로 침실 수가 없고 회색 주가 생깁니다.',
      'Node 스크립트 대신 Rust 파이프라인을 골랐습니다. NSW는 1990년 이후 모든 매매를 갖고 있고 형상 처리도 무겁기 때문입니다.',
      '웹 전용 사이트 대신 Expo 코드베이스 하나를 골라 스토어 빌드가 두 번째 앱이 되지 않게 했습니다. 지도에는 라이브러리 2개가 필요합니다.',
    ],
  },
  features: {
    'Price map':
      'Rust 파이프라인이 지역과 유형별로 기간마다 중앙값을 냅니다. MapLibre가 ABS 지역마다 분위수로 나눈 7단계 색을 칠합니다.',
    Filters:
      '필터 조합마다 미리 만든 JSON 파일이 있습니다. 필터를 바꾸면 파일 하나를 불러오고, URL이 선택을 기억합니다.',
    'Listings on realestate.com.au':
      '앱이 지역, 우편번호, 유형으로 realestate.com.au 검색 링크를 만듭니다. 그 사이트의 페이지는 읽지 않습니다.',
    'Suburb card and history chart':
      '누르면 기간마다의 중앙값과 거래 수가 담긴 지역 파일 하나를 불러옵니다. react-native-svg와 d3가 플랫폼마다 차트를 그립니다.',
    Search: '검색은 지역마다 이름, 우편번호, 범위가 담긴 색인 파일을 읽습니다. 고르면 지도가 그 범위로 날아갑니다.',
    Languages: 'i18next가 카탈로그 9개를 담고, Intl이 언어마다 가격과 날짜를 맞춥니다. 브라우저가 선택을 기억합니다.',
    Rents:
      '파이프라인이 각 주의 보증금 자료와 VIC Rental Report로 우편번호마다 주간 임대료 중앙값을 냅니다. MapLibre는 따로 둔 우편번호 타일 파일을 칠합니다.',
    'Install from the browser':
      '웹 앱 매니페스트가 이름, 아이콘, 제목 표시줄 색을 정합니다. 아직 service worker가 없어서 네트워크가 필요합니다.',
    'Ads and Remove ads':
      'react-native-google-mobile-ads가 Google 동의 양식 뒤에 배너를 띄웁니다. expo-iap가 시작할 때마다 광고 제거 구매를 확인하고, 웹 빌드는 광고를 끕니다.',
    'Property Trends Pro':
      'expo-iap가 시작할 때마다 Google Play나 App Store에서 Pro 구매를 확인합니다. 앱 안의 확인 한 곳이 임대와 전체 기록을 엽니다.',
    'iPhone app':
      '같은 Expo 코드가 iOS용으로 빌드되고, AdMob이 시작하기 전에 추적 허용을 묻습니다. 지금은 macOS 러너나 EAS가 시뮬레이터용 앱을 빌드합니다.',
  },
};

export default arch;

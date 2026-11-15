import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'GitHub Actions의 폴러가 각 주의 연료 가격 자료를 Cloudflare D1에 씁니다. Pages Functions가 D1을 읽어 앱과 검색 페이지에 답하고, Expo 앱 하나가 Android, iPhone, 웹에서 지도를 그립니다.',
  parts: [
    {
      name: 'GitHub Actions의 폴러',
      role: '일정에 따라 각 피드를 가져와 바뀐 가격을 D1에 씁니다.',
    },
    {
      name: '각 주의 가격 피드',
      role: 'NSW FuelCheck, VIC의 Servo Saver, Fuel Prices QLD, FuelWatch WA가 가격을 줍니다.',
    },
    {
      name: '충전기 출처',
      role: 'Open Charge Map, Transport for NSW, OpenStreetMap을 합쳐 충전기마다 한 번만 보입니다.',
    },
    { name: 'Cloudflare D1', role: '지금 가격과 날마다 기록을 남기는 트리거입니다.' },
    {
      name: 'Cloudflare Pages Functions',
      role: 'API로 앱에 답하고 검색 페이지와 사이트맵을 만듭니다.',
    },
    { name: 'Expo와 React Native', role: 'Android, iPhone, 웹사이트를 위한 코드 하나입니다.' },
    { name: 'MapLibre와 OpenFreeMap', role: '브라우저와 휴대폰의 지도로, 키가 필요 없는 타일을 씁니다.' },
    {
      name: 'Hey Servo 모듈',
      role: 'Kotlin으로 만든 Expo 모듈로, 오프라인 호출어 모델과 Android 음성 서비스를 씁니다.',
    },
  ],
  flow: [
    '폴러가 각 주의 피드를 읽고, NSW, VIC, QLD는 매시간 읽습니다.',
    '바뀐 가격만 D1에 들어가고, 트리거가 날마다의 기록에 더합니다.',
    '앱이 Pages Function에 지도 범위 안의 주유소를 묻습니다.',
    '엣지 캐시가 5분 동안 반복 요청에 답하고, 나머지는 D1이 답합니다.',
    '앱이 가격에 따라 핀마다 색을 입히고 주유소 목록을 보여 줍니다.',
  ],
  links: [
    {
      to: 'spotthecam',
      text: 'Hey Servo는 Hey Spot의 설계를 따릅니다. 앱 하나가 호출 문구마다 마이크를 잡습니다.',
    },
    {
      to: 'keeppad',
      text: 'keepPad와 Lumiere는 wakeshare 라이브러리로 같은 마이크를 나눠 씁니다.',
    },
    {
      to: 'Google Maps',
      text: '경로를 누르거나 Hey Servo 명령을 말하면 Google Maps 내비게이션이 열립니다.',
    },
    { to: 'Google Play', text: '광고 제거와 ServoHop Pro는 한 번 사는 상품입니다. AdMob이 배너를 띄웁니다.' },
    { to: 'GitHub Releases', text: '릴리스마다 APK가 그곳에 올라가고, GitHub 빌드는 거기서 스스로 업데이트합니다.' },
  ],
  features: {
    'Fuel prices on a map':
      'Pages Function이 지도 범위 안의 주유소를 D1에서 최대 400곳 돌려줍니다. 앱은 화면의 가격을 셋으로 나눠 핀에 색을 입힙니다.',
    'Your place on the map':
      '휴대폰에서는 expo-location이 위치와 나침반 방향을 줍니다. 웹에서는 브라우저의 위치와 방향 이벤트가 같은 일을 합니다.',
    'Station list': '목록은 지도와 같은 응답에서 같은 주유소를 보여 줍니다. 거리는 휴대폰에서 잰 직선거리입니다.',
    'Price history chart':
      'Pages Function이 D1에서 날짜별 행을 읽고, 공용 차트 코드가 변화 없는 날로 가격을 이어 갑니다. react-native-svg가 선과 띠를 그립니다.',
    'Driver price reports':
      '앱이 신고를 Pages Function에 보내면 범위와 보낸 사람별 시간당 한도를 확인합니다. 가격은 D1에 들어갑니다.',
    'EV chargers':
      '폴러가 날마다 공개 출처 3곳의 충전기를 합칩니다. 운전자 신고가 네트워크별 kWh당 가격을 D1에 남깁니다.',
    'Search pages':
      'Pages Functions가 주, 지역, 주유소마다 단순한 HTML을 만들고 차트는 SVG로 그립니다. 엣지가 페이지마다 30분 동안 보관합니다.',
    'Site text and guides':
      '빌드 단계가 홈 페이지 글을 내보낸 HTML에 넣습니다. 가이드는 Pages Functions가 저장소의 글로 제공합니다.',
    'Self-update from GitHub':
      '앱이 GitHub Releases에 새 APK를 묻고 Android 설치 프로그램에 넘깁니다. Google Play 빌드는 업데이트 코드를 빈 대체 파일로 바꿉니다.',
    'Remove ads':
      'expo-iap가 Google Play로 상품을 판매합니다. 구매는 Google 계정을 따라가서 새 휴대폰에서 복원으로 되찾습니다.',
    'ServoHop Pro':
      'expo-iap가 시작할 때마다 Pro 구매를 확인합니다. 앱 안의 확인 한 곳이 365일 차트를 열고 광고를 숨깁니다.',
    'Area search':
      'Pages Function이 색인 2개로 주유소 표에서 지역이나 우편번호를 찾습니다. 외부 지오코더도 키도 필요 없습니다.',
    'Hey Servo':
      'sherpa-onnx가 휴대폰에서 호출 문구를 듣고, Android 음성 서비스가 명령을 듣습니다. 답은 ServoHop API에서 옵니다.',
    'Fuel panel':
      '고른 연료가 API 요청마다 들어가고, 앱은 다음 실행까지 기억합니다. 충전기는 가장 센 플러그로 분류합니다.',
    Ads: 'react-native-google-mobile-ads가 동의 양식 뒤에 앱에서 배너를 띄웁니다. 사이트와 검색 페이지에서는 AdSense가 채웁니다.',
    Languages: 'i18next가 카탈로그 9개를 담고, expo-localization이 휴대폰이나 브라우저의 언어를 읽습니다.',
  },
};

export default arch;

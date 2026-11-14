import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'Expo 앱 하나가 Android와 웹에서 돌며 목록마다 기기의 SQLite에 저장합니다. 공유한 목록은 Firestore에도 가고, 앱 자체 서버는 없습니다.',
  parts: [
    {
      name: 'Expo and React Native',
      role: 'Android 앱과 웹사이트를 한 코드에서 만들고, 사이트는 Firebase Hosting이 제공합니다.',
    },
    { name: 'SQLite', role: 'expo-sqlite로 목록과 항목을 기기에 저장하고, 브라우저에서는 wasm으로 돕니다.' },
    { name: 'Firestore', role: '공유 목록, 매장 통로, 매장 동선을 익명 로그인 뒤에 저장합니다.' },
    {
      name: '문장 파서와 이모지 사전',
      role: '휴대폰의 규칙이 문장을 항목으로 나누고 이모지와 코너를 고릅니다.',
    },
    { name: 'OpenStreetMap', role: '매장 검색과, 휴대폰이 지금 있는 매장.' },
    { name: 'Wikipedia and Wikidata', role: '도시와 명소이며, Tripforge Worker가 답하면 그쪽으로 읽습니다.' },
    { name: 'Coles and Woolworths', role: '각 매장 사이트 검색에서 읽은 단위 가격.' },
    { name: 'Google Play', role: 'AdMob 광고와 expo-iap를 통한 광고 제거, Pro 구매.' },
  ],
  flow: [
    '사용자가 항목을 입력하거나 말하면 파서가 나눕니다.',
    '휴대폰이 각 항목을 바로 SQLite에 저장합니다.',
    '공유를 누르면 목록이 Firestore로 가고 링크가 열립니다.',
    '다른 휴대폰이 링크를 열고 Firestore의 목록을 따라갑니다.',
    '한쪽의 체크가 1, 2초 안에 다른 쪽에 보입니다.',
  ],
  links: [
    {
      to: 'tripforge',
      text: 'Tripforge의 여행 링크가 명소 목록과 짐 목록을 만듭니다. 명소 목록에서 항공편을 계획하러 돌아갈 수 있습니다.',
    },
    { to: 'guitar-upscale', text: '배울 곡 목록의 곡은 Guitar Upscale에서 열어 함께 연주합니다.' },
    { to: 'Firebase', text: 'Firestore가 공유 목록을 동기화하고 Hosting이 사이트를 제공합니다.' },
    { to: 'OpenStreetMap', text: 'Nominatim이 이름으로 매장을 찾고 Overpass가 근처 매장을 찾습니다.' },
    { to: 'Google Play', text: 'AdMob이 광고를 보여 주고 Play Billing이 광고 제거와 Pro를 팝니다.' },
  ],
  features: {
    'Share by link':
      'Firestore가 공유 목록의 사본을 두고, 링크에는 무작위 id가 담깁니다. 휴대폰은 변경을 먼저 SQLite에 저장하고 네트워크가 돌아오면 보냅니다.',
    'Base list':
      '기본 목록으로 만든 목록은 기본 항목을 복사하고 어느 항목을 따르는지 기억합니다. 기본 목록의 변경은 손대지 않은 사본에 반영됩니다.',
    'Typing and dictating':
      '휴대폰의 규칙 기반 파서가 이모지 사전과 숫자로 문장을 나눕니다. expo-speech-recognition이 휴대폰 음성 서비스로 말을 글로 바꿉니다.',
    Pictures:
      '앱 안의 사전이 이름에 이모지와 코너를 정합니다. 영어와 러시아어를 지원합니다. 사진은 작은 JPEG로 줄어 항목과 함께 갑니다.',
    'The store and the walk through it':
      'OpenStreetMap의 Overpass와 Nominatim이 매장을 찾습니다. 앱은 체크 순서로 코너 순서를 배우고 SQLite에 저장합니다.',
    'Shared aisles':
      '통로와 동선은 매장의 OpenStreetMap id 아래 Firestore에 있습니다. 그 매장을 고른 휴대폰이 읽고, 입력한 통로는 바로 올라갑니다.',
    'Prices at Coles and Woolworths':
      '휴대폰이 각 매장 사이트 검색을 읽고 첫 상품을 SQLite에 하루 보관합니다. 더 싼 단위 가격이 초록색으로 보입니다.',
    'Packing for a trip':
      '짐 목록은 SQLite에 있는 기본 짐 목록의 사본입니다. 공유는 다른 목록처럼 Firestore를 거칩니다.',
    'Things to see':
      '도시는 Wikipedia에서, 장소는 Tripforge Worker나 Wikidata에서 옵니다. 휴대폰의 k-means 단계가 날짜별로 나눕니다.',
    'Lists that are done':
      '휴대폰의 타이머가 마지막 체크 3시간 뒤, 또는 2주 동안 변경이 없으면 목록을 보관함으로 옮깁니다.',
    'Light and dark': '테마는 React Native로 휴대폰을 따르거나 설정의 선택을 따르며, 선택은 기기에 남습니다.',
    Updates:
      'GitHub 빌드는 GitHub releases에 새 APK를 묻고 Android 설치 프로그램을 엽니다. Google Play 빌드에는 이 모듈이 없습니다.',
    Ads: 'AdMob이 Google 동의 양식 뒤에 배너와 전면 광고를 보여 줍니다. 광고 제거 구매는 Google Play Billing이 팝니다.',
    'Tick-a-Lot Pro':
      'Google Play Billing이 expo-iap로 Pro를 팔고, 앱은 시작할 때마다 Play에 다시 묻습니다. 잠금은 모듈 하나가 정합니다.',
    'The weekly shop for two':
      '한 휴대폰이 기본 목록으로 목록을 만들어 Firestore로 공유합니다. 다른 휴대폰이 체크하고, 체크는 몇 초 안에 돌아옵니다.',
    'Songs to learn':
      '곡 파서는 쉼표에서만 나눕니다. 곡마다 Guitar Upscale과 코드, 탭, 영상 사이트로 가는 검색 링크가 붙습니다.',
    'Changing and deleting':
      '각 입력란은 벗어날 때 SQLite에 쓰입니다. 삭제는 행에 표시만 하므로 실행 취소와 다른 휴대폰 반영이 됩니다.',
    Languages:
      'i18next가 9개 언어 카탈로그를 맡고 expo-localization이 휴대폰 언어를 읽습니다. 목록의 글은 입력한 그대로입니다.',
    'Finding Tick-a-Lot in search':
      'Expo 내보내기 뒤에 빌드 스크립트가 안내 글, About, 사이트맵을 일반 HTML로 씁니다. 앱 페이지는 개인 목록이라 noindex가 붙습니다.',
    'Open source licences':
      '빌드 작업이 패키지마다 라이선스 문구를 앱 안의 파일 하나에 모읍니다. 설정 화면은 그 파일에서 목록을 보여 줍니다.',
  },
};

export default arch;

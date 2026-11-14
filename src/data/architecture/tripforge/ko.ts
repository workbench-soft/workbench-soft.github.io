import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'Android와 웹용 Expo 앱이 Cloudflare의 Rust Worker 하나를 부릅니다. Worker가 바깥 호출과 키를 맡고, 여행 로직은 Rust crate에 있습니다.',
  parts: [
    { name: 'Expo and React Native', role: 'react-native-web으로 Android 앱과 웹사이트를 한 코드에서 만듭니다.' },
    { name: 'Rust Worker', role: '장소, 항공편, 명소, 숨은 명소의 경로이며 각각 Workers 캐시 뒤에 있습니다.' },
    { name: 'trip-core', role: '날짜 범위, 일행 요금, 요금 달력, 장소 태그를 담은 Rust crate입니다.' },
    { name: 'Travelpayouts', role: '항공 요금과 Aviasales 제휴 링크를 줍니다.' },
    { name: 'Wikivoyage and Wikidata', role: '명소, 숨은 명소, 그리고 그것을 분류하는 클래스를 줍니다.' },
    { name: 'Google Play', role: 'AdMob 광고와 광고 제거, Pro 구매를 맡습니다.' },
  ],
  flow: [
    '사용자가 장소, 대략의 날짜, 박 수, 일행을 입력합니다.',
    '앱이 Worker에 장소를 묻고, 이어서 항공편을 묻습니다.',
    'Worker는 캐시된 답을 주고 없는 것은 Travelpayouts, Wikivoyage, Wikidata에서 가져옵니다.',
    'trip-core가 일행 기준으로 여행 가격을 내고 요금 달력을 만듭니다.',
    '앱이 제안, 달력, 링크를 보여 줍니다. 저장한 여행은 휴대폰에 남습니다.',
  ],
  links: [
    {
      to: 'tickalot',
      text: '링크 하나로 여행을 양쪽으로 넘기며 공유 계정은 없습니다. Tick-a-Lot도 같은 Worker에서 명소를 읽습니다.',
    },
  ],
  features: {
    Ask: '폼은 Worker를 통해 각 장소를 찾습니다. Tick-a-Lot에서 온 링크는 주소의 내용으로 폼을 채웁니다.',
    Flights:
      'Worker는 날짜 범위의 달마다 Travelpayouts에 묻고 요금을 6시간 보관합니다. trip-core가 일행 기준 가격으로 바꾸고 링크를 붙입니다.',
    Places:
      'Worker는 도시 근처의 Wikidata 명소와 Wikivoyage 목록을 합칩니다. Wikidata 클래스가 장소마다 태그를 달고, 칩은 그 태그로 거릅니다.',
    'To Tickalot': '앱은 장소, 출발일, 박 수를 Tick-a-Lot 링크 자체에 담습니다. 여행을 저장하는 서버는 없습니다.',
    Settings: 'i18next가 9개 언어 카탈로그를 맡습니다. 고른 언어는 Expo의 SQLite로 휴대폰에 남습니다.',
    Ads: 'AdMob이 Android에서 배너와 전면 광고를 보여 줍니다. 검사 하나가 동의 답변과 구매 2개를 보고 광고마다 정합니다.',
    'Tripforge Pro':
      'Google Play Billing이 상품을 팔고 앱은 구매 표시를 휴대폰에 저장합니다. 잠금은 모듈 하나가 정하고 한도는 파일 하나에 있습니다.',
    'Website pages for search':
      'Expo가 빌드할 때 경로와 언어마다 HTML 페이지를 씁니다. 이어서 스크립트가 페이지 언어를 정하고 404 페이지와 사이트맵을 만듭니다.',
  },
};

export default arch;

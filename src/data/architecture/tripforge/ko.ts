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
  design: {
    scale: [
      '한 사람이 계획하는 여행은 일 년에 몇 번이라 부하가 작습니다. Cloudflare Workers 무료 요금제는 하루 100,000건의 요청을 허용합니다.',
      '모두가 분당 한도가 있는 Travelpayouts 토큰 하나를 공유하므로 무료 기기는 하루 10번 검색합니다. Pro가 이를 풀어 줍니다.',
    ],
    data: [
      'Worker에는 데이터베이스가 없습니다. 외부 응답은 각자의 유효 기간 동안 Workers 캐시에 있습니다.',
      '기기는 언어 선택, 검색 횟수, 저장한 여행, 구매 플래그를 localStorage에 두며, Android에서는 expo-sqlite를 거칩니다.',
      '여행은 v, place, start, nights와 최대 60곳이 든 JSON으로 링크 안에 실려 Tick-a-Lot에 닿습니다. 서버는 이를 보관하지 않습니다.',
    ],
    interfaces: [
      'Worker에는 GET 경로 4개가 있습니다. /places, /flights, /sights, /spots이며 각각 쿼리 매개변수를 받아 JSON으로 답합니다.',
      'trip-core는 원시 운임을 받아 그룹 기준으로 계산한 제안, 운임 달력, 링크를 돌려줍니다.',
      '여행은 base64url 해시로 Tick-a-Lot에 넘어가고, 장소와 숙박일의 쿼리 문자열로 Ask 화면에 돌아옵니다.',
    ],
    reliability: [
      '캐시 수명은 운임 6시간, 장소와 명소 7일, Wikivoyage 페이지 30일입니다.',
      '200으로 온 오류(MediaWiki의 maxlag나 Travelpayouts의 success:false 등)와 잘린 JSON 본문은 캐시하지 않고 돌려보냅니다.',
      '/spots는 호출을 최대 6번 하고, 현지판 항목이 3개 미만이면 영어판 Wikivoyage로 넘어갑니다.',
    ],
    security: [
      '모든 비밀과 외부 호출은 Worker가 맡습니다. 앱은 어떤 크레이트도 가져오지 않고 키도 갖지 않습니다.',
      '계정이 없습니다. Pro와 광고 플래그는 기기에 있고 Google Play로 구매하므로, 앱 데이터를 지우면 검색 횟수가 초기화됩니다.',
      'Wikidata 호출은 Wikimedia의 요청대로 User-Agent에 앱 이름을 적습니다.',
    ],
    performance: [
      '모든 외부 호출은 Workers 캐시 뒤에 있습니다. 읽어 둔 Wikivoyage 항목은 30일 동안 거기 머뭅니다. 런던을 읽는 데 CPU 약 20 ms가 들지만 캐시에서는 1 ms이기 때문입니다.',
      'Wikidata 쿼리 한 번으로 한 페이지 분량 항목의 언어 수와 분류를 얻으므로 장소마다 호출할 필요가 없습니다.',
      '긴 목록은 FlashList로 그려서 화면에 보이는 행만 그려집니다.',
    ],
    operations: [
      'main에 push하면 Checks(lint, 테스트, 빌드)가 시작됩니다. Checks가 통과하면 Release와 Deploy가 workflow_run으로 시작됩니다.',
      'Release는 줄을 서서 각자 앞 태그 뒤에 버전을 고르고, 더 새로운 Deploy가 오래된 것을 취소합니다.',
      'Deploy는 웹 내보내기와 Worker를 내보낸 뒤 두 호스트 중 하나라도 응답하지 않으면 실패합니다. Rust 버전은 고정이고 Worker는 wasm용으로 빌드합니다.',
    ],
    tradeoffs: [
      '플래너는 앱 안의 wasm 대신 Worker에서 돕니다. Hermes는 wasm을 실행하지 못하기 때문입니다. 대가는 오프라인 계획이 안 되는 것입니다.',
      'Duffel이나 스크래핑 대신 Travelpayouts의 캐시된 운임을 택했습니다. 무료이고 호출 한 번으로 어느 날이 가장 싼지 알 수 있습니다. 대가는 2일에서 7일 묵은 운임입니다.',
      '명소 데이터 업체 대신 Wikidata와 Wikivoyage를 택했습니다. 무료이고 Wikipedia 언어 수가 유명도 신호가 되어 숨은 명소를 찾아 줍니다.',
      '광고 공간을 늘리는 대신 항공편 화면에는 광고를 두지 않습니다. 수수료 링크 옆의 오클릭은 정지 위험이 있기 때문입니다.',
    ],
  },
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
    'Dark mode':
      '각 색은 밝은 값과 어두운 값을 가진 토큰입니다. 휴대폰은 시스템 테마로 세트를 고르고, 웹사이트는 prefers-color-scheme와 CSS 변수를 씁니다.',
  },
};

export default arch;

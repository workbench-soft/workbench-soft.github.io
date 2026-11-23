import type { Arch } from '../types';

const arch: Arch = {
  summary:
    '서버 없는 Expo 앱입니다. 휴대폰의 숨은 WebView가 각 출처의 검색 페이지를 열고, 앱은 돌아온 HTML에서 가격을 읽습니다.',
  parts: [
    {
      name: 'Expo와 React Native',
      role: '앱과 화면은 expo-router로, 9개 언어는 i18next로 만듭니다.',
    },
    {
      name: 'react-native-webview',
      role: '각 검색 페이지를 보이지 않게 열고 그 HTML을 앱으로 돌려보냅니다.',
    },
    {
      name: 'node-html-parser',
      role: '그 HTML에서 가격을 읽습니다. 테스트가 저장된 페이지에서 돌리는 것과 같은 파싱 코드입니다.',
    },
    {
      name: 'metro.json',
      role: '모스크바의 지하철, МЦК, МЦД 역마다 행정구를 짝지어 둡니다.',
    },
    {
      name: 'expo-sqlite',
      role: '구매 목록을 휴대폰에 저장합니다.',
    },
    {
      name: 'GitHub Actions',
      role: '푸시마다 검사하고, 서명된 APK를 빌드해 에뮬레이터에서 연 뒤 릴리스를 게시합니다.',
    },
  ],
  flow: [
    '담당자가 품목을 입력하고 검색을 누릅니다.',
    '출처마다 숨은 WebView가 휴대폰 자체 연결로 검색 페이지를 엽니다.',
    '페이지 HTML이 돌아오고, 출처별 파싱 함수가 이를 상품 정보로 바꿉니다.',
    '행정구 필터와 가격순 정렬이 화면에 하나의 목록을 만듭니다.',
  ],
  links: [
    {
      to: 'АптекаМос',
      text: '약국마다 가격, 주소, 지하철역이 나온 상품과 약국 페이지입니다.',
    },
    {
      to: 'Мегаптека',
      text: 'JSON 검색 API로, 모스크바와 가격순으로 묻습니다.',
    },
    {
      to: 'Wildberries',
      text: '사이트 자체 스크립트 확인을 거친 뒤 읽는 상품 카드입니다.',
    },
    {
      to: 'Ozon',
      text: '봇 확인이 가장 엄격해서 검색 결과는 가능한 만큼 읽습니다.',
    },
    {
      to: 'GitHub',
      text: '앱이 업데이트를 확인하는 APK 릴리스를 보관합니다.',
    },
  ],
  design: {
    scale: [
      '모스크바의 구매 담당자 1명이 Android 휴대폰 1대로 한 번에 몇 개 품목을 검색합니다.',
      '운영은 무료입니다. 서버, 유료 API, 광고가 없어서 검색은 휴대폰에서 돌아갑니다.',
    ],
    data: [
      '현재 검색의 상품 정보는 메모리에 있습니다. 상품, 포장, 가격, 판매자, 주소, 지하철역입니다.',
      '구매 목록은 SQLite에 있습니다. 고른 행정구와 언어는 로컬 저장소에 있습니다.',
    ],
    interfaces: [
      '출처 모듈마다 검색 URL과 파싱 함수가 있습니다. 주입 스크립트는 정리한 HTML을 window.ReactNativeWebView.postMessage로 보냅니다.',
      'Мегаптека는 api.megapteka.ru에 보내는 평범한 fetch에 답하며, 모스크바는 city_id 6565입니다.',
    ],
    reliability: [
      '각 출처는 최대 60초 뒤 따로 실패하고, 그 줄에 이유가 나옵니다. 다른 출처는 계속됩니다.',
      '출처마다 저장된 페이지로 파서를 돌리는 테스트가 있어, 페이지 구조가 바뀌면 CI에서 드러납니다.',
    ],
    security: [
      '앱에는 계정이 없고 자체 서버로 데이터를 보내지 않습니다.',
      '도매업체 로그인은 휴대폰의 WebView 쿠키 저장소에 남습니다. 서명 키는 Bitwarden과 저장소 시크릿에 있습니다.',
    ],
    performance: [
      '출처는 동시에 불러오고, АптекаМос는 약국 대부분이 갖춘 상품 3개만 읽습니다.',
      '주입 스크립트는 HTML을 보내기 전에 스크립트와 스타일을 지웁니다.',
    ],
    operations: [
      'Checks는 main에 푸시할 때마다 lint, 타입, knip, 테스트, Android 번들을 돌립니다.',
      'Release는 서명된 APK를 빌드하고, 충돌을 잡으려 에뮬레이터에서 연 뒤 medpoisk-v<date>.<n>으로 게시합니다.',
    ],
    tradeoffs: [
      '서버 대신 휴대폰에서 페이지를 읽습니다. 러시아 출처가 해외와 데이터센터 IP를 막기 때문입니다. 사이트가 바뀌면 파서를 고칠 때까지 그 출처는 멈춥니다.',
      '로봇 확인을 코드로 풀지 않고 시트에 띄워, 담당자가 한 번 손으로 통과합니다.',
      '목록에 도매가를 넣지 않고 담당자 자신의 로그인으로 도매 포털을 엽니다. 그 가격은 담당자 계정이 있어야 보이기 때문입니다.',
    ],
  },
  features: {
    'Price search':
      'run-search.ts가 출처를 동시에 시작합니다. HiddenPages.tsx가 보이지 않는 WebView로 페이지를 열고, 출처 모듈이 HTML을 가격순 상품 정보로 바꿉니다.',
    'Moscow okrugs':
      'okrug-of.ts가 metro.json에서 약국의 지하철역을 찾습니다. 역이 없는 주소는 도시로 정해지며, 모스크바는 미상으로 남고 다른 도시는 Подмосковье가 됩니다.',
    'Site checks':
      '출처마다 확인 페이지와 결과 페이지를 구분하는 테스트가 있습니다. CheckSheet.tsx가 확인을 보여 주고, 쿠키는 공용 WebView 저장소에 남으며, 그 출처는 다시 숨어서 돌아갑니다.',
    'Shopping list':
      'items.ts가 입력한 단어를 SQLite에 저장합니다. check-all.ts가 품목을 차례로 검색하고 고른 행정구의 최저가 상품 정보를 남깁니다.',
    'Map and the place to buy':
      'places.json은 모스크바의 구역과 역을 Wikidata 좌표와 함께 담습니다. offer-sections.ts는 약국 역까지의 거리로 정렬하고, OfferMap은 MapLibre로 OpenFreeMap 타일 위에 핀을 그립니다.',
    'Wholesale prices':
      'dealmed.ts와 imsstore.ts는 휴대폰과 검색 Worker에서 각 검색 페이지의 도매가와 재고를 읽습니다.',
    Distributors: 'distributors.ts가 회사마다 첫 페이지를 나열합니다. browser.tsx가 쿠키를 유지하는 WebView로 엽니다.',
    'Languages and updates':
      'i18n.ts가 i18next를 바로 바꾸고 선택을 기억합니다. newer-release.ts가 시작할 때와 돌아올 때 GitHub에 새 medpoisk APK를 묻습니다.',
  },
};

export default arch;

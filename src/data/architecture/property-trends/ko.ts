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

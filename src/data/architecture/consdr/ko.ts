import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'Vite로 빌드한 React 정적 사이트가 계산을 브라우저 안에서 하고, Cloudflare가 제공합니다. Android의 Java WebView 앱은 실제 사이트를 보여 주고, iPhone의 Capacitor 앱은 사이트를 안에 담습니다.',
  parts: [
    { name: 'React and Vite', role: '계산기 페이지로, 빌드할 때 기본 숫자로 미리 그립니다.' },
    { name: '규칙과 비용 모듈', role: '세금 규칙, 그 출처, 선택지별 계산을 담은 순수 TypeScript.' },
    { name: 'localStorage', role: '바꾼 입력란, 테마, 언어를 그 브라우저에만 둡니다.' },
    { name: 'Service worker', role: '페이지와 파일 캐시로, 다음 방문은 오프라인에서도 됩니다.' },
    { name: 'i18next', role: '9개 언어 카탈로그로, 고를 때 불러옵니다.' },
    { name: 'Cloudflare', role: '빌드한 파일, 리디렉션, Web Analytics를 맡습니다.' },
    { name: 'Android WebView app', role: '실제 사이트를 감싼 Java로, AdMob 배너와 Google Play 구매가 있습니다.' },
    { name: 'Capacitor', role: '사이트 파일을 안에 담은 iPhone 앱이며, 광고, StoreKit, 공유는 Swift가 맡습니다.' },
  ],
  flow: [
    'Cloudflare가 기본 숫자로 미리 그린 페이지를 보냅니다.',
    '페이지가 localStorage에서 저장한 입력을 읽습니다.',
    '입력을 바꿀 때마다 브라우저에서 비교를 다시 하고 저장합니다.',
    '페이지에 총액 3개, 그 구성, 계산 과정이 나옵니다.',
    'Service worker가 다음 오프라인 방문을 위해 파일을 저장합니다.',
  ],
  links: [
    { to: 'Cloudflare', text: '사이트를 호스팅하고 리디렉션과 Web Analytics를 돌립니다.' },
    { to: 'Google AdSense', text: '웹사이트의 자동 광고입니다. 앱은 AdSense를 불러오지 않습니다.' },
    { to: 'Google Play', text: 'Android 앱의 AdMob 배너와 광고 제거 구매.' },
    { to: 'App Store', text: 'iPhone 앱이 App Store에 오르면 StoreKit이 광고 제거를 팝니다.' },
  ],
  features: {
    'Compare a lease, a loan and cash':
      '순수 TypeScript 함수가 입력을 받아 선택지마다 총액 하나를 돌려줍니다. 입력할 때마다 브라우저에서 돌고, 숫자를 보는 서버는 없습니다.',
    'Where the money goes': '비교는 총액 옆에 그 구성을 함께 돌려줍니다. 설명 모듈이 숫자마다 옆에 항목과 식을 씁니다.',
    'Lease and loan settings':
      '입력 모듈이 입력한 글을 숫자로 바꾸고 변경마다 localStorage에 저장합니다. 반쯤 입력한 값도 화면에 남습니다.',
    'FBT by car type and start date':
      '규칙 모듈이 차종, 시작일, 가격으로 FBT 세율과 전기차 면제를 고릅니다. 상수마다 출처가 붙어 있습니다.',
    'Stamp duty by state': '규칙 모듈의 주별 표가 가격, 차종, 시작일로 인지세를 계산합니다.',
    'Account interest':
      '비교는 계좌를 이율에 맞춰 달마다 굴립니다. 선택지마다, 그리고 차가 없을 때를 굴리며 그 차이가 놓친 이자입니다.',
    'Borrowing for another home':
      '비교는 차값을 갚는 동안 은행이 얼마나 덜 빌려줄지 계산합니다. 30년 기준 APRA 완충 3포인트를 씁니다.',
    'Working and sources':
      '설명 모듈이 단계와 식을 숫자 옆에 씁니다. 출처 파일이 고정된 숫자마다 그 페이지를 연결합니다.',
    'Common questions':
      '모듈 하나가 같은 규칙으로 현재 언어의 답을 만듭니다. 영어판은 검색용 JSON-LD로 페이지에도 들어갑니다.',
    'Guides and pages':
      'Vite 플러그인이 빌드할 때 안내 글마다 정적 HTML로 그리고, 숫자는 같은 규칙에서 가져옵니다. 사이트맵도 씁니다.',
    'Saved inputs and reset':
      '바꾼 입력은 JSON으로 localStorage에 들어갑니다. 초기화하면 지워지고 기본값이 돌아옵니다.',
    'Offline use':
      '빌드할 때 쓴 Service worker가 페이지와 파일을 캐시합니다. 페이지는 먼저 네트워크를 쓰고 3초 뒤에는 캐시 사본으로 넘어갑니다.',
    'Colour theme':
      '페이지 머리의 작은 스크립트가 처음 그리기 전에 저장한 테마를 입힙니다. 선택은 localStorage에 있습니다.',
    'Remove ads in the Android app':
      '페이지가 브리지로 Java 앱에 묻고, Google Play Billing이 상품을 팝니다. 앱은 광고 없는 상태를 돌려줍니다.',
    'Which lease term costs least':
      '함수 하나가 1년에서 5년까지 기간마다 비교를 돌립니다. 계좌를 5년째까지 이어 가서 기간마다 같은 햇수를 봅니다.',
    'If you leave your job':
      '모듈이 퇴사일의 정산액과, 계속할 때와 비교한 빠져나가는 방법별 비용을 계산합니다. 비교의 리스 수치를 그대로 씁니다.',
    Language: 'i18next와 react-i18next가 고른 카탈로그를 별도 파일로 불러옵니다. 금액은 호주 달러 그대로입니다.',
    Ads: 'AdSense가 웹사이트에 자동 광고를 넣습니다. 앱은 페이지에 표시를 달아 AdSense를 끄고, AdMob이 네이티브 배너를 보여 줍니다.',
    "No ads on the developer's phone":
      'Android 앱은 PC가 휴대폰에 한 번 보내는 개발자 키를 둡니다. 키가 있으면 어느 빌드든 배너를 숨깁니다.',
    'iPhone app':
      'Capacitor가 빌드한 사이트를 앱 안에서 제공해 오프라인에서도 열립니다. Swift 코드가 Android 앱과 같은 페이지 브리지에 답합니다.',
    'Remove ads on the iPhone':
      'StoreKit 2가 Google Play와 같은 상품 id를 팝니다. 구매 복원은 App Store에 지난 구매를 묻습니다.',
    'Share the result':
      '페이지가 링크를 붙인 결론 한 줄을 만듭니다. iPhone 앱은 iOS 공유 시트를 열고, 휴대폰 브라우저는 Web Share를 씁니다.',
  },
};

export default arch;

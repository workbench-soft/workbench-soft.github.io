import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'Sky Altar는 Android와 웹을 위한 Expo 앱 하나이며 자체 서버는 없습니다. 하늘은 Astronomy Engine과 앱 속 별 데이터에서 나오고 Skia가 그립니다.',
  parts: [
    {
      name: 'Expo와 React Native',
      role: 'Android 앱과 사이트를 하나의 코드로 만들고 이름은 휴대폰 글꼴로 보여 줍니다.',
    },
    { name: 'Skia', role: 'GPU에서 하늘을 프레임마다 한 장의 그림으로 그립니다.' },
    { name: 'Astronomy Engine', role: '해와 달, 행성의 위치를 내고 출생 차트를 계산합니다.' },
    { name: 'd3-celestial 데이터', role: '5.5등급까지의 별 2851개와 이름이 붙은 IAU 별자리 선.' },
    { name: 'expo-camera', role: '별을 맞춰 보려고 1.5초마다 소리 없이 사진을 찍습니다.' },
    { name: 'Media3 ExoPlayer', role: '정해진 음량으로 스피커에서 음악을 반복 재생하는 Kotlin 모듈.' },
    { name: 'Cloudflare R2', role: '유료 테마의 그림과 음악을 제공합니다.' },
    { name: 'Google Play Billing과 AdMob', role: '광고 제거와 Pro를 팔고 동의 후 광고를 보여 줍니다.' },
  ],
  flow: [
    '회전 센서나 손가락이 하늘의 방향을 돌립니다.',
    '1초마다 Astronomy Engine이 각 별을 지평 좌표로 바꿉니다.',
    '프레임마다 별과 별자리 선을 화면에 투영합니다.',
    'Skia가 그림과 선, 별을 한 장의 그림으로 기록합니다.',
    'React Native가 위에 이름을 쓰고 카메라 별이 그 위에서 빛납니다.',
  ],
  links: [
    { to: 'songfactory', text: '테마 음악은 Songfactory를 거쳐 Suno로 만들며 테마마다 스타일을 한 줄 씁니다.' },
    { to: 'tickalot', text: '업데이트 확인은 Tick-a-Lot의 것을 옮겨 왔습니다.' },
    { to: 'app-updater', text: 'WBS Updater가 공유 릴리스에서 같은 APK를 설치합니다.' },
    { to: 'Google Play', text: 'Google Play Billing이 광고 제거와 Pro를 판매합니다.' },
    { to: 'Open-Meteo', text: '출생 도시 검색은 입력한 이름만 보내고 장소와 시간대를 받습니다.' },
  ],
  design: {
    scale: [
      '설치 하나에 사용자 한 명이며, 계정도 자체 서버도 없습니다.',
      '하늘에는 별 2851개, 도형 89개, 문화 테마 19개가 있고 한 프레임에 약 3000개의 점을 그립니다.',
      '앱에는 무료 테마 2개만 들어 있고, 유료 그림은 한 장에 약 30 KB로 CDN에서 받습니다.',
    ],
    data: [
      '별, 도형, 이름은 앱 안의 JSON입니다. 이야기는 언어마다 .lore 파일 하나에 있습니다.',
      '설정과 저장한 출생 데이터는 localStorage에, 폰에서는 expo-sqlite에 있습니다.',
      '내려받은 그림과 곡은 폰의 앱 문서 폴더에 보관합니다.',
    ],
    interfaces: [
      'CDN의 manifest.json이 각 테마 그림을 내용 해시로 이름 붙인 파일에 연결합니다.',
      'expo-iap가 Google Play 상품 두 개를 읽습니다. 업데이트 확인은 공유 GitHub 릴리스 목록을 읽습니다.',
      'Open-Meteo 지오코딩은 입력한 도시 이름을 받아 장소와 시간대를 돌려줍니다.',
    ],
    reliability: [
      '한 번 받은 테마는 오프라인에서 동작하고, 무료 테마는 첫 실행부터 오프라인에서 동작합니다.',
      '다운로드에 실패한 그림은 1분 뒤에 다시 시도합니다.',
      '자이로가 화면을 움직이고 나침반은 회전하는 동안에만 보정하므로 하늘이 저절로 흐르지 않습니다.',
    ],
    security: [
      '로그인도 서버도 없습니다. 저장한 출생 데이터는 폰에만 남습니다.',
      'Open-Meteo에는 입력한 도시 이름만 갑니다. 카메라 사진은 폰에서 처리합니다.',
      'EEA, 영국, 스위스에서는 광고 전에 Google 동의 양식이 나옵니다. 서명 키는 저장소 밖에 둡니다.',
    ],
    performance: [
      '타입 배열로 된 지평선 캐시를 초당 한 번 다시 채우므로 프레임마다 별당 객체를 만들지 않습니다.',
      'Skia는 프레임마다 그림 하나를 기록해 뷰에 넘기고 React 렌더를 거치지 않습니다. 정지한 뷰는 초당 약 8번 다시 그립니다.',
      '그림 블러는 로드할 때 한 번만 하고, 해시가 붙은 파일 이름 덕에 CDN과 폰이 1년간 캐시합니다.',
    ],
    operations: [
      'main에 푸시할 때마다 Checks가 lint, 테스트, Android와 web 번들을 실행하고, Release가 옆에서 서명된 APK를 빌드합니다.',
      'Publish가 APK를 공유 릴리스 목록에 올리고, 목록은 앱마다 최근 3개 빌드를 남깁니다.',
      'mise run deploy가 새 그림, 곡, 매니페스트를 올리므로 다시 그린 그림에 앱 릴리스가 필요 없습니다.',
    ],
    tradeoffs: [
      'react-native-svg 대신 Skia를 골랐습니다. 프레임당 3000개 점에는 너무 느리기 때문이며, 대가로 web에서 7 MB CanvasKit 파일이 늘어납니다.',
      '이름은 Skia 단락 대신 React Native로 그려, 중국어, 일본어, 한국어가 폰의 글꼴을 쓰게 했습니다.',
      'Stellarium 별자리 문화 대신 d3-celestial 데이터를 골랐습니다. 앞의 것은 라이선스가 섞여 있고 일부는 GPL입니다.',
      'Swiss Ephemeris 대신 Astronomy Engine을 골랐습니다. 앞의 것은 AGPL이거나 유료이고 플랫폼마다 네이티브 빌드가 필요합니다.',
    ],
  },
  features: {
    'Sky view':
      '회전 센서가 방향을 움직이고 자이로가 나침반 보정 사이를 안정시킵니다. Skia가 앱 속 데이터로 별과 천체, 88개 별자리를 그립니다.',
    Clock:
      'React Native 레이어가 시각과 날짜를 테마 글꼴로 그립니다. 타이머는 매분 돌고 시계는 버튼과 함께 어두워집니다.',
    'Camera stars':
      '앱은 1.5초마다 소리 없이 사진을 찍고 JavaScript로 빛나는 점을 찾습니다. 별 목록과 맞는 점은 하늘 위에서 금빛으로 반짝입니다.',
    'Culture themes':
      '문화마다 하나의 기록이 색과 선 모양, 글꼴을 정합니다. 각 그림은 별자리의 별 3개에 고정되고 유료 테마는 Cloudflare R2에서 한 번 내려받습니다.',
    'Ambient music':
      'Media3 ExoPlayer를 쓰는 Kotlin 모듈이 내장되거나 CDN에서 온 곡을 페이드와 함께 반복합니다. 문서 선택기로 내 파일이나 폴더를 앱에 복사합니다.',
    'Ads and Remove ads':
      'AdMob은 테마 시트와 설정에 배너를 보이고 전체 화면 광고는 30분에 한 번까지입니다. 광고 제거는 Google Play Billing으로 판매합니다.',
    'Sky Altar Pro':
      'Google Play Billing이 Pro 상품을 팔고 확인 하나가 각 잠금을 정합니다. 웹 빌드에는 스토어가 없어 Pro 부분이 열려 있습니다.',
    'App languages': 'i18next가 화면용 카탈로그 9개를 둡니다. 별자리 이름과 전설 파일도 언어마다 있습니다.',
    'Updates from GitHub':
      '업데이트 확인이 공유 GitHub 릴리스를 읽고 APK를 내려받아 설치 프로그램에 넘깁니다. Google Play 빌드는 확인을 빈 대체 모듈로 바꿉니다.',
    Astrology:
      'Astronomy Engine이 출생 차트의 행성 위치를 내고 하우스는 홀 사인으로 나눕니다. Open-Meteo가 출생 도시를 찾고 저장한 출생 정보는 휴대폰에만 남습니다.',
    'Constellation navigation':
      '가상화 목록이 별자리를 걸러 내고 각 이름표 지점을 지금 하늘의 위치로 바꿉니다. 탭하면 450밀리초 동안 그곳으로 시야가 옮겨 갑니다.',
    'Constellation lore':
      '각 카드는 언어별 전설 파일에서 테마 문화의 이야기를 읽습니다. 별 정보는 ESA Gaia 기록 보관소의 Hipparcos 데이터에서 옵니다.',
    'Long lists':
      '스튜디오의 fast-scroll 패키지가 두 목록을 감싸고, 각 목록은 화면에 보이는 행만 그립니다. 손잡이는 시트의 차분한 색이나 테마의 라벨 색을 씁니다.',
  },
};

export default arch;

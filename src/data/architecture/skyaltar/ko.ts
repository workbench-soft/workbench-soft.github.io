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

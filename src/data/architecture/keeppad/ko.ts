import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'KeepPad은 Expo 앱 하나로 Android 앱, iPhone 앱, 웹사이트를 만듭니다. 메모는 휴대폰의 SQLite에 남고, Firebase에는 공유한 메모만 갑니다.',
  parts: [
    { name: 'Expo와 React Native', role: 'Android, iPhone, 웹사이트가 쓰는 하나의 코드. 화면은 expo-router입니다.' },
    {
      name: 'Kotlin 리스너 서비스',
      role: 'Android 포그라운드 서비스가 Hey Keep을 듣고 메모를 녹음하며 대답을 재생합니다.',
    },
    { name: 'sherpa-onnx', role: '휴대폰 안의 작은 키워드 모델이 호출 문구를 찾아냅니다.' },
    { name: '휴대폰 음성 인식', role: 'Android 음성 서비스와 Apple 인식기가 말을 글로 바꿉니다.' },
    { name: 'SQLite', role: '메모, 보낸 메모 기록, 처리한 받은 편지함 목록을 휴대폰에 둡니다.' },
    {
      name: 'Gemini Nano와 Apple Foundation Models',
      role: '앱이 열려 있는 동안 휴대폰 모델이 더 맞는 그룹을 고릅니다.',
    },
    { name: 'Firebase', role: 'Firestore가 공유 메모를 담고 Hosting이 웹사이트를 제공합니다.' },
    { name: 'Google Play', role: 'AdMob 광고, 그리고 광고 제거와 KeepPad Pro 구매.' },
  ],
  flow: [
    '앱이 닫혀 있어도 리스너 서비스가 "Hey Keep"을 듣습니다.',
    '메모를 녹음하고 휴대폰에서 말을 글로 바꿉니다.',
    '서비스가 메모를 작은 받은 편지함 파일에 씁니다.',
    '앱이 그것을 SQLite에 넣고 단어로 그룹을 고릅니다.',
    '휴대폰 모델이 메모를 옮길 수 있고, 목록이 다시 불러와집니다.',
  ],
  links: [
    {
      to: 'memories',
      text: '사람 이름으로 시작하는 메모는 WebDAV로 집 NAS에 있는 그 사람의 일기로 갑니다.',
    },
    {
      to: 'lumiere-player',
      text: 'Wake Share 덕분에 KeepPad 서비스가 "Hey Lumi"도 듣고 Lumiere에 넘깁니다.',
    },
    { to: 'spotthecam', text: '같은 공유 마이크가 "Hey Spot"을 SpotTheCam에 넘깁니다.' },
    { to: 'Firebase', text: 'Firestore가 공유 메모를 실시간으로 맞추고 Hosting이 웹사이트를 제공합니다.' },
    { to: 'Google Play', text: 'AdMob이 배너를 보이고 Play Billing이 광고 제거와 KeepPad Pro를 팝니다.' },
  ],
  features: {
    'Hey Keep':
      'Kotlin 포그라운드 서비스가 조용한 소리는 건너뛰고 큰 소리에만 sherpa-onnx 모델을 돌립니다. 대답은 목소리별로 녹음한 클립으로 나오고, 맞춤 설정이 문구별 기준값을 정합니다.',
    'Long recording':
      '서비스는 녹음하는 동안 소리를 임시 파일에 씁니다. 앱이 멈춘 뒤에는 그 파일을 메모로 만들고 소리에서 글을 뽑습니다.',
    'Stop and continue':
      '메모 중에는 키워드 모델과 인식기가 함께 "Stop"을 듣습니다. "continue" 뒤에는 서비스가 새 말과 소리를 가장 최근 메모에 잇습니다.',
    'Record by button':
      'expo-speech-recognition이 말하는 동안 단어를 화면에 보여 줍니다. 메모는 SQLite에 들어가고, 휴대폰이 허용하면 소리도 함께 남습니다.',
    Recordings: '앱이 직접 소리를 녹음해 인식기에 넘깁니다. WAV 파일은 메모 옆에 휴대폰에 남습니다.',
    Groups:
      '영어와 러시아어 어간 비교로 바로 그룹을 고릅니다. 앱이 열려 있으면 Gemini Nano나 Apple Foundation Models가 더 나은 그룹을 고를 수 있습니다.',
    Languages:
      '휴대폰 인식기가 영어와 러시아어를 알아듣고, 언어 팩이 있으면 오프라인으로 됩니다. i18next가 화면 문구를 9개 카탈로그로 담습니다.',
    'Share by link':
      '메모는 Firestore로 가고, 링크로 앱이나 브라우저에서 엽니다. 리스너가 두 사본을 실시간으로 맞추고, 더 최근 수정이 이깁니다.',
    'Send to other apps':
      '연결한 앱마다 자기 웹 API로 새 메모를 받습니다. Obsidian은 고른 폴더에 파일을 받고, 로그인 토큰은 보안 저장소에 둡니다.',
    Website:
      'Expo가 경로마다 정적 페이지를 내보내고 Firebase Hosting이 제공합니다. 공유 메모는 브라우저에서 Firestore로부터 불러옵니다.',
    'In-app update':
      'GitHub 빌드는 시작할 때와 돌아올 때 릴리스 목록을 읽습니다. APK를 내려받아 Android 설치 프로그램을 엽니다. Play 빌드에는 이 코드가 없습니다.',
    'Light and dark theme':
      '테마 모듈이 휴대폰 색상 설정이나 고정한 선택을 따릅니다. 선택은 다른 설정과 함께 휴대폰에 남습니다.',
    Ads: 'Google Mobile Ads 라이브러리가 홈 화면에 AdMob 배너를 보입니다. 유럽에서는 Google 동의 양식이 먼저 묻습니다.',
    'Remove ads':
      'expo-iap이 Google Play Billing으로 상품을 팝니다. 구매 복원이 같은 계정의 새 휴대폰에서 다시 찾아 줍니다.',
    'Loud sound from the phone speaker':
      '네이티브 모듈이 소리를 최대 음량으로 내장 스피커에 보냅니다. 증폭기가 6 dB를 더하고, 소리가 끝나면 음량을 되돌립니다.',
    'Notes about a person go to Memories':
      '앱이 메모의 첫 단어를 Memories의 이름과 맞춰 봅니다. 다듬고 날짜를 붙인 메모가 WebDAV로 그 일기에 들어갑니다.',
    'KeepPad Pro':
      'expo-iap이 Google Play로 Pro를 팔고, Pro 모듈이 잠긴 동작 전마다 확인합니다. 환불되면 다음 시작 때 Pro가 꺼집니다.',
    'Fast scroll':
      '스튜디오의 fast-scroll 패키지가 메모 목록을 감쌉니다. 목록은 매 프레임 손잡이를 따라가고, iOS와 웹은 자체 스크롤바를 씁니다.',
  },
};

export default arch;

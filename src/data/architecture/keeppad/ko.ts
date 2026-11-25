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
  design: {
    scale: [
      '설치 하나에 한 사람입니다. 메모는 기기에 남고, 공유 메모만 최대 20,000자의 텍스트로 Firestore에 닿습니다.',
      'Hey Keep은 Android 포그라운드 서비스로 하루 종일 돌아서 배터리가 설계를 이끌었습니다. 음량 게이트가 조용한 프레임을 건너뜁니다.',
    ],
    data: [
      'SQLite keeppad.db에는 메모, exports(어느 앱이 어느 메모를 받았는지), applied_inbox가 있습니다. PRAGMA user_version은 기기가 실행한 마이그레이션 단계를 셉니다.',
      '녹음은 files/audio의 WAV 파일입니다. 앱이 닫힌 동안 Hey Keep이 녹음한 메모는 files/keep-inbox의 JSON 파일입니다.',
      '설정은 localStorage에 있습니다. 연결된 앱의 토큰은 expo-secure-store를 통해 Android keystore나 iOS keychain에 있습니다.',
      'Firestore의 공유 메모에는 text, group, updated만 들어 있습니다.',
    ],
    interfaces: [
      'Kotlin 서비스는 SQLite에 닿지 못하므로, 서비스와 앱은 JSON 받은편지함과 watch 이벤트로 메모를 주고받습니다.',
      '연결된 앱은 새 메모를 각자의 웹 API로 받습니다. Obsidian은 고른 폴더의 파일로, Memories 일기는 WebDAV로 받습니다.',
      'expo-speech-recognition은 Android 음성 서비스나 Apple 인식기로 음성을 텍스트로 바꿉니다.',
    ],
    reliability: [
      '긴 녹음은 녹음하는 동안 PCM 파일과 JSON 파일을 쓰고, 충돌 뒤 앱이 그것을 메모로 만듭니다.',
      'applied_inbox가 메모와 같은 트랜잭션에서 받은편지함 id를 저장하므로, 충돌이 나도 이어쓰기 메모를 두 번 가져오지 않습니다.',
      '로컬 수정마다 updated = MAX(now, updated + 1)을 저장하므로, 시계가 느린 기기도 Firestore에서 여전히 이깁니다.',
    ],
    security: [
      '계정도 클라우드 음성 인식도 없습니다. 호출어 모델이 기기에서 돌아서 소리가 기기를 떠나지 않습니다.',
      'Firestore 규칙은 32자리 16진수 메모 id를 요구하고, 나열을 거부하며, text, group, updated만 받습니다. id를 훑어볼 수 없습니다.',
      '연결된 앱의 토큰은 메모 파일이 아니라 보안 저장소에 둡니다.',
    ],
    performance: [
      '조용한 방에서는 100 ms 프레임마다 덧셈 한 번이 듭니다. 파라미터 330만 개의 sherpa-onnx 모델은 큰 소리의 프레임에서만 돕니다.',
      '쓰기마다 notesVersion이 오르고 화면이 다시 불러옵니다. 메모 FlashList는 화면에 보이는 행만 그립니다.',
      '단어 일치가 그룹을 바로 고르고, Gemini Nano나 Apple Foundation Models는 앱이 열려 있을 때만 동작합니다.',
    ],
    operations: [
      'main에 push할 때마다 Checks와 Release가 함께 시작됩니다. Checks가 통과하면 APK를 공개하고 최근 릴리스 3개를 남깁니다.',
      'Play bundle은 앱이 바뀌었을 때 하루에 한 번 시드니 시간 19:00에 PLAY=1로 만듭니다. GitHub의 APK는 스스로 업데이트합니다.',
      '웹사이트는 Firebase Hosting이 제공하며 Checks가 통과하면 Firestore 규칙과 함께 배포됩니다. iPhone 빌드는 macOS에서 수동으로만 돕니다.',
    ],
    tradeoffs: [
      '네이티브 Android 앱 대신 Kotlin과 Swift 모듈이 있는 Expo를 택했습니다. iPhone과 웹을 위한 것이고, 대가는 TypeScript 옆의 네이티브 코드입니다.',
      'JavaScript 호출어 대신 sherpa-onnx 포그라운드 서비스를 택해 화면이 꺼져도 듣습니다. 모델은 영어만 됩니다.',
      'APK에 모델을 넣는 대신 기기 자체의 음성 인식기를 택했습니다. 기기에 영어와 러시아어가 이미 있어서 앱은 모델을 싣지 않습니다.',
      '빌드 하나 대신 스스로 업데이트하는 GitHub APK와 스텁이 든 Play 빌드로 나눕니다. Play는 업데이트를 직접 설치하는 앱을 거부하기 때문입니다.',
    ],
  },
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
    'Notes in the phone backup':
      'Android 자동 백업이 메모 데이터베이스와 설정을 Google 드라이브에 복사합니다. 앱 설정의 백업 규칙이 녹음과 로그인 토큰을 제외합니다.',
    'Crash reports':
      'React Native Firebase Crashlytics가 Kotlin 서비스까지 포함해 처리되지 않은 예외를 모두 잡습니다. 보고서에는 추적 정보, 휴대폰 모델, 버전이 담기고 메모 내용은 없습니다.',
  },
};

export default arch;

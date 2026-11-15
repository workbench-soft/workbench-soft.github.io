import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'Android, iPhone, 웹용 Expo 앱이 카드마다 기기의 SQLite에 저장합니다. 단어 베이스는 앱에 들어 있고, 기기를 연결하면 Firestore가 덱을 동기화합니다.',
  parts: [
    { name: 'Expo and React Native', role: 'Android, iPhone, 웹을 한 코드에서 만듭니다.' },
    { name: 'SQLite', role: '기기마다 카드, 답변, 아는 단어, 그림을 저장합니다.' },
    { name: 'ts-fsrs', role: '카드가 언제 돌아올지 정하는 FSRS 일정.' },
    { name: '단어 베이스', role: '앱 안의 영어와 러시아어 단어 JSON으로, 공개 단어 목록과 Wiktionary로 만듭니다.' },
    { name: 'Firestore', role: '동기화한 덱의 사본이며 연결 코드로 엽니다.' },
    { name: '대화 엔진', role: '본인 키의 Gemini, 휴대폰의 Qwen 3, 또는 Chrome 내장 모델.' },
    { name: '스피커 모듈', role: '휴대폰 스피커로 단어를 최대 음량으로 들려주는 로컬 Kotlin 모듈.' },
    { name: 'Google Play', role: 'AdMob 광고와 expo-iap를 통한 광고 제거, Pro 구매.' },
  ],
  flow: [
    '사용자가 단어를 입력하거나 묶음을 시작합니다.',
    '검색이 단어 베이스, 이어서 Wiktionary와 MyMemory를 봅니다.',
    '앱이 카드를 기기의 SQLite에 저장합니다.',
    'FSRS가 복습할 카드를 고르고 새 단어가 묶음을 채웁니다.',
    '카드에 단어, 그림, 소리가 나옵니다.',
  ],
  links: [
    { to: 'Firebase', text: 'Firestore가 연결한 덱의 사본을 익명 로그인 뒤에 둡니다.' },
    { to: 'Wiktionary and MyMemory', text: '베이스에 없는 단어는 여기서 번역을 받으며 키는 필요 없습니다.' },
    { to: 'Wikipedia', text: '단어 문서의 대표 사진과 Commons 출처 표시.' },
    { to: 'Google Gemini', text: '대화 연습과 주제 추측이 본인 키로 호출합니다.' },
    { to: 'Google Play', text: 'AdMob이 광고를 보여 주고 Play Billing이 광고 제거와 Pro를 팝니다.' },
  ],
  design: {
    scale: [
      '설치 하나에 학습자 한 사람이며, 모든 카드는 기기의 SQLite에 있습니다. 스튜디오 자체 서버는 돌지 않습니다.',
      '단어 베이스는 assets/words/en.json과 ru.json으로 앱에 들어 있고 CEFR-J, Octanove, Wiktionary, OpenRussian으로 만듭니다.',
      '한계는 무료 서비스가 정합니다. MyMemory는 기기당 하루 약 5,000단어, GitHub 릴리스 목록은 주소당 시간당 60회입니다.',
      '휴대폰의 대화 모델은 저장 공간 약 1.2 GB와 여유 메모리 2 GB를 씁니다.',
    ],
    data: [
      '카드, 복습, 아는 단어, 그림은 expo-sqlite를 통해 SQLite에 있으며 웹에서도 같습니다.',
      '카드는 FSRS 상태를 JSON으로 memory에 두고, due는 색인을 위해 별도 열로 복사합니다. (lang, term_key)는 유일합니다.',
      '삭제한 카드는 표시와 함께 남고, updated_at 덕분에 동기화에서 나중 수정이 이깁니다.',
      '설정은 localStorage에 있습니다. 그림은 각 기기에 남고 동기화하지 않습니다.',
    ],
    interfaces: [
      '동기화는 각 카드를 Firestore의 decks/{code}/cards/{lang}_{termKey}에 쓰고, firestore.rules가 코드 길이와 각 필드를 확인합니다.',
      '입력한 단어는 베이스로, 이어서 kaikki.org를 통해 Wiktionary로, 그다음 MyMemory API로 갑니다. Wikipedia가 대표 사진을 줍니다.',
      'Gemini는 사용자 본인의 키로 기기에서 호출하고, Qwen 3는 react-native-executorch로 휴대폰에서 돌아갑니다.',
      'modules/speaker/의 Kotlin 모듈이 음성을 파일로 만들고, 백그라운드 핸들러가 안드로이드 홈 화면 위젯을 그립니다.',
    ],
    reliability: [
      '각 기기는 자기 SQLite 파일로 혼자 동작하므로 앱은 오프라인에서 돌고, 동기화는 그 위의 선택 계층입니다.',
      '동기화에서는 단어의 나중 수정이 이기고, 삭제한 카드는 표시와 함께 남아 삭제도 동기화됩니다.',
      '조회는 베이스에서 Wiktionary로, 다시 MyMemory로 넘어갑니다. kaikki.org는 CORS 헤더를 보내지 않아 웹 빌드는 건너뜁니다.',
      '테스트된 순수 함수가 일주일치 로컬 알림을 계획하므로 앱을 열지 않는 사람도 7일 동안 하루 한 번 받습니다.',
    ],
    security: [
      'Firebase 익명 로그인으로 기기마다 사용자 한 명이 생기고, 무작위 80비트 페어링 코드로 계정 없이 덱을 공유합니다.',
      '코드를 가진 사람은 그 덱을 읽고 바꿀 수 있습니다. 복습, 설정, 아는 단어는 각 기기에 남습니다.',
      'Gemini는 사용자 본인의 키로 동작하며, 고른 엔진을 부르는 호출 외에는 어떤 메시지도 기기를 떠나지 않습니다.',
      '안드로이드 키스토어와 비밀번호는 CI 시크릿이고, 사본은 저장소 밖에 보관합니다.',
    ],
    performance: [
      '배치 쿼리는 cards_due 색인으로 복습할 카드를 읽은 뒤 하루 할당량까지 새 단어를 채웁니다.',
      'words/complete는 네트워크 없이 첫 글자로 베이스 단어를 제안하고, 베이스는 처음 쓸 때 로드합니다.',
      'expo-image가 그림을 디스크에 보관하고, 그림이 비어 있던 결과는 30일 뒤에 다시 물어봅니다.',
      '@expo/fingerprint가 맞으면 릴리스 빌드는 보관해 둔 android/ 폴더를 재사용하고 JS만 다시 빌드합니다.',
    ],
    operations: [
      '검사는 lint, 서식, 타입, knip, Vitest를 두 번 실행합니다. Android와 웹으로, 그다음 Platform.OS를 ios로 두고.',
      'main에 푸시하면 무거운 러너에서 APK를 빌드하고, 검사가 통과하면 release-gate.sh가 게시합니다. 검사가 실패하면 빌드를 취소합니다.',
      'PLAY_TRACK을 설정하면 매일 밤 시드니 시간 19:00 실행이 번들을 Google Play에 올리며, 앱이 바뀐 경우에만 합니다.',
      'GitHub APK는 릴리스 목록에서 더 새로운 memoire-v* 태그를 확인합니다. Play와 iOS 빌드에는 이 코드가 없습니다.',
    ],
    tradeoffs: [
      '네이티브 Kotlin 앱 대신 Expo와 React Native를 써서 코드 하나로 Android, iOS, 웹을 빌드하지만, 일부는 휴대폰 전용입니다.',
      'Firestore만 저장소로 쓰는 대신 기기의 SQLite를 써서 앱이 오프라인에서 돌고 바로 열리며, 동기화는 선택으로 남습니다.',
      'Google 로그인 대신 페어링 코드를 써서 계정 없이 기기를 묶지만, 코드를 아는 사람은 누구나 덱을 편집할 수 있습니다.',
      '필드마다 열을 두는 대신 FSRS 상태를 JSON 열 하나에 두어 ts-fsrs가 바뀌어도 스키마를 바꿀 필요가 없지만, JSON 안은 질의할 수 없습니다.',
    ],
  },
  features: {
    'Word batches':
      '묶음 모듈이 SQLite에서 복습할 카드를 꺼내고, 이어서 하루 한도까지 베이스의 새 단어를 넣습니다. ts-fsrs가 카드가 돌아올 때를 정합니다.',
    'Ways to ask':
      '카드마다 목표에서 고른 기술에 따라 묻는 방식을 정합니다. 듣기는 휴대폰 자체 음성으로 단어를 읽습니다.',
    'Add a word':
      '검색은 내장 베이스, Wiktionary, MyMemory 순으로 시도합니다. 추천 단어는 네트워크 없이 베이스에서 나옵니다.',
    Pictures:
      '앱이 배우는 언어의 Wikipedia API에 문서 사진을 묻고, 자유 라이선스만 씁니다. expo-image가 기기에 보관하며 동기화에는 빠집니다.',
    'Built in words':
      '빌드 스크립트가 CEFR-J, Octanove, Wiktionary, OpenRussian을 JSON 파일 2개로 합칩니다. 앱은 처음 쓸 때 불러옵니다.',
    'Level test':
      '테스트는 레벨마다 베이스 단어와 지어낸 단어를 섞습니다. 추측을 뺀 레벨별 점수로 새 단어의 출처를 정합니다.',
    Topics: '베이스 단어는 저마다 주제를 가집니다. 입력한 단어는 Wiktionary, Gemini, Chrome 모델에서 주제를 받습니다.',
    Reminders:
      '휴대폰의 플래너가 expo-notifications로 일주일치 로컬 알림을 겁니다. 앱을 열거나 닫을 때마다 다시 짭니다.',
    'My words': '목록은 기기의 SQLite에서 카드를 읽습니다. 삭제는 카드에 표시만 해서 동기화가 전할 수 있습니다.',
    'Look and language':
      'i18next가 9개 언어 카탈로그를 맡고, 테마는 휴대폰이나 설정을 따릅니다. 두 선택은 기기에 남습니다.',
    'Talk practice':
      '장면 지시는 본인 키의 Gemini, 휴대폰의 Qwen 3, Chrome 모델 중 하나로 갑니다. 답의 단어를 누르면 카드로 저장됩니다.',
    'Sync between devices':
      '기기마다 Firebase에 익명으로 로그인하고 바뀐 카드를 코드의 덱으로 보냅니다. 같은 단어는 나중 수정이 이깁니다.',
    'Home screen widget':
      'react-native-android-widget이 백그라운드에서 SQLite를 읽어 그립니다. 30분마다, 그리고 앱이 뒤로 갈 때 새로 고칩니다.',
    'Ads and Remove ads':
      'AdMob이 동의 양식 뒤에 배너와 전면 광고를 보여 줍니다. 광고 제거는 Google Play Billing이 expo-iap로 팝니다.',
    Sound:
      '로컬 Kotlin 모듈이 단어를 파일로 만들어 스피커로 최대 음량으로 들려줍니다. iOS와 웹은 시스템 출력을 씁니다.',
    'Memoire Pro': 'Google Play Billing이 expo-iap로 Pro를 팝니다. 검사 하나가 구매를 읽고 잠긴 항목을 엽니다.',
    Updates:
      'GitHub APK는 공개 릴리스 목록을 읽고 Android 설치 프로그램을 엽니다. Play 빌드와 iPhone 빌드에는 이 모듈이 없습니다.',
  },
};

export default arch;

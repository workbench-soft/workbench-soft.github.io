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

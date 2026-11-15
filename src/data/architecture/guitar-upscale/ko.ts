import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'Next.js 앱이 브라우저와 Cloudflare Workers에서 돌아갑니다. Capacitor가 같은 빌드를 Android 앱과 iPhone 앱에 담고, 사운드 엔진은 기기에서 돌아갑니다.',
  parts: [
    { name: 'Next.js와 React', role: '각 기능을 담은 한 페이지로, 서버가 한 번 렌더링한 뒤 브라우저에서 실행됩니다.' },
    { name: '사운드 엔진', role: 'React 밖에서 도는 플레이어와 녹음기로, RxJS 이벤트 버스로 이어집니다.' },
    { name: 'Web Workers', role: '박자 시계와 운지 탐색과 코드 인식을 메인 스레드 밖에서 처리합니다.' },
    { name: 'smplr와 Web Audio', role: '리버브와 딜레이 버스를 갖춘 General MIDI 샘플 악기입니다.' },
    { name: 'Redux Toolkit', role: '설정과 화면 상태를 브라우저에 저장합니다.' },
    { name: 'Konva', role: '지판과 피아노 롤과 탭 악보를 그리는 캔버스입니다.' },
    { name: 'Capacitor', role: '정적 빌드를 네이티브 플러그인과 함께 Android 앱과 iPhone 앱에 담습니다.' },
    {
      name: 'Cloudflare Workers와 KV',
      role: 'OpenNext로 서버 빌드를 호스팅하고 곡 사이트를 중계하며 기본 곡을 보관합니다.',
    },
  ],
  flow: [
    '탭이나 코드나 불러온 곡이 이벤트 버스에 음을 올립니다.',
    'Web Worker의 시계가 재생과 스트럼과 루퍼를 박자에 맞춥니다.',
    'smplr 라이브러리가 각 음을 리버브와 딜레이에 통과시켜 냅니다.',
    '녹음기가 피아노 롤과 MIDI를 위해 각 음을 tick 단위로 기록합니다.',
    '외부 사이트의 곡과 가사는 Cloudflare의 Worker를 거쳐 들어옵니다.',
  ],
  links: [
    { to: 'lumiere-player', text: 'Lumiere Player는 재생 중인 곡을 링크로 Guitar Upscale에서 엽니다.' },
    { to: 'keeppad', text: 'Hey Guitar 호출어는 KeepPad와 같은 sherpa-onnx 키워드 모델을 씁니다.' },
    { to: 'Songsterr', text: 'Songsterr 탭은 Worker 중계를 거쳐 Guitar Pro 파일이 됩니다.' },
    { to: 'Google Play', text: 'Google Play가 Pro와 Remove ads를 팔고 AdMob이 광고를 보여 줍니다.' },
    { to: 'Cloudflare', text: 'Cloudflare Workers가 사이트를 호스팅하고 KV가 기본 곡을 보관합니다.' },
  ],
  design: {
    scale: [
      '기기 하나에 연주자 한 명이며, 소리, 클록, 녹음기가 모두 기기에서 돌아갑니다.',
      '내장곡 약 100곡은 Guitar Pro 파일로 들어 있고, 사용자의 곡은 브라우저에 남습니다.',
      '무거운 작업에는 엄격한 한도가 있습니다. 코드 인식 한 번에 wasm 메모리가 약 600 MB까지 커질 수 있고, Worker 업로드는 3 MiB 아래로 유지됩니다.',
    ],
    data: [
      '설정, 화면 상태, 피아노 롤의 Redux 슬라이스는 localStorage에 저장되며 슬라이스마다 키 하나입니다.',
      '곡, 녹음, 루프, 피아노 롤 편집은 하나의 TickTimeline을 공유하고, 음과 코드는 클록 틱으로 정리됩니다.',
      '내장곡은 Cloudflare KV에 파일 이름으로 들어 있고, song-settings.json 하나가 곡마다 코드 선택을 담습니다.',
    ],
    interfaces: [
      '곡 사이트는 Worker 경로를 거칩니다. Songsterr 검색과 메타, 곡 파일 검색과 다운로드, 가사가 있습니다.',
      '음과 코드는 RxJS 서브젝트 두 개로 흘러서, 보내는 쪽은 누가 재생, 녹음, 애니메이션하는지 모릅니다.',
      '곡은 .gp나 MIDI 파일로 불러오고 같은 형식으로 내보냅니다. 내장 목록은 songs/index.json이고, 곡마다 songs-json/<name>.json이며 주소에 내용 해시가 들어갑니다.',
    ],
    reliability: [
      '사이트 프록시마다 타임아웃이 있습니다. 사이트가 죽어서 실패한 가사 검색은 캐시에 들어가지 않습니다.',
      'redux-persist 버전을 올리면 옛 버전으로 저장된 슬라이스가 지워지고, 루퍼는 스케일, 튜닝, 카포 변경이 루프를 지우기 전에 저장합니다.',
      '멜로디는 10 ms 넘게 기다린 틱을 최대 8번 연속으로 건너뛰므로, Play 뒤 렌더링이 느려도 첫 음이 늦지 않습니다.',
    ],
    security: [
      '소유자 경로는 개발자 키의 SHA-256을 확인하고 맞지 않으면 404로 답합니다. 배포용 GitHub 토큰은 Worker 시크릿에 있습니다.',
      'CORS는 Capacitor 출처와 사이트만 프록시를 읽게 하고, 서버 빌드는 HSTS, nosniff, frame-ancestors none을 보냅니다.',
      '오디오 파일의 코드는 ONNX로 기기에서 인식합니다. 곡 이름을 알아내려고 짧은 샘플을 Shazam에 보내는 것은 GitHub용 APK뿐입니다.',
    ],
    performance: [
      '비트 클록은 Web Worker에서 돌고 시작부터의 정확한 시각을 겨냥한 타이머를 쓰므로, 메인 스레드가 바빠도 박자가 느려지지 않습니다.',
      '최대 4개 워커 풀이 코드 운지를 한 번에 한 종류씩 찾고, 앱의 각 기능은 지연 로딩 컴포넌트로 불러옵니다.',
      '코드 모델은 처음 쓸 때 불러오고 Cache Storage에 남습니다. 리버브가 4에서 8 ms에서는 지직거려서 폰의 오디오 컨텍스트는 12 ms 버퍼를 요청합니다.',
    ],
    operations: [
      'main에 푸시할 때마다 검사와 Android 빌드가 나란히 돌고, 검사가 실패하면 실행이 취소됩니다. 둘 다 통과하면 릴리스가 나옵니다.',
      '시드니 시간 19:00의 야간 작업은 앱이 바뀐 경우에만 Google Play 번들을 만듭니다. 번들 하나가 무거운 러너에서 40에서 46분 걸렸습니다.',
      'OpenNext가 Cloudflare Workers용 서버를 빌드하고 관측성을 켭니다. 릴리스에는 날짜와 카운터 태그가 붙고, GitHub 빌드는 그것으로 스스로 업데이트합니다.',
    ],
    tradeoffs: [
      '네이티브 앱 대신 사이트, Android, iPhone이 정적 빌드 하나를 쓰게 해 각 기능을 한 번만 쓰고, 대신 폰 소리와 결제에 Capacitor 플러그인이 필요합니다.',
      '어디서나 스토어를 읽는 대신 엔진은 React 밖에서 설정의 단순한 복사본을 써서 오디오 코드에 훅이 필요 없게 했고, 대신 복사본을 맞춰 줘야 합니다.',
      '서버 API 대신 기기에서 코드 모델을 돌려 파일이 폰을 떠나지 않게 했고, 대신 처음 실행 때 14 MB 모델을 받습니다.',
      '신시사이저 대신 샘플링한 General MIDI 악기를 써서 진짜 기타와 피아노 소리를 내고, 대신 첫 탭에서 샘플을 불러옵니다.',
    ],
  },
  features: {
    Fretboard:
      'Konva가 설정의 스케일과 튜닝으로 캔버스에 지판을 그립니다. 탭하면 음이 이벤트 버스로 가고 smplr가 소리를 냅니다.',
    'Scale, tuning and capo':
      '스케일과 튜닝은 앱 안의 고정 데이터입니다. 고르면 Redux에 들어가고 지판과 운지가 새로 만들어집니다.',
    Tuner:
      'pitchy 라이브러리가 브라우저 안에서 마이크의 음높이를 읽습니다. 앱은 개방현으로 튜닝을 추측하고 Konva가 다이얼을 그립니다.',
    Chords: '최대 4개의 Web Worker가 지판과 카포에 맞는 운지를 찾습니다. 패널은 코드 종류 하나씩 채워집니다.',
    Strumming: '누른 코드 버튼이 Worker 시계에 맞춰 고른 패턴을 칩니다. 직접 만든 패턴은 브라우저에 남습니다.',
    'Song list':
      '기본 곡은 Cloudflare KV의 Guitar Pro 파일이며 빌드 때 JSON이 됩니다. 내 곡은 브라우저에 남고 목록은 곡마다 스케일을 표시합니다.',
    'Voice search':
      '브라우저에서는 Speech API가 말을 듣고 Android 앱은 휴대폰의 음성 서비스를 씁니다. 그다음 앱은 목록의 곡을 틀거나 곡 사이트를 검색합니다.',
    'Hey Guitar':
      'Android에서는 KeepPad의 sherpa-onnx 키워드 모델이 오프라인으로 호출어를 듣습니다. 브라우저에서는 페이지가 열려 있는 동안 브라우저 음성 서비스가 듣습니다.',
    'MIDI recording':
      '녹음기가 이벤트 버스를 듣고 각 음을 시계 tick 단위로 기록합니다. 앱이 직접 낸 음에는 표시가 있어 테이크에서 빠집니다.',
    Looper:
      '최대 8개 채널이 Worker 시계에 맞춰 이벤트 버스에서 녹음합니다. 루프는 마디 단위로 맞춰지고 박자에 맞게 재생됩니다.',
    Quantize: '설정의 길이 하나가 피아노 롤의 그리드를 정합니다. 녹음기는 들어오는 음을 바로 그 그리드에 놓습니다.',
    'Piano roll':
      '피아노 롤은 공유 음 타임라인을 그 자리에서 고치고 트랙마다 되돌리기를 지원합니다. Konva가 음을 그리고 파일에 구간 표시가 없으면 worker가 곡 구성을 추측합니다.',
    'Tab view':
      '레이아웃 모듈이 한 트랙의 음을 줄 위의 프렛으로 바꿉니다. Konva가 마디를 그리고 공유 재생 위치를 따라갑니다.',
    'Chord sheet':
      '코드와 가사 사이트는 브라우저 요청을 막기 때문에 Worker가 가사를 가져옵니다. 앱은 그 코드를 곡의 조로 옮기고 각 줄을 곡의 시간에 맞춥니다.',
    'Song upload':
      '리더가 Guitar Pro와 MIDI 파일을 브라우저에서 음으로 바꿉니다. 오디오 파일은 이름으로 곡 사이트를 찾거나 ONNX 모델이 기기에서 코드를 알아듣습니다.',
    'Find a song online':
      'Cloudflare의 Worker가 브라우저 요청을 막는 4개의 곡 사이트로 검색을 전달합니다. 앱은 Songsterr 곡을 Guitar Pro 파일로 바꿉니다.',
    'Chord and scale detection':
      'Web Worker의 코드 판별기가 누른 음을 운지와 비교합니다. 스케일 판별기는 메인 스레드에서 돌며 스케일을 제안합니다.',
    'Instruments and sound':
      'smplr 라이브러리가 무료 샘플 세트의 General MIDI 음색을 첫 탭에 불러와 연주합니다. 멜로디와 코드는 각자 악기를 가집니다.',
    Effects:
      '각 악기는 컨볼루션 리버브와 피드백 딜레이가 있는 Web Audio 버스로 들어갑니다. 슬라이더는 악기를 다시 불러오지 않고 버스를 바로 바꿉니다.',
    'MIDI export':
      'midi-writer-js 라이브러리가 불러온 음을 MIDI 파일로 씁니다. Guitar Pro 작성기가 같은 음을 Guitar Pro 파일로 저장합니다.',
    'Guitar Upscale Pro':
      '각 빌드에는 각 기능이 들어 있습니다. Android 앱은 휴대폰의 Google Play Billing이 구매를 알릴 때까지 Pro 기능을 숨깁니다.',
    'Install and offline':
      'Service worker가 페이지와 코드와 곡을 오프라인용으로 캐시합니다. Android 앱은 정적 빌드와 소리를 APK 안에 담습니다.',
    'iPhone app':
      'Capacitor가 같은 정적 빌드를 Swift 플러그인이 있는 iOS 프로젝트에 담습니다. StoreKit이 구매를 맡고 AdMob은 추적 허용 요청 뒤에 광고를 보여 줍니다.',
    'Screen layout':
      'React 컴포넌트가 전체 화면 지판 캔버스 위에 떠 있습니다. 설정 하나로 코드를 왼쪽이나 오른쪽에 둡니다.',
    'Play panel':
      '플레이어가 Worker 시계에 맞춰 음 타임라인을 따라가며 각 음을 버스로 보냅니다. 코드 패널은 운지 탐색 worker에게서 운지를 받습니다.',
    'Easy and Pro mode':
      'Easy가 켜져 있으면 플레이어의 필터가 코드 이벤트만 남깁니다. 코드가 없는 곡은 처음부터 끝까지 재생됩니다.',
    'Song links':
      '메뉴가 곡 이름으로 사이트마다 검색 주소를 만듭니다. 사이트는 새 탭이나 Android 브라우저에서 열립니다.',
    'Built-in songs admin':
      '관리 페이지와 소유자의 휴대폰이 곡을 Cloudflare KV에 씁니다. 휴대폰용 경로는 개발자 키를 확인하고 GitHub Actions로 배포를 시작합니다.',
    Settings:
      'Redux Toolkit이 각 설정을 들고 redux-persist가 브라우저에 저장합니다. 엔진은 React 밖에서 단순한 사본을 읽습니다.',
    'Android updates':
      'GitHub 빌드는 시작할 때와 돌아올 때 GitHub Releases에 새 APK를 묻습니다. 네이티브 플러그인이 내려받아 설치 화면을 엽니다.',
    Ads: 'AdMob이 앱에 배너와 전면 광고를 보여 줍니다. Google Play의 Remove ads 구매나 휴대폰의 개발자 키가 광고를 끕니다.',
    Languages:
      'i18next가 앱 문구를 10개 카탈로그에 담고 휴대폰이나 브라우저 언어를 따릅니다. 강좌 페이지는 언어마다 자기 경로에 만들어집니다.',
  },
};

export default arch;

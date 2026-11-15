import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'Farnear는 React 웹 앱 하나를 Android에서는 Kotlin으로, iPhone에서는 Capacitor로 감쌉니다. Cloudflare의 Rust Worker가 방의 봉인된 메시지를 전하고, 통화 자체는 기기끼리 바로 이어집니다.',
  parts: [
    { name: 'React와 Vite', role: '화면, 방 페이지, 9개 언어로 미리 렌더링한 홈페이지.' },
    { name: 'WebRTC', role: '소리, 영상, 보드 데이터 채널을 최대 4대의 기기 사이에서 바로 주고받습니다.' },
    {
      name: 'Rust Worker와 Durable Object',
      role: '방마다 객체 하나가 봉인된 메시지를 전하고 릴레이 설정을 나눠 줍니다.',
    },
    { name: 'TURN 릴레이', role: '두 네트워크 사이의 직접 경로가 막히면 암호화된 미디어를 나릅니다.' },
    { name: '보드 모듈', role: '순수 TypeScript가 선, 지운 선, 파일 전송을 React 밖에서 다룹니다.' },
    { name: 'Whisper와 MediaPipe', role: '음성의 글 변환과 영상 배경을 둘 다 기기에서 처리합니다.' },
    { name: 'Kotlin 래퍼', role: '실제 사이트를 감싼 Android 앱으로, AdMob, Play Billing, 전화 알림을 갖습니다.' },
    { name: 'Capacitor와 Swift', role: '같은 사이트를 감싼 iPhone 앱으로, StoreKit과 공유 시트를 갖습니다.' },
  ],
  flow: [
    '방 링크에 열쇠가 들어 있고, 페이지는 그 열쇠로 열립니다.',
    '페이지가 WebSocket으로 Worker의 방에 들어갑니다.',
    '기기들이 Worker를 거쳐 봉인된 연결 제안과 네트워크 경로를 주고받습니다.',
    'WebRTC가 기기를 바로, 또는 릴레이를 거쳐 잇습니다.',
    '영상, 소리, 보드의 선, 파일이 기기 사이를 오갑니다.',
  ],
  links: [
    { to: 'Cloudflare', text: 'Worker, Durable Object, TURN 릴레이 하나가 무료 요금제에서 돌아갑니다.' },
    { to: 'consdr', text: 'Android 래퍼는 Consdr의 AdMob과 Play Billing 코드를 Kotlin으로 옮긴 것입니다.' },
    { to: 'Google Play', text: 'Play Billing이 광고 제거와 Farnear Pro를 팔고, AdMob이 Android 광고를 보입니다.' },
    { to: 'app-updater', text: 'WBS Updater가 설치된 버전을 GitHub의 최신 릴리스와 비교합니다.' },
    { to: 'Hugging Face', text: '기록 담당 기기가 여기서 Whisper 가중치를 한 번 내려받습니다.' },
  ],
  design: {
    scale: [
      '통화 하나는 최대 4대를 메시로 잇고, 각 기기가 자기 영상을 나머지 3대에 보냅니다.',
      '방 객체는 소켓 6개, 메시지당 64 KB, 초당 20개까지만 받아서 폭주가 한 방 안에 머뭅니다.',
      'Worker, Durable Object, 릴레이는 무료 요금제에서 돌아갑니다. 그곳을 지나는 것은 작은 봉인 메시지뿐이기 때문입니다.',
    ],
    data: [
      '계정 데이터베이스는 없습니다. 이름, 언어, 저장한 방, 푸시 키는 버전이 붙은 접두사로 localStorage에 둡니다.',
      '각 방의 전사와 문자 메시지는 각 기기의 IndexedDB에 있습니다.',
      'Durable Object는 릴레이 한도와 90분 동안 캐시한 릴레이 응답만 보관합니다. KV는 연결 보고서를 14일간 둡니다.',
    ],
    interfaces: [
      '시그널링은 방 객체로 가는 WebSocket입니다. 각 메시지는 버전, id, 순번이 붙은 AES-GCM 봉투입니다.',
      '기기 쌍마다 3개의 협상된 데이터 채널을 엽니다. 실시간 점, 제어 메시지, 파일 조각입니다.',
    ],
    reliability: [
      '3초 끊기면 peer id가 낮은 쪽이 ICE 재시작 offer를 보내며, 기다리는 시간은 12초, 18초, 25초입니다.',
      '상태 점검이 3초마다 각 트랙을 읽습니다. 15초 멈추면 ICE 복구를 시작하고 이어서 그 쌍을 다시 만듭니다.',
      '봉투 id는 사본을, 순번은 재전송을, offer id는 낡은 응답을 버립니다.',
    ],
    security: [
      '방 키는 링크의 # 뒤에 있어서 Worker는 암호문만 보고 이름, 제목, offer는 보지 못합니다.',
      '미디어는 기기 사이에서 DTLS-SRTP로 오가고, TURN 릴레이는 암호화된 패킷만 나릅니다.',
      '방 페이지는 광고 스크립트를 불러오지 않고 noindex를 달아서, 키 옆에서 제3자 코드가 돌지 않습니다.',
    ],
    performance: [
      '캔버스와 WebRTC 호출은 일반 모듈에서 돌고, React는 useSyncExternalStore로 작은 스토어를 읽습니다.',
      'Worker는 릴레이 설정을 방마다 90분 캐시하고, 상위 서비스에는 방당 하루 20번까지만 요청합니다.',
      'Whisper는 WebGPU가 있으면 거기서, 없으면 WebAssembly의 작은 모델로 돕니다. 큰 파일은 채널이 비기를 기다립니다.',
    ],
    operations: [
      'main에 push할 때마다 Checks가 lint, 테스트, 빌드를 돌리고, 사이트는 GitHub Pages로, Worker는 wrangler로 배포됩니다.',
      'APK는 android/가 바뀔 때만 빌드합니다. 앱이 라이브 사이트를 불러오기 때문입니다. 웹 변경은 태그만 받고 무거운 러너를 쓰지 않습니다.',
      '시드니 시간 19:00 야간 실행은 android/가 바뀌었으면 Play 번들을 빌드합니다. Checks가 실패하면 빌드를 취소합니다.',
    ],
    tradeoffs: [
      '미디어 서버 대신 직접 연결 메시를 골라서 영상을 호스팅하지 않고 비용도 없습니다. 업로드는 사람 수만큼 늘어서 통화는 4명까지입니다.',
      '네이티브 화면 대신 라이브 사이트를 감싸는 방식을 골라서 웹 수정이 스토어 심사 없이 나갑니다. 앱은 네트워크가 필요합니다.',
      '클라우드 음성 인식 대신 브라우저의 Whisper를 골라서 소리가 기기에 남습니다. 처음 쓸 때 모델 가중치를 내려받습니다.',
    ],
  },
  features: {
    'Calls through a link':
      '링크 끝에 방 열쇠가 있어서 Worker는 봉인된 메시지만 봅니다. 그다음 WebRTC가 최대 4대의 기기를 그물처럼 잇습니다.',
    'Recover a dropped call':
      '끊기면 한쪽이 ICE 재시작 제안을 최대 3번 보냅니다. 상대마다 대기열이 있어 오래된 응답이 이기지 못합니다.',
    'Return to a call':
      '브라우저가 열린 통화를 30분 동안 기억해서 링크가 스스로 다시 들어갑니다. 방마다 Web Lock이 있어 새 탭이 통화를 넘겨받습니다.',
    'Relay for blocked networks':
      'Worker가 소켓으로 브라우저마다 짧게 쓰는 TURN 설정을 줍니다. ICE는 먼저 직접 경로를 시도하고 안 되면 릴레이로 넘어갑니다.',
    'Share the call link':
      '초대 패널이 앱 언어로 Gmail, WhatsApp, Telegram용 초안을 만듭니다. 다른 앱은 시스템 공유 시트를 엽니다.',
    'Saved rooms':
      '방 링크는 이름과 함께 브라우저 저장소에 있고, 목록을 가진 서버는 없습니다. 같은 열쇠가 매번 같은 방을 엽니다.',
    Board:
      '순수 모듈이 선과 지운 선을 2개의 집합으로 갖고 WebRTC 데이터 채널로 보냅니다. 캔버스가 React 밖에서 그립니다.',
    'Share an image or video':
      '파일은 전용 데이터 채널로 나뉘어 사람마다 갑니다. 공유한 사람의 재생, 일시 정지, 이동은 제어 채널로 갑니다.',
    'Lessons (planned)':
      '사양은 수업 전에 슬라이드를 기기마다 보내고 슬라이드마다 보드 도구를 쓰는 계획입니다. 앱에는 아직 수업 코드가 없습니다.',
    'Contacts and ringing':
      '전화 알림은 상대 기기용으로 봉인한 웹 푸시이며 Worker를 거쳐 갑니다. Android 앱은 Firebase 없이 Google Play 서비스로 받습니다.',
    'Ads and remove ads':
      'AdMob이 Android 배너와 통화 뒤 광고를 보입니다. Play Billing이 광고 제거를 팔고, 방 페이지는 광고 스크립트를 불러오지 않습니다.',
    'Farnear Pro':
      'Play Billing이 Android 앱에서 Pro를 팔고, 브라우저는 도구를 무료로 씁니다. Pro가 있는 기기는 봉인된 인사에 그 사실을 알리고, 방은 보드를 엽니다.',
    'Android app':
      'Kotlin WebView 래퍼가 실제 사이트를 불러오고 카메라와 마이크를 넘깁니다. CI가 APK마다 서명해 공개 GitHub 릴리스에 올립니다.',
    'iPhone app':
      'Capacitor가 실제 사이트를 불러오고, Kotlin 부품에 맞춘 Swift 부품이 StoreKit, AdMob, 공유 시트를 더합니다. 코드는 첫 빌드를 기다립니다.',
    Languages: 'i18next가 9개 카탈로그를 갖고, 고르면 화면마다 바로 바뀝니다. 고른 언어는 기기에 남습니다.',
    'App icon':
      '파비콘, 웹 아이콘, Android 런처 크기들은 SVG 하나에서 나옵니다. Android는 적응형 아이콘과 테마 아이콘도 받습니다.',
    'Call stage':
      '무대 모듈이 고정과 화면 공유를 보고 큰 타일과 띠를 고릅니다. 말하는 사람 링을 위해 기기마다 스스로 목소리를 잽니다.',
    'Share a screen':
      '연결마다 처음부터 빈 영상 자리를 두어서 화면 공유에 새 제안이 필요 없습니다. 보드는 그 위에 그립니다.',
    'Take a photo':
      'modern-screenshot이 보이는 통화를 영상과 보드까지 PNG로 담습니다. Android 앱은 다운로드에 저장하고, 서버로는 보내지 않습니다.',
    'Your name':
      '이름은 브라우저에 남고 봉인된 인사 메시지로 다른 사람에게 갑니다. 바꾼 이름은 다음 통화부터 보입니다.',
    'Video background':
      'MediaPipe가 기기에서 사람을 찾고, 캔버스가 흐림이나 그림 위에 그립니다. 그 캔버스 트랙이 나가기 전에 카메라를 대신합니다.',
    'Call transcript and summary':
      '기기 한 대가 브라우저에서 Whisper를 돌리고, 되면 WebGPU를 씁니다. 줄은 데이터 채널로 다른 사람에게 가서 IndexedDB에 남습니다. 요약은 Chrome 내장 요약 기능이 씁니다.',
    'Recover stalled media':
      '상태 점검이 3초마다 트랙별로 들어온 바이트와 프레임을 읽습니다. 15초 멈추면 ICE를 고치고, 그다음 그 쌍을 다시 만듭니다.',
    'Shared call titles':
      '제목은 버전 번호와 함께 봉인된 신호로 갑니다. 기기마다 가장 새 버전이 이기고, Worker는 제목을 읽을 수 없습니다.',
    'Shared documents on the board':
      'PDF.js가 PDF 페이지를, PowerPoint 렌더러가 슬라이드를 기기에서 그립니다. 페이지 넘기기와 제거는 제어 채널로 갑니다.',
    'Contacts and rooms':
      '연락처와 방은 브라우저의 저장 목록 하나를 함께 쓰고, 항목마다 종류가 있습니다. 연락처 이름은 기기에 남고 방 제목은 동기화됩니다.',
    'Search and share preview':
      'Vite 플러그인이 빌드할 때 홈페이지를 9개 언어로 각각 미리 렌더링합니다. 다른 플러그인이 사이트맵을 쓰고, 페이지마다 미리보기 태그가 붙습니다.',
    'Messages in a call':
      '한 줄씩 봉인해 방 신호로 보내며 영상 경로와는 따로 갑니다. 기기마다 IndexedDB에 남기고 다음 통화에서 빠진 줄을 주고받습니다.',
    'Button hints':
      '공유 모듈 하나가 마우스를 올리거나 길게 누르면 말풍선을 보입니다. 길게 누르면 이름만 보이고 버튼은 눌리지 않습니다.',
    'Close Farnear and take back its permissions':
      '페이지가 통화와 전화 알림을 끝내고 Android 래퍼에 권한을 돌려주고 닫으라고 요청합니다. 브라우저에는 손으로 초기화하는 단계가 나옵니다.',
  },
};

export default arch;

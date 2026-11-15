import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'Astro가 정적 페이지를 만들고 Preact 앱이 브라우저에서 방을 운영합니다. Cloudflare Worker 하나가 페이지를 내주고 방마다 전용 Durable Object를 붙입니다.',
  parts: [
    { name: 'Astro', role: '첫 페이지와 게임 페이지와 안내 페이지를 검색 엔진용 정적 HTML로 만듭니다.' },
    { name: 'Preact', role: '로비와 게임과 채팅이 있는 방 앱입니다.' },
    { name: 'Cloudflare Worker', role: '페이지를 내주고 방마다 WebSocket을 엽니다.' },
    { name: 'Durable Objects', role: '방 코드마다 객체 하나가 상태를 자기 SQLite에 두고 타이머를 돌립니다.' },
    { name: 'TypeScript 게임 규칙', role: '방과 게임 3개를 위한 단순한 클래스로 Cloudflare 없이 테스트합니다.' },
    { name: '공유 캔버스 모듈', role: '그림을 800×600 격자 위 동작 목록으로 보관합니다.' },
    { name: 'Capacitor', role: '같은 페이지를 AdMob 배너와 함께 Android와 iOS 앱에 담습니다.' },
  ],
  flow: [
    '방장이 방을 만들고 링크를 보냅니다.',
    '각 플레이어가 방의 Durable Object로 WebSocket을 엽니다.',
    '방이 게임 규칙을 실행하고 각 플레이어에게 상태를 보냅니다.',
    '그림은 작은 동작으로 80ms마다 전송됩니다.',
    '알람이 각 턴을 끝내고 빈 방은 30분 뒤에 지워집니다.',
  ],
  links: [
    { to: 'Cloudflare', text: 'Workers Free가 페이지와 방을 호스팅합니다.' },
    { to: 'Google AdSense', text: 'AdSense가 웹사이트에 배너를 보여 줍니다.' },
    { to: 'Google AdMob', text: 'AdMob이 Android와 iOS 앱에 배너를 보여 줍니다.' },
  ],
  design: {
    scale: [
      '방 하나에 최대 12명이 들어가고, 단서 대결은 최소 4명이 필요합니다.',
      'Workers Free는 하루 요청 10만 건이고, 그림 그리기로 치면 하루 약 40시간입니다.',
      '메시지는 256 KB, 그림 하나는 3000개 동작까지입니다.',
    ],
    data: [
      '각 방은 자체 SQLite 저장소를 가진 Durable Object이고, 키는 meta, canvas, chain:N 세 종류입니다.',
      'meta는 바뀔 때마다 플레이어, 점수, 설정, 단계, 채팅, 게임 상태를 저장합니다. canvas는 2초에 한 번까지만 저장합니다.',
      '그림은 800 곱하기 600 격자 위의 동작 목록입니다. 브라우저는 wg-로 시작하는 키에 토큰과 설정을 둡니다.',
    ],
    interfaces: [
      '플레이어마다 /games/ws/CODE로 WebSocket 하나를 엽니다. Worker는 idFromName으로 코드를 방 객체에 연결합니다.',
      '첫 메시지 hello에는 프로토콜 버전, 토큰, 이름, 색이 담기고, 그 뒤에 state, chat, draw 메시지가 이어집니다.',
      'Android와 iOS 앱도 게임 Worker에 같은 소켓을 엽니다. Origin 검사가 사이트와 앱을 들여보냅니다.',
    ],
    reliability: [
      'Hibernation API로 놀고 있는 방은 메모리를 떠나고, 소켓 메시지나 알람이 저장소에서 깨웁니다.',
      '알람이 모든 마감을 돌리고, 방이 빈 지 30분 뒤에 정리합니다.',
      'PROTOCOL 번호 덕분에 Worker는 옛 앱에 그 앱의 형식으로 답합니다. 연결이 끊긴 플레이어 자리는 방이 24자리로 찰 때까지 남습니다.',
    ],
    security: [
      '계정이 없습니다. 브라우저가 무작위 토큰을 갖고, 방은 그 해시를 플레이어 id로 저장합니다.',
      '방 객체가 낱말을 고르고 추측마다 판정하므로, 정답은 서버에 남습니다.',
      '다른 사이트의 소켓은 거절합니다. 이름은 20자, 채팅 한 줄은 100자까지입니다.',
    ],
    performance: [
      '그림은 픽셀이 아니라 작은 동작 목록을 80 ms마다 보냅니다.',
      'Hibernation을 쓰면 WebSocket 메시지 20개가 요청 1건으로 셉니다.',
      '정적 페이지는 비용이 들지 않습니다. run_worker_first가 방 링크와 소켓만 Worker 코드로 보내기 때문입니다.',
    ],
    operations: [
      'Worker 하나를 wrangler로 배포하며, 정적 dist/ 폴더와 방 객체가 들어 있습니다. Games 워크플로는 main에 푸시할 때마다 배포합니다.',
      'mise run check는 각 게임의 규칙에 oxlint, 타입 검사, Vitest를 돌립니다.',
      'Worker 관측은 켜져 있습니다. Android 앱은 Google Play 비공개 테스트로 나갑니다.',
    ],
    tradeoffs: [
      'Supabase Realtime, PartyKit, VPS 대신 hibernation을 쓰는 Durable Objects를 골라 서버 없이 무료 한도 안에 두었습니다. 방 코드는 Cloudflare용으로 쓰였습니다.',
      'Preact 싱글 페이지 앱 대신 Preact 아일랜드를 얹은 Astro 정적 페이지로 두어, 검색 엔진이 완전한 HTML을 받습니다.',
      '픽셀 대신 고정 격자 위의 그리기 동작으로 두어 메시지가 작고 실행 취소가 한 단계입니다.',
      'Trusted Web Activity나 React Native 대신 Capacitor를 골라 같은 페이지가 네이티브 AdMob 배너와 함께 앱에서 돕니다.',
    ],
  },
  features: {
    'Rooms by link':
      'Worker가 방 코드마다 전용 Durable Object를 연결합니다. 브라우저의 무작위 토큰이 플레이어를 나타내고 방은 그 해시만 보관합니다.',
    'Kids mode':
      '브라우저 음성이 각 단어를 소리 내어 읽습니다. 어린이 단어 목록은 9개 언어마다 단어 80개에 그림을 붙였습니다.',
    'Guess the drawing':
      '방 객체가 단어를 고르고 서버에서 각 추측을 확인합니다. 알람이 턴을 끝내고 점수는 맞힌 속도를 따릅니다.',
    'Drawing telephone':
      '방이 타이머에 맞춰 각 문장과 그림을 다음 플레이어에게 넘깁니다. 각 이야기는 앨범을 위해 방 저장소에 쌓입니다.',
    'Clue duel':
      '방이 12개 단어의 공용 판과 팀마다 비밀 단어 2개를 나눠 줍니다. 서버는 자기 팀 단어와 가로챈 단어를 따로 셉니다.',
    'Drawing tools':
      '캔버스 그리기 모듈이 각 획을 고정 격자 위 동작으로 바꿉니다. 방은 80ms마다 다른 플레이어에게 보내고 되돌리기는 마지막 동작을 뺍니다.',
    Languages:
      '방 앱은 문구를 언어 파일 9개에 두고 단어 목록도 9개 언어로 있습니다. Astro는 페이지를 영어와 러시아어로 만듭니다.',
    Ads: 'AdSense가 사이트 페이지에 배너를 둡니다. 앱에서는 Capacitor용 AdMob 플러그인이 법이 요구하는 곳에서 동의 양식 뒤에 배너를 보여 줍니다.',
    'Android and iOS apps':
      'Capacitor가 빌드한 페이지를 네이티브 앱에 담고 앱은 로컬 파일에서 페이지를 불러옵니다. 앱은 게임 Worker로 연결을 엽니다.',
    'Party look':
      '공유 CSS가 밤의 빛과 밝은 파스텔과 게임마다 색을 정합니다. 동작 줄이기 설정에서는 움직임이 멈춥니다.',
  },
};

export default arch;

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

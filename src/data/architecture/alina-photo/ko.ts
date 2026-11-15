import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'Rust로 만든 Cloudflare Worker 하나가 Astro 정적 페이지와 API를 제공합니다. D1은 예약과 설정을, R2는 사진을 담습니다.',
  parts: [
    { name: 'Astro', role: '정적 페이지, head 태그, 사이트맵을 만듭니다.' },
    { name: 'Rust Worker', role: '사진, 예약, 로그인, 갤러리, 캘린더 피드 API에 응답합니다.' },
    { name: 'booking-core', role: '빈 시간, 일몰, iCal 텍스트를 계산하는 Rust 크레이트.' },
    { name: 'D1', role: '사진 목록, 예약, 갤러리, 설정, 로그인 세션을 담습니다.' },
    { name: 'R2', role: '줄인 사진, 갤러리 파일, 업로드한 글꼴을 담습니다.' },
    { name: 'Email Routing', role: 'Alina에게 예약과 문의를, 관리자에게 로그인 링크를 보냅니다.' },
    { name: '브라우저 스크립트', role: '사용자 기기에서 사진을 줄이고 편집하고 워터마크를 넣으며 zip도 만듭니다.' },
    { name: 'Google 캘린더', role: '비공개 iCal 주소로 바쁜 시간을 알리고, 예약 피드를 다시 읽습니다.' },
  ],
  flow: [
    '고객이 페이지를 열면 Worker가 정적 HTML로 보냅니다.',
    '페이지가 Worker API에 사진이나 빈 시간을 묻습니다.',
    'Worker가 D1과 Alina의 캘린더를 읽고, booking-core가 빈 시간을 찾습니다.',
    '새 예약은 D1에 들어가고, 캘린더 파일과 함께 Alina에게 메일로 갑니다.',
    '사진은 R2에서 2가지 크기로 불러옵니다.',
  ],
  links: [
    {
      to: 'Google Calendar',
      text: '바쁜 시간은 iCal로 들어오고 5분 동안 캐시됩니다. 비공개 피드가 각 예약을 돌려보냅니다.',
    },
    { to: 'Cloudflare', text: 'Worker, D1, R2, Email Routing, 폼 요청 제한을 돌립니다.' },
    { to: 'GitHub', text: 'main의 검사가 통과하면 릴리스가 D1 마이그레이션을 돌리고 배포합니다.' },
  ],
  features: {
    Portfolio:
      '페이지가 Worker에서 사진 목록을 받고, Worker는 D1에서 읽습니다. 각 사진은 R2에서 800px과 2400px 두 가지 WebP 크기로 옵니다.',
    Booking:
      'Rust로 만든 booking-core가 Alina의 근무 시간, D1의 예약, 캘린더의 바쁜 시간으로 빈 시간을 계산합니다. 일몰을 기준으로 골든아워를 표시합니다.',
    Questions:
      '폼은 Worker로 가고, Worker가 Cloudflare Email Routing으로 Alina에게 메일을 보냅니다. Alina는 그 메일에서 바로 고객에게 답합니다.',
    Admin:
      'Worker가 로그인 링크를 메일로 보내고 세션을 D1에 둡니다. 사진은 브라우저에서 2400px로 줄고 GPS 정보를 지운 뒤 R2로 갑니다.',
    'Calendar sync':
      'Worker가 Alina의 Google 캘린더 비공개 iCal 주소를 읽고 5분 동안 캐시합니다. 비공개 피드와 예약 메일의 파일이 예약을 캘린더로 돌려보냅니다.',
    Fonts:
      '글꼴 10개는 사이트와 함께 배포되고, 업로드한 글꼴은 R2로 갑니다. Worker가 D1의 선택으로 테마 스타일시트를 내고 1분 동안 캐시합니다.',
    'Client galleries':
      '브라우저가 업로드 전에 각 시안에 워터마크를 그리고, R2가 시안과 원본을 담습니다. 고객의 브라우저가 client-zip으로 원본 zip을 만듭니다.',
    Search:
      'Astro가 빌드할 때 각 페이지에 제목, 설명, 사진 카드, 구조화 데이터를 씁니다. 사이트맵은 빌드한 페이지로 만듭니다.',
  },
};

export default arch;

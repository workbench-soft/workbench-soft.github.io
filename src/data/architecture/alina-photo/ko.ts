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
  design: {
    scale: [
      '사진가 한 명의 스튜디오 사이트로, 고객이 예약하고 갤러리를 열며 Alina가 관리 영역을 씁니다. 트래픽은 작습니다.',
      '사진은 2400 px와 800 px 2가지 크기로 저장하고, 25 MB 카메라 파일은 1 MB 미만으로 올라갑니다.',
      'Worker 요청 하나의 CPU는 몇 밀리초이고 wasm 빌드는 약 2.5 MB여서 무거운 작업은 브라우저로 옮겼습니다.',
    ],
    data: [
      'D1에는 photos, bookings, settings, sessions, login_links, galleries, gallery_files가 있습니다. 시각은 UTC 문자열이라 문자열 순서가 시간 순서입니다.',
      'settings 행은 버전 없는 JSON입니다. 더는 해석되지 않는 행은 기본값으로 돌아가고 오류를 기록합니다.',
      'R2에는 p/<id>/l.webp와 s.webp 사진, 올린 글꼴, g/<gallery>/ 아래의 갤러리 파일(시안, 160 px 썸네일, 원본)이 있습니다.',
    ],
    interfaces: [
      'Worker는 /api 아래에서 날짜, 시간대, 예약, 사진, 갤러리, 로그인의 JSON을 내고, /calendar/<token>.ics에서 캘린더 피드를 냅니다.',
      '들어오는 캘린더는 Alina의 비공개 iCal 주소이며 5분 캐시합니다. 나가는 쪽은 예약 피드이고, 예약 메일에는 booking.ics도 붙습니다.',
      '메일은 Email Routing의 send_email 바인딩으로 Alina의 인증된 주소에만 나갑니다.',
      'booking-core는 시간대, 예약 재확인, 일몰 시각, iCal을 다루는 Rust crate이고, 반복 일정에는 rrule crate를 씁니다.',
    ],
    reliability: [
      '예약 POST는 시간대가 아직 비어 있는지 다시 확인하므로, 목록을 불러온 뒤 찬 시간대는 거절됩니다.',
      '구독한 캘린더 피드는 몇 시간 늦으므로 예약 메일에는 iCal 파일도 함께 붙습니다.',
      '만료된 세션과 로그인 링크는 D1에서 지우고, 저장된 테스트가 오늘의 settings 행이 계속 해석되도록 지킵니다.',
      '릴리스는 D1을 이전한 뒤 배포하며, Cloudflare 시간 초과 시 이전과 배포에 각각 3번 시도합니다.',
    ],
    security: [
      '로그인은 메일로 오는 15분짜리 링크입니다. 메일 스캐너가 GET 링크를 열기 때문에 링크는 토큰을 POST하는 페이지를 엽니다.',
      '세션은 HttpOnly, SameSite Lax 쿠키로 30일 가고, D1에는 토큰의 해시만 저장합니다.',
      'Workers 속도 제한 바인딩이 예약과 메일 전송 양식에서 IP당 분당 5번으로 제한합니다.',
      '갤러리 id는 링크의 해시에 있어서 서버 로그와 referrer에 남지 않습니다. 링크를 가진 사람은 갤러리를 볼 수 있습니다.',
    ],
    performance: [
      '브라우저가 업로드 전에 사진을 2가지 크기로 줄여서 25 MB 파일이 1 MB 미만으로 올라가고 GPS 정보도 사라집니다.',
      'client-zip이 갤러리 zip을 브라우저에서 만듭니다. Worker는 CPU 한도 안에서 수 GB를 읽을 수 없기 때문입니다.',
      '페이지는 Worker가 내보내는 정적 Astro HTML이고, 캘린더 텍스트는 5분 캐시합니다.',
    ],
    operations: [
      'Worker 하나가 페이지와 API를 냅니다. worker-build가 Rust를 wasm으로 바꾸고, mise가 Rust, Node, pnpm을 고정합니다.',
      'main에서 Checks가 통과하면 workflow_run으로 릴리스가 시작되고, 한 번에 하나씩 빌드, D1 이전, 배포, 태그 순으로 갑니다.',
      '이전은 migrations/의 번호가 붙은 SQL 파일입니다. lint는 oxlint, oxfmt, tsc, knip, rustfmt, PC용과 wasm용 clippy, cargo shear를 포함합니다.',
    ],
    tradeoffs: [
      'GitHub Pages와 Worker 대신 Worker 하나로 페이지와 API를 내서 관리자 쿠키가 한 오리진에서 CORS 없이 동작합니다.',
      '비밀번호나 Cloudflare Access 대신 메일 링크 로그인을 써서 Alina가 잊을 비밀번호가 없고 Zero Trust 설정도 필요 없습니다.',
      'Google 캘린더 API 대신 iCal 입출력을 써서 OAuth 앱, 심사, 토큰 갱신이 필요 없지만 피드는 몇 시간 늦습니다.',
      'CPU가 부족한 Worker 대신 브라우저에서 축소, 워터마크, zip을 하며, 시안은 원본 파일 없이는 워터마크를 다시 넣을 수 없습니다.',
    ],
  },
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
      '브라우저가 업로드 전에 각 사진의 작은 미리보기에 워터마크를 그리고, R2가 미리보기와 원본, 보정본을 담습니다. Worker는 결제 완료 체크 후에만, 구매한 파일에 한해 원본이나 보정본을 내줍니다. 고객의 브라우저가 client-zip으로 구매한 파일의 zip을 만듭니다.',
    Reviews:
      'Worker는 허니팟과 전송 횟수 제한을 거친 후기를 대기 상태로 D1에 저장하고 Alina에게 메일을 보냅니다. API로는 승인된 행만 나가고, 페이지는 Review와 AggregateRating 데이터를 더합니다.',
    Search:
      'Astro가 빌드할 때 각 페이지에 제목, 설명, 사진 카드, 구조화 데이터를 씁니다. 사이트맵은 빌드한 페이지로 만듭니다.',
  },
};

export default arch;

import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'GitHub Pages에 올린 정적 Astro 사이트로, Git 기반 관리자 화면에서 편집합니다. Cloudflare의 Rust Worker 하나가 Maria의 로그인과 AI 그림을 맡습니다.',
  parts: [
    { name: 'Astro', role: '각 페이지를 정적 HTML로, 각 사진을 AVIF나 WebP 크기로 만듭니다.' },
    { name: 'GitHub Pages', role: '공개 빌드 저장소에서 사이트를 제공합니다. 무료이고 러시아에서도 빠릅니다.' },
    { name: 'Sveltia CMS', role: '관리자 화면으로, 각 변경을 비공개 소스 저장소에 커밋으로 저장합니다.' },
    {
      name: 'Rust Worker',
      role: '메일로 받은 코드로 관리자를 로그인시키고, AI 페이지를 위해 저장소 권한을 확인합니다.',
    },
    { name: 'Workers AI', role: '인테리어를 그리는 FLUX.2 모델을 돌립니다.' },
    { name: 'FormSubmit', role: '계정도 서버도 없이 각 주문 폼을 Maria에게 메일로 보냅니다.' },
    { name: 'GitHub Actions', role: '각 변경을 검사하고, 사이트를 빌드해 공개 저장소에 push합니다.' },
  ],
  flow: [
    '방문자의 브라우저가 GitHub Pages에 페이지를 요청합니다.',
    'Pages가 정적 HTML과 레이아웃에 맞는 크기의 사진을 보냅니다.',
    '주문 폼은 FormSubmit으로 가고, FormSubmit이 Maria에게 메일을 보냅니다.',
    'Maria의 편집은 커밋이 되고, 사이트는 2분 안에 다시 빌드됩니다.',
  ],
  links: [
    { to: 'GitHub', text: '비공개 소스와 공개 빌드 저장소를 두고, 페이지를 제공합니다.' },
    { to: 'Cloudflare', text: 'Worker, Workers AI, 로그인 코드를 보내는 메일을 돌립니다.' },
    { to: 'FormSubmit', text: '각 주문을 Maria에게 보냅니다.' },
    { to: 'Yandex', text: '구조화 데이터를 읽습니다. robots.txt의 Yandex 규칙이 필터 링크를 한 페이지로 묶습니다.' },
  ],
  design: {
    scale: [
      '러시아 방문자를 위한 스튜디오 포트폴리오이며 갤러리 16개와 사진 약 270장이 있습니다.',
      '몇 사람이 편집하므로 사이트에는 서버도 데이터베이스도 필요 없고, 변경마다 커밋이 됩니다.',
      'AI 페이지는 Workers AI 무료 한도인 하루 10,000 뉴런 안에서 돌며, 이미지 하나에 약 3초에서 15초가 걸립니다.',
    ],
    data: [
      '각 갤러리는 index.md와 사진이 든 폴더입니다. 머리말에 제목, 분류, 순서, 표지, 설명이 있습니다.',
      'settings.json 하나가 연락처, 홈 화면 글, 글꼴 선택을 담습니다. 빌드할 때 zod 스키마가 이것과 갤러리를 검사합니다.',
      '로그인 코드는 저장하지 않습니다. 각 코드는 이메일과 10분 구간으로 만든 HMAC입니다.',
    ],
    interfaces: [
      'Rust Worker는 GET /auth, POST /auth/code, POST /auth/verify, POST /generate를 처리합니다.',
      '관리 화면은 GitHub API로 커밋을 써서 저장합니다. 주문 양식은 FormSubmit으로 가고, 거기서 메일이 나갑니다.',
      '/generate는 프롬프트, 모델, 64 단위로 256에서 1536 사이의 크기, 최대 2장의 참고 사진을 multipart 폼 데이터로 받습니다.',
    ],
    reliability: [
      'Worker는 CORS 헤더에 허용 출처를 하나만 적습니다. 브라우저가 목록을 거부하기 때문입니다. 그 뒤의 오류는 관리 페이지가 보여 줄 수 있는 JSON으로 나갑니다.',
      'GitHub 장애에는 접근 없음이 아니라 재시도 안내가 나갑니다. AI 한도를 다 쓰면 전용 메시지가 나옵니다.',
      '릴리스마다 소스에서 다시 빌드하므로, 잘못된 변경은 커밋 하나를 되돌리면 됩니다.',
    ],
    security: [
      '이메일로 받은 6자리 코드로 로그인하고 이메일마다 1분에 5번까지 시도할 수 있으며, Worker가 관리 화면에 세분화된 저장소 토큰을 건네줍니다.',
      '/generate는 모델을 부르기 전에 호출자의 토큰이 저장소에 푸시할 수 있는지 확인합니다.',
      '토큰은 허용된 출처의 창에만 전달됩니다. 관리자 이메일과 토큰은 Worker 설정과 시크릿에 있고 사이트에는 없습니다.',
    ],
    performance: [
      'Astro는 각 사진을 레이아웃에 필요한 크기의 AVIF나 WebP로 만들고, GitHub Pages가 정적 HTML을 제공합니다.',
      '릴리스는 모든 사진을 다시 만들지 않고 실행 사이에 Astro 이미지 캐시를 유지합니다.',
      '방 사진은 올리기 전에 브라우저에서 512 px로 줄어듭니다. FLUX.2 klein은 약 3초에 초안을 그리고 dev는 약 15초 걸립니다.',
    ],
    operations: [
      'main에 푸시할 때마다 검사와 나란히 사이트를 빌드하고, 같은 커밋의 검사를 기다린 뒤 공개 빌드 저장소로 페이지를 푸시합니다.',
      '릴리스는 한 번에 하나만 돌고 더 새로운 푸시가 오래된 것을 취소하므로, 옛 빌드가 새 빌드를 덮어쓰지 않습니다. 커밋에는 날짜 태그가 붙습니다.',
      '변경은 저장 약 2분 뒤에 보입니다. Worker는 wrangler로 배포하고 관측성을 켜 두었습니다.',
    ],
    tradeoffs: [
      'Cloudflare Pages 대신 공개 빌드 저장소의 GitHub Pages를 골랐습니다. 러시아 통신사가 Cloudflare를 느리게 하기 때문이며, 저장소 두 개와 릴리스 토큰이 필요합니다.',
      '호스팅 CMS 대신 Git 기반 관리 화면을 골라 서버와 데이터베이스를 없앴고, 변경마다 2분을 기다립니다.',
      '메일 보내는 Worker 대신 FormSubmit을 골랐습니다. 무료이고 계정이 필요 없기 때문이며, 서비스는 러시아 밖에 있습니다.',
      '유료 이미지 API 대신 FLUX.2를 쓰는 Workers AI를 골랐습니다. 러시아어를 읽고 무료 한도에 들어맞기 때문이며, Cloudflare에서 오는 이미지는 느린 편입니다.',
    ],
  },
  features: {
    Portfolio:
      '각 갤러리는 저장소 안에 Markdown과 사진이 든 폴더입니다. Astro가 페이지와 이미지 크기를 만들고, 필터는 브라우저에서 돕니다.',
    'Order a design':
      '각 폼은 FormSubmit으로 가고, FormSubmit이 요청을 Maria에게 메일로 보냅니다. 사이트에는 이를 위한 서버가 없습니다.',
    Admin:
      'Sveltia CMS가 관리자 페이지에서 돌며 각 변경을 저장소에 커밋합니다. Worker가 Maria에게 로그인 코드를 메일로 보내고, 관리자 화면에 저장소 토큰을 줍니다.',
    Fonts:
      '글꼴 10개는 Fontsource에서 가져와 사이트와 함께 배포합니다. 선택은 사이트 설정 파일에 있고, 레이아웃이 다음 빌드에서 적용합니다.',
    'AI generator':
      '관리자 페이지가 Maria의 러시아어 요청과 스타일을 영어 프롬프트로 감쌉니다. Worker가 GitHub 권한을 확인하면 Workers AI의 FLUX.2가 그림을 그립니다.',
    Search:
      'Astro 레이아웃이 각 페이지에 제목, 설명, 공유 사진, 구조화 데이터를 씁니다. 빌드가 robots.txt, llms.txt, git 날짜가 담긴 사이트맵을 씁니다.',
  },
};

export default arch;

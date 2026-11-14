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

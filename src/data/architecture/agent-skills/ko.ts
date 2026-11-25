import type { Arch } from '../types';

const arch: Arch = {
  summary:
    '단순한 Markdown 스킬과 몇 개의 스크립트로, 서버도 빌드도 없습니다. 설치 프로그램이 클론 하나를 기기의 각 코딩 에이전트에 연결하고, CI가 릴리스마다 스킬을 검사합니다.',
  parts: [
    { name: 'Agent Skills 형식', role: '스킬마다 Markdown 폴더 하나이며, 요청이 맞으면 에이전트가 불러옵니다.' },
    {
      name: 'POSIX shell 설치 프로그램',
      role: '클론을 Claude Code, Codex, Kimi Code 등에 연결하고, Windows에는 PowerShell 래퍼가 있습니다.',
    },
    { name: 'Git hooks', role: 'pull, merge, checkout 뒤에 스킬을 다시 연결합니다.' },
    { name: 'Node 스크립트', role: '에이전트 훅을 각 에이전트 설정에 합치고 MCP 서버를 복사합니다.' },
    { name: 'turn-voice 훅', role: 'Windows의 C# 플레이어와 Mac의 Node 버전이 턴의 끝을 말로 알립니다.' },
    { name: 'Python과 TypeScript 검사', role: '스킬 형식, 키워드, 스킬마다의 길이를 검사합니다.' },
    { name: 'GitHub Actions', role: 'Windows와 Linux에서 검사를 돌린 뒤 날짜가 붙은 릴리스를 만듭니다.' },
  ],
  flow: [
    '사용자가 저장소를 클론하고 설치 프로그램을 실행합니다.',
    '설치 프로그램이 스킬 폴더를 찾은 에이전트마다 연결합니다.',
    '세션을 시작할 때 에이전트가 스킬마다 설명을 읽습니다.',
    '맞는 요청이 스킬 전체를 불러오고 에이전트가 그 단계를 따릅니다.',
    '턴이 끝나면 음성 훅이 결과를 말합니다.',
  ],
  links: [
    { to: 'agent-skills-private', text: '소유자의 비공개 규칙과 스킬이 있으며, 이 공개 스킬과 나란히 있습니다.' },
    { to: 'Claude Code', text: '설치 프로그램이 스킬을 연결하고 훅을 그 설정에 합칩니다.' },
    { to: 'Codex', text: '같은 스킬, 훅, Claude Code의 MCP 서버 복사본입니다.' },
    { to: 'GitHub', text: '검사와 날짜가 붙은 릴리스는 GitHub Actions에서 돌아갑니다.' },
  ],
  design: {
    scale: [
      '컴퓨터 한 대에 한 사람, 스킬 33개, 그리고 Agent Skills 형식을 읽는 에이전트는 몇 개든 됩니다.',
      '세션마다 모든 스킬의 설명을 불러오므로 설명은 480자 이하, 스킬 본문은 300줄 이하로 둡니다.',
    ],
    data: [
      '데이터베이스는 없습니다. 스킬은 SKILL.md와 front matter가 든 폴더이고, 필요할 때 불러오는 참조 파일이 딸립니다.',
      '훅 그룹은 JSON 파일에 있고, turn-voice 훅은 캐시한 음성 클립을 로컬 폴더에 둡니다.',
    ],
    interfaces: [
      '에이전트와의 약속은 front matter입니다. name은 폴더 이름과 같고, description은 스킬을 언제 불러올지 알려 줍니다.',
      '설치 프로그램은 Claude Code와 Codex 설정에 훅 그룹을 병합하고, Kimi Code에는 표시가 붙은 블록을 씁니다.',
      'turn-voice 훅은 한 턴의 마지막 줄에 있는 상태 마커를 읽고 알맞은 문구를 읽어 줍니다.',
    ],
    reliability: [
      '클론의 git 훅이 pull, merge, checkout, rebase 뒤에 스킬을 다시 연결해서 새 스킬이 바로 나타납니다.',
      '훅을 병합해도 사용자의 훅은 그대로 남습니다. Node가 없으면 설치는 훅을 건너뛰고 그렇게 알립니다.',
      '음성을 받지 못하면 효과음만 남고, 캐시된 클립은 네트워크 없이 재생됩니다.',
    ],
    security: [
      '저장소는 공개이고 토큰을 담지 않습니다. 포크의 PR은 GitHub 러너에서 돌아서 그 코드가 PC에 닿지 않습니다.',
      '사이트용 스킬은 로그인, CAPTCHA, 비밀 값, 결제에서 멈추고 그 일을 사용자에게 맡깁니다.',
    ],
    performance: [
      '매 턴 불러오는 것은 짧은 글쓰기 규칙뿐입니다. 스킬 전체는 요청이 그 설명과 맞을 때 불러옵니다.',
      '음성 클립은 캐시되고, 효과음과 목소리를 PlaySound 한 번으로 합쳐서 첫 단어가 온전히 들립니다.',
    ],
    operations: [
      'check 워크플로는 PowerShell 설치를 Windows에서, 셸 설치를 Linux에서 확인하고, 각 도구 버전은 mise로 고정합니다.',
      'release 워크플로는 main에서 check가 통과하면 workflow_run으로 시작해 v2026.10.30.1 같은 날짜 태그를 붙입니다.',
      'mise run test는 스킬 형식, 글 분량 예산, 단위 테스트, 임시 홈에서의 설치와 제거를 확인합니다.',
    ],
    tradeoffs: [
      '에이전트마다 규칙 파일을 두는 대신 스킬마다 Markdown 폴더를 골라서 사본 하나로 약 50개 에이전트를 지원합니다. 규칙을 지키게 하는 것은 읽는 에이전트뿐입니다.',
      '에이전트마다 사본을 두는 대신 클론 하나를 각 에이전트에 연결해서 수정이 모두에게 한꺼번에 닿습니다. 개발자 모드가 없는 Windows는 junction을 씁니다.',
      'Windows에 들어 있는 csc.exe로 빌드하는 C# 훅을 골라서 SDK가 필요 없습니다. Windows에서만 돌고, Mac은 Node 버전이 맡습니다.',
    ],
  },
  features: {
    'Writing style':
      '짧은 규칙 파일이 에이전트의 기본 규칙 파일을 통해 턴마다 로드됩니다. 전체 스킬은 첫 글 앞에 로드되며 단어 표와 마지막 점검을 담습니다.',
    'Code review':
      'review 스킬이 PR이나 diff를 읽고 문제마다 코드로 확인합니다. 줄, 코드를 깨는 입력, 수정 방법을 담은 표 하나가 돌아옵니다.',
    'Reviewer lenses':
      'reviewer 스킬이 diff나 저장소에 맞는 관점을 고르고 관점마다 하위 에이전트를 하나 띄웁니다. 법률이나 SEO 같은 분야 관점은 전용 스킬을 불러옵니다.',
    'Pull requests':
      'create-pr 스킬이 본문을 쓰고 GitHub CLI로 PR을 만들거나 고칩니다. Mermaid 도표가 흐름마다 변경 전과 후를 보여 줍니다.',
    'Review comments':
      'address-comments 스킬이 GitHub CLI로 열린 스레드를 하나씩 읽습니다. 수정마다 커밋 하나가 되고 답글에 그 SHA를 적습니다.',
    'Ticket to merge':
      'implement-ticket 스킬이 Atlassian MCP 서버나 그 CLI로 Jira를 읽습니다. 계획은 저장소의 specs에 들어가고 커밋마다 티켓 키가 붙습니다.',
    'App audit':
      'app-audit 스킬이 리뷰어 관점을 띄우고 에이전트마다 자기 git worktree에서 일합니다. 메인 에이전트가 안전한 수정을 한 브랜치에 모아 PR을 병합합니다.',
    'Specs first':
      'specs 스킬이 저장소에 기능마다 Markdown 파일 하나를 둡니다. 변경마다 코드보다 먼저 첫 커밋에 날짜가 붙은 항목을 더합니다.',
    'One-pager':
      'one-pager 스킬이 먼저 전체 글을 씁니다. 그다음 맨 위에 한 화면 요약을 두며, 요약은 새 사실을 더하지 않습니다.',
    'Commands through mise':
      'mise 스킬이 작업은 mise run으로, 다른 명령은 mise x로 실행합니다. 새 도구는 고정 버전으로 저장소의 mise 설정에 들어갑니다.',
    Translations:
      'translations 스킬이 스택에 맞는 i18n 도구를 고르고 문자열을 카탈로그마다 더합니다. 테스트가 카탈로그의 키를 맞춥니다.',
    Worktrees:
      'git-worktrees 스킬이 저장소 옆에 무시된 파일과 의존성을 갖춘 폴더를 만듭니다. 병합 뒤 스크립트가 PR을 확인하고 폴더와 브랜치를 지웁니다.',
    'Fast JavaScript':
      'javascript 스킬은 Vercel의 React 모범 사례에서 React 부분을 뺀 규칙을 담습니다. 지적마다 규칙, 줄, 비용을 알려 줍니다.',
    Architecture:
      'architecture 스킬이 도표와 선택마다의 결정을 붙여 설계를 저장소 문서에 씁니다. 그 뒤 lint나 CI가 계층 규칙을 지키게 합니다.',
    Monorepos:
      'monorepo 스킬이 작업 실행기와 언어마다 workspace를 고릅니다. API 스키마 하나가 플랫폼마다 클라이언트를 만들고 CI는 영향받은 앱만 돌립니다.',
    'History reset':
      'reset-history 스킬이 git bundle을 저장소 밖에 저장한 뒤 기본 브랜치로 커밋 하나를 만듭니다. 한 번 묻고 lease를 건 force push를 합니다.',
    'Rewrite a repo':
      'rewrite-repo 스킬이 동작을 기록하고 코드와 문서의 이름 변경표를 짭니다. 끝에 기록 대신 새 커밋 하나를 남깁니다.',
    'Help on a site':
      'guide-on-site 스킬이 Claude in Chrome으로 사용자 본인의 Chrome을 조작합니다. 아는 칸을 채우고 본인만 할 수 있는 단계에서 멈춥니다.',
    'Hung runs':
      'hung-process 스킬이 Windows에서 포트나 잠금을 잡은 개발 도구를 찾습니다. 그 프로세스 트리를 끝내고 단계를 다시 돌리거나 관리자 명령을 건넵니다.',
    'Search setup':
      'seo-setup 스킬이 DNS가 어디 있는지 찾고 운영 중인 사이트와 저장소를 점검합니다. 그다음 브라우저에서 Search Console, Bing, Cloudflare Web Analytics를 설정합니다.',
    Ads: 'ads-setup 스킬이 사용자가 로그인한 상태로 AdSense와 AdMob 대시보드를 거칩니다. ID를 코드에 넣고 디버그 빌드에는 테스트 광고를 씁니다.',
    'Google Play release':
      'play-release 스킬이 새 버전 코드로 서명된 번들을 만들고 키는 저장소 밖에 둡니다. 내부 테스트로 배포하고 테스터 링크를 돌려줍니다.',
    'Launch in one run':
      'launch 스킬은 공통 질문을 한 번만 합니다. 그다음 검색, 광고, Google Play 스킬을 차례로 돌리고 끝에 서비스 표를 냅니다.',
    Marketing:
      'marketing 스킬이 예산에서 시작해 메시지와 출시 일정을 씁니다. 계획은 저장소 문서에 남아 다음 실행이 이어 갑니다.',
    'In-app updates':
      'app-update 스킬이 시작할 때와 돌아올 때 GitHub 릴리스를 확인하는 코드를 더합니다. 다운로드 막대와 알림이 뒤따르며 이 코드는 Play 빌드에 들어가지 않습니다.',
    'Names and domains':
      '스크립트가 이름마다 도메인 3종과 호주 사업자 등록부를 확인합니다. IP Australia 상표도 확인하며 API 키가 필요 없습니다.',
    'Legal risks':
      '스크립트가 저장소의 의존성 라이선스와 데이터 SDK를 살핍니다. 스킬은 위험마다 문서에 등급을 매기고 안전한 수정을 PR로 냅니다.',
    'App icons':
      '에이전트가 평면 SVG 아이콘 10개를 그리고 채팅에 선택 화면을 띄웁니다. 그 뒤 resvg를 쓰는 스크립트가 고른 아이콘을 플랫폼마다 필요한 크기로 내보냅니다.',
    'Demo screenshots':
      '앱이 지어낸 데모 데이터로 돌고 에이전트가 스크린숏과 짧은 영상을 찍습니다. 저장소의 촬영 목록 덕분에 다음 실행도 같은 장면을 찍습니다.',
    'Store media':
      'store-media 스킬이 저장소의 스크린숏과 아이콘으로 크기마다 이미지를 만듭니다. 로그인한 브라우저에서 올리고 심사에 보내기 전에 묻습니다.',
    'End to end walk of a release':
      'e2e-walk 스킬이 최신 릴리스를 에뮬레이터나 휴대폰에 설치하고 문서의 흐름을 하나씩 따라갑니다. 삭제 동작은 건너뛰고 흐름 목록을 저장소에 남깁니다.',
    'Hear and pick a voice':
      'Python 스크립트가 edge-tts로 Microsoft 신경망 음성을 하나씩 받아 클립을 캐시합니다. 음성마다 ID를 출력하고 원하는 번호부터 다시 시작합니다.',
    'Reddit comments':
      '스킬이 Reddit MCP 서버로 인기 스레드를 모으고 저장소가 답할 수 있는 것만 남깁니다. Playwright가 초안을 Chrome에 입력하고 사용자가 Comment를 누릅니다.',
    'Voice at the end of a turn':
      '훅이 마지막 줄의 표시를 읽고 신호음과 문구를 고릅니다. edge-tts가 말하며 Windows에서는 C# 플레이어가, Mac에서는 Node가 재생합니다.',
    Install:
      'POSIX shell 설치 프로그램이 클론 하나를 찾은 에이전트마다 연결하고, Windows에는 PowerShell 래퍼가 있습니다. 클론의 Git hooks가 pull마다 스킬을 다시 연결합니다.',
    'Agent hooks':
      'Node 스크립트가 훅 그룹을 Claude Code와 Codex 설정에 합칩니다. Claude Code의 MCP 서버도 Codex와 Kimi Code로 복사합니다.',
    Releases:
      'main에 push하고 검사가 통과하면 GitHub Actions 워크플로가 시작됩니다. 커밋에 날짜 버전 태그를 달고 커밋에서 노트를 씁니다.',
    'Progress bars':
      'Claude Code 모드가 진행 도구와 패널을 등록합니다. 훅이 마지막 보고 이후의 초를 세고 에이전트에게 알립니다.',
    'Feature queue':
      '각 세션은 저장소마다 수정할 파일을 적은 점유 파일을 씁니다. 스킬은 main이나 워크트리를 고르기 전에 다른 점유를 읽습니다.',
    'Workflow and code rules':
      'install.sh가 규칙 파일을 홈 폴더에 연결하고, 각 에이전트는 매 턴 읽습니다. 스킬마다 한 가지 작업의 규칙을 담습니다.',
  },
};

export default arch;

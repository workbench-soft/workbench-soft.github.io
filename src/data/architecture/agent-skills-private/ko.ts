import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'Markdown 스킬과 규칙 파일이며, shell 설치 스크립트가 Claude Code, Codex, Kimi Code에 연결합니다. 보조 스크립트가 CI를 점검하고 시크릿을 저장하며 MCP 게이트웨이를 설정합니다.',
  parts: [
    { name: 'Markdown 스킬', role: '작업 하나씩의 단계를 담고, 요청이 그 작업을 말할 때 불러옵니다.' },
    { name: '규칙 파일', role: '각 세션의 매 턴마다 불러오는 작업 규칙.' },
    { name: 'shell 설치 스크립트', role: '스킬을 각 에이전트에 링크하고 규칙 파일을 설정에 연결합니다.' },
    {
      name: 'GitHub Actions 템플릿',
      role: 'repo-ci가 저장소에 복사하는 Checks와 Release workflow, 그리고 릴리스 관문.',
    },
    { name: 'gh와 GraphQL', role: '조직 각 저장소의 workflow와 시크릿 목록을 한 번의 호출로 읽습니다.' },
    { name: 'PowerShell 스크립트', role: '에이전트가 보지 못하게 새 시크릿을 GitHub에 저장합니다.' },
    { name: 'mcpproxy', role: 'MCP 서버 5개를 대신하는 게이트웨이 서버 하나.' },
    { name: 'Python과 TypeScript 검사', role: '스킬의 frontmatter, 링크, 키워드, 길이를 확인합니다.' },
  ],
  flow: [
    '설치 스크립트가 스킬을 링크하고 규칙 파일을 각 에이전트에 복사합니다.',
    '세션은 매 턴 규칙 파일을 불러옵니다.',
    '스킬 설명에 맞는 요청이 오면 그 스킬을 불러옵니다.',
    '스킬이 gh, 스크립트, MCP 도구로 GitHub와 각 콘솔을 다룹니다.',
    '에이전트가 변경을 내보내고 상태 표시로 턴을 마칩니다.',
  ],
  links: [
    { to: 'agent-skills', text: '공개 스킬을 먼저 설치하고, 이 스킬들은 거기서 글쓰기 규칙을 불러옵니다.' },
    { to: 'local-ci', text: 'repo-ci 템플릿은 local-ci가 배정한 러너에서 빌드합니다.' },
    { to: 'ci', text: '그 릴리스 스크립트는 repo-ci 템플릿과 같습니다.' },
    { to: 'Bitwarden', text: '각 토큰은 먼저 보관소에 들어가고, 교체 스크립트로 GitHub에 갑니다.' },
    { to: 'GitHub', text: '스킬이 gh로 저장소를 옮기고 workflow를 추가하며 시크릿을 저장합니다.' },
  ],
  design: {
    scale: [
      '소유자는 한 명, 스킬은 11개, 그리고 스킬이 감사하고 내보내는 GitHub 조직 하나의 수십 개 저장소입니다.',
      '규칙 파일은 모든 세션의 모든 턴에 불러오므로 짧게 유지하고, 작업별 규칙은 스킬로 옮깁니다.',
    ],
    data: [
      '데이터베이스는 없습니다. 스킬은 Markdown 폴더이고, 규칙 파일은 설치 프로그램이 각 에이전트에 복사하는 Markdown 파일 하나입니다.',
      '각 앱 저장소는 .github/secret-rotation.json에 시크릿을 나열합니다. 종류, 제공업체 페이지, 새 값의 비용입니다.',
    ],
    interfaces: [
      '감사 스크립트는 gh GraphQL 호출 한 번으로 모든 저장소의 워크플로 파일과 시크릿 목록을 읽습니다.',
      '설치 프로그램은 표시가 붙은 블록으로 규칙 파일을 Claude Code와 Codex의 전역 파일에 연결하고, Kimi Code도 같은 줄을 읽습니다.',
      '게이트웨이 서버 하나가 MCP 서버 5개를 대신하므로 에이전트는 도구 목록 하나만 불러옵니다.',
    ],
    reliability: [
      '릴리스 워크플로는 Checks와 나란히 빌드합니다. 게이트 스크립트가 끝에서 Checks를 확인하므로 Checks가 실패하면 빌드를 취소합니다.',
      '나중에 끝난 Checks가 workflow_run으로 게시 작업을 시작하므로 기다리는 동안 러너를 쥐고 있는 작업이 없습니다.',
      '클라우드 분량이 줄면 실행이 소유자의 PC로 옮겨 가고, PC가 꺼져 있는 동안 작업은 대기열에서 기다립니다.',
    ],
    security: [
      '교체 스크립트는 숨김 입력이나 파일에서 새 값을 읽어 gh secret set으로 저장하므로 에이전트는 값을 보지 못합니다.',
      '모든 토큰은 먼저 보관소에, 그다음 GitHub에 들어갑니다.',
      '저장소는 비공개입니다. 조직의 시크릿 목록과 러너를 이름으로 적기 때문입니다. 범용 스킬은 공개 agent-skills에 있습니다.',
    ],
    performance: [
      '매번 불러오는 것은 모든 턴에 필요한 규칙뿐입니다. 작업 규칙은 요청이 맞을 때 해당 스킬에서 불러옵니다.',
      '릴리스 빌드는 파일을 실행 id 아래 캐시에 저장하고, 게시 작업이 그것을 재사용해 가벼운 러너를 1분만 씁니다.',
    ],
    operations: [
      'check.yml과 release.yml은 러너를 저장소 변수에서 읽고, 라우터가 클라우드 러너를 먼저, PC를 마지막에 가리킵니다.',
      '릴리스는 v2026.10.30.1 같은 날짜 태그를 받는데, repo-ci 템플릿이 ci 저장소와 공유하는 셸 스크립트가 붙입니다.',
      'mise run test는 스킬, 글 분량 예산, 임시 홈에서의 설치, 게이트웨이, 릴리스 스크립트를 확인합니다.',
    ],
    tradeoffs: [
      '공개 저장소 옆에 비공개 저장소를 두어 조직의 러너와 시크릿 목록을 공개하지 않습니다. 클론과 설치 프로그램이 둘씩 듭니다.',
      '긴 규칙 파일 하나 대신 작업 규칙을 스킬에 두어 조용한 턴이 토큰을 덜 씁니다. 설명이 약한 스킬은 건너뛰게 됩니다.',
      '중앙 목록 대신 각 앱 저장소에 매니페스트를 두어 워크플로 변경과 그 시크릿 항목이 한 PR에 들어갑니다. 매니페스트가 없는 저장소는 교체 대상이 아닙니다.',
    ],
  },
  features: {
    'Move a repo':
      'move-repo 스킬이 에이전트에게 옛 주소로 가는 링크를 gh로 하나하나 찾게 합니다. 그다음 저장소를 옮기고 비공개로 바꾼 뒤 CI를 자체 호스팅 러너로 옮깁니다.',
    'CI and releases for every repo':
      'shell 스크립트가 GraphQL 호출 한 번으로 조직 각 저장소의 workflow를 읽습니다. 이어서 repo-ci 스킬이 빠진 Checks와 Release를 템플릿에서 추가합니다.',
    'Rotate secrets':
      'PowerShell 스크립트가 각 저장소의 시크릿 목록을 읽고 새 값을 gh로 저장합니다. 값은 사람이 복사하므로 에이전트는 보지 못합니다.',
    'Workflow rules':
      'Markdown 규칙 파일을 Claude Code, Codex, Kimi Code가 매 턴 불러옵니다. 각 작업이 불러올 스킬도 거기에 적혀 있습니다.',
    'MCP gateway':
      'mcpproxy가 서버 5개를 stdio 서버 하나 뒤에서 돌리고, 세션마다 데이터 폴더를 따로 줍니다. 에이전트는 도구를 검색한 뒤 호출합니다.',
    Releases:
      'main에서 check workflow가 통과하면 릴리스 workflow가 시작됩니다. shell 스크립트 2개가 날짜 태그를 정하고 노트를 씁니다.',
    'Feature queue':
      '각 세션이 이 PC 홈 폴더의 보드에 점유 파일을 씁니다. 파일이 겹치는 세션은 기다렸다가 다시 확인합니다.',
  },
};

export default arch;

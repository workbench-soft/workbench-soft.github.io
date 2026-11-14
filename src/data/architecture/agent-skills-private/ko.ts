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

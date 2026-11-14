import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'PC의 Node 서버가 Edge 앱 창에 웹 페이지를 제공합니다. 서버는 저장소와 실행을 읽고, 작업마다 코딩 에이전트가 있는 콘솔을 엽니다.',
  parts: [
    { name: 'Node 24', role: '서버를 TypeScript 그대로 실행하며, 패키지도 빌드 단계도 없습니다.' },
    { name: '웹 페이지', role: '탭마다 모듈 하나이며, PC의 Edge 앱 창에 표시됩니다.' },
    { name: '코딩 에이전트', role: 'Claude Code, Codex, Kimi Code 중 하나를 작업마다 콘솔에서 실행합니다.' },
    { name: 'adb', role: '연결된 휴대폰이나 TV에 앱을 설치하고 엽니다.' },
    { name: 'JSON 데이터 파일', role: 'Archon이 나열하는 저장소, 앱, 에이전트 작업.' },
    { name: 'Tailscale', role: '휴대폰에서 열 수 있게 Archon을 tailnet 안에 공개합니다.' },
    { name: 'PowerShell 스크립트', role: 'PC를 복구하고 작업 공간을 새 폴더로 옮깁니다.' },
    { name: '프레임 속 페이지', role: 'CI 상태 페이지, Reddit Desk, Memories 인덱서를 탭에 띄웁니다.' },
  ],
  flow: [
    '사용자가 저장소를 체크하고 작업을 고르거나 명령을 말합니다.',
    '페이지가 선택을 로컬 서버로 보냅니다.',
    '서버가 배치 파일을 쓰고 에이전트가 있는 콘솔을 엽니다.',
    '에이전트가 저장소에서 일하고 끝 표시를 남깁니다.',
    '페이지는 5초마다 실행을 조회하고 진행 상황을 보여 줍니다.',
  ],
  links: [
    { to: 'local-ci', text: 'CI 탭이 그 상태 페이지를 프레임에 띄우고, 꺼져 있으면 켭니다.' },
    { to: 'reddit-desk', text: 'Reddit 탭이 로컬 HTTP로 앱 창을 프레임에 띄웁니다.' },
    { to: 'memories', text: 'Memories 탭이 그 사진 인덱서의 진행 상황을 보여 줍니다.' },
    { to: 'songfactory', text: 'Songs 탭이 그 파이프라인 타일을 실행하고 각 실행을 보여 줍니다.' },
    {
      to: 'agent-skills-private',
      text: '그 규칙과 스킬이 Archon이 띄운 각 에이전트가 변경을 내보내는 방식을 정합니다.',
    },
  ],
  features: {
    'Ask Archon':
      'Edge가 음성을 글로 바꿉니다. 이어서 Haiku 기반 Claude Code가 런처 동작 하나를 고르고, 서버가 실행한 뒤 그 탭을 엽니다.',
    'Runs strip':
      '서버가 실행 목록을 관리하고 각 실행의 끝 표시를 읽습니다. 남은 시간은 같은 종류의 지난 실행의 중앙값입니다.',
    Apps: '카드는 JSON 목록과 스튜디오 릴리스 저장소의 최신 빌드로 만듭니다. adb가 휴대폰이나 TV에 설치하고 엽니다.',
    'Ads on this phone':
      '스크립트가 adb로 스튜디오의 각 앱에 잠금 해제 링크를 보냅니다. 키가 맞으면 앱이 자기 저장소에 이 휴대폰을 표시하고 광고 스위치를 정합니다.',
    'To do': '서버가 각 TODO.md 파일의 열린 항목을 읽습니다. 체크한 항목은 해당 저장소의 에이전트 콘솔로 갑니다.',
    Sessions:
      '서버가 Claude 앱 세션 파일과 Codex, Kimi Code 세션을 읽습니다. 이어 하기를 누르면 그 세션의 에이전트로 콘솔이 열립니다.',
    Agents:
      '저장소와 용도는 JSON 목록 하나에서, 작업은 다른 목록에서 옵니다. 체크한 저장소마다 그 작업을 맡은 에이전트 콘솔이 열립니다.',
    Docs: '서버가 각 저장소의 Markdown을 제공합니다. 페이지는 본문을 marked로, 다이어그램을 mermaid로 그립니다.',
    Rules:
      '서버가 공용 규칙 파일과 각 저장소의 AGENTS.md를 읽습니다. 규약이 요구하는 파일과 작업이 있는지 저장소마다 확인합니다.',
    Branches:
      'git이 각 저장소의 브랜치, worktree, stash를 PR과 함께 나열합니다. 삭제는 git에서 하고, 병합은 에이전트에게 넘깁니다.',
    Packages:
      '서버가 각 저장소의 패키지 파일을 살피고 npm, crates.io, PyPI에 최신 안정 버전을 묻습니다. 업데이트는 저장소마다 에이전트 콘솔로 갑니다.',
    'CI, Reddit and Memories':
      '각 탭은 다른 로컬 프로그램이 제공하는 페이지를 프레임에 띄웁니다. 페이지가 꺼져 있으면 Start가 그 프로그램을 켭니다.',
    Songs:
      '서버가 songfactory 테마를 읽고 각 타일을 자식 프로세스로 실행합니다. 단계와 로그는 그 프로세스의 출력에서 읽습니다.',
    Voices:
      '탭이 edge-tts 목소리를 나열하고 들려줍니다. Use for the agents는 고른 목소리로 turn-voice 훅 설치 스크립트를 다시 실행합니다.',
    Keys: 'rotate-secrets 스크립트가 각 CI 시크릿을 사용 기간과 함께 나열합니다. 갱신하면 콘솔이 열리고 Claude Code가 rotate-secrets 스킬을 실행합니다.',
    'Archon on the phone':
      'Tailscale serve가 로컬 서버를 tailnet 안에 공개합니다. 휴대폰은 페이지를 홈 화면에 추가해 앱처럼 씁니다.',
    'Restore a PC':
      'PowerShell 스크립트가 JSON 목록에 있는 각 항목을 되살립니다. PC에는 있는데 목록에 없는 항목이 있으면 점검 작업이 실패합니다.',
    'Move the workspace':
      'PowerShell 스크립트가 임시 사본에서 실행되어 폴더를 옮깁니다. 그다음 worktree 링크부터 예약 작업까지 옛 경로가 적힌 곳을 고칩니다.',
    'Sync the repos':
      'Node 스크립트가 JSON 목록에 있지만 폴더에 없는 저장소를 클론합니다. 나머지는 git으로 8개씩 가져옵니다.',
  },
};

export default arch;

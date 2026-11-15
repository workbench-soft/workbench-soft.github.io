import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'Rust 코어와 React 창으로 된 Windows용 Tauri 2 앱입니다. 코어가 Claude Code를 돌려 스레드를 찾고 초안을 쓰며, 게시할 때는 Chrome을 엽니다.',
  parts: [
    { name: 'Tauri 2', role: '창과 Rust 코어를 설치 파일 하나로 묶는 데스크톱 껍데기.' },
    { name: 'Rust 코어', role: 'Claude Code와 Chrome을 실행하고, JSON 파일을 보관하며 게시 속도를 제한합니다.' },
    { name: 'React와 Vite', role: 'Comments와 Posts 탭, 그리고 그 카드가 있는 창.' },
    { name: 'Claude Code', role: '저장소를 읽고 Reddit MCP 서버로 스레드를 가져와 초안을 씁니다.' },
    { name: 'chromiumoxide', role: 'Post it for me를 누르면 앱 전용 Chrome 창을 조작합니다.' },
    { name: 'axum', role: '같은 창을 로컬 HTTP로 제공해 Archon이 프레임에 띄울 수 있게 합니다.' },
    { name: 'i18next', role: '창의 9개 언어 카탈로그.' },
    { name: 'Tauri 업데이트 플러그인', role: '서명된 새 빌드를 찾아 설치합니다.' },
  ],
  flow: [
    '사용자가 저장소를 고르고 Find를 누릅니다.',
    '코어가 그 저장소에서 reddit-comments 스킬로 Claude Code를 시작합니다.',
    'Claude가 Reddit 서버로 인기 스레드를 읽고 초안을 파일에 씁니다.',
    '코어가 초안 6개를 남기고 카드로 보여 줍니다.',
    '사용자가 카드를 열면 Chrome에 스레드와 초안이 전달됩니다.',
  ],
  links: [
    { to: 'agent-skills', text: '그 reddit-comments 스킬이 스레드를 고르고 각 댓글의 말투를 정합니다.' },
    { to: 'archon', text: 'Archon의 Reddit 탭이 창을 프레임에 띄우고, 앱이 꺼져 있으면 켭니다.' },
    { to: 'Reddit', text: 'Claude는 MCP 서버로 스레드를 읽고, 게시는 사용자가 Chrome에서 합니다.' },
    { to: 'GitHub Releases', text: '설치 파일과 서명된 업데이트 파일은 공개 사이트 저장소의 릴리스에 있습니다.' },
  ],
  features: {
    'Repo picker':
      'Rust 코어가 설정의 루트 폴더 아래에 있는 각 git 폴더를 나열합니다. 선택은 앱 데이터 폴더의 JSON 파일에 저장됩니다.',
    Subreddits:
      '코어가 MCP 서버 없이 읽기 도구만으로 Claude Code를 실행합니다. Claude가 저장소를 보고 서브레딧을 정하고, 목록은 저장소별로 남습니다.',
    'Find threads':
      '코어가 저장소에서 reddit-comments 스킬과 Reddit MCP 서버로 Claude Code를 실행합니다. Claude가 스레드와 초안을 파일에 쓰고, 코어가 6개를 남깁니다.',
    'Steps on top': 'React 창이 찾기와 카드 상태를 보고 기다리는 단계에 불을 켭니다.',
    Cards: '카드는 코어가 쓰는 대기열 파일에서 옵니다. 입력란에서 포커스가 빠지면 수정 내용이 그 파일에 저장됩니다.',
    'Open in Chrome':
      '코어가 초안을 클립보드에 넣고 고른 프로필로 Chrome을 엽니다. 제한에 따라 게시한 댓글은 한 시간에 3개까지입니다.',
    'Post it for me':
      '코어가 디버그 포트가 열린 전용 Chrome을 띄우고 chromiumoxide로 조작합니다. 옛 Reddit 양식을 채우고 Save를 누른 뒤 댓글이 보이는지 확인합니다.',
    'Posts tab':
      'Claude Code가 체크한 저장소와 marketing 스킬을 읽고 게시물 초안을 파일에 씁니다. 코어는 3개를 남기고 파일이 없는 미디어를 뺍니다.',
    'Screenshots and videos':
      'Claude가 저장소의 스크린샷 폴더에서 캡션을 보고 파일을 4개까지 고릅니다. 파일을 누르면 탐색기에서 보여 줍니다.',
    'Open a post':
      '코어가 Chrome에서 옛 Reddit 게시 페이지를 열고 제목과 본문을 주소에 넣습니다. 미디어가 있는 게시물은 첫 파일을 탐색기에서 보여 줍니다.',
    'Ban risk':
      'Rust 모듈이 게시물과 댓글 기록 파일로 다음 게시물을 평가합니다. 규칙은 marketing 스킬에서 왔으며, 예를 들어 하루에 커뮤니티 하나입니다.',
    'Tester post': '코어가 Google Group 링크와 패널의 앱 줄로 템플릿을 채웁니다. Claude를 실행할 필요는 없습니다.',
    'Inside Archon':
      '코어가 axum으로 같은 창과 명령을 로컬 HTTP로 제공합니다. Archon이 이를 프레임에 띄우고, 탭을 닫은 지 2분 뒤 앱이 종료됩니다.',
    'Info button': '창의 대화 상자가 Find에 필요한 것과 밴 위험 규칙을 알려 줍니다. 버전과 업데이트 확인도 있습니다.',
    Updates:
      'Tauri 업데이트 플러그인이 시작할 때와 24시간마다 GitHub 릴리스에서 서명된 업데이트 파일을 읽습니다. 설치 파일을 실행하기 전에 서명을 확인합니다.',
    Language:
      'i18next가 창에 9개 카탈로그를 둡니다. 선택은 설정 파일에 저장되므로 Tauri 창과 Archon 프레임이 함께 씁니다.',
    'Done list':
      '게시하거나 건너뛴 스레드는 날짜와 함께 기록 파일로 옮겨집니다. 다음 Find가 이를 Claude에 넘겨 건너뛰게 합니다.',
  },
};

export default arch;

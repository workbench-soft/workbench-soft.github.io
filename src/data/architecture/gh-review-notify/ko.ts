import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'Mac에서 bash 스크립트 하나가 돌고, launchd 에이전트가 3분마다 실행합니다. gh CLI로 GitHub를 읽고 새 이벤트를 알림 센터에 띄웁니다.',
  parts: [
    { name: 'launchd 에이전트', role: '180초마다 스크립트를 실행하고, Mac이 깨어나면 놓친 실행을 채웁니다.' },
    { name: 'bash 스크립트', role: 'PR을 찾고, 리뷰와 댓글을 읽고, 걸러서 알림을 보냅니다.' },
    { name: 'GitHub CLI', role: 'gh가 이미 가진 로그인으로 GitHub를 호출하므로, 도구는 토큰을 저장하지 않습니다.' },
    { name: 'jq', role: 'GitHub의 JSON 응답을 읽습니다.' },
    { name: 'terminal-notifier', role: '알림을 띄우고 클릭하면 댓글을 엽니다. 없으면 osascript를 씁니다.' },
    {
      name: '캐시 파일',
      role: '사용자 캐시 폴더의 단순한 파일로, 이미 보인 이벤트와 각 PR의 마지막 업데이트를 담습니다.',
    },
  ],
  flow: [
    'launchd가 스크립트를 실행하고, 잠금이 두 번째 실행을 막습니다.',
    'gh가 최근 3일 안에 업데이트된 내 열린 PR을 찾습니다.',
    '스크립트는 바뀐 PR의 리뷰와 댓글만 읽습니다.',
    '이미 보인 목록에 있는 이벤트는 빠집니다.',
    'terminal-notifier가 나머지를 띄우고, 클릭하면 댓글이 열립니다.',
  ],
  links: [
    { to: 'GitHub', text: '각 PR, 리뷰, 댓글의 출처로, gh CLI로 읽습니다.' },
    { to: 'Homebrew', text: '설치할 때 jq와 terminal-notifier를 설치합니다.' },
  ],
  features: {
    'Review and comment notifications':
      'gh가 내가 만들거나 리뷰하거나 참여한 열린 PR을 찾고, 바뀐 각 PR의 리뷰와 댓글을 읽습니다. 새 이벤트마다 알림이 됩니다.',
    'Review requests':
      'GitHub 조회에서 나를 지목한 요청은 남기고 팀에 보낸 요청은 버립니다. 실패한 조회는 캐시에 들어가지 않아, 다음 실행이 다시 묻습니다.',
    'Comment bursts':
      '알리기 전에 스크립트가 PR별로 새 댓글을 셉니다. 4개를 넘으면 개수와 이름이 담긴 알림 1개로 묶이고, 클릭하면 PR이 열립니다.',
    'Quiet first run':
      '캐시가 없으면 스크립트는 최근 3일의 이벤트를 이미 보인 목록에 쓰고 하나도 띄우지 않습니다. 첫 실행이 실패하면 캐시는 비어 있고, 다음 실행이 다시 시작합니다.',
    'Bot filter':
      '스크립트는 이벤트를 비교하기 전에 봇 계정의 댓글을 버립니다. 설치할 때 준 설정이 launchd 에이전트에 들어가 다시 켭니다.',
    'Status and test':
      '플래그 하나는 에이전트 상태, 계정, 마지막 실행, 설정을 출력합니다. 다른 플래그는 같은 알림 경로로 테스트 알림을 보냅니다.',
    Releases:
      'main에 push가 shellcheck를 통과하면 GitHub Actions 워크플로가 날짜 버전 태그를 붙입니다. 노트에는 지난 릴리스 이후 커밋이 나옵니다.',
  },
};

export default arch;

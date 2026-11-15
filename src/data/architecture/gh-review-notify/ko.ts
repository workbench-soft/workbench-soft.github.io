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
  design: {
    scale: [
      '한 사람이 Mac 한 대에서 씁니다. 검색 범위는 최근 3일 안에 갱신된 열린 PR입니다.',
      '첫 실행 뒤의 실행은 10초가 안 걸립니다. updatedAt이 움직인 PR만 다시 열기 때문입니다.',
      '도구는 400줄이 안 되는 bash 파일 하나입니다.',
    ],
    data: [
      '사용자 캐시 폴더의 일반 파일은 seen.txt, pr-updated.tsv, review-requests.tsv와 잠금 폴더입니다.',
      'seen.txt는 최근 3000개의 이벤트 키를 둡니다. 키는 리뷰나 댓글의 URL입니다.',
      '비공개 PR의 URL이 들어 있어서 폴더는 본인 계정만 읽을 수 있습니다.',
    ],
    interfaces: [
      'gh search prs와 gh api가 GitHub를 읽고, jq가 JSON 응답을 읽습니다.',
      'terminal-notifier가 알림을 띄우고 클릭하면 댓글을 엽니다. 없으면 osascript를 씁니다.',
      'launchd가 180초마다 에이전트를 시작합니다. GH_REVIEW_NOTIFY_INTERVAL과 GH_REVIEW_NOTIFY_BOTS로 간격과 봇 필터를 바꿉니다.',
    ],
    reliability: [
      '잠금 폴더가 있어서 두 번째 실행은 곧바로 끝납니다.',
      'PR 검색이 실패하면 캐시 파일을 바꾸기 전에 멈추고, 리뷰 요청 조회가 실패해도 캐시에 넣지 않아 다음 실행이 다시 묻습니다.',
      '이벤트는 최대 3분 늦게 나타나고, Mac이 깨어 있을 때만입니다. 깨어난 뒤에는 launchd가 따라잡습니다.',
    ],
    security: [
      'gh auth의 로그인을 쓰므로 도구는 토큰을 저장하지 않습니다.',
      '캐시 파일은 본인 계정만 읽을 수 있습니다.',
      'Mac에서 github.com을 폴링하므로 웹훅도 공개 주소도 그 기기에 닿지 않습니다.',
    ],
    performance: [
      '리뷰와 댓글은 updatedAt이 움직인 PR만 읽고, 처음 채울 때는 모든 PR을 읽습니다.',
      '팀 앞 리뷰 요청은 버리고, 한 PR의 댓글이 4개를 넘으면 알림 하나로 접습니다.',
      'grep과 awk가 각 이벤트 키를 seen.txt와 맞춰 보며 데이터베이스는 쓰지 않습니다.',
    ],
    operations: [
      'install.sh는 스크립트를 로컬 bin 폴더에 복사하고 plist를 쓰고 에이전트를 올립니다. uninstall.sh는 그 반대입니다.',
      'tests/run.sh는 준비한 GitHub 응답으로 스크립트를 돌리며 gh, date, terminal-notifier의 대역을 씁니다.',
      '검사는 GitHub의 macOS 러너에서 돌고, 통과한 푸시마다 날짜 릴리스가 붙습니다. 설치는 최신 main을 가져옵니다.',
    ],
    tradeoffs: [
      '이메일, Slack 앱, 웹훅 대신 3분 폴링을 써서 서버와 공개 주소가 없고, 대가는 최대 3분의 지연입니다.',
      '토큰을 쓰는 curl 대신 gh CLI를 써서 저장할 토큰이 없습니다. gh 로그인이 풀리면 도구가 멈춥니다.',
      'TypeScript나 Rust 대신 bash 파일 하나로 빌드 없이 복사만 하면 되고, 테스트에는 대역이 필요합니다.',
      'SQLite 대신 일반 파일로 두어 bash는 grep과 awk만 있으면 됩니다. 새 형식에는 새 파일 이름이 필요합니다.',
    ],
  },
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

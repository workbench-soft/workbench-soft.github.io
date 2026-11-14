import type { Arch } from '../types';

const arch: Arch = {
  summary:
    '각 별칭은 한 git 저장소에 있는 bash 스크립트입니다. git 설정의 include가 클론을 가리켜서, pull 한 번이면 머신의 각 별칭이 업데이트됩니다.',
  parts: [
    { name: 'bash 스크립트', role: '별칭마다 스크립트 하나. macOS, Linux, Windows에서 git에 딸린 bash가 실행합니다.' },
    { name: 'git 설정 include', role: '각 별칭 이름을 스크립트에 연결하고 git이 클론을 가리키게 합니다.' },
    { name: 'fzf', role: '브랜치와 worktree를 고르는 퍼지 검색 메뉴.' },
    { name: 'zsh와 PowerShell 함수', role: '브랜치 전환이 내보낸 폴더 줄을 실제 폴더 이동으로 바꿉니다.' },
    { name: '설치 스크립트', role: 'macOS와 Linux용 하나, Windows용 하나. git 설정, 셸, 훅을 준비합니다.' },
    { name: 'shellcheck와 shfmt', role: '커밋 훅과 CI에서 각 스크립트를 검사합니다.' },
    {
      name: 'GitHub Actions',
      role: 'Linux와 Windows에서 lint와 테스트를 돌리고, main에 통과한 각 push에 태그를 붙입니다.',
    },
  ],
  flow: [
    '사용자가 git co 같은 짧은 명령을 입력합니다.',
    'git이 포함된 설정에서 별칭을 찾아 스크립트를 실행합니다.',
    '스크립트는 git을 부르고, 골라야 할 때는 fzf도 부릅니다.',
    '셸 함수가 폴더 줄을 폴더 이동으로 바꿉니다.',
    '결과는 터미널에 나오고, 저장소는 git으로 바뀝니다.',
  ],
  links: [{ to: 'GitHub', text: '저장소를 두고, 검사를 돌리고, 날짜가 붙은 릴리스를 냅니다.' }],
  features: {
    Aliases:
      '설정 파일이 각 별칭 이름을 클론 안의 bash 스크립트에 연결합니다. git a는 각 스크립트 맨 위의 주석을 읽어 목록을 출력합니다.',
    'Switch branch folders':
      'git sb는 worktree를 포함한 로컬 브랜치를 fzf에 보여 줍니다. 스크립트가 경로를 출력하면 zsh나 PowerShell 함수가 셸과 VS Code 창을 그곳으로 옮깁니다.',
    'Delete branches and worktrees':
      'git db는 fzf에서 고르고, git dbm은 원격 브랜치가 사라진 브랜치를 찾습니다. 공용 도우미가 각 worktree와 브랜치를 지우고, 변경이 있는 worktree를 강제로 지우기 전에 묻습니다.',
    Installer:
      'macOS와 Linux는 셸 설치 스크립트, Windows는 PowerShell 설치 스크립트가 git 설정에 include를 씁니다. 고치는 각 파일은 먼저 날짜가 붙은 사본을 남깁니다.',
    'Lint hook':
      '설치 스크립트가 git 훅을 저장소 안의 폴더로 돌립니다. 각 커밋은 shellcheck, shfmt, 저장소 규칙을 돌리고, 스테이징된 파일에 oxfmt와 markdownlint를 돌립니다.',
    'Reset to the default branch':
      '스크립트는 원격의 HEAD에서 기본 브랜치를 읽고, fetch한 뒤 그 브랜치로 하드 리셋합니다. 로컬 변경이나 push하지 않은 커밋이 사라질 때는 먼저 묻습니다.',
    Releases:
      'main에서 lint가 통과하면 GitHub Actions 워크플로가 시작됩니다. 다음 날짜 버전을 고르고, 지난 태그 이후 커밋으로 노트를 씁니다.',
  },
};

export default arch;

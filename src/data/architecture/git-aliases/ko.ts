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
  design: {
    scale: [
      '개발자 한 명이 몇 대의 기기에서 쓰고, 서버는 없습니다. 각 별칭은 bin/의 bash 스크립트 하나입니다.',
      '부하는 별칭당 git 호출 몇 번이라서, 한계는 스크립트가 아니라 git과 저장소가 정합니다.',
    ],
    data: [
      '별칭은 자체 상태를 두지 않고, git으로 저장소를 읽고 바꿉니다.',
      '설치 프로그램은 gitaliases.dir와 include.path를 사용자 git 설정에, 함수를 zsh나 PowerShell 프로필에 씁니다.',
      'aliases.gitconfig가 각 별칭 이름을 클론 안의 스크립트에 연결합니다.',
    ],
    interfaces: [
      'git은 별칭을 자식 프로세스로 실행하므로, 스크립트는 인자를 받고 터미널에 출력합니다.',
      'git sb는 경로가 든 __cd__ 줄을 stdout에 내고, zsh나 PowerShell 함수가 그것을 cd로 바꿉니다.',
      'fzf가 선택 화면을 그리고, 스크립트는 보조 파일 _shared.sh와 _prune.sh를 불러옵니다.',
    ],
    reliability: [
      '각 스크립트는 set -euo pipefail로 돌아서, git 호출이 실패하면 별칭이 멈춥니다.',
      '브랜치와 worktree 삭제는 메인 worktree, 현재 폴더, 잠긴 worktree를 건너뜁니다.',
      '선택 화면에서 Esc를 누르면 아무것도 지우지 않고 별칭이 끝납니다.',
    ],
    security: [
      '바깥 서비스는 git 원격뿐입니다. 스크립트는 토큰을 저장하지 않고 API도 부르지 않습니다.',
      '설치 프로그램은 바꾸기 전마다 묻고, 고칠 파일을 먼저 복사합니다.',
      '삭제 별칭은 후보를 보여 주고 사람이 고른 것만 지웁니다.',
    ],
    performance: [
      '각 별칭은 git 호출 몇 번을 가진 bash 프로세스 하나이고, pull 한 번으로 모두 갱신됩니다.',
      '정리 목록은 for-each-ref 한 번과 worktree 목록에서 만들고, one_line은 printf -v를 씁니다. worktree마다 명령 치환을 하면 fork 비용이 들기 때문입니다.',
    ],
    operations: [
      'lint.sh는 shellcheck와 shfmt를 돌리고 각 별칭에 스크립트, 설명, README 행이 있는지 확인합니다. test.sh는 임시 저장소에서 별칭을 실행합니다.',
      'pre-commit과 pre-push 훅이 mise run lint를 실행하고, lint.yml이 Linux와 Windows 러너에서 실행합니다.',
      'main에 검사를 통과한 푸시마다 v2026.10.30.1 같은 날짜 릴리스가 붙습니다.',
    ],
    tradeoffs: [
      '인라인 ! 별칭이나 셸 함수 대신 별칭마다 bash 스크립트를 두어 shellcheck와 테스트가 닿게 했고, 대가는 별칭마다 파일 하나입니다.',
      'TypeScript나 Rust 대신 bash를 골랐습니다. git이 모든 시스템에 bash를 싣고 있어 어떤 기기에도 Node가 필요 없기 때문입니다.',
      '복사한 별칭 대신 클론을 가리키는 include를 써서 git pull로 갱신합니다. 클론을 옮기면 깨집니다.',
      '설치 프로그램을 하나가 아닌 둘로 둔 것은 프로필을 고쳐야 하는 쪽이 PowerShell뿐이기 때문이며, 대가는 두 벌을 맞춰 유지하는 일입니다.',
    ],
  },
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

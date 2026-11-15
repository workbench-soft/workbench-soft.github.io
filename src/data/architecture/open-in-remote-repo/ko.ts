import type { Arch } from '../types';

const arch: Arch = {
  summary:
    '로컬 git으로 각 링크를 만드는 VS Code 확장입니다. 호스트에 요청을 보내지 않고, 링크를 브라우저에서 열거나 복사합니다.',
  parts: [
    { name: 'VS Code API', role: '명령 8개와 메뉴를 등록하고, 설정과 선택 영역을 읽습니다.' },
    { name: 'git', role: '저장소 루트, 원격 URL, 브랜치를 알려 줍니다. 호출마다 10초 제한이 있습니다.' },
    { name: '링크 빌더', role: '원격을 각 호스트의 파일, blame, 기록 링크로 바꾸는 순수 TypeScript.' },
    { name: 'vscode.env', role: '로컬과 원격 창 모두에서 링크를 브라우저로 열거나 클립보드에 넣습니다.' },
    { name: 'vscode.l10n', role: '명령, 설정, 메시지를 9개 언어로 번역합니다.' },
    { name: 'esbuild', role: '코드를 파일 하나로 묶어 확장이 빨리 뜨게 합니다.' },
    { name: 'GitHub Actions', role: '검사와 나란히 .vsix를 만들고, 검사가 통과하면 공개합니다.' },
  ],
  flow: [
    '사용자가 팔레트, 편집기, 탐색기에서 명령을 실행합니다.',
    '확장이 git으로 파일의 저장소 루트를 찾습니다.',
    'git이 원격 URL과 파일이 있는 브랜치를 돌려줍니다.',
    '링크 빌더가 선택한 줄을 담아 그 호스트의 URL을 씁니다.',
    'VS Code가 브라우저에서 열거나 알림과 함께 복사합니다.',
  ],
  links: [
    { to: 'GitHub', text: '포크와 .vsix가 담긴 릴리스를 둡니다. 기본은 GitHub 링크입니다.' },
    { to: 'GitLab and Bitbucket', text: 'GitHub와 함께 쓰는 링크 대상으로, API 호출 없이 원격 URL로 만듭니다.' },
    { to: 'Visual Studio Marketplace', text: '확장을 등록해 둡니다. 그곳 게시는 매번 손으로 합니다.' },
  ],
  design: {
    scale: [
      'VS Code 창마다 한 사람, 클릭마다 링크 하나이므로 일은 저장소 하나에 대한 몇 번의 git 호출입니다.',
      '로컬, SSH, 컨테이너 창에서 돌고, git 호출은 10초 뒤에 멈춰서 느린 리모트가 편집기를 멈추게 하지 않습니다.',
    ],
    data: [
      '확장은 상태를 두지 않습니다. 각 명령이 설정, 선택 영역, git을 읽어 링크를 만들고 곧 잊습니다.',
      'openInGitHub 설정과 리모트 URL이 호스트, 브랜치, 매핑된 주소를 정합니다.',
    ],
    interfaces: [
      '명령은 팔레트, 편집기 메뉴, 탐색기 메뉴에서 오며 8개이고, 모두 같은 링크 실행기를 부릅니다.',
      'git은 execFile로 저장소 루트, 리모트 URL, 브랜치를 주고, 링크 빌더가 호스트마다 파일, blame, 기록 URL을 만듭니다.',
      'vscode.env.openExternal이 브라우저를 열고 vscode.env.clipboard가 복사하므로 둘 다 원격 창에서 동작합니다.',
    ],
    reliability: [
      '브랜치 확인은 설정, 리모트 HEAD, main, master 순으로 시도하고, 그다음 현재 브랜치나 HEAD가 분리된 경우 그 커밋으로 돌아갑니다.',
      'git이 실패하면 git 자체의 메시지를 보여 주고, git은 터미널에서 비밀번호를 묻지 않습니다.',
    ],
    security: [
      '확장은 호스트에 요청을 보내지 않으므로 GitHub, GitLab, Bitbucket에 토큰도 로그인도 필요 없습니다.',
      'git은 셸 없이 execFile로 돌아서 defaultRemote 설정이 명령을 실행할 수 없습니다.',
    ],
    performance: [
      'esbuild가 소스를 파일 하나로 묶어 패키지가 작아지고 로딩이 빨라졌습니다.',
      'git 호출은 execFile을 거치는 짧은 프로세스이고 10초 제한이 있어서 클릭 한 번의 비용은 작은 프로세스 몇 개입니다.',
    ],
    operations: [
      'push마다 Checks가 lint, 타입 검사, 단위 테스트, 빌드를 돌리고, 릴리스 워크플로가 옆에서 .vsix를 빌드합니다.',
      'Checks가 통과하면 게이트 스크립트가 빌드를 게시하고, Checks가 실패하면 취소합니다. Marketplace 게시는 수동으로 남습니다.',
      'git과 links의 순수 TypeScript는 mise run test로 Node에서 돌고, VS Code 테스트 창이 필요한 것은 편집기 연결 코드뿐입니다.',
    ],
    tradeoffs: [
      '호스트별 REST API 대신 로컬 git으로 링크를 만들어 토큰도 클릭마다의 네트워크 호출도 없습니다. 링크로는 파일이 호스트에 있는지 확인할 수 없습니다.',
      'open 패키지 대신 vscode.env.openExternal을 골랐습니다. open은 users.$id.tsx 같은 이름을 망가뜨렸고 SSH 창에서 브라우저를 열지 못했습니다.',
      '다시 쓰는 대신 기존 확장을 포크해서 호스트 링크 코드와 테스트를 그대로 두었습니다. 새 id라서 사용자는 다시 설치해야 합니다.',
    ],
  },
  features: {
    'Open a file, blame or history link':
      '명령이 편집기에서 파일과 선택한 줄을, git에서 원격을 읽습니다. 호스트 모듈이 링크를 쓰고 VS Code가 브라우저에서 엽니다.',
    'Copy a link':
      '같은 링크가 VS Code 클립보드로 가서, 원격 창에서도 로컬 클립보드가 채워집니다. 알림에 URL이 나옵니다.',
    'Links from the Explorer': '탐색기 메뉴가 파일이나 폴더를 같은 명령에 넘깁니다. 링크에 줄 앵커는 붙지 않습니다.',
    'Main or master first':
      'git이 설정, 원격 HEAD, main, master 순서로 파일이 있는 브랜치를 찾습니다. 맞는 것이 없으면 현재 브랜치를 씁니다.',
    'Hosts and mapped URLs':
      '호스트는 설정이나 원격 URL로 정해집니다. 매핑 설정이 링크를 쓰기 전에 원격 URL을 바꿉니다.',
    Languages:
      'vscode.l10n이 VS Code 표시 언어로 카탈로그를 고릅니다. 명령 이름과 설정은 패키지 카탈로그 9개에서 옵니다.',
  },
};

export default arch;

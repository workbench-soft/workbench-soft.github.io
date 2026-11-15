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

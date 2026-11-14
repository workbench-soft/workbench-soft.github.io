import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'Langflip은 Windows와 macOS용 Rust 프로그램 하나이며 서버가 없습니다. 핵심 crate가 단어마다 판단하고, 시스템마다 얇은 계층이 키를 잡아 수정을 입력합니다.',
  parts: [
    { name: 'langflip-core', role: '2가지 자판 배열, 언어 모델, 그대로 둘지 고칠지의 판단을 담은 Rust crate.' },
    { name: 'Windows 훅', role: '저수준 키보드와 마우스 훅이 어느 앱에서든 키를 보고 수정을 Unicode로 보냅니다.' },
    { name: 'macOS 이벤트 탭', role: 'Mac에서 같은 일을 하고, 배열은 입력 소스로 다룹니다.' },
    { name: '언어 모델', role: '언어마다 세 글자 조합 점수와 사전. wordfreq로 만들어 exe에 넣습니다.' },
    { name: 'tray-icon', role: '현재 배열을 보여 주는 트레이 아이콘과 두 시스템의 메뉴.' },
    { name: 'rust-i18n', role: '메뉴와 도움말의 9개 언어 문구를 프로그램 안에 넣습니다.' },
    { name: 'ureq와 self-replace', role: 'GitHub Releases에서 업데이트를 확인하고 실행 중인 exe를 바꿉니다.' },
  ],
  flow: [
    '저수준 훅이 앞에 있는 앱에서 누른 키를 하나씩 잡습니다.',
    '훅은 물리 키를 위치로 바꿉니다. 지금 배열과는 상관없습니다.',
    '핵심이 모델로 두 배열의 글자에 점수를 매깁니다.',
    '다른 배열이 이기면 훅이 그 키를 삼킵니다.',
    'Langflip이 단어를 지우고 다른 배열로 다시 입력한 뒤 배열을 바꿉니다.',
  ],
  links: [
    {
      to: 'GitHub Releases',
      text: 'Windows용 exe는 여기서 배포됩니다. Langflip은 하루 한 번 새 버전을 확인하고 자기 버전만 보냅니다.',
    },
  ],
  features: {
    'Fix the layout of a word':
      '4번째 글자부터 핵심이 입력한 글자와 다른 배열의 같은 키를 비교합니다. 모델이 둘 다 점수를 매기고, 확실히 이긴 쪽으로 다시 입력합니다.',
    'Short words': '1~3글자는 점수가 불안정해서 핵심은 사전만 봅니다. 수정은 Space, Enter, Tab을 기다립니다.',
    'Digits kept':
      '숫자는 두 배열에서 똑같이 입력되므로 단어 버퍼가 제자리에 둡니다. 사전에는 mp3처럼 숫자가 든 단어도 있습니다.',
    'Undo a fix':
      '핵심은 마지막 단어를 입력한 그대로 기억하고, 되돌리기가 그것을 다시 입력합니다. 같은 단어를 2번 되돌리면 예외 목록에 들어갑니다.',
    'Convert by hand':
      '핵심은 입력 중인 단어나 마지막 단어를 들고 있습니다. 단축키는 확인 없이 그 단어를 다른 배열로 바꿉니다.',
    'Skip apps and fields':
      '시스템 계층이 앞에 있는 앱을 설정 파일의 목록과 비교합니다. 비밀번호 칸과 관리자 창은 시스템 신호로 알아봅니다.',
    'The current layout on the icon':
      'Windows 계층이 창과 포커스 변화를 따라가며 앞에 있는 창의 배열을 읽습니다. tray-icon이 아이콘에 EN이나 RU를 그립니다.',
    'Pause with a click': '클릭하면 수정이 꺼지고 훅은 키를 그대로 통과시킵니다. 트레이는 아이콘을 회색으로 그립니다.',
    'Switch the layout with a double click':
      'Windows에서는 Langflip이 앞에 있던 창을 다시 불러와 배열 변경을 요청합니다. Mac에서는 입력 소스를 바꿉니다.',
    'Start at login':
      'Windows에서는 Run 키 항목이 Langflip을 시작하고 작업 스케줄러 작업이 예비로 받칩니다. Mac에서는 실행 에이전트가 맡습니다.',
    'Settings file':
      '앱 데이터 폴더의 TOML 파일에 스위치, 제외한 앱, 남길 단어, 메뉴 언어가 들어 있습니다. Langflip은 다음 창 전환 때 다시 읽습니다.',
    'Go on with a word':
      'Windows에서는 클릭이나 입력 칸 이동 뒤 UI Automation이 커서 앞 단어를 읽습니다. 핵심은 새 글자를 그 단어의 나머지로 판단합니다.',
    'The app icon': '아이콘의 원본은 SVG 하나입니다. 빌드가 exe에 넣고, 설치 스크립트가 바로 가기에 붙입니다.',
    'Install on Windows':
      '스크립트가 Cargo로 exe를 빌드해 사용자의 프로그램 폴더에 복사합니다. 관리자 권한 없이 바로 가기와 설정의 앱 항목을 추가합니다.',
    'Tray menu':
      'tray-icon이 Windows와 macOS에서 같은 메뉴를 그립니다. rust-i18n이 시스템 언어나 고른 언어로 9개 언어 문구를 줍니다.',
    'Decision log':
      'Windows 계층이 판단마다 키 수, 앱, 이유를 로그에 씁니다. 입력한 글자는 쓰지 않고, 1 MB가 되면 새 파일로 바뀝니다.',
    'Update from GitHub':
      '스레드가 하루 한 번 ureq로 GitHub 릴리스 목록을 묻습니다. 클릭 뒤 크기와 SHA-256을 확인하고, self-replace가 실행 중인 exe를 바꿉니다.',
  },
};

export default arch;

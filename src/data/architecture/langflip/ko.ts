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
  design: {
    scale: [
      'PC나 Mac 한 대에 한 사람이 씁니다. 입력한 글자는 기기에 남고, 설치는 exe 하나가 전부입니다.',
      '모델은 영어와 러시아어 2개 언어를 다루며, 각각 상위 10만 단어 사전과 글자 3개 묶음 표를 갖습니다.',
      '레이아웃은 US QWERTY와 러시아어 ЙЦУКЕН 2개뿐입니다. 훅은 콜백 안에서 답해야 하므로 판단은 마이크로초가 걸립니다.',
    ],
    data: [
      '설정은 앱 데이터 폴더의 settings.toml에 있습니다. 모델 파일은 바이너리에 들어 있습니다.',
      '모델 파일은 매직 값 LFM1로 시작하고, 언어마다 알파벳, f32 글자 3개 묶음의 로그 확률, 사전이 이어집니다.',
      'Windows 로그는 키 횟수, 앱 이름, 판단을 글자 없이 기록하며 1 MB 파일이 langflip.old.log로 넘어갑니다.',
    ],
    interfaces: [
      '코어 crate는 키 위치와 쓰는 레이아웃을 받아 수정 또는 수정 없음을 돌려줍니다. 두 시스템 계층 모두 이를 호출합니다.',
      'Windows는 WH_KEYBOARD_LL과 WH_MOUSE_LL 훅, 수정에는 SendInput, 레이아웃에는 WM_INPUTLANGCHANGEREQUEST를 씁니다.',
      'macOS는 세션 CGEventTap, 수정에는 CGEvent 전송, 레이아웃에는 Text Input Sources를 씁니다.',
      '업데이트 확인은 하루에 한 번 GitHub releases API에서 langflip-v* 태그를 읽고 자기 버전만 보냅니다.',
    ],
    reliability: [
      '수정이 보내는 이벤트에는 Langflip 태그가 붙어 훅이 통과시킵니다. 수정 중에 친 키는 기다렸다가 종료 표시 뒤에 다시 재생됩니다.',
      '보류된 키는 창이 새 레이아웃을 받을 때까지 최대 500 ms 기다리고, 멈춘 수정은 1초 뒤에 키를 놓아 줍니다.',
      '되돌리기는 친 그대로 단어를 다시 입력하고, 같은 단어를 한 번 더 되돌리면 유지 목록에 들어갑니다.',
      '자동 시작은 Run 키 항목이며, 탐색기가 Run 키를 건너뛸 때를 위해 작업 스케줄러 작업이 받쳐 줍니다.',
    ],
    security: [
      '서버도 계정도 없습니다. 네트워크 호출은 업데이트 확인뿐이며 입력한 글자는 싣지 않습니다.',
      '비밀번호 칸과 관리자 창은 건너뛰고, 설정 파일에 건너뛸 앱을 더 적을 수 있습니다.',
      '로그에는 글자가 없습니다. 관리자 권한으로 실행하지 않으면 상승된 창에는 닿지 않고, macOS는 손쉬운 사용과 입력 모니터링 권한이 필요합니다.',
      '업데이트 교체는 HTTPS와 파일 크기만 확인하고 서명은 없으며, exe도 서명되지 않았습니다.',
    ],
    performance: [
      '코어는 표 조회로 마이크로초 안에 단어를 채점하며 훅 콜백 안에서 가비지 컬렉터 멈춤이 없습니다.',
      '4번째 글자부터 엔진이 입력하는 동안 단어를 확인하므로 수정은 단어가 끝나기 전에 도착합니다.',
      '모델은 내장되어 있고 정렬된 단어 목록은 약 20 ms에 로드됩니다. 모든 단어 시작의 집합은 시작할 때마다 0.4초가 걸려 탈락했습니다.',
      'caret.rs는 UI Automation으로 전용 스레드에서 클릭 40 ms 뒤에 캐럿 앞 최대 40자를 읽습니다.',
    ],
    operations: [
      'mise run lint는 rustfmt, clippy, cargo shear, ruff, shellcheck, actionlint를 포함하고, CI는 Windows에서 macOS 빌드를 확인합니다.',
      'mise run eval은 언어마다 사전 단어 1만 개와 드문 단어 1만 개로 잘못된 수정과 놓침을 잽니다.',
      '릴리스 워크플로는 LANGFLIP_VERSION으로 넘긴 날짜 버전으로 langflip.exe를 GitHub Releases에 게시합니다.',
      '앱은 새 릴리스를 확인하고 먼저 물은 뒤 self-replace가 실행 중인 exe를 바꿉니다. mise run install은 관리자 권한이 필요 없습니다.',
    ],
    tradeoffs: [
      '섞인 crate 하나 대신 Rust 코어 crate와 시스템별 얇은 계층을 써서 코어 테스트를 어떤 OS에서도 돌리지만, 수정을 두 번 만들어야 합니다.',
      '훅 DLL 대신 Langflip 자체 프로세스 안의 저수준 훅을 써서 다른 앱에 코드를 올리지 않지만, 상승된 창에는 닿지 않습니다.',
      '사전만 쓰는 대신 글자 3개 묶음과 사전을 써서 모르는 단어도 잡지만, 드문 단어는 일찍 바뀔 수 있고 되돌리기로 고칩니다.',
      '시스템에서 아무 레이아웃이나 읽는 대신 2개 레이아웃의 정적 표를 써서 Windows와 macOS가 같은 글자를 내지만, 다른 레이아웃은 동작하지 않습니다.',
    ],
  },
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
    'Welcome on the first start':
      'Windows에서 처음 실행하면 작업 대화 상자가 별도 스레드에서 단축키를 알려 줘서 후크가 메시지를 놓치지 않아요. 툴팁은 화면 읽기 프로그램을 위해 배열을 적어요.',
  },
};

export default arch;

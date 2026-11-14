import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'Kotlin으로 만든 Android 앱이 스튜디오의 공개 GitHub 릴리스를 읽고 각 APK를 Shizuku로 설치합니다. 자체 서버는 없습니다.',
  parts: [
    { name: 'Kotlin과 Android Views', role: '앱마다 카드가 있고 당겨서 새로 고치는 단순한 View 화면 하나.' },
    { name: 'GitHub Releases API', role: '각 앱의 최신 APK와 노트, 커밋을 가져오는 곳.' },
    { name: 'Shizuku', role: '각 설치를 shell 사용자로 실행해 Android가 확인 창을 띄우지 않습니다.' },
    { name: 'Android 패키지 관리자', role: '설치된 각 앱의 이름과 패키지 이름, 버전을 알려 줍니다.' },
    { name: '업데이트 실행', role: '대기열을 화면 밖에 두고 각 APK를 조각으로 내려받습니다.' },
    { name: 'Shared preferences', role: '마지막 릴리스 목록과 실행 중에 알아낸 패키지 이름을 저장합니다.' },
    { name: '스튜디오 카탈로그', role: '스튜디오 사이트의 JSON 파일로 각 프로젝트의 이름과 플랫폼을 담습니다.' },
  ],
  flow: [
    '사용자가 앱을 열거나 돌아오거나 목록을 아래로 당깁니다.',
    '앱은 GitHub의 릴리스 페이지를 읽거나 10분이 안 된 목록을 씁니다.',
    '각 APK를 이름이나 패키지 이름으로 설치된 앱과 맞춥니다.',
    '스튜디오 카탈로그가 카드 이름을 붙이고 APK 없는 프로젝트를 더합니다.',
    '탭하면 APK를 내려받고 Shizuku가 확인 없이 설치합니다.',
    '업데이터는 자신을 마지막에 설치하고 휴대폰이 다시 엽니다.',
  ],
  links: [
    { to: 'GitHub', text: '공유 공개 릴리스 저장소에 각 앱의 APK가 있어 휴대폰에 토큰이 필요 없습니다.' },
    { to: 'Shizuku', text: 'Shizuku 앱이 앱을 설치하고 지우는 shell 사용자에게 권한을 줍니다.' },
    { to: 'Workbench Soft site', text: '사이트가 자체 프로젝트 목록으로 앱 카탈로그를 만듭니다.' },
    { to: 'archon', text: 'Archon은 APK가 없어서 카드에 열기 링크가 붙습니다.' },
  ],
  features: {
    'Update all':
      '업데이트 실행이 뒤처진 각 앱을 대기열에 넣고 64 KB 조각으로 내려받습니다. Shizuku가 shell 사용자로 하나씩 설치하고 취소는 다음 조각 전에 멈춥니다.',
    'Self update':
      '업데이터는 같은 릴리스에 자기 태그로 올라가고 마지막에 자신을 설치합니다. Shizuku를 거친 shell 명령 하나가 설치하고 이전 프로세스가 끝난 뒤 앱을 다시 엽니다.',
    'Update one app':
      '카드의 업데이트 버튼은 APK 하나에 같은 다운로드와 Shizuku 설치를 실행합니다. 실패한 카드에는 다시 시도할 버튼이 남습니다.',
    'Install a missing app':
      '설치된 앱과 맞는 것이 없는 APK에는 설치 버튼이 붙습니다. Shizuku가 업데이트와 같은 방법으로 설치합니다.',
    'App list':
      '공개된 APK마다 카드가 있고 이름이나 패키지 이름으로 설치된 앱과 맞춰집니다. 스튜디오 카탈로그는 APK 없는 각 프로젝트에 링크 카드를 더합니다.',
    'Saved list offline':
      'Shared preferences가 마지막 릴리스 목록을 노트와 이름까지 저장합니다. GitHub 확인이 실패하면 그 목록을 보여 주고 10분 안에 다시 열면 API를 쓰지 않습니다.',
    'Shizuku setup':
      '설정 모듈이 남은 Shizuku 단계를 찾아 Google Play나 Shizuku 앱을 엽니다. 권한을 받으면 사용자가 누른 업데이트가 시작됩니다.',
    'Release notes':
      '앱은 각 GitHub 릴리스의 노트를 정리합니다. 노트가 비어 있으면 릴리스 비교 링크의 커밋을 백그라운드에서 읽습니다.',
  },
};

export default arch;

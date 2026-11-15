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
  design: {
    scale: [
      '개발자 본인 휴대폰의 화면 하나에, 공개된 스튜디오 앱마다 카드 한 장을 둡니다.',
      'GitHub API는 토큰 없이 시간당 60번만 허용하고, 그래서 목록 캐시가 10분입니다.',
    ],
    data: [
      '데이터베이스는 없습니다. shared preferences에 마지막 릴리스 목록(노트와 이름 포함)과 실행 중 알아낸 패키지 이름을 둡니다.',
      '에셋 키는 태그 접두사에 버전과 플랫폼 접미사를 뺀 APK 이름을 붙인 것으로, 예는 farnear/farnear입니다.',
      '설치된 앱은 확인할 때마다 Android 패키지 관리자에서 가져옵니다.',
    ],
    interfaces: [
      '공유 공개 릴리스 저장소의 GitHub Releases API가 모든 APK를 페이지별로 주고, compare API가 커밋 노트를 줍니다.',
      '스튜디오 사이트가 프로젝트마다 이름, 플랫폼, 링크가 든 카탈로그 JSON을 내놓습니다.',
      'Shizuku가 shell 사용자로 sh -c를 실행하며 pm install -r -d -S와 pm uninstall을 씁니다.',
    ],
    reliability: [
      'GitHub 확인이 실패하면 저장된 목록을 보여 주고, 다시 열면 1분 기다린 뒤에 다시 묻습니다.',
      '업데이트 실행은 activity 밖에 있어 화면을 돌려도 이어지고, 취소는 다음 조각 전에 멈춥니다.',
      '걸리는 빌드는 서명이나 버전이 충돌할 때만 지우고, 종료 상태로 재설치 실패를 알 수 있습니다.',
    ],
    security: [
      '공개 릴리스만 읽고 토큰이나 계정을 두지 않습니다.',
      '설치 권한은 사용자가 주는 Shizuku 허용에서 오고, 앱은 root 명령을 실행하지 않습니다.',
      '자기 자신의 설치는 설치 전에 APK 파일 크기를 확인합니다.',
    ],
    performance: [
      'APK는 64 KB 조각으로, 타임아웃과 중단 확인을 두고 내려받습니다.',
      '릴리스 목록은 10분간 신선해서 대부분의 열기는 API를 건너뜁니다.',
      '노트가 없는 카드의 노트는 카드를 보여 준 뒤 백그라운드에서 compare API로 불러옵니다.',
    ],
    operations: [
      'Checks는 자체 러너에서 ktlint, shellcheck, shfmt, actionlint, markdownlint, 단위 테스트, 디버그 빌드를 돌립니다.',
      'Release는 Checks와 나란히 서명된 APK를 빌드하고, 검사가 통과하면 release-gate.sh가 공개합니다.',
      '작업은 날짜 버전 태그를 달고 공개 릴리스 저장소에 업데이터 릴리스를 만들며 최근 3개를 남깁니다.',
    ],
    tradeoffs: [
      '시스템 설치 프로그램 대신 Shizuku를 골라 확인 창 없이 설치하지만, 재부팅할 때마다 시작이 필요합니다.',
      'Compose 대신 일반 Views를 골랐습니다. 화면이 하나이고 Shizuku Java API를 쓰기 때문이며, 레이아웃은 손으로 짭니다.',
      '비공개 앱 저장소 대신 공개 릴리스 저장소를 골라 휴대폰에 토큰이 필요 없지만, 시간당 60번 한도가 있습니다.',
      '자기 APK는 shell 명령 하나로 마지막에 설치합니다. 설치가 실행 중인 프로세스를 죽일 수 있기 때문입니다.',
    ],
  },
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

import type { Arch } from '../types';

const arch: Arch = {
  summary:
    '조직의 각 저장소가 자기 workflow에서 호출하는 공용 단계를 모은 비공개 GitHub 저장소입니다. 복합 액션이 도구를 설치하고, 재사용 workflow가 Dependabot PR 병합과 iPhone 시뮬레이터 빌드를 맡습니다.',
  parts: [
    { name: '복합 액션', role: '호출한 쪽의 job 안에서 돌며 고정된 도구와 패키지를 설치하는 준비 단계.' },
    { name: 'mise', role: '저장소가 고정한 버전으로 각 도구를 설치합니다.' },
    { name: 'pnpm', role: 'lockfile로 패키지를 설치하고, Windows에서는 하드 링크 대신 복사합니다.' },
    { name: '재사용 workflow', role: '각 앱 저장소가 호출하는 Dependabot 병합과 iOS 시뮬레이터 빌드.' },
    { name: 'Node 스크립트', role: 'iOS 계획이 없는 Android 전용 부분을 앱에서 찾아 나열합니다.' },
    { name: 'macOS 러너와 Maestro', role: 'iPhone 시뮬레이터용으로 앱을 빌드하고 테스트 흐름을 실행합니다.' },
    { name: '릴리스 스크립트', role: '날짜 태그를 정하고 커밋으로 노트를 쓰는 shell 스크립트.' },
  ],
  flow: [
    '앱 저장소의 workflow가 main에 있는 이곳의 단계를 호출합니다.',
    'GitHub가 그 실행을 위해 이 저장소에서 단계를 불러옵니다.',
    '준비 단계가 고정된 도구를 설치하고 이어서 패키지를 설치합니다.',
    '호출한 쪽의 검사가 같은 job 안에서 이어집니다.',
    '여기서 병합한 수정은 각 저장소의 다음 실행에 반영됩니다.',
  ],
  links: [
    { to: 'GitHub Actions', text: '조직의 각 저장소가 자기 workflow에서 이곳의 단계를 호출합니다.' },
    { to: 'local-ci', text: 'PC 러너에서는 파일 잠금을 피하려고 공용 저장소에서 패키지를 복사합니다.' },
    { to: 'agent-skills-private', text: '릴리스 스크립트는 repo-ci 스킬의 CI 템플릿과 같습니다.' },
    { to: 'Dependabot', text: 'Dependabot PR은 공용 workflow로 병합되고, 메이저 업데이트는 사람을 기다립니다.' },
  ],
  design: {
    scale: [
      '소유자는 한 명이고, 대상은 GitHub 조직 하나의 수십 개 앱 저장소이며, 각 저장소가 자기 워크플로에서 같은 몇 단계를 호출합니다.',
      '여기서의 수정은 각 호출자의 다음 실행에 닿으므로, 나쁜 병합 하나가 모두를 깨뜨릴 수 있습니다.',
    ],
    data: [
      '데이터베이스는 없습니다. 상태는 날짜 태그, 커밋 제목 형식, 각 도구를 고정하는 mise.toml입니다.',
      '태그는 v<yyyy.mm.dd>.<n>이고, 노트는 type(scope)!: text 꼴의 제목으로 feat, fix, perf 커밋을 나눕니다.',
    ],
    interfaces: [
      '설정 단계는 composite 액션이며, 호출자가 uses로 실행하고 호출자의 잡 안에서 돕니다.',
      'Dependabot 병합과 iOS 시뮬레이터 빌드는 재사용 가능한 워크플로이고, main에서 시작할 워크플로 목록을 받습니다.',
      '자동 병합은 pull_request_target에서 돌고, iOS 점검은 통과나 실패를 내는 Node 스크립트입니다.',
    ],
    reliability: [
      '병합 잡은 dependabot[bot]이 PR을 열고 이벤트를 일으켰을 때만 돌고, 이미 병합되었거나 닫힌 PR에서는 멈춥니다.',
      'PC 러너에서는 pnpm이 공유 저장소에서 패키지를 복사합니다. 하드링크를 지우면 다른 읽기가 EBUSY로 실패했기 때문입니다.',
      '잡마다 자기 mise shim 폴더가 있어서, 공유 uvx.exe를 붙들고 있는 실행 중 프로세스가 도구 업데이트를 막지 못합니다.',
    ],
    security: [
      '저장소는 비공개이고 Actions 접근을 조직으로 설정해서, 호출자가 워크플로를 불러올 수 있습니다.',
      'pull_request_target은 main에서 쓰기 토큰으로 돌기 때문에 Dependabot 자신의 PR만 병합되고, 메이저 업데이트는 사람을 기다립니다.',
    ],
    performance: [
      '도구 설치는 한 러너의 잡끼리 공유하고, 잡마다 다시 만드는 것은 작은 shim 폴더뿐입니다.',
      'pnpm은 해석 단계 없이 락파일로 설치하고, iOS 점검을 먼저 돌려서 나쁜 계획은 Mac 분량이 시작되기 전에 실패합니다.',
    ],
    operations: [
      'Lint는 main에 push할 때마다 돕니다. 릴리스 워크플로는 Lint가 통과하면 workflow_run으로 시작해 커밋에 날짜 태그를 붙입니다.',
      'Markdown만 있는 push는 Lint를 건너뛰므로 릴리스가 없습니다.',
      'mise run test는 일회용 git 저장소를 만들어 릴리스 스크립트 둘을 확인하고, Vitest가 ios-check를 다룹니다.',
    ],
    tradeoffs: [
      '고정 태그 대신 호출자가 @main을 써서 수정 하나가 모든 곳에 닿습니다. 미뤄야 하는 저장소는 릴리스 태그를 고정합니다.',
      '설정은 재사용 워크플로 대신 composite 액션으로 해서 호출자 자신의 점검이 같은 잡에서 이어지게 합니다.',
      'PR 점검을 기다리지 않고 열면 병합하고 main에서 확인합니다. 조직 저장소는 PR에서 점검을 돌리지 않기 때문입니다. 나쁜 업데이트가 먼저 main에 닿습니다.',
      'iPhone 빌드에는 macOS 러너를 씁니다. PC 러너가 Windows이기 때문입니다. macOS 1분은 10분으로 세므로 호출자는 수동이나 릴리스 때 시작합니다.',
    ],
  },
  features: {
    'Setup step':
      '복합 액션이 고정된 도구를 mise로 설치하고, 이어서 pnpm이 lockfile로 설치합니다. 호출한 쪽의 job 안에서 돌기 때문에 그 검사가 바로 뒤를 잇습니다.',
    'Dependabot details':
      'Dependabot 메타데이터 액션이 각 PR의 업데이트 종류를 읽습니다. 병합 job은 이를 보고 메이저 업데이트를 사람에게 남깁니다.',
    'Dependabot auto merge':
      '재사용 workflow가 Dependabot PR이 열리자마자 squash 병합하고, main에서 검사를 시작합니다. Dependabot이 직접 열고 push한 PR만 이렇게 병합됩니다.',
    Releases:
      'main 푸시에서 Lint가 통과하면 릴리스 workflow가 시작됩니다. shell 스크립트 2개가 날짜 태그를 정하고 지난 태그 이후의 커밋으로 노트를 씁니다.',
    'iOS check and simulator build':
      'Node 스크립트가 패키지와 네이티브 모듈, Gradle 파일에서 Android 전용 부분을 찾습니다. 그다음 재사용 workflow가 GitHub macOS 러너에서 빌드하고, Maestro가 스크린샷을 찍습니다.',
  },
};

export default arch;

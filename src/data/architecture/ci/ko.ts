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

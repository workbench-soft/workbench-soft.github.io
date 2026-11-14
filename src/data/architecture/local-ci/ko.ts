import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'PowerShell과 POSIX sh 설정 스크립트가 Windows PC나 Mac을 준비하고 GitHub Actions 러너로 등록합니다. PC의 Next.js 페이지가 러너와 실행을 보여 주고, 그 서버가 job을 배분하고 취소합니다.',
  parts: [
    { name: 'PowerShell과 sh 설치 스크립트', role: 'winget이나 Homebrew와 mise로 개발 도구를 설치합니다.' },
    {
      name: 'GitHub Actions 러너',
      role: '조직의 CI job을 받습니다. PC마다 여러 개이고 무거운 빌드용 줄이 따로 있습니다.',
    },
    { name: 'Windows 작업 스케줄러', role: '부팅할 때 러너와 페이지를 켜고 5분마다 업데이트를 실행합니다.' },
    { name: 'Next.js', role: '로컬 상태 페이지이며, 서버 액션이 실행을 멈추고 APK를 설치합니다.' },
    { name: 'GitHub REST API', role: '페이지에 실행과 릴리스를 주며, ETag로 조회해 호출 한도를 아낍니다.' },
    { name: 'adb', role: 'USB로 연결된 휴대폰에 릴리스 APK를 설치합니다.' },
    { name: 'Blacksmith와 Oracle Cloud', role: 'PC보다 먼저 job을 받는 무료 클라우드 러너.' },
    { name: 'SVG 차트', role: 'JSON 파일에 쌓인 90일 치 실행으로 서버에서 그립니다.' },
  ],
  flow: [
    '조직 저장소에 푸시하면 GitHub에 job이 대기합니다.',
    '페이지 서버가 각 저장소를 클라우드 러너나 이 PC로 보냅니다.',
    '라벨이 맞는 러너가 job을 받습니다.',
    '페이지 서버가 실행을 읽고 대체된 실행을 멈춥니다.',
    '페이지는 15초마다 job, 릴리스, 멈춘 이유를 보여 줍니다.',
  ],
  links: [
    { to: 'GitHub Actions', text: '머신이 조직의 러너로 등록되고, 페이지가 API를 읽습니다.' },
    { to: 'archon', text: 'Archon의 CI 탭이 상태 페이지를 프레임으로 띄웁니다.' },
    { to: 'ci', text: '이 PC에서 그 준비 단계를 쓰는 job은 공용 저장소에서 패키지를 복사합니다.' },
    { to: 'agent-skills-private', text: '그 repo-ci 템플릿이 러너 변수를 읽고 취소 규칙을 정합니다.' },
    { to: 'Blacksmith', text: '무료 시간이 남아 있는 동안 가벼운 job과 무거운 job을 클라우드에서 돌립니다.' },
  ],
  features: {
    'Mac setup':
      'POSIX sh 스크립트가 Homebrew 도구와 mise, 셸 설정을 설치합니다. 이어서 git을 설정하고 조직 저장소를 클론합니다. 두 번째 실행은 이미 있는 것을 건너뜁니다.',
    'Windows setup':
      'PowerShell 스크립트가 같은 도구를 winget과 mise로 설치하고, Python과 Rust 컴파일 캐시도 더합니다. Mac 전용 부분과 이미 있는 것은 건너뜁니다.',
    'Self-hosted CI runner':
      '러너 스크립트가 GitHub 러너를 받아 SHA256을 확인하고 Windows에 러너 4개를 등록합니다. 처음 2개가 Gradle, Cargo, Tauri job을 받습니다.',
    'Start button':
      '더블 클릭하면 체크아웃을 최신 릴리스로 옮기고 바뀐 설치 스크립트를 다시 실행합니다. 그다음 러너와 페이지 작업을 켜고 페이지를 엽니다.',
    'CI status page':
      'Next.js 서버가 GitHub API와 이 PC의 러너 폴더에서 러너와 실행, job을 읽습니다. 진행 막대는 최근 완료된 실행 10개를 바탕으로 합니다.',
    'Build cancellation':
      'workflow의 concurrency가 GitHub에서 오래된 실행을 취소합니다. 페이지 서버도 10초마다 대체된 실행과 Checks가 실패한 릴리스를 멈추고 이유를 파일에 남깁니다.',
    'Cloud runners first':
      '페이지 서버가 Blacksmith와 GitHub의 무료 시간을 셉니다. 각 비공개 저장소에 러너 변수를 정하고, 변수가 없으면 job은 PC 라벨로 돌아갑니다.',
    Releases:
      '서버 액션이 앱의 릴리스 workflow를 시작하거나 임시 클론에서 main으로 APK를 빌드합니다. 그다음 adb가 연결된 휴대폰에 APK를 설치합니다.',
    'Updates by themselves':
      '예약 작업이 5분마다, 그리고 로그온할 때 돕니다. 체크아웃을 최신 릴리스 태그로 옮기고 파일이 바뀐 설치 스크립트만 다시 실행합니다.',
    Sites:
      '페이지가 한 시간에 한 번 각 저장소의 workflow를 읽고 사이트를 배포하는 것을 찾습니다. 버튼이 그것을 main에서 시작합니다.',
    'CI trends':
      '페이지 서버가 10분마다 완료된 실행을 읽고 90일 치를 JSON 파일에 보관합니다. 차트는 서버에서 SVG로 그립니다.',
  },
};

export default arch;

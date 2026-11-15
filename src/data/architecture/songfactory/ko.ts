import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'Python 명령줄 도구가 Windows PC에서 ffmpeg와 로컬 GPU로 돌아갑니다. 주제 폴더를 YouTube 영상으로 만들고 데스크톱 창이나 Archon이 이 도구를 움직입니다.',
  parts: [
    { name: 'Python과 uv', role: 'uv로 실행하는 songfactory 명령과 그 모듈입니다.' },
    { name: 'ffmpeg', role: '곡을 섞고 클립을 반복하며 GPU의 NVENC로 인코딩합니다.' },
    { name: 'numpy와 Apollo', role: '손실 압축이 잘라 낸 고음역을 다시 만듭니다.' },
    { name: 'Claude CLI', role: 'Claude 구독으로 주제와 가사와 YouTube 문구를 씁니다.' },
    { name: 'Playwright', role: 'Chromium에서 Suno 사이트를 조작해 곡을 만들고 내려받습니다.' },
    { name: 'ComfyUI', role: '로컬 GPU에서 프롬프트로 배경 클립을 그립니다.' },
    { name: 'YouTube Data API', role: '썸네일과 AI 표시와 게시 시간을 붙여 영상을 올립니다.' },
    { name: 'tkinter', role: '고른 곡을 9개 언어 화면에서 정리하거나 개선하는 데스크톱 창입니다.' },
  ],
  flow: [
    '곡은 주제 폴더나 Suno 타일에서 옵니다.',
    'ffmpeg가 각 곡을 정리하고 원본은 그대로 둡니다.',
    'ffmpeg가 반복되는 클립 위에 곡을 크로스페이드로 잇습니다.',
    '빌드가 챕터와 설명과 썸네일을 씁니다.',
    'YouTube Data API가 게시 시간을 붙여 영상을 올립니다.',
  ],
  links: [
    { to: 'archon', text: 'Archon의 Songs 탭이 타일을 그리고 songfactory 명령으로 각 타일을 실행합니다.' },
    { to: 'Suno', text: 'Suno가 곡을 만들고 Playwright가 내려받습니다.' },
    { to: 'YouTube', text: '영상은 YouTube Data API로 하루 6개쯤 올라갑니다.' },
    { to: 'Claude', text: 'Claude CLI는 구독으로 글을 쓰며 API 계정이 필요 없습니다.' },
  ],
  design: {
    scale: [
      'GPU가 있는 Windows PC 한 대에 제작자 한 사람입니다. 매일 실행으로 올리는 영상은 많아야 약 6개입니다.',
      '업로드 한 번에 YouTube 하루 쿼터 10,000단위 중 약 1,600이 들고, 이 쿼터가 상한을 정합니다.',
      '로컬 GPU는 한 번 실행에 720p 영상 약 5초를 만들기 때문에 배경은 모두 반복 클립입니다.',
    ],
    data: [
      '상태는 테마 폴더의 파일입니다. theme.toml이 설정을 담고, out/upload.json이 테마가 끝났음을 표시하고, out/claude.json이 Claude가 쓴 글을 보관합니다.',
      '프로젝트는 타일 10개를 pipeline.json에 두며, 각각 kind, enabled, params가 있습니다.',
      '정리한 곡은 FLAC으로 out/clean/에 들어가고 원본은 그대로 남습니다. 비밀 정보는 저장소 밖 폴더에 있습니다.',
    ],
    interfaces: [
      'CLI에는 bg, clean, build, upload, publish, run, enhance, clips와 타일 명령이 있습니다. Archon의 Songs 탭은 songfactory project를 읽고 songfactory tile을 실행합니다.',
      'ffmpeg와 ffprobe는 하위 프로세스로 돌고, ComfyUI에는 프롬프트와 시드를 채운 workflows/loop.json을 HTTP로 보냅니다.',
      'upload.py는 데스크톱 앱용 OAuth 로그인 뒤에 YouTube Data API의 videos.insert와 thumbnails.set을 호출합니다.',
      'progress.py는 step, file i/n, progress NN% 줄을 출력하고 런처가 이를 막대로 바꿉니다.',
    ],
    reliability: [
      'upload.json은 YouTube가 영상 id를 돌려주자마자 쓰므로 썸네일이 실패해도 두 번째 업로드가 생기지 않습니다.',
      'run은 _ 또는 점으로 시작하는 폴더를 건너뛰고, 한 테마가 실패하면 다음 테마로 넘어갑니다.',
      'claude.py는 선택 사항입니다. CLI가 없거나 호출이 실패하면 한 줄을 출력하고, 테마는 폴더 이름을 제목으로 삼아 계속됩니다.',
      '꺼진 타일은 입력을 그대로 넘기고, 오디오 타일은 실행된 가장 가까운 앞 타일의 파일을 받습니다.',
    ],
    security: [
      'YouTube OAuth 토큰과 다른 비밀 정보는 저장소 밖 폴더에 있습니다.',
      'claude -p는 API 키 변수를 뺀 채 실행하므로 API 계정이 아니라 로그인된 구독에 과금됩니다.',
      '업로드는 containsSyntheticMedia를 설정하고, Google이 프로젝트를 감사할 때까지 비공개로 남습니다.',
    ],
    performance: [
      'PC에 GPU가 있으면 h264_nvenc가 GPU에서 인코딩하고, 없으면 libx264가 이어받습니다.',
      '클립은 -stream_loop와 핑퐁으로 반복하므로 5초 클립이 긴 영상을 덮고 긴 렌더링이 필요 없습니다.',
      '정리는 고정 게인, highpass, afftdn, 7 kHz 동적 컷을 한 번의 ffmpeg 호출로 하며 신경망 모델은 쓰지 않습니다.',
      '배치 enhance는 CLI 프로세스 하나로 돌아서 모든 곡에 compare.html 하나를 씁니다.',
    ],
    operations: [
      'Windows 작업 스케줄러가 곡, 토큰, GPU가 있는 PC에서 매일 03:00에 mise run daily를 실행합니다.',
      'checks.yml은 main에 푸시할 때마다 자체 호스팅 Windows 러너에서 lint, 테스트, uv build를 실행합니다.',
      'release.yml은 Checks와 나란히 wheel과 sdist를 빌드하고, Checks가 통과하면 release-gate.sh가 게시합니다. Checks가 실패하면 빌드를 취소합니다.',
      'mise run doctor는 전제 조건마다 ok 또는 MISSING 한 줄을 출력하고, 런처용으로는 JSON으로도 출력합니다.',
    ],
    tradeoffs: [
      'Python 영상 라이브러리 대신 명령줄 ffmpeg를 써서 믹싱, 반복, NVENC 인코딩을 한 도구에 담지만, 필터 그래프는 문자열이라 오타가 실행할 때 드러납니다.',
      '곡만큼 긴 클립 대신 짧은 반복 클립을 씁니다. GPU가 한 번에 약 5초를 만들기 때문입니다.',
      '데이터베이스 대신 테마별 일반 파일을 써서 파일 하나로 업로드 여부를 알지만, 폴더를 옮기면 업로드와의 연결이 끊깁니다.',
      'CI cron 대신 로컬 작업 스케줄러를 씁니다. 곡과 토큰이 git 밖에 있기 때문이지만, 03:00에 PC가 켜져 있어야 합니다.',
    ],
  },
  features: {
    'Audio workbench':
      'tkinter 창이 고른 파일에 정리나 개선 명령을 실행합니다. 이름 검사가 두 결과가 겹치기 전에 작업을 멈춥니다.',
    'Tile pipeline':
      '각 프로젝트는 타일 10개와 그 설정을 JSON 파일에 둡니다. 러너가 앞 타일의 결과를 다음 타일에 넘기고 Archon이 타일을 그립니다.',
    'Per-song videos':
      '클립 모듈이 주제와 정리와 인코더를 다시 써서 곡마다 반복 영상을 만듭니다. 원하면 ffmpeg가 바로 이어 붙입니다.',
    'Install and check the setup':
      'PowerShell 스크립트가 mise와 고정된 도구와 패키지를 설치합니다. 점검 모듈이 조건을 하나씩 확인하고 고칠 방법을 알려 줍니다.',
    'Long video from a playlist':
      'ffmpeg가 곡을 크로스페이드로 섞고 소리 길이만큼 클립을 반복합니다. GPU가 지원하면 인코딩은 NVENC로 합니다.',
    'Cleanup of AI artifacts':
      'ffmpeg 필터 체인 하나가 고정 게인을 걸고 웅웅거림과 히스와 강한 반짝임을 없앱니다. 정리한 사본은 원본 옆에 FLAC 파일로 남습니다.',
    'Enhance a song':
      'numpy가 아래 대역으로 고음역을 다시 만듭니다. GPU의 Apollo 모델이 대신 이 일을 할 수 있고 페이지가 두 스펙트로그램을 보여 줍니다.',
    'Seamless loop':
      'ffmpeg가 클립을 앞으로 틀고 다시 거꾸로 튼 뒤 반복합니다. 마지막 장면과 첫 장면 사이의 튐이 사라집니다.',
    'Chapters and thumbnail':
      '챕터 시간은 곡 길이에서 크로스페이드를 빼서 구합니다. Pillow가 클립의 한 장면에 제목을 씁니다.',
    'Scheduled upload':
      'YouTube Data API가 AI 표시와 게시 시간을 붙여 영상을 올립니다. Windows 작업 스케줄러가 매일 03:00에 빌드를 실행합니다.',
    'Text from Claude':
      'Claude CLI가 곡 이름으로 빈 제목과 설명과 태그를 씁니다. 주제 폴더의 파일이 답을 보관해 다음 빌드에 씁니다.',
    'Background from ComfyUI':
      '도구가 로컬 GPU의 ComfyUI 워크플로에 프롬프트를 보냅니다. 돌아온 클립이 반복 배경이 됩니다.',
  },
};

export default arch;

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

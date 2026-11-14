import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'TypeScript로 만든 Cloudflare Worker가 Memories가 보내는 WebDAV 메서드에 답합니다. Durable Object 하나가 SQLite 저장소에 파일을 두며 무료 요금제로 돌아갑니다.',
  parts: [
    { name: 'Cloudflare Worker', role: 'Basic 로그인을 확인하고 각 WebDAV 요청을 넘깁니다.' },
    { name: 'Durable Object', role: '트리 전체를 저장소 하나에 두고 파일을 1 MB 조각으로 SQLite에 넣습니다.' },
    { name: '정적 파일', role: '샘플 사진을 Worker와 함께 싣고 시작할 때마다 저장소를 채웁니다.' },
    { name: 'Python 샘플 스크립트', role: 'EXIF 날짜와 GPS가 담긴 합성 사진 42장과 동영상 2개를 그립니다.' },
    { name: 'Cron 트리거', role: '매일 밤 03:00 UTC에 업로드 층을 지웁니다.' },
  ],
  flow: [
    '앱이 Basic 로그인을 담은 WebDAV 요청을 보냅니다.',
    'Worker가 로그인을 확인하고 요청을 Durable Object에 넘깁니다.',
    '읽기는 먼저 업로드 층을 보고 그다음 샘플을 봅니다.',
    '앱은 폴더 목록이나 요청한 범위의 바이트를 받습니다.',
  ],
  links: [
    { to: 'memories', text: 'Google Play 심사자가 Memories 연결 화면에 이 서버를 입력합니다.' },
    { to: 'Google Play', text: 'App access 안내가 심사자에게 주소와 로그인을 알려 줍니다.' },
    { to: 'Cloudflare', text: '무료 Workers 요금제에서 돌고 검사를 통과하면 CI가 배포합니다.' },
  ],
  features: {
    'Sample library':
      'Python 스크립트가 EXIF 날짜가 담긴 사진을 그리고 일부에 GPS 지점을 넣습니다. 정적 파일로 배포되고 시작할 때 Durable Object를 채웁니다.',
    'Sign in': 'Worker가 Basic 사용자 한 명을 Worker 비밀 값과 대조합니다. OPTIONS는 로그인 없이 답합니다.',
    'Uploads and sorting':
      '업로드와 이동은 읽기 전용 샘플 위의 별도 층에 쌓입니다. 밤마다 cron이 그 층을 지우면 샘플이 돌아옵니다.',
  },
};

export default arch;

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
  design: {
    scale: [
      'Google Play 심사자가 함께 쓰는 데모 라이브러리로, 사진 42장, 동영상 2개, 로그인 하나입니다.',
      'Durable Object 하나가 모든 요청을 받으므로 무료 Workers 요금제에서 모든 심사자가 같은 사본을 씁니다.',
    ],
    data: [
      '파일은 Durable Object의 SQLite 저장소에 1 MB 조각으로 들어가며 행 한도 2 MB 아래입니다.',
      'base/ 의 샘플은 읽기 전용입니다. 클라이언트의 업로드와 폴더는 Uploads/ 로 가고, 삭제와 이동은 표식으로 남깁니다.',
      'JSON 파일이 샘플마다 EXIF 날짜를 담고 PROPFIND가 그것을 수정 시각으로 알려 줍니다.',
    ],
    interfaces: [
      'WebDAV는 앱이 쓰는 만큼만 있습니다. OPTIONS, 깊이 0 또는 1의 PROPFIND, 범위가 있는 GET과 HEAD, PUT, MKCOL, MOVE, DELETE입니다.',
      'LOCK은 405를, 깊이 무한의 PROPFIND는 403을 돌려줍니다.',
      'Worker는 모든 요청을 Durable Object로 넘기고, 거기에 head, 범위 get, put, delete, list 호출이 있습니다.',
    ],
    reliability: [
      '매일 03:00 UTC의 cron이 Uploads/ 를 지워 데모가 샘플 상태로 돌아갑니다.',
      '시작할 때마다 Durable Object가 base/ 를 샘플 목록에 맞추므로 반쯤 끝난 초기 채움도 스스로 고쳐집니다.',
      'PUT은 50 MB를 넘기면 읽기를 멈추고, 범위 GET은 필요한 조각만 불러와 128 MB 메모리 안에 머뭅니다.',
    ],
    security: [
      'Basic 인증 사용자는 한 명이고 Worker 시크릿과 대조합니다. OPTIONS는 로그인 없이 응답합니다.',
      '샘플 파일은 Worker 뒤의 정적 자산이라 로그인이 이것도 지킵니다.',
      '샘플은 합성이라 실제 사람이나 장소가 드러나지 않습니다.',
    ],
    performance: [
      '범위 GET은 필요한 조각만 읽으므로 50 MB 파일이 100 MB 메모리를 쓰지 않습니다.',
      '샘플 날짜는 JSON 파일에서 가져오므로 PROPFIND가 EXIF를 읽지 않습니다.',
    ],
    operations: [
      'main에 푸시할 때마다 Checks가 린트, 타입 검사, 단위 테스트를 돌리고 통과하면 Deploy가 시작됩니다.',
      'Deploy는 샘플을 빌드하고 mise로 wrangler 배포를 실행한 뒤 커밋에 날짜 버전 태그를 답니다.',
      '샘플 폴더와 날짜 목록이 다르거나 Cloudflare 토큰이 없으면 멈춥니다.',
      '배포는 한 번에 하나만 돌고, 기다리는 더 새로운 배포가 더 오래된 것을 대신합니다.',
    ],
    tradeoffs: [
      'R2 대신 Durable Object의 SQLite를 골랐습니다. R2는 결제 카드가 필요하고 무료 요금제는 Durable Object를 포함하기 때문입니다.',
      '샘플에 직접 쓰는 대신 읽기 전용 샘플 위에 쓰기 계층을 두어 초기화는 접두사 삭제 한 번입니다.',
      '실제 사진 대신 합성 사진을 써서 낯선 사람에게 실제 사람이나 장소를 보이지 않습니다.',
      'Rust 대신 지금은 TypeScript Worker로 먼저 내보냅니다. 조직 스택은 workers-rs로 옮길 계획입니다.',
    ],
  },
  features: {
    'Sample library':
      'Python 스크립트가 EXIF 날짜가 담긴 사진을 그리고 일부에 GPS 지점을 넣습니다. 정적 파일로 배포되고 시작할 때 Durable Object를 채웁니다.',
    'Sign in': 'Worker가 Basic 사용자 한 명을 Worker 비밀 값과 대조합니다. OPTIONS는 로그인 없이 답합니다.',
    'Uploads and sorting':
      '업로드와 이동은 읽기 전용 샘플 위의 별도 층에 쌓입니다. 밤마다 cron이 그 층을 지우면 샘플이 돌아옵니다.',
  },
};

export default arch;

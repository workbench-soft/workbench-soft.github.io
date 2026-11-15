import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'Windows와 macOS용 Tauri 2 데스크톱 앱입니다. Rust 백엔드가 스캔, 날짜 읽기, 계획, 이동을 맡고 React webview가 백엔드가 보내는 이벤트를 보여 줍니다.',
  parts: [
    { name: 'Tauri 2', role: '시스템 webview를 쓰는 데스크톱 껍데기로 설치 파일이 작습니다.' },
    { name: 'Rust 백엔드', role: '스캔부터 이동과 기록까지 파일에 관한 결정을 내립니다.' },
    { name: 'React와 Vite', role: '백엔드 이벤트로 파일 표, 도구 모음, 설정을 그립니다.' },
    { name: 'ExifTool', role: '함께 담긴 도우미로 파일마다 날짜, 카메라, GPS를 읽습니다.' },
    { name: 'folder-rules 크레이트', role: '연도, 장소, 날짜 폴더 규칙으로 Memories와 함께 씁니다.' },
    { name: 'GeoNames와 OpenStreetMap', role: '설치 파일에 든 지명과 공원 윤곽으로 네트워크 없이 찾습니다.' },
    { name: 'tauri-plugin-updater', role: 'GitHub 릴리스에서 새 버전을 찾고 재시작할 때 설치합니다.' },
  ],
  flow: [
    '사용자가 폴더를 고르면 Rust 탐색이 파일을 보냅니다.',
    'ExifTool 프로세스가 묶음마다 날짜와 GPS를 읽습니다.',
    '오프라인 지오코더가 GPS 지점마다 장소 이름을 붙입니다.',
    '폴더 규칙이 파일마다 새 폴더와 이름을 정합니다.',
    '사용자가 확인하면 백엔드가 파일을 옮기고 단계를 기록합니다.',
  ],
  links: [
    { to: 'memories', text: '휴대폰 앱과 이 정리 도구는 폴더 규칙 크레이트와 사진 편집기를 함께 씁니다.' },
    { to: 'GitHub Releases', text: '설치 파일과 업데이트 파일은 공개 사이트 저장소의 릴리스에 있습니다.' },
  ],
  design: {
    scale: [
      'PC 한 대에 한 사람입니다. 설계 규모는 파일 100,000개가 든 폴더라서 기록은 Rust가 갖고 웹뷰에는 id만 갑니다.',
      '장소 데이터는 GeoNames 발췌본과 공원 윤곽으로 설치 파일에 들어 있습니다. 다시 만들면 약 640 MB를 내려받습니다.',
    ],
    data: [
      '설정은 앱 데이터 폴더의 JSON 파일 하나에 있습니다. 기록은 실행마다 JSONL 파일 하나와 index.json입니다.',
      '스캔의 기록, 날짜, 계획은 백엔드의 스캔 세션에 남으므로 명령은 파일 id와 계획을 받습니다.',
      '장소 데이터는 geodata.tsv.gz(인구 1,000명 이상의 도시와 명소)와 parks.tsv.gz입니다. 둘 다 1도 격자에 불러옵니다.',
    ],
    interfaces: [
      '웹뷰는 start_scan, start_moves 같은 Tauri 명령을 보내고, 백엔드는 scan:files, metadata:results, plan:files, move:file 이벤트로 답합니다.',
      'ts-rs가 Rust 모델에서 TypeScript 페이로드 타입을 써서, 명령의 양쪽이 맞습니다.',
      'ExifTool은 요청마다 한 줄을 받으며 json 출력, 태그 목록, 절대 경로가 들어 있습니다. 업데이터는 릴리스의 latest.json을 읽습니다.',
    ],
    reliability: [
      '이동은 덮어쓰지 않는 이름 바꾸기를 씁니다. 볼륨을 넘는 복사는 원본이 사라지기 전에 크기와 바이트를 확인합니다.',
      '충돌이 나도 파일은 원래 자리, 목적지, 또는 하드 링크 하나의 두 이름 중 한 곳에 남아 사라지지 않습니다.',
      '실행은 각 단계가 끝날 때 로그 한 줄을 쓰고, 로그를 쓰지 못하면 실행을 멈춥니다. 교체된 스캔의 늦은 이벤트는 scan_id로 버립니다.',
    ],
    security: [
      '웹뷰는 core:default 권한만 갖고 fs나 shell 플러그인이 없습니다. 모든 파일 변경은 Rust가 합니다.',
      '이동은 이번 세션에서 기본 선택기로 고른 폴더에서만 시작합니다. 목적지는 선택한 루트 안에 있어야 하며 이동 직전마다 다시 확인합니다.',
      '장소를 오프라인으로 풀기 때문에 GPS 지점은 PC를 떠나지 않습니다. ExifTool 경로는 파일 이름으로 명령을 끼워 넣지 못하게 검사합니다.',
    ],
    performance: [
      '스캔 탐색은 UI 스레드 밖에서 돌며 파일을 묶음으로 보냅니다. 표가 이를 버퍼에 모으므로 큰 폴더도 초당 몇 번만 다시 그립니다.',
      'ExifTool 워커는 열려 있는 채로 낮은 우선순위로 돌아, 파일마다 프로세스를 띄우지 않습니다.',
      '장소 조회는 격자의 가까운 칸만 훑고, 공원 윤곽은 변 64개씩 묶은 상자로 검사합니다.',
    ],
    operations: [
      '백엔드는 앱 크레이트 옆의 별도 크레이트에 있어서, 릴리스는 18,000줄 대신 작은 크레이트만 컴파일합니다.',
      'CI는 Windows PC에서 돌아서 릴리스에는 Windows 설치 파일만 있고 macOS 빌드는 없습니다. Mac에서는 pnpm tauri build로 만듭니다.',
      '업데이터는 시작할 때, 창으로 돌아올 때, 요청할 때 latest.json을 읽습니다. Update를 누르면 내려받고 Restart now에서 설치합니다.',
    ],
    tradeoffs: [
      'Electron 대신 Tauri 2를 택했습니다. 시스템 웹뷰로 설치 파일이 작고 파일 로직은 Rust가 맡으며, 대가는 WebView2와 WebKit의 차이입니다.',
      '웹뷰 대신 Rust에서 계획합니다. 웹뷰는 첫 버전이었고 큰 폴더에서 느려졌습니다.',
      '파일은 disk/safe_fs만 바꾸고 clippy.toml이 이를 강제합니다. 모듈마다 std::fs를 부르면 파일을 덮어쓸 수 있기 때문입니다.',
      '온라인 지오코더 대신 설치 파일 안의 GeoNames를 택해, GPS 지점이 PC를 떠나지 않고 요청 제한도 없습니다.',
    ],
  },
  features: {
    Scan: 'Rust 탐색이 UI 스레드 밖에서 돌며 파일을 묶음으로 보냅니다. 표가 이를 모아 두므로 큰 폴더도 초당 몇 번만 다시 그립니다.',
    'Capture dates':
      'ExifTool 프로세스 묶음이 열린 채로 스캔이 찾은 묶음을 바로 읽습니다. 코어의 절반에서 낮은 우선순위로 돕니다.',
    'Places offline':
      'GeoNames 자료와 공원 윤곽을 1도 격자에 한 번만 불러옵니다. 검색은 가까운 칸만 읽고 GPS 지점은 PC를 떠나지 않습니다.',
    'Plan first':
      '공유 폴더 규칙 크레이트가 시험 실행으로 파일마다 폴더와 이름을 정합니다. 확인 전에 표가 계획을 하나씩 보여 줍니다.',
    Moves:
      '파일을 바꾸는 곳은 Rust 모듈 하나이며 덮어쓰지 않는 이름 바꾸기나 검증된 복사를 씁니다. 일시 정지는 지금 옮기는 파일 뒤에 멈춥니다.',
    'History, undo and redo':
      '실행마다 앱 데이터 폴더에 JSONL 기록을 파일당 한 줄씩 씁니다. 실행 취소와 다시 실행은 같은 검사로 기록을 재생합니다.',
    Settings: '백엔드가 대상 폴더, 모드, 집 위치를 JSON 파일에 저장합니다. 언어 선택은 webview 저장소에 남습니다.',
    'File table':
      'React가 백엔드 이벤트로 파일마다 한 줄을 그립니다. 장소를 두 번 누르면 OpenStreetMap 타일 위에 Leaflet이 열립니다.',
    'Self-update':
      'tauri-plugin-updater가 시작할 때와 창이 앞으로 돌아올 때 최신 릴리스 파일을 읽습니다. 업데이트를 누르면 받고 지금 재시작을 누르면 설치합니다.',
    'One command install':
      'PowerShell 스크립트가 릴리스 파일에서 최신 버전을 읽습니다. 설치 파일을 받아 현재 사용자용으로 조용히 실행합니다.',
  },
};

export default arch;

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

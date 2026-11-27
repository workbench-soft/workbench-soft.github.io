import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'Android, iPhone, 브라우저용 Expo 앱이 집의 NAS에서 WebDAV로 사진을 읽고 자체 SQLite 색인을 둡니다. NAS의 선택형 컨테이너가 사진 색인, 얼굴 묶기, 앨범 링크를 맡습니다.',
  parts: [
    { name: 'Expo와 React Native', role: 'Android 앱, iPhone 앱, 브라우저 버전이 함께 쓰는 하나의 코드.' },
    { name: 'expo-sqlite', role: '휴대폰의 색인으로 파일마다 날짜, 장소, 기기를 담습니다.' },
    { name: 'WebDAV', role: '목록, 헤더 읽기, 업로드, 이동에 쓰는 NAS와의 유일한 통로.' },
    {
      name: 'folder-rules 크레이트',
      role: '연도, 장소, 날짜 폴더를 정하는 Rust 규칙으로 데스크톱 정리 도구와 함께 씁니다.',
    },
    { name: 'places.db', role: '앱에 든 GeoNames와 OpenStreetMap 자료로 네트워크 없이 장소 이름을 붙입니다.' },
    { name: 'NAS의 Node 컨테이너', role: 'NAS의 빠른 색인기, 앨범 페이지, 브라우저 앱.' },
    { name: 'Rust 얼굴 엔진', role: 'NAS에서 tract로 YuNet과 SFace를 돌려 얼굴을 사람별로 묶습니다.' },
    { name: 'Konva 사진 편집기', role: 'Expo DOM 컴포넌트 안의 편집기 하나로 Shuttrix와 데스크톱이 함께 씁니다.' },
  ],
  flow: [
    '백그라운드 작업이 몇 시간마다 NAS 폴더 목록을 읽습니다.',
    '새 파일은 헤더만 읽어 날짜와 GPS를 얻습니다.',
    '오프라인 장소 데이터베이스가 장소를 정하고 SQLite가 행을 저장합니다.',
    '작업이 다음 7일 치 알림을 예약합니다.',
    '화면이 색인을 조회하고 NAS에서 원본 사진을 불러옵니다.',
  ],
  links: [
    { to: 'media-organizer', text: '데스크톱 정리 도구는 같은 Rust 폴더 규칙을 쓰고 같은 편집기를 보여 줍니다.' },
    { to: 'shuttrix', text: '이 카메라는 사진 편집기, 장소 찾기, 스팟 지도를 함께 씁니다.' },
    { to: 'keeppad', text: 'Keeppad가 Android 제공자를 거쳐 NAS에 있는 사람의 일기에 메모를 더합니다.' },
    { to: 'memories-demo-webdav', text: 'Google Play 심사는 이 샘플 NAS로 로그인합니다.' },
    { to: 'Tailscale', text: '두 번째 주소로 집 밖에서도 NAS에 닿습니다. Funnel이 앨범 링크를 내보냅니다.' },
  ],
  design: {
    scale: [
      '설치 하나에 사람 한 명과 집의 NAS 한 대, 사진과 동영상은 최대 약 100만 개입니다.',
      'NAS가 초당 약 10개의 헤더만 읽어 주므로 사진 50만 장의 첫 동기화는 거의 하루가 걸립니다.',
      '앨범 링크는 Tailscale Funnel로 몇 사람에게 닿으므로 서버는 NAS 하나뿐입니다.',
    ],
    data: [
      '사진은 NAS에 남습니다. 휴대폰은 폴더, 미디어, 트리거가 세는 days 테이블이 있는 SQLite 색인을 둡니다.',
      '파일 행은 폴더 id와 파일 이름만 담아서 파일 100만 개가 약 200 MB에 들어갑니다.',
      '촬영 시각은 초 단위 벽시계로 저장하므로 오늘의 추억은 단순한 범위 조회입니다.',
      'NAS는 사진 옆에 .memories 폴더를 두고 index.db, status.json, faces.db, 앨범 파일을 넣습니다.',
    ],
    interfaces: [
      '휴대폰은 WebDAV로 NAS와 대화합니다. 폴더마다 PROPFIND, 헤더는 범위 GET, 그 밖에 PUT, MKCOL, MOVE를 씁니다.',
      'NAS의 컨테이너가 index.db와 status.json을 .memories에 올리고, 휴대폰은 같은 WebDAV 연결로 합칩니다.',
      'Rust 폴더 규칙은 Android에서는 uniffi 라이브러리로, 웹에서는 wasm으로 앱에 들어옵니다.',
    ],
    reliability: [
      '동기화는 파일 50개마다 한 트랜잭션으로 저장하고, 중간에 끊긴 순회는 다음 실행에서 이어 갑니다.',
      '백그라운드 작업은 8분 예산에 알림을 먼저 예약하므로 NAS가 고장 나도 알림은 옵니다.',
      '갤러리 루트가 비어 있으면 순회를 멈추므로 마운트되지 않은 공유가 색인을 지우지 않습니다.',
    ],
    security: [
      'NAS 로그인은 expo-secure-store를 거쳐 Android 키스토어에 있고, 앱은 Basic 헤더로 보냅니다.',
      '앨범 링크에는 16바이트 무작위 토큰이 들어 있습니다. 앨범 서버는 갤러리를 읽기 전용으로 마운트하고 다른 경로에는 404를 돌려줍니다.',
      '장소 이름은 앱 안의 오프라인 데이터베이스에서 가져오므로 GPS 좌표가 휴대폰 밖으로 나가지 않습니다.',
      '집의 NAS에는 인증서가 드물어서 일반 http를 허용합니다.',
    ],
    performance: [
      'FlashList는 보이는 타일과 한 화면 앞까지 그립니다. 타일은 앞 66 KB에서 읽은 작은 EXIF 썸네일을 보여 줍니다.',
      '읽기는 큐에서 8개씩 최신 순으로 돌고, 네이티브 모듈이 OkHttp의 호스트당 요청을 5개에서 32개로 늘립니다.',
      'days와 geo_cells 테이블 덕분에 월 목록, 여행, 지도가 100만 개의 파일 행을 읽지 않습니다.',
      'NAS의 인덱서는 자기 디스크에서 헤더를 밀리초에 읽지만 WebDAV로는 몇 초가 걸립니다.',
    ],
    operations: [
      'pnpm 모노레포이고 node, pnpm, java, rust 버전은 mise.toml에 고정하며 락파일은 하나입니다.',
      '검사가 통과한 main 푸시마다 날짜 버전의 서명된 APK를 공개하고, 검사가 실패하면 release-gate.sh가 빌드를 취소합니다.',
      '설치된 앱은 GitHub API로 최신 릴리스를 읽습니다. Google Play 빌드는 업데이터를 스텁으로 바꾸고 하루에 한 번 빌드합니다.',
      'NAS의 컨테이너는 deploy 스크립트로 ssh를 통해 배포합니다.',
    ],
    tradeoffs: [
      '자체 서버 대신 일반 WebDAV를 골라 어떤 NAS든 되지만 첫 동기화는 느립니다.',
      '서버 데이터베이스 대신 휴대폰의 SQLite를 골라 오프라인에서도 되고 호스팅 비용이 없습니다.',
      'UTC 대신 벽시계 촬영 시각을 골라 오늘의 추억은 단순한 범위로 남지만 두 시간대의 사진은 정확히 줄 세울 수 없습니다.',
      '앱마다 복사본 대신 Rust 폴더 규칙 크레이트 하나를 골라 휴대폰과 데스크톱이 같게 분류하는 대신 ABI마다 1에서 2 MB가 늘어납니다.',
    ],
  },
  features: {
    'Daily reminder':
      'expo-notifications가 다음 7일 치 일회성 알림을 들고 있고 백그라운드 작업이 색인으로 예약합니다. 그날 해외여행이 있었다면 그해가 뽑힙니다.',
    Today:
      '날짜별 사진 수 표를 조회해 이 날짜에 사진이 있는 해를 찾습니다. 트리거가 이 표를 유지해서 파일 행은 읽지 않습니다.',
    Trips:
      '앱이 날짜별 집계에서 해외에 있던 연속된 날을 잘라 냅니다. 여행 링크는 첫날부터 마지막 날까지의 사진을 엽니다.',
    Photos:
      'FlashList가 화면의 타일과 한 화면 앞의 타일을 그립니다. 타일마다 휴대폰에 캐시한 작은 EXIF 썸네일을 보여 줍니다.',
    'Filter by place':
      '장소 검색은 날짜별 집계에서 나라와 장소를 읽습니다. 고른 장소는 갤러리 조회마다 조건으로 붙습니다.',
    'Camera and drone shots':
      '동기화 때 EXIF 모델이나 파일 이름으로 휴대폰, 카메라, 드론을 가립니다. 색인이 파일마다 이를 적어 둡니다.',
    'Tile size': '핀치 처리기가 한 줄의 타일을 1개에서 6개로 정합니다. 저장된 값 하나가 각 격자를 움직입니다.',
    'Send many photos at once':
      '앱이 고른 파일을 3개씩 캐시에 복사합니다. 작은 네이티브 모듈이 시스템 공유 시트로 한 번에 넘깁니다.',
    'Share an album by link':
      '앱이 WebDAV로 NAS에 앨범 파일을 씁니다. NAS의 Node 서버가 Tailscale Funnel로 이를 보여 주며 미리보기는 sharp가 만듭니다.',
    'Memories in the browser':
      'NAS의 Node 서버가 웹 버전을 내보내고 같은 주소로 WebDAV를 넘깁니다. Tailscale Serve가 tailnet 안에만 열어 둡니다.',
    Organize:
      '카드마다 카메라 정리, 업로드, 공간 비우기 중 한 작업을 돌립니다. 파일을 옮기기 전에 Rust 폴더 규칙이 폴더와 이름을 정합니다.',
    'Import from Google Photos':
      'Google 포토 Picker API는 사용자가 고른 항목만 보여 줍니다. 앱이 이를 카메라 폴더로 받고 업로드가 이어받습니다.',
    'Sort picked photos on the NAS':
      'Rust 폴더 규칙이 파일마다 새 폴더와 이름을 정합니다. WebDAV MOVE로 옮기면 휴대폰 색인도 곧바로 따라갑니다.',
    Viewer:
      'expo-image가 캐시한 썸네일 위에 원본 사진을 띄웁니다. expo-video가 범위 요청으로 NAS의 동영상을 재생합니다.',
    'Connect to the NAS':
      'mDNS 검색이 Wi-Fi의 기기를 나열하고 탐색이 WebDAV 포트를 찾습니다. 로그인은 휴대폰의 보안 저장소에 남습니다.',
    'Photos away from home':
      '시작할 때와 네트워크가 바뀔 때마다 집 주소를 시험합니다. 응답이 없으면 앱이 Tailscale 주소로 바꿉니다.',
    'Sync progress':
      '배너가 휴대폰의 실시간 동기화 상태를 읽습니다. NAS 부분은 색인기가 1분마다 쓰는 상태 파일에서 옵니다.',
    'Mobile data':
      '모바일 데이터에서는 NAS 작업마다 확인 하나가 앞에 섭니다. 저장한 답에 따라 작업이 돌거나 Wi-Fi를 기다립니다.',
    'Index from the NAS':
      'NAS의 Node 컨테이너가 자기 디스크에서 헤더를 읽고 사진 옆에 색인 파일을 씁니다. 휴대폰이 이를 받아 없는 행을 더합니다.',
    'Move the index to a new phone':
      'SQLite가 색인의 NAS 부분을 파일 하나로 복사해 공유 시트에 넘깁니다. 새 휴대폰은 그 파일을 붙이고 행을 복사해 옵니다.',
    Language:
      'i18next가 9개 카탈로그를 들고 expo-localization이 휴대폰 언어를 읽습니다. 설정에서 고른 언어가 먼저이며 알림을 다시 예약합니다.',
    Theme: '팔레트 하나에 밝은 색과 어두운 색 묶음이 있습니다. 화면은 휴대폰이나 저장한 선택을 따르는 훅으로 읽습니다.',
    'Ads and remove ads':
      '동의 후 Google Mobile Ads가 AdMob 배너와 전면 광고를 보여 줍니다. expo-iap가 Google Play에서 광고 제거를 판매합니다.',
    'Memories Pro':
      'expo-iap가 Google Play와 App Store에서 판매합니다. 잠긴 기능을 열기 전에 모듈 하나가 구매를 확인합니다. 휴대폰의 카운터가 그 달의 무료 검색 5회를 저장하고, 인물 목록은 사진이 가장 많은 3명을 무료로 표시합니다.',
    'Desktop sorter':
      'Rust 백엔드를 갖춘 Tauri 앱이 컴퓨터의 폴더를 정리합니다. 휴대폰과 같은 폴더 규칙 크레이트를 씁니다.',
    Archive: '월 목록은 트리거가 유지하는 날짜별 사진 수를 읽습니다. 누르면 그 달의 파일을 촬영 시각으로 조회합니다.',
    'Trip list and places map':
      '여행 목록은 날짜별 집계에서 해외여행과 국내 자동차 여행을 모읍니다. WebView의 Leaflet이 작은 칸별 사진 수로 지도를 그립니다.',
    People:
      'NAS의 Rust 엔진이 YuNet과 SFace로 얼굴을 묶습니다. 휴대폰이 결과를 받아 이름과 합치기를 NAS에 다시 씁니다.',
    'Journal about a person':
      '사람마다 NAS에 JSON 파일이 있고, If-Match로 써서 두 앱이 기록을 추가할 수 있습니다. 고른 사진과 동영상은 그 옆에 올라가고, 그날의 사진은 얼굴 그룹에서 고릅니다. Cloudflare Worker가 Google 문서의 기록을 다듬고 앱의 수정을 되돌려 보냅니다.',
    'Search by what a photo shows':
      'NAS의 얼굴 엔진이 사진마다 CLIP도 돌려 362개 라벨 중 맞는 것을 남깁니다. 휴대폰이 이를 받아 얼굴, 장소와 함께 찾습니다.',
    'Event folders in any file browser':
      'NAS의 Node 컨테이너가 매일 밤 폴더 이름의 태그를 읽고 그 폴더로 가는 심볼릭 링크를 만듭니다. Samba가 링크를 따라가므로 SMB 클라이언트에는 일반 폴더로 보입니다.',
    'Indexing progress page':
      '얼굴 엔진과 색인기가 NAS에 상태 파일을 씁니다. Node 서버가 이를 서버 전송 이벤트로 갱신되는 페이지로 만듭니다.',
    'Albums about a person':
      '앨범 파일에 그 사람, 생일, 메모가 담깁니다. NAS의 앨범 서버가 사진을 나이별 한 해씩 나눕니다.',
    'Turn a photo':
      '얼굴 엔진이 사진을 90도, 180도, 270도로 돌려 봅니다. 휴대폰이 EXIF 방향을 정하고 확인 뒤 NAS의 파일을 바꿉니다.',
    'Edit a photo':
      'Konva가 Expo DOM 컴포넌트 안에서 편집기를 돌립니다. 사본 저장은 JPEG를 휴대폰과 NAS에 쓰고 저장은 바이트를 비교한 뒤 파일을 바꿉니다.',
    'Draw a new picture':
      '같은 Konva 편집기가 빈 종이로 열립니다. 저장하면 업로드 규칙대로 휴대폰과 NAS에 그림을 씁니다.',
    'Photos on the phone':
      'Kotlin으로 만든 로컬 Expo 모듈이 한 번의 허락으로 카메라 폴더를 읽습니다. 그 파일은 NAS 파일과 같은 색인에 들어갑니다.',
    Settings: '작은 값은 expo-sqlite의 키값 저장소에 있고 시작할 때 읽습니다. NAS 비밀번호는 보안 저장소에 있습니다.',
    'Duplicates on the NAS':
      '색인 조회가 NAS 파일을 촬영 시각과 크기로 묶습니다. WebDAV로 바이트를 비교해 쌍을 확인한 뒤에야 사본이 NAS 휴지통으로 갑니다.',
    Updates:
      '공유 업데이트 패키지가 최신 GitHub 릴리스를 읽고 Android 설치 관리자를 엽니다. Google Play 빌드는 이를 빈 대체 모듈로 바꿉니다.',
    'Light, blur and fonts':
      'Konva 필터가 색 슬라이더를 적용하고 이어서 타원이나 띠 둘레를 흐립니다. 캡션마다 자기 글꼴 계열을 지킵니다.',
    'On the iPhone':
      'iOS용 파일이 Android 모듈을 사진 보관함, URLSession, App Store 버전으로 바꿉니다. 폴더 규칙은 Swift를 거쳐 Rust XCFramework로 돕니다.',
  },
};

export default arch;

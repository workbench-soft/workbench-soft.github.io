import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'NAS의 Docker에서 도는 .NET 동기화 서비스가 각 사진의 촬영일을 LiteDB 색인에 적었습니다. Windows 트레이의 WPF 앱이 그 색인을 날짜로 찾아 NAS에서 파일을 열었습니다.',
  parts: [
    { name: '.NET', role: 'NAS 서비스와 Windows 앱이 함께 쓰는 플랫폼.' },
    { name: 'Docker', role: 'NAS의 사진 보관소 옆에서 동기화 서비스를 돌렸습니다.' },
    { name: 'LiteDB', role: '촬영일 색인으로 갤러리가 하루씩 읽었습니다.' },
    { name: 'WPF', role: 'Windows의 트레이 아이콘, 갤러리, 사진 창.' },
    { name: 'Quartz', role: '매일 알림 작업을 실행하는 스케줄러.' },
  ],
  flow: [
    'NAS의 동기화 서비스가 각 사진의 EXIF를 읽었습니다.',
    '촬영일을 LiteDB 색인에 적었습니다.',
    '하루 한 번 Windows 알림이 갤러리로 불렀습니다.',
    '갤러리가 색인에서 그 기간의 사진을 찾았습니다.',
    '사진 보관소에서 파일을 바로 열었습니다.',
  ],
  links: [{ to: 'memories', text: '휴대폰 앱이 이를 대신하며 "오늘의 추억" 아이디어를 이어받았습니다.' }],
  design: {
    scale: [
      '한 사람과 Windows PC 한 대로 집 NAS의 사진 보관함을 읽습니다.',
      '색인에는 촬영 날짜만 있어서 사진에 비해 작게 유지됩니다.',
    ],
    data: [
      '내장형 문서 데이터베이스 LiteDB가 촬영 날짜 색인을 담습니다.',
      '동기화 서비스가 사진마다 EXIF를 읽고, 갤러리는 기간의 하루마다 색인을 엽니다.',
    ],
    interfaces: [
      'NAS의 동기화 서비스와 Windows 앱은 날짜로 읽는 LiteDB 색인에서 만납니다.',
      '앱은 사이에 서버 API 없이 NAS 보관함에서 사진 파일을 바로 엽니다.',
    ],
    reliability: [
      '동기화 서비스는 보관함 옆 Docker에서 돌았으므로 색인 작업에 PC가 필요 없었습니다.',
      '갤러리는 휴지통의 파일을 건너뛰고 나머지는 스크롤에 따라 불러옵니다.',
    ],
    security: [
      '계정도 클라우드 서비스도 없이 사진과 색인은 집의 NAS와 PC에 남았습니다.',
      '앱은 PC가 이미 가진 파일 접근 권한으로 보관함을 엽니다.',
    ],
    performance: [
      '촬영 날짜는 NAS에서 한 번만 읽으므로 갤러리가 사진을 훑을 필요가 없습니다.',
      '갤러리는 스크롤에 따라 기간의 하루씩 사진을 불러옵니다.',
    ],
    operations: [
      '동기화 서비스는 NAS의 Docker 컨테이너로, 앱은 Windows 프로그램으로 배포했습니다.',
      '휴대폰 앱이 대신하게 되어 저장소는 보관 처리되었습니다.',
    ],
    tradeoffs: [
      '스택 두 개 대신 두 부분 모두 .NET을 골라 플랫폼 하나로 NAS 서비스와 Windows 앱을 맡았습니다.',
      'PC에서 훑는 대신 NAS에서 만든 색인을 골라 갤러리를 열 때 날짜가 이미 준비되어 있었습니다.',
      'NAS를 WebDAV로 읽고 Windows PC가 필요 없는 휴대폰 앱으로 대체되었습니다.',
    ],
  },
  features: {
    Tray: 'WPF 창이 시스템 트레이에 머뭅니다. 클릭하거나 트레이 메뉴를 누르면 갤러리가 열립니다.',
    'Daily reminder': 'Quartz 작업이 버튼이 달린 Windows 알림을 띄웁니다. 버튼을 누르면 갤러리가 열립니다.',
    'Gallery by period':
      '갤러리가 기간의 날마다 LiteDB 색인을 엽니다. 휴지통의 파일은 건너뛰고 나머지는 스크롤에 맞춰 불러옵니다.',
    'Photo window': 'WPF 창이 사진 한 장을 크게 보여 줍니다. 키 하나로 기간 안의 다음 파일이나 이전 파일로 넘어갑니다.',
    'Details and map': '앱이 사진 파일에서 카메라 정보를 읽고 촬영 장소를 지도에 보여 줍니다.',
    Send: '고른 파일을 한 번의 동작으로 다른 앱에 보냅니다.',
  },
};

export default arch;

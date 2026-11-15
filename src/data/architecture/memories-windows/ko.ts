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

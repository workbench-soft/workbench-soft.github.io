import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'Android 휴대폰과 Google TV용 Kotlin 앱 하나가 휴대폰, USB 메모리, SMB 공유의 파일을 libVLC로 재생합니다. 라이브러리와 재생 위치는 기기의 SQLite에 남고, GitHub APK는 온라인 음악을 더합니다.',
  parts: [
    { name: 'Kotlin과 Android Views', role: '리모컨과 터치용 화면으로, 휴대폰과 TV가 같은 앱을 씁니다.' },
    { name: 'libVLC', role: '영상과 음악을 재생하고 태그를 읽으며 SMB 공유를 탐색합니다.' },
    { name: 'SQLite', role: '재생 위치, 음악과 책과 영상 라이브러리, 책마다의 위치를 담습니다.' },
    { name: 'Media3', role: '알림, 잠금 화면 조작, 블루투스 버튼을 갖춘 음악 세션입니다.' },
    { name: 'WorkManager', role: '음악, 책, 영상 폴더를 백그라운드에서 스캔합니다.' },
    { name: 'sherpa-onnx', role: '휴대폰에서 Hey Lumi를 알아듣는 키워드 감지기입니다.' },
    {
      name: 'Chaquopy와 yt-dlp',
      role: 'MusicBrainz 이름과 YouTube 소리를 쓰는 온라인 모듈로, GitHub APK에만 들어갑니다.',
    },
    { name: 'Google Play Billing과 AdMob', role: 'Pro와 광고 제거 구매, 휴대폰의 배너입니다.' },
  ],
  flow: [
    '사용자가 휴대폰 폴더, USB 메모리 또는 SMB 공유를 추가합니다.',
    '백그라운드 스캔이 이름과 태그를 기기의 SQLite에 씁니다.',
    '홈 화면이 파일, 노래, 책, 영상을 보여 줍니다.',
    '탭, 리모컨 버튼 또는 음성 명령으로 재생할 것을 고릅니다.',
    'libVLC가 재생하고 앱은 재생하면서 위치를 저장합니다.',
  ],
  links: [
    { to: 'guitar-upscale', text: '탭 찾기는 Android 링크로 재생 중인 노래를 Guitar Upscale에서 엽니다.' },
    { to: 'spotthecam', text: 'Hey Lumi는 Hey Spot과 마이크를 나눠 써서 두 문구가 함께 작동합니다.' },
    { to: 'keeppad', text: 'Hey Lumi는 Hey Keep과 같은 키워드 모델을 쓰고 마이크도 나눠 씁니다.' },
    { to: 'GitHub', text: 'APK와 업데이트는 GitHub 릴리스에서 옵니다.' },
    { to: 'Google Play', text: 'Play 빌드, 그 업데이트, Pro와 광고 제거 구매입니다.' },
  ],
  features: {
    Sources:
      'USB 폴더는 Android 파일 시스템으로 열고 SMB 공유는 libVLC가 탐색합니다. 저장된 NAS 목록은 기기에 남고 Android 백업에서 빠집니다.',
    Resume:
      '플레이어는 5초마다 그리고 종료할 때 위치를 SQLite에 저장합니다. 파일 목록은 같은 표를 읽어 파일 아래에 막대를 보여 줍니다.',
    'Subtitles and audio':
      'libVLC가 내장 트랙과 폴더 안의 자막 파일을 나열합니다. 텍스트 자막은 UTF-8로 읽고 안 되면 Windows-1251로 읽습니다.',
    Controls: '플레이어가 libVLC의 건너뛰기와 속도를 조절합니다. 대기열 모듈이 재생 순서, 셔플, 반복을 맡습니다.',
    Updates:
      '시작할 때 APK가 GitHub의 최신 릴리스를 읽고 새 APK를 내려받습니다. 그다음 Android 설치 프로그램이 확인을 묻습니다.',
    Ads: 'AdMob은 Google 동의 양식 뒤에 휴대폰에 배너를 보여 줍니다. 광고 제거나 Pro를 사면 검사 하나가 배너를 숨기고, TV에는 광고가 없습니다.',
    Languages:
      'Android 문자열 리소스가 9개 언어를 담습니다. AppCompat 언어 API가 설정의 선택이나 기기 언어를 적용합니다.',
    'Touch on a phone':
      '영상 위의 제스처 층이 탭과 드래그를 건너뛰기, 탐색, 밝기, 음량으로 바꿉니다. TV 리모컨은 이 층을 거치지 않습니다.',
    'Panel buttons':
      '고른 버튼 묶음은 기기의 플레이어 설정에 남습니다. 플레이어는 그 묶음으로 버튼 줄을 만들고 libVLC가 화면 비율을 바꿉니다.',
    'Sponsor skip':
      '플레이어는 파일 속 SponsorBlock 챕터를 읽거나 영상 ID의 해시로 SponsorBlock API에 묻습니다. 그다음 libVLC가 각 구간을 건너뜁니다.',
    'Phone speaker':
      '내장 스피커를 고르는 무음 오디오 트랙이 libVLC 소리도 함께 끌고 갑니다. 1초마다 하는 검사가 소리 없는 블루투스를 스피커로 되돌립니다.',
    Look: '코드로 만든 단순한 Android Views가 색, 글꼴, 포커스 알약을 함께 씁니다. 로고는 Instrument Serif입니다.',
    'Music library':
      'WorkManager 작업이 폴더를 하나씩 돌며 libVLC로 태그를 읽습니다. 노래는 기기의 SQLite에 들어가고 Android 백업에서 빠집니다.',
    'Music player':
      'Media3 세션이 libVLC로 노래를 영상 없이 재생합니다. 알림과 잠금 화면 조작을 그리고 플레이어 바는 화면마다 이를 따릅니다.',
    'MusicBrainz and YouTube':
      'MusicBrainz가 노래, 아티스트, 앨범 이름을 줍니다. yt-dlp는 Chaquopy를 통해 Python에서 돌며 YouTube에서 소리를 가져옵니다. GitHub APK 전용입니다.',
    Audiobooks:
      '스캔이 OPF 파일, 태그, 폴더 이름으로 오디오 파일을 책으로 묶습니다. Wikidata가 저자를 알려 주고 SQLite가 책마다 위치를 담습니다.',
    'Video library':
      '스캔은 영상마다 경로만 SQLite에 저장합니다. 파서가 이름에서 시리즈, 시즌, 회차를 읽고 Wikidata가 다른 이름을 더합니다.',
    'Find tabs':
      '플레이어 바가 아티스트와 제목이 담긴 Android 링크를 Guitar Upscale에 보냅니다. Android가 그 앱을 찾을 때만 버튼이 보입니다.',
    'Google Play build':
      '두 번째 빌드 유형은 자체 업데이트, 넓은 파일 접근, 온라인 모듈을 뺍니다. 업데이트는 Google Play가 맡습니다.',
    'Voice commands':
      'sherpa-onnx가 휴대폰에서 Hey Lumi를 듣고 Android 음성 인식이 명령을 받습니다. 매처가 노래, 책, 영상을 찾고 음성 합성이 답합니다.',
    'Online music':
      '온라인 모듈이 Chaquopy의 Python에서 yt-dlp를 실행합니다. MusicBrainz가 노래 이름을, YouTube가 소리를 주며 64비트 휴대폰의 GitHub APK에만 있습니다.',
    'Lumiere Pro':
      'Google Play Billing이 Pro 상품 하나를 팔고 앱은 시작할 때마다 Google Play에 묻습니다. 앱 안의 검사 하나가 음성 기능을 열고 배너를 숨깁니다.',
  },
};

export default arch;

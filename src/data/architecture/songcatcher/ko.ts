import type { Arch } from '../types';

const arch: Arch = {
  summary:
    '서버가 없는 Kotlin Android 앱입니다. 포그라운드 서비스가 호출어를 듣고, 휴대폰이 Shazam 지문을 직접 만들며, 노래는 Spotify와 Lumiere로 갑니다.',
  parts: [
    { name: 'ListenService', role: '포그라운드 마이크 서비스. 80 ms씩 읽고, 잡기를 시작하고, 결과를 말합니다.' },
    { name: 'sherpa-onnx', role: '한 줄의 문구로 "Shazam"을 듣는 키워드 검출기. 학습이 필요 없습니다.' },
    { name: 'Signature.kt', role: 'shazamio 지문의 Kotlin 이식. 16 kHz 모노 FFT와 4개 대역의 피크입니다.' },
    { name: 'Shazam', role: '인식 서비스. 3, 6, 9, 12초에 지문으로 묻습니다.' },
    {
      name: 'Recognizer.kt',
      role: '인식 방법을 고릅니다. 빌드에 SDK와 개발자 토큰이 있으면 ShazamKit, 없으면 Shazam 엔드포인트입니다.',
    },
    { name: 'Spotify.kt', role: 'PKCE 로그인, ISRC로 곡 찾기, 좋아요 표시한 곡에 저장.' },
    { name: 'wakeshare', role: '이 저장소의 공유 마이크 모듈. 다른 호출어 앱도 자기 문구를 지킵니다.' },
  ],
  flow: [
    '키워드 검출기가 "Shazam"을 듣고, 서비스가 마이크를 잡고 삐 소리를 냅니다.',
    '잡기가 녹음하며 지문을 만들고, 그동안 뒤에서 Shazam에 묻습니다.',
    '찾은 노래는 broadcast로 Lumiere에, 그리고 Spotify 좋아요 표시한 곡에 갑니다.',
    '목소리가 결과를 말하고, 마이크는 다시 모든 호출어를 듣습니다.',
  ],
  links: [
    { to: 'Shazam', text: '지문을 받아 제목, 아티스트, 앨범, ISRC로 답합니다.' },
    {
      to: 'ShazamKit',
      text: 'Apple 공식 카탈로그. SDK와 토큰을 넣은 빌드에서 씁니다. 직접 지문을 만들고 곡으로 답합니다.',
    },
    { to: 'Spotify', text: 'ISRC로, 다음에 아티스트와 제목으로 곡을 찾아 좋아요 표시한 곡에 저장합니다.' },
    { to: 'lumiere-player', text: 'broadcast LIKE_CAUGHT_SONG으로 노래를 받아 좋아요 표시한 곡에 넣습니다.' },
    { to: 'keeppad', text: 'wakeshare로 SongCatcher, SpotTheCam, ServoHop과 마이크를 함께 씁니다.' },
  ],
  design: {
    scale: [
      '주인 한 명의 휴대폰, 하루 몇 번의 잡기.',
      'Shazam이 2분에 약 15번 묻자 429로 답했으므로, 한 번의 잡기는 최대 4번 보냅니다.',
    ],
    data: [
      '최근 50곡과 Spotify 상태는 shared preferences에 있습니다.',
      '오프라인에서 만든 지문은 그 옆에서 최대 1주일 기다립니다. 소리 자체는 남기지 않습니다.',
    ],
    interfaces: [
      'amp.shazam.com으로 지문을 보내는 HTTPS POST와 bearer 토큰을 쓰는 Spotify Web API.',
      'com.workbenchsoft.lumiere로 가는 명시적 broadcast와 다른 호출어 앱을 위한 wakeshare 바인드 서비스.',
    ],
    reliability: [
      '네트워크가 없거나 429, 5xx가 오면 지문을 남기고, 다음 호출이나 시작 때 보냅니다.',
      'Spotify 라이브러리가 확인해야 저장됨으로 표시합니다. 나머지는 버튼으로 다시 시도합니다.',
    ],
    security: [
      '로그인은 PKCE라서 클라이언트 비밀이 없습니다. 새로 고침 토큰은 Android Keystore 키로 암호화됩니다.',
      '휴대폰 밖으로는 몇 KB의 피크인 지문만 나갑니다. 녹음은 잡기가 끝나면 사라집니다.',
    ],
    performance: [
      '묻기는 두 번째 스레드에서 돌아, Shazam이 0.3에서 0.6초 안에 답하는 동안에도 녹음이 이어집니다.',
      '첫 묻기는 음악 3초 뒤에 나가고, 대부분의 노래는 그때 찾습니다.',
    ],
    operations: [
      'CI가 단위 테스트를 돌리고 APK를 songcatcher 아티팩트로 빌드합니다.',
      'SignatureTest는 지문을 shazamio 바이트에, CatalogTest는 9개 문자열 카탈로그를 맞춥니다.',
      'scripts/shazamkit-token.ts가 ES256 개발자 토큰에 서명하고, mise run songcatcher:kit가 ShazamKit APK를 빌드합니다. Apple이 라이선스를 공개하지 않아 AAR은 git에 넣지 않습니다.',
    ],
    tradeoffs: [
      '묻기마다 유료 토큰이 드는 AudD와 Apple 개발자 비용이 드는 ShazamKit 대신 무료 Shazam 엔드포인트를 골랐습니다. 공개 API가 아니라 바뀔 수 있습니다.',
      '학습된 openWakeWord 헤드 대신 sherpa 문구 한 줄로, 학습 없이 냈습니다. 헤드는 나중에 옵니다.',
      'Lumiere 안의 기능 대신 별도 앱으로, Lumiere가 꺼져도 잡기가 됩니다. 설치할 APK가 하나 늘어납니다.',
      'ShazamKit은 Apple 개발자 키를 기다립니다. 그 키를 넣은 빌드는 공식 카탈로그에 묻습니다. Google Play 유료 출시를 위한 정식 방법입니다. CI 빌드는 엔드포인트를 그대로 씁니다.',
    ],
  },
  features: {
    'Wake by voice':
      'KeywordAudio.kt가 keywords.txt의 줄로 sherpa-onnx를 돌립니다. ListenService.kt는 잡는 동안 공유 마이크를 잡고 Voice.kt로 삐 소리를 냅니다.',
    'Song recognition':
      'Catch.kt가 100 ms씩 Signature.kt에 넘기고 3, 6, 9, 12초에 지문을 보냅니다. Shazam.kt는 제목, 아티스트, 앨범, ISRC를 읽습니다. ShazamKit SDK와 토큰이 있으면 Recognizer.pick()이 KitRecognizer.kt를 골라 ShazamKit 카탈로그에서 찾습니다.',
    'Liked Songs in Spotify and Lumiere':
      'Lumiere.kt가 아티스트, 제목, 앨범, ISRC, 시각이 담긴 broadcast를 보냅니다. Spotify.kt는 ISRC로, 다음에 이름으로 찾아 라이브러리에 저장합니다.',
    'Spoken answer':
      'Voice.kt가 삐 소리를 내고 음악을 줄인 채 Android 음성 합성으로 말합니다. 화면의 스위치로 목소리를 끕니다.',
    'Offline catches':
      'History.kt가 지문과 길이를 남깁니다. 잡기 때마다와 시작할 때 서비스가 대기 중인 지문을 보내고 찾은 곡을 조용히 저장합니다.',
    'Caught songs':
      'History.kt가 최근 50곡과 Spotify 상태를 남깁니다. retryPending이 대기 중인 곡을 저장하고 몇 곡이 들어갔는지 알립니다.',
    Lyrics:
      'Lyrics.kt는 아티스트, 제목, 앨범으로 LRCLIB에 묻고, 이어서 검색하며, 답을 캐시 폴더에 저장합니다. Compose의 SongSheet는 로딩 표시, 가사 또는 재시도를 보여 줍니다.',
    'Find tabs in Guitar Upscale':
      'GuitarTabs.kt는 https://guitar-upscale.com/?song=<아티스트 제목>을 VIEW 인텐트로 Guitar Upscale 패키지에 보냅니다. Lumiere와 같은 링크입니다. 앱이 링크를 받을 때만 버튼이 보입니다.',
    Languages: '보이고 말하는 텍스트는 모두 res/values의 strings.xml에 9개 언어로 있고, CatalogTest가 키를 맞춥니다.',
    'Shared microphone':
      'WakeShare가 바인드 서비스로 호출어 앱을 잇습니다. 패키지 이름이 가장 작은 앱이 마이크를 잡고, 들은 문구의 앱에 WAKE를 보냅니다.',
    'Wake engine':
      'wakeword가 ONNX Runtime에서 openWakeWord 헤드를 주인별 검증기와 함께 돌립니다. 헤드가 없는 문구는 지금의 SongCatcher처럼 sherpa 검출기가 맡습니다.',
  },
};

export default arch;

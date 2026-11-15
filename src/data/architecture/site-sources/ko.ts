import type { Arch } from '../types';

const arch: Arch = {
  summary:
    '서버 없는 Manifest V3 Chrome 확장입니다. 팝업이 저장을 시작하고, service worker가 진행하며, 숨은 offscreen 페이지가 파일을 받아 zip을 만듭니다.',
  parts: [
    { name: '팝업', role: '호스트, 다운로드 버튼, 막대를 보여 주고 저장된 상태로 다시 그립니다.' },
    {
      name: 'Service worker',
      role: '탭마다 저장 하나를 진행하고, 페이지 스크립트를 넣고, zip을 Chrome 다운로드에 넘깁니다.',
    },
    { name: '페이지 스크립트', role: '각 프레임에서 돌며 HTML과 페이지가 불러온 각 URL을 돌려줍니다.' },
    { name: 'Offscreen 문서', role: '파일을 찾고 받아 zip으로 묶습니다. blob URL은 페이지만 만들 수 있기 때문입니다.' },
    { name: 'fflate', role: 'zip을 만들고 이미지와 글꼴은 그대로 넣습니다.' },
    { name: 'chrome.storage.session', role: '각 저장의 상태를 담아, 다시 연 팝업도 볼 수 있게 합니다.' },
    { name: 'chrome.i18n', role: '팝업 글과 확장 이름을 9개 언어로 제공합니다.' },
    { name: 'Vite', role: 'service worker, 팝업, offscreen 페이지를 번들합니다.' },
  ],
  flow: [
    '사용자가 팝업에서 다운로드를 누릅니다.',
    'service worker가 탭의 각 프레임에 스크립트를 넣습니다.',
    '스크립트가 HTML과 페이지가 불러온 URL을 돌려줍니다.',
    'offscreen 페이지가 source map과 스타일시트로 파일을 더 찾고 받습니다.',
    '개수는 세션 저장소를 거쳐 100ms마다 팝업에 닿습니다.',
    'Chrome 다운로드가 zip을 다운로드 폴더에 저장합니다.',
  ],
  links: [],
  design: {
    scale: [
      '한 사람이 한 번에 열린 페이지 하나를 저장하고, 탭 두 개는 동시에 저장할 수 있습니다.',
      'zip을 다 쓸 때까지 파일이 메모리에 있으므로, 수백 MB 규모의 사이트는 실패할 수 있습니다.',
    ],
    data: [
      '저장 한 번은 호스트와 시각으로 이름 붙인 zip이며, index.html, 호스트별 폴더, _sources, _frames가 들어 있습니다.',
      '각 저장의 상태는 chrome.storage.session에 있습니다. 개수, 실패한 파일, 단계입니다.',
      'zip이 다운로드 폴더에 들어간 뒤에는 아무것도 저장하지 않습니다. 확장 프로그램에는 기록도 설정도 없습니다.',
    ],
    interfaces: [
      '팝업, 서비스 워커, 오프스크린 페이지는 chrome.runtime 메시지와 세션 스토리지의 상태로 대화합니다.',
      'chrome.scripting으로 주입한 페이지 스크립트가 HTML과 performance 항목, src, link href의 주소를 돌려줍니다.',
      'zip은 blob URL로 나가고 chrome.downloads가 다운로드 폴더에 저장합니다.',
    ],
    reliability: [
      '서버가 거부한 파일은 실패로 세고 zip에 넣지 않으며 재시도하지 않습니다. 가져오기는 2분 뒤 멈춥니다.',
      '팝업은 저장 도중 닫혀도 다시 열 때 세션 스토리지에서 다시 그리므로 저장은 계속됩니다.',
      '공유 Promise 하나가 오프스크린 페이지를 만들어서, 두 번째 탭은 Chrome이 허용하는 하나를 재사용합니다.',
    ],
    security: [
      '확장 프로그램은 activeTab, scripting, downloads, storage, offscreen과 모든 URL을 요청합니다. 페이지가 불러오는 어느 사이트에서든 파일을 가져오기 때문입니다.',
      '자체 서버로는 아무것도 보내지 않습니다. 요청은 페이지가 이미 쓰는 사이트로만 갑니다.',
      '확장 프로그램이 보낼 수 없는 로그인 뒤의 파일은 실패로 셉니다. Chrome 페이지와 Chrome 웹 스토어는 확장 프로그램을 거부합니다.',
    ],
    performance: [
      '탐색은 라운드마다 스크립트와 스타일시트를 나란히 가져와 바이트를 보관하므로, 묶을 때 다시 가져오지 않습니다.',
      '진행 개수는 합쳐서 최대 100 ms마다 보내고, 새 상태는 바로 보냅니다.',
      '이미지, 글꼴, 동영상 같은 압축된 형식은 다시 압축하지 않고 그대로 zip에 넣습니다.',
    ],
    operations: [
      'Vite가 서비스 워커, 팝업, 오프스크린 페이지를 번들합니다. fflate는 릴리스마다 확장 프로그램도 zip으로 묶습니다.',
      'main에 푸시할 때마다 검사와 나란히 zip을 빌드합니다. 게이트 스크립트는 검사가 통과하면 게시하고 실패하면 취소합니다.',
      '릴리스에는 v2026.11.02.1 같은 날짜 태그가 붙고 매니페스트에도 같은 버전이 있습니다. Chrome에는 압축을 푼 채로 불러옵니다.',
    ],
    tradeoffs: [
      '워커의 data URL 대신 오프스크린 페이지를 골랐습니다. blob URL은 페이지만 만들 수 있고 data URL은 3분의 1 더 크기 때문입니다.',
      '비동기 zip 대신 zipSync를 골랐습니다. 확장 프로그램 정책이 fflate 비동기 zip의 blob 워커를 막기 때문이며, 큰 zip에서는 잠시 멈춥니다.',
      '먼저 파일을 찾고 나서 가져와서 막대가 차는 동안 총계가 고정되게 했고, 큰 페이지에서는 첫 파일 전에 기다립니다.',
      'i18next 대신 chrome.i18n을 골랐습니다. 매니페스트 이름은 _locales에서만 가져올 수 있고 두 번째 카탈로그는 의미가 없기 때문입니다.',
    ],
  },
  features: {
    'Download from the popup':
      '팝업이 탭을 service worker에 넘기면 저장은 그쪽이 혼자 진행합니다. 상태는 세션 저장소에 있어서 팝업을 닫아도 계속됩니다.',
    'Progress bar':
      'offscreen 페이지가 먼저 파일을 찾으므로 합계가 바뀌지 않습니다. 100ms마다 완료와 실패 개수를 보내고, 팝업은 그것으로 다시 그립니다.',
    'One zip':
      'fflate가 라이브 HTML과 각 파일을 서버 경로 그대로 호스트별 폴더에 넣습니다. Chrome 다운로드가 호스트와 시각을 이름에 붙여 저장합니다.',
    'Original sources':
      'offscreen 페이지가 각 스크립트와 스타일시트의 source map을 읽습니다. map 안의 원본 파일은 zip 안 각자의 폴더로 갑니다.',
    Languages: 'chrome.i18n이 Chrome 언어로 카탈로그를 고릅니다. 9개 카탈로그에 팝업 글, 이름, 설명이 있습니다.',
  },
};

export default arch;

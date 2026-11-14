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

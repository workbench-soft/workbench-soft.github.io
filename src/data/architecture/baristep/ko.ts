import type { Arch } from '../types';
const arch: Arch = {
  summary: 'Expo가 Android, iOS, 웹에서 화면을 공유합니다.',
  parts: [
    { name: 'Expo', role: 'Expo가 Android, iOS, 웹에서 화면을 공유합니다.' },
    { name: 'AsyncStorage', role: 'AsyncStorage가 단계 체크 표시를 기기에 저장합니다.' },
    { name: 'Cloudflare R2', role: '그림과 승인된 영상 2개를 CDN을 통해 Cloudflare R2에서 불러옵니다.' },
    { name: 'expo-video', role: '현재 단계만 expo-video로 영상을 재생합니다.' },
  ],
  flow: [
    '음료 데이터가 1잔 또는 2잔용 단계를 선택합니다.',
    '초콜릿 카푸치노와 하트, 튤립, 잎 모양 라테를 1잔 또는 2잔 만듭니다. 손그림, 타이머, 저장되는 체크 표시가 각 단계를 안내합니다. 따르는 단계에는 컵 각도와 피처 높이가 표시됩니다. 원과 하트 단계에는 무음 반복 영상이 있으며 나머지 33개 장면은 그림입니다.',
    'AsyncStorage가 단계 체크 표시를 기기에 저장합니다.',
  ],
  links: [
    { to: 'GitHub', text: 'GitHub에서 서명된 Android APK를 배포합니다.' },
    { to: 'Cloudflare R2', text: '그림과 승인된 영상 2개를 CDN을 통해 Cloudflare R2에서 불러옵니다.' },
  ],
  design: {
    scale: ['Expo가 Android, iOS, 웹에서 화면을 공유합니다.', '음료 데이터가 1잔 또는 2잔용 단계를 선택합니다.'],
    data: ['음료 데이터가 1잔 또는 2잔용 단계를 선택합니다.', 'AsyncStorage가 단계 체크 표시를 기기에 저장합니다.'],
    interfaces: [
      '그림과 승인된 영상 2개를 CDN을 통해 Cloudflare R2에서 불러옵니다.',
      'GitHub에서 서명된 Android APK를 배포합니다.',
    ],
    reliability: [
      'AsyncStorage가 단계 체크 표시를 기기에 저장합니다.',
      '나머지 33개 장면은 영상 승인을 기다리는 동안 그림을 사용합니다.',
    ],
    security: ['계정 없이 사용하며 진행 상황은 기기에 저장합니다.', 'GitHub에서 서명된 Android APK를 배포합니다.'],
    performance: [
      '그림과 승인된 영상 2개를 CDN을 통해 Cloudflare R2에서 불러옵니다.',
      '현재 단계만 expo-video로 영상을 재생합니다.',
    ],
    operations: ['GitHub에서 서명된 Android APK를 배포합니다.', 'APK 공개 전에 검사와 에뮬레이터 실행을 통과합니다.'],
    tradeoffs: [
      'Expo가 Android, iOS, 웹에서 화면을 공유합니다.',
      '나머지 33개 장면은 영상 승인을 기다리는 동안 그림을 사용합니다.',
    ],
  },
  features: {
    'Coffee guide':
      '초콜릿 카푸치노와 하트, 튤립, 잎 모양 라테를 1잔 또는 2잔 만듭니다. 손그림, 타이머, 저장되는 체크 표시가 각 단계를 안내합니다. 따르는 단계에는 컵 각도와 피처 높이가 표시됩니다. 원과 하트 단계에는 무음 반복 영상이 있으며 나머지 33개 장면은 그림입니다.',
    'Releases and updates':
      'Android는 시작하거나 돌아올 때 GitHub의 새 APK를 확인합니다. 메뉴에서 버전을 보고 직접 확인하며 다운로드 진행률도 표시합니다. iOS와 웹에는 APK 업데이트 기능이 없습니다.',
  },
};
export default arch;

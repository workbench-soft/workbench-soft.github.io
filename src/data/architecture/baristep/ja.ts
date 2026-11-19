import type { Arch } from '../types';
const arch: Arch = {
  summary: 'ExpoでAndroid、iOS、ウェブの画面を共通化しています。',
  parts: [
    { name: 'Expo', role: 'ExpoでAndroid、iOS、ウェブの画面を共通化しています。' },
    { name: 'AsyncStorage', role: 'AsyncStorageが手順のチェックを端末に保存します。' },
    { name: 'Cloudflare R2', role: '画像と承認済みの2本の動画はCDN経由でCloudflare R2から読み込みます。' },
    { name: 'expo-video', role: '現在の手順だけがexpo-videoで動画を再生します。' },
  ],
  flow: [
    '飲み物のデータから1杯用または2杯用の手順を選びます。',
    'チョコ入りカプチーノと、ハート、チューリップ、リーフのラテを1杯または2杯作れます。手描きの手順、タイマー、保存されるチェックで進めます。注ぐ手順にはカップの角度とピッチャーの高さを表示。円とハートには無音ループ動画があり、残る33場面は画像です。',
    'AsyncStorageが手順のチェックを端末に保存します。',
  ],
  links: [
    { to: 'GitHub', text: 'GitHubで署名済みAndroid APKを配布します。' },
    { to: 'Cloudflare R2', text: '画像と承認済みの2本の動画はCDN経由でCloudflare R2から読み込みます。' },
  ],
  design: {
    scale: [
      'ExpoでAndroid、iOS、ウェブの画面を共通化しています。',
      '飲み物のデータから1杯用または2杯用の手順を選びます。',
    ],
    data: ['飲み物のデータから1杯用または2杯用の手順を選びます。', 'AsyncStorageが手順のチェックを端末に保存します。'],
    interfaces: [
      '画像と承認済みの2本の動画はCDN経由でCloudflare R2から読み込みます。',
      'GitHubで署名済みAndroid APKを配布します。',
    ],
    reliability: [
      'AsyncStorageが手順のチェックを端末に保存します。',
      '残る33場面は動画の承認を待つ間、画像を使います。',
    ],
    security: ['アカウントは不要で、進み具合は端末に保存します。', 'GitHubで署名済みAndroid APKを配布します。'],
    performance: [
      '画像と承認済みの2本の動画はCDN経由でCloudflare R2から読み込みます。',
      '現在の手順だけがexpo-videoで動画を再生します。',
    ],
    operations: ['GitHubで署名済みAndroid APKを配布します。', 'APK公開前にチェックとエミュレーター起動を行います。'],
    tradeoffs: [
      'ExpoでAndroid、iOS、ウェブの画面を共通化しています。',
      '残る33場面は動画の承認を待つ間、画像を使います。',
    ],
  },
  features: {
    'Coffee guide':
      'チョコ入りカプチーノと、ハート、チューリップ、リーフのラテを1杯または2杯作れます。手描きの手順、タイマー、保存されるチェックで進めます。注ぐ手順にはカップの角度とピッチャーの高さを表示。円とハートには無音ループ動画があり、残る33場面は画像です。',
    'Releases and updates':
      'Androidは起動時と復帰時にGitHubの新しいAPKを確認します。メニューでバージョン表示と手動確認ができ、ダウンロードの進み具合も表示します。iOSとウェブにAPK更新機能はありません。',
  },
};
export default arch;

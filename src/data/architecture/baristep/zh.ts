import type { Arch } from '../types';
const arch: Arch = {
  summary: 'Expo 在 Android、iOS 和网页端共享界面。',
  parts: [
    { name: 'Expo', role: 'Expo 在 Android、iOS 和网页端共享界面。' },
    { name: 'AsyncStorage', role: 'AsyncStorage 在设备上保存步骤勾选记录。' },
    { name: 'Cloudflare R2', role: '图片和 2 段已批准的视频通过 CDN 从 Cloudflare R2 加载。' },
    { name: 'expo-video', role: '只有当前步骤通过 expo-video 播放视频。' },
  ],
  flow: [
    '饮品数据选择 1 杯或 2 杯的制作步骤。',
    '制作巧克力卡布奇诺，以及心形、郁金香或叶形拿铁，可选 1 杯或 2 杯。手绘步骤、计时器和保存的勾选记录引导制作。倒奶步骤标明杯子倾角和奶缸高度。圆形和心形步骤配有静音循环视频；其余 33 个场景使用图片。',
    'AsyncStorage 在设备上保存步骤勾选记录。',
  ],
  links: [
    { to: 'GitHub', text: 'GitHub 托管已签名的 Android APK。' },
    { to: 'Cloudflare R2', text: '图片和 2 段已批准的视频通过 CDN 从 Cloudflare R2 加载。' },
  ],
  design: {
    scale: ['Expo 在 Android、iOS 和网页端共享界面。', '饮品数据选择 1 杯或 2 杯的制作步骤。'],
    data: ['饮品数据选择 1 杯或 2 杯的制作步骤。', 'AsyncStorage 在设备上保存步骤勾选记录。'],
    interfaces: ['图片和 2 段已批准的视频通过 CDN 从 Cloudflare R2 加载。', 'GitHub 托管已签名的 Android APK。'],
    reliability: ['AsyncStorage 在设备上保存步骤勾选记录。', '其余 33 个场景使用图片，视频等待批准。'],
    security: ['指南无需账号，进度保存在设备上。', 'GitHub 托管已签名的 Android APK。'],
    performance: ['图片和 2 段已批准的视频通过 CDN 从 Cloudflare R2 加载。', '只有当前步骤通过 expo-video 播放视频。'],
    operations: ['GitHub 托管已签名的 Android APK。', 'APK 发布前须通过检查和模拟器启动验证。'],
    tradeoffs: ['Expo 在 Android、iOS 和网页端共享界面。', '其余 33 个场景使用图片，视频等待批准。'],
  },
  features: {
    'Coffee guide':
      '制作巧克力卡布奇诺，以及心形、郁金香或叶形拿铁，可选 1 杯或 2 杯。手绘步骤、计时器和保存的勾选记录引导制作。倒奶步骤标明杯子倾角和奶缸高度。圆形和心形步骤配有静音循环视频；其余 33 个场景使用图片。',
    'Releases and updates':
      'Android 在启动和返回时检查 GitHub 上的新 APK。菜单显示版本并支持手动检查；下载时显示进度。iOS 和网页不含 APK 更新程序。',
  },
};
export default arch;

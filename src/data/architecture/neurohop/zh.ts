import type { Arch } from '../types';

const arch: Arch = {
  summary:
    '一个 Expo 应用同时是网站、Android 应用和 iOS 应用。一个用 Rust 编写的 Cloudflare Worker 在同一域名下提供网站、来自 R2 的游戏内容和管理 API。',
  parts: [
    { name: 'Expo 和 React Native', role: '目录、游戏页面、设置和管理后台，支持 9 种语言。' },
    { name: 'Rust Worker', role: '提供网页导出、来自 R2 的 /content/*，以及供管理和高级游戏使用的 /api/*。' },
    { name: 'Cloudflare R2', role: '存放 index.json、每个游戏一个 JSON 文件和 WebP 图片。' },
    { name: 'Workbench 账户', role: '检查共享订阅，订阅可打开高级游戏并隐藏广告。' },
    { name: 'AdMob 和 AdSense', role: '应用和网站上的横幅广告。' },
  ],
  flow: [
    '应用加载包含列表和卡片的 /content/index.json。',
    '搜索和筛选在设备上运行，不发请求。',
    '卡片打开 /content/games/<id>.json，高级游戏则带 Google ID 令牌请求 /api/premium/<id>。',
    '管理后台的写入会重建 index.json 并从边缘缓存中清除。',
  ],
  links: [
    { to: 'Cloudflare', text: 'Workers、R2 和边缘缓存。' },
    { to: 'account.workbench-soft.com', text: '回答该 Google 账户是否有 Workbench 订阅。' },
    { to: 'Google Play', text: '在 Android 应用中销售 Workbench 方案。' },
    { to: 'GitHub', text: '在 workbench-soft.github.io 存放已签名的 APK 版本。' },
  ],
  design: {
    scale: ['家长和专业人士，多为俄语使用者，每次阅读几个游戏。', '数百个游戏的目录放得进一个索引文件，由设备筛选。'],
    data: [
      '每个游戏是一个 JSON 文件，含年龄、脑功能区、目标和各部分。列表在 index.json 中。',
      '高级游戏位于 R2 的 premium/ 下，不在公开路径中。',
    ],
    interfaces: [
      'GET /content/* 提供 R2 文件。/api/premium/<id> 接收 Google ID 令牌。',
      '/api/admin/* 接收由管理密码换来的令牌，写入游戏、图片和列表。',
    ],
    reliability: [
      '应用保留索引和每个打开过的游戏的副本，离线时也能显示。',
      '等待超过 15 秒的请求算作失败，屏幕显示错误而不是加载提示。',
    ],
    security: [
      '管理密码和会话密钥是 Worker 机密，保存在 Bitwarden 中。',
      '只有 account.workbench-soft.com 确认方案后，Worker 才读取高级游戏。',
    ],
    performance: [
      'index.json 在浏览器缓存 60 秒，在边缘缓存 300 秒。图片缓存一年。',
      '图片为 WebP，文件名带哈希，所以新图片无需清除缓存。',
    ],
    operations: [
      '每次推送到 main 时，Checks 在 PC 运行器上运行 lint 和测试。',
      'Release 构建已签名的 APK，在模拟器上打开，并以 neurohop-v<version> 发布。Deploy 上线 Worker。',
    ],
    tradeoffs: [
      '网站和手机共用一个 Expo 应用而不是原生应用，这样每个功能只需发布一次。',
      '在设备上筛选而不是用搜索 API，因为整个目录放得进一个小文件。',
    ],
  },
  features: {
    'Catalog with filters and search':
      'catalog/ 在设备上筛选 index.json：同组勾选扩大列表，不同组之间缩小列表。没有图片的卡片使用其第一个脑功能区的颜色。',
    'Game page': 'game/ 按 id 加载游戏文件并绘制每个部分。每个游戏都有自己的路由，所以分享的链接能直接打开它。',
    'Premium games': 'Worker 带 Google ID 令牌询问 account.workbench-soft.com，然后从 R2 读取 premium/<id>.json。',
    'Free game of the week':
      'pro/free-game.ts 用 @workbench-soft/taste 的 freePick 按设备上的周选出游戏。Worker 用 Rust 保存同一规则，无需令牌即可提供该游戏。',
    Ads: 'ads/ 在应用中显示 AdMob 横幅，在网站上显示 AdSense，方案有效时隐藏它们。',
    'Settings and the Workbench plan':
      'pro/ 包含付费墙、Google Play 购买和 useEntitled()。网站和 iOS 登录后即可打开在手机上购买的方案。',
    Admin: 'admin/ 用密码登录，然后通过 /api/admin/* 编辑游戏、上传图片并导入 CSV。每次写入都会重建 index.json。',
    'App icon and store listing':
      '图标来自 design/icons/ 中的一个 SVG。store/listing.md 存放 Play 文案和控制台的回答。',
  },
};

export default arch;

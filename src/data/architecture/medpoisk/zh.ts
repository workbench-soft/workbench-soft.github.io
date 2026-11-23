import type { Arch } from '../types';

const arch: Arch = {
  summary: '一款没有服务器的 Expo 应用。手机上隐藏的 WebView 打开每个来源自己的搜索页，应用从返回的 HTML 里读出价格。',
  parts: [
    {
      name: 'Expo 和 React Native',
      role: '应用本身，界面用 expo-router，9 种语言用 i18next。',
    },
    {
      name: 'react-native-webview',
      role: '在后台打开每个搜索页，把页面 HTML 发回应用。',
    },
    {
      name: 'node-html-parser',
      role: '从这些 HTML 里读出价格，和测试在已保存页面上跑的解析代码是同一份。',
    },
    {
      name: 'metro.json',
      role: '把莫斯科每个地铁站、МЦК 和 МЦД 站对应到它的行政区。',
    },
    {
      name: 'expo-sqlite',
      role: '把采购清单存在手机上。',
    },
    {
      name: 'GitHub Actions',
      role: '检查每次推送，构建签名的 APK，在模拟器上打开，再发布版本。',
    },
  ],
  flow: [
    '采购员输入商品，按下搜索。',
    '每个来源一个隐藏的 WebView，用手机自己的网络打开它的搜索页。',
    '页面 HTML 发回来，每个来源的解析函数把它变成报价。',
    '行政区筛选和按价格排序在屏幕上组成一张列表。',
  ],
  links: [
    {
      to: 'АптекаМос',
      text: '商品页和药店页，列出每家药店的价格、地址和地铁站。',
    },
    {
      to: 'Мегаптека',
      text: '一个 JSON 搜索接口，按莫斯科和价格排序来查。',
    },
    {
      to: 'Wildberries',
      text: '商品卡片，在网站自己的脚本检查之后读取。',
    },
    {
      to: 'Ozon',
      text: '尽量读取搜索结果，它的机器人检查最严。',
    },
    {
      to: 'GitHub',
      text: '存放 APK 版本，应用从这里查更新。',
    },
  ],
  design: {
    scale: [
      '莫斯科的一位采购员，用一部 Android 手机，一次查几件商品。',
      '运行免费：没有服务器、付费接口和广告，所以每次搜索都在手机上跑。',
    ],
    data: [
      '当前搜索的报价放在内存里：商品、包装、价格、卖家、地址和地铁站。',
      '采购清单存在 SQLite 里。选中的行政区和语言存在本地存储里。',
    ],
    interfaces: [
      '每个来源模块提供一个搜索网址和一个解析函数。注入的脚本通过 window.ReactNativeWebView.postMessage 发回清理过的 HTML。',
      'Мегаптека 接受对 api.megapteka.ru 的普通 fetch，莫斯科用 city_id 6565。',
    ],
    reliability: [
      '每个来源单独失败，最多等 60 秒，它那一行写明原因。其他来源继续。',
      '每个来源有一个测试，在已保存的页面上跑解析，所以页面结构一变 CI 就能看到。',
    ],
    security: [
      '应用没有账号，也不向自己的服务器发数据。',
      '批发商的登录留在手机上 WebView 的 cookie 存储里。签名密钥放在 Bitwarden 和仓库密钥里。',
    ],
    performance: [
      '各来源并行加载，АптекаМос 只读大多数药店有货的 3 个商品。',
      '注入的脚本在发回 HTML 之前去掉脚本和样式。',
    ],
    operations: [
      'Checks 在每次推送到 main 时跑 lint、类型、knip、测试和 Android 打包。',
      'Release 构建签名的 APK，在模拟器上打开以发现崩溃，然后发布为 medpoisk-v<date>.<n>。',
    ],
    tradeoffs: [
      '在手机上读页面而不用服务器，因为俄罗斯的来源会封锁境外和数据中心的 IP。网站一改版，它的来源就会坏，直到修好解析。',
      '用面板显示机器人检查，而不在代码里破解，采购员手动通过一次即可。',
      '用采购员自己的登录打开批发门户，而不在列表里显示批发价，因为这些价格要用他的账号才能看到。',
    ],
  },
  features: {
    'Price search':
      'run-search.ts 同时启动每个来源。HiddenPages.tsx 在不可见的 WebView 里加载每个页面，每个来源模块把 HTML 解析成按价格排序的报价。',
    'Moscow okrugs':
      'okrug-of.ts 在 metro.json 里查药店的地铁站。没有地铁站的地址按城镇归类：莫斯科记为未知，其他城镇算 Подмосковье。',
    'Site checks':
      '每个来源有一个测试，能分辨检查页和结果页。CheckSheet.tsx 显示检查页，cookie 留在共用的 WebView 存储里，然后这个来源重新在后台搜索。',
    'Shopping list':
      'items.ts 把输入的词存进 SQLite。check-all.ts 逐个搜索每件商品，保留它在选中行政区里最便宜的报价。',
    Distributors: 'distributors.ts 列出每家公司的首页。browser.tsx 在保留 cookie 的 WebView 里打开它。',
    'Languages and updates':
      'i18n.ts 立即切换 i18next 并记住选择。newer-release.ts 在启动和回到应用时向 GitHub 查询更新的 medpoisk APK。',
  },
};

export default arch;

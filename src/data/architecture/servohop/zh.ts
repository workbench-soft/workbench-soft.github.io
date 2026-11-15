import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'GitHub Actions 上的轮询程序把各州的油价数据写入 Cloudflare D1。Pages Functions 读取 D1，为应用和搜索页面提供数据，一个 Expo 应用在 Android、iPhone 和网页上绘制地图。',
  parts: [
    {
      name: 'GitHub Actions 上的轮询程序',
      role: '按计划抓取每个数据源，把变化的价格写入 D1。',
    },
    {
      name: '各州油价数据源',
      role: 'NSW FuelCheck、VIC 的 Servo Saver、Fuel Prices QLD 和 FuelWatch WA 提供价格。',
    },
    {
      name: '充电桩来源',
      role: 'Open Charge Map、Transport for NSW 和 OpenStreetMap，合并后每个充电桩只出现一次。',
    },
    { name: 'Cloudflare D1', role: '当前价格，以及一个记录每日历史的触发器。' },
    {
      name: 'Cloudflare Pages Functions',
      role: '通过 API 回应应用，并生成搜索页面和站点地图。',
    },
    { name: 'Expo 和 React Native', role: 'Android、iPhone 和网站共用一套代码。' },
    { name: 'MapLibre 和 OpenFreeMap', role: '浏览器和手机上的地图，使用无需密钥的瓦片。' },
    {
      name: 'Hey Servo 模块',
      role: '用 Kotlin 写的 Expo 模块，带离线唤醒词模型和 Android 语音服务。',
    },
  ],
  flow: [
    '轮询程序读取各州数据，NSW、VIC 和 QLD 每小时一次。',
    '只有变化的价格写入 D1，触发器把它们加进每日历史。',
    '应用向 Pages Function 请求地图框内的加油站。',
    '边缘缓存 5 分钟内回应重复请求，其余由 D1 回答。',
    '应用按价格给每个图钉上色，并列出加油站。',
  ],
  links: [
    {
      to: 'spotthecam',
      text: 'Hey Servo 沿用 Hey Spot 的设计。一个应用为每句唤醒词占用麦克风。',
    },
    {
      to: 'keeppad',
      text: 'keepPad 和 Lumiere 通过 wakeshare 库共用同一个麦克风。',
    },
    {
      to: 'Google Maps',
      text: '点一下路线或说一句 Hey Servo 命令，就会在 Google Maps 里开始导航。',
    },
    { to: 'Google Play', text: '去除广告和 ServoHop Pro 都是一次性购买。AdMob 显示横幅。' },
    { to: 'GitHub Releases', text: '每次发布都把 APK 放在这里，GitHub 版从这里自行更新。' },
  ],
  features: {
    'Fuel prices on a map':
      'Pages Function 从 D1 返回地图框内最多 400 个加油站。应用把屏幕上的价格分成三等份，并给图钉上色。',
    'Your place on the map': '手机上由 expo-location 提供位置和罗盘方向。网页上由浏览器的定位和方向事件完成同样的事。',
    'Station list': '列表和地图来自同一次回应，显示相同的加油站。距离是从手机算起的直线距离。',
    'Price history chart':
      'Pages Function 从 D1 读取每日数据，共用的图表代码把价格延续到没有变化的日子。react-native-svg 绘制折线和区间带。',
    'Driver price reports': '应用把报价发给 Pages Function，它检查价格范围和每个发送者每小时的上限。价格存入 D1。',
    'EV chargers': '轮询程序每天合并 3 个开放来源的充电桩。司机的报告在 D1 里保存每个网络每 kWh 的价格。',
    'Search pages':
      'Pages Functions 为每个州、区域和加油站生成简单的 HTML，图表用 SVG 绘制。边缘把每个页面缓存 30 分钟。',
    'Site text and guides': '构建步骤把首页文字写进导出的 HTML。Pages Functions 用仓库里的文字提供指南。',
    'Self-update from GitHub':
      '应用向 GitHub Releases 查询更新的 APK，并交给 Android 安装器。Google Play 版用空的替代文件换掉更新代码。',
    'Remove ads': 'expo-iap 通过 Google Play 销售这个商品。购买跟随 Google 账号，换新手机后用恢复购买找回。',
    'ServoHop Pro': 'expo-iap 在每次启动时检查 Pro 购买。应用里的一处检查解锁 365 天图表并隐藏广告。',
    'Area search': 'Pages Function 借助 2 个索引在加油站表里查找区域或邮编。它不需要外部地理编码服务，也不需要密钥。',
    'Hey Servo': 'sherpa-onnx 在手机上听取唤醒词，Android 的语音服务听取命令。答案来自 ServoHop 的 API。',
    'Fuel panel': '所选燃料写进每次 API 请求，应用会记住它直到下次启动。充电桩按功率最大的插头归类。',
    Ads: 'react-native-google-mobile-ads 在同意表单之后于应用里显示横幅。网站和搜索页面上的横幅由 AdSense 填充。',
    Languages: 'i18next 保存 9 份目录，expo-localization 读取手机或浏览器的语言。',
  },
};

export default arch;

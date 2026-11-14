import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'Rust 数据管道把政府开放数据转换成静态的 JSON 和 PMTiles 文件。它们随网页构建发布到 GitHub Pages，一个 Expo 应用在网页、Android 和 iPhone 上读取它们。',
  parts: [
    {
      name: 'Rust 数据管道',
      role: '下载数据源，把每一行匹配到 ABS 区域代码，并用 polars 计算中位数。',
    },
    { name: 'PMTiles', role: '区域和邮编边界放在一个静态瓦片文件里，由数据管道切分。' },
    { name: 'GitHub Pages', role: '免费提供网页构建和数据文件。' },
    { name: 'Expo 和 React Native', role: '网页和手机上的地图、筛选、卡片和图表。' },
    {
      name: 'MapLibre 和 OpenFreeMap',
      role: '在底图上绘制区域边界，并按中位数给每个区域上色。',
    },
    { name: 'TanStack Query', role: '加载筛选条件需要的地图和区域文件。' },
    { name: 'ts-rs', role: '根据 Rust 结构体生成数据文件的 TypeScript 类型。' },
    { name: 'expo-iap 和 AdMob', role: '手机上的横幅、去除广告和 Pro。' },
  ],
  flow: [
    '每周一 CI 下载各州的成交和租金文件。',
    'Rust 数据管道把每一行匹配到区域，并计算中位数。',
    'JSON 文件和瓦片随网页构建发布到 GitHub Pages。',
    '应用按所选筛选条件加载一个地图文件。',
    'MapLibre 给每个区域上色，点一下就打开卡片和图表。',
  ],
  links: [
    { to: 'realestate.com.au', text: '卡片链接到那里的同一搜索。应用不读取该网站的任何页面。' },
    {
      to: 'Australian Bureau of Statistics',
      text: '区域和邮编边界，以及每张卡片上的 2021 年人口普查数据。',
    },
    { to: 'Google Play', text: '去除广告和 Property Trends Pro 在 Android 上是一次性购买。' },
    { to: 'App Store', text: '开发者账号开通后，iPhone 上提供同样的购买。' },
  ],
  features: {
    'Price map': 'Rust 数据管道为每个区域和类型计算各时段的中位数。MapLibre 按分位数把每个 ABS 区域分成 7 档上色。',
    Filters: '每种筛选组合都有预先生成的 JSON 文件。切换筛选只加载一个文件，URL 保存所选条件。',
    'Listings on realestate.com.au':
      '应用用区域、邮编和类型拼出 realestate.com.au 的搜索链接。它不读取该网站的任何页面。',
    'Suburb card and history chart':
      '点一下会加载该区域的文件，里面有每个时段的中位数和成交量。react-native-svg 和 d3 在各平台上绘制图表。',
    Search: '搜索读取一个索引文件，里面有每个区域的名称、邮编和范围框。选中后地图飞到那个范围。',
    Languages: 'i18next 保存 9 份目录，Intl 按语言格式化价格和日期。浏览器记住所选语言。',
    Rents:
      '数据管道根据各州的押金数据和 VIC Rental Report 计算每个邮编的周租金中位数。MapLibre 给单独的邮编瓦片文件上色。',
    'Install from the browser': '网页应用清单提供名称、图标和标题栏颜色。目前还没有 service worker，所以需要联网。',
    'Ads and Remove ads':
      'react-native-google-mobile-ads 在 Google 同意表单之后显示横幅。expo-iap 每次启动都检查去除广告的购买，网页版关闭广告。',
    'Property Trends Pro':
      'expo-iap 每次启动都向 Google Play 或 App Store 检查 Pro 购买。应用里的一处检查解锁租金和完整历史。',
    'iPhone app':
      '同一套 Expo 代码为 iOS 构建，在 AdMob 启动前询问跟踪许可。目前由 macOS 运行器或 EAS 构建模拟器版本。',
  },
};

export default arch;

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
  design: {
    scale: [
      '一个静态网站服务所有访客，所以读者再多也不增加工作室的成本。',
      '销售数据来自 VIC、NSW 和 SA，形状文件把 15,358 个 ABS 郊区切成一个 53 MB 的 PMTiles 文件。',
      '其他州显示为灰色，因为它们没有公开免费的销售数据。',
    ],
    data: [
      '每组筛选条件都有自己的 JSON 文件，因为中位数不能跨组相加。少于 5 笔销售的格子没有中位数。',
      '形状放在 boundaries.pmtiles 里，要素 id 是郊区代码，没有标签。',
      '郊区文件把每种类型和地块档位存成由时期、中位数和销量组成的列表。人口普查文件补充 Census 2021 和 SEIFA 的数字。',
    ],
    interfaces: [
      '应用通过 HTTP range 请求读取静态 JSON 和 PMTiles，没有自己的 API。',
      'Rust 管线从 CKAN API 读取 VIC 和 SA 的列表，读取 NSW 的 .DAT 压缩包和 ABS 形状。',
      'ts-rs 根据 Rust 结构体写出每个数据文件的 TypeScript 类型。',
    ],
    reliability: [
      '某个数据源的许可变了，管线运行就会停止，所以不会发布没有许可的数据。',
      'Pages 一次换掉整个网站，所以访客读到的是完整的一个版本。',
      '目前没有 service worker，所以装好的网页应用需要联网。',
    ],
    security: [
      '没有登录，也没有服务器。Google Play 在手机上验证购买，所以已 root 的手机可以伪造购买。',
      '只用许可已列明的开放数据。NSW 销售数据只出现在无广告的网站上，因为它的许可是非商业的。',
      '计划中的 Rust Worker 会把任何 API 密钥放在 Worker 机密里，不进安装包。它还没有建成。',
    ],
    performance: [
      '文件预先算好，所以改一次筛选只取一个 JSON，网页地图通过 feature-state 换颜色。',
      '在手机上，MapLibre 用该文件构造一个 match 表达式，因为 15,000 次 feature-state 调用会逐个穿过桥接。',
      'PMTiles 把相同的瓦片只存一次，输入与上次运行相同时，部署会跳过管线。',
    ],
    operations: [
      'Checks 在电脑上的 runner 上并行运行 TypeScript 和 Rust 任务：lint、类型、测试以及 web 和 iOS 导出。',
      '每次 Release 变绿以及每周一都会运行 Deploy web。它发布站点仓库的一个 release，Pages 解压最新的一个。',
      '托管成本为 0 美元：GitHub Pages、无需密钥的 OpenFreeMap 底图，以及自托管 runner。',
    ],
    tradeoffs: [
      '选 GitHub Pages 上的静态文件而不是服务器数据库，让托管成本为 0 美元。筛选只能是固定选项。',
      '选政府开放数据而不是抓取门户网站，后者被其条款禁止。代价是没有卧室数，部分州为灰色。',
      '选 Rust 管线而不是 Node 脚本，因为 NSW 保存了 1990 年以来的每一笔销售，形状处理也很吃力。',
      '选一套 Expo 代码库而不是纯网页站，这样应用商店构建不会变成第二个应用。地图需要 2 个库。',
    ],
  },
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

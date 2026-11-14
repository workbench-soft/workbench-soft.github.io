import type { Arch } from '../types';

const arch: Arch = {
  summary:
    '一个 Expo 应用跑在 Android 和网页上，把每个清单存在设备上的 SQLite 里。共享的清单还会存到 Firestore，应用没有自己的服务器。',
  parts: [
    { name: 'Expo and React Native', role: '一套代码做出 Android 应用和网站，网站由 Firebase Hosting 提供。' },
    { name: 'SQLite', role: '通过 expo-sqlite 在设备上存每个清单和条目，浏览器里跑在 wasm 上。' },
    { name: 'Firestore', role: '存共享清单、商店货架和店内路线，前面是匿名登录。' },
    { name: '短语解析器和表情词典', role: '手机上的规则，把一句话拆成条目，并选出表情和分区。' },
    { name: 'OpenStreetMap', role: '商店搜索，以及手机此刻所在的商店。' },
    { name: 'Wikipedia and Wikidata', role: '城市和景点，Tripforge 的 Worker 有响应时经由它读取。' },
    { name: 'Coles and Woolworths', role: '单位价格，从各家网站的搜索里读取。' },
    { name: 'Google Play', role: 'AdMob 广告，以及经由 expo-iap 的去广告和 Pro 购买。' },
  ],
  flow: [
    '用户输入或说出条目，解析器把它们拆开。',
    '手机立刻把每个条目存进 SQLite。',
    '分享把清单发到 Firestore，并打开一条链接。',
    '另一部手机打开链接，在 Firestore 里跟随这个清单。',
    '一部手机上的勾选，一两秒内出现在另一部上。',
  ],
  links: [
    {
      to: 'tripforge',
      text: '来自 Tripforge 的行程链接会生成景点清单和打包清单。景点清单也能链回去规划航班。',
    },
    { to: 'guitar-upscale', text: '要学的歌里的一首歌，可以在 Guitar Upscale 里打开跟着弹。' },
    { to: 'Firebase', text: 'Firestore 同步共享清单，Hosting 提供网站。' },
    { to: 'OpenStreetMap', text: 'Nominatim 按名称找商店，Overpass 找附近的商店。' },
    { to: 'Google Play', text: 'AdMob 显示广告，Play Billing 出售去广告和 Pro。' },
  ],
  features: {
    'Share by link':
      'Firestore 存着每个共享清单的副本，链接里带着它的随机 id。每部手机先把改动存进 SQLite，网络恢复后再发出。',
    'Base list': '从基础清单生成的清单会复制每个基础条目，并记住各自跟随哪一个。基础清单的改动会传到用户没改过的副本。',
    'Typing and dictating':
      '手机上基于规则的解析器，靠表情词典和数字拆分句子。expo-speech-recognition 通过手机的语音服务把语音转成文字。',
    Pictures: '应用内的词典按名称配上表情和分区，支持英语和俄语。照片压成一张小 JPEG，跟着条目一起走。',
    'The store and the walk through it':
      'OpenStreetMap 的 Overpass 和 Nominatim 找到商店。应用从勾选顺序学会分区的先后，并存进 SQLite。',
    'Shared aisles':
      '货架和路线存在 Firestore 里，按商店的 OpenStreetMap id 归类。选了这家店的手机都会读取，新输入的货架号会立刻上传。',
    'Prices at Coles and Woolworths':
      '手机读取各家网站的搜索，把第一个商品在 SQLite 里存一天。单位价格更低的那家显示为绿色。',
    'Packing for a trip': '打包清单是 SQLite 里基础打包清单的副本。共享时和其他清单一样走 Firestore。',
    'Things to see':
      '城市来自 Wikipedia，景点来自 Tripforge 的 Worker 或 Wikidata。手机上的 k-means 步骤把景点分到各天。',
    'Lists that are done': '手机上的计时器在最后一次勾选 3 小时后，或 2 周没有改动后，把清单移进归档。',
    'Light and dark': '主题通过 React Native 跟随手机，或者跟随设置里的选择，选择保存在设备上。',
    Updates: 'GitHub 版本向 GitHub releases 查询更新的 APK，并打开 Android 安装器。Google Play 版本不含这个模块。',
    Ads: 'AdMob 在 Google 的同意表单之后显示横幅和全屏广告。去广告购买由 Google Play Billing 出售。',
    'Tick-a-Lot Pro':
      'Google Play Billing 经由 expo-iap 出售 Pro，应用每次启动都会再问一次 Play。一个模块决定每处锁定。',
    'The weekly shop for two':
      '一部手机从基础清单生成清单，并通过 Firestore 共享。另一部负责勾选，每次勾选几秒内同步回来。',
    'Songs to learn': '歌曲解析器只在逗号处拆分。每首歌都有指向 Guitar Upscale 以及和弦、谱子和视频网站的搜索链接。',
    'Changing and deleting':
      '每个字段在用户离开时写入 SQLite。删除只给这一行做标记，所以撤销和另一部手机都能正常工作。',
    Languages: 'i18next 管理 9 个语言包，expo-localization 读取手机语言。清单里的文字保持输入时的样子。',
    'Finding Tick-a-Lot in search':
      'Expo 导出之后，构建脚本把指南、关于页和站点地图写成纯 HTML。应用页面带 noindex，因为上面是个人的清单。',
    'Open source licences': '一个构建任务把每个依赖包的许可文本收进应用里的一个文件。设置页面从这个文件列出它们。',
  },
};

export default arch;

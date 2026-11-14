import type { Arch } from '../types';

const arch: Arch = {
  summary:
    '一个 Expo 应用跑在 Android 和网页上，调用 Cloudflare 上的一个 Rust Worker。Worker 负责每次外部调用并保管密钥，一个 Rust crate 负责行程逻辑。',
  parts: [
    { name: 'Expo and React Native', role: '借助 react-native-web，一套代码同时做出 Android 应用和网站。' },
    { name: 'Rust Worker', role: '地点、航班、景点和秘境的路由，每条都放在 Workers 缓存后面。' },
    { name: 'trip-core', role: 'Rust crate，负责日期窗口、团体票价、票价日历和地点标签。' },
    { name: 'Travelpayouts', role: '提供票价和指向 Aviasales 的合作链接。' },
    { name: 'Wikivoyage and Wikidata', role: '提供景点、秘境和给它们打标签的类别。' },
    { name: 'Google Play', role: 'AdMob 广告，以及去广告和 Pro 两项购买。' },
  ],
  flow: [
    '用户输入地点、大致日期、晚数和同行的人。',
    '应用先向 Worker 查地点，再查航班。',
    'Worker 先给出缓存的结果，缺的再去 Travelpayouts、Wikivoyage 和 Wikidata 取。',
    'trip-core 按团体算出行程价格，并生成票价日历。',
    '应用显示报价、日历和链接。保存的行程留在手机上。',
  ],
  links: [
    {
      to: 'tickalot',
      text: '一条链接在两个应用之间传递行程，不需要共用账号。Tick-a-Lot 也从同一个 Worker 读取景点。',
    },
  ],
  features: {
    Ask: '表单通过 Worker 查找每个地点。来自 Tick-a-Lot 的链接会用地址里的内容填好表单。',
    Flights:
      'Worker 按日期窗口里的每个月向 Travelpayouts 查询，票价缓存 6 小时。trip-core 再按团体计算价格并加上链接。',
    Places:
      'Worker 把城市附近的 Wikidata 景点和 Wikivoyage 条目合在一起。Wikidata 类别给每个地点打标签，兴趣标签按这些标签筛选。',
    'To Tickalot': '应用把地点、出发日和晚数直接写进 Tick-a-Lot 链接里。没有服务器保存这次行程。',
    Settings: 'i18next 管理 9 个语言包。选择保存在手机上，经由 Expo 存在 SQLite 里。',
    Ads: 'AdMob 在 Android 上显示横幅和全屏广告。同一个检查根据同意结果和 2 项购买决定每条广告。',
    'Tripforge Pro':
      'Google Play Billing 负责出售，应用把购买标记存在手机上。一个模块决定每处锁定，限额写在同一个文件里。',
    'Website pages for search':
      'Expo 在构建时为每条路由和每种语言写出一个 HTML 页面。之后一个脚本设置页面语言、生成 404 页面并写出站点地图。',
  },
};

export default arch;

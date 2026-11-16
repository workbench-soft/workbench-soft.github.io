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
  design: {
    scale: [
      '每个人一年只规划几次旅行，所以负载很小。Cloudflare Workers 免费套餐每天允许 100,000 次请求。',
      '所有人共用一个有每分钟限额的 Travelpayouts 令牌，所以免费手机每天搜索 10 次。Pro 取消这个限制。',
    ],
    data: [
      'Worker 没有数据库。每个外部响应在 Workers 缓存里保留到其有效期结束。',
      '手机把语言选择、搜索次数、已保存的行程和购买标记存在 localStorage 里，在 Android 上通过 expo-sqlite。',
      '行程以 JSON 的形式放在链接里送到 Tick-a-Lot，含 v、place、start、nights 和最多 60 个地点。没有服务器保存它。',
    ],
    interfaces: [
      'Worker 有 4 条 GET 路由：/places、/flights、/sights 和 /spots。每条接收查询参数并返回 JSON。',
      'trip-core 接收原始票价，返回按团队计算的报价、票价日历和链接。',
      '行程以 base64url 哈希传给 Tick-a-Lot，再以含地点和晚数的查询字符串回到 Ask 页面。',
    ],
    reliability: [
      '缓存时长是：票价 6 小时，地点和景点 7 天，Wikivoyage 页面 30 天。',
      '以 200 返回的错误，如 MediaWiki 的 maxlag 或 Travelpayouts 的 success:false，以及被截断的 JSON 正文，都不进缓存。',
      '/spots 最多发出 6 次调用，当本地版词条少于 3 条时，回退到英文 Wikivoyage。',
    ],
    security: [
      '所有密钥和所有对外调用都归 Worker。应用不引入任何 crate，也不持有密钥。',
      '没有账号。Pro 和广告标记存在手机上，通过 Google Play 购买，所以清除应用数据会重置搜索次数。',
      '对 Wikidata 的调用在 User-Agent 里写明应用名，这是 Wikimedia 的要求。',
    ],
    performance: [
      '每个外部调用都放在 Workers 缓存之后。解析过的 Wikivoyage 词条在缓存里保留 30 天，因为解析伦敦约占 20 毫秒 CPU，而读缓存只要 1 毫秒。',
      '一次 Wikidata 查询就给出整页词条的语言数和类别，而不是每个地点调用一次。',
      '长列表通过 FlashList 渲染，所以只绘制屏幕上的行。',
    ],
    operations: [
      '推送到 main 会启动 Checks：lint、测试和构建。Checks 通过后，Release 和 Deploy 通过 workflow_run 启动。',
      'Release 排队执行，这样每个都在前一个标签之后选版本，较新的 Deploy 会取消较旧的。',
      'Deploy 发布网页导出和 Worker，若任一主机不响应就会失败。Rust 版本是固定的，Worker 构建为 wasm。',
    ],
    tradeoffs: [
      '规划器跑在 Worker 里，而不是应用内的 wasm，因为 Hermes 不运行 wasm。代价是不能离线规划。',
      '选 Travelpayouts 的缓存票价，而不是 Duffel 或抓取：免费，一次调用就知道哪天最便宜。代价是票价有 2 到 7 天的延迟。',
      '选 Wikidata 和 Wikivoyage，而不是景点数据供应商：免费，而且 Wikipedia 语言数提供知名度信号，用来标出隐藏景点。',
      '航班页面不放广告，放弃更多广告位，因为在佣金链接旁误点有被封的风险。',
    ],
  },
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
    'Dark mode':
      '每种颜色都是一个带浅色和深色值的令牌。手机按系统主题选择一组，网站用带 prefers-color-scheme 的 CSS 变量。',
  },
};

export default arch;

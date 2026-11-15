import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'Astro 构建静态页面，Preact 应用在浏览器里运行房间。一个 Cloudflare Worker 提供页面，并给每个房间一个自己的 Durable Object。',
  parts: [
    { name: 'Astro', role: '首页、游戏页和说明页，以静态 HTML 提供给搜索引擎。' },
    { name: 'Preact', role: '带大厅、游戏和聊天的房间应用。' },
    { name: 'Cloudflare Worker', role: '提供页面并为每个房间打开 WebSocket。' },
    { name: 'Durable Objects', role: '每个房间码对应一个对象，它把状态存在自己的 SQLite 里并管理计时器。' },
    { name: 'TypeScript 游戏规则', role: '房间和 3 个游戏的普通类，脱离 Cloudflare 进行测试。' },
    { name: '共享画布模块', role: '把一幅画存成 800 乘 600 网格上的一串操作。' },
    { name: 'Capacitor', role: '把同样的页面连同 AdMob 横幅打包进 Android 和 iOS 应用。' },
  ],
  flow: [
    '房主创建房间并发出链接。',
    '每位玩家与房间的 Durable Object 建立 WebSocket 连接。',
    '房间执行游戏规则并把状态发给每位玩家。',
    '画作以小操作的形式每 80 毫秒发送一次。',
    '闹钟结束每一轮，空房间 30 分钟后清除。',
  ],
  links: [
    { to: 'Cloudflare', text: 'Workers Free 托管页面和房间。' },
    { to: 'Google AdSense', text: 'AdSense 在网站上显示横幅。' },
    { to: 'Google AdMob', text: 'AdMob 在 Android 和 iOS 应用里显示横幅。' },
  ],
  design: {
    scale: [
      '一个房间最多 12 名玩家，线索对决至少需要 4 人。',
      'Workers 免费版每天 10 万次请求，约相当于每天 40 小时的绘画。',
      '一条消息上限 256 KB，一幅画上限 3000 个动作。',
    ],
    data: [
      '每个房间是一个带独立 SQLite 存储的 Durable Object，有 3 类键：meta、canvas 和 chain:N。',
      'meta 在每次变化后保存玩家、得分、设置、阶段、聊天和游戏状态。canvas 最多每 2 秒保存一次。',
      '一幅画是 800 乘 600 网格上的动作列表。浏览器把令牌和设置存在以 wg- 开头的键下。',
    ],
    interfaces: [
      '每位玩家一个 WebSocket，路径为 /games/ws/CODE。Worker 用 idFromName 把房间码对应到房间对象。',
      '第一条消息 hello 带着协议版本、令牌、名字和颜色，之后是 state、chat 和 draw 消息。',
      'Android 和 iOS 应用在游戏 Worker 上打开同样的 socket。Origin 检查放行网站和应用。',
    ],
    reliability: [
      'Hibernation API 让空闲的房间离开内存，socket 消息或闹钟会从存储里把它唤醒。',
      '闹钟驱动每个截止时间，并在房间变空 30 分钟后清理它。',
      'PROTOCOL 编号让 Worker 用旧应用的格式回应它。掉线的玩家保留座位，直到房间坐满 24 个座位。',
    ],
    security: [
      '没有账号。浏览器保存随机令牌，房间保存其哈希作为玩家 id。',
      '房间对象选词并检查每次猜测，所以答案留在服务器上。',
      '来自其他网站的 socket 会被拒绝。名字最多 20 个字符，聊天行最多 100 个。',
    ],
    performance: [
      '绘画以小的动作列表每 80 毫秒传一次，而不是传像素。',
      '启用 hibernation 后，20 条 WebSocket 消息算 1 次请求。',
      '静态页面不花钱，因为 run_worker_first 只让房间链接和 socket 经过 Worker 代码。',
    ],
    operations: [
      '一个 Worker 用 wrangler 部署：静态的 dist/ 文件夹加房间对象。Games 工作流在每次推送到 main 时部署。',
      'mise run check 对每个游戏的规则运行 oxlint、类型检查和 Vitest。',
      'Worker 的可观测性已开启。Android 应用通过 Google Play 封闭测试发布。',
    ],
    tradeoffs: [
      '选带 hibernation 的 Durable Objects，不选 Supabase Realtime、PartyKit 或 VPS，没有服务器且在免费额度内。房间代码是为 Cloudflare 写的。',
      '选 Astro 静态页加一个 Preact 岛，不选 Preact 单页应用，让搜索引擎拿到完整 HTML。',
      '选固定网格上的绘画动作，不选像素，这样消息很小，撤销只需一步。',
      '选 Capacitor，不选 Trusted Web Activity 或 React Native，这样同样的页面能在应用里运行，并带原生 AdMob 横幅。',
    ],
  },
  features: {
    'Rooms by link':
      'Worker 把每个房间码对应到它自己的 Durable Object。浏览器里的随机令牌代表玩家，房间只保存它的哈希。',
    'Kids mode': '浏览器的语音朗读每个词。儿童词表在 9 种语言里各为 80 个词配上图片。',
    'Guess the drawing': '房间对象选词，并在服务器上检查每次猜测。闹钟结束每一轮，得分取决于猜中的速度。',
    'Drawing telephone': '房间按计时把每句话和每幅画交给下一位玩家。每个故事都存进房间的存储，供相册使用。',
    'Clue duel': '房间发出一块 12 个词的公共棋盘，每队 2 个秘密词。服务器分开计算本队的词和抢到的词。',
    'Drawing tools':
      '画布绘制器把每一笔变成固定网格上的操作。房间每 80 毫秒把它们发给其他玩家，撤销会去掉最后一个操作。',
    Languages: '房间应用把文字放在 9 个语言文件里，词表也有 9 种语言。Astro 用英语和俄语构建页面。',
    Ads: 'AdSense 在网站页面上放横幅。在应用里由 Capacitor 的 AdMob 插件显示，法律要求时先弹出同意表单。',
    'Android and iOS apps':
      'Capacitor 把构建好的页面打包成原生应用，从本地文件加载页面。应用在游戏 Worker 上打开它们的连接。',
    'Party look': '共享的 CSS 设定夜间光晕、浅色粉彩和每个游戏的颜色。开启减少动态效果时动画会停下。',
  },
};

export default arch;

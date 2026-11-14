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

import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'Farnear 是一个 React 网页应用，Android 版用 Kotlin 包装，iPhone 版用 Capacitor 包装。Cloudflare 上的 Rust Worker 转发房间的加密消息，通话本身直接在设备之间进行。',
  parts: [
    { name: 'React 和 Vite', role: '各个界面、房间页，以及预先渲染成 9 种语言的首页。' },
    { name: 'WebRTC', role: '声音、视频和白板的数据通道，在最多 4 台设备之间直连。' },
    { name: 'Rust Worker 和 Durable Object', role: '每个房间一个对象，转发加密消息并发放中继设置。' },
    { name: 'TURN 中继', role: '两个网络之间直连失败时，负责传送加密的音视频。' },
    { name: '白板模块', role: '纯 TypeScript 在 React 之外保存线条、已擦除的线条和文件传输。' },
    { name: 'Whisper 和 MediaPipe', role: '语音转文字和视频背景，都在设备上运行。' },
    { name: 'Kotlin 外壳', role: '包住线上网站的 Android 应用，带 AdMob、Play Billing 和来电提醒。' },
    { name: 'Capacitor 和 Swift', role: '包住同一网站的 iPhone 应用，带 StoreKit 和分享菜单。' },
  ],
  flow: [
    '房间链接里带着密钥，页面用它打开房间。',
    '页面通过 WebSocket 加入 Worker 上的房间。',
    '设备经 Worker 交换加密的连接请求和网络路径。',
    'WebRTC 直接连通设备，或经过中继连通。',
    '视频、声音、白板线条和文件在设备之间传送。',
  ],
  links: [
    { to: 'Cloudflare', text: 'Worker、Durable Object 和一个 TURN 中继都在免费套餐内运行。' },
    { to: 'consdr', text: 'Android 外壳把 Consdr 的 AdMob 和 Play Billing 代码移植到 Kotlin。' },
    { to: 'Google Play', text: 'Play Billing 出售“去除广告”和 Farnear Pro，AdMob 显示 Android 广告。' },
    { to: 'app-updater', text: 'WBS Updater 把已安装的版本与 GitHub 上最新的发布做比较。' },
    { to: 'Hugging Face', text: '记录员从这里下载一次 Whisper 的权重。' },
  ],
  design: {
    scale: [
      '一次通话最多把 4 台设备连成网状，每台设备把自己的视频发给另外 3 台。',
      '一个房间对象最多容纳 6 个套接字，每条消息 64 KB，每秒 20 条，所以洪水只留在一个房间。',
      'Worker、Durable Object 和中继都跑在免费档，因为经过它们的只有小的密封消息。',
    ],
    data: [
      '没有账号数据库。名字、语言、已存房间和推送密钥放在 localStorage，用一个带版本的前缀。',
      '每个房间的转写和文字消息存在每台设备的 IndexedDB 里。',
      'Durable Object 只存中继配额和缓存 90 分钟的中继回复。KV 把连接报告存 14 天。',
    ],
    interfaces: [
      '信令走到房间对象的 WebSocket。每条消息是带版本、id 和序号的 AES-GCM 信封。',
      '每一对设备打开 3 个协商好的数据通道：实时笔迹点、控制消息和文件分块。',
    ],
    reliability: [
      '断开 3 秒后，较小的 peer id 发出 ICE 重启 offer，等待 12、18、25 秒。',
      '健康检查每 3 秒读取每条轨道。停滞 15 秒就启动 ICE 修复，再重建这一对连接。',
      '信封 id 丢弃副本，序号丢弃重放，offer id 丢弃过期的应答。',
    ],
    security: [
      '房间密钥放在链接的 # 之后，所以 Worker 只看到密文，看不到名字、标题和 offer。',
      '媒体在设备之间走 DTLS-SRTP，TURN 中继只传加密的包。',
      '房间页不加载广告脚本并带 noindex，所以密钥旁边不运行第三方代码。',
    ],
    performance: [
      '画布和 WebRTC 调用在普通模块里运行，React 通过 useSyncExternalStore 读取小型 store。',
      'Worker 按房间缓存中继设置 90 分钟，每个房间每天最多向上游申请 20 次。',
      '有 WebGPU 的地方 Whisper 跑在 WebGPU 上，否则用 WebAssembly 的小模型。大文件发送会等通道排空。',
    ],
    operations: [
      '每次推送到 main，Checks 都会运行 lint、测试和构建，然后网站发布到 GitHub Pages，Worker 通过 wrangler 部署。',
      '只有 android/ 变了才构建 APK，因为应用加载线上网站。网页改动只打标签，不占重型 runner。',
      '悉尼时间 19:00 的夜间任务在 android/ 变更时构建 Play 的 bundle。Checks 失败会取消构建。',
    ],
    tradeoffs: [
      '选直连网状而不是媒体服务器：不用托管视频，也没有费用。上行随人数增加，所以通话上限是 4 人。',
      '选包装线上网站而不是原生界面：网页修复无需商店审核即可发布。应用需要联网。',
      '选在浏览器里跑 Whisper 而不是云端语音识别，让声音留在设备上。首次使用要下载模型权重。',
    ],
  },
  features: {
    'Calls through a link': '链接末尾带着房间密钥，所以 Worker 只能看到加密消息。随后 WebRTC 把最多 4 台设备连成网状。',
    'Recover a dropped call': '断线后，一方发出 ICE 重启请求，最多 3 次。每个对端一条队列，旧的应答不会覆盖新的。',
    'Return to a call':
      '浏览器记住正在进行的通话 30 分钟，所以链接会自动重新加入。每个房间一把 Web Lock，让较新的标签页接管通话。',
    'Relay for blocked networks':
      'Worker 通过套接字给每个浏览器发放短期的 TURN 设置。ICE 先试直连路径，不通再改走中继。',
    'Share the call link': '邀请面板按应用语言为 Gmail、WhatsApp 或 Telegram 生成草稿。“其他应用”打开系统的分享菜单。',
    'Join with a room code':
      '房间码是房间密钥的哈希。房间里的设备在 Nostr 大厅里用 CPace 握手回应，监听的中继读不到链接。',
    'Saved rooms': '房间链接以名字存在浏览器存储里，服务器不保存这份列表。同一个密钥每次都打开同一个房间。',
    Board: '纯模块把线条和已擦除的线条存成 2 个集合，经 WebRTC 数据通道发送。画布在 React 之外画出它们。',
    'Share an image or video': '文件分块经专用数据通道发给每个人。分享者的播放、暂停和跳转走控制通道。',
    Lessons: '房主设备通过控制通道发送画笔锁定、剩余时间和缩放。白板按页保存线条，幻灯片保存在 IndexedDB 中。',
    'Lesson tasks':
      '问题和答案走控制通道。每个学生的练习本是一块只发给老师的独立白板，拖动的文字或贴纸以更新的副本发出。',
    'Contacts and ringing':
      '来电提醒是为对方设备加密的网页推送，经 Worker 发出。Android 应用通过 Google Play 服务接收，不用 Firebase。',
    'Ads and remove ads': 'AdMob 显示 Android 横幅和通话后的广告。Play Billing 出售去除广告，房间页不加载广告脚本。',
    'Farnear Pro':
      'Play Billing 在 Android 应用里出售 Pro，浏览器可免费使用这些工具。有 Pro 的设备在加密的问候里告知这一点，房间随即开放白板。',
    'Android app':
      'Kotlin WebView 外壳加载线上网站，并把摄像头和麦克风交给它。CI 为每个 APK 签名，并放进公开的 GitHub 发布。',
    'iPhone app':
      'Capacitor 加载线上网站，Kotlin 部件的 Swift 对应版本加上 StoreKit、AdMob 和分享菜单。代码在等待第一次构建。',
    Languages: 'i18next 保存 9 个词条库，选择后每个界面立即切换。选择保存在设备上。',
    'App icon': '网站图标、网页图标和 Android 启动器的各种尺寸都来自同一个 SVG。Android 另有自适应图标和主题图标。',
    'Call stage': '舞台模块根据固定的画面和共享屏幕，选出大图块和缩略条。每台设备自己测量声音，用来点亮说话人光环。',
    'Share a screen': '每个连接从一开始就留出一个空的视频位，所以共享屏幕不需要新的连接请求。白板画在它上面。',
    'Take a photo':
      'modern-screenshot 把可见的通话连同视频和白板截成 PNG。Android 应用把它存进下载文件夹，服务器拿不到它。',
    'Your name': '名字存在浏览器里，随加密的问候消息发给其他人。改名从下一次通话起生效。',
    'Video background':
      'MediaPipe 在设备上找出人像，画布把人画在模糊背景或图片上。这条画布轨道在发出前替换摄像头画面。',
    'Call transcript and summary':
      '一台设备在浏览器里运行 Whisper，能用 WebGPU 时就用。文字经数据通道发给其他人，并存进 IndexedDB。Chrome 内置的摘要功能写出摘要。',
    'Recover stalled media': '健康检查每 3 秒读取每条轨道收到的字节和帧。卡住 15 秒就先修复 ICE，再重建这对连接。',
    'Shared call titles': '标题带着版本计数器，走加密的信令。每台设备上最新的版本胜出，Worker 读不到标题。',
    'Shared documents on the board':
      'PDF.js 在设备上绘制 PDF 页面，PowerPoint 渲染器绘制幻灯片。翻页和移除走控制通道。',
    'Board text':
      '文字是带有文字和一个点的白板线条，所以它像笔迹一样同步、擦除和撤销。字高按白板高度的比例计算，任何缩放下都在原位。',
    'Board stamps': '印章是带一个点和类型的白板线条，因此会像墨迹一样同步、擦除和撤销。它的大小按白板高度的比例计算。',
    'Board pages':
      '空白白板使用页面同步 id blank，每条页面消息都带着最大的页码，所以后加入的人也知道共有几页。线条像幻灯片一样记住自己的页。',
    Colouring: '图画是为 Farnear 绘制的闭合 SVG 路径。每页的图画和每个区域的颜色通过控制通道传送，以最后一次写入为准。',
    'Noughts and crosses':
      '每一步都带着序号，所以不按顺序或下在已占格子的一步会在每台设备上被丢弃。游戏状态会发给每个打开通道的成员。',
    'YouTube together':
      'YouTube IFrame Player API 只在有人分享链接后才从无 cookie 主机加载。播放、暂停和跳转作为一个状态发出，以最后一次为准。',
    'Contacts and rooms':
      '联系人和房间共用浏览器里的一份保存列表，每条记录有自己的类型。联系人名字留在设备上，房间标题会同步。',
    'Search and share preview':
      'Vite 插件在构建时把首页预先渲染成 9 种语言。另一个插件写出站点地图，每个页面带有自己的预览标签。',
    'Messages in a call':
      '消息加密后走房间信令，与视频路径分开。每台设备把它存进 IndexedDB，并在下次通话时补齐缺少的消息。',
    'Reactions and raised hands':
      '每个回应作为加密消息经房间信令发送，每秒最多 3 个。举手放在参与者状态里，名单每 5 秒重发一次，所以后加入的人也能看到。上升和迸发效果由 CSS 关键帧绘制。',
    'Button hints': '一个共享模块在鼠标悬停或长按后显示气泡。长按只显示名字，不会触发按钮。',
    'Close Farnear and take back its permissions':
      '页面结束通话和来电，然后请 Android 外壳收回权限并关闭。浏览器会显示手动重置权限的步骤。',
  },
};

export default arch;

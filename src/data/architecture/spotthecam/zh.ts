import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'Cloudflare 上的 Next.js 静态网站显示摄像头地图，Capacitor 把同一批文件封装成 Android 和 iPhone 应用。Kotlin 和 Swift 原生代码负责驾驶功能，一个小型 Worker 保存分享的行程。',
  parts: [
    {
      name: '摄像头数据构建',
      role: 'CI 里的 TypeScript 脚本，每晚把各州和新西兰的摄像头列表合并成一个 JSON 文件。',
    },
    { name: 'OpenStreetMap', role: '每个摄像头的位置、道路限速和学校区域的分时限速。' },
    { name: 'Next.js', role: '静态导出，包含地图、网站页面和每个摄像头点位的页面。' },
    {
      name: 'Leaflet 和 MapLibre',
      role: 'Leaflet 绘制摄像头和行程，MapLibre 在下方绘制 OpenFreeMap 瓦片。',
    },
    { name: 'Cloudflare Worker 和 KV', role: '提供网站文件，并保存用户分享的行程。' },
    {
      name: 'Capacitor 和 Kotlin',
      role: 'Android 外壳，带有车速、提醒、行程、路线和 Hey Spot 的原生服务。',
    },
    { name: 'Photon、Valhalla 和 TomTom', role: '地点搜索、带转向提示的路线和当天路况。' },
    { name: 'Swift 和 StoreKit 2', role: '驾驶和路线代码的 iPhone 移植版，以及 App Store 购买。' },
  ],
  flow: [
    '每晚 CI 任务下载各州和新西兰的摄像头列表。',
    'OpenStreetMap 为每个摄像头补上位置和道路限速。',
    'Next.js 构建网站，Cloudflare 连同摄像头文件一起提供。',
    '浏览器选出当前这一分钟的限速并绘制地图。',
    '手机上的原生服务读取同一文件，提醒前方的摄像头。',
    '行程留在手机上，直到用户分享其中一条。',
  ],
  links: [
    {
      to: 'keeppad',
      text: 'Hey Spot 使用与 keepPad 相同的唤醒词模型。一个应用为两句唤醒词占用麦克风。',
    },
    { to: 'lumiere-player', text: 'Hey Lumi 通过同一个唤醒库与 Hey Spot 共用麦克风。' },
    {
      to: 'Google Maps',
      text: '开始按钮按最佳顺序把各站交给 Google Maps，应用继续发出提醒。',
    },
    { to: 'Google Play', text: 'Play Billing 销售去除广告和 SpotTheCam Pro。AdMob 在应用里显示横幅。' },
    { to: 'GitHub Releases', text: '每次发布都把 APK 放在这里，GitHub 版从这里自行更新。' },
  ],
  features: {
    'Camera map': '夜间构建把每个摄像头的分时限速转成未来 35 天的时间窗。浏览器选出当前这一分钟的时间窗。',
    'Search and filter': '页面用摄像头文件建立区域索引，并在浏览器里搜索。不需要服务器。',
    'Camera types': '每个摄像头带着来源列表里的类型。浏览器记住选择，Android 应用只提醒地图上显示的类型。',
    'Follow me': '用户移动时，页面按 GPS 航向旋转地图。MapLibre 用自己的角度旋转街道瓦片，所以文字保持正向。',
    'Camera details': '弹窗读取随网站一起发布的摄像头文件。类型列表里的每个来源都带有官方页面的链接。',
    'Offline map': 'Service worker 把页面、摄像头文件和最多 500 张地图瓦片存在设备上。网页清单让浏览器把它安装成应用。',
    'Light and dark theme': '主题在页面绘制前生效。矢量瓦片样式在代码里给深色地图换上浅色道路。',
    Languages: 'i18next 为地图和应用界面保存 9 份目录。Android 通知的文字来自 Android 字符串文件。',
    'Site pages and ads': 'Next.js 在构建时为每个州、区域和摄像头点位写一个静态页面。AdSense 填充网站上的横幅。',
    'Speed badge':
      'Kotlin 代码把 GPS 位置匹配到 OpenStreetMap 道路及其限速。Android 的活动报告以及铁路和跑道的形状区分汽车、火车和飞机。',
    'Camera warnings': 'Kotlin 服务查找航向前方的摄像头，约提前 20 秒播报。摄像头附近的道路形状说明它在哪一侧。',
    'Camera alerts stay ready':
      'Android 的活动报告和上次停车点周围 300 米的围栏会启动驾驶服务。重启或更新后，一个透明界面再次启动它。',
    'Over the limit':
      '道路限速经 Overpass 来自 OpenStreetMap，在手机上保留 60 天。超速 5 秒后，Kotlin 检查会发出语音。',
    'School zones': 'OpenStreetMap 的分时限速给出区域时段。应用内一份已公布的 NSW 学期表给出上学日。',
    'Loud warnings': '每个声音都以闹钟方式从内置扬声器播放，应用在语音结束前调高音量。设置里的开关把输出交还手机。',
    "Author's voice": 'PC 上的开源语音模型用作者本人的声音生成提醒词。这些录音随应用一起发布，Pro 解锁它们。',
    'Trip log': 'Kotlin 服务记录每次驾车和步行，以及经过每个摄像头时的车速。行程在应用的私有存储里保留 400 天。',
    'Trip line by limit': '每个记录点保存车速和该道路在 OpenStreetMap 里的限速。地图根据这两个值给线路的每一段上色。',
    'Trip stats': '应用在手机上根据行程的各点计算数据。低于 20 km/h 持续 3 分钟以上的路段算作拥堵。',
    'Share a trip': '应用把精简后的路线发给 Cloudflare Worker，它用独立的 id 存进 KV。停止分享会在那里删除它。',
    Distance: '数字读取驾驶服务存在手机上的行程合计。不需要服务器。',
    'Turn by turn routes':
      'Valhalla 计算每两站之间的用时，应用逐一尝试各种顺序。TomTom 选出避开拥堵的道路，MapLibre 导航库跟踪车辆。',
    'Route options': '勾选项把步行或避开收费路交给路线服务。收藏的地点留在手机上，Hey Spot 按名称识别它们。',
    'Hey Spot': 'sherpa-onnx 在手机上离线听取唤醒词。Android 的语音服务听取后面的话，Photon 找到地点。',
    'Hey Spot, what street am I on?': '应用读取车下那条 OpenStreetMap 道路的名称和限速。手机的语音合成把它们说出来。',
    'Screen stays on': '应用的 Android 窗口请求系统保持屏幕常亮。应用转到后台时，这个请求结束。',
    'Self-update': 'GitHub 版向 GitHub Releases 查询更新的 APK，并交给 Android 安装器。Google Play 版不含更新代码。',
    'Same app on the iPhone':
      'Capacitor 把同一个网站封装给 iOS。从 Kotlin 移植到 Swift 的驾驶和路线代码负责原生部分，StoreKit 2 销售 Pro。',
  },
};

export default arch;

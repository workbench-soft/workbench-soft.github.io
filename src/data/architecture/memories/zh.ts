import type { Arch } from '../types';

const arch: Arch = {
  summary:
    '一款 Expo 应用运行在 Android、iPhone 和浏览器上，通过 WebDAV 读取家中 NAS 的照片，并维护自己的 SQLite 索引。NAS 上可选的容器负责索引照片、按人分组人脸和提供相册链接。',
  parts: [
    { name: 'Expo 和 React Native', role: 'Android 应用、iPhone 应用和浏览器版共用一套代码。' },
    { name: 'expo-sqlite', role: '手机上的索引，记下每个文件的日期、地点和设备。' },
    { name: 'WebDAV', role: '与 NAS 的唯一通道，用于列目录、读文件头、上传和移动。' },
    { name: 'folder-rules crate', role: '用 Rust 写的年份、地点和日期文件夹规则，与桌面整理工具共用。' },
    { name: 'places.db', role: '应用内置的 GeoNames 和 OpenStreetMap 数据，离线给地点命名。' },
    { name: 'NAS 上的 Node 容器', role: 'NAS 上的快速索引器、相册页面和浏览器版应用。' },
    { name: 'Rust 人脸引擎', role: '在 NAS 上通过 tract 运行 YuNet 和 SFace，按人分组人脸。' },
    { name: 'Konva 照片编辑器', role: '放在 Expo DOM 组件里的一个编辑器，与 Shuttrix 和桌面版共用。' },
  ],
  flow: [
    '后台任务每隔几小时列出 NAS 的文件夹。',
    '它只读取每个新文件的文件头，取日期和 GPS。',
    '离线地点库给出地名，SQLite 存下这一行。',
    '任务为接下来 7 天安排提醒。',
    '各个页面查询索引，并从 NAS 流式加载完整照片。',
  ],
  links: [
    { to: 'media-organizer', text: '桌面整理工具链接同一套 Rust 文件夹规则，并显示同一个编辑器。' },
    { to: 'shuttrix', text: '这款相机共用照片编辑器、地点查找和地点地图。' },
    { to: 'keeppad', text: 'Keeppad 通过 Android 提供程序，把笔记加进 NAS 上某个人的日记。' },
    { to: 'memories-demo-webdav', text: 'Google Play 审核用这台示例 NAS 登录。' },
    { to: 'Tailscale', text: '第二个地址让人在外也能连上 NAS。Funnel 提供相册链接。' },
  ],
  design: {
    scale: [
      '每次安装对应一个人和一台家用 NAS，照片和视频最多约一百万。',
      '50 万张照片的首次同步要花近一天，因为 NAS 每秒只能回应约 10 次文件头读取。',
      '相册链接通过 Tailscale Funnel 送到几个人手里，所以 NAS 是唯一的服务器。',
    ],
    data: [
      '照片留在 NAS 上。手机在 SQLite 里维护索引，含文件夹、媒体和一张由触发器计数的 days 表。',
      '文件行只存文件夹 id 和文件名，所以一百万个文件约占 200 MB。',
      '拍摄时间存为以秒计的墙上时间，因此历史上的今天只是一次范围查询。',
      'NAS 在照片旁放一个 .memories 文件夹，里面有 index.db、status.json、faces.db 和相册文件。',
    ],
    interfaces: [
      '手机用 WebDAV 与 NAS 通信：每个文件夹一次 PROPFIND，读文件头用带范围的 GET，另有 PUT、MKCOL 和 MOVE。',
      'NAS 上的容器把 index.db 和 status.json 发布到 .memories，手机通过同一条 WebDAV 链路合并它们。',
      'Rust 文件夹规则在 Android 上以 uniffi 库、在网页上以 wasm 的形式进入应用。',
    ],
    reliability: [
      '同步每 50 个文件在一个事务里保存，被打断的一轮会在下次运行时接着做。',
      '后台任务有 8 分钟预算，并先安排提醒，所以 NAS 出故障时提醒照样到。',
      '图库根目录为空就停止这一轮，所以未挂载的共享不会清空索引。',
    ],
    security: [
      'NAS 登录信息通过 expo-secure-store 存在 Android 密钥库里，应用以 Basic 头发送。',
      '相册链接带一个 16 字节的随机令牌。相册服务器只读挂载图库，对其他路径一律回 404。',
      '地名来自应用内的离线数据库，所以没有任何 GPS 点离开手机。',
      '允许普通 http，因为家里的 NAS 很少有证书。',
    ],
    performance: [
      'FlashList 绘制可见的图块并提前一屏。每个图块显示从前 66 KB 读出的 EXIF 小缩略图。',
      '读取在队列里每次 8 个，最新的先读，原生模块把 OkHttp 每个主机的请求数从 5 提到 32。',
      'days 和 geo_cells 两张表让月份列表、旅行和地图不必读一百万行文件记录。',
      'NAS 上的索引器从自己的磁盘读文件头只要毫秒，WebDAV 则要几秒。',
    ],
    operations: [
      '一个 pnpm 单体仓库，node、pnpm、java 和 rust 版本固定在 mise.toml，只有一份锁文件。',
      '每次推送到 main 且检查通过，就发布一个以日期为版本的签名 APK，检查失败时 release-gate.sh 取消构建。',
      '已安装的应用通过 GitHub API 读取最新版本。Google Play 版本把更新器换成空桩，每天构建一次。',
      'NAS 上的容器用部署脚本通过 ssh 发布。',
    ],
    tradeoffs: [
      '选普通 WebDAV 而不是自建服务器，任何 NAS 都能用，代价是首次同步慢。',
      '选手机上的 SQLite 而不是服务器数据库，应用可离线运行，托管零成本。',
      '拍摄时间用墙上时间而不是 UTC，历史上的今天保持为简单范围，但跨两个时区的照片无法精确排序。',
      '选一个 Rust 文件夹规则 crate 而不是每个应用一份拷贝，手机和桌面分拣一致，代价是每个 ABI 多 1 到 2 MB。',
    ],
  },
  features: {
    'Daily reminder':
      'expo-notifications 保存接下来 7 天的单次提醒，由后台任务根据索引安排。当天若有出国旅行，就选那一年。',
    Today: '查询一张按天统计照片数的表，找出这个日期有照片的每一年。触发器维护这张表，因此不必读取文件行。',
    Trips: '应用从按天统计中切出连续的出国日子。旅行链接打开从第一天到最后一天的照片。',
    Photos: 'FlashList 绘制屏幕上和下一屏的图块。每个图块显示手机缓存里的 EXIF 小缩略图。',
    'Filter by place': '地点搜索从按天统计中读取国家和地点。所选地点成为每次图库查询的又一个条件。',
    'Camera and drone shots': '同步时由 EXIF 型号或文件名判断是手机、相机还是无人机。索引为每个文件记下结果。',
    'Tile size': '捏合手势处理器把每行设为 1 到 6 个图块。一个保存的值控制每个网格。',
    'Send many photos at once': '应用把选中的文件复制到缓存，每次 3 个。一个小型原生模块一次性交给系统分享面板。',
    'Share an album by link':
      '应用通过 WebDAV 在 NAS 上写入相册文件。NAS 上的 Node 服务器经 Tailscale Funnel 展示它，预览图由 sharp 生成。',
    'Memories in the browser':
      'NAS 上的 Node 服务器提供网页版，并在同一地址转发 WebDAV。Tailscale Serve 让它只在 tailnet 内可见。',
    Organize: '每张卡片运行一项任务：整理相机照片、上传或释放空间。文件移动前，Rust 文件夹规则先规划文件夹和名称。',
    'Import from Google Photos':
      'Google 相册的 Picker API 只显示用户选中的项目。应用把它们下载到相机文件夹，再由上传接手。',
    'Sort picked photos on the NAS':
      'Rust 文件夹规则为每个文件规划新的文件夹和名称。WebDAV MOVE 把文件放过去，手机索引随即跟上。',
    Viewer: 'expo-image 在缓存的缩略图上显示完整照片。expo-video 用范围请求从 NAS 流式播放视频。',
    'Connect to the NAS': 'mDNS 搜索列出 Wi-Fi 里的设备，探测找到 WebDAV 端口。登录信息存在手机的安全存储里。',
    'Photos away from home': '启动时和每次网络变化时探测家里的地址。没有回应时，应用改用 Tailscale 地址。',
    'Sync progress': '横幅读取手机上实时的同步状态。NAS 部分来自索引器每分钟写入的状态文件。',
    'Mobile data': '使用移动数据时，每项 NAS 任务前都有一道检查。保存的答案决定任务运行还是等 Wi-Fi。',
    'Index from the NAS':
      'NAS 上的 Node 容器直接从本机磁盘读文件头，并在照片旁写入索引文件。手机下载后合并自己缺少的行。',
    'Move the index to a new phone':
      'SQLite 把索引中的 NAS 部分复制成一个文件，交给分享面板。新手机挂载这个文件并复制其中的行。',
    Language: 'i18next 保存 9 个语言包，expo-localization 读取手机语言。设置里的选择优先，并重新安排提醒。',
    Theme: '一个调色板含浅色和深色两套颜色。页面通过一个钩子读取，跟随手机或保存的选择。',
    'Ads and remove ads':
      '用户同意后，Google Mobile Ads 显示 AdMob 横幅和全屏广告。expo-iap 通过 Google Play 出售去广告。',
    'Memories Pro': 'expo-iap 通过 Google Play 和 App Store 出售这项购买。每个锁定功能打开前，由一个模块检查购买。',
    'Desktop sorter': '一款带 Rust 后端的 Tauri 应用整理电脑上的文件夹。它链接与手机相同的文件夹规则 crate。',
    Archive: '月份列表读取由触发器维护的每天照片数。点一下就按拍摄时间查询这个月的文件。',
    'Trip list and places map':
      '旅行列表把出国旅行和国内自驾合在一起，都来自按天统计。WebView 里的 Leaflet 按小网格的照片数画出地图。',
    People: 'NAS 上的 Rust 引擎用 YuNet 和 SFace 分组人脸。手机下载结果，再把名字和合并写回 NAS。',
    'Indexing progress page':
      '人脸引擎和索引器在 NAS 上写状态文件。Node 服务器把它们变成一个用服务器推送事件更新的实时页面。',
    'Albums about a person': '相册文件记下这个人、出生日期和笔记。NAS 上的相册服务器按年龄的每一年排列照片。',
    'Turn a photo': '人脸引擎把每张照片转 90、180 和 270 度再试。手机设好 EXIF 方向，检查后替换 NAS 上的文件。',
    'Edit a photo':
      'Konva 在 Expo DOM 组件里运行编辑器。“保存副本”把 JPEG 写到手机和 NAS，“保存”在比对字节后替换文件。',
    'Draw a new picture': '同一个 Konva 编辑器在空白画布上打开。保存时按上传规则把画写到手机和 NAS。',
    'Photos on the phone':
      '一个用 Kotlin 写的本地 Expo 模块凭一次授权读取相机文件夹。其中的文件和 NAS 文件进入同一个索引。',
    Settings: '小的设置值放在 expo-sqlite 的键值存储里，启动时载入。NAS 密码放在安全存储里。',
    'Duplicates on the NAS':
      '一条索引查询按拍摄时间和大小把 NAS 文件分组。通过 WebDAV 比对字节确认每一对后，副本才进 NAS 回收站。',
    Updates: '一个共用的更新包读取最新的 GitHub 发布，并打开 Android 安装程序。Google Play 版本把它换成空的占位模块。',
    'Light, blur and fonts': 'Konva 滤镜先应用颜色滑块，再在椭圆或条带周围加模糊。每段文字保留自己的字体家族。',
    'On the iPhone':
      '针对 iOS 的文件把 Android 模块换成照片图库、URLSession 和 App Store 的版本。文件夹规则以 Rust XCFramework 的形式经 Swift 运行。',
  },
};

export default arch;

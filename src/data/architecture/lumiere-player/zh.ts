import type { Arch } from '../types';

const arch: Arch = {
  summary:
    '一个 Kotlin 应用同时用于 Android 手机和 Google TV，用 libVLC 播放手机、U 盘或 SMB 共享里的文件。媒体库和播放位置存在设备上的 SQLite 里，GitHub 上的 APK 还加上在线音乐。',
  parts: [
    { name: 'Kotlin 和 Android Views', role: '为遥控器和触摸做的界面，手机和电视用同一个应用。' },
    { name: 'libVLC', role: '播放视频和音乐，读取标签，浏览 SMB 共享。' },
    { name: 'SQLite', role: '保存播放位置、音乐库、有声书库、视频库和每本书的进度。' },
    { name: 'Media3', role: '音乐会话，提供通知、锁屏控制和蓝牙按键。' },
    { name: 'WorkManager', role: '在后台扫描音乐、有声书和视频文件夹。' },
    { name: 'sherpa-onnx', role: '关键词识别器，在手机上听到 Hey Lumi。' },
    { name: 'Chaquopy 和 yt-dlp', role: '在线模块，名称来自 MusicBrainz，声音来自 YouTube，只在 GitHub 的 APK 里。' },
    { name: 'Google Play Billing 和 AdMob', role: 'Pro 和去广告两个购买项，以及手机上的横幅广告。' },
  ],
  flow: [
    '用户添加手机文件夹、U 盘或 SMB 共享。',
    '后台扫描把名称和标签写进设备上的 SQLite。',
    '主屏列出文件、歌曲、有声书和视频。',
    '轻点、遥控器按键或语音命令选定要播放的内容。',
    'libVLC 开始播放，应用边播边保存位置。',
  ],
  links: [
    { to: 'guitar-upscale', text: '“查找吉他谱”通过 Android 链接在 Guitar Upscale 里打开正在播放的歌。' },
    { to: 'spotthecam', text: 'Hey Lumi 和 Hey Spot 共用麦克风，两句唤醒词可以同时使用。' },
    { to: 'keeppad', text: 'Hey Lumi 和 Hey Keep 用同一个关键词模型，并共用麦克风。' },
    { to: 'GitHub', text: 'APK 和它的更新来自 GitHub 上的发布版本。' },
    { to: 'Google Play', text: 'Play 版本、它的更新，以及 Pro 和去广告的购买。' },
  ],
  design: {
    scale: [
      '一个 APK 同时用于 Android 手机和 Google TV，每次安装对应一个人。媒体库在设备上建立索引。',
      '视频扫描只读文件名，不读标签，所以很大的共享也不用逐个打开文件就能建好索引。',
      '只发布 armeabi-v7a 和 arm64-v8a 两种 ABI，让带 libVLC 的 APK 保持小体积。',
    ],
    data: [
      '设备上的 SQLite：positions.db、library.db、books.db、book-places.db 和 videos.db。',
      'positions.db 的每一行以不含 NAS 登录信息的 URI 为键，USB 文件还加上文件名和大小。',
      'Android 备份保留播放位置和书籍进度，但不含 nas.xml，也不含带 NAS 登录信息的数据库。',
    ],
    interfaces: [
      'libVLC 读取 file://、content:// 和 smb:// 来源。Media3 的 MediaSessionService 提供通知、锁屏和蓝牙按键。',
      '语音用设备上的 SpeechRecognizer，sherpa-onnx 识别唤醒词 Hey Lumi。Guitar Upscale 通过 Android VIEW 链接打开。',
      '在线模块调用 MusicBrainz 和 Wikidata，并通过 yt-dlp 访问 YouTube，只在 GitHub 的 APK 里。',
    ],
    reliability: [
      '播放器每 5 秒、暂停、停止和退出时保存位置，崩溃最多丢几秒。',
      'ScanWorker 基于 WorkManager，在新增文件夹、应用启动时和每天在 Wi-Fi 下运行，查询在单个工作线程上慢慢跑。',
      '不播放任何内容的蓝牙设备，会让声音回到扬声器。',
    ],
    security: [
      '没有账号，也没有自己的服务器。名称和标签都留在设备上。',
      '带密码的 NAS 列表存在 nas.xml 里，Android 备份不包含它。',
      'SponsorBlock 只收到 YouTube id 的哈希前缀。唤醒用的麦克风以前台服务运行。',
    ],
    performance: [
      'libVLC 直接播放每个文件，Media3 播放器在外面包一层用于音频，所以一个引擎同时服务视频和音乐。',
      'LoudnessGate 只把响亮的帧和其前半秒交给关键词模型，安静的房间会跳过它。',
      '封面按所需大小解码并带缓存，词索引把每个词只记一次，并附上含该词的书。',
    ],
    operations: [
      '推送到 main 会同时启动 Checks 和 Release。Checks 通过后，Release 为 APK 签名并发布。',
      '每个构建 runner 保留自己的 Gradle 状态，Gradle 只重建改动的部分。发布列表保留最新的 3 个。',
      'APK 在启动时从 GitHub Releases 更新。Play 包不含更新器和在线模块。',
    ],
    tradeoffs: [
      '选原生 Kotlin 加普通 View，不选 Expo，因为播放器是一个 libVLC 视图，由遥控器按键和焦点驱动。',
      '选未修改的 libVLC，不选 Media3 ExoPlayer，为了 MKV 音轨、SMB 浏览和 Windows-1251 字幕，代价是一份 LGPL 声明和较大的 APK。',
      '选经 libVLC 访问 SMB，不选单独的库，少一个依赖，但 NAS 列表不给文件大小。',
      '选一次性 Pro 购买，不选每个应用一份订阅，这样一个检查 Entitled.pro() 就能控制每个界面。',
    ],
  },
  features: {
    'Direct folder browsing and playback':
      'U 盘文件夹通过 Android 文件系统打开，SMB 共享由 libVLC 浏览。保存的 NAS 列表留在设备上，不进入 Android 备份。',
    Resume: '播放器每 5 秒和退出时把位置存进 SQLite。文件列表读取同一张表，显示每个文件下方的进度条。',
    'Subtitles and audio':
      'libVLC 列出内嵌音轨和同一文件夹里的字幕文件。文本字幕先按 UTF-8 读取，不行再按 Windows-1251 读取。',
    Controls: '播放器在 libVLC 里控制跳转和速度。队列模块负责播放顺序、随机和重复。',
    Updates: '启动时 APK 读取 GitHub 上最新的发布版本，并下载更新的 APK。随后 Android 安装程序请用户确认。',
    Ads: 'AdMob 在 Google 的同意表单之后于手机上显示横幅。一项检查在购买去广告或 Pro 后隐藏它，电视上不显示广告。',
    Languages: 'Android 字符串资源保存 9 种语言。AppCompat 的语言接口应用设置里的选择或设备语言。',
    'Touch on a phone': '视频上方的手势层把轻点和拖动变成跳转、拖动进度、亮度和音量。电视遥控器不会聚焦到这一层。',
    'Panel buttons': '选好的按钮存在设备上的播放器设置里。播放器按这组设置排出按钮，libVLC 负责缩放画面。',
    'Sponsor skip':
      '播放器读取文件里的 SponsorBlock 章节，或用视频 ID 的哈希查询 SponsorBlock API。随后 libVLC 跳过每个片段。',
    'Phone speaker': '一条指定内置扬声器的静音音轨把 libVLC 的声音一起带过去。每秒一次的检查把没声音的蓝牙切回扬声器。',
    Look: '用代码搭建的普通 Android Views 共用一套颜色、字体和焦点胶囊。文字标志使用 Instrument Serif。',
    'Music library':
      'WorkManager 任务逐个遍历文件夹，用 libVLC 读取标签。歌曲存进设备上的 SQLite，不进入 Android 备份。',
    'Music player': 'Media3 会话通过 libVLC 只播放音频。它绘制通知和锁屏控制，播放栏在每个界面跟随它。',
    'MusicBrainz and YouTube':
      'MusicBrainz 提供歌曲、歌手和专辑的名称。yt-dlp 通过 Chaquopy 在 Python 中运行，从 YouTube 取声音，仅限 GitHub APK。',
    Audiobooks: '扫描根据 OPF 文件、标签和文件夹名把音频文件归成书。Wikidata 给出作者，SQLite 保存每本书的进度。',
    'Video library':
      '扫描只把每个视频的路径存进 SQLite。解析器从名称里读出剧集、季和集数，Wikidata 补充其他名称。手机通过 smbj 用 SMB 读写 LG 电视放在 NAS 电影旁的电影信息文件。',
    'Find tabs': '播放栏把带歌手和歌名的 Android 链接发给 Guitar Upscale。只有 Android 找到这个应用时按钮才会出现。',
    'Google Play build': '第二种构建类型去掉自更新、完整文件访问和在线模块。之后由 Google Play 负责更新。',
    'Voice commands':
      'sherpa-onnx 在手机上听到 Hey Lumi，Android 语音识别接收命令。匹配器找到歌曲、书或视频，再用语音合成回答。',
    'Online music':
      '在线模块通过 Chaquopy 在 Python 里运行 yt-dlp。MusicBrainz 提供歌曲名称，YouTube 提供声音，只在 64 位手机上的 GitHub APK 里。',
    'Lumiere Pro':
      'Google Play Billing 出售一个 Pro 商品，应用每次启动都向 Google Play 查询。应用里的一项检查打开语音功能并隐藏横幅。',
    'LG webOS app':
      '一个 TypeScript 网页用电视自带的播放器播放。同一 webOS 包里的 Node 服务通过 WebDAV 列出 U 盘和 NAS 的文件，并把文件传给网页。',
    'Optional library setup and NAS finder':
      'NasFind 在电视所在的 /24 网络中逐个探测 445 端口，并通过 NetBIOS 获取每台设备的名称。登录后由 libVLC 列出共享文件夹，媒体库文件夹把每个文件夹的类型存入 SharedPreferences。',
    'Windows and Mac app':
      'Electron 原样运行 webOS 页面及其 Node 服务。页面从自己的 lumiere:// 源加载，服务用主文件夹和磁盘代替 U 盘。',
    'Continue Watching':
      '两个应用都用保存的播放位置生成列表，最新的在前，最多 20 行。进度达到 95% 视为看完，看完的一集由下一集替代。',
    'Film look':
      '颗粒层画在视频上方，不占用解码器，因此 HDR 和硬件解码保持不变。在 Android 12 及以上，播放器把影片帧率传给 Surface.setFrameRate。',
    'Caught songs':
      'GitHub APK 中的接收器确认消息来自 SongCatcher 后，将歌曲存入 liked-songs.db。文件夹里有的歌指向其文件，其他歌保存 YouTube 地址。',
    'Titles of films, series and books':
      '电影查询从 Wikidata 获取俄文和英文标题及年份。每个应用用一个函数拼出标题行：Android 上是 Titles.label，webOS 上是 titleLine。',
  },
};

export default arch;

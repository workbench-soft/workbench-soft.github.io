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
  features: {
    Sources:
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
    'Video library': '扫描只把每个视频的路径存进 SQLite。解析器从名称里读出剧集、季和集数，Wikidata 补充其他名称。',
    'Find tabs': '播放栏把带歌手和歌名的 Android 链接发给 Guitar Upscale。只有 Android 找到这个应用时按钮才会出现。',
    'Google Play build': '第二种构建类型去掉自更新、完整文件访问和在线模块。之后由 Google Play 负责更新。',
    'Voice commands':
      'sherpa-onnx 在手机上听到 Hey Lumi，Android 语音识别接收命令。匹配器找到歌曲、书或视频，再用语音合成回答。',
    'Online music':
      '在线模块通过 Chaquopy 在 Python 里运行 yt-dlp。MusicBrainz 提供歌曲名称，YouTube 提供声音，只在 64 位手机上的 GitHub APK 里。',
    'Lumiere Pro':
      'Google Play Billing 出售一个 Pro 商品，应用每次启动都向 Google Play 查询。应用里的一项检查打开语音功能并隐藏横幅。',
  },
};

export default arch;

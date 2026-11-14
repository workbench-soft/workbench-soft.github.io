import type { Arch } from '../types';

const arch: Arch = {
  summary:
    '一个 Next.js 应用运行在浏览器和 Cloudflare Workers 上。Capacitor 把同一份构建打包进 Android 和 iPhone 应用，声音引擎在设备上运行。',
  parts: [
    { name: 'Next.js 和 React', role: '包含每项功能的单一页面，由服务器渲染一次后在浏览器里运行。' },
    { name: '声音引擎', role: 'React 之外的播放器和录制器，通过 RxJS 事件总线相连。' },
    { name: 'Web Workers', role: '在主线程之外运行节拍时钟、指法搜索和和弦识别。' },
    { name: 'smplr 和 Web Audio', role: '采样的 General MIDI 乐器，带混响和延迟总线。' },
    { name: 'Redux Toolkit', role: '保存在浏览器里的设置和界面状态。' },
    { name: 'Konva', role: '指板、钢琴卷帘和六线谱的画布。' },
    { name: 'Capacitor', role: '把静态构建连同原生插件打包进 Android 和 iPhone 应用。' },
    { name: 'Cloudflare Workers 和 KV', role: '通过 OpenNext 托管服务端构建，代理歌曲网站并存放内置歌曲。' },
  ],
  flow: [
    '一次点按、一个和弦或一首载入的歌曲把音符送上事件总线。',
    'Web Worker 里的时钟让播放、扫弦和循环器跟上节拍。',
    'smplr 库让每个音符经过混响和延迟发声。',
    '录制器按 tick 记录每个音符，供钢琴卷帘和 MIDI 使用。',
    '外部网站的歌曲和歌词经由 Cloudflare 上的 Worker 送来。',
  ],
  links: [
    { to: 'lumiere-player', text: 'Lumiere Player 通过链接在 Guitar Upscale 中打开正在播放的歌曲。' },
    { to: 'keeppad', text: 'Hey Guitar 唤醒词使用与 KeepPad 相同的 sherpa-onnx 关键词模型。' },
    { to: 'Songsterr', text: 'Songsterr 的谱子经由 Worker 代理进来，变成 Guitar Pro 文件。' },
    { to: 'Google Play', text: 'Google Play 出售 Pro 和 Remove ads，AdMob 显示广告。' },
    { to: 'Cloudflare', text: 'Cloudflare Workers 托管网站，KV 存放内置歌曲。' },
  ],
  features: {
    Fretboard: 'Konva 按设置里的音阶和调弦在画布上画出指板。点按把音符送上事件总线，再由 smplr 发声。',
    'Scale, tuning and capo': '音阶和调弦是应用内的固定数据。选择会写入 Redux，指板和指法随之重建。',
    Tuner: 'pitchy 库直接在浏览器里从麦克风读出音高。应用根据空弦猜出调弦，Konva 画出表盘。',
    Chords: '最多 4 个 Web Worker 组成的池为指板和变调夹寻找指法。面板一次填入一种和弦类型。',
    Strumming: '每个按住的和弦按钮按 Worker 时钟弹出所选节奏型。自定义节奏型保存在浏览器里。',
    'Song list':
      '内置歌曲是存放在 Cloudflare KV 里的 Guitar Pro 文件，构建时转成 JSON。你的歌曲留在浏览器里，列表标出每首的音阶。',
    'Voice search':
      '浏览器里由 Speech API 听写，Android 应用使用手机的语音服务。随后应用播放列表里的歌曲或去歌曲网站搜索。',
    'Hey Guitar':
      '在 Android 上来自 KeepPad 的 sherpa-onnx 关键词模型离线识别唤醒词。在浏览器里页面打开时由浏览器的语音服务收听。',
    'MIDI recording': '录制器监听事件总线并按时钟 tick 记录每个音符。应用自己播放的音符带有标记，所以录音会跳过它们。',
    Looper: '最多 8 个通道按 Worker 时钟从事件总线录音。循环取整到完整小节并保持同步。',
    Quantize: '设置里的一个时值决定钢琴卷帘的网格。录制器在音符进来时就把它放到网格上。',
    'Piano roll':
      '钢琴卷帘直接编辑共享的音符时间线，每条音轨都能撤销。Konva 画出音符，文件没有段落标记时由一个 worker 推测段落。',
    'Tab view': '一个排版模块把一条音轨的音符变成弦上的品位。Konva 画出小节并跟随共享的播放头。',
    'Chord sheet':
      '由于和弦和歌词网站拦截浏览器请求，Worker 代为取回歌词。应用把其中的和弦移到歌曲的调上，并按时间对齐每一行。',
    'Song upload':
      '读取器在浏览器里把 Guitar Pro 和 MIDI 文件变成音符。音频文件按名称去歌曲网站查找，或由 ONNX 模型在设备上听出和弦。',
    'Find a song online':
      'Cloudflare 上的 Worker 把每次搜索转发到 4 个拦截浏览器请求的歌曲网站。应用把 Songsterr 歌曲转成 Guitar Pro 文件。',
    'Chord and scale detection':
      'Web Worker 里的和弦检测器把点按的音符与指法比对。音阶检测器在主线程运行并给出音阶建议。',
    'Instruments and sound':
      'smplr 库播放来自免费音色库的 General MIDI 音色，并在第一次点按时载入。旋律和和弦各用自己的乐器。',
    Effects: '每件乐器接入一条带卷积混响和反馈延迟的 Web Audio 总线。拖动滑块会实时改变总线而无需重新载入乐器。',
    'MIDI export':
      'midi-writer-js 库把载入的音符写成 MIDI 文件。一个 Guitar Pro 写入器把同样的音符存成 Guitar Pro 文件。',
    'Guitar Upscale Pro':
      '每份构建都带有每项功能。Android 应用会隐藏 Pro 功能，直到手机上的 Google Play Billing 报告购买。',
    'Install and offline': 'Service worker 缓存页面、代码和歌曲供离线使用。Android 应用在 APK 里带着静态构建和音色。',
    'iPhone app':
      'Capacitor 把同一份静态构建打包进带 Swift 插件的 iOS 项目。StoreKit 负责购买，AdMob 在跟踪询问之后显示广告。',
    'Screen layout': 'React 组件浮在全屏指板画布之上。一项设置把和弦放到左边或右边。',
    'Play panel': '播放器按 Worker 时钟走过音符时间线，把每个音符送上总线。和弦面板从指法搜索的 worker 取得指法。',
    'Easy and Pro mode': '开启 Easy 时播放器里的过滤器只保留和弦事件。没有和弦的歌曲完整播放。',
    'Song links': '菜单用歌曲名在每个网站上拼出搜索地址。网站在新标签页或 Android 浏览器中打开。',
    'Built-in songs admin':
      '管理页面和开发者本人的手机把歌曲写入 Cloudflare KV。手机路由检查开发者密钥，再通过 GitHub Actions 启动部署。',
    Settings: 'Redux Toolkit 保存每项设置，redux-persist 把它存进浏览器。引擎在 React 之外读取一份普通副本。',
    'Android updates': 'GitHub 版本在启动和回到前台时向 GitHub Releases 查询更新的 APK。原生插件下载它并打开安装程序。',
    Ads: 'AdMob 在应用里显示横幅和全屏广告。在 Google Play 购买 Remove ads 或手机上的开发者密钥会关掉广告。',
    Languages: 'i18next 用 10 个语言包保存应用文字，并跟随手机或浏览器的语言。课程页面按语言在各自的路径下构建。',
  },
};

export default arch;

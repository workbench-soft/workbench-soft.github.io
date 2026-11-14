import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'KeepPad 是一个 Expo 应用，同一套代码构建出 Android 应用、iPhone 应用和网站。笔记存在手机上的 SQLite 里，只有共享的笔记才会进入 Firebase。',
  parts: [
    { name: 'Expo 和 React Native', role: 'Android、iPhone 和网站共用一套代码，界面用 expo-router。' },
    { name: 'Kotlin 监听服务', role: 'Android 前台服务听到 Hey Keep，录下笔记并播放回答。' },
    { name: 'sherpa-onnx', role: '手机上的小型关键词模型，负责发现唤醒短语。' },
    { name: '手机语音识别', role: 'Android 语音服务和 Apple 识别器把语音转成文字。' },
    { name: 'SQLite', role: '手机上的笔记、已发送记录和已处理的收件清单。' },
    { name: 'Gemini Nano 和 Apple Foundation Models', role: '应用打开时，手机自带的模型会挑出更合适的分组。' },
    { name: 'Firebase', role: 'Firestore 保存共享笔记，Hosting 托管网站。' },
    { name: 'Google Play', role: 'AdMob 广告，以及“去除广告”和 KeepPad Pro 的购买。' },
  ],
  flow: [
    '应用关着时，监听服务也能听到“Hey Keep”。',
    '它录下笔记，在手机上把语音转成文字。',
    '服务把笔记写进一个小的收件文件。',
    '应用把它存进 SQLite，并按词语选出分组。',
    '手机模型可能改动分组，列表随之刷新。',
  ],
  links: [
    {
      to: 'memories',
      text: '以某人名字开头的笔记，会通过 WebDAV 进入家中 NAS 上那个人的日记。',
    },
    {
      to: 'lumiere-player',
      text: '借助 Wake Share，KeepPad 的服务也能听到“Hey Lumi”，并转给 Lumiere。',
    },
    { to: 'spotthecam', text: '同一个共享麦克风把“Hey Spot”转给 SpotTheCam。' },
    { to: 'Firebase', text: 'Firestore 让共享笔记实时同步，Hosting 托管网站。' },
    { to: 'Google Play', text: 'AdMob 显示横幅，Play Billing 出售“去除广告”和 KeepPad Pro。' },
  ],
  features: {
    'Hey Keep':
      'Kotlin 前台服务跳过安静的声音，只在响亮的片段上运行 sherpa-onnx 模型。回答来自按声音录好的片段，调校会为每个短语设定阈值。',
    'Long recording': '服务边录边把声音写进临时文件。如果崩溃，应用会把这个文件变成笔记，并从声音里得到文字。',
    'Stop and continue':
      '录笔记时，关键词模型和识别器都在听“Stop”。听到“continue”后，服务把新的话和声音接到最新的笔记上。',
    'Record by button':
      'expo-speech-recognition 在人说话时把文字显示在屏幕上。笔记存进 SQLite，手机允许时连同声音一起保存。',
    Recordings: '应用自己录音，再把声音交给识别器。WAV 文件留在手机上，和笔记放在一起。',
    Groups:
      '按英语和俄语词根匹配，立刻选出分组。应用打开时，Gemini Nano 或 Apple Foundation Models 可能选出更好的分组。',
    Languages: '手机的识别器能听懂英语和俄语，装了语言包就能离线使用。i18next 用 9 个词条库保存界面文字。',
    'Share by link': '笔记进入 Firestore，链接可在应用或浏览器里打开它。监听让两份副本实时同步，较新的修改胜出。',
    'Send to other apps':
      '每个关联的应用都通过自己的 Web API 收到新笔记。Obsidian 会在选定的文件夹里得到一个文件，登录令牌存在安全存储里。',
    Website: 'Expo 把每个路由导出成静态页面，由 Firebase Hosting 托管。共享笔记在浏览器里从 Firestore 加载。',
    'In-app update': 'GitHub 版在启动和返回时读取发布列表。它下载 APK 并打开 Android 安装程序。Play 版不含这段代码。',
    'Light and dark theme': '主题模块跟随手机的配色或固定的选择。这个选择和其他设置一起留在手机上。',
    Ads: 'Google Mobile Ads 库在主屏幕显示 AdMob 横幅。在欧洲，Google 的同意表单会先询问。',
    'Remove ads': 'expo-iap 通过 Google Play Billing 出售这个商品。“恢复购买”能在同一账号的新手机上找回它。',
    'Loud sound from the phone speaker':
      '原生模块把每个声音送到内置扬声器，以最大音量播放。增益器再加 6 dB，声音结束后音量复原。',
    'Notes about a person go to Memories':
      '应用把笔记的第一个词与 Memories 里的名字比对。整理好并标上日期的笔记通过 WebDAV 进入那本日记。',
    'KeepPad Pro':
      'expo-iap 通过 Google Play 出售 Pro，一个 Pro 模块在每个锁定的操作前检查它。退款后，下次启动时 Pro 会关闭。',
    'Fast scroll': '工作室的 fast-scroll 包包住笔记列表。列表每帧跟随滑块移动，iOS 和网页保留自己的滚动条。',
  },
};

export default arch;

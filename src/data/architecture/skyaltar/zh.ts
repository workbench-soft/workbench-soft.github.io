import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'Sky Altar 是一个面向 Android 和网页的 Expo 应用，没有自己的服务器。星空来自 Astronomy Engine 和应用内的星表，由 Skia 绘制。',
  parts: [
    { name: 'Expo 和 React Native', role: 'Android 应用和网站共用一套代码，名称用手机自带的字体显示。' },
    { name: 'Skia', role: '在 GPU 上把整片星空画成每帧一张图。' },
    { name: 'Astronomy Engine', role: '定出太阳、月亮和行星的位置，并计算本命盘。' },
    { name: 'd3-celestial 数据', role: '2851 颗亮于 5.5 等的恒星，以及带名称的 IAU 星座图形。' },
    { name: 'expo-camera', role: '每 1.5 秒静音拍一张照片，用来比对星星。' },
    { name: 'Media3 ExoPlayer', role: '一个 Kotlin 模块，以固定音量用扬声器循环播放音乐。' },
    { name: 'Cloudflare R2', role: '提供付费主题的图片和音轨。' },
    { name: 'Google Play Billing 和 AdMob', role: '出售去广告和 Pro，并在用户同意后显示广告。' },
  ],
  flow: [
    '旋转传感器或手指转动星空的视角。',
    'Astronomy Engine 每秒把每颗星换算成地平坐标。',
    '每一帧把星星和星座图形投影到屏幕上。',
    'Skia 把插图、连线和星星录成一张图。',
    'React Native 在上面写出名称，相机识别的星星在最上层发光。',
  ],
  links: [
    { to: 'songfactory', text: '主题音乐由 Songfactory 通过 Suno 生成，每个主题一行风格描述。' },
    { to: 'tickalot', text: '更新检查复制自 Tick-a-Lot。' },
    { to: 'app-updater', text: 'WBS Updater 从共享的发布中安装同一个 APK。' },
    { to: 'Google Play', text: 'Google Play Billing 出售去广告和 Pro。' },
    { to: 'Open-Meteo', text: '出生城市搜索只发送输入的城市名，返回地点和它的时区。' },
  ],
  features: {
    'Sky view': '旋转传感器移动视角，陀螺仪在两次罗盘校正之间保持稳定。Skia 用应用内的数据画出星星、天体和 88 个星座。',
    Clock: 'React Native 图层用主题字体绘制时间和日期。计时器每分钟触发一次，时钟随按钮一起变暗。',
    'Camera stars': '应用每 1.5 秒静音拍一张照片，用 JavaScript 找出其中的光点。与星表吻合的光点会在星空上闪出金光。',
    'Culture themes':
      '每种文化有一条记录，定下颜色、线条风格和字体。每张插图固定在星座的 3 颗星上，付费主题从 Cloudflare R2 下载一次。',
    'Ambient music':
      '基于 Media3 ExoPlayer 的 Kotlin 模块带淡入淡出循环播放音轨，音轨内置或来自 CDN。文件选择器把你自己的文件或文件夹复制进应用。',
    'Ads and Remove ads':
      'AdMob 在主题面板和设置里显示横幅，另有最多每 30 分钟一次的全屏广告。Google Play Billing 出售去广告。',
    'Sky Altar Pro': 'Google Play Billing 出售 Pro 商品，一处检查决定每个锁。网页版没有商店，直接开放 Pro 部分。',
    'App languages': 'i18next 为界面保存 9 份目录。星座名称和传说文件也有每种语言的版本。',
    'Updates from GitHub': '更新检查读取共享的 GitHub 发布，下载 APK 并交给安装器。Google Play 版本把检查换成空实现。',
    Astrology:
      'Astronomy Engine 为本命盘定出行星位置，采用整宫制。Open-Meteo 查找出生城市，保存的出生资料只留在手机上。',
    'Constellation navigation':
      '虚拟化列表筛选星座目录，并把每个星座的标注点换算到当前的天空。点一下，视角在 450 毫秒内平滑转过去。',
    'Constellation lore':
      '每张卡片从对应语言的传说文件读取主题文化的故事。恒星资料来自 ESA Gaia 档案中的 Hipparcos 数据。',
  },
};

export default arch;

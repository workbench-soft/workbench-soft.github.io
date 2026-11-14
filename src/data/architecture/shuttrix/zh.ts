import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'Shuttrix 是一个 Expo 应用，React Native 界面运行在基于 CameraX 和 Camera2 的 Kotlin 相机模块之上。每张照片都在手机上生成和保存，不经过服务器。',
  parts: [
    { name: 'Expo 和 React Native', role: '用 TypeScript 写的相机界面、拨盘、简单模式、相册和设置。' },
    { name: 'CameraX 和 Camera2', role: 'CameraX 管理生命周期和数据流，Camera2 提供手动拨盘的数值。' },
    { name: 'Kotlin 相机模块', role: '绑定镜头、应用拨盘，并让每张保存的照片走一遍当前模式的处理。' },
    { name: 'OpenCV', role: '拼接全景、对齐微距的焦点堆栈，并渲染人像虚化。' },
    { name: 'ML Kit', role: '从预览中读取二维码，并为人像找出主体。' },
    { name: 'ONNX Runtime', role: '在手机上运行深度模型，用于人像和 Mini 的虚化。' },
    { name: 'Rust 照片库', role: '为 Raw 开关把传感器原始帧冲洗成照片。' },
    { name: 'MediaStore', role: '把每张照片存进相机文件夹，Memories 和其他相册都能在那里找到。' },
  ],
  flow: [
    '用户选一个模式，转动拨盘或滑块。',
    '界面把数值作为属性传给 Kotlin 相机视图。',
    'CameraX 和 Camera2 应用这些值，拨盘显示每一帧的实时数值。',
    '按下快门拍照，当前模式的处理在保存的文件上运行。',
    'MediaStore 把结果存进相机文件夹，相册随即显示。',
  ],
  links: [
    {
      to: 'memories',
      text: 'Shuttrix 位于 Memories 的仓库中，共用它的照片编辑器、查看器和地名。Memories 从相机文件夹读取这些照片。',
    },
    { to: 'app-updater', text: 'WBS Updater 从共享的发布中安装同一个 APK。' },
    { to: 'GitHub', text: '商店外的版本在公开发布中找到新版本。' },
    { to: 'Google Play', text: 'Google Play Billing 出售 Plus 和去广告。' },
    { to: 'Google AdMob', text: 'AdMob 在同意表单之后显示相册横幅。' },
  ],
  features: {
    'Simple and Pro': '两个模式驱动同一个相机视图。简单模式把对焦和曝光交给自动，Pro 模式交给拨盘。',
    'Simple mode': 'React Native 在相机视图上绘制镜头图标、变焦条和滑块。设置存储保存每个值，并把它转成相机属性。',
    Night: 'Kotlin 模块调用 CameraX 的夜景扩展，也就是手机自带的夜景处理。没有该扩展的镜头改用低帧率和强降噪。',
    Astro: '模块拍下最多 24 帧四分之一秒的画面，并按星星对齐。随后色调处理去掉天空辉光，让星星更亮。',
    Moon: '2.5 秒的连拍保留月亮周围最清晰的 8 帧并取平均。第二步处理加强锐度并调整色阶。',
    'Long exposure': '帧流收集 3 秒的手持画面并对齐。混合时在静止的区域使用最清晰的那一帧。',
    Portrait: 'ML Kit 在对焦点找出主体，深度模型给出距离。随后 OpenCV 在手机上按深度渲染虚化。',
    Mini: 'GPU 虚化通过渐变遮罩叠在清晰照片上，颜色更浓。同一个 GPU 滤镜让预览和视频呈现相同效果。',
    Macro: '应用选出对焦距离最近的后置镜头，并算出画面宽度。OpenCV 的焦点堆栈把 6 到 10 帧合成一张清晰照片。',
    Panorama:
      '手机每转过足够角度，旋转传感器就保留一帧，最多 12 帧。OpenCV 把每帧投到圆柱面上，按匹配的特征点拼接条带。',
    'Slow motion': 'CameraX 高速会话以镜头支持的最高固定帧率录制。CameraX 自己写出慢放的 MP4。',
    'Time lapse': '第二条帧流每半秒把一帧送进 H.264 编码器。每帧有固定的时间戳，所以速度稳定在 15 倍。',
    Lenses: '模块从相机读取每个镜头及其范围，一个变焦倍率决定使用哪个镜头。前置相机按检测到的人脸调整取景。',
    Focus: '相机自带的人脸检测在每一帧找出人脸。模块把对焦和测光对准目标人脸或点按的位置。',
    'White balance':
      'Camera2 设置预设和增益。为了色温，模块对每个镜头测一次各个预设，再把数值放在最近的 2 个预设之间。',
    Exposure: 'Camera2 手动设置 ISO 和快门，或交给自动曝光。镜头给出补偿范围，自动模式会把暗场景最多压暗 2 EV。',
    'Auto tune': '一个纯函数读取测得的光线和自动白平衡的色温。它为场景给出光线、色温和色彩的取值。',
    Color: 'Camera2 没有饱和度控制，所以颜色矩阵会重写每张保存的照片。预览以实时效果使用同一个矩阵。',
    'Photo, video and flash': 'CameraX 在手指按下时以零快门延迟拍照。长按会绑定视频流开始录制，结束后再换回拍照流。',
    'Place and camera tags':
      '相机打开期间，Android 定位服务保持最新的位置。随后 EXIF 处理把地点、拨盘数值和镜头朝向写进文件。',
    'Photo and video size': '设置提供 3 档照片尺寸和 4 档视频尺寸。CameraX 会退到镜头支持的最接近尺寸。',
    'Photo format and originals':
      '文件模块把每张照片编码成 WebP、JPEG 或 PNG，并复制 EXIF 标签。它可以保留相机原图和仅调色的副本，RAW 另存一个 DNG。',
    'Multi-frame photo': '相机运行时，环形缓存保留最近 5 帧全尺寸画面。按下快门会合并按下之前的帧，以最新一帧为基准。',
    'Enhance photos':
      '开启增强时，GPU 着色器提亮阴影，并给保存的 JPEG 增加色彩和锐度。关闭时，Camera2 在相机允许的地方使用普通 sRGB 色调曲线。',
    'Raw photo (beta)':
      '一个独立的 Camera2 会话保留传感器最近 8 帧原始数据。Rust 库对齐并合并它们，再在手机上冲洗出照片。',
    'QR codes': '内置的 ML Kit 扫描器在手机上读取每一帧预览。CameraX 把每个码的方框映射到屏幕上，用来画角标。',
    Clock: 'React Native 图层在隐藏的状态栏留下的位置绘制时间。计时器每分钟触发一次，点按会穿过时钟落到预览上。',
    Gallery:
      '相册列出应用通过 MediaStore 保存的照片，并把同一张照片的各个版本归在一起。Android 分享菜单发送选中的文件。',
    Plus: 'Google Play Billing 出售这个一次性商品，应用在第一次打开相册时核对购买。锁定的模式会打开 Plus 面板，显示来自 Google Play 的价格。',
    Ads: 'AdMob 在相册网格下方显示一条横幅，并在第一次打开时征求同意。购买去广告或 Plus 后，同一项 Google Play 核对会隐藏它。',
    'Edit photos':
      'Memories 仓库中的共享编辑器包运行在 Expo DOM 组件里。Kotlin 模块把结果覆盖原文件或另存为新的 JPEG，并保留元数据。',
    'Quick start':
      '应用响应 Android 的相机意图，所以双击电源键就能打开它。快速设置磁贴和锁屏上的界面也能在锁屏时打开它。',
    Updates: '共享的更新包在启动和每次回到应用时检查 GitHub 发布。Google Play 版本用不做检查的空实现替换它。',
    Languages: 'i18next 为每种语言保存一份目录，测试会核对每个键。相机模块把设置里选的语言存在拨盘数值旁边。',
    'Light, blur and fonts':
      '共享照片编辑器处理的是成片像素，所以它的虚化用椭圆形区域，没有深度数据。只在拍摄时生效的设置不放进编辑器。',
    'iPhone app':
      '相机模块的 Swift 版本运行在 AVFoundation 上，调用方式相同。Core Image 负责照片处理，合成模式使用视频帧。',
  },
};

export default arch;

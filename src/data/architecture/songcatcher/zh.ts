import type { Arch } from '../types';

const arch: Arch = {
  summary:
    '一款没有服务器的 Kotlin Android 应用。前台服务听唤醒词，手机自己算出 Shazam 指纹，歌曲进入 Spotify 和 Lumiere。',
  parts: [
    { name: 'ListenService', role: '前台麦克风服务：每次读 80 毫秒，开始抓歌并说出结果。' },
    { name: 'sherpa-onnx', role: '关键词检测器，靠一行短语就能听到“Shazam”，不用训练。' },
    { name: 'Signature.kt', role: 'shazamio 指纹的 Kotlin 移植：16 kHz 单声道的 FFT 和 4 个频段的峰值。' },
    { name: 'Shazam', role: '识别服务，在第 3、6、9、12 秒用指纹询问。' },
    { name: 'Spotify.kt', role: 'PKCE 登录、按 ISRC 查歌，并存入已点赞歌曲。' },
    { name: 'wakeshare', role: '本仓库的共用麦克风模块，让其他唤醒词应用保留各自的唤醒词。' },
  ],
  flow: [
    '关键词检测器听到“Shazam”，服务拿到麦克风并发出提示音。',
    '抓歌时一边录音一边算指纹，后台同时询问 Shazam。',
    '找到的歌通过 broadcast 发给 Lumiere，并存入 Spotify 已点赞歌曲。',
    '语音说出结果，麦克风重新听所有唤醒词。',
  ],
  links: [
    { to: 'Shazam', text: '接收指纹，返回歌名、艺人、专辑和 ISRC。' },
    { to: 'Spotify', text: '先按 ISRC，再按艺人和歌名找歌，存入已点赞歌曲。' },
    { to: 'lumiere-player', text: '通过 broadcast LIKE_CAUGHT_SONG 收到每首歌，加入它的已点赞歌曲。' },
    { to: 'keeppad', text: '通过 wakeshare 与 SongCatcher、SpotTheCam 和 ServoHop 共用麦克风。' },
  ],
  design: {
    scale: ['一位主人的手机，每天抓几次歌。', 'Shazam 在 2 分钟约 15 次询问后返回 429，所以一次抓歌最多发 4 次。'],
    data: [
      '最近 50 首歌及其 Spotify 状态存在 shared preferences 里。',
      '离线时生成的指纹在旁边最多等一周。声音本身不保存。',
    ],
    interfaces: [
      '指纹以 HTTPS POST 发往 amp.shazam.com，Spotify Web API 用 bearer 令牌。',
      '显式 broadcast 发往 com.workbenchsoft.lumiere，wakeshare 绑定服务连接其他唤醒词应用。',
    ],
    reliability: [
      '没有网络、429 或 5xx 时保留指纹，下次唤醒或启动时发出。',
      '只有 Spotify 资料库确认后歌曲才算已保存，其余的用按钮重试。',
    ],
    security: [
      '登录用 PKCE，所以没有客户端密钥。刷新令牌用 Android Keystore 密钥加密保存。',
      '离开手机的只有指纹，几 KB 的峰值。抓歌结束后录音就被丢弃。',
    ],
    performance: [
      '询问在第二个线程里运行，Shazam 用 0.3 到 0.6 秒回答时录音不停。',
      '第一次询问在音乐响起 3 秒后发出，大多数歌这时就能找到。',
    ],
    operations: [
      'CI 运行单元测试，并把 APK 构建为 songcatcher 构件。',
      'SignatureTest 让指纹与 shazamio 的字节一致，CatalogTest 检查 9 个字符串目录。',
    ],
    tradeoffs: [
      '选了免费的 Shazam 接口，没选每次询问都要付费令牌的 AudD，也没选需要 Apple 开发者年费的 ShazamKit。该接口不公开，可能会变。',
      '用 sherpa 的一行短语，没用训练好的 openWakeWord 模型，这样不用训练就能发布。模型以后再加。',
      '做成独立应用，没做成 Lumiere 里的功能，这样 Lumiere 没开也能抓歌。代价是多装一个 APK。',
    ],
  },
  features: {
    'Wake by voice':
      'KeywordAudio.kt 用 keywords.txt 的那一行运行 sherpa-onnx。ListenService.kt 在抓歌期间占用共用麦克风，并通过 Voice.kt 发出提示音。',
    'Song recognition':
      'Catch.kt 每次把 100 毫秒交给 Signature.kt，在第 3、6、9、12 秒发出指纹。Shazam.kt 读取歌名、艺人、专辑和 ISRC。',
    'Liked Songs in Spotify and Lumiere':
      'Lumiere.kt 发送带艺人、歌名、专辑、ISRC 和时间的 broadcast。Spotify.kt 先按 ISRC 再按名称搜索，存入资料库。',
    'Spoken answer': 'Voice.kt 发出提示音，并用 Android 语音合成说话，同时压低音乐。屏幕上的开关可关掉语音。',
    'Offline catches': 'History.kt 保存指纹和时长。每次抓歌后和启动时，服务发出等待中的指纹，并静默保存找到的歌。',
    'Caught songs': 'History.kt 保存最近 50 首歌和 Spotify 状态。retryPending 保存等待中的歌，并报告存进了几首。',
    Lyrics:
      'Lyrics.kt 按艺人、歌名和专辑向 LRCLIB 查询，然后搜索，并把结果存在缓存文件夹。Compose 的 SongSheet 显示加载圈、歌词或重试。',
    Languages: '所有显示和朗读的文字都在 res/values 的 strings.xml 里，共 9 种语言，CatalogTest 检查键是否一致。',
    'Shared microphone':
      'WakeShare 通过绑定服务连接各唤醒词应用。包名最小的应用占用麦克风，把 WAKE 发给它听到的唤醒词所属的应用。',
    'Wake engine':
      'wakeword 在 ONNX Runtime 上运行 openWakeWord 模型，并配有按主人调好的校验器。没有模型的唤醒词由 sherpa 检测器负责，现在的 SongCatcher 就是这样。',
  },
};

export default arch;

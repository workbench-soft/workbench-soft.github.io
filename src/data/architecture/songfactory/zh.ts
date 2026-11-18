import type { Arch } from '../types';

const arch: Arch = {
  summary:
    '一个 Python 命令行工具在 Windows 电脑上配合 ffmpeg 和本地 GPU 运行。它把一个主题文件夹变成 YouTube 视频，由桌面窗口或 Archon 驱动。',
  parts: [
    { name: 'Python 和 uv', role: 'songfactory 命令和它的模块，通过 uv 运行。' },
    { name: 'ffmpeg', role: '混合歌曲、循环片段，并在 GPU 上用 NVENC 编码。' },
    { name: 'numpy 和 Apollo', role: '重建被有损编码器切掉的高频段。' },
    { name: 'Claude CLI', role: '借助 Claude 订阅写出话题、歌词和 YouTube 文字。' },
    { name: 'Playwright', role: '在 Chromium 中操作 Suno 网站，生成并下载歌曲。' },
    { name: 'ComfyUI', role: '在本地 GPU 上根据提示词画出背景片段。' },
    { name: 'YouTube Data API', role: '上传视频及其缩略图、AI 标签和发布时间。' },
    { name: 'tkinter', role: '用 9 种语言清理或增强所选歌曲的桌面窗口。' },
  ],
  flow: [
    '歌曲来自主题文件夹或 Suno 方块。',
    'ffmpeg 清理每首歌并保留原文件。',
    'ffmpeg 在循环片段上用淡入淡出连接歌曲。',
    '构建写出章节、描述和缩略图。',
    'YouTube Data API 按发布时间上传视频。',
  ],
  links: [
    { to: 'archon', text: 'Archon 的 Songs 标签页画出方块，并通过 songfactory 命令运行每个方块。' },
    { to: 'Suno', text: 'Suno 生成歌曲，Playwright 把它们下载下来。' },
    { to: 'YouTube', text: '视频通过 YouTube Data API 上传，每天约 6 个。' },
    { to: 'Claude', text: 'Claude CLI 借助订阅写文字，不需要 API 账户。' },
  ],
  design: {
    scale: [
      '一位创作者，一台带 GPU 的 Windows 电脑。每日运行最多上传约 6 个视频。',
      '每次上传约消耗 YouTube 每日 10000 配额单位中的 1600 个，这个配额设定了上限。',
      '本地 GPU 每次运行约生成 720p 的 5 秒视频，所以每个背景都是循环片段。',
    ],
    data: [
      '状态就是主题文件夹里的文件：theme.toml 存设置，out/upload.json 标记主题已完成，out/claude.json 保存 Claude 写的文字。',
      '项目把十个模块的设置放在 pipeline.json 中，每个都有 kind、enabled 和 params。',
      '清理后的歌曲以 FLAC 存入 out/clean/，原文件保留。密钥放在仓库之外的文件夹。',
    ],
    interfaces: [
      '命令行有 bg、clean、build、upload、publish、run、enhance、clips 和各模块命令。Archon 的 Songs 标签页读取 songfactory project 并运行 songfactory tile。',
      'ffmpeg 和 ffprobe 作为子进程运行，ComfyUI 通过 HTTP 收到填好提示词和种子的 workflows/loop.json。',
      'upload.py 在桌面应用的 OAuth 登录之后，调用 YouTube Data API 的 videos.insert 和 thumbnails.set。',
      'progress.py 输出 step、file i/n 和 progress NN% 行，启动器把它们变成进度条。',
    ],
    reliability: [
      'YouTube 一返回视频 id 就写下 upload.json，所以缩略图失败不会引发第二次上传。',
      'run 跳过以 _ 或点开头的文件夹，某个主题失败时继续处理下一个。',
      'claude.py 是可选的。CLI 缺失或调用失败会输出一行，主题以文件夹名作标题继续。',
      '关闭的模块会把输入原样传下去，音频模块取最近一个运行过的前序模块的文件。',
    ],
    security: [
      'YouTube 的 OAuth 令牌和其他密钥放在仓库之外的文件夹里。',
      'claude -p 在去掉 API 密钥变量的情况下运行，所以计入已登录的订阅，而不是 API 账户。',
      '上传会设置 containsSyntheticMedia，并在 Google 审核项目之前保持私享。',
    ],
    performance: [
      '电脑有 GPU 时用 h264_nvenc 在 GPU 上编码，否则由 libx264 接手。',
      '片段用 -stream_loop 加来回播放循环，所以 5 秒片段就能覆盖长视频，无需长时间渲染。',
      '清理是一次 ffmpeg 调用，带固定增益、highpass、afftdn 和 7 kHz 动态截止，不用神经网络模型。',
      '批量 enhance 通过一个命令行进程运行，所以为所有歌曲只写一个 compare.html。',
    ],
    operations: [
      'Windows 计划任务每天 03:00 在存放歌曲、令牌和 GPU 的电脑上运行 mise run daily。',
      'checks.yml 在每次推送到 main 时，于自托管 Windows 运行器上运行 lint、测试和 uv build。',
      'release.yml 与 Checks 并行构建 wheel 和 sdist，Checks 通过后由 release-gate.sh 发布。Checks 失败会取消构建。',
      'mise run doctor 为每项前提条件输出一行，ok 或 MISSING，也可为启动器输出 JSON。',
    ],
    tradeoffs: [
      '用命令行 ffmpeg 而不是 Python 视频库，这样混音、循环和 NVENC 编码都在一个工具里，但滤镜图是字符串，打错字要到运行时才暴露。',
      '用短的循环片段，而不是和歌曲一样长的片段，因为 GPU 每次运行只能生成约 5 秒。',
      '每个主题用普通文件而不是数据库，这样一个文件就能回答主题是否已上传，但移动文件夹会丢失它与上传的关联。',
      '用本机任务计划程序而不是 CI 定时任务，因为歌曲和令牌在 git 之外，但电脑必须在 03:00 开着。',
    ],
  },
  features: {
    'Audio workbench': 'tkinter 窗口对所选文件运行清理或增强命令。名称检查会在两个输出撞名之前停下这一批。',
    'Tile pipeline':
      '每个项目把 10 个方块和它们的设置存在一个 JSON 文件里。运行器把上一个方块的输出交给下一个，Archon 负责画出方块。',
    'Per-song videos': '片段模块沿用主题、清理和编码器，为每首歌做一个循环视频。需要时 ffmpeg 用硬切把它们接起来。',
    'Install and check the setup':
      '一个 PowerShell 脚本安装 mise、固定版本的工具和依赖包。检查模块核对每项前提并说明怎么修。',
    'Long video from a playlist': 'ffmpeg 用淡入淡出混合歌曲，并把片段重复到音频的长度。GPU 支持时编码走 NVENC。',
    'Cleanup of AI artifacts':
      '一条 ffmpeg 滤镜链设定固定增益，去掉低频轰鸣、嘶声和刺耳的金属感。清理后的副本存成 FLAC 文件，放在原文件旁边。',
    'Enhance a song': 'numpy 根据下方频段重建高频段。也可以改用 GPU 上的 Apollo 模型，页面会显示前后两张频谱图。',
    'Seamless loop': 'ffmpeg 先正放再倒放片段，然后循环。最后一帧和第一帧之间的跳变就消失了。',
    'Chapters and thumbnail': '章节时间由歌曲长度减去淡入淡出算出。Pillow 把标题写在片段的一帧画面上。',
    'Scheduled upload': 'YouTube Data API 带着 AI 标签和发布时间上传视频。Windows 任务计划程序在 03:00 运行每日构建。',
    'Text from Claude':
      'Claude CLI 根据歌曲名填写空着的标题、描述和标签。主题文件夹里的一个文件保存回答，供下次构建使用。',
    'Background from ComfyUI': '工具把提示词发给本地 GPU 上的 ComfyUI 工作流。返回的片段成为循环背景。',
    'ComfyStack video and robot pictures':
      'songfactory workflows sync 用 Playwright 点 comfystack.online 的下载按钮，把每个工作流以 UI 和 API 两种格式存进 workflows/comfystack/。comfy_graph.py 按节点类型填入图片、歌曲片段和提示词，pictures.py 向 aspirationstyle 机器人要封面，遇到 429 或 502 就换下一个网站。',
  },
};

export default arch;

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
  },
};

export default arch;

import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'Langflip 是一个用 Rust 写的 Windows 和 macOS 程序，没有服务器。核心 crate 判断每个词，每个系统有一层薄薄的代码负责截获按键并打出修正。',
  parts: [
    { name: 'langflip-core', role: 'Rust crate，含 2 种键盘布局、语言模型，以及保留还是修正的判断。' },
    { name: 'Windows 钩子', role: '低级键盘和鼠标钩子看到每个应用里的每次按键，并以 Unicode 发出修正。' },
    { name: 'macOS 事件监听', role: '在 Mac 上做同样的事，用输入源来读写布局。' },
    { name: '语言模型', role: '每种语言的三字母组合得分和词典，由 wordfreq 生成并嵌入 exe。' },
    { name: 'tray-icon', role: '显示当前布局的托盘图标，以及两个系统上的菜单。' },
    { name: 'rust-i18n', role: '菜单和提示的 9 种语言文本，编进程序里。' },
    { name: 'ureq 和 self-replace', role: '在 GitHub Releases 上检查更新，并替换正在运行的 exe。' },
  ],
  flow: [
    '低级钩子截获前台应用里的每次按键。',
    '钩子把物理按键对应到一个位置，与当前布局无关。',
    '核心用模型给两种布局下的字母打分。',
    '另一种布局得分更高时，钩子吞掉这次按键。',
    'Langflip 删掉这个词，用另一种布局重新打出，并切换布局。',
  ],
  links: [
    {
      to: 'GitHub Releases',
      text: 'Windows 版 exe 在这里发布。Langflip 每天查一次新版本，只发送自己的版本号。',
    },
  ],
  features: {
    'Fix the layout of a word':
      '从第 4 个字母起，核心把已打的字母与另一种布局下同样的按键做比较。模型给两者打分，明显胜出的一方会被重新打出。',
    'Short words': '1 到 3 个字母的得分太不稳定，所以核心只查词典。修正要等到空格、回车或 Tab。',
    'Digits kept': '数字在两种布局下打出来一样，所以词缓冲区把它留在原位。词典里也有带数字的词，比如 mp3。',
    'Undo a fix': '核心记住最后一个词的原样，撤销会把它打回来。同一个词第 2 次撤销后，它会进入例外列表。',
    'Convert by hand': '核心保存正在打的词或上一个词。快捷键不做检查，直接把它换成另一种布局。',
    'Skip apps and fields': '系统层把前台应用与设置文件里的列表对比。密码框和管理员窗口则靠系统自己的信号来识别。',
    'The current layout on the icon':
      'Windows 层跟踪窗口和焦点的变化，读取前台窗口的布局。tray-icon 在图标上画出 EN 或 RU。',
    'Pause with a click': '单击会关掉修正，钩子随后放行每次按键。托盘把图标画成灰色。',
    'Switch the layout with a double click':
      '在 Windows 上，Langflip 先把原来的前台窗口找回来，再请它切换布局。在 Mac 上它切换输入源。',
    'Start at login':
      '在 Windows 上，Run 注册表项启动 Langflip，任务计划程序里的任务作为备用。在 Mac 上由启动代理完成。',
    'Settings file':
      '应用数据文件夹里的 TOML 文件保存开关、排除的应用、保留的词和菜单语言。Langflip 在下次切换窗口时重新读取它。',
    'Go on with a word':
      '在 Windows 上，点击或切换输入框后，UI Automation 读取光标前的词。核心把新字母当作这个词的后半部分来判断。',
    'The app icon': '图标来自同一个 SVG。构建时把它写进 exe，安装脚本再把它放到快捷方式上。',
    'Install on Windows':
      '脚本用 Cargo 构建 exe，并复制到当前用户的程序文件夹。它不需要管理员权限，就能加上快捷方式和设置里的应用条目。',
    'Tray menu': 'tray-icon 在 Windows 和 macOS 上画出同一个菜单。rust-i18n 按系统语言或所选语言给出 9 种语言的文本。',
    'Decision log': 'Windows 层把每个判断写进日志：按键数、应用和原因。日志里没有所打的字母，文件到 1 MB 时换新。',
    'Update from GitHub':
      '一个线程每天用 ureq 查询一次 GitHub 的发布列表。点击后它核对大小和 SHA-256，再由 self-replace 换掉正在运行的 exe。',
  },
};

export default arch;

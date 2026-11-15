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
  design: {
    scale: [
      '每台电脑或 Mac 一个人使用。键入的文字留在本机，整个安装就是一个 exe。',
      '模型覆盖英语和俄语 2 种语言，每种都有最常用 10 万词的词典和一张字母三元组表。',
      '只有 2 种固定布局，美式 QWERTY 和俄语 ЙЦУКЕН。钩子必须在回调内作答，所以一次判断只需微秒。',
    ],
    data: [
      '设置放在应用数据文件夹的 settings.toml 中。模型文件内置于二进制文件。',
      '模型文件以魔数 LFM1 开头，之后每种语言依次是字母表、以 f32 存储的字母三元组对数概率和词典。',
      'Windows 日志记录按键数、应用名和判断结果，不含字母，文件为 1 MB，写满后转为 langflip.old.log。',
    ],
    interfaces: [
      '核心 crate 接收按键位置和当前布局，返回一次修正或不修正。两个系统层都调用它。',
      'Windows 使用 WH_KEYBOARD_LL 和 WH_MOUSE_LL 钩子，用 SendInput 输出修正，用 WM_INPUTLANGCHANGEREQUEST 切换布局。',
      'macOS 使用会话级 CGEventTap，用 CGEvent 发送修正，用 Text Input Sources 切换布局。',
      '更新检查每天读取一次 GitHub releases API，查找 langflip-v* 标签，只发送自己的版本号。',
    ],
    reliability: [
      '修正发出的事件带有 Langflip 标记，所以钩子放行它们。修正期间按下的键会等待，并在结束标记之后重放。',
      '被扣住的键最多等 500 毫秒，让窗口接受新布局，卡住的修正在 1 秒后放开它们。',
      '撤销会把词按原样键回，对同一个词再撤销一次会把它加入保留列表。',
      '自启动是一条 Run 键条目，由任务计划程序的任务作后备，以防资源管理器跳过 Run 键。',
    ],
    security: [
      '没有服务器，也没有账号。唯一的网络调用是更新检查，不带任何键入的文字。',
      '密码框和管理员窗口会被跳过，设置文件还可以列出更多要跳过的应用。',
      '日志里没有字母。除非 Langflip 以管理员身份运行，否则无法触及提权窗口，macOS 则需要辅助功能和输入监控权限。',
      '更新替换只检查 HTTPS 和文件大小，没有签名，exe 本身也未签名。',
    ],
    performance: [
      '核心用查表在微秒内给词打分，钩子回调里没有垃圾回收暂停。',
      '从第 4 个字母起，引擎在键入时就检查这个词，所以修正在词结束前到达。',
      '模型已内置，排序后的词表约 20 毫秒加载完。所有词首构成的集合每次启动要 0.4 秒，因此被淘汰。',
      'caret.rs 通过 UI Automation 在自己的线程中读取光标前最多 40 个字符，在点击 40 毫秒后执行。',
    ],
    operations: [
      'mise run lint 涵盖 rustfmt、clippy、cargo shear、ruff、shellcheck 和 actionlint，CI 在 Windows 上检查 macOS 构建。',
      'mise run eval 在每种语言各 1 万个词典词和 1 万个较罕见词上测量误改和漏改。',
      '发布工作流把 langflip.exe 发布到 GitHub Releases，日期版本号通过 LANGFLIP_VERSION 传入。',
      '应用检查是否有新版本，先询问，再由 self-replace 替换正在运行的 exe。mise run install 不需要管理员权限。',
    ],
    tradeoffs: [
      '用 Rust 核心 crate 加每个系统一层薄层，而不是一个混合 crate，这样核心测试能在任何系统运行，代价是每个修正要做两遍。',
      '在 Langflip 自己的进程里用底层钩子，而不是钩子 DLL，这样不会把代码加载进其他应用，但够不到提权窗口。',
      '字母三元组加词典，而不是只用词典，这样能抓到未知词，但罕见词可能提前切换，撤销可以恢复。',
      '为 2 种布局使用静态表，而不是从系统读取任意布局，这样 Windows 和 macOS 给出相同字母，但其他布局不可用。',
    ],
  },
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
    'Welcome on the first start':
      'Windows 上首次启动时，任务对话框在单独的线程里列出快捷键，让钩子不丢消息。图标提示写出当前布局，供屏幕阅读器朗读。',
  },
};

export default arch;

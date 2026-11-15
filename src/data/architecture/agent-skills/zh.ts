import type { Arch } from '../types';

const arch: Arch = {
  summary:
    '纯 Markdown 技能加几个脚本，没有服务器，也不用构建。安装程序把一个克隆链接到机器上的每个编程代理，CI 在每次发布前检查技能。',
  parts: [
    { name: 'Agent Skills 格式', role: '每个技能是一个 Markdown 文件夹，请求匹配时代理就加载它。' },
    {
      name: 'POSIX shell 安装程序',
      role: '把克隆链接到 Claude Code、Codex、Kimi Code 等代理，Windows 上有 PowerShell 外壳。',
    },
    { name: 'Git hooks', role: '在 pull、merge 或 checkout 之后重新链接技能。' },
    { name: 'Node 脚本', role: '把代理钩子合并进每个代理的设置，并复制 MCP 服务器。' },
    { name: 'turn-voice 钩子', role: 'Windows 上的 C# 播放器和 Mac 上的 Node 版本，在一轮结束时说出结果。' },
    { name: 'Python 和 TypeScript 检查', role: '检查技能格式、关键词和每个技能的长度。' },
    { name: 'GitHub Actions', role: '在 Windows 和 Linux 上运行检查，然后打上带日期的发布版本。' },
  ],
  flow: [
    '用户克隆仓库并运行安装程序。',
    '安装程序把每个技能文件夹链接到找到的每个代理。',
    '会话开始时代理读取每个技能的描述。',
    '匹配的请求加载完整技能，代理按步骤执行。',
    '一轮结束时语音钩子说出结果。',
  ],
  links: [
    { to: 'agent-skills-private', text: '作者的私有规则和技能放在那里，与这些公开技能并列。' },
    { to: 'Claude Code', text: '安装程序链接技能，并把钩子合并进它的设置。' },
    { to: 'Codex', text: '同样的技能、钩子，以及从 Claude Code 复制的 MCP 服务器。' },
    { to: 'GitHub', text: '检查和带日期的发布在 GitHub Actions 上运行。' },
  ],
  design: {
    scale: [
      '每台机器一个人，33 个技能，以及任意数量读取 Agent Skills 格式的智能体。',
      '每次会话都会加载每个技能的描述，所以描述不超过 480 个字符，技能正文不超过 300 行。',
    ],
    data: [
      '没有数据库。一个技能就是带 SKILL.md 和 front matter 的文件夹，外加按需加载的参考文件。',
      '钩子分组放在 JSON 文件里，turn-voice 钩子把缓存的语音片段放在本地文件夹。',
    ],
    interfaces: [
      '与智能体的约定是 front matter：name 等于文件夹名，description 说明何时加载这个技能。',
      '安装器把钩子分组合并进 Claude Code 和 Codex 的设置，并为 Kimi Code 写入带标记的块。',
      'turn-voice 钩子读取一轮最后一行的状态标记，并朗读对应的句子。',
    ],
    reliability: [
      '克隆里的 git 钩子在 pull、merge、checkout 和 rebase 之后重新链接技能，所以新技能立刻出现。',
      '合并钩子时会保留使用者自己的钩子。没有 Node 时，安装会跳过钩子并说明。',
      '语音下载失败时只剩提示音，缓存里的片段无需网络也能播放。',
    ],
    security: [
      '仓库是公开的，不存任何令牌。来自 fork 的 PR 在 GitHub 的 runner 上运行，所以它们的代码碰不到这台 PC。',
      '网站类技能遇到登录、CAPTCHA、密钥和付款就停下，交给使用者。',
    ],
    performance: [
      '每一轮只加载简短的写作规则。当请求匹配某个技能的描述时，才加载完整技能。',
      '语音片段有缓存，提示音和语音合并成一次 PlaySound 调用，所以第一个词能完整播出。',
    ],
    operations: [
      'check 工作流在 Windows 上测 PowerShell 安装，在 Linux 上测 shell 安装，并由 mise 固定每个工具的版本。',
      'release 工作流在 main 上的 check 通过后，通过 workflow_run 启动，并打上日期标签，例如 v2026.10.30.1。',
      'mise run test 检查技能格式、文本预算、单元测试，以及在临时 home 里的安装和卸载。',
    ],
    tradeoffs: [
      '选每个技能一个 Markdown 文件夹，而不是每个智能体一份规则文件，所以一份副本可服务约 50 个智能体。规则只靠读它的智能体来执行。',
      '选一个克隆链接到每个智能体，而不是每个智能体一份副本，所以一次修改立刻到达所有智能体。没有开发者模式的 Windows 用 junction。',
      '选用 Windows 自带的 csc.exe 构建 C# 钩子，无需 SDK。它只在 Windows 上运行，Mac 由 Node 版本覆盖。',
    ],
  },
  features: {
    'Writing style':
      '一个简短的规则文件通过代理的主规则文件在每一轮加载。完整技能在第一段文字之前加载，带有词表和最后检查。',
    'Code review':
      'review 技能读取 PR 或 diff，并对照代码核实每个问题。结果是一张表，列出行号、会出错的输入和修复方法。',
    'Reviewer lenses':
      'reviewer 技能为 diff 或仓库选择审查角度，每个角度启动一个子代理。法律或 SEO 这类领域角度会加载自己的技能。',
    'Pull requests': 'create-pr 技能撰写描述，并用 GitHub CLI 创建或更新 PR。Mermaid 图展示每个流程改动前后的样子。',
    'Review comments':
      'address-comments 技能通过 GitHub CLI 读取每个未解决的讨论。每个修复单独成为一个提交，回复里写明它的 SHA。',
    'Ticket to merge':
      'implement-ticket 技能通过 Atlassian 的 MCP 服务器或其 CLI 读取 Jira。计划写进仓库的 specs，每个提交都带工单编号。',
    'App audit':
      'app-audit 技能启动审查角度，每个代理在自己的 git worktree 里工作。主代理把安全的修复收进一个分支并合并 PR。',
    'Specs first':
      'specs 技能在仓库里为每个功能保留一个 Markdown 文件。每次改动在第一个提交里加一条带日期的记录，先于代码。',
    'One-pager': 'one-pager 技能先写完整的文字。然后在顶部放一屏的摘要，不加入新的事实。',
    'Commands through mise':
      'mise 技能用 mise run 运行任务，用 mise x 运行其他命令。新工具以固定版本写进仓库的 mise 配置。',
    Translations:
      'translations 技能为技术栈选择 i18n 工具，并把每条文字加进每个语言目录。一项测试让各目录保持同样的键。',
    Worktrees:
      'git-worktrees 技能在仓库旁建一个文件夹，带上被忽略的文件和依赖。合并后由脚本确认 PR，再删除文件夹和分支。',
    'Fast JavaScript':
      'javascript 技能收录 Vercel 的 React 最佳实践规则，去掉了 React 专用部分。每条发现写明规则、行号和代价。',
    Architecture: 'architecture 技能把设计写进仓库文档，配有图表，每个选择附一条决定。之后由 lint 或 CI 执行分层规则。',
    Monorepos:
      'monorepo 技能选择任务运行器，每种语言一个 workspace。一份 API 架构为每个平台生成客户端，CI 只运行受影响的应用。',
    'History reset':
      'reset-history 技能先在仓库外保存一个 git bundle，再从默认分支生成一个提交。它只问一次，然后用 lease 方式强制推送。',
    'Rewrite a repo': 'rewrite-repo 技能记录现有行为，为代码和文档规划改名表。最后用一个全新的提交替代历史。',
    'Help on a site':
      'guide-on-site 技能通过 Claude in Chrome 操作你自己的 Chrome。它填好已知的字段，在只有本人能做的步骤停下。',
    'Hung runs':
      'hung-process 技能在 Windows 上找出占用端口或文件锁的开发工具。它结束该进程树并重跑这一步，或者给出管理员命令。',
    'Search setup':
      'seo-setup 技能找出 DNS 所在位置，并检查线上网站和仓库。然后在浏览器里设置 Search Console、Bing 和 Cloudflare Web Analytics。',
    Ads: 'ads-setup 技能在用户已登录时走完 AdSense 和 AdMob 的后台。它把 ID 写进代码，调试版本使用测试广告。',
    'Google Play release':
      'play-release 技能构建带新版本号的签名包，密钥放在仓库之外。它发布到内部测试，并返回测试者链接。',
    'Launch in one run':
      'launch 技能把共用的问题只问一次。然后依次运行搜索、广告和 Google Play 技能，最后给出一张服务表。',
    Marketing: 'marketing 技能从预算出发，写出主要信息和发布日历。计划留在仓库文档里，下次运行接着做。',
    'In-app updates':
      'app-update 技能在启动和返回应用时检查 GitHub 发布版本。随后显示下载进度条和通知，这些代码不进入 Play 版本。',
    'Names and domains':
      '一个脚本用 3 种域名后缀和澳大利亚商业登记册检查每个名称。它还查询 IP Australia 的商标，不需要 API 密钥。',
    'Legal risks': '一个脚本扫描仓库里依赖的许可证和数据 SDK。技能在一份文档里给每项风险评级，并用 PR 交付安全的修复。',
    'App icons':
      '代理画出 10 个扁平 SVG 图标，在聊天里显示选择器。然后一个用 resvg 的脚本把选中的图标导出成各平台需要的尺寸。',
    'Demo screenshots': '应用用虚构的演示数据运行，代理拍下截图和短视频。仓库里的镜头清单让下次运行拍出同样的画面。',
    'Store media':
      'store-media 技能从仓库取截图和图标，生成每种尺寸。它在用户已登录的浏览器里上传，并在提交审核前先询问。',
    'End to end walk of a release':
      'e2e-walk 技能把最新版本装到模拟器或手机上，走一遍文档里的每个流程。它跳过每个删除操作，并把流程清单留在仓库里。',
    'Hear and pick a voice':
      '一个 Python 脚本通过 edge-tts 获取每个 Microsoft 神经语音并缓存片段。它打印每个语音的 ID，可以从任意编号继续。',
    'Reddit comments':
      '技能通过 Reddit 的 MCP 服务器拉取热门帖子，留下仓库能回答的那些。Playwright 把草稿输入 Chrome，由用户点击 Comment。',
    'Voice at the end of a turn':
      '一个钩子读取最后一行的标记，选出提示音和句子。edge-tts 把它读出来，Windows 上用 C# 播放器，Mac 上用 Node。',
    Install:
      'POSIX shell 安装程序把一个克隆链接到找到的每个代理，Windows 上有 PowerShell 外壳。克隆里的 Git hooks 在每次 pull 后重新链接技能。',
    'Agent hooks':
      '一个 Node 脚本把钩子组合并进 Claude Code 和 Codex 的设置。它还把 Claude Code 的 MCP 服务器复制到 Codex 和 Kimi Code。',
    Releases: '推送到 main 且检查通过后，GitHub Actions 工作流开始运行。它给提交打上日期版本标签，并根据提交写出说明。',
  },
};

export default arch;

import type { Arch } from '../types';

const arch: Arch = {
  summary:
    '一款 Windows 上的 Tauri 2 应用，由 Rust 核心和 React 窗口组成。核心运行 Claude Code 来找帖子和写草稿，再打开 Chrome 去发布。',
  parts: [
    { name: 'Tauri 2', role: '桌面外壳，把窗口和 Rust 核心打包进一个安装程序。' },
    { name: 'Rust 核心', role: '运行 Claude Code 和 Chrome，保存 JSON 文件，并控制发布节奏。' },
    { name: 'React 和 Vite', role: '带 Comments 和 Posts 两个标签页及其卡片的窗口。' },
    { name: 'Claude Code', role: '读取仓库，通过 Reddit MCP 服务器获取帖子，写出草稿。' },
    { name: 'chromiumoxide', role: '用户按下 Post it for me 时，操控应用自己的 Chrome 窗口。' },
    { name: 'axum', role: '通过本地 HTTP 提供同一个窗口，让 Archon 能嵌入它。' },
    { name: 'i18next', role: '窗口的 9 种语言目录。' },
    { name: 'Tauri 更新插件', role: '查找已签名的新版本并安装。' },
  ],
  flow: [
    '用户选一个仓库，按下 Find。',
    '核心在该仓库里用 reddit-comments 技能启动 Claude Code。',
    'Claude 通过 Reddit 服务器读取热门帖子，把草稿写进文件。',
    '核心保留 6 份草稿，显示为卡片。',
    '用户打开一张卡片，Chrome 打开帖子并带上草稿。',
  ],
  links: [
    { to: 'agent-skills', text: '其中的 reddit-comments 技能挑选帖子，并定下每条评论的语气。' },
    { to: 'archon', text: 'Archon 的 Reddit 标签页嵌入这个窗口，应用没开时还会启动它。' },
    { to: 'Reddit', text: 'Claude 通过 MCP 服务器读取帖子，用户在 Chrome 里发布。' },
    { to: 'GitHub Releases', text: '安装程序和已签名的更新文件放在公开网站仓库的一个发布里。' },
  ],
  design: {
    scale: [
      '一台 Windows 电脑，一个人使用，并用上限保持小规模：6 条评论草稿、3 条帖子草稿，每小时发 3 条评论。',
      '一次 Find 需要 1 到 5 分钟，因为 Claude Code 自己阅读帖子。',
    ],
    data: [
      '应用数据文件夹里的普通 JSON 文件保存设置、队列、帖子卡片和两份历史。',
      'history.json 记录已发布和已跳过的帖子及日期，下一次 Find 会跳过它们。opens.json 记录最近一天每条已发评论的时间。',
    ],
    interfaces: [
      '核心用 stream-json 运行 claude -p，把每行输出变成给窗口的 find-log 事件。',
      'Claude 通过一个固定到某个提交的 MCP 服务器访问 Reddit，并用 --strict-mcp-config 传入。',
      '窗口通过 Tauri invoke 调用核心，被 Archon 嵌入时则通过 HTTP 和 server-sent events。',
      'Post it for me 用 chromiumoxide 通过 DevTools 协议驱动 Chrome。',
    ],
    reliability: [
      'Find 可以取消，运行结束后核心解析 found.json 并保留 6 张卡片。',
      '只有页面显示出该账号发的、内容与草稿一致的评论，Post it for me 才算它已发布。',
      '同一时间只运行一个应用。再次启动只会显示已打开的窗口，后台运行在框架关闭 2 分钟后退出。',
    ],
    security: [
      'Reddit 登录留在使用者的 Chrome 配置文件或应用自己的 Chrome 文件夹里。应用不保存密码。',
      '本地服务器只回应环回地址的 Host，POST 需要 JSON 内容类型，所以其他网站无法调用它。',
      '一次 Claude 运行可以用读取工具、Reddit 服务器，以及写入自己的输出文件。更新器在安装前会校验签名。',
    ],
    performance: [
      'Claude 和 Chrome 作为没有控制台窗口的子进程运行，窗口以流的方式收到各行，而不是等到结束。',
      '发布构建关闭 LTO 并使用 16 个 codegen unit，把编译从 18 分钟缩短到约 2 分钟。',
      'runner 在两次构建之间保留 cargo 的 target 文件夹，所以只需重新编译应用这个 crate。',
    ],
    operations: [
      '每次推送到 main，Checks 和 Release 一起启动，Checks 失败时 release gate 会取消构建。',
      'Publish 给提交打上日期标签并上传 NSIS 安装包。签名的 latest.json 驱动更新器。',
      'Tauri 更新器在启动时和每 24 小时检查一次，然后静默安装新版本。',
    ],
    tradeoffs: [
      '选带 skill 的 Claude Code，而不是在 Rust 里调用 Reddit API，让帖子规则只放在一处。代价是 Find 更慢。',
      '选 Tauri 2 而不是 Electron，后者每次安装都带一整个 Chromium。代价是要检查 2 种语言。',
      '选应用自己的带调试端口的 Chrome，而不是使用者的 Chrome，因为 Chrome 136 拒绝在默认配置文件上开调试端口。代价是多登录一次 Reddit。',
      '选旧版 Reddit 表单而不是新编辑器，后者把输入框藏在 shadow root 里。',
    ],
  },
  features: {
    'Repo picker': 'Rust 核心列出设置里根文件夹下的每个 git 文件夹。选择结果存进应用数据文件夹里的 JSON 文件。',
    Subreddits:
      '核心在不带 MCP 服务器、只有读取工具的情况下运行 Claude Code。Claude 根据仓库给出子版块，列表按仓库保存。',
    'Find threads':
      '核心在仓库里运行 Claude Code，带上 reddit-comments 技能和 Reddit MCP 服务器。Claude 把帖子和草稿写进文件，核心保留 6 份。',
    'Steps on top': 'React 窗口根据搜索和卡片的状态，点亮正在等待的那一步。',
    Cards: '卡片来自核心写的队列文件。文本框失去焦点时，修改会存回这个文件。',
    'Open in Chrome': '核心把草稿放进剪贴板，并在用户选的配置文件里打开 Chrome。上限把节奏控制在每小时 3 条已发评论。',
    'Post it for me':
      '核心启动自己的 Chrome 并打开调试端口，通过 chromiumoxide 操控它。它填好旧版 Reddit 的表单，按下 Save，再确认评论已出现。',
    'Posts tab':
      'Claude Code 读取勾选的仓库和 marketing 技能，再把帖子草稿写进文件。核心保留 3 份，去掉找不到文件的媒体。',
    'Screenshots and videos':
      'Claude 按说明文字从仓库的截图文件夹里最多挑 4 个文件。点一下文件就会在资源管理器里显示它。',
    'Open a post':
      '核心在 Chrome 里打开旧版 Reddit 的发帖页，标题和正文都放在网址里。带媒体的帖子会在资源管理器里显示第一个文件。',
    'Ban risk': 'Rust 模块根据发帖和评论的历史文件给下一篇帖子打分。规则来自 marketing 技能，比如每天只发一个社区。',
    'Tester post': '核心用 Google Group 链接和面板里的应用行填写模板。不需要运行 Claude。',
    'Inside Archon':
      '核心用 axum 通过本地 HTTP 提供同一个窗口和命令。Archon 把它嵌入进来，标签页关闭 2 分钟后应用退出。',
    'Info button': '窗口里的对话框列出 Find 需要的条件和封号风险规则。它还显示版本号和检查更新。',
    Updates: 'Tauri 更新插件在启动时和每 24 小时从 GitHub 发布读取已签名的更新文件。运行安装程序前它会校验签名。',
    Language: 'i18next 在窗口里保存 9 个目录。选择存在设置文件里，所以 Tauri 窗口和 Archon 框架共用它。',
    'Done list': '已发和跳过的帖子连同日期移进历史文件。下一次 Find 会把它们交给 Claude 跳过。',
    Activity: 'Rust 端把 Claude Code 的每个步骤和每行输出作为事件发到窗口。面板在内存里保留最近 500 行。',
  },
};

export default arch;

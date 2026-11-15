import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'PC 上的 Node 服务器把网页提供给 Edge 应用窗口。服务器读取仓库和运行记录，并为每个任务打开一个带编程代理的控制台。',
  parts: [
    { name: 'Node 24', role: '直接以 TypeScript 运行服务器，不装包，也不用构建。' },
    { name: '网页', role: '每个标签页一个模块，显示在 PC 上的 Edge 应用窗口里。' },
    { name: '编程代理', role: 'Claude Code、Codex 或 Kimi Code，每个任务一个控制台。' },
    { name: 'adb', role: '在连接的手机或电视上安装并打开应用。' },
    { name: 'JSON 数据文件', role: 'Archon 列出的仓库、应用和代理任务。' },
    { name: 'Tailscale', role: '在 tailnet 内发布 Archon，让手机能打开它。' },
    { name: 'PowerShell 脚本', role: '恢复一台 PC，或把工作区搬到新文件夹。' },
    { name: '嵌入的页面', role: '在标签页里显示 CI 状态页、Reddit Desk 和 Memories 索引器。' },
  ],
  flow: [
    '用户勾选仓库并选一个任务，或者说出一条命令。',
    '页面把选择发给本地服务器。',
    '服务器写一个批处理文件，打开带代理的控制台。',
    '代理在仓库里工作，最后写下结束标记。',
    '页面每 5 秒查询一次运行记录并显示进度。',
  ],
  links: [
    { to: 'local-ci', text: 'CI 标签页嵌入它的状态页，页面没开时会启动它。' },
    { to: 'reddit-desk', text: 'Reddit 标签页通过本地 HTTP 嵌入应用窗口。' },
    { to: 'memories', text: 'Memories 标签页显示它的照片索引进度。' },
    { to: 'songfactory', text: 'Songs 标签页运行它的流水线方块，并显示每次运行。' },
    { to: 'agent-skills-private', text: '它的规则和技能决定 Archon 启动的每个代理如何交付改动。' },
  ],
  design: {
    scale: [
      '一位开发者的电脑、几十个仓库，同时有 5 到 10 个代理在工作。',
      '运行登记册保留最近 200 次运行，其余是小型 JSON 列表，所以不需要数据库。',
    ],
    data: [
      'JSON 列表写明 Archon 展示的仓库、应用和代理任务。',
      '本地应用数据文件夹里的 runs.json 记录每次运行的开始、结束和结果。',
      '每个仓库的 TODO.md 和代理会话文件就地读取，Archon 不保存副本。',
    ],
    interfaces: [
      'server.ts 把每个路径对应到一个函数：读取接口用 JSON 回答 GET，操作接口用一行文本回答 POST。',
      '控制台运行以 done 或 failed 标记结束，登记册读取这个标记。',
      '其他工具在 adb、git、GitHub 发布 API 以及 npm、crates.io 和 PyPI 之后。部分标签页通过 HTTP 嵌入本地页面。',
    ],
    reliability: [
      '服务器一直运行到注销，所以所有窗口关闭后运行和更新仍会继续。',
      '再次启动时发现端口被占用，就在同一个服务器上多开一个窗口。',
      '页面用自带的语言目录启动，所以标签按钮离线也能用，加载失败的标签页会在下次点击时重试。',
    ],
    security: [
      '服务器只监听环回地址，手机通过 tailnet 内的 Tailscale 访问它。',
      '操作需要 JSON 内容类型，所以其他网站的页面无法在没有预检的情况下发 POST，而服务器不回应预检。',
      'Ask Archon 碰不到删除分支和密钥轮换。Keys 标签页显示每个机密的存在时长，不显示它的值。',
    ],
    performance: [
      '页面每 5 秒从小文件轮询运行状态，所以不需要推送通道。',
      '一次运行的剩余时间取同类已完成运行的中位数。',
      '仓库同步和包扫描一次处理 8 个仓库。',
    ],
    operations: [
      '更新器每 2 分钟拉取 main 并安装更新的桌面构建。新的 Archon 代码会重启服务器并重新加载页面。',
      '启动文件夹里的一个隐藏快捷方式在登录时启动服务器，不显示窗口。',
      'mise run test 检查英文和俄文目录的键相同，然后运行 Node 测试运行器。',
    ],
    tradeoffs: [
      '选本地网页而不是 Tauri，因为它只靠 Node 运行，也能在手机上打开。代价是应用窗口和语音需要 Edge。',
      '没有包也没有构建步骤，所以 git pull 就是全部部署。路由是手写的。',
      '每次代理运行用一个看得见的控制台，而不是无界面运行，这样人可以观看并回答问题。',
    ],
  },
  features: {
    'Ask Archon': 'Edge 把语音转成文字。然后用 Haiku 的 Claude Code 选出一个启动器操作，服务器执行它并打开对应标签页。',
    'Runs strip': '服务器维护一份运行登记，读取每次运行的结束标记。剩余时间取同类过往运行的中位数。',
    Apps: '卡片来自一份 JSON 列表和工作室发布仓库里的最新版本。adb 在手机或电视上安装并打开它们。',
    'Ads on this phone':
      '脚本通过 adb 给工作室的每个应用发送解锁链接。密钥匹配时，应用在自己的存储里标记这台手机并设置广告开关。',
    'To do': '服务器读取每个 TODO.md 文件里未完成的条目。勾选的条目交给对应仓库里的代理控制台。',
    Sessions:
      '服务器读取 Claude 应用的会话文件，以及 Codex 和 Kimi Code 的会话。继续会话时，会用该会话自己的代理打开控制台。',
    Agents: '仓库及其用途来自一份 JSON 列表，任务来自另一份。每个勾选的仓库都会得到一个处理该任务的代理控制台。',
    Docs: '服务器提供每个仓库的 Markdown。页面用 marked 渲染文字，用 mermaid 画图。',
    Rules: '服务器读取共享规则文件和每个仓库的 AGENTS.md。它检查每个仓库是否有约定要求的文件和任务。',
    Branches: 'git 列出每个仓库的分支、worktree 和 stash 及其 PR。删除直接在 git 里执行，合并交给代理。',
    Packages: '服务器扫描每个仓库的包文件，向 npm、crates.io 或 PyPI 查询最新稳定版。更新交给每个仓库的代理控制台。',
    'CI, Reddit and Memories': '每个标签页嵌入另一个本地程序提供的页面。页面没开时，Start 会启动那个程序。',
    Songs: '服务器读取 songfactory 的主题，把每个方块作为子进程运行。步骤和日志从子进程的输出里读取。',
    Voices: '标签页列出 edge-tts 的声音并可试听。Use for the agents 会用所选声音重跑 turn-voice 钩子的安装脚本。',
    Keys: 'rotate-secrets 脚本列出每个 CI 密钥及其使用时长。更新时会打开控制台，由 Claude Code 运行 rotate-secrets 技能。',
    'Archon on the phone': 'Tailscale serve 在 tailnet 内发布本地服务器。手机把页面添加到主屏幕，当作应用使用。',
    'Restore a PC': 'PowerShell 脚本恢复 JSON 列表里的每一项。PC 上有而列表里缺的项会让检查任务失败。',
    'Move the workspace':
      'PowerShell 脚本从临时副本运行并移动文件夹。然后它修正每个写着旧路径的地方，从 worktree 链接到计划任务。',
    'Sync the repos': 'Node 脚本克隆 JSON 列表里文件夹中缺少的仓库。其余仓库用 git 拉取，每次 8 个。',
  },
};

export default arch;

import type { Arch } from '../types';

const arch: Arch = {
  summary: '一个用本地 git 生成每条链接的 VS Code 扩展。它不向托管平台发请求，直接在浏览器里打开链接或复制它。',
  parts: [
    { name: 'VS Code API', role: '注册 8 个命令和菜单，读取设置和选区。' },
    { name: 'git', role: '提供仓库根目录、远程 URL 和分支，每次调用限时 10 秒。' },
    { name: '链接生成器', role: '纯 TypeScript，把远程地址变成各平台的文件、blame 和历史链接。' },
    { name: 'vscode.env', role: '在浏览器里打开链接或放进剪贴板，本地和远程窗口都适用。' },
    { name: 'vscode.l10n', role: '把命令、设置和消息翻译成 9 种语言。' },
    { name: 'esbuild', role: '把代码打包成一个文件，让扩展加载更快。' },
    { name: 'GitHub Actions', role: '与检查并行构建 .vsix，检查通过后发布。' },
  ],
  flow: [
    '用户从命令面板、编辑器或资源管理器运行命令。',
    '扩展用 git 找到文件所在仓库的根目录。',
    'git 返回远程 URL 和一个包含该文件的分支。',
    '链接生成器为该平台写出带选中行的 URL。',
    'VS Code 在浏览器里打开它，或复制并显示提示。',
  ],
  links: [
    { to: 'GitHub', text: '托管这个分支项目和带 .vsix 的版本。默认生成 GitHub 链接。' },
    { to: 'GitLab and Bitbucket', text: 'GitHub 之外的链接目标，由远程 URL 生成，不调用 API。' },
    { to: 'Visual Studio Marketplace', text: '上架这个扩展。每次发布到那里都是手动完成。' },
  ],
  design: {
    scale: [
      '每个 VS Code 窗口一个人，每次点击一个链接，所以工作量就是在一个仓库上调用几次 git。',
      '它能在本地、SSH 和容器窗口里运行，git 调用 10 秒后会停止，所以慢速的远程不会卡住编辑器。',
    ],
    data: [
      '扩展不保存状态。每条命令读取设置、选区和 git，生成链接，然后忘掉这些内容。',
      'openInGitHub 设置和远程 URL 决定主机、分支和映射后的地址。',
    ],
    interfaces: [
      '命令来自命令面板、编辑器菜单和资源管理器菜单，共 8 个，每个都调用同一个链接执行器。',
      'git 通过 execFile 提供仓库根目录、远程 URL 和分支，链接构造器为每个主机写出文件、blame 和历史的 URL。',
      'vscode.env.openExternal 打开浏览器，vscode.env.clipboard 负责复制，所以两者在远程窗口里都能用。',
    ],
    reliability: [
      '分支检查依次尝试设置、远程 HEAD、main 和 master，然后退回当前分支，或分离 HEAD 时的提交。',
      'git 失败时会显示 git 自己的消息，而且 git 不会在终端里要求输入密码。',
    ],
    security: [
      '扩展不向各主机发请求，所以访问 GitHub、GitLab 或 Bitbucket 都不需要令牌或登录。',
      'git 通过 execFile 运行，不经过 shell，所以 defaultRemote 设置不能执行命令。',
    ],
    performance: [
      'esbuild 把源码打包成一个文件，让包更小、加载更快。',
      '每次 git 调用都是通过 execFile 的短进程，限时 10 秒，所以一次点击只花几个小进程。',
    ],
    operations: [
      '每次推送 Checks 都会运行 lint、类型检查、单元测试和构建，发布工作流在旁边构建 .vsix。',
      'Checks 通过后，门控脚本发布该构建，Checks 失败则取消它。发布到 Marketplace 仍是手动的。',
      'git 和 links 里的普通 TypeScript 通过 mise run test 在 Node 里运行，只有编辑器胶水代码需要 VS Code 测试窗口。',
    ],
    tradeoffs: [
      '选用本地 git 生成链接，而不是各主机的 REST API，所以没有令牌，每次点击也没有网络调用。链接无法确认文件在主机上是否存在。',
      '选 vscode.env.openExternal，而不是 open 包，后者会弄坏 users.$id.tsx 这样的名字，并且在 SSH 窗口里打不开浏览器。',
      '选 fork 现成的扩展而不是重写，这保留了主机链接代码和它的测试。新的 id 意味着用户要重新安装。',
    ],
  },
  features: {
    'Open a file, blame or history link':
      '命令从编辑器读取文件和选中的行，从 git 读取远程地址。平台模块写出链接，VS Code 在浏览器里打开它。',
    'Copy a link': '同一条链接进入 VS Code 的剪贴板，所以远程窗口也会填到本地剪贴板。提示里显示 URL。',
    'Links from the Explorer': '资源管理器菜单把文件或文件夹交给同一个命令。链接不带行号锚点。',
    'Main or master first':
      'git 依次检查设置、远程 HEAD、main 和 master，找到包含该文件的分支。都不匹配时链接使用当前分支。',
    'Hosts and mapped URLs': '平台来自设置或远程 URL。映射设置会在生成链接前替换远程 URL。',
    Languages: 'vscode.l10n 按 VS Code 的显示语言选择目录。命令名和设置来自 9 个扩展包目录。',
  },
};

export default arch;

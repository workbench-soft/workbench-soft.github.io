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

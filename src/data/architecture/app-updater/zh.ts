import type { Arch } from '../types';

const arch: Arch = {
  summary:
    '一个 Kotlin 写的 Android 应用读取工作室在 GitHub 上的公开发布，并通过 Shizuku 安装每个 APK。它没有自己的服务器。',
  parts: [
    { name: 'Kotlin 和 Android Views', role: '一个由普通 View 组成的屏幕，每个应用一张卡片，下拉即可刷新。' },
    { name: 'GitHub Releases API', role: '每个应用最新 APK 的来源，附带说明和提交。' },
    { name: 'Shizuku', role: '以 shell 用户身份执行每次安装，因此 Android 不弹出询问。' },
    { name: 'Android 包管理器', role: '提供每个已装应用的名称、包名和版本。' },
    { name: '更新队列', role: '把队列放在屏幕之外，并分块下载每个 APK。' },
    { name: 'Shared preferences', role: '保存最近的发布列表和一次运行中学到的包名。' },
    { name: '工作室目录', role: '来自工作室网站的 JSON 文件，列出每个项目的名称和平台。' },
  ],
  flow: [
    '用户打开应用、回到应用或下拉列表。',
    '应用从 GitHub 读取每页发布，或使用不到 10 分钟的列表。',
    '它按名称或包名把每个 APK 对应到已装应用。',
    '工作室目录为卡片命名，并加上没有 APK 的项目。',
    '点一下就下载 APK，Shizuku 无询问地安装它。',
    '更新器最后安装自己，手机随后重新打开它。',
  ],
  links: [
    { to: 'GitHub', text: '共享的公开发布仓库存放每个应用的 APK，所以手机不需要令牌。' },
    { to: 'Shizuku', text: 'Shizuku 应用为负责安装和卸载的 shell 用户授权。' },
    { to: 'Workbench Soft site', text: '网站根据自己的项目列表生成应用目录。' },
    { to: 'archon', text: 'Archon 不发布 APK，所以它的卡片带一个打开链接。' },
  ],
  features: {
    'Update all':
      '更新队列把每个落后的应用排队，按 64 KB 分块下载。Shizuku 以 shell 用户身份逐个安装，取消会在下一块之前停止。',
    'Self update':
      '更新器以自己的标签发布在同一个发布列表里，并在最后安装自己。一条经 Shizuku 运行的 shell 命令完成安装，并在旧进程结束后重新打开应用。',
    'Update one app': '卡片上的更新按钮为单个 APK 执行同样的下载和 Shizuku 安装。安装失败后按钮保留，方便重试。',
    'Install a missing app': '在已装应用中找不到对应的 APK 会得到安装按钮。Shizuku 用和更新相同的方式安装它。',
    'App list': '每个已发布的 APK 有一张卡片，按名称或包名对应已装应用。工作室目录为没有 APK 的项目加上带链接的卡片。',
    'Saved list offline':
      'Shared preferences 保存最近的发布列表及其说明和名称。GitHub 检查失败时显示这份列表，10 分钟内再次打开不会调用 API。',
    'Shizuku setup':
      '设置模块找出 Shizuku 剩下的步骤，并为它打开 Google Play 或 Shizuku 应用。授权完成后，用户点过的更新开始运行。',
    'Release notes': '应用整理每个 GitHub 发布的说明。说明为空时，它在后台读取发布对比链接中的提交。',
  },
};

export default arch;

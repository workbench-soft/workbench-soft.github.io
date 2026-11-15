import type { Arch } from '../types';

const arch: Arch = {
  summary:
    '一个私有 GitHub 仓库，存放组织内各仓库从自己的 workflow 调用的共享步骤。一个组合 action 安装工具，可复用 workflow 负责合并 Dependabot 的 PR 和构建 iPhone 模拟器版本。',
  parts: [
    { name: '组合 action', role: '在调用方的 job 里运行的安装步骤，装好固定版本的工具和包。' },
    { name: 'mise', role: '按仓库固定的版本安装每个工具。' },
    { name: 'pnpm', role: '按 lockfile 安装包，在 Windows 上用复制代替硬链接。' },
    { name: '可复用 workflow', role: '每个应用仓库调用的 Dependabot 合并和 iOS 模拟器构建。' },
    { name: 'Node 脚本', role: '列出应用里只支持 Android、还没有 iOS 方案的部分。' },
    { name: 'macOS runner 和 Maestro', role: '为 iPhone 模拟器构建应用并跑它的测试流程。' },
    { name: '发布脚本', role: '选出日期标签并根据提交写出说明的 shell 脚本。' },
  ],
  flow: [
    '应用仓库的 workflow 在 main 分支上调用这里的一个步骤。',
    'GitHub 为这次运行从本仓库载入该步骤。',
    '安装步骤先装固定版本的工具，再装包。',
    '调用方自己的检查接着在同一个 job 里运行。',
    '这里合并的修复会在各仓库下次运行时生效。',
  ],
  links: [
    { to: 'GitHub Actions', text: '组织内每个仓库都从自己的 workflow 调用这里的步骤。' },
    { to: 'local-ci', text: '在 PC runner 上，安装步骤从共享存储复制包，避免文件被锁。' },
    { to: 'agent-skills-private', text: '发布脚本与其 repo-ci 技能里的 CI 模板一致。' },
    { to: 'Dependabot', text: '它的 PR 通过共享 workflow 合并，大版本更新留给人来处理。' },
  ],
  features: {
    'Setup step':
      '组合 action 先用 mise 装好固定版本的工具，再由 pnpm 按 lockfile 安装。它在调用方的 job 里运行，所以调用方的检查可以紧随其后。',
    'Dependabot details': 'Dependabot 的元数据 action 读取每个 PR 的更新类型。合并 job 据此把大版本更新留给人。',
    'Dependabot auto merge':
      '可复用 workflow 在 Dependabot 的 PR 打开时立即 squash 合并，然后在 main 上启动检查。只有 Dependabot 自己打开并推送的 PR 才会这样合并。',
    Releases:
      '推送到 main 且 Lint 通过后，发布 workflow 启动。两个 shell 脚本选出日期标签，并根据上个标签以来的提交写出说明。',
    'iOS check and simulator build':
      'Node 脚本在包、原生模块和 Gradle 文件里查找只支持 Android 的部分。随后可复用 workflow 在 GitHub 的 macOS runner 上构建，由 Maestro 截图。',
  },
};

export default arch;

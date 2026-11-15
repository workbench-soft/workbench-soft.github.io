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
  design: {
    scale: [
      '一位所有者和一个 GitHub 组织里的几十个应用仓库，每个仓库都在自己的工作流里调用同样的几个步骤。',
      '这里的一次修复会在每个调用方下次运行时生效，所以一次错误的合并可能让所有调用方一起出问题。',
    ],
    data: [
      '没有数据库。状态就是日期标签、提交标题的格式，以及固定每个工具版本的 mise.toml。',
      '标签是 v<yyyy.mm.dd>.<n>，发布说明按 type(scope)!: text 形式的标题，把 feat、fix 和 perf 提交分组。',
    ],
    interfaces: [
      '设置步骤是一个组合动作，调用方用 uses 运行它，它在调用方的作业内执行。',
      'Dependabot 合并和 iOS 模拟器构建是可复用工作流，接收要在 main 上启动的工作流列表。',
      '自动合并由 pull_request_target 触发，iOS 检查是一个返回通过或失败的 Node 脚本。',
    ],
    reliability: [
      '合并作业只在 dependabot[bot] 打开该 PR 并触发事件时运行，遇到已合并或已关闭的 PR 就停止。',
      '在 PC 的 runner 上，pnpm 从共享仓库复制包，因为删除一个硬链接曾让其他读取以 EBUSY 失败。',
      '每个作业有自己的 mise shim 文件夹，所以正在运行并占着共享 uvx.exe 的进程不会阻塞工具更新。',
    ],
    security: [
      '仓库是私有的，它的 Actions 访问权限设为整个组织，调用方才能加载这些工作流。',
      'pull_request_target 从 main 运行并带有写权限令牌，所以只有 Dependabot 自己的 PR 会合并，大版本更新要等人来处理。',
    ],
    performance: [
      '工具安装在同一个 runner 的作业之间共享，每个作业只重建那个小的 shim 文件夹。',
      'pnpm 按锁文件安装，没有解析步骤，iOS 检查先跑，所以糟糕的计划会在 Mac 的分钟开始计费前就失败。',
    ],
    operations: [
      '每次推送到 main 都会运行 Lint。发布工作流在 Lint 通过后由 workflow_run 启动，并给提交打上日期标签。',
      '只含 Markdown 的推送会跳过 Lint，所以没有发布。',
      'mise run test 会建一个一次性的 git 仓库来检查两个发布脚本，Vitest 覆盖 ios-check。',
    ],
    tradeoffs: [
      '调用方用 @main 而不是固定标签，所以一次修复处处生效。需要暂缓的仓库可以固定一个发布标签。',
      '设置步骤选组合动作而不是可复用工作流，这样调用方自己的检查能在同一个作业里接着运行。',
      '选打开即合并、在 main 上检查，而不是等待 PR 检查，因为组织的仓库不在 PR 上跑检查。错误的更新会先到达 main。',
      'iPhone 构建用 macOS runner，因为 PC 的 runner 是 Windows。一分钟 macOS 按 10 分钟计，所以调用方手动或在发布时启动。',
    ],
  },
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

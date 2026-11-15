import type { Arch } from '../types';

const arch: Arch = {
  summary:
    '每个别名都是同一个 git 仓库里的一个 bash 脚本。git 配置里的 include 指向这个克隆，所以一次 pull 就能更新机器上的每个别名。',
  parts: [
    { name: 'bash 脚本', role: '每个别名一个脚本，由 macOS、Linux 和 Windows 上 git 自带的 bash 运行。' },
    { name: 'git 配置 include', role: '把每个别名映射到它的脚本，并让 git 指向这个克隆。' },
    { name: 'fzf', role: '选择分支和 worktree 的模糊搜索菜单。' },
    { name: 'zsh 和 PowerShell 函数', role: '把切换分支时输出的文件夹行变成真正的切换文件夹。' },
    { name: '安装脚本', role: '一个用于 macOS 和 Linux，一个用于 Windows，负责设置 git 配置、shell 和钩子。' },
    { name: 'shellcheck 和 shfmt', role: '在提交钩子和 CI 中检查每个脚本。' },
    { name: 'GitHub Actions', role: '在 Linux 和 Windows 上运行 lint 和测试，然后给每个通过的 main 推送打标签。' },
  ],
  flow: [
    '用户输入一个短命令，比如 git co。',
    'git 在引入的配置里找到别名并运行它的脚本。',
    '脚本调用 git，需要选择时再调用 fzf。',
    'shell 函数把文件夹行变成一次切换文件夹。',
    '结果打印在终端里，仓库通过 git 发生变化。',
  ],
  links: [{ to: 'GitHub', text: '托管仓库，运行检查，并发布带日期的版本。' }],
  design: {
    scale: [
      '一个开发者、几台机器，没有服务器。每个别名就是 bin/ 里的一个 bash 脚本。',
      '每个别名只是几次 git 调用，所以上限由 git 和仓库决定，而不是脚本。',
    ],
    data: [
      '别名自己不保存状态，只通过 git 读取和修改仓库。',
      '安装器把 gitaliases.dir 和 include.path 写进用户的 git 配置，并把一个函数写进 zsh 或 PowerShell 配置。',
      'aliases.gitconfig 把每个别名对应到克隆里的脚本。',
    ],
    interfaces: [
      'git 把别名当作子进程运行，所以脚本能接收参数并打印到终端。',
      'git sb 在 stdout 打印带路径的 __cd__ 行，zsh 或 PowerShell 函数把它变成 cd。',
      'fzf 画出选择器，脚本载入辅助文件 _shared.sh 和 _prune.sh。',
    ],
    reliability: [
      '每个脚本都带 set -euo pipefail 运行，git 调用失败就会停下别名。',
      '删除分支和工作树时，会跳过主工作树、当前文件夹和已锁定的工作树。',
      '在选择器里按 Esc，别名结束且什么都不删。',
    ],
    security: [
      '唯一的外部服务是 git 远程。脚本不存令牌，也不调用任何 API。',
      '安装器在每次改动前询问，并先复制它要改的每个文件。',
      '删除类别名先列出候选，只删除人选中的。',
    ],
    performance: [
      '每个别名是一个 bash 进程加几次 git 调用，一次 pull 就更新全部。',
      '清理列表来自一次 for-each-ref 调用和工作树列表，one_line 用 printf -v，因为每个工作树做一次命令替换要付出一次 fork。',
    ],
    operations: [
      'lint.sh 运行 shellcheck 和 shfmt，并检查每个别名都有脚本、说明和 README 行。test.sh 在临时仓库里运行别名。',
      'pre-commit 和 pre-push 钩子运行 mise run lint，lint.yml 在 Linux 和 Windows runner 上运行它。',
      'main 上每次通过的推送都会得到带日期的发布，如 v2026.10.30.1。',
    ],
    tradeoffs: [
      '选每个别名一个 bash 脚本，不选内联的 ! 别名或 shell 函数，这样 shellcheck 和测试能覆盖，代价是每个别名一个文件。',
      '选 bash，不选 TypeScript 或 Rust，因为 git 在每个系统都带 bash，任何机器都不需要 Node。',
      '选指向克隆的 include，不选复制别名，这样 git pull 就能更新它们，移动克隆则会让它们失效。',
      '选两个安装器，不选一个，因为只有 PowerShell 需要改配置文件，代价是要让两份保持同步。',
    ],
  },
  features: {
    Aliases: '一个配置文件把每个别名映射到克隆里的 bash 脚本。git a 读取每个脚本开头的注释并打印列表。',
    'Switch branch folders':
      'git sb 在 fzf 中列出本地分支，包括 worktree。脚本打印路径，zsh 或 PowerShell 函数把 shell 和 VS Code 窗口移到那里。',
    'Delete branches and worktrees':
      'git db 在 fzf 中挑选，git dbm 找出远程分支已删除的分支。一个共用的辅助脚本删除每个 worktree 及其分支，强制删除有改动的 worktree 前会先询问。',
    Installer:
      'macOS 和 Linux 用 shell 安装脚本，Windows 用 PowerShell 安装脚本，它们把 include 写入 git 配置。每个要改的文件都会先留一份带日期的副本。',
    'Lint hook':
      '安装脚本把 git 钩子指向仓库里的一个文件夹。每次提交都会运行 shellcheck、shfmt 和仓库规则，再对暂存的文件运行 oxfmt 和 markdownlint。',
    'Reset to the default branch':
      '脚本从远程的 HEAD 读出默认分支，然后 fetch 并硬重置到它。如果本地改动或未推送的提交会丢失，它会先询问。',
    Releases:
      'lint 在 main 上通过后，一个 GitHub Actions 工作流开始运行。它选出下一个日期版本，并用上个标签以来的提交写发布说明。',
  },
};

export default arch;

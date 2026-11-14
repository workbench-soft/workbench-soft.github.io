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

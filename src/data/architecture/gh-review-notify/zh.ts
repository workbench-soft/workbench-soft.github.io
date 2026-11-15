import type { Arch } from '../types';

const arch: Arch = {
  summary:
    '一个 bash 脚本在 Mac 上运行，由 launchd 代理每 3 分钟启动一次。它通过 gh CLI 读取 GitHub，并在通知中心显示每个新事件。',
  parts: [
    { name: 'launchd 代理', role: '每 180 秒启动一次脚本，Mac 唤醒后补上错过的运行。' },
    { name: 'bash 脚本', role: '搜索 PR，读取评审和评论，过滤后发送通知。' },
    { name: 'GitHub CLI', role: '用 gh 已保存的登录发起每个 GitHub 请求，所以工具不保存令牌。' },
    { name: 'jq', role: '解析 GitHub 返回的 JSON。' },
    { name: 'terminal-notifier', role: '显示通知，点击后打开评论，缺少时改用 osascript。' },
    { name: '缓存文件', role: '用户缓存文件夹里的简单文件，记录已显示的事件和每个 PR 的最后更新时间。' },
  ],
  flow: [
    'launchd 启动脚本，一把锁阻止第二次运行。',
    'gh 搜索你最近 3 天有更新的打开的 PR。',
    '脚本只读取有变化的 PR 的评审和评论。',
    '已在已显示列表里的事件会被去掉。',
    'terminal-notifier 显示其余事件，点击即打开评论。',
  ],
  links: [
    { to: 'GitHub', text: '每个 PR、评审和评论的来源，通过 gh CLI 读取。' },
    { to: 'Homebrew', text: '安装时装上 jq 和 terminal-notifier。' },
  ],
  features: {
    'Review and comment notifications':
      'gh 搜索你创建、评审或参与的打开的 PR，再读取每个有变化的 PR 的评审和评论。每个新事件都会变成一条通知。',
    'Review requests':
      '向 GitHub 查询后，只保留点名给你的请求，丢掉发给团队的请求。查询失败不会写入缓存，下次运行会再查。',
    'Comment bursts': '发通知前，脚本按 PR 统计新评论。超过 4 条会合成 1 条通知，带上数量和名字，点击即打开 PR。',
    'Quiet first run':
      '没有缓存时，脚本把最近 3 天的事件写入已显示列表，不弹出任何通知。首次运行失败时缓存保持为空，下次运行重新记录。',
    'Bot filter': '脚本在比较事件前丢掉机器人账号的评论。安装时给出的一个设置会写进 launchd 代理，重新打开它们。',
    'Status and test': '一个参数打印代理状态、账号、上次运行和设置。另一个参数通过同一通知方式发送测试通知。',
    Releases:
      '每次推送到 main 并通过 shellcheck 后，一个 GitHub Actions 工作流打上日期版本标签。说明列出上个版本以来的提交。',
  },
};

export default arch;

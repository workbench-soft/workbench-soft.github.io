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
  design: {
    scale: [
      '一个人、一台 Mac。搜索范围是最近 3 天内更新过的开放 PR。',
      '第一次之后的每次运行不到 10 秒，因为只有 updatedAt 变过的 PR 才会重新打开。',
      '工具就是一个不到 400 行的 bash 文件。',
    ],
    data: [
      '用户缓存文件夹里的平面文件：seen.txt、pr-updated.tsv、review-requests.tsv 和一个锁文件夹。',
      'seen.txt 保存最近 3000 个事件键。键就是评审或评论的 URL。',
      '文件夹只有本账户可读，因为里面列着私有 PR 的 URL。',
    ],
    interfaces: [
      'gh search prs 和 gh api 读取 GitHub，jq 解析 JSON 应答。',
      'terminal-notifier 显示每条提醒，点击后打开对应评论，osascript 作后备。',
      'launchd 每 180 秒启动一次代理。GH_REVIEW_NOTIFY_INTERVAL 和 GH_REVIEW_NOTIFY_BOTS 可改间隔和机器人过滤。',
    ],
    reliability: [
      '锁文件夹让第二次运行立刻退出。',
      'PR 搜索失败会在改动任何缓存文件前停下，评审请求查询失败则不进缓存，所以下一次运行会再问一次。',
      '事件最多晚 3 分钟出现，而且只在 Mac 醒着时。唤醒后 launchd 会补上。',
    ],
    security: [
      '它使用 gh auth 的登录，所以工具不保存令牌。',
      '缓存文件只有本账户可读。',
      '它从 Mac 上轮询 github.com，所以没有 webhook，也没有公开地址能到达这台机器。',
    ],
    performance: [
      '只对 updatedAt 变过的 PR 读取评审和评论，初次填充时则读取每个 PR。',
      '团队的评审请求被丢弃，同一个 PR 上超过 4 条评论会折叠成 1 条提醒。',
      'grep 和 awk 把每个事件键与 seen.txt 对照，不用数据库。',
    ],
    operations: [
      'install.sh 把脚本复制到本地 bin 文件夹，写入 plist 并加载代理。uninstall.sh 反向操作。',
      'tests/run.sh 用现成的 GitHub 应答运行脚本，并为 gh、date 和 terminal-notifier 做了桩。',
      '检查在 GitHub 的 macOS runner 上运行，每次通过的推送都有带日期的发布。安装取最新的 main。',
    ],
    tradeoffs: [
      '选每 3 分钟轮询，不选邮件、Slack 应用或 webhook，这样没有服务器和公开地址，代价是最多 3 分钟延迟。',
      '选 gh 命令行，不选带令牌的 curl，所以没有令牌要保存。gh 掉线时工具就停。',
      '选一个 bash 文件，不选 TypeScript 或 Rust，复制即用无需构建，测试则需要桩。',
      '选平面文件，不选 SQLite，让 bash 只需 grep 和 awk。新格式要换新文件名。',
    ],
  },
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

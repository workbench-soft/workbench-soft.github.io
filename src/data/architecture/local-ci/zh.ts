import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'PowerShell 和 POSIX sh 写的安装脚本配置好 Windows PC 或 Mac，并把它注册为 GitHub Actions runner。PC 上的一个 Next.js 页面显示 runner 和运行记录，它的服务器负责分配和取消 job。',
  parts: [
    { name: 'PowerShell 和 sh 安装脚本', role: '用 winget 或 Homebrew 加上 mise 装好开发工具。' },
    { name: 'GitHub Actions runner', role: '接下组织的 CI job，每台 PC 有多个，另有一条重型构建通道。' },
    { name: 'Windows 任务计划程序', role: '开机时启动 runner 和页面，每 5 分钟运行一次更新。' },
    { name: 'Next.js', role: '本地状态页，用服务器操作停止运行和安装 APK。' },
    { name: 'GitHub REST API', role: '为页面提供运行记录和发布，用 ETag 轮询以节省调用额度。' },
    { name: 'adb', role: '把发布里的 APK 装到 USB 连接的手机上。' },
    { name: 'Blacksmith 和 Oracle Cloud', role: '免费的云端 runner，先于 PC 接下 job。' },
    { name: 'SVG 图表', role: '在服务器上根据 JSON 文件里 90 天的运行记录绘制。' },
  ],
  flow: [
    '推送到组织仓库后，job 在 GitHub 上排队。',
    '页面服务器把每个仓库指向云端 runner 或这台 PC。',
    '标签相符的 runner 接下这个 job。',
    '页面服务器读取运行记录，停止被取代的运行。',
    '页面每 15 秒显示 job、发布和停止原因。',
  ],
  links: [
    { to: 'GitHub Actions', text: '机器注册为组织的 runner，页面读取 API。' },
    { to: 'archon', text: 'Archon 的 CI 标签页用框架嵌入状态页。' },
    { to: 'ci', text: '在这台 PC 上调用其安装步骤的 job 会从共享存储复制包。' },
    { to: 'agent-skills-private', text: '它的 repo-ci 模板读取 runner 变量并设定取消规则。' },
    { to: 'Blacksmith', text: '免费分钟用完前，为轻型和重型 job 提供云端 runner。' },
  ],
  features: {
    'Mac setup':
      'POSIX sh 脚本安装 Homebrew 工具、mise 和 shell 配置，然后设置 git 并克隆组织的仓库。再次运行会跳过已有的部分。',
    'Windows setup':
      'PowerShell 脚本通过 winget 和 mise 安装同样的工具，外加 Python 和 Rust 编译缓存。它跳过 Mac 专用的部分和已有的部分。',
    'Self-hosted CI runner':
      'runner 脚本下载 GitHub runner，校验 SHA256，在 Windows 上注册 4 个 runner。前 2 个负责 Gradle、Cargo 和 Tauri 的 job。',
    'Start button': '双击后，检出切到最新发布，并重跑有变动的安装脚本。接着启动 runner 和页面的任务，再打开页面。',
    'CI status page':
      'Next.js 服务器从 GitHub API 和这台 PC 的 runner 文件夹读取 runner、运行和 job。进度条来自最近 10 次已完成的运行。',
    'Build cancellation':
      'workflow 的 concurrency 在 GitHub 上取消旧的运行。页面服务器还会每 10 秒停止被取代的运行和 Checks 失败的发布，并把原因记到文件里。',
    'Cloud runners first':
      '页面服务器统计 Blacksmith 和 GitHub 的免费分钟。它在每个私有仓库设置 runner 变量，没有变量时 job 退回 PC 的标签。',
    Releases:
      '服务器操作可以触发应用的发布 workflow，或在临时克隆里从 main 构建 APK。然后 adb 把 APK 装到连接的手机上。',
    'Updates by themselves':
      '计划任务每 5 分钟和登录时运行一次。它把检出切到最新的发布标签，只重跑文件有变动的安装脚本。',
    Sites: '页面每小时读取一次各仓库的 workflow，找出部署网站的那个。按钮在 main 上触发它。',
    'CI trends': '页面服务器每 10 分钟读取已完成的运行，把 90 天的数据存进 JSON 文件。图表在服务器上画成 SVG。',
  },
};

export default arch;

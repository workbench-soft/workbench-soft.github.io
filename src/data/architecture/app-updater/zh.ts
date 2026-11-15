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
  design: {
    scale: [
      '开发者自己手机上的一个界面，每个已发布的工作室应用对应一张卡片。',
      'GitHub API 未登录时每小时只允许 60 次调用，这决定了 10 分钟的列表缓存。',
    ],
    data: [
      '没有数据库。shared preferences 保存上一次的发布列表（含说明和名称）以及一次运行中学到的包名。',
      '资源键是标签前缀加上去掉版本和平台后缀的 APK 名，例如 farnear/farnear。',
      '已安装的应用在每次检查时从 Android 包管理器读取。',
    ],
    interfaces: [
      '共享公开发布仓库的 GitHub Releases API 逐页列出每个 APK，compare API 提供提交说明。',
      '工作室网站提供一份目录 JSON，含每个项目的名称、平台和链接。',
      'Shizuku 以 shell 用户运行 sh -c，执行 pm install -r -d -S 和 pm uninstall。',
    ],
    reliability: [
      'GitHub 检查失败时显示已保存的列表，再次打开要等一分钟才会重新请求。',
      '更新过程在 activity 之外运行，所以旋转屏幕不会中断它，取消会在下一个数据块前停下。',
      '只有出现签名或版本冲突时才会卸载挡路的构建，退出状态能暴露重装失败。',
    ],
    security: [
      '只读取公开发布，不保存令牌或账号。',
      '安装权限来自用户授予的 Shizuku 授权，应用不执行任何 root 命令。',
      '自身更新在安装前会核对 APK 的文件大小。',
    ],
    performance: [
      'APK 以 64 KB 的块下载，带超时和停止检查。',
      '发布列表保持 10 分钟有效，所以多数打开都会跳过 API。',
      '没有说明的卡片在卡片显示之后，从 compare API 在后台加载说明。',
    ],
    operations: [
      '检查在自托管 runner 上运行 ktlint、shellcheck、shfmt、actionlint、markdownlint、单元测试和调试构建。',
      'Release 与检查并行构建签名 APK，检查通过后由 release-gate.sh 发布。',
      '该任务打上日期版本标签，并在公开发布仓库里创建更新器的发布，保留最近 3 个。',
    ],
    tradeoffs: [
      '选 Shizuku 而不是系统安装器，安装无需提示，代价是每次重启后要先启动它。',
      '选普通 Views 而不是 Compose，因为只有一个界面且要用 Shizuku 的 Java API，代价是手写布局。',
      '选公开发布仓库而不是私有应用仓库，手机无需令牌，代价是每小时 60 次调用的上限。',
      '更新器自己的 APK 最后用一条 shell 命令安装，因为安装可能杀掉正在运行的进程。',
    ],
  },
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

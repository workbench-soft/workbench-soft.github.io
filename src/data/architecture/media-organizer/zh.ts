import type { Arch } from '../types';

const arch: Arch = {
  summary:
    '一款基于 Tauri 2 的桌面应用，支持 Windows 和 macOS。Rust 后端负责扫描、读日期、规划和移动文件，React webview 显示它发出的事件。',
  parts: [
    { name: 'Tauri 2', role: '桌面外壳，使用系统 webview，安装包很小。' },
    { name: 'Rust 后端', role: '对文件做出每个决定，从扫描到移动和历史记录。' },
    { name: 'React 和 Vite', role: '根据后端事件绘制文件表格、工具栏和设置。' },
    { name: 'ExifTool', role: '随应用附带的工具，读取每个文件的日期、相机和 GPS。' },
    { name: 'folder-rules crate', role: '按年份、地点和日期建文件夹的规则，与 Memories 共用。' },
    { name: 'GeoNames 和 OpenStreetMap', role: '安装包里的地名和公园轮廓，用于离线查找。' },
    { name: 'tauri-plugin-updater', role: '在 GitHub 发布中查找新版本，重启时安装。' },
  ],
  flow: [
    '用户选一个文件夹，Rust 遍历把其中的文件发出来。',
    'ExifTool 进程读取每批文件的日期和 GPS。',
    '离线地理编码为每个 GPS 点取一个地名。',
    '文件夹规则为每个文件规划新的文件夹和名称。',
    '用户确认后，后端移动每个文件并记下这一步。',
  ],
  links: [
    { to: 'memories', text: '手机应用和这个整理工具共用文件夹规则 crate 和照片编辑器。' },
    { to: 'GitHub Releases', text: '安装包和更新文件放在公开网站仓库的一个发布里。' },
  ],
  design: {
    scale: [
      '一台电脑对应一个人。设计规模是含 100,000 个文件的文件夹，所以记录由 Rust 保管，网页视图只拿到 id。',
      '地点数据随安装包一起提供，是一份 GeoNames 摘要和公园轮廓。重新生成要下载约 640 MB。',
    ],
    data: [
      '设置存在应用数据文件夹里的一个 JSON 文件中。历史记录是每次运行一个 JSONL 文件，外加一个 index.json。',
      '一次扫描的记录、日期和计划都留在后端的扫描会话里，所以命令只接收文件 id 和计划。',
      '地点数据是 geodata.tsv.gz（人口 1,000 以上的城市和景点）和 parks.tsv.gz。两者都载入 1 度的网格。',
    ],
    interfaces: [
      '网页视图发送 start_scan、start_moves 这类 Tauri 命令，后端用事件回应：scan:files、metadata:results、plan:files 和 move:file。',
      'ts-rs 根据 Rust 模型写出 TypeScript 的载荷类型，所以命令两侧保持一致。',
      'ExifTool 每个请求收到一行，含 json 输出、标签列表和绝对路径。更新器从发布版读取 latest.json。',
    ],
    reliability: [
      '移动使用不覆盖的重命名。跨卷复制会先比对大小和字节，源文件才会消失。',
      '崩溃后文件会留在源处、目的地，或同一个硬链接的两个名字下，不会丢文件。',
      '每次运行在每一步结束时写一行日志，日志写不进去就停止运行。被替换的扫描迟到的事件会按 scan_id 丢弃。',
    ],
    security: [
      '网页视图只有 core:default 权限，没有 fs 或 shell 插件。所有文件更改都由 Rust 完成。',
      '移动只能从本次会话中用原生选择器选定的文件夹开始。目的地必须在所选根目录内，每次移动前会再检查一遍。',
      '没有 GPS 点离开电脑，因为地点离线解析。ExifTool 的路径会经过检查，文件名无法注入命令。',
    ],
    performance: [
      '扫描遍历在界面线程之外运行，并分批推送文件。表格会缓冲它们，所以大文件夹每秒只重绘几次。',
      'ExifTool 工作进程保持打开并以低优先级运行，省去了每个文件启动一次进程。',
      '地点查询只扫描网格中附近的单元，公园轮廓通过每个含 64 条边的包围盒来测试。',
    ],
    operations: [
      '后端放在应用 crate 旁边的独立 crate 里，所以发布时只编译一个很小的 crate，而不是 18,000 行。',
      'CI 在一台 Windows 电脑上运行，所以发布版含 Windows 安装包，没有 macOS 版本。Mac 用 pnpm tauri build 自行构建。',
      '更新器在启动时、回到窗口时和被请求时读取 latest.json。点击 Update 后下载，点击 Restart now 后安装。',
    ],
    tradeoffs: [
      '选 Tauri 2 而不是 Electron：用系统网页视图换来更小的安装包，文件逻辑由 Rust 掌管，代价是 WebView2 和 WebKit 各不相同。',
      '在 Rust 里做规划，而不是在网页视图里，后者是第一版，遇到大文件夹会变慢。',
      '只有 disk/safe_fs 能改文件，由 clippy.toml 强制，而不是在每个模块里直接调用 std::fs，那样可能覆盖文件。',
      '把 GeoNames 放进安装包而不是用在线地理编码，这样没有 GPS 点离开电脑，也没有请求频率限制。',
    ],
  },
  features: {
    Scan: 'Rust 遍历在界面线程之外运行，分批发出文件。表格先缓存它们，所以大文件夹每秒只重绘几次。',
    'Capture dates': '一组 ExifTool 进程保持打开，扫描找到一批就读一批。它们以低优先级在一半的核心上运行。',
    'Places offline': 'GeoNames 数据和公园轮廓一次载入 1 度网格。查找只读附近的格子，GPS 点不会离开电脑。',
    'Plan first': '共用的文件夹规则 crate 以试运行的方式给每个文件定下文件夹和名称。表格在用户确认前显示每条计划。',
    Moves: '只有一个 Rust 模块改动文件，用不覆盖的重命名或校验过的复制。暂停会在当前文件移完后生效。',
    'History, undo and redo':
      '每次运行在应用数据文件夹写一份 JSONL 日志，每个文件一行。撤销和重做按日志回放，检查规则相同。',
    Settings: '后端把目标文件夹、模式和住处存进一个 JSON 文件。语言选择保存在 webview 的存储里。',
    'File table': 'React 根据后端事件为每个文件画一行。双击地点会打开基于 OpenStreetMap 瓦片的 Leaflet 地图。',
    'Self-update': 'tauri-plugin-updater 在启动和窗口回到前台时读取最新发布文件。点“更新”后下载，点“立即重启”后安装。',
    'One command install': 'PowerShell 脚本从发布文件读出最新版本。它下载安装包，并为当前用户静默运行。',
  },
};

export default arch;

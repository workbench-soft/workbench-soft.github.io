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

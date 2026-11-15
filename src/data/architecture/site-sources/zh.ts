import type { Arch } from '../types';

const arch: Arch = {
  summary:
    '一个基于 Manifest V3、没有服务器的 Chrome 扩展。弹窗发起保存，service worker 执行它，隐藏的 offscreen 页面下载文件并打包 zip。',
  parts: [
    { name: '弹窗', role: '显示站点、下载按钮和进度条，并根据保存的状态重绘。' },
    { name: 'Service worker', role: '每个标签页运行一次保存，注入页面脚本，再把 zip 交给 Chrome 下载。' },
    { name: '页面脚本', role: '在每个框架里运行，返回 HTML 和页面加载过的每个 URL。' },
    { name: 'Offscreen 文档', role: '查找、下载并打包文件，因为只有页面能生成 blob URL。' },
    { name: 'fflate', role: '打包 zip，图片和字体原样存入。' },
    { name: 'chrome.storage.session', role: '保存每次保存的状态，重新打开的弹窗也能看到。' },
    { name: 'chrome.i18n', role: '提供 9 种语言的弹窗文字和扩展名称。' },
    { name: 'Vite', role: '打包 service worker、弹窗和 offscreen 页面。' },
  ],
  flow: [
    '用户在弹窗里点下载。',
    'service worker 向标签页的每个框架注入脚本。',
    '脚本返回 HTML 和页面加载过的 URL。',
    'offscreen 页面通过 source map 和样式表找到更多文件，然后下载。',
    '计数每 100 毫秒通过会话存储传到弹窗。',
    'Chrome 下载把 zip 存进下载文件夹。',
  ],
  links: [],
  design: {
    scale: [
      '一个人一次保存一个打开的页面，两个标签页可以同时保存。',
      '文件在写出 zip 之前都留在内存里，所以几百兆的大型网站可能失败。',
    ],
    data: [
      '一次保存就是一个以主机名和时间命名的 zip，内含 index.html、每个主机一个文件夹、_sources 和 _frames。',
      '每次保存的状态存在 chrome.storage.session 里：计数、失败的文件和阶段。',
      'zip 进入下载文件夹后不再保存任何东西。扩展没有历史记录，也没有设置。',
    ],
    interfaces: [
      '弹窗、Service Worker 和离屏页面通过 chrome.runtime 消息和 session storage 里的状态通信。',
      '用 chrome.scripting 注入的页面脚本返回 HTML，以及来自 performance 条目、src 和 link href 的网址。',
      'zip 以 blob URL 形式交出，由 chrome.downloads 保存到下载文件夹。',
    ],
    reliability: [
      '服务器拒绝的文件算作失败，不进入 zip，也不重试。单个请求 2 分钟后中止。',
      '弹窗可以在保存中途关闭，再次打开时从 session storage 重绘，保存照常继续。',
      '由一个共享的 promise 创建离屏页面，所以第二个标签页复用 Chrome 允许的唯一一个。',
    ],
    security: [
      '扩展申请 activeTab、scripting、downloads、storage、offscreen 和所有网址，因为它要从页面加载的任何网站取文件。',
      '它不向自己的服务器发送任何东西。请求只发往页面本来就在用的网站。',
      '需要登录、而扩展无法发送登录信息的文件算作失败。Chrome 页面和 Chrome 应用商店不接受扩展。',
    ],
    performance: [
      '发现阶段每一轮并行抓取脚本和样式表并保留其字节，所以打包时不用再抓一遍。',
      '进度计数会合并，最多每 100 毫秒发送一次，新状态则立即发送。',
      '图片、字体、视频等已压缩格式原样放进 zip，不再二次压缩。',
    ],
    operations: [
      'Vite 打包 Service Worker、弹窗和离屏页面。fflate 也负责为每次发布压缩扩展。',
      '每次推送到 main 都与检查并行构建 zip。把关脚本在检查通过后发布，失败则取消。',
      '发布带有 v2026.11.02.1 这样的日期标签，清单文件里是同一个版本。Chrome 以解压方式加载。',
    ],
    tradeoffs: [
      '选离屏页面而非 Worker 里的 data URL，因为只有页面能创建 blob URL，data URL 还大三分之一。',
      '选 zipSync 而非异步 zip，因为扩展的策略会拦截 fflate 异步 zip 的 blob worker，代价是大 zip 要停顿一下。',
      '先找文件再抓取，进度条填充时总数保持不变，代价是大页面在第一个文件之前要等一会儿。',
      '选 chrome.i18n 而非 i18next，因为清单里的名称只能来自 _locales，再加一套目录没有意义。',
    ],
  },
  features: {
    'Download from the popup':
      '弹窗把标签页交给 service worker，由它独立完成保存。状态存在会话存储里，所以弹窗关闭后保存仍会继续。',
    'Progress bar': 'offscreen 页面先找出文件，所以总数固定不变。它每 100 毫秒发送已完成和失败的数量，弹窗据此重绘。',
    'One zip':
      'fflate 把实时 HTML 和每个文件按站点分文件夹打包，保留服务器上的路径。Chrome 下载以站点和时间命名保存它。',
    'Original sources':
      'offscreen 页面读取每个脚本和样式表的 source map。map 里的每个原始文件都放进 zip 中自己的文件夹。',
    Languages: 'chrome.i18n 按 Chrome 的语言选择目录。9 个目录存放弹窗文字、名称和描述。',
  },
};

export default arch;

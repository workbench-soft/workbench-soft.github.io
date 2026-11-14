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

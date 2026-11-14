import type { Arch } from '../types';

const arch: Arch = {
  summary: '一个用 Rust 写的 Cloudflare Worker 提供 Astro 静态页面和 API。D1 保存预约和设置，R2 保存照片。',
  parts: [
    { name: 'Astro', role: '生成静态页面、头部标签和站点地图。' },
    { name: 'Rust Worker', role: '处理照片、预约、登录、图库和日历订阅的 API。' },
    { name: 'booking-core', role: '计算空闲时段、日落时间和 iCal 文本的 Rust crate。' },
    { name: 'D1', role: '保存照片列表、预约、图库、设置和登录会话。' },
    { name: 'R2', role: '保存缩小后的照片、图库文件和上传的字体。' },
    { name: 'Email Routing', role: '把预约和咨询发给 Alina，把登录链接发给管理员。' },
    { name: '浏览器脚本', role: '在用户自己的设备上缩小、编辑照片并加水印，还会打包 zip。' },
    { name: 'Google 日历', role: '它的私人 iCal 地址标出忙碌时段，它也读取预约订阅。' },
  ],
  flow: [
    '客户打开页面，Worker 以静态 HTML 返回。',
    '页面向 Worker API 请求照片或空闲时段。',
    'Worker 读取 D1 和 Alina 的日历，booking-core 算出空闲时段。',
    '新预约写入 D1，并带着日历文件发邮件给 Alina。',
    '照片从 R2 以 2 种尺寸加载。',
  ],
  links: [
    { to: 'Google Calendar', text: '忙碌时段以 iCal 读入，缓存 5 分钟。私人订阅把每个预约送回日历。' },
    { to: 'Cloudflare', text: '运行 Worker、D1、R2、Email Routing 和表单的限流。' },
    { to: 'GitHub', text: 'main 上的检查通过后，发布流程执行 D1 迁移并部署。' },
  ],
  features: {
    Portfolio: '页面从 Worker 读取照片列表，Worker 从 D1 取出。每张照片从 R2 以 800 和 2400 像素两种 WebP 尺寸加载。',
    Booking:
      'Rust 写的 booking-core 根据 Alina 的工作时间、D1 中的预约和她日历里的忙碌时段算出空闲时段。它按日落时间标出黄金时段。',
    Questions: '表单提交给 Worker，Worker 通过 Cloudflare Email Routing 发邮件给 Alina。她直接回复这封邮件联系客户。',
    Admin: 'Worker 发送登录链接邮件，并把会话存在 D1。照片在浏览器里缩到 2400 像素并去掉 GPS 信息，再上传到 R2。',
    'Calendar sync':
      'Worker 读取 Alina 的 Google 日历私人 iCal 地址，缓存 5 分钟。私人订阅和每封预约邮件里的文件把预约送回日历。',
    Fonts: '10 种字体随网站一起发布，上传的字体存到 R2。Worker 按 D1 中的选择提供主题样式表，缓存 1 分钟。',
    'Client galleries': '浏览器在上传前给每张样片加水印，R2 保存样片和原图。客户的浏览器用 client-zip 打包原图。',
    Search: 'Astro 在构建时把标题、描述、照片卡片和结构化数据写进每个页面。站点地图来自构建生成的页面。',
  },
};

export default arch;

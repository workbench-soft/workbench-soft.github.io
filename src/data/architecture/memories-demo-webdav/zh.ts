import type { Arch } from '../types';

const arch: Arch = {
  summary:
    '一个用 TypeScript 写的 Cloudflare Worker 支持 Memories 发出的 WebDAV 方法。一个 Durable Object 把文件存在自己的 SQLite 里，免费套餐就够用。',
  parts: [
    { name: 'Cloudflare Worker', role: '检查 Basic 登录，并转交每个 WebDAV 请求。' },
    { name: 'Durable Object', role: '整棵目录树只用一个存储，文件按 1 MB 分块存在它的 SQLite 里。' },
    { name: '静态文件', role: '随 Worker 一起带上示例照片，每次启动时填进存储。' },
    { name: 'Python 示例脚本', role: '画出 42 张合成照片和 2 段视频，带 EXIF 日期和 GPS。' },
    { name: 'Cron 触发器', role: '每晚 03:00 UTC 删除上传层。' },
  ],
  flow: [
    '应用发出带 Basic 登录的 WebDAV 请求。',
    'Worker 检查登录，再把请求交给 Durable Object。',
    '读取先查上传层，再查示例。',
    '应用拿到文件夹列表，或所请求范围的字节。',
  ],
  links: [
    { to: 'memories', text: 'Google Play 审核员在 Memories 的连接页面输入这台服务器。' },
    { to: 'Google Play', text: 'App access 说明给审核员提供地址和登录信息。' },
    { to: 'Cloudflare', text: '免费的 Workers 套餐运行它，检查通过后由 CI 部署。' },
  ],
  features: {
    'Sample library':
      'Python 脚本画出带 EXIF 日期的照片，部分带 GPS 点。它们作为静态文件发布，启动时填进 Durable Object。',
    'Sign in': 'Worker 用一个 Worker 密钥核对唯一的 Basic 用户。OPTIONS 不需要登录。',
    'Uploads and sorting': '上传和移动写进只读示例之上的单独一层。夜间 cron 删除这一层，示例随之恢复。',
  },
};

export default arch;

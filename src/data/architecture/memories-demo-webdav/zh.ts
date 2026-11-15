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
  design: {
    scale: [
      '给 Google Play 审核人员用的一个共享演示库：42 张照片、2 段视频和一个登录账号。',
      '一个 Durable Object 接收所有请求，所以所有审核人员在免费的 Workers 套餐上共用同一份数据。',
    ],
    data: [
      '文件以 1 MB 的块存进 Durable Object 的 SQLite 存储，低于单行 2 MB 的上限。',
      'base/ 下的样本只读。客户端的上传和文件夹进 Uploads/，删除和移动用标记记录。',
      '一个 JSON 文件记着每个样本的 EXIF 日期，PROPFIND 把它报告为修改时间。',
    ],
    interfaces: [
      '只实现应用用到的 WebDAV：OPTIONS、深度 0 或 1 的 PROPFIND、带范围的 GET 和 HEAD、PUT、MKCOL、MOVE 和 DELETE。',
      'LOCK 回 405，深度为无限的 PROPFIND 回 403。',
      'Worker 把每个请求转给 Durable Object，后者提供 head、带范围的 get、put、delete 和 list 调用。',
    ],
    reliability: [
      '每天 03:00 UTC 的 cron 清空 Uploads/，演示就回到样本状态。',
      '每次启动时 Durable Object 按样本清单校正 base/，所以只填了一半的初始化会自我修复。',
      'PUT 超过 50 MB 就停止读取，带范围的 GET 只加载需要的块，以便留在 128 MB 内存之内。',
    ],
    security: [
      '一个 Basic 认证用户对照 Worker 的密钥检查。OPTIONS 无需登录即可回应。',
      '样本文件作为静态资源放在 Worker 后面，所以登录同样保护它们。',
      '样本都是合成的，不会暴露任何真实的人或地点。',
    ],
    performance: [
      '带范围的 GET 只读所需的块，所以 50 MB 的文件不会占 100 MB 内存。',
      '样本日期取自 JSON 文件，所以 PROPFIND 不必读 EXIF。',
    ],
    operations: [
      '每次推送到 main，检查会跑 lint、类型检查和单元测试，通过后才启动部署。',
      '部署先构建样本，再通过 mise 运行 wrangler 部署，并给提交打上日期版本标签。',
      '样本文件夹与日期清单不一致，或缺少 Cloudflare 令牌时，部署会停下。',
      '部署一次只跑一个，更新的等待任务会取代较旧的。',
    ],
    tradeoffs: [
      '选 Durable Object 里的 SQLite 而不是 R2，因为 R2 需要付款卡，而免费套餐包含 Durable Object。',
      '选在只读样本之上加写入层，而不是直接写样本，这样重置只需按前缀删除一次。',
      '选合成照片而不是真实照片，陌生人看不到真实的人和地点。',
      '现在用 TypeScript 写 Worker 而不是 Rust，先交付。团队技术栈计划改用 workers-rs。',
    ],
  },
  features: {
    'Sample library':
      'Python 脚本画出带 EXIF 日期的照片，部分带 GPS 点。它们作为静态文件发布，启动时填进 Durable Object。',
    'Sign in': 'Worker 用一个 Worker 密钥核对唯一的 Basic 用户。OPTIONS 不需要登录。',
    'Uploads and sorting': '上传和移动写进只读示例之上的单独一层。夜间 cron 删除这一层，示例随之恢复。',
  },
};

export default arch;

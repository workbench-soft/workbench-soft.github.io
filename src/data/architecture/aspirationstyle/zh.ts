import type { Arch } from '../types';

const arch: Arch = {
  summary:
    '托管在 GitHub Pages 上的 Astro 静态网站，通过基于 Git 的后台编辑。Cloudflare 上的一个 Rust Worker 负责 Maria 的登录和 AI 绘图。',
  parts: [
    { name: 'Astro', role: '把每个页面生成静态 HTML，把每张照片生成 AVIF 或 WebP 尺寸。' },
    { name: 'GitHub Pages', role: '从公开的构建仓库提供网站，免费，在俄罗斯打开也快。' },
    { name: 'Sveltia CMS', role: '后台，把每次修改作为提交存进私有源码仓库。' },
    { name: 'Rust Worker', role: '用邮件里的验证码让管理员登录，并为 AI 页面检查其仓库权限。' },
    { name: 'Workers AI', role: '运行绘制室内效果的 FLUX.2 模型。' },
    { name: 'FormSubmit', role: '把每份订单表单发邮件给 Maria，无需账号和服务器。' },
    { name: 'GitHub Actions', role: '检查每次修改，构建网站并推送到公开仓库。' },
  ],
  flow: [
    '访客的浏览器向 GitHub Pages 请求页面。',
    'Pages 返回静态 HTML 和布局所需尺寸的照片。',
    '订单表单提交到 FormSubmit，再发邮件给 Maria。',
    'Maria 的修改成为提交，网站在 2 分钟内重新构建。',
  ],
  links: [
    { to: 'GitHub', text: '保存私有源码和公开构建仓库，并提供页面。' },
    { to: 'Cloudflare', text: '运行 Worker、Workers AI 和发送登录验证码的邮件。' },
    { to: 'FormSubmit', text: '把每份订单发给 Maria。' },
    { to: 'Yandex', text: '读取结构化数据，robots.txt 里针对 Yandex 的规则把筛选链接合并为一个页面。' },
  ],
  design: {
    scale: [
      '面向俄罗斯访客的工作室作品集，有 16 个图集和约 270 张照片。',
      '几个人编辑，所以网站不需要服务器和数据库，每次修改就是一次提交。',
      'AI 页面在 Workers AI 每天 10,000 个神经元的免费额度内运行，一张图约需 3 到 15 秒。',
    ],
    data: [
      '每个图集是一个文件夹，含 index.md 和照片。文件头里有标题、分类、顺序、封面和说明。',
      '一个 settings.json 保存联系方式、首页文字和字体选择。构建时由 zod 模式检查它和各图集。',
      '登录码不存储。每个码都是邮箱加 10 分钟时间窗的 HMAC。',
    ],
    interfaces: [
      'Rust Worker 提供 GET /auth、POST /auth/code、POST /auth/verify 和 POST /generate。',
      '管理页通过 GitHub API 以提交的形式写入。订单表单提交给 FormSubmit，由它发邮件。',
      '/generate 以 multipart 表单数据接收提示词、模型、256 到 1536 之间步长 64 的尺寸，以及最多 2 张参考照片。',
    ],
    reliability: [
      'Worker 在 CORS 头里只写一个允许的来源，因为浏览器会拒绝列表。此后的错误以 JSON 返回，管理页可以显示。',
      'GitHub 故障会得到重试提示，而不是无权限提示。AI 额度用完则有单独的提示。',
      '每次发布都从源码重新构建，所以一次错误的修改只需回退一个提交。',
    ],
    security: [
      '用邮件里的 6 位验证码登录，每个邮箱每分钟 5 次尝试，Worker 再给管理页一个细粒度的仓库令牌。',
      '/generate 先检查调用者的令牌能否向仓库推送，再调用模型。',
      '令牌只发给来自允许来源的窗口。管理员邮箱和令牌放在 Worker 的设置和密钥里，不在网站上。',
    ],
    performance: [
      'Astro 把每张照片按版式需要的尺寸写成 AVIF 或 WebP，GitHub Pages 提供静态 HTML。',
      '发布会在多次运行之间保留 Astro 的图片缓存，而不是重新处理所有照片。',
      '房间照片上传前先在浏览器里缩到 512 px。FLUX.2 klein 约 3 秒出草图，dev 约 15 秒。',
    ],
    operations: [
      '每次推送到 main 都与检查并行构建网站，等同一提交的检查通过，再把页面推送到公开的构建仓库。',
      '一次只运行一个发布，较新的推送会取消过时的那个，旧构建不会覆盖新构建。提交带有日期标签。',
      '修改在保存后约 2 分钟显示。Worker 用 wrangler 部署，并开启了可观测性。',
    ],
    tradeoffs: [
      '选公开构建仓库上的 GitHub Pages 而非 Cloudflare Pages，因为俄罗斯的运营商会拖慢 Cloudflare，代价是两个仓库和一个发布令牌。',
      '选基于 Git 的管理页而非托管 CMS，没有服务器和数据库，代价是每次修改等 2 分钟。',
      '选 FormSubmit 而非带邮件的 Worker，因为它免费且无需账号，代价是服务在俄罗斯之外。',
      '选 Workers AI 加 FLUX.2 而非付费图像 API，因为它能读俄语且在免费额度内，代价是来自 Cloudflare 的图较慢。',
    ],
  },
  features: {
    Portfolio: '每个图库都是仓库里一个装有 Markdown 和照片的文件夹。Astro 生成页面和图片尺寸，筛选在浏览器里运行。',
    'Order a design': '每个表单都提交到 FormSubmit，由它把请求发给 Maria。网站为此不需要自己的服务器。',
    Admin: 'Sveltia CMS 在后台页面运行，把每次修改提交到仓库。Worker 给 Maria 发登录验证码，然后把仓库令牌交给后台。',
    Fonts: '10 种字体来自 Fontsource，随网站一起发布。选择保存在网站设置文件里，布局在下次构建时应用它。',
    'AI generator':
      '后台页面把 Maria 的俄语请求和风格包进英文提示词。Worker 检查她的 GitHub 权限，然后由 Workers AI 上的 FLUX.2 绘图。',
    Search:
      'Astro 布局在每个页面写入标题、描述、分享图片和结构化数据。构建时写出 robots.txt、llms.txt 和带 git 日期的站点地图。',
  },
};

export default arch;

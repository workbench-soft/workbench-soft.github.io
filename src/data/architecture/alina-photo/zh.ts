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
  design: {
    scale: [
      '一位摄影师的工作室网站：客户预约并打开相册，Alina 使用管理后台。流量很小。',
      '每张照片存 2 种尺寸，2400 px 和 800 px，25 MB 的相机文件上传后不到 1 MB。',
      'Worker 每次请求只有几毫秒 CPU，wasm 构建约 2.5 MB，所以把繁重的工作放进了浏览器。',
    ],
    data: [
      'D1 保存 photos、bookings、settings、sessions、login_links、galleries 和 gallery_files。时间用 UTC 文本，所以文本顺序就是时间顺序。',
      'settings 行是不带版本的 JSON。解析失败的行回退到默认值并记录一条错误。',
      'R2 保存 p/<id>/l.webp 和 s.webp 形式的照片、上传的字体，以及 g/<gallery>/ 下的相册文件：样片、160 px 缩略图和原图。',
    ],
    interfaces: [
      'Worker 在 /api 下提供 JSON，涵盖日期、时段、预约、照片、相册和登录，并在 /calendar/<token>.ics 提供日历订阅源。',
      '输入的日历是 Alina 的私密 iCal 地址，缓存 5 分钟。输出的是预约订阅源，每封预约邮件还附带 booking.ics。',
      '邮件通过 Email Routing 的 send_email 绑定发出，只发往 Alina 已验证的地址。',
      'booking-core 是一个 Rust crate，负责时段、预约复核、日落时间和 iCal，重复事件用 rrule crate。',
    ],
    reliability: [
      '预约的 POST 会再次确认时段仍然空闲，所以列表加载之后被占用的时段会被拒绝。',
      '订阅的日历源会滞后数小时，所以每封预约邮件也附带 iCal 文件。',
      '过期的会话和登录链接会从 D1 删除，一个已存的测试保证今天的 settings 行仍能解析。',
      '发布会迁移 D1 并部署，遇到 Cloudflare 超时时，迁移和部署各有 3 次重试。',
    ],
    security: [
      '登录是通过邮件发送的链接，15 分钟有效。它打开一个用 POST 提交令牌的页面，因为邮件扫描器会打开 GET 链接。',
      '会话在 HttpOnly、SameSite Lax 的 cookie 中持续 30 天，D1 只存令牌的哈希。',
      'Workers 的限流绑定在预约和发邮件的表单上，每个 IP 每分钟允许 5 次调用。',
      '相册 id 放在链接的哈希里，所以不会进入服务器日志和 referrer。拿到链接的人都能看到相册。',
    ],
    performance: [
      '浏览器在上传前把每张照片缩成 2 种尺寸，所以 25 MB 的文件上传后不到 1 MB，且不含 GPS 数据。',
      'client-zip 在浏览器里生成相册 zip，因为 Worker 在 CPU 限制内读不完几个 GB。',
      '页面是 Worker 提供的静态 Astro HTML，日历文本缓存 5 分钟。',
    ],
    operations: [
      '一个 Worker 提供页面和 API。worker-build 把 Rust 变成 wasm，mise 锁定 Rust、Node 和 pnpm 的版本。',
      'Checks 在 main 上通过后，发布由 workflow_run 启动，一次只运行一个：构建、D1 迁移、部署、打标签。',
      '迁移是 migrations/ 里编号的 SQL 文件。lint 涵盖 oxlint、oxfmt、tsc、knip、rustfmt、面向本机和 wasm 的 clippy，以及 cargo shear。',
    ],
    tradeoffs: [
      '页面和 API 用同一个 Worker，而不是 GitHub Pages 加 Worker，这样管理员 cookie 在同一个源下工作，无需 CORS。',
      '用邮件链接登录，而不是密码或 Cloudflare Access，这样 Alina 没有会忘的密码，也不需要配置 Zero Trust。',
      '日历用 iCal 输入输出，而不是 Google 日历 API，这样不需要 OAuth 应用、审核和令牌刷新，但订阅源会滞后数小时。',
      '缩放、水印和 zip 在浏览器里做，而不是在 CPU 不足的 Worker 里，代价是样片没有原文件就无法重新加水印。',
    ],
  },
  features: {
    Portfolio: '页面从 Worker 读取照片列表，Worker 从 D1 取出。每张照片从 R2 以 800 和 2400 像素两种 WebP 尺寸加载。',
    Booking:
      'Rust 写的 booking-core 根据 Alina 的工作时间、D1 中的预约和她日历里的忙碌时段算出空闲时段。它按日落时间标出黄金时段。',
    Questions: '表单提交给 Worker，Worker 通过 Cloudflare Email Routing 发邮件给 Alina。她直接回复这封邮件联系客户。',
    Admin: 'Worker 发送登录链接邮件，并把会话存在 D1。照片在浏览器里缩到 2400 像素并去掉 GPS 信息，再上传到 R2。',
    'Calendar sync':
      'Worker 读取 Alina 的 Google 日历私人 iCal 地址，缓存 5 分钟。私人订阅和每封预约邮件里的文件把预约送回日历。',
    Fonts: '10 种字体随网站一起发布，上传的字体存到 R2。Worker 按 D1 中的选择提供主题样式表，缓存 1 分钟。',
    'Client galleries':
      '浏览器在上传前给每张照片的小预览图加水印，R2 保存预览图、原图和修好的副本。只有勾选“已付款”之后，Worker 才给出原图或修好的副本，而且只给买下的文件。客户的浏览器用 client-zip 打包买下的文件。',
    Reviews:
      'Worker 在蜜罐字段和频率限制之后把每条评价以待审状态存入 D1，并发邮件给 Alina。只有已批准的行会通过 API 输出，页面再加上 Review 和 AggregateRating 数据。',
    Search: 'Astro 在构建时把标题、描述、照片卡片和结构化数据写进每个页面。站点地图来自构建生成的页面。',
  },
};

export default arch;

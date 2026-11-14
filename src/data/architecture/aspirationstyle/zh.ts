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

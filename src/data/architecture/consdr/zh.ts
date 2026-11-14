import type { Arch } from '../types';

const arch: Arch = {
  summary:
    '一个由 Vite 构建的 React 静态网站，在浏览器里完成整个计算，由 Cloudflare 提供。Android 上的 Java WebView 应用显示在线网站，iPhone 上的 Capacitor 应用把网站装在里面。',
  parts: [
    { name: 'React and Vite', role: '计算器页面，构建时用默认数字预先渲染。' },
    { name: '规则和费用模块', role: '纯 TypeScript，含税务规则、规则来源和每个方案的算法。' },
    { name: 'localStorage', role: '改过的字段、主题和语言，只存在这个浏览器里。' },
    { name: 'Service worker', role: '缓存页面和文件，之后的访问可以离线使用。' },
    { name: 'i18next', role: '9 个语言包，用户选中时才加载。' },
    { name: 'Cloudflare', role: '提供构建好的文件、重定向和 Web Analytics。' },
    { name: 'Android WebView app', role: '用 Java 包住在线网站，带 AdMob 横幅和 Google Play 购买。' },
    { name: 'Capacitor', role: '把网站文件装进 iPhone 应用，再用 Swift 处理广告、StoreKit 和分享。' },
  ],
  flow: [
    'Cloudflare 发来带默认数字的预渲染页面。',
    '页面从 localStorage 读取保存的字段。',
    '每次修改都在浏览器里重新比较，并保存字段。',
    '页面显示 3 个总额、各自的组成和计算过程。',
    'Service worker 缓存文件，下次访问可以离线。',
  ],
  links: [
    { to: 'Cloudflare', text: '托管网站，并负责重定向和 Web Analytics。' },
    { to: 'Google AdSense', text: '网站上的自动广告。应用里不加载 AdSense。' },
    { to: 'Google Play', text: 'Android 应用里的 AdMob 横幅和去广告购买。' },
    { to: 'App Store', text: 'iPhone 应用上架 App Store 后，由 StoreKit 出售去广告。' },
  ],
  features: {
    'Compare a lease, a loan and cash':
      '一个纯 TypeScript 函数读取字段，为每个方案算出一个总额。每次修改都在浏览器里运行，没有服务器看到这些数字。',
    'Where the money goes': '比较结果在总额旁边给出它的各个组成。注释模块在每个数字旁写出明细和公式。',
    'Lease and loan settings':
      '表单模块把输入的文字变成数字，并把每次修改存进 localStorage。输了一半的值会留在屏幕上。',
    'FBT by car type and start date': '规则模块按车型、起始日期和价格选出 FBT 税率和电动车豁免。每个常量都标明来源。',
    'Stamp duty by state': '规则模块里每个州一张表，按价格、车型和起始日期算出印花税。',
    'Account interest': '比较时按账户利率逐月计算账户，每个方案和不买车各算一遍。差额就是少得的利息。',
    'Borrowing for another home': '比较时算出车款还清前银行会少借多少。它按 APRA 的 3 个百分点缓冲和 30 年期限计算。',
    'Working and sources': '注释模块在数字旁写出每一步和公式。来源文件把每个固定数字链接到它的出处。',
    'Common questions': '一个模块用同一套规则，以当前语言生成答案。英文版还以 JSON-LD 写进页面，供搜索引擎读取。',
    'Guides and pages': '一个 Vite 插件在构建时把每篇指南渲染成静态 HTML，数字来自同一套规则。它也写出站点地图。',
    'Saved inputs and reset': '改过的字段以 JSON 存进 localStorage。重置会删掉它们，默认值随之恢复。',
    'Offline use': '构建时生成的 Service worker 缓存页面和文件。页面先走网络，3 秒后改用缓存里的副本。',
    'Colour theme': '页面头部的一小段脚本在首次绘制前套用保存的主题。选择存在 localStorage 里。',
    'Remove ads in the Android app':
      '页面通过桥接向 Java 应用询问，由 Google Play Billing 出售商品。应用再把无广告状态传回页面。',
    'Which lease term costs least':
      '一个函数对 1 到 5 年的每个期限各跑一次比较。它把账户一直算到第 5 年，让每个期限覆盖同样的年份。',
    'If you leave your job':
      '一个模块算出离职日的结清金额，以及每种退出方式和继续租赁相比的成本。它沿用比较里的租赁数字。',
    Language: 'i18next 和 react-i18next 在用户选择时，把每个语言包作为单独文件加载。金额一直用澳元。',
    Ads: 'AdSense 在网站上投放自动广告。应用会给页面加标记，所以那里不加载 AdSense，改由 AdMob 显示原生横幅。',
    "No ads on the developer's phone":
      'Android 应用保存一把开发者密钥，由电脑一次性发到手机上。有了它，每个版本都会隐藏横幅。',
    'iPhone app':
      'Capacitor 从应用内部提供构建好的网站，所以离线也能打开。Swift 代码响应与 Android 应用相同的页面桥接。',
    'Remove ads on the iPhone': 'StoreKit 2 出售与 Google Play 相同 id 的商品。恢复购买会向 App Store 查询以往的购买。',
    'Share the result': '页面拼出带链接的结论。iPhone 应用打开 iOS 分享面板，手机浏览器使用 Web Share。',
  },
};

export default arch;

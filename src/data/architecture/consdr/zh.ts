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
  design: {
    scale: [
      '每个浏览器一个人使用，一个计算器页面有 23 个输入项。每次修改都在浏览器里重新比较。',
      '网站是 Cloudflare 上的静态文件，所以工作室自己没有服务器来承担负载。',
      '税档、FBT 和印花税是代码里的固定数字，所以限制在于让它们保持最新，而不是负载。',
    ],
    data: [
      '没有数据库，也没有账号。修改以 JSON 形式存在 localStorage 的 3 个键下：输入项（带版本字段）、主题和语言。',
      '只保存被修改的字段，所以没动过的开始日期按今天读取，默认值跟随车型和规则。',
      '税档、FBT 常量和各州印花税作为常量放在 src/rules，每个都附有来源链接。',
    ],
    interfaces: [
      'compareOptions 接收一个 CalcInputs 对象，返回 Comparison：每个选项的成本、账户走势和成本构成。',
      '页面通过 window.ConsdrApp 与 Android 应用通信，消息有 state、buy、privacy 和 devAds，回复为 JSON。',
      'iPhone 应用用 Swift 响应同一座桥，Capacitor 从应用内部提供构建好的网站。',
      '构建会写出 sitemap.xml、llms.txt、ads.txt 和常见问题的 JSON-LD。',
    ],
    reliability: [
      '页面先走网络，3 秒后或遇到服务器错误时退回缓存副本。',
      '网站数据被屏蔽时，读取返回 null，写入被跳过，页面在本次访问中仍可使用。',
      '类型错误的已存值或未知的选项值在加载时被丢弃。一个标签页保存后，其他标签页会重新加载。',
    ],
    security: [
      '没有登录，数字也不发往任何服务器，所以输入内容不会离开浏览器。',
      '响应头设置 frame-ancestors none、object-src none、nosniff 和 HSTS，并关闭摄像头、麦克风和定位。',
      'Android 签名密钥是 CI 密钥，在运行器上解码，仓库里没有密钥。',
      'Android 应用通过 Google 的同意 SDK 征求广告同意。',
    ],
    performance: [
      '英文放在主脚本里，其他 8 个语言包在选择时各自作为独立分块加载。',
      '构建时用默认值预渲染计算器并预加载拉丁字体，内容出现得早，数字也不会跳动。',
      '/assets/ 下的文件带内容哈希，获得一年的不可变缓存头，并由 worker 优先从缓存提供。',
    ],
    operations: [
      '一个任务完成检查、测试和构建，然后每次推送到 main 时由 wrangler deploy 把 dist/ 发布到 Cloudflare。',
      'CI 运行在工作室自己的 Windows 电脑运行器上，所以私有仓库不消耗 Actions 分钟数。',
      '每晚悉尼时间 19:00 的运行会为 Google Play 构建签名的 Android 包，仅在 android/ 有变化时执行。',
      'service worker 的缓存名由文件列表、页面文字和 worker 代码的哈希组成，所以每次部署都会替换旧缓存。',
    ],
    tradeoffs: [
      '在浏览器里计算，而不是用服务器 API，这样数据不离开设备，托管只是静态文件。',
      'Android 上用 WebView 包住线上网站，而不是原生界面，这样一套代码同时服务网站和应用，网站部署也立即到达应用。',
      '页面先走网络而不是先用缓存，这样部署立刻可见，代价是慢网络下最多等 3 秒。',
      '把带来源的固定规则写在代码里，而不是用利率 API，这样每个数字都可审查，但换税年需要发布新版本。',
    ],
  },
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

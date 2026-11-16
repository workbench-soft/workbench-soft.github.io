import type { Text } from './en';

export const zh: Text = {
  home: 'Workbench Soft',
  language: '语言',
  about: {
    title: '关于 Workbench Soft',
    description:
      'Workbench Soft 是一家位于澳大利亚的独立软件工作室，为 Android、iPhone、网页、Windows 和 macOS 开发应用。',
    sections: [
      {
        h: '我们是谁',
        p: [
          'Workbench Soft 是一家位于澳大利亚的独立软件工作室。它为 Android、iPhone、网页、Windows 和 macOS 设计、开发并发布应用，从第一份规格说明一直到应用商店和之后的更新。',
        ],
      },
      {
        h: '我们做什么',
        p: [
          '工作室自己的应用，例如 Memories、Sky Altar 和 Workbench Games，以及为客户开发的应用。首页上的每个项目都逐项列出它的功能。',
        ],
      },
      {
        h: '广告',
        p: [
          '工作室的页面不显示广告。Sky Altar 的星座文章和 Workbench Games 网站显示 Google 广告，让这些应用保持免费。',
        ],
      },
      { h: '联系', p: ['请写信到 {email}，或使用首页上的订单表单。'] },
    ],
  },
  privacy: {
    title: '隐私政策',
    description: 'workbench-soft.com 收集什么、订单表单和广告使用什么，以及如何要求删除你的数据。',
    sections: [
      { p: ['最后更新：2026 年 11 月 17 日。'] },
      {
        h: '网站保存什么',
        p: ['网站没有账号，也不设置自己的 Cookie。少量选择，例如你在星座页面上选的星座，保存在你浏览器的存储中。'],
      },
      {
        h: '订单表单',
        p: [
          '当你提交订单表单时，你的姓名、邮箱和留言会通过 FormSubmit（formsubmit.co）发送到 {email}。我们只用它们来回复你，并且只在沟通需要的期间保留。',
        ],
      },
      {
        h: '广告',
        p: [
          '星座文章显示 Google AdSense 广告。Google 可能使用 Cookie 或设备标识符来挑选和衡量广告。在欧盟、英国和瑞士，会先显示同意提示。Google 如何使用数据：policies.google.com/technologies/partner-sites。',
        ],
      },
      {
        h: '托管',
        p: ['网站由 GitHub Pages 提供，域名由 Cloudflare 运行。两者都会为了安全短期保留包含 IP 地址的请求日志。'],
      },
      {
        h: '各个应用',
        p: ['每个应用都有自己的隐私政策，链接在首页对应的项目中。工作室内部工具的隐私政策在 {mcp}。'],
      },
      { h: '你的权利', p: ['如需查看、更正或删除我们保存的关于你的信息，请写信到 {email}。'] },
    ],
  },
};

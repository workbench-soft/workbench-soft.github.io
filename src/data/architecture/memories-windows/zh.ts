import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'NAS 上的 Docker 里运行一个 .NET 同步器，把每张照片的拍摄日期写进 LiteDB 索引。Windows 托盘里的 WPF 应用按日期查这个索引，并直接从 NAS 打开文件。',
  parts: [
    { name: '.NET', role: 'NAS 服务和 Windows 应用共用的一个平台。' },
    { name: 'Docker', role: '在 NAS 上紧挨照片库运行同步器。' },
    { name: 'LiteDB', role: '拍摄日期的索引，图库逐天读取。' },
    { name: 'WPF', role: 'Windows 上的托盘图标、图库和照片窗口。' },
    { name: 'Quartz', role: '触发每日提醒任务的调度器。' },
  ],
  flow: [
    'NAS 上的同步器读取每张照片的 EXIF。',
    '它把拍摄日期写进 LiteDB 索引。',
    '每天一次，Windows 通知请用户打开图库。',
    '图库在索引里查找该时段的照片。',
    '它直接从照片库打开文件。',
  ],
  links: [{ to: 'memories', text: '手机应用取代了它，并接过了“那年今日”的想法。' }],
  features: {
    Tray: 'WPF 窗口常驻系统托盘。单击或托盘菜单打开图库。',
    'Daily reminder': 'Quartz 任务显示一条带按钮的 Windows 通知。按钮打开图库。',
    'Gallery by period': '图库为时段内的每一天打开 LiteDB 索引。它跳过回收站里的文件，其余的随滚动加载。',
    'Photo window': 'WPF 窗口放大显示一张照片。按一个键就跳到时段内的下一个或上一个文件。',
    'Details and map': '应用从照片文件里读出相机参数，并在地图上显示拍摄地点。',
    Send: '选中的文件一步发送到另一个应用。',
  },
};

export default arch;

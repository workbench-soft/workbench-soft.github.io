import type { Arch } from '../types';

const arch: Arch = {
  summary:
    '一个 Expo 应用跑在 Android、iPhone 和网页上，把每张卡片存在设备上的 SQLite 里。词库随应用一起打包，用户配对设备后由 Firestore 同步卡组。',
  parts: [
    { name: 'Expo and React Native', role: '一套代码做出 Android、iPhone 和网页版。' },
    { name: 'SQLite', role: '在每台设备上存卡片、作答记录、已认识的词和图片。' },
    { name: 'ts-fsrs', role: 'FSRS 复习计划，决定每张卡片何时回来。' },
    { name: '词库', role: '应用内的英语和俄语单词 JSON，取自公开词表和 Wiktionary。' },
    { name: 'Firestore', role: '每个同步卡组的副本，用配对码访问。' },
    { name: '对话引擎', role: '用户自己密钥的 Gemini、手机上的 Qwen 3，或 Chrome 内置模型。' },
    { name: '扬声器模块', role: '本地 Kotlin 模块，用手机扬声器以最大音量播放单词。' },
    { name: 'Google Play', role: 'AdMob 广告，以及经由 expo-iap 的去广告和 Pro 购买。' },
  ],
  flow: [
    '用户输入一个词，或开始一组练习。',
    '查词先查词库，再查 Wiktionary 和 MyMemory。',
    '应用把卡片存进设备上的 SQLite。',
    'FSRS 选出到期的卡片，新词补满这一组。',
    '卡片显示单词、图片和读音。',
  ],
  links: [
    { to: 'Firebase', text: 'Firestore 存着每个配对卡组的副本，前面是匿名登录。' },
    { to: 'Wiktionary and MyMemory', text: '词库里没有的词在这里拿到翻译，不需要密钥。' },
    { to: 'Wikipedia', text: '单词条目的首图，并附 Commons 的署名。' },
    { to: 'Google Gemini', text: '对话练习和主题猜测用用户自己的密钥调用它。' },
    { to: 'Google Play', text: 'AdMob 显示广告，Play Billing 出售去广告和 Pro。' },
  ],
  features: {
    'Word batches': '练习模块先从 SQLite 取到期的卡片，再从词库取新词，直到每日上限。ts-fsrs 决定每张卡片何时回来。',
    'Ways to ask': '每张卡片按目标里选的技能决定提问方式。听力题用手机自带的声音读出单词。',
    'Add a word': '查词依次尝试内置词库、Wiktionary 和 MyMemory。输入提示来自词库，不需要网络。',
    Pictures: '应用向所学语言的 Wikipedia API 要条目的照片，只要自由许可的。expo-image 把它存在设备上，不参与同步。',
    'Built in words':
      '构建脚本把 CEFR-J、Octanove、Wiktionary 和 OpenRussian 合成 2 个 JSON 文件。应用首次使用时加载。',
    'Level test': '测试把每个级别的词库单词和编造的词混在一起。按级别算分并扣除瞎猜，决定新词从哪一级来。',
    Topics: '词库里的每个词都带着主题。输入的词从 Wiktionary、Gemini 或 Chrome 模型拿到主题。',
    Reminders: '手机上的计划器通过 expo-notifications 排好一周的本地通知。应用每次打开或关闭时都会重新安排。',
    'My words': '列表从设备上的 SQLite 读取卡片。删除只给卡片做标记，好让同步把它带过去。',
    'Look and language': 'i18next 管理 9 个语言包，主题跟随手机或设置。两项选择都留在设备上。',
    'Talk practice': '场景提示发给用用户密钥的 Gemini、手机上的 Qwen 3 或 Chrome 模型。点一下回复里的词就存成卡片。',
    'Sync between devices': '每台设备匿名登录 Firebase，把改过的卡片推到配对码对应的卡组。同一个词以较晚的修改为准。',
    'Home screen widget':
      'react-native-android-widget 在后台从 SQLite 读取并绘制它。它每 30 分钟刷新一次，应用转到后台时也会刷新。',
    'Ads and Remove ads': 'AdMob 在同意表单之后显示横幅和全屏广告。Google Play Billing 经由 expo-iap 出售去广告。',
    Sound: '本地 Kotlin 模块把每个词录成文件，用扬声器以最大音量播放。iOS 和网页走系统的输出。',
    'Memoire Pro': 'Google Play Billing 经由 expo-iap 出售 Pro。一个检查读取购买状态，解锁各个被锁的项目。',
    Updates: 'GitHub 版 APK 读取公开的发布列表，并打开 Android 安装器。Play 版和 iPhone 版不含这个模块。',
  },
};

export default arch;

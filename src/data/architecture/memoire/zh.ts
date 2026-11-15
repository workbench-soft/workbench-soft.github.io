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
  design: {
    scale: [
      '每次安装对应一位学习者，所有卡片都在设备上的 SQLite 里。工作室自己没有服务器在运行。',
      '词库作为 assets/words/en.json 和 ru.json 随应用发布，由 CEFR-J、Octanove、Wiktionary 和 OpenRussian 构建。',
      '限制来自免费服务：MyMemory 每台设备每天约 5000 个词，GitHub 发布列表每个地址每小时允许 60 次调用。',
      '手机上的对话模型占用约 1.2 GB 存储和 2 GB 空闲内存。',
    ],
    data: [
      '卡片、复习记录、已知词和图片通过 expo-sqlite 存在 SQLite 中，网页端也一样。',
      '卡片把 FSRS 状态以 JSON 存在 memory 中，到期时间 due 复制到单独一列用于索引。(lang, term_key) 唯一。',
      '删除的卡片保留为标记，updated_at 让同步时较晚的修改获胜。',
      '设置存在 localStorage 中。图片留在每台设备上，不参与同步。',
    ],
    interfaces: [
      '同步把每张卡片写入 Firestore 的 decks/{code}/cards/{lang}_{termKey}，firestore.rules 检查代码长度和每个字段。',
      '键入的词先查词库，再通过 kaikki.org 查 Wiktionary，然后查 MyMemory API。Wikipedia 提供主图。',
      'Gemini 由设备用本人自己的密钥调用，Qwen 3 通过 react-native-executorch 在手机上运行。',
      'modules/speaker/ 里的 Kotlin 模块把语音渲染到文件，后台处理程序绘制 Android 主屏幕小组件。',
    ],
    reliability: [
      '每台设备独立使用自己的 SQLite 文件，所以应用可离线运行，同步只是上面的可选层。',
      '同步时某个词较晚的修改获胜，删除的卡片保留为标记，这样删除也能同步。',
      '查询依次从词库退到 Wiktionary，再到 MyMemory。kaikki.org 不发送 CORS 头，所以网页版跳过它。',
      '一个纯函数（有测试）规划一周的本地通知，所以不打开应用的人会在 7 天内每天收到一条。',
    ],
    security: [
      'Firebase 匿名登录为每台设备分配一个用户，由 80 位随机数构成的配对码让多台设备共享牌组，无需账号。',
      '拿到配对码的人可以读取和修改该牌组。复习记录、设置和已知词留在每台设备上。',
      'Gemini 使用本人自己的密钥，除了对所选引擎的调用，没有任何消息离开设备。',
      'Android 密钥库及其密码是 CI 密钥，另有一份副本保存在仓库之外。',
    ],
    performance: [
      '批次查询通过 cards_due 索引读取到期卡片，再补充新词直到每日额度。',
      'words/complete 无需网络，按首字母提供词库中的词，词库在首次使用时加载。',
      'expo-image 把图片保存在磁盘上，图片结果为空时 30 天后再查询一次。',
      '@expo/fingerprint 匹配时，发布构建复用保留的 android/ 文件夹，只重建 JS。',
    ],
    operations: [
      '检查会运行 lint、格式、类型、knip 和两遍 Vitest：先按 Android 和网页，再把 Platform.OS 设为 ios。',
      '推送到 main 会在重型运行器上构建 APK，检查通过后 release-gate.sh 发布。检查失败会取消构建。',
      '设置了 PLAY_TRACK 时，每晚悉尼时间 19:00 的运行会向 Google Play 上传包，且仅在应用有变化时进行。',
      'GitHub 版 APK 在发布列表里查找更新的 memoire-v* 标签。Play 版和 iOS 版不含这段代码。',
    ],
    tradeoffs: [
      '用 Expo 和 React Native 而不是原生 Kotlin 应用，这样一套代码构建 Android、iOS 和网页，代价是有些部分只限手机。',
      '设备上用 SQLite 而不是只用 Firestore 存储，这样应用可离线使用并立即打开，同步保持可选。',
      '用配对码而不是 Google 登录，这样设备无需账号即可配对，代价是拿到代码的人都能编辑牌组。',
      'FSRS 状态存成一列 JSON，而不是每个字段一列，这样 ts-fsrs 变化无需改表结构，但无法查询 JSON 内部。',
    ],
  },
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

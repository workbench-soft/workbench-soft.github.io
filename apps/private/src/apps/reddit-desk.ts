import type { PrivateApp } from '../apps.ts';

export const redditDesk: PrivateApp = {
  id: 'reddit-desk',
  name: 'Reddit Desk',
  // Its installer ships in the releases of the site repo, where its updater reads it.
  repo: 'workbench-soft/workbench-soft.github.io',
  tagPrefix: 'reddit-desk-v',
  asset: '-windows-x64-setup\\.exe$',
  about: {
    en: 'A Windows app that drafts Reddit comments and posts about a repo with Claude Code and fills them in for you in Chrome.',
    ru: 'Приложение для Windows: Claude Code пишет черновики комментариев и постов на Reddit о репозитории и вставляет их за вас в Chrome.',
    de: 'Eine Windows-App, die mit Claude Code Reddit-Kommentare und -Beiträge zu einem Repo entwirft und sie für Sie in Chrome einträgt.',
    fr: 'Une appli Windows qui rédige avec Claude Code des commentaires et des posts Reddit sur un dépôt et les remplit pour vous dans Chrome.',
    es: 'Una app de Windows que redacta con Claude Code comentarios y publicaciones de Reddit sobre un repositorio y los rellena por ti en Chrome.',
    zh: '一个 Windows 应用：用 Claude Code 为某个仓库起草 Reddit 评论和帖子，并在 Chrome 里替你填好。',
    ja: 'Claude Code でリポジトリについての Reddit コメントと投稿の下書きを作り、Chrome に代わりに入力する Windows アプリ。',
    ko: 'Claude Code로 저장소에 대한 Reddit 댓글과 글의 초안을 쓰고 Chrome에 대신 채워 주는 Windows 앱.',
    nb: 'En Windows-app som skriver utkast til Reddit-kommentarer og -innlegg om et repo med Claude Code og fyller dem inn for deg i Chrome.',
  },
  steps: {
    en: [
      'Press Download and run the setup file.',
      'Pin Reddit Desk to the taskbar from the Start menu.',
      'Pick a repo and press Find threads.',
    ],
    ru: [
      'Нажмите «Скачать» и запустите установщик.',
      'Закрепите Reddit Desk на панели задач из меню «Пуск».',
      'Выберите репозиторий и нажмите Find threads.',
    ],
    de: [
      'Drücken Sie „Herunterladen“ und starten Sie die Setup-Datei.',
      'Heften Sie Reddit Desk über das Startmenü an die Taskleiste.',
      'Wählen Sie ein Repo und drücken Sie Find threads.',
    ],
    fr: [
      'Appuyez sur « Télécharger » et lancez le fichier d’installation.',
      'Épinglez Reddit Desk à la barre des tâches depuis le menu Démarrer.',
      'Choisissez un dépôt et appuyez sur Find threads.',
    ],
    es: [
      'Pulsa «Descargar» y ejecuta el instalador.',
      'Ancla Reddit Desk a la barra de tareas desde el menú Inicio.',
      'Elige un repositorio y pulsa Find threads.',
    ],
    zh: ['点“下载”，然后运行安装程序。', '从“开始”菜单把 Reddit Desk 固定到任务栏。', '选一个仓库，点 Find threads。'],
    ja: [
      '「ダウンロード」を押してセットアップ ファイルを実行します。',
      'スタート メニューから Reddit Desk をタスク バーにピン留めします。',
      'リポジトリを選び、Find threads を押します。',
    ],
    ko: [
      '"다운로드"를 누르고 설치 파일을 실행합니다.',
      '시작 메뉴에서 Reddit Desk를 작업 표시줄에 고정합니다.',
      '저장소를 고르고 Find threads를 누릅니다.',
    ],
    nb: [
      'Trykk «Last ned» og kjør installasjonsfilen.',
      'Fest Reddit Desk til oppgavelinjen fra Start-menyen.',
      'Velg et repo og trykk Find threads.',
    ],
  },
};

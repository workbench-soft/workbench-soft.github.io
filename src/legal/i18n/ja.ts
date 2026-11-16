import type { Text } from './en';

export const ja: Text = {
  home: 'Workbench Soft',
  language: '言語',
  about: {
    title: 'Workbench Soft について',
    description:
      'Workbench Soft はオーストラリアの独立系ソフトウェアスタジオです。Android、iPhone、Web、Windows、macOS 向けのアプリを作っています。',
    sections: [
      {
        h: '私たちについて',
        p: [
          'Workbench Soft はオーストラリアの独立系ソフトウェアスタジオです。Android、iPhone、Web、Windows、macOS 向けのアプリを、最初の仕様書からストア公開、その後のアップデートまで設計・開発・リリースします。',
        ],
      },
      {
        h: '作っているもの',
        p: [
          'Memories、Sky Altar、Workbench Games などスタジオ自身のアプリと、クライアント向けのアプリです。ホームページの各プロジェクトに、できることを機能ごとに載せています。',
        ],
      },
      {
        h: '広告',
        p: [
          'スタジオのページに広告はありません。Sky Altar の占星術の記事と Workbench Games のサイトには Google の広告が表示され、それらのアプリを無料に保っています。',
        ],
      },
      { h: 'お問い合わせ', p: ['{email} にメールするか、ホームページの依頼フォームをお使いください。'] },
    ],
  },
  privacy: {
    title: 'プライバシーポリシー',
    description: 'workbench-soft.com が集める情報、依頼フォームと広告が使う情報、データの削除を依頼する方法について。',
    sections: [
      { p: ['最終更新日：2026 年 11 月 17 日。'] },
      {
        h: 'サイトが保存するもの',
        p: [
          'このサイトにアカウントはなく、独自の Cookie も使いません。占星術ページで選んだ星座などいくつかの選択は、お使いのブラウザのストレージに残ります。',
        ],
      },
      {
        h: '依頼フォーム',
        p: [
          '依頼フォームを送ると、お名前、メールアドレス、メッセージが FormSubmit（formsubmit.co）を通じて {email} に届きます。返信のためだけに使い、やり取りに必要な間だけ保管します。',
        ],
      },
      {
        h: '広告',
        p: [
          '占星術の記事には Google AdSense の広告が表示されます。Google は広告の選択と計測に Cookie や端末の識別子を使うことがあります。EU、英国、スイスでは最初に同意の確認が表示されます。Google のデータの使い方：policies.google.com/technologies/partner-sites。',
        ],
      },
      {
        h: 'ホスティング',
        p: [
          'サイトは GitHub Pages が配信し、ドメインは Cloudflare が運用しています。どちらもセキュリティのため、IP アドレスを含むリクエストログを短期間保管します。',
        ],
      },
      {
        h: '各アプリ',
        p: [
          '各アプリには独自のプライバシーポリシーがあり、ホームページの各プロジェクトからリンクしています。スタジオの社内ツールのポリシーは {mcp} にあります。',
        ],
      },
      {
        h: 'あなたの権利',
        p: ['私たちが保持するあなたの情報の確認、訂正、削除は {email} までご連絡ください。'],
      },
    ],
  },
};

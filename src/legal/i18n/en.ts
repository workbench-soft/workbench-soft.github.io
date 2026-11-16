// The English text of the About and Privacy pages. Each other catalog takes this type.
// {email} and {mcp} become links on the page.
export const en = {
  home: 'Workbench Soft',
  language: 'Language',
  about: {
    title: 'About Workbench Soft',
    description:
      'Workbench Soft is an independent software studio in Australia. It builds apps for Android, iPhone, the web, Windows and macOS.',
    sections: [
      {
        h: 'Who we are',
        p: [
          'Workbench Soft is an independent software studio in Australia. It designs, builds and ships apps for Android, iPhone, the web, Windows and macOS, from the first spec to the store and the updates after.',
        ],
      },
      {
        h: 'What we make',
        p: [
          "The studio's own apps, such as Memories, Sky Altar and Workbench Games, and apps for clients. Each project on the home page lists what it does, feature by feature.",
        ],
      },
      {
        h: 'Ads',
        p: [
          'The studio pages show no ads. The astrology articles of Sky Altar and the Workbench Games site show Google ads, which keep those apps free.',
        ],
      },
      { h: 'Contact', p: ['Write to {email}, or use the order form on the home page.'] },
    ],
  },
  privacy: {
    title: 'Privacy policy',
    description:
      'What workbench-soft.com collects, what the order form and the ads use, and how to ask for your data to be removed.',
    sections: [
      { p: ['Last updated: 17 November 2026.'] },
      {
        h: 'What the site keeps',
        p: [
          'The site has no accounts and sets no cookies of its own. A few choices, such as your zodiac sign on the astrology pages, stay in the storage of your browser.',
        ],
      },
      {
        h: 'The order form',
        p: [
          'When you send the order form, your name, email and message go through FormSubmit (formsubmit.co) to {email}. We use them only to answer you, and keep them only as long as the conversation needs.',
        ],
      },
      {
        h: 'Ads',
        p: [
          'The astrology articles show ads from Google AdSense. Google may use cookies or device identifiers to pick and measure ads. In the EU, the UK and Switzerland a consent message asks first. Read how Google uses data at policies.google.com/technologies/partner-sites.',
        ],
      },
      {
        h: 'Hosting',
        p: [
          'GitHub Pages serves the site and Cloudflare runs its domain. Both keep short request logs, with IP addresses, for security.',
        ],
      },
      {
        h: 'The apps',
        p: [
          'Each app has its own privacy policy, linked from its project on the home page. The internal tools of the studio have theirs at {mcp}.',
        ],
      },
      { h: 'Your rights', p: ['To see, fix or remove what we hold about you, write to {email}.'] },
    ],
  },
};

export type Text = typeof en;

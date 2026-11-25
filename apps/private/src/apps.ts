import type { Lang } from '../../../src/i18n/locales.ts';
import { chromeSiteSources } from './apps/chrome-site-sources.ts';
import { diskReorg } from './apps/disk-reorg.ts';
import { mp3Upscaler } from './apps/mp3-upscaler.ts';
import { redditDesk } from './apps/reddit-desk.ts';
import { songfactory } from './apps/songfactory.ts';
import { sunoDownload } from './apps/suno-download.ts';

export interface PrivateApp {
  id: string;
  name: string;
  /** owner/name on GitHub. The Download button streams its newest release file. */
  repo: string;
  /** Only releases whose tag starts with this count, for a repo that releases several apps. */
  tagPrefix?: string;
  /** A pattern for the release file to serve. Without one, or with no match, the source zip of the tag goes out. */
  asset?: string;
  /** One line on what the app does, in each language. */
  about: Record<Lang, string>;
  /** How to install it after the Download button, in each language. */
  steps: Record<Lang, string[]>;
}

// The apps the page lists, in this order. A new app is one more file in apps/ and one line here.
export const apps: PrivateApp[] = [sunoDownload, mp3Upscaler, chromeSiteSources, redditDesk, songfactory, diskReorg];

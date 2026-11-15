// The numbers scripts/code-stats/main.ts counts from GitHub. A local build without the file shows none.
import type { Metric } from './engineering/types';

export type CodeStats = Record<Metric | 'repos', number> & {
  updated: string;
  languages: { name: string; lines: number }[];
};

const files = import.meta.glob<{ default: CodeStats }>('./code-stats.json', { eager: true });

export const codeStats: CodeStats | undefined = Object.values(files)[0]?.default;

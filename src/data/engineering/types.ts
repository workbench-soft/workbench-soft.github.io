// The Engineering section in one language. A file per language sits in ./<lang>.ts.

/** The numbers code-stats.json holds, each with a label and a short hint. */
export type Metric =
  | 'lines'
  | 'files'
  | 'functions'
  | 'types'
  | 'tests'
  | 'modules'
  | 'smallFiles'
  | 'medianLines'
  | 'specs'
  | 'docs'
  | 'commits'
  | 'prs';

export interface Topic {
  id: 'code' | 'tests' | 'specs' | 'docs' | 'agents' | 'tools';
  title: string;
  lead: string;
  /** Each point: its bold head, then the rest of the line. */
  points: [string, string][];
}

export interface Engineering {
  title: string;
  intro: string;
  numbers: {
    title: string;
    /** `{date}` is the day of the count, `{repos}` the number of repos. */
    source: string;
    languages: string;
    other: string;
    metrics: Record<Metric, [label: string, hint: string]>;
  };
  topics: Topic[];
  stack: {
    title: string;
    head: [string, string];
    rows: [string, string][];
  };
}

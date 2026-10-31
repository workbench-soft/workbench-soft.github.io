import type { en } from './en';

export type Ui = typeof en;

/** One project's text, in the order of src/data/projects.ts. A feature is [name, text]. */
export interface ProjectText {
  tagline: string;
  lede: string;
  links: string[];
  groups: { title?: string; features: [string, string][] }[];
}

export interface Text {
  title: string;
  text: string;
}

/** A language other than English: the UI, then the services, steps and projects of src/data/. */
export interface Catalog {
  ui: Ui;
  services: Text[];
  steps: Text[];
  projects: Record<string, ProjectText>;
}

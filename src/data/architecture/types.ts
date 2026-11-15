// How one project is built, in one language. A file per project and language sits in ./<id>/<lang>.ts.

/** A technology or module, and the job it does in the project. */
export interface Part {
  name: string;
  role: string;
}

/** A project or outside service this one talks to. `to` is a project id from projects.ts, or a service name. */
export interface Link {
  to: string;
  text: string;
}

/** The system behind the project, 2 to 4 lines per list, each from the repo's code and docs. */
export interface Design {
  /** Who uses it, how much data and load, the limits that shaped it. */
  scale: string[];
  /** What it stores, the shape of the records, where each one lives. */
  data: string[];
  /** The APIs, protocols and messages between the parts. */
  interfaces: string[];
  /** Failures, offline work, retries, conflicts, consistency. */
  reliability: string[];
  /** Sign in, permissions, secrets, privacy. */
  security: string[];
  /** Caching, batching, background work, the hot paths. */
  performance: string[];
  /** Build, release, hosting, updates, monitoring. */
  operations: string[];
  /** Each choice, the option it gave up and the reason. */
  tradeoffs: string[];
}

export const designKeys = [
  'scale',
  'data',
  'interfaces',
  'reliability',
  'security',
  'performance',
  'operations',
  'tradeoffs',
] as const satisfies readonly (keyof Design)[];

export interface Arch {
  /** One or two sentences on the shape of the whole project. */
  summary: string;
  parts: Part[];
  /** The steps data takes, from where it comes in to what the person sees. */
  flow: string[];
  links: Link[];
  design: Design;
  /** How each feature works, keyed by its English name in projects.ts, in every language. */
  features: Record<string, string>;
}

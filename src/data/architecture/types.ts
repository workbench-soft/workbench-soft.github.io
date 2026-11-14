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

export interface Arch {
  /** One or two sentences on the shape of the whole project. */
  summary: string;
  parts: Part[];
  /** The steps data takes, from where it comes in to what the person sees. */
  flow: string[];
  links: Link[];
  /** How each feature works, keyed by its English name in projects.ts, in every language. */
  features: Record<string, string>;
}

// The source files the count reads, by extension, and the files it leaves out.

export const languages: Record<string, string> = {
  ts: 'TypeScript',
  tsx: 'TypeScript',
  mts: 'TypeScript',
  cts: 'TypeScript',
  js: 'JavaScript',
  jsx: 'JavaScript',
  mjs: 'JavaScript',
  cjs: 'JavaScript',
  astro: 'Astro',
  vue: 'Vue',
  svelte: 'Svelte',
  rs: 'Rust',
  kt: 'Kotlin',
  kts: 'Kotlin',
  java: 'Java',
  swift: 'Swift',
  cs: 'C#',
  py: 'Python',
  sh: 'Shell',
  ps1: 'PowerShell',
  css: 'CSS',
  scss: 'CSS',
  html: 'HTML',
  sql: 'SQL',
  go: 'Go',
  c: 'C',
  cpp: 'C++',
  h: 'C',
  glsl: 'Shaders',
  wgsl: 'Shaders',
};

/** Built and vendored code, which the studio didn't write. */
const leftOut = [
  '**/vendor/**',
  '**/binaries/**',
  '**/dist/**',
  '**/generated/**',
  '*.min.*',
  'worker-configuration.d.ts',
];

const manifests = ['package.json', 'Cargo.toml', 'build.gradle', 'build.gradle.kts'];

/** Sparse checkout patterns: the source, the manifests, the specs and the docs. */
export const sparse = [
  ...Object.keys(languages).map((e) => `*.${e}`),
  ...manifests,
  '/specs/**/*.md',
  '/docs/**/*.md',
  '/README.md',
  ...leftOut.map((p) => `!${p}`),
];

export const extOf = (path: string) => path.slice(path.lastIndexOf('.') + 1).toLowerCase();

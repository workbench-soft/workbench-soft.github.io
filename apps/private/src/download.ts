import type { PrivateApp } from './apps.ts';

export interface DownloadEnv {
  /** Fine-grained GitHub token with Contents read on the listed repos. */
  GITHUB_TOKEN?: string;
}

interface Release {
  tag_name: string;
  draft: boolean;
  assets: { name: string; url: string }[];
}

const api = (path: string, token: string, accept = 'application/vnd.github+json') =>
  fetch(`https://api.github.com${path}`, {
    headers: { Authorization: `Bearer ${token}`, Accept: accept, 'User-Agent': 'workbench-private' },
    redirect: 'manual',
  });

/** The newest release of the app, or the newest whose tag starts with its prefix. */
async function newest(app: PrivateApp, token: string): Promise<Release | null> {
  if (!app.tagPrefix) {
    const response = await api(`/repos/${app.repo}/releases/latest`, token);
    return response.ok ? ((await response.json()) as Release) : null;
  }
  const response = await api(`/repos/${app.repo}/releases?per_page=50`, token);
  if (!response.ok) return null;
  const all = (await response.json()) as Release[];
  return all.find((r) => !r.draft && r.tag_name.startsWith(app.tagPrefix!)) ?? null;
}

/** The release file to serve: the matching asset, else the source zip of the tag. */
export function pick(app: PrivateApp, release: Release): { path: string; name: string; accept: string } {
  const asset = app.asset ? release.assets.find((a) => new RegExp(app.asset!).test(a.name)) : undefined;
  if (asset) return { path: new URL(asset.url).pathname, name: asset.name, accept: 'application/octet-stream' };
  return {
    path: `/repos/${app.repo}/zipball/${release.tag_name}`,
    name: `${app.id}-${release.tag_name}.zip`,
    accept: '*/*',
  };
}

/**
 * Streams the newest release file of an app. GitHub answers with a redirect to a short-lived storage link,
 * which the Worker follows itself, so the visitor never sees GitHub.
 */
export async function download(app: PrivateApp, env: DownloadEnv): Promise<Response | null> {
  // A secret piped in from PowerShell keeps its line break, which a header value refuses.
  const token = env.GITHUB_TOKEN?.trim();
  if (!token) return null;
  try {
    return await stream(app, token);
  } catch (error) {
    console.error(`download ${app.id} failed`, error);
    return null;
  }
}

async function stream(app: PrivateApp, token: string): Promise<Response | null> {
  const release = await newest(app, token);
  if (!release) return null;
  const file = pick(app, release);
  let response = await api(file.path, token, file.accept);
  const location = response.headers.get('Location');
  if (location) response = await fetch(location);
  if (!response.ok || !response.body) return null;
  return new Response(response.body, {
    headers: {
      'Content-Type': 'application/octet-stream',
      'Content-Disposition': `attachment; filename="${file.name.replace(/"/g, '')}"`,
      'Cache-Control': 'private, no-store',
      'X-Robots-Tag': 'noindex, nofollow',
    },
  });
}

import { projects } from '../../data/projects';

export const prerender = true;

// Public metadata only: the phone can list apps even if they have no APK release.
export function GET(): Response {
  const apps = projects
    .filter((project) => ['app', 'tool', 'internal'].includes(project.kind))
    .map((project) => {
      const repo = project.repo?.split('/')[0];
      const link = project.links[0]?.href ?? (repo ? `https://github.com/workbench-soft/${repo}` : null);
      return {
        id: project.id,
        name: project.name,
        platforms: project.platforms,
        url: link ? new URL(link, 'https://workbench-soft.com').href : null,
      };
    });

  // A separately installable APK inside the Guitar Upscale repository.
  apps.push({
    id: 'guitarup-tuner',
    name: 'GuitarUp Tuner',
    platforms: ['Android'],
    url: 'https://github.com/workbench-soft/workbench-soft.github.io/releases?q=guitar-upscale',
  });
  return new Response(JSON.stringify(apps), {
    headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'public, max-age=300' },
  });
}

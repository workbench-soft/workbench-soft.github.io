// Lists the org repos and the work of the last 30 days through the GitHub GraphQL API.
import { execFileSync } from 'node:child_process';

export const org = 'workbench-soft';

// Built copies of other repos and code that moved to another repo.
const skip = new Set(['aspirationstyle-site', 'farnear-site', 'media-organizer', 'shuttrix', 'workbench-soft']);

// A secret set from a Windows PowerShell pipe starts with a BOM, which breaks the header.
export const token = () =>
  (process.env.CODE_STATS_TOKEN || process.env.GH_TOKEN || execFileSync('gh', ['auth', 'token']).toString())
    .replace(/^\uFEFF/, '')
    .trim();

async function query<T>(text: string, variables: Record<string, unknown>): Promise<T> {
  const res = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: { authorization: `bearer ${token()}`, 'content-type': 'application/json' },
    body: JSON.stringify({ query: text, variables }),
  });
  const body = (await res.json()) as { data?: T; errors?: unknown };
  if (!res.ok || body.errors || !body.data) throw new Error(`GitHub API ${res.status}: ${JSON.stringify(body.errors)}`);
  return body.data;
}

const reposQuery = `query($org: String!, $after: String, $since: GitTimestamp!) {
  organization(login: $org) {
    repositories(first: 100, after: $after, isFork: false) {
      pageInfo { hasNextPage endCursor }
      nodes { name isEmpty defaultBranchRef { target { ... on Commit { history(since: $since) { totalCount } } } } }
    }
  }
}`;

interface RepoNode {
  name: string;
  isEmpty: boolean;
  defaultBranchRef: { target: { history: { totalCount: number } } } | null;
}
interface ReposPage {
  organization: { repositories: { pageInfo: { hasNextPage: boolean; endCursor: string }; nodes: RepoNode[] } };
}

/** The repos to count, with the commits on each default branch since `since`. */
export async function listRepos(since: string) {
  const repos: { name: string; commits: number }[] = [];
  for (let after: string | null = null; ;) {
    const page: ReposPage = await query<ReposPage>(reposQuery, { org, after, since });
    const { nodes, pageInfo } = page.organization.repositories;
    for (const r of nodes)
      if (!r.isEmpty && r.defaultBranchRef && !skip.has(r.name))
        repos.push({ name: r.name, commits: r.defaultBranchRef.target.history.totalCount });
    if (!pageInfo.hasNextPage) return repos;
    after = pageInfo.endCursor;
  }
}

/** The PRs merged in the org since a day, such as `2026-10-16`. */
export async function mergedPrs(day: string) {
  const data = await query<{ search: { issueCount: number } }>(
    'query($q: String!) { search(query: $q, type: ISSUE, first: 1) { issueCount } }',
    { q: `org:${org} is:pr is:merged merged:>=${day}` },
  );
  return data.search.issueCount;
}

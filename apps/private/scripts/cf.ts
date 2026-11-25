// The Cloudflare API calls the Access scripts share. Run them through bws run, which sets the token.

export const ACCOUNT = process.env.CLOUDFLARE_ACCOUNT_ID ?? '021a5552010625b00e5e81cfd41e9437';
// Set once in Zero Trust settings. The token has no right to read it.
export const TEAM = 'workbench-soft.cloudflareaccess.com';
export const HOST = 'insiders.workbench-soft.com';
export const APP_NAME = 'Workbench Soft insiders';
export const POLICY_NAME = 'Invited insiders';

const token = process.env.WORKBENCH_SOFT_GITHUB_IO_CLOUDFLARE_API_TOKEN ?? process.env.CLOUDFLARE_API_TOKEN;
if (!token) throw new Error('No Cloudflare token. Run through: mise x -- bws run --project-id <id> -- mise run <task>');

/** One API call. It throws with Cloudflare's own message on a failure. */
export async function cf<T>(method: string, path: string, body?: unknown): Promise<T> {
  const response = await fetch(`https://api.cloudflare.com/client/v4/accounts/${ACCOUNT}${path}`, {
    method,
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  const data = (await response.json()) as { success: boolean; errors: { message: string }[]; result: T };
  if (!data.success) throw new Error(`${method} ${path}: ${response.status} ${JSON.stringify(data.errors)}`);
  return data.result;
}

export interface Rule {
  email?: { email: string };
}
export interface Policy {
  id: string;
  name: string;
  include: Rule[];
}

export const findPolicy = async () =>
  (await cf<Policy[]>('GET', '/access/policies')).find((p) => p.name === POLICY_NAME);

/** The allow list with each email once, sorted. */
export const emailRules = (emails: string[]): Rule[] =>
  [...new Set(emails.map((e) => e.trim().toLowerCase()))].toSorted().map((email) => ({ email: { email } }));

export const emailsOf = (policy: Policy) => policy.include.flatMap((rule) => (rule.email ? [rule.email.email] : []));

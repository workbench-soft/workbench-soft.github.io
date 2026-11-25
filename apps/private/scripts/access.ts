// Makes or updates the Access app over insiders.workbench-soft.com, its allow policy and the one-time PIN login.
// Safe to run again. It prints the team domain and the audience tag that wrangler.jsonc needs.
// Usage: mise run access [first@example.com ...]. The emails go on the list only when the policy is new.
import { APP_NAME, cf, emailRules, findPolicy, HOST, POLICY_NAME, TEAM } from './cf.ts';

interface Provider {
  id: string;
  type: string;
}
interface App {
  id: string;
  aud: string;
  domain: string;
}

const firstEmails = process.argv.slice(2);
const owner = ['workbench.soft@gmail.com'];

// With no login added in Zero Trust, Access sends a one-time PIN by email. Once a PIN login exists, the app uses only it.
const pin = (await cf<Provider[]>('GET', '/access/identity_providers')).find((p) => p.type === 'onetimepin');

const policy =
  (await findPolicy()) ??
  (await cf<{ id: string }>('POST', '/access/policies', {
    name: POLICY_NAME,
    decision: 'allow',
    include: emailRules([...owner, ...firstEmails]),
    session_duration: '720h',
  }));

const appBody = {
  name: APP_NAME,
  type: 'self_hosted',
  domain: HOST,
  session_duration: '720h',
  ...(pin && { allowed_idps: [pin.id], auto_redirect_to_identity: true }),
  app_launcher_visible: false,
  policies: [{ id: policy.id, precedence: 1 }],
};
const existing = (await cf<App[]>('GET', '/access/apps')).find((a) => a.domain === HOST);
const app = existing
  ? await cf<App>('PUT', `/access/apps/${existing.id}`, appBody)
  : await cf<App>('POST', '/access/apps', appBody);

console.log(`Access app ${app.id} guards ${app.domain}`);
console.log(`ACCESS_TEAM=${TEAM}`);
console.log(`ACCESS_AUD=${app.aud}`);

// Adds emails to the allow list of the insiders page, or takes them off with --remove.
// The list lives only in Cloudflare, so no email lands in this public repo.
// Usage: mise run invite friend@example.com [--remove]
import { cf, emailRules, emailsOf, findPolicy, type Policy } from './cf.ts';

const args: string[] = process.argv.slice(2);
const remove = args.includes('--remove');
const emails = args.filter((a) => a.includes('@')).map((e) => e.toLowerCase());
if (emails.length === 0) throw new Error('Name at least one email: mise run invite friend@example.com');

const policy = await findPolicy();
if (!policy) throw new Error('No Access policy yet. Run mise run access first.');

const now = emailsOf(policy);
const next = remove ? now.filter((e) => !emails.includes(e)) : [...now, ...emails];
const saved = await cf<Policy>('PUT', `/access/policies/${policy.id}`, {
  name: policy.name,
  decision: 'allow',
  include: emailRules(next),
  session_duration: '720h',
});
console.log(`${emailsOf(saved).length} emails can open the page:`);
for (const email of emailsOf(saved)) console.log(`  ${email}`);

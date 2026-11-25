import { createRemoteJWKSet, jwtVerify } from 'jose';

export interface AccessConfig {
  /** The team domain, such as workbench-soft.cloudflareaccess.com. */
  ACCESS_TEAM: string;
  /** The audience tag of the Access app. */
  ACCESS_AUD: string;
}

// One key set per team, kept across requests, so the keys load once per isolate.
const keySets = new Map<string, ReturnType<typeof createRemoteJWKSet>>();
const keysOf = (team: string) => {
  const found = keySets.get(team);
  if (found) return found;
  const keys = createRemoteJWKSet(new URL(`https://${team}/cdn-cgi/access/certs`));
  keySets.set(team, keys);
  return keys;
};

/**
 * The email Access signed in, or null. Access adds the header on each request it lets through,
 * so a request that reaches the Worker another way has no valid token.
 */
export async function accessEmail(request: Request, config: AccessConfig): Promise<string | null> {
  const token = request.headers.get('Cf-Access-Jwt-Assertion');
  if (!token || !config.ACCESS_TEAM || !config.ACCESS_AUD) return null;
  try {
    const { payload } = await jwtVerify(token, keysOf(config.ACCESS_TEAM), {
      issuer: `https://${config.ACCESS_TEAM}`,
      audience: config.ACCESS_AUD,
    });
    return typeof payload.email === 'string' ? payload.email : null;
  } catch {
    return null;
  }
}

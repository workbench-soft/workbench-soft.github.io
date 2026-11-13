/**
 * Lets a socket in from this site or from the apps. A request with no Origin, such as one from a
 * native client, passes. An Origin that is no URL, such as `null` from a sandboxed frame, is turned down.
 */
export function sameSite(request: Request, url: URL): boolean {
  const origin = request.headers.get('Origin');
  if (!origin) return true;
  const host = URL.parse(origin)?.hostname;
  // The Android and iOS apps load the pages from their own local origin.
  return host === url.hostname || host === 'localhost' || host === '127.0.0.1';
}

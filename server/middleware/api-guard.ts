export default defineEventHandler((event) => {
  const reqPath = event.path;

  if (!reqPath.startsWith('/api/')) return;

  const config = useRuntimeConfig(event);
  const allowedOrigin = config.allowedOrigin as string;
  const internalSecret = config.internalApiSecret as string;

  const internalHeader = getHeader(event, 'x-internal-secret');

  if (internalSecret && internalHeader === internalSecret) return;

  const origin = getHeader(event, 'origin');
  const referer = getHeader(event, 'referer');

  if (!origin && !referer) return;

  if (!allowedOrigin) return;

  let allowedHost: string;

  try {
    allowedHost = new URL(allowedOrigin).host;
  } catch {
    return;
  }

  let requestHost = '';

  try {
    requestHost = new URL(origin || referer || '').host;
  } catch {}

  if (!requestHost) return;

  if (requestHost === allowedHost) return;

  const isDev = process.env.NODE_ENV === 'development';
  const isLocalhost =
    requestHost.includes('localhost') || requestHost.includes('127.0.0.1');

  if (isDev && isLocalhost) return;

  throw createError({
    statusCode: 403,
    statusMessage: 'Forbidden',
  });
});

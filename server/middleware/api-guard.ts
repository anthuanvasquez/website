export default defineEventHandler((event) => {
  const reqPath = event.path;

  // Only guard API routes
  if (!reqPath.startsWith('/api/')) return;

  const config = useRuntimeConfig(event);
  const allowedOrigin = config.allowedOrigin as string;
  const internalSecret = config.internalApiSecret as string;

  // 1. Allow internal requests with secret header (e.g. from Cron jobs or other services)
  const internalHeader = getHeader(event, 'x-internal-secret');
  if (internalSecret && internalHeader === internalSecret) return;

  // 2. Local development bypass
  const isDev = process.env.NODE_ENV === 'development';
  if (isDev) return;

  // 3. Mandatory Origin/Referer check for Production
  const origin = getHeader(event, 'origin');
  const referer = getHeader(event, 'referer');

  if (!origin && !referer) {
    throw createError({
      statusCode: 403,
      statusMessage: 'Forbidden: Missing Origin or Referer',
    });
  }

  if (!allowedOrigin) {
    // If not configured in prod, block everything for safety
    throw createError({
      statusCode: 500,
      statusMessage: 'Server configuration error: Allowed Origin not set',
    });
  }

  let allowedHost: string;
  try {
    allowedHost = new URL(allowedOrigin).host;
  } catch {
    throw createError({
      statusCode: 500,
      statusMessage: 'Server configuration error: Invalid Allowed Origin',
    });
  }

  let requestHost = '';
  try {
    // Extract host from origin or referer
    const sourceUrl = origin || referer || '';
    requestHost = new URL(sourceUrl).host;
  } catch {
    throw createError({
      statusCode: 403,
      statusMessage: 'Forbidden: Invalid request source',
    });
  }

  // 4. Final Host Validation
  if (requestHost !== allowedHost) {
    throw createError({
      statusCode: 403,
      statusMessage: 'Forbidden: Unauthorized origin',
    });
  }
});

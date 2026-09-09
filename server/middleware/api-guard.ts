function parseHost(
  urlStr: string,
  statusCode: number,
  errorMessage: string
): string {
  try {
    return new URL(urlStr).host;
  } catch {
    throw createError({
      statusCode,
      statusMessage: errorMessage,
    });
  }
}

function shouldBypassGuard(
  event: Parameters<typeof getHeader>[0],
  secret: string
): boolean {
  if (process.env.NODE_ENV === 'development') return true;
  const internalHeader = getHeader(event, 'x-internal-secret');
  return Boolean(secret && internalHeader === secret);
}

export default defineEventHandler((event) => {
  const reqPath = event.path;

  // Only guard API routes
  if (!reqPath.startsWith('/api/')) return;

  const config = useRuntimeConfig(event);
  const allowedOrigin = config.allowedOrigin as string;
  const internalSecret = config.internalApiSecret as string;

  if (shouldBypassGuard(event, internalSecret)) return;

  // Mandatory Origin/Referer check for Production
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

  const allowedHost = parseHost(
    allowedOrigin,
    500,
    'Server configuration error: Invalid Allowed Origin'
  );

  const requestHost = parseHost(
    origin || referer || '',
    403,
    'Forbidden: Invalid request source'
  );

  // 4. Final Host Validation
  if (requestHost !== allowedHost) {
    throw createError({
      statusCode: 403,
      statusMessage: 'Forbidden: Unauthorized origin',
    });
  }
});

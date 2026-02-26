export default defineEventHandler((event) => {
  const reqPath = getRequestPath(event);

  // Consideramo proteger solo request a la API
  if (!reqPath.startsWith('/api/')) return;

  const config = useRuntimeConfig(event);
  const baseUrl = config.public.baseUrl as string;

  if (!baseUrl) return; // Si no hay baseUrl definido, no protegemos nada por ahora.

  const origin = getHeader(event, 'origin');
  const referer = getHeader(event, 'referer');

  // Permitir solicitudes internas sin Origin o Referer (normalmente llamadas desde el Servidor / SSR)
  if (!origin && !referer) {
    return;
  }

  let allowedHost = '';
  try {
    allowedHost = new URL(baseUrl).host;
  } catch {
    // Origen invalido en config
    return;
  }

  let requestHost = '';
  try {
    if (origin) {
      requestHost = new URL(origin).host;
    } else if (referer) {
      requestHost = new URL(referer).host;
    }
  } catch {
    // Headers invalidos
  }

  if (requestHost && requestHost !== allowedHost) {
    const isDev = import.meta.dev || process.env.NODE_ENV === 'development';
    const isLocalhost =
      requestHost.includes('localhost') || requestHost.includes('127.0.0.1');

    // En entorno de desarrollo permitimos localhost de todos modos para que el tooling no falle
    if (!(isDev && isLocalhost)) {
      throw createError({
        statusCode: 403,
        statusMessage: 'Forbidden: API access restricted to the app domain.',
      });
    }
  }
});

import { createHash } from 'crypto';

export default defineEventHandler((event) => {
  const config = useRuntimeConfig(event);
  const secret = config.chatSessionSecret;

  if (!secret) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Chat session secret not configured',
    });
  }

  const timestamp = Date.now().toString();
  const signature = createHash('sha256')
    .update(`${timestamp}:${secret}`)
    .digest('hex')
    .slice(0, 16);

  return {
    token: `${timestamp}.${signature}`,
  };
});

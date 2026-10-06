import { createHmac } from 'node:crypto';

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
  const signature = createHmac('sha256', secret)
    .update(timestamp)
    .digest('hex');

  return {
    token: `${timestamp}.${signature}`,
  };
});

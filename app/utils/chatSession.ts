/**
 * Fetches a secure session token from the server.
 * The server generates and signs the token so the secret is never exposed to the client.
 */
export async function generateSessionToken(): Promise<string> {
  try {
    const data = await $fetch<{ token: string }>('/api/chatbot/session');
    return data.token;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Failed to get chat session token:', error);
    return '';
  }
}

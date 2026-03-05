export async function generateSessionToken(): Promise<string> {
  const timestamp = Date.now().toString();
  const secret = useRuntimeConfig().public.chatSessionSecret;
  const encoder = new TextEncoder();

  // The backend uses a standard SHA-256 hash, so the client must match.
  const hashBuffer = await crypto.subtle.digest(
    'SHA-256',
    encoder.encode(`${timestamp}:${secret}`)
  );

  const hex = Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
    .slice(0, 16);

  return `${timestamp}.${hex}`;
}
